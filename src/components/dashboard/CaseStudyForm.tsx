import React, { useState } from 'react';
import { FileText, User, Activity, Camera, Save, Loader2, Plus, Trash2 } from 'lucide-react';
import { createSupabaseBrowserClient } from '../../lib/supabase';
import GlassCard from '../ui/GlassCard';

const supabase = createSupabaseBrowserClient();

interface CaseStudyFormProps {
    initialData?: any;
}

export default function CaseStudyForm({ initialData }: CaseStudyFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        patient_age: initialData?.patient_age || '',
        gender: initialData?.gender || 'Male',
        chief_complaint: initialData?.chief_complaint || '',
        medical_history: initialData?.medical_history || '',
        diagnosis: initialData?.diagnosis || '',
        treatment_plan: initialData?.treatment_plan || '',
        procedure_details: initialData?.procedure_details || '',
        conclusion: initialData?.conclusion || '',
        pre_op_images: initialData?.pre_op_images || [],
        post_op_images: initialData?.post_op_images || []
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Simplified Image Handler (Just URL input for now, ideally File Upload)
    const addImage = (type: 'pre_op_images' | 'post_op_images') => {
        const url = prompt("Enter Image URL:");
        if (url) {
            setFormData({ ...formData, [type]: [...formData[type], url] });
        }
    };

    const removeImage = (type: 'pre_op_images' | 'post_op_images', index: number) => {
        const newImages = [...formData[type]];
        newImages.splice(index, 1);
        setFormData({ ...formData, [type]: newImages });
    };

    const slugify = (text: string) => {
        return text.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 7);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            const payload = {
                ...formData,
                patient_age: parseInt(formData.patient_age) || 0,
                updated_at: new Date().toISOString()
            };

            let error;

            if (initialData?.id) {
                const { error: updateError } = await supabase
                    .from('clinical_cases')
                    .update(payload)
                    .eq('id', initialData.id);
                error = updateError;
            } else {
                const slug = slugify(formData.title);
                const { error: insertError } = await supabase
                    .from('clinical_cases')
                    .insert({
                        ...payload,
                        slug,
                        author_id: user.id,
                        status: 'draft'
                    });
                error = insertError;
            }

            if (error) throw error;
            window.location.href = '/dashboard/my-articles'; // Redirect to Articles/Cases list (Assuming unified dashboard or need new one)
            // Ideally should go to 'dashboard/my-cases' if it existed, but 'my-articles' might be okay if we filter?
            // Wait, I haven't created 'my-cases'. I should creates 'dashboard/my-cases'.

        } catch (err: any) {
            alert(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GlassCard className="max-w-4xl mx-auto p-8">
            <h2 className="text-2xl font-bold text-tuio-navy mb-6 flex items-center gap-2">
                <Activity className="text-tuio-red" />
                {initialData ? 'Edit Clinical Case' : 'Submit New Case Study'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Case Info */}
                <div className="space-y-4">
                    <h3 className="font-bold text-gray-400 uppercase text-xs tracking-widest border-b pb-2">Case Information</h3>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Case Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200"
                            placeholder="e.g. Full Mouth Rehabilitation of a 60-year-old Patient"
                        />
                    </div>
                </div>

                {/* 2. Patient Details */}
                <div className="space-y-4">
                    <h3 className="font-bold text-gray-400 uppercase text-xs tracking-widest border-b pb-2">Patient Details (Anonymized)</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Age</label>
                            <input
                                type="number"
                                name="patient_age"
                                value={formData.patient_age}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white"
                            >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Chief Complaint</label>
                        <textarea
                            name="chief_complaint"
                            rows={2}
                            value={formData.chief_complaint}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Medical History</label>
                        <textarea
                            name="medical_history"
                            rows={2}
                            value={formData.medical_history}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200"
                        />
                    </div>
                </div>

                {/* 3. Clinical Workflow */}
                <div className="space-y-4">
                    <h3 className="font-bold text-gray-400 uppercase text-xs tracking-widest border-b pb-2">Clinical Workflow</h3>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Diagnosis</label>
                        <textarea
                            name="diagnosis"
                            rows={3}
                            value={formData.diagnosis}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Treatment Plan</label>
                        <textarea
                            name="treatment_plan"
                            rows={3}
                            value={formData.treatment_plan}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Procedure Details</label>
                        <textarea
                            name="procedure_details"
                            rows={5}
                            value={formData.procedure_details}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 font-mono text-sm"
                            placeholder="Detailed step-by-step description..."
                        />
                    </div>
                </div>

                {/* 4. Images */}
                <div className="space-y-4">
                    <h3 className="font-bold text-gray-400 uppercase text-xs tracking-widest border-b pb-2">Clinical Images</h3>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-bold text-gray-700">Pre-Op Images</label>
                                <button type="button" onClick={() => addImage('pre_op_images')} className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded font-bold flex items-center gap-1">
                                    <Plus size={12} /> Add URL
                                </button>
                            </div>
                            <div className="space-y-2">
                                {formData.pre_op_images.map((img: string, i: number) => (
                                    <div key={i} className="relative group">
                                        <img src={img} className="w-full h-32 object-cover rounded-lg border border-gray-200" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage('pre_op_images', i)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                ))}
                                {formData.pre_op_images.length === 0 && <div className="text-center py-8 bg-gray-50 rounded-lg text-gray-400 text-sm">No images added</div>}
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-bold text-gray-700">Post-Op Images</label>
                                <button type="button" onClick={() => addImage('post_op_images')} className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded font-bold flex items-center gap-1">
                                    <Plus size={12} /> Add URL
                                </button>
                            </div>
                            <div className="space-y-2">
                                {formData.post_op_images.map((img: string, i: number) => (
                                    <div key={i} className="relative group">
                                        <img src={img} className="w-full h-32 object-cover rounded-lg border border-gray-200" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage('post_op_images', i)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                ))}
                                {formData.post_op_images.length === 0 && <div className="text-center py-8 bg-gray-50 rounded-lg text-gray-400 text-sm">No images added</div>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-4 bg-tuio-red text-white rounded-xl font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all flex items-center gap-2"
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : <Save className="w-5 h-5" />}
                        Save Case Study
                    </button>
                </div>
            </form>
        </GlassCard>
    );
}
