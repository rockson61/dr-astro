
import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Calendar, MapPin, Briefcase, User, FileText, ArrowRight, Store } from 'lucide-react';
import { debounce } from '../../utils/debounce';

interface SearchResult {
    id: string;
    type: 'article' | 'profile' | 'job' | 'event' | 'listing';
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
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const performSearch = async (q: string, type: string) => {
        if (!q || q.length < 2) {
            setResults([]);
            return;
        }
        setIsLoading(true);
        setHasSearched(true);
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(q)}&type=${type}`);
            const data = await response.json();
            setResults(data.results || []);
        } catch (error) {
            console.error('Search failed', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Debounced version for typing
    const debouncedSearch = useCallback(
        debounce((q: string, type: string) => performSearch(q, type), 500),
        []
    );

    useEffect(() => {
        if (query.length >= 2) {
            debouncedSearch(query, filter);
        } else {
            setResults([]);
            setHasSearched(false);
        }
    }, [query, filter]);

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'articles', label: 'Articles' },
        { id: 'events', label: 'Events' },
        { id: 'directory', label: 'Directory' },
        { id: 'jobs', label: 'Jobs' },
        { id: 'people', label: 'People' }
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'article': return <FileText className="w-5 h-5 text-blue-500" />;
            case 'event': return <Calendar className="w-5 h-5 text-orange-500" />;
            case 'job': return <Briefcase className="w-5 h-5 text-red-500" />;
            case 'listing': return <Store className="w-5 h-5 text-green-500" />;
            case 'profile': return <User className="w-5 h-5 text-red-500" />;
            default: return <Search className="w-5 h-5 text-gray-400" />;
        }
    };

    const getLink = (item: SearchResult) => {
        switch (item.type) {
            case 'article': return `/articles/${item.slug}`;
            case 'event': return `/events/${item.slug}`;
            case 'job': return `/jobs/${item.slug}`;
            case 'listing': return `/directory/${item.slug}`;
            case 'profile': return `/profile/${item.slug || item.id}`;
            default: return '#';
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-8">
                <div className="absolute inset-x-0 -top-40 h-40 bg-gradient-to-b from-tuio-red/20 to-transparent pointer-events-none" />

                <div className="relative z-10 bg-white rounded-full shadow-lg p-2 flex items-center border border-gray-100 focus-within:ring-4 ring-tuio-red/20 transition-all">
                    <div className="pl-4 pr-3 text-gray-400">
                        <Search className="w-6 h-6" />
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search articles, dentists, events..."
                        className="flex-grow bg-transparent border-none outline-none text-lg text-gray-700 placeholder:text-gray-400 py-3"
                        autoFocus
                    />
                    {isLoading && (
                        <div className="pr-4">
                            <div className="w-5 h-5 border-2 border-tuio-red border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 justify-center mt-6">
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
            </div>

            {/* Results Area */}
            <div className="space-y-4">
                {results.length > 0 ? (
                    results.map((item) => (
                        <a
                            key={`${item.type}-${item.id}`}
                            href={getLink(item)}
                            className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="shrink-0 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                                    {item.image_url || item.avatar_url ? (
                                        <img
                                            src={item.image_url || item.avatar_url}
                                            alt={item.title || item.full_name}
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
                        <div className="text-center py-20 bg-white/50 rounded-2xl border border-dashed border-gray-200">
                            <div className="text-4xl mb-4">🤔</div>
                            <h3 className="text-lg font-bold text-gray-700">No results found</h3>
                            <p className="text-gray-500">Try adjusting your search terms or filters.</p>
                        </div>
                    )
                )}

                {!hasSearched && (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-sm">Start typing to search across the entire platform.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
