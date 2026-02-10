import React, { useState, useEffect } from 'react';
import { Building2, CheckCircle, XCircle, Trash2, Search, ExternalLink, ShieldCheck, Plus } from 'lucide-react';
import { createSupabaseBrowserClient } from '../../lib/supabase';
import GlassCard from '../ui/GlassCard';
import GlassContainer from '../layouts/GlassContainer';

const supabase = createSupabaseBrowserClient();

interface Listing {
    id: string;
    business_name: string;
    slug: string;
    is_verified: boolean;
    created_at: string;
    owner: {
        full_name: string;
        email: string;
    } | null;
}

export default function ListingManagement() {
    const [listings, setListings] = useState<Listing[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterVerified, setFilterVerified] = useState<string>('all');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('listings')
                .select(`
                    id, 
                    business_name, 
                    slug, 
                    is_verified, 
                    created_at,
                    profiles!owner_id (full_name, email)
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (data) {
                const mappedListings: Listing[] = data.map((item: any) => ({
                    id: item.id,
                    business_name: item.business_name,
                    slug: item.slug,
                    is_verified: item.is_verified,
                    created_at: item.created_at,
                    owner: item.profiles
                }));
                setListings(mappedListings);
            }
        } catch (error) {
            console.error('Error fetching listings:', error);
            alert('Failed to load listings');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleVerification = async (id: string, currentStatus: boolean) => {
        if (!confirm(`Are you sure you want to ${currentStatus ? 'remove verification from' : 'verify'} this listing?`)) return;

        try {
            setIsProcessing(true);
            const { error } = await supabase
                .from('listings')
                .update({ is_verified: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            setListings(listings.map(item =>
                item.id === id
                    ? { ...item, is_verified: !currentStatus }
                    : item
            ));
        } catch (error) {
            console.error('Error updating verification:', error);
            alert('Failed to update status');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this listing? This cannot be undone.')) return;

        try {
            setIsProcessing(true);
            const { error } = await supabase
                .from('listings')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setListings(listings.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting listing:', error);
            alert('Failed to delete listing');
        } finally {
            setIsProcessing(false);
        }
    };

    const filteredListings = listings.filter(item => {
        const matchesSearch = item.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.owner?.full_name?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterVerified === 'all' ||
            (filterVerified === 'verified' && item.is_verified) ||
            (filterVerified === 'unverified' && !item.is_verified);

        return matchesSearch && matchesFilter;
    });

    const stats = {
        total: listings.length,
        verified: listings.filter(i => i.is_verified).length,
        unverified: listings.filter(i => !i.is_verified).length
    };

    if (isLoading) return <div className="p-12 text-center text-gray-500">Loading listings...</div>;

    return (
        <GlassContainer className="pt-24 pb-16">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Listing Management</h1>
                        <p className="text-slate-600">Verify and manage business directory listings.</p>
                    </div>
                    <a href="/dashboard/listings/new" className="px-6 py-3 bg-tuio-red text-white rounded-xl font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Add Listing
                    </a>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <GlassCard className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-bold uppercase">Total Listings</p>
                            <p className="text-3xl font-bold text-slate-800">{stats.total}</p>
                        </div>
                        <Building2 className="w-10 h-10 text-blue-500 opacity-20" />
                    </GlassCard>
                    <GlassCard className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-green-600 font-bold uppercase">Verified</p>
                            <p className="text-3xl font-bold text-green-600">{stats.verified}</p>
                        </div>
                        <ShieldCheck className="w-10 h-10 text-green-500 opacity-20" />
                    </GlassCard>
                    <GlassCard className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-bold uppercase">Unverified</p>
                            <p className="text-3xl font-bold text-gray-500">{stats.unverified}</p>
                        </div>
                        <CheckCircle className="w-10 h-10 text-gray-300 opacity-20" />
                    </GlassCard>
                </div>

                {/* Controls */}
                <GlassCard className="p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="relative flex-grow max-w-lg">
                            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by business name or owner..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <select
                            value={filterVerified}
                            onChange={(e) => setFilterVerified(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Listings</option>
                            <option value="verified">Verified Only</option>
                            <option value="unverified">Unverified Only</option>
                        </select>
                    </div>
                </GlassCard>

                {/* Table */}
                <GlassCard className="!p-0 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Business Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Owner</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Verification</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Date</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredListings.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-slate-800">{item.business_name}</span>
                                                    {item.is_verified && <ShieldCheck className="w-4 h-4 text-green-500" />}
                                                </div>
                                                <a href={`/directory/${item.slug}`} target="_blank" className="text-xs text-blue-500 hover:underline flex items-center gap-1 mt-1">
                                                    View Listing <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                                    {item.owner?.full_name?.[0] || '?'}
                                                </div>
                                                <div className="text-sm">
                                                    <p className="font-medium text-slate-900">{item.owner?.full_name || 'Unknown'}</p>
                                                    <p className="text-xs text-gray-500">{item.owner?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${item.is_verified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                {item.is_verified ? 'Verified' : 'Unverified'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => toggleVerification(item.id, item.is_verified)}
                                                    disabled={isProcessing}
                                                    className={`p-2 rounded-lg transition-colors ${item.is_verified ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
                                                    title={item.is_verified ? 'Revoke Verification' : 'Verify Listing'}
                                                >
                                                    {item.is_verified ? <XCircle className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    disabled={isProcessing}
                                                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors title='Delete'"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredListings.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                            No listings found.
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
