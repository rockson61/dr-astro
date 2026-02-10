import React, { useState } from 'react';
import { Calendar, MapPin, Globe, FileText, Loader2, Video } from 'lucide-react';
import { createSupabaseBrowserClient } from '../../lib/supabase';
import GlassCard from '../ui/GlassCard';

const supabase = createSupabaseBrowserClient();

const EVENT_TYPES = [
    { value: 'Conference', label: 'Conference' },
    { value: 'Webinar', label: 'Webinar' },
    { value: 'Workshop', label: 'Workshop' },
    { value: 'Seminar', label: 'Seminar' },
    { value: 'Congress', label: 'Congress' }
];

interface EventFormProps {
    initialData?: any;
}

export default function EventForm({ initialData }: EventFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        type: initialData?.type || 'Conference',
        start_date: initialData?.start_date ? new Date(initialData.start_date).toISOString().slice(0, 16) : '',
        end_date: initialData?.end_date ? new Date(initialData.end_date).toISOString().slice(0, 16) : '',
        location_name: initialData?.location_name || '',
        is_virtual: initialData?.is_virtual || false,
        registration_url: initialData?.registration_url || '',
        description: initialData?.description || ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
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
                    .from('events')
                    .update({
                        title: formData.title,
                        type: formData.type,
                        start_date: formData.start_date,
                        end_date: formData.end_date || null,
                        location_name: formData.is_virtual ? 'Virtual' : formData.location_name,
                        is_virtual: formData.is_virtual,
                        registration_url: formData.registration_url,
                        description: formData.description,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', initialData.id);
                error = updateError;
            } else {
                // Create
                const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 7);

                const { error: insertError } = await supabase.from('events').insert({
                    title: formData.title,
                    slug,
                    type: formData.type,
                    start_date: formData.start_date,
                    end_date: formData.end_date || null,
                    location_name: formData.is_virtual ? 'Virtual' : formData.location_name,
                    is_virtual: formData.is_virtual,
                    registration_url: formData.registration_url,
                    description: formData.description,
                    organizer_id: user.id,
                    status: 'upcoming'
                });
                error = insertError;
            }

            if (error) throw error;

            // Redirect to My Events
            window.location.href = '/dashboard/my-events';
        } catch (error: any) {
            console.error('Error saving event:', error);
            alert(error.message || 'Failed to save event');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GlassCard className="max-w-4xl mx-auto p-8">
            <h2 className="text-2xl font-bold text-tuio-navy mb-6 flex items-center gap-3">
                <Calendar className="w-8 h-8 text-tuio-red" />
                Create New Event
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Event Title */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Event Title *</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Annual Dental Congress"
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Event Type */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Event Type *</label>
                        <select
                            name="type"
                            required
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all bg-white"
                        >
                            {EVENT_TYPES.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Start Date */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Start Date *</label>
                        <input
                            type="datetime-local"
                            name="start_date"
                            required
                            value={formData.start_date}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    {/* End Date */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">End Date (Optional)</label>
                        <input
                            type="datetime-local"
                            name="end_date"
                            value={formData.end_date}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Virtual Toggle */}
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                    <input
                        type="checkbox"
                        id="is_virtual"
                        name="is_virtual"
                        checked={formData.is_virtual}
                        onChange={handleChange}
                        className="w-5 h-5 text-tuio-red rounded focus:ring-tuio-red border-gray-300"
                    />
                    <label htmlFor="is_virtual" className="font-bold text-gray-700 flex items-center gap-2 cursor-pointer select-none">
                        <Video className="w-5 h-5 text-tuio-red" />
                        This is a Virtual Event / Webinar
                    </label>
                </div>

                {/* Location Name (Hidden if Virtual) */}
                {!formData.is_virtual && (
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Location / Venue *</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                name="location_name"
                                required={!formData.is_virtual}
                                value={formData.location_name}
                                onChange={handleChange}
                                placeholder="e.g. Jacob Javits Center, NYC"
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>
                )}

                {/* Registration URL */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Registration Link *</label>
                    <div className="relative">
                        <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="url"
                            name="registration_url"
                            required
                            value={formData.registration_url}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-tuio-red focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Event Details *</label>
                    <div className="relative">
                        <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <textarea
                            name="description"
                            required
                            value={formData.description}
                            onChange={handleChange}
                            rows={6}
                            placeholder="Describe the event, speakers, and agenda..."
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
                                creating...
                            </>
                        ) : (
                            'Create Event'
                        )}
                    </button>
                </div>
            </form>
        </GlassCard>
    );
}
