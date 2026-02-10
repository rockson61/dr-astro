import React, { useState } from 'react';
import { Briefcase, Building2, MapPin, DollarSign, Globe, FileText, Loader2 } from 'lucide-react';
import { createSupabaseBrowserClient } from '../../lib/supabase';
import GlassCard from '../ui/GlassCard';

const supabase = createSupabaseBrowserClient();

const JOB_TYPES = [
    { value: 'full_time', label: 'Full Time' },
    { value: 'part_time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'locum', label: 'Locum' },
    { value: 'internship', label: 'Internship' }
];

interface JobFormProps {
    initialData?: any;
}

export default function JobForm({ initialData }: JobFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        company_name: initialData?.company_name || '',
        location: initialData?.location || '',
        type: initialData?.type || 'full_time',
        salary_min: initialData?.salary_min || '',
        salary_max: initialData?.salary_max || '',
        apply_url: initialData?.apply_url || '',
        description: initialData?.description || ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            let error;

            if (initialData?.id) {
                // Update
                const { error: updateError } = await supabase
                    .from('jobs')
                    .update({
                        title: formData.title,
                        company_name: formData.company_name,
                        location: formData.location,
                        type: formData.type,
                        salary_min: formData.salary_min ? parseInt(formData.salary_min) : null,
                        salary_max: formData.salary_max ? parseInt(formData.salary_max) : null,
                        apply_url: formData.apply_url,
                        description: formData.description,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', initialData.id);
                error = updateError;
            } else {
                // Create
                const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 7);

                const { error: insertError } = await supabase.from('jobs').insert({
                    title: formData.title,
                    slug,
                    company_name: formData.company_name,
                    location: formData.location,
                    type: formData.type,
                    salary_min: formData.salary_min ? parseInt(formData.salary_min) : null,
                    salary_max: formData.salary_max ? parseInt(formData.salary_max) : null,
                    apply_url: formData.apply_url,
                    description: formData.description,
                    user_id: user.id,
                    is_active: true
                });
                error = insertError;
            }

            if (error) throw error;

            // Redirect to My Jobs
            window.location.href = '/dashboard/my-jobs';
        } catch (error: any) {
            console.error('Error saving job:', error);
            alert(error.message || 'Failed to save job');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GlassCard className="max-w-4xl mx-auto p-8">
            <h2 className="text-2xl font-bold text-tuio-navy mb-6 flex items-center gap-3">
                <Briefcase className="w-8 h-8 text-tuio-red" />
                Post a New Job
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Job Title */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Job Title *</label>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Associate Dentist"
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Company Name */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Company Name *</label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                name="company_name"
                                required
                                value={formData.company_name}
                                onChange={handleChange}
                                placeholder="My Dental Clinic"
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Location */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Location *</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                name="location"
                                required
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. New York, NY (or Remote)"
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Job Type */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Job Type *</label>
                        <div className="relative">
                            <select
                                name="type"
                                required
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all appearance-none bg-white"
                            >
                                {JOB_TYPES.map(type => (
                                    <option key={type.value} value={type.value}>{type.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Salary Range */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Salary Range (Optional)</label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="number"
                                    name="salary_min"
                                    value={formData.salary_min}
                                    onChange={handleChange}
                                    placeholder="Min"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red outline-none"
                                />
                            </div>
                            <span className="self-center text-gray-400">-</span>
                            <div className="relative flex-1">
                                <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    type="number"
                                    name="salary_max"
                                    value={formData.salary_max}
                                    onChange={handleChange}
                                    placeholder="Max"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Apply URL */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Application Link / Email *</label>
                        <div className="relative">
                            <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                name="apply_url"
                                required
                                value={formData.apply_url}
                                onChange={handleChange}
                                placeholder="https://... or mailto:..."
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Job Description *</label>
                    <div className="relative">
                        <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <textarea
                            name="description"
                            required
                            value={formData.description}
                            onChange={handleChange}
                            rows={6}
                            placeholder="Describe the role, responsibilities, and requirements..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-4 bg-tuio-red text-white rounded-xl font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Publishing...
                            </>
                        ) : (
                            'Post Job Now'
                        )}
                    </button>
                </div>
            </form>
        </GlassCard>
    );
}
