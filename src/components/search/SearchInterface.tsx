
import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Calendar, MapPin, Briefcase, User, FileText, ArrowRight, Store, Clock, X } from 'lucide-react';
import { debounce } from '../../utils/debounce';

interface SearchResult {
    id: string;
    type: 'article' | 'profile' | 'job' | 'event' | 'listing' | 'product';
    title?: string;
    full_name?: string;
    business_name?: string;
    slug: string;
    description?: string;
    excerpt?: string;
    specialty?: string;
    location?: string;
    image_url?: string;
    avatar_url?: string;
    created_at?: string;
    start_date?: string;
    company_name?: string;
}

export default function SearchInterface() {
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('relevance');
    const [dateRange, setDateRange] = useState('all'); // all, 30days, year
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('dr_recent_searches');
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
    }, []);

    const saveSearch = (q: string) => {
        if (!q || q.length < 2) return;
        const newHistory = [q, ...recentSearches.filter(s => s !== q)].slice(0, 5);
        setRecentSearches(newHistory);
        localStorage.setItem('dr_recent_searches', JSON.stringify(newHistory));
    };

    const removeHistoryItem = (e: React.MouseEvent, item: string) => {
        e.stopPropagation();
        const newHistory = recentSearches.filter(s => s !== item);
        setRecentSearches(newHistory);
        localStorage.setItem('dr_recent_searches', JSON.stringify(newHistory));
    };

    const performSearch = async (q: string, type: string, s: string, d: string) => {
        if (!q || q.length < 2) {
            setResults([]);
            return;
        }
        setIsLoading(true);
        setHasSearched(true);
        setShowHistory(false);
        saveSearch(q);

        try {
            // Calculate Dates
            let startDate = '';
            let endDate = '';
            const now = new Date();
            if (d === '30days') {
                const past = new Date();
                past.setDate(now.getDate() - 30);
                startDate = past.toISOString();
            } else if (d === 'year') {
                const past = new Date();
                past.setFullYear(now.getFullYear() - 1);
                startDate = past.toISOString();
            }

            const params = new URLSearchParams({
                q,
                type,
                sort: s,
                ...(startDate && { startDate })
            });

            const response = await fetch(`/api/search?${params.toString()}`);
            const data = await response.json();
            setResults(data.results || []);
        } catch (error) {
            console.error('Search failed', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Debounced version
    const debouncedSearch = useCallback(
        debounce((q: string, t: string, s: string, d: string) => performSearch(q, t, s, d), 500),
        []
    );

    useEffect(() => {
        if (query.length >= 2) {
            debouncedSearch(query, filter, sort, dateRange);
        } else {
            setResults([]);
            setHasSearched(false);
        }
    }, [query, filter, sort, dateRange]);

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'articles', label: 'Articles' },
        { id: 'people', label: 'People' },
        { id: 'events', label: 'Events' },
        { id: 'directory', label: 'Directory' },
        { id: 'jobs', label: 'Jobs' },
        { id: 'products', label: 'Products' }
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'article': return <FileText className="w-5 h-5 text-blue-500" />;
            case 'event': return <Calendar className="w-5 h-5 text-orange-500" />;
            case 'job': return <Briefcase className="w-5 h-5 text-red-500" />;
            case 'listing': return <Store className="w-5 h-5 text-green-500" />;
            case 'profile': return <User className="w-5 h-5 text-red-500" />;
            case 'product': return <Store className="w-5 h-5 text-tuio-red" />;
            default: return <Search className="w-5 h-5 text-gray-400" />;
        }
    };

    const getLink = (item: SearchResult) => {
        switch (item.type) {
            case 'article': return `/articles/${item.slug}`;
            case 'event': return `/events/${item.slug}`;
            case 'job': return `/jobs/${item.slug}`;
            case 'listing': return `/directory/${item.slug}`;
            case 'profile': return `/profile/${item.slug || 'id'}`; // fallback if no slug
            case 'product': return `/products/${item.slug}`;
            default: return '#';
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-8">
                <div className="absolute inset-x-0 -top-40 h-40 bg-gradient-to-b from-tuio-red/20 to-transparent pointer-events-none" />

                <div className="relative z-10 bg-white rounded-[24px] shadow-lg flex flex-col border border-gray-100 focus-within:ring-4 ring-tuio-red/20 transition-all overflow-hidden">
                    <div className="flex items-center p-2">
                        <div className="pl-4 pr-3 text-gray-400">
                            <Search className="w-6 h-6" />
                        </div>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                if (!e.target.value) setShowHistory(true);
                            }}
                            onFocus={() => setShowHistory(true)}
                            onBlur={() => setTimeout(() => setShowHistory(false), 200)}
                            placeholder="Search articles, dentists, events..."
                            className="flex-grow bg-transparent border-none outline-none text-lg text-gray-700 placeholder:text-gray-400 py-3"
                            autoComplete="off"
                        />
                        {query && (
                            <button
                                onClick={() => { setQuery(''); setResults([]); setHasSearched(false); }}
                                className="p-2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                        {isLoading && (
                            <div className="pr-4">
                                <div className="w-5 h-5 border-2 border-tuio-red border-t-transparent rounded-full animate-spin" />
                            </div>
                        )}
                    </div>

                    {/* Recent Searches Dropdown */}
                    {showHistory && recentSearches.length > 0 && !query && (
                        <div className="border-t border-gray-100 bg-gray-50/50 p-2">
                            <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">Recent Searches</div>
                            <ul>
                                {recentSearches.map((term, i) => (
                                    <li key={i}>
                                        <button
                                            onMouseDown={(e) => e.preventDefault()} // Prevent blur
                                            onClick={() => setQuery(term)}
                                            className="w-full text-left px-4 py-2 hover:bg-white hover:shadow-sm rounded-lg flex items-center justify-between text-gray-600 group transition-all"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Clock className="w-4 h-4 text-gray-400" />
                                                {term}
                                            </div>
                                            <span
                                                onClick={(e) => removeHistoryItem(e, term)}
                                                className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500"
                                            >
                                                <X className="w-3 h-3" />
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Filters Row */}
                <div className="flex flex-col md:flex-row gap-4 mt-6 items-center justify-between">
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {filters.map(f => (
                            <button
                                key={f.id}
                                onClick={() => setFilter(f.id)}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === f.id
                                    ? 'bg-tuio-navy text-white shadow-md transform scale-105'
                                    : 'bg-white text-gray-500 hover:bg-gray-100'
                                    }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>

                    {/* Advanced Sort/Filter */}
                    <div className="flex gap-2">
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="bg-white border-none py-2 px-4 rounded-full text-sm font-bold text-gray-600 shadow-sm cursor-pointer hover:bg-gray-50 focus:ring-0"
                        >
                            <option value="all">Any Date</option>
                            <option value="30days">Last 30 Days</option>
                            <option value="year">Last Year</option>
                        </select>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="bg-white border-none py-2 px-4 rounded-full text-sm font-bold text-gray-600 shadow-sm cursor-pointer hover:bg-gray-50 focus:ring-0"
                        >
                            <option value="relevance">Relevance</option>
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Results Area */}
            <div className="space-y-4">
                {results.length > 0 ? (
                    results.map((item) => (
                        <a
                            key={`${item.type}-${item.id}`}
                            href={getLink(item)}
                            className="block bg-white rounded-[20px] p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 group hover:-translate-y-1"
                        >
                            <div className="flex items-start gap-4">
                                <div className="shrink-0 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                                    {item.image_url || item.avatar_url ? (
                                        <img
                                            src={item.image_url || item.avatar_url}
                                            alt={item.title || item.full_name || "Image"}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        getIcon(item.type)
                                    )}
                                </div>
                                <div className="flex-grow min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500`}>
                                            {item.type}
                                        </span>
                                        {item.location && (
                                            <span className="flex items-center text-xs text-gray-400">
                                                <MapPin className="w-3 h-3 mr-1" /> {item.location}
                                            </span>
                                        )}
                                        {item.created_at && (
                                            <span className="text-[10px] text-gray-300">
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold text-tuio-navy group-hover:text-tuio-red transition-colors truncate">
                                        {item.title || item.full_name || item.business_name}
                                    </h3>
                                    <p className="text-gray-500 text-sm line-clamp-2 mt-1">
                                        {item.excerpt || item.description || item.specialty || item.company_name}
                                    </p>
                                </div>
                                <div className="self-center text-gray-300 group-hover:text-tuio-red transition-colors">
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            </div>
                        </a>
                    ))
                ) : (
                    hasSearched && !isLoading && query.length >= 2 && (
                        <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-gray-200">
                            <div className="text-4xl mb-4">🤔</div>
                            <h3 className="text-lg font-bold text-gray-700">No results found</h3>
                            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
                        </div>
                    )
                )}

                {!hasSearched && !query && (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-sm">Start typing to search across the entire platform.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
