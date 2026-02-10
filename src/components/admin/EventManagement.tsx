import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, XCircle, Trash2, Search, ExternalLink, MapPin, Plus } from 'lucide-react';
import { createSupabaseBrowserClient } from '../../lib/supabase';
import GlassCard from '../ui/GlassCard';
import GlassContainer from '../layouts/GlassContainer';

const supabase = createSupabaseBrowserClient();

interface Event {
    id: string;
    title: string;
    slug: string;
    type: string;
    start_date: string;
    location_name: string;
    is_virtual: boolean;
    status: 'upcoming' | 'past' | 'cancelled';
    created_at: string;
}

export default function EventManagement() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .order('start_date', { ascending: true });

            if (error) throw error;

            if (data) {
                setEvents(data);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
            alert('Failed to load events');
        } finally {
            setIsLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            setIsProcessing(true);
            const { error } = await supabase
                .from('events')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;

            setEvents(events.map(event =>
                event.id === id
                    ? { ...event, status: newStatus as any }
                    : event
            ));
        } catch (error) {
            console.error('Error updating event status:', error);
            alert('Failed to update status');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event? This cannot be undone.')) return;

        try {
            setIsProcessing(true);
            const { error } = await supabase
                .from('events')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setEvents(events.filter(event => event.id !== id));
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Failed to delete event');
        } finally {
            setIsProcessing(false);
        }
    };

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location_name?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterStatus === 'all' || event.status === filterStatus;

        return matchesSearch && matchesFilter;
    });

    const stats = {
        total: events.length,
        upcoming: events.filter(e => e.status === 'upcoming').length,
        cancelled: events.filter(e => e.status === 'cancelled').length
    };

    if (isLoading) return <div className="p-12 text-center text-gray-500">Loading events...</div>;

    return (
        <GlassContainer className="pt-24 pb-16">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Event Management</h1>
                        <p className="text-slate-600">Coordinate and manage dental events.</p>
                    </div>
                    <a href="/dashboard/events/new" className="px-6 py-3 bg-tuio-red text-white rounded-xl font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Create Event
                    </a>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <GlassCard className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-bold uppercase">Total Events</p>
                            <p className="text-3xl font-bold text-slate-800">{stats.total}</p>
                        </div>
                        <Calendar className="w-10 h-10 text-blue-500 opacity-20" />
                    </GlassCard>
                    <GlassCard className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-green-600 font-bold uppercase">Upcoming</p>
                            <p className="text-3xl font-bold text-green-600">{stats.upcoming}</p>
                        </div>
                        <CheckCircle className="w-10 h-10 text-green-500 opacity-20" />
                    </GlassCard>
                    <GlassCard className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-red-600 font-bold uppercase">Cancelled</p>
                            <p className="text-3xl font-bold text-red-600">{stats.cancelled}</p>
                        </div>
                        <XCircle className="w-10 h-10 text-red-500 opacity-20" />
                    </GlassCard>
                </div>

                {/* Controls */}
                <GlassCard className="p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="relative flex-grow max-w-lg">
                            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by event title or location..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Events</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="past">Past</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </GlassCard>

                {/* Table */}
                <GlassCard className="!p-0 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Event Details</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Location</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Date</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredEvents.map((event) => (
                                    <tr key={event.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-800">{event.title}</span>
                                                <span className="text-sm text-gray-600 uppercase tracking-wider text-xs font-bold text-tuio-red">{event.type}</span>
                                                <a href={`/events/${event.slug}`} target="_blank" className="text-xs text-blue-500 hover:underline flex items-center gap-1 mt-1">
                                                    View Event <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-gray-400" />
                                                {event.is_virtual ? 'Virtual Event' : event.location_name || 'TBA'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={event.status}
                                                onChange={(e) => updateStatus(event.id, e.target.value)}
                                                disabled={isProcessing}
                                                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border-none outline-none cursor-pointer ${event.status === 'upcoming' ? 'bg-green-100 text-green-700' :
                                                    event.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                        'bg-gray-100 text-gray-500'
                                                    }`}
                                            >
                                                <option value="upcoming">Upcoming</option>
                                                <option value="past">Past</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(event.start_date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(event.id)}
                                                disabled={isProcessing}
                                                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors title='Delete'"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredEvents.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                            No events found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </GlassCard>
            </div>
        </GlassContainer>
    );
}
