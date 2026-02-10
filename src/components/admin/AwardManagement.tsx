import React, { useState, useEffect } from 'react';
import { Trophy, Plus, Users, Loader2, Save, Trash2, CheckCircle, Search } from 'lucide-react';
import { createSupabaseBrowserClient } from '../../lib/supabase';
import GlassCard from '../ui/GlassCard';
import GlassContainer from '../layouts/GlassContainer';

const supabase = createSupabaseBrowserClient();

interface Award {
    id: number;
    title: string;
    year: number;
    status: string;
    slug: string;
}

interface Nomination {
    id: string;
    nominee_id: string;
    status: string;
    nominee_profile?: {
        full_name: string;
        email: string;
    };
}

export default function AwardManagement() {
    const [awards, setAwards] = useState<Award[]>([]);
    const [selectedAward, setSelectedAward] = useState<Award | null>(null);
    const [nominations, setNominations] = useState<Nomination[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    // New Award Form
    const [newAward, setNewAward] = useState({ title: '', year: new Date().getFullYear(), description: '' });

    // User Search for Nomination
    const [userSearch, setUserSearch] = useState('');
    const [userResults, setUserResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        fetchAwards();
    }, []);

    useEffect(() => {
        if (selectedAward) {
            fetchNominations(selectedAward.id);
        }
    }, [selectedAward]);

    const fetchAwards = async () => {
        try {
            const { data, error } = await supabase
                .from('awards')
                .select('*')
                .order('year', { ascending: false });
            if (error) throw error;
            setAwards(data || []);
        } catch (error) {
            console.error('Error fetching awards:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchNominations = async (awardId: number) => {
        try {
            // We assume 'award_nominations' exists and has a join on profiles via nominee_id
            const { data, error } = await supabase
                .from('award_nominations')
                .select('*, nominee_profile:profiles!nominee_id(full_name, email)')
                .eq('award_id', awardId);

            if (error) {
                console.warn('Error fetching nominations (table might be missing):', error);
                setNominations([]);
            } else {
                setNominations(data || []);
            }
        } catch (error) {
            console.error('Execption fetching nominations:', error);
        }
    };

    const handleCreateAward = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const slug = newAward.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + newAward.year;
            const { data, error } = await supabase.from('awards').insert({
                title: newAward.title,
                year: newAward.year,
                slug,
                description: newAward.description,
                status: 'nominations_open'
            }).select().single();

            if (error) throw error;
            setAwards([data, ...awards]);
            setIsCreating(false);
            setNewAward({ title: '', year: new Date().getFullYear(), description: '' });
        } catch (error) {
            alert('Failed to create award');
            console.error(error);
        }
    };

    const handleSearchUsers = async (query: string) => {
        setUserSearch(query);
        if (query.length < 2) {
            setUserResults([]);
            return;
        }
        setIsSearching(true);
        const { data } = await supabase
            .from('profiles')
            .select('id, full_name, email')
            .ilike('full_name', `%${query}%`)
            .limit(5);
        setUserResults(data || []);
        setIsSearching(false);
    };

    const nominateUser = async (user: any) => {
        if (!selectedAward) return;
        try {
            const { error } = await supabase.from('award_nominations').insert({
                award_id: selectedAward.id,
                nominee_id: user.id,
                status: 'nominated'
            });
            if (error) throw error;
            fetchNominations(selectedAward.id);
            setUserSearch('');
            setUserResults([]);
        } catch (error) {
            alert('Failed to nominate user (maybe already nominated?)');
            console.error(error);
        }
    };

    const updateNominationStatus = async (id: string, status: string) => {
        try {
            await supabase.from('award_nominations').update({ status }).eq('id', id);
            setNominations(nominations.map(n => n.id === id ? { ...n, status } : n));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <GlassContainer className="pt-24 pb-16">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Award Management</h1>
                        <p className="text-slate-600">Manage recognition and nominations.</p>
                    </div>
                    <button
                        onClick={() => setIsCreating(true)}
                        className="px-6 py-3 bg-tuio-red text-white rounded-xl font-bold uppercase tracking-wide flex items-center gap-2 hover:bg-tuio-navy transition-all shadow-lg"
                    >
                        <Plus className="w-5 h-5" /> New Award
                    </button>
                </div>

                {isCreating && (
                    <GlassCard className="mb-8 p-6 bg-white/50 border-tuio-red/30">
                        <form onSubmit={handleCreateAward} className="grid md:grid-cols-4 gap-4 items-end">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Award Title</label>
                                <input
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-tuio-red"
                                    value={newAward.title}
                                    onChange={e => setNewAward({ ...newAward, title: e.target.value })}
                                    placeholder="e.g. Best Digital Dentist"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Year</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-tuio-red"
                                    value={newAward.year}
                                    onChange={e => setNewAward({ ...newAward, year: parseInt(e.target.value) })}
                                    required
                                />
                            </div>
                            <div className="flex gap-2">
                                <button type="submit" className="flex-1 bg-tuio-navy text-white py-2 rounded-lg font-bold hover:bg-tuio-red transition-colors">Save</button>
                                <button type="button" onClick={() => setIsCreating(false)} className="px-4 py-2 bg-gray-200 rounded-lg font-bold text-gray-600">Cancel</button>
                            </div>
                        </form>
                    </GlassCard>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Award List (Left) */}
                    <div className="lg:col-span-1 space-y-4">
                        {awards.map(award => (
                            <div
                                key={award.id}
                                onClick={() => setSelectedAward(award)}
                                className={`p-6 rounded-2xl cursor-pointer transition-all border ${selectedAward?.id === award.id
                                        ? 'bg-white border-tuio-red shadow-lg scale-105'
                                        : 'bg-white/60 border-transparent hover:bg-white'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600">
                                        <Trophy className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-tuio-navy">{award.title}</h3>
                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide mt-1">
                                            <span className="text-gray-500">{award.year}</span>
                                            <span className={`px-2 py-0.5 rounded-full ${award.status === 'closed' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                                {award.status?.replace('_', ' ')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Nomination Details (Right) */}
                    <GlassCard className="lg:col-span-2 min-h-[500px]">
                        {selectedAward ? (
                            <>
                                <div className="flex justify-between items-start mb-6 pb-6 border-b border-gray-100">
                                    <div>
                                        <h2 className="text-2xl font-bold text-tuio-navy">{selectedAward.title} ({selectedAward.year})</h2>
                                        <p className="text-gray-500 text-sm mt-1">Manage nominations and select winners.</p>
                                    </div>
                                    <div className="relative">
                                        <input
                                            value={userSearch}
                                            onChange={e => handleSearchUsers(e.target.value)}
                                            placeholder="Nominate user..."
                                            className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-tuio-red w-64"
                                        />
                                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />

                                        {/* Dropdown Results */}
                                        {userResults.length > 0 && (
                                            <div className="absolute top-12 left-0 right-0 bg-white shadow-xl rounded-xl z-10 overflow-hidden border border-gray-100">
                                                {userResults.map(u => (
                                                    <div
                                                        key={u.id}
                                                        onClick={() => nominateUser(u)}
                                                        className="px-4 py-3 hover:bg-tuio-bg cursor-pointer text-sm font-medium text-tuio-navy"
                                                    >
                                                        {u.full_name} <span className="text-xs text-gray-400 block">{u.email}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {nominations.length === 0 ? (
                                        <div className="text-center py-12 text-gray-400">
                                            <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                            <p>No nominations yet.</p>
                                        </div>
                                    ) : (
                                        nominations.map(nom => (
                                            <div key={nom.id} className="flex items-center justify-between p-4 bg-white/50 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-gray-200">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-tuio-bg rounded-full flex items-center justify-center font-bold text-tuio-navy">
                                                        {nom.nominee_profile?.full_name?.[0] || '?'}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-tuio-navy">{nom.nominee_profile?.full_name || 'Unknown User'}</p>
                                                        <p className="text-xs text-gray-500">{nom.nominee_profile?.email}</p>
                                                    </div>
                                                </div>
                                                <select
                                                    value={nom.status}
                                                    onChange={(e) => updateNominationStatus(nom.id, e.target.value)}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase bg-transparent border border-gray-200 outline-none cursor-pointer ${nom.status === 'winner' ? 'text-yellow-600 bg-yellow-50 border-yellow-200' :
                                                            nom.status === 'shortlisted' ? 'text-red-600 bg-red-50' :
                                                                'text-gray-600'
                                                        }`}
                                                >
                                                    <option value="nominated">Nominated</option>
                                                    <option value="shortlisted">Shortlisted</option>
                                                    <option value="finalist">Finalist</option>
                                                    <option value="winner">Winner</option>
                                                </select>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                                <Trophy className="w-24 h-24 mb-4" />
                                <p className="text-xl font-tuio uppercase">Select an Award</p>
                            </div>
                        )}
                    </GlassCard>
                </div>
            </div>
        </GlassContainer>
    );
}
