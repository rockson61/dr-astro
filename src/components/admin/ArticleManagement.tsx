import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle, XCircle, Trash2, Search, ExternalLink, Filter } from 'lucide-react';
import { createSupabaseBrowserClient } from '../../lib/supabase';
import GlassCard from '../ui/GlassCard';
import GlassContainer from '../layouts/GlassContainer';

const supabase = createSupabaseBrowserClient();

interface Article {
    id: string;
    title: string;
    slug: string;
    status: 'published' | 'draft' | 'pending' | 'rejected' | 'archived';
    created_at: string;
    published_at: string | null;
    views_count: number;
    author: {
        full_name: string;
        email: string;
    } | null;
}

const STATUS_COLORS = {
    published: 'bg-green-100 text-green-700',
    draft: 'bg-gray-100 text-gray-700',
    pending: 'bg-yellow-100 text-yellow-700',
    rejected: 'bg-red-100 text-red-700',
    archived: 'bg-slate-100 text-slate-700'
};

export default function ArticleManagement() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('articles')
                .select(`
                    id, 
                    title, 
                    slug, 
                    status, 
                    created_at, 
                    published_at, 
                    views_count,
                    profiles!author_id (full_name, email)
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (data) {
                // Map the joined data to our interface
                const mappedArticles: Article[] = data.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    slug: item.slug,
                    status: item.status,
                    created_at: item.created_at,
                    published_at: item.published_at,
                    views_count: item.views_count,
                    author: item.profiles
                }));
                setArticles(mappedArticles);
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
            alert('Failed to load articles');
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        if (!confirm(`Are you sure you want to change status to ${newStatus}?`)) return;

        try {
            setIsProcessing(true);
            const { error } = await supabase
                .from('articles')
                .update({
                    status: newStatus,
                    published_at: newStatus === 'published' ? new Date().toISOString() : null
                })
                .eq('id', id);

            if (error) throw error;

            setArticles(articles.map(article =>
                article.id === id
                    ? { ...article, status: newStatus as any }
                    : article
            ));
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update article status');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this article? This cannot be undone.')) return;

        try {
            setIsProcessing(true);
            const { error } = await supabase
                .from('articles')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setArticles(articles.filter(article => article.id !== id));
        } catch (error) {
            console.error('Error deleting article:', error);
            alert('Failed to delete article');
        } finally {
            setIsProcessing(false);
        }
    };

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.author?.full_name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || article.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: articles.length,
        pending: articles.filter(a => a.status === 'pending').length,
        published: articles.filter(a => a.status === 'published').length
    };

    if (isLoading) return <div className="p-12 text-center text-gray-500">Loading articles...</div>;

    return (
        <GlassContainer className="pt-24 pb-16">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Article Management</h1>
                    <p className="text-slate-600">Review, approve, and manage community articles.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <GlassCard className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-bold uppercase">Total Articles</p>
                            <p className="text-3xl font-bold text-slate-800">{stats.total}</p>
                        </div>
                        <FileText className="w-10 h-10 text-blue-500 opacity-20" />
                    </GlassCard>
                    <GlassCard className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-yellow-600 font-bold uppercase">Pending Review</p>
                            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                        </div>
                        <Filter className="w-10 h-10 text-yellow-500 opacity-20" />
                    </GlassCard>
                    <GlassCard className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-green-600 font-bold uppercase">Published</p>
                            <p className="text-3xl font-bold text-green-600">{stats.published}</p>
                        </div>
                        <CheckCircle className="w-10 h-10 text-green-500 opacity-20" />
                    </GlassCard>
                </div>

                {/* Controls */}
                <GlassCard className="p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        <div className="relative flex-grow max-w-lg">
                            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by title or author..."
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
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </GlassCard>

                {/* Table */}
                <GlassCard className="!p-0 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Article Title</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Author</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Date</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredArticles.map((article) => (
                                    <tr key={article.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-800">{article.title}</span>
                                                <a href={`/articles/${article.slug}`} target="_blank" className="text-xs text-blue-500 hover:underline flex items-center gap-1 mt-1">
                                                    View Article <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                                    {article.author?.full_name?.[0] || '?'}
                                                </div>
                                                <div className="text-sm">
                                                    <p className="font-medium text-slate-900">{article.author?.full_name || 'Unknown'}</p>
                                                    <p className="text-xs text-gray-500">{article.author?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${STATUS_COLORS[article.status] || 'bg-gray-100'}`}>
                                                {article.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(article.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {article.status !== 'published' && (
                                                    <button
                                                        onClick={() => handleStatusChange(article.id, 'published')}
                                                        disabled={isProcessing}
                                                        className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors title='Approve'"
                                                    >
                                                        <CheckCircle className="w-5 h-5" />
                                                    </button>
                                                )}
                                                {article.status !== 'rejected' && (
                                                    <button
                                                        onClick={() => handleStatusChange(article.id, 'rejected')}
                                                        disabled={isProcessing}
                                                        className="p-2 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors title='Reject'"
                                                    >
                                                        <XCircle className="w-5 h-5" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(article.id)}
                                                    disabled={isProcessing}
                                                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors title='Delete'"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredArticles.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                            No articles found matching your criteria.
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
