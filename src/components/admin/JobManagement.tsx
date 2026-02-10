import React, { useState, useEffect } from 'react';
import { Briefcase, CheckCircle, XCircle, Trash2, Search, ExternalLink, Power, Plus } from 'lucide-react';
import { createSupabaseBrowserClient } from '../../lib/supabase';
import GlassCard from '../ui/GlassCard';
import GlassContainer from '../layouts/GlassContainer';

const supabase = createSupabaseBrowserClient();

interface Job {
    id: string;
    title: string;
    slug: string;
    company_name: string;
    location: string;
    type: string;
    is_active: boolean;
    created_at: string;
}

export default function JobManagement() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterActive, setFilterActive] = useState<string>('all');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('jobs')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (data) {
                setJobs(data);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
            alert('Failed to load jobs');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleActive = async (id: string, currentStatus: boolean) => {
        try {
            setIsProcessing(true);
            const { error } = await supabase
                .from('jobs')
                .update({ is_active: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            setJobs(jobs.map(job =>
                job.id === id
                    ? { ...job, is_active: !currentStatus }
                    : job
            ));
        } catch (error) {
            console.error('Error updating job status:', error);
            alert('Failed to update status');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this job? This cannot be undone.')) return;

        try {
            setIsProcessing(true);
            const { error } = await supabase
                .from('jobs')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setJobs(jobs.filter(job => job.id !== id));
        } catch (error) {
            console.error('Error deleting job:', error);
            alert('Failed to delete job');
        } finally {
            setIsProcessing(false);
        }
    };

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company_name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterActive === 'all' ||
            (filterActive === 'active' && job.is_active) ||
            (filterActive === 'inactive' && !job.is_active);

        return matchesSearch && matchesFilter;
    });

    const stats = {
        total: jobs.length,
        active: jobs.filter(j => j.is_active).length,
        inactive: jobs.filter(j => !j.is_active).length
    };

    if (isLoading) return <div className="p-12 text-center text-gray-500">Loading jobs...</div>;

    return (
        <GlassContainer className="pt-24 pb-16">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Job Management</h1>
                        <p className="text-slate-600">Manage job postings and recruitment.</p>
                    </div>
                    <a href="/dashboard/jobs/new" className="px-6 py-3 bg-tuio-red text-white rounded-xl font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Post Job
                    </a>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <GlassCard className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-bold uppercase">Total Jobs</p>
                            <p className="text-3xl font-bold text-slate-800">{stats.total}</p>
                        </div>
                        <Briefcase className="w-10 h-10 text-blue-500 opacity-20" />
                    </GlassCard>
                    <GlassCard className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-green-600 font-bold uppercase">Active</p>
                            <p className="text-3xl font-bold text-green-600">{stats.active}</p>
                        </div>
                        <CheckCircle className="w-10 h-10 text-green-500 opacity-20" />
                    </GlassCard>
                    <GlassCard className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-bold uppercase">Inactive</p>
                            <p className="text-3xl font-bold text-gray-500">{stats.inactive}</p>
                        </div>
                        <XCircle className="w-10 h-10 text-gray-300 opacity-20" />
                    </GlassCard>
                </div>

                {/* Controls */}
                <GlassCard className="p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="relative flex-grow max-w-lg">
                            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by title or company..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <select
                            value={filterActive}
                            onChange={(e) => setFilterActive(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Jobs</option>
                            <option value="active">Active Only</option>
                            <option value="inactive">Inactive Only</option>
                        </select>
                    </div>
                </GlassCard>

                {/* Table */}
                <GlassCard className="!p-0 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Title & Company</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Location</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Type</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Posted</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredJobs.map((job) => (
                                    <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-800">{job.title}</span>
                                                <span className="text-sm text-gray-600">{job.company_name}</span>
                                                <a href={`/jobs/${job.slug}`} target="_blank" className="text-xs text-blue-500 hover:underline flex items-center gap-1 mt-1">
                                                    View Job <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{job.location}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-bold uppercase">
                                                {job.type.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${job.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                {job.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(job.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => toggleActive(job.id, job.is_active)}
                                                    disabled={isProcessing}
                                                    className={`p-2 rounded-lg transition-colors ${job.is_active ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
                                                    title={job.is_active ? 'Deactivate' : 'Activate'}
                                                >
                                                    <Power className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(job.id)}
                                                    disabled={isProcessing}
                                                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors title='Delete'"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredJobs.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            No jobs found.
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
