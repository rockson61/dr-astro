import React, { useState } from 'react';
import { Store, MapPin, Globe, FileText, Phone, Camera, Loader2, Check } from 'lucide-react';
import { createSupabaseBrowserClient } from '../../lib/supabase';
import GlassCard from '../ui/GlassCard';

const supabase = createSupabaseBrowserClient();

const LISTING_TYPES = [
    { value: "clinic", label: "Dental Clinic" },
    { value: "lab", label: "Dental Laboratory" },
    { value: "supplier", label: "Equipment Supplier" },
    { value: "education", label: "Training Institute" },
    { value: "other", label: "Other" },
];

const SERVICES_LIST = [
    "General Dentistry",
    "Orthodontics",
    "Implants",
    "Cosmetic",
    "Pediatric",
    "Oral Surgery",
    "Periodontics",
    "Endodontics",
    "Prosthodontics",
];

interface ListingFormProps {
    initialData?: any;
}

export default function ListingForm({ initialData }: ListingFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        business_name: initialData?.business_name || '',
        type: initialData?.type || 'clinic',
        city: initialData?.address_json?.city || '',
        address: initialData?.address_json?.full_address || '',
        phone: initialData?.contact_phone || '',
        website: initialData?.website || '',
        description: initialData?.description || '',
        services: initialData?.amenities || [], // Assuming amenities column stores services array
        images: initialData?.gallery || []
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleServiceToggle = (service: string) => {
        const currentServices = formData.services || [];
        const newServices = currentServices.includes(service)
            ? currentServices.filter((s: string) => s !== service)
            : [...currentServices, service];
        setFormData({ ...formData, services: newServices });
    };

    const slugify = (text: string) => {
        return text
            .toString()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "")
            .replace(/\-\-+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            const addressJson = {
                full_address: formData.address,
                city: formData.city,
                country: "India",
            };

            const payload = {
                business_name: formData.business_name,
                type: formData.type,
                description: formData.description,
                contact_phone: formData.phone,
                website: formData.website,
                address_json: addressJson,
                amenities: formData.services,
                gallery: formData.images,
                updated_at: new Date().toISOString()
            };

            let error;

            if (initialData?.id) {
                // Update
                const { error: updateError } = await supabase
                    .from('listings')
                    .update(payload)
                    .eq('id', initialData.id);
                error = updateError;
            } else {
                // Create
                const slug = `${slugify(formData.business_name)}-${Math.random().toString(36).substring(2, 7)}`;
                const { error: insertError } = await supabase
                    .from('listings')
                    .insert({
                        ...payload,
                        slug,
                        owner_id: user.id,
                        is_verified: false,
                        rating_avg: 0
                    });
                error = insertError;
            }

            if (error) throw error;

            window.location.href = '/dashboard/my-listings';
        } catch (err: any) {
            console.error(err);
            alert(err.message || 'Failed to save listing');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GlassCard className="max-w-5xl mx-auto p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-tuio-navy uppercase flex items-center gap-3">
                        <Store className="w-8 h-8 text-tuio-red" />
                        {initialData ? 'Edit Listing' : 'Add New Listing'}
                    </h2>
                    <p className="text-gray-500 mt-1">
                        {initialData ? 'Update your business details.' : 'List your business in the dental directory.'}
                    </p>
                </div>
                <a
                    href="/dashboard/my-listings"
                    className="text-gray-400 font-bold hover:text-tuio-red transition-colors flex items-center gap-2 text-sm uppercase tracking-wide"
                >
                    ← Back
                </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Business Details */}
                <div className="bg-white/50 p-6 rounded-2xl border border-gray-100">
                    <h3 className="font-bold text-lg text-tuio-navy mb-4 border-b border-gray-100 pb-2">Business Details</h3>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Business Name *</label>
                            <input
                                type="text"
                                name="business_name"
                                required
                                value={formData.business_name}
                                onChange={handleChange}
                                placeholder="e.g. Smile Dental Clinic"
                                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Type *</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
                                >
                                    {LISTING_TYPES.map(type => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">City *</label>
                                <input
                                    type="text"
                                    name="city"
                                    required
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="e.g. Mumbai"
                                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white/50 p-6 rounded-2xl border border-gray-100">
                    <h3 className="font-bold text-lg text-tuio-navy mb-4 border-b border-gray-100 pb-2">Contact Information</h3>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <textarea
                                    name="address"
                                    rows={2}
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
                                    placeholder="Full street address..."
                                />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Phone</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
                                        placeholder="+91..."
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Website</label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                    <input
                                        type="url"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description & Services */}
                <div className="bg-white/50 p-6 rounded-2xl border border-gray-100">
                    <h3 className="font-bold text-lg text-tuio-navy mb-4 border-b border-gray-100 pb-2">About & Services</h3>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Description *</label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <textarea
                                    name="description"
                                    required
                                    rows={5}
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
                                    placeholder="Tell us about your business..."
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Services Offered</label>
                            <div className="flex flex-wrap gap-2">
                                {SERVICES_LIST.map((service) => (
                                    <button
                                        type="button"
                                        key={service}
                                        onClick={() => handleServiceToggle(service)}
                                        className={`px-4 py-2 rounded-full text-sm font-bold border transition-all flex items-center gap-2 ${formData.services.includes(service)
                                                ? 'bg-tuio-navy text-white border-tuio-navy shadow-md'
                                                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        {formData.services.includes(service) && <Check className="w-3 h-3" />}
                                        {service}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Action */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-4 bg-tuio-red text-white rounded-xl font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            'Save Listing'
                        )}
                    </button>
                </div>
            </form>
        </GlassCard>
    );
}
