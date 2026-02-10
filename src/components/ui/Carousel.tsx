import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type CarouselVariant = 'default' | 'event' | 'job' | 'forum' | 'product' | 'podcast' | 'guide' | 'award';

interface CarouselProps {
    title: string;
    viewAllLink?: string;
    items: any[];
    variant?: CarouselVariant;
}

const Carousel: React.FC<CarouselProps> = ({ title, viewAllLink, items, variant = 'default' }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // buffer
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [items]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
            setTimeout(checkScroll, 300);
        }
    };

    const renderCard = (item: any) => {
        switch (variant) {
            case 'event':
                return (
                    <a
                        href={`/events/${item.slug}`}
                        className="block w-72 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full border border-gray-100"
                    >
                        <div className="h-40 overflow-hidden relative">
                            {item.image && (
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            )}
                            <span className="absolute top-2 right-2 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {item.date ? item.date.split(',')[0] : 'TBA'}
                            </span>
                        </div>
                        <div className="p-6">
                            <h3 className="font-bold text-lg text-primary-900 mb-2 line-clamp-1">{item.title}</h3>
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <span>📍</span> {item.location}
                            </div>
                        </div>
                    </a>
                );
            case 'job':
                return (
                    <a
                        href={`/jobs/${item.slug}`}
                        className="block w-80 bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-cyan-50 rounded-xl flex items-center justify-center text-2xl">
                                🏥
                            </div>
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{item.type}</span>
                        </div>
                        <h3 className="font-bold text-xl text-primary-900 mb-1">{item.title}</h3>
                        <p className="text-gray-500 text-sm mb-4">{item.clinic}</p>

                        <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                                <span>📍</span> {item.location}
                            </div>
                            <div className="flex items-center gap-2 text-accent font-bold text-sm">
                                <span>💰</span> {item.salary}
                            </div>
                        </div>
                    </a>
                );
            case 'forum':
                return (
                    <a
                        href={`/community/topic/${item.slug}`}
                        className="block w-80 bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-l-4 border-l-primary-500 border border-gray-100"
                    >
                        <div className="mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${item.color || 'bg-gray-100 text-gray-600'}`}>Hot Topic</span>
                        </div>
                        <h3 className="font-heading text-xl text-primary-900 mb-2 line-clamp-2 leading-tight">{item.topic || item.title}</h3>
                        <p className="text-gray-400 text-sm mb-6">Posted by {item.author}</p>

                        <div className="flex items-center justify-between text-gray-500 text-sm">
                            <span className="flex items-center gap-1">💬 {item.replies} Replies</span>
                            <span className="flex items-center gap-1">👁️ {item.views}</span>
                        </div>
                    </a>
                );
            case 'product':
                return (
                    <a
                        href={`/products/${item.slug}`}
                        className="block w-64 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group"
                    >
                        <div className="h-48 overflow-hidden relative p-4 bg-gray-50 flex items-center justify-center">
                            {item.image ? (
                                <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                                <span className="text-4xl">🦷</span>
                            )}
                            <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-sm text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                🛒
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{item.category}</div>
                            <h3 className="font-bold text-lg text-primary-900 mb-2 line-clamp-2">{item.title}</h3>
                            <div className="flex items-center justify-between mt-3">
                                <span className="text-accent font-bold text-xl">{item.price}</span>
                                <span className="text-xs text-yellow-500 flex items-center gap-1">★ {item.rating}</span>
                            </div>
                        </div>
                    </a>
                );
            case 'podcast':
                return (
                    <a
                        href={`/podcasts/${item.slug}`}
                        className="block w-72 bg-primary-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white/10 group relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        <div className="p-6 relative z-10">
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-800 border border-gray-700">
                                    <img src={item.image || "https://images.pexels.com/photos/6954162/pexels-photo-6954162.jpeg?auto=compress&cs=tinysrgb&w=200"} alt="Cover" className="w-full h-full object-cover" />
                                </div>
                                <span className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center pl-1 group-hover:scale-110 transition-transform">
                                    ▶
                                </span>
                            </div>
                            <span className="text-cyan-200 text-xs font-bold uppercase tracking-widest mb-2 block">Episode {item.episode}</span>
                            <h3 className="font-heading text-xl text-white mb-2 line-clamp-2 leading-tight">{item.title}</h3>
                            <p className="text-white/50 text-xs mb-4">with {item.guest}</p>
                            <div className="flex items-center gap-3 text-white/40 text-xs font-mono border-t border-white/10 pt-4">
                                <span>⏱ {item.duration}</span>
                                <span>•</span>
                                <span>{item.date}</span>
                            </div>
                        </div>
                    </a>
                );
            case 'guide':
                return (
                    <a
                        href={`/guides/${item.slug}`}
                        className="block w-64 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group"
                    >
                        <div className="h-32 bg-cyan-50 relative overflow-hidden">
                            <div className="absolute inset-0 bg-primary-600/5"></div>
                            {item.image && <img src={item.image} className="absolute right-0 bottom-0 w-32 h-32 object-contain opacity-80 group-hover:scale-110 transition-transform duration-500 delay-75" alt="" />}
                            <div className="absolute top-4 left-4">
                                <span className="bg-white/80 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-primary-900 border border-white/50">PDF Guide</span>
                            </div>
                        </div>
                        <div className="p-5">
                            <h3 className="font-bold text-lg text-primary-900 mb-2 leading-tight">{item.title}</h3>
                            <p className="text-gray-500 text-sm line-clamp-2 mb-4">{item.description}</p>
                            <div className="flex items-center text-primary-600 text-sm font-bold group-hover:gap-2 gap-1 transition-all">
                                Download <span className="text-lg">↓</span>
                            </div>
                        </div>
                    </a>
                );
            case 'award':
                return (
                    <div className="block w-72 bg-gradient-to-br from-white to-gray-50 rounded-2xl p-1 shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-yellow-400/20 transition-colors"></div>
                        <div className="bg-white rounded-xl p-6 h-full flex flex-col items-center text-center relative z-10">
                            <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 text-yellow-500 border border-yellow-100 shadow-inner">
                                {item.icon || '🏆'}
                            </div>
                            <h3 className="font-heading text-xl text-primary-900 mb-2 uppercase leading-tight">{item.title}</h3>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>
                            <a href="/awards" className="mt-auto px-6 py-2 bg-primary-900 text-white text-sm rounded-full font-bold hover:bg-primary-600 transition-colors">
                                Nominate
                            </a>
                        </div>
                    </div>
                );
            default:
                // Default generic card if needed, or fallback
                return (
                    <a href={item.link || '#'} className="block w-64 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                    </a>
                );
        }
    };


    return (
        <div className="py-8 relative group">
            <div className="flex justify-between items-end mb-6 px-4 md:px-8">
                <div>
                    <span className="text-accent font-bold uppercase tracking-widest mb-2 block text-sm">Discover</span>
                    <h2 className="font-heading text-3xl md:text-4xl text-primary-900 uppercase">{title}</h2>
                </div>
                <div className="flex gap-2">
                    {viewAllLink && (
                        <a href={viewAllLink} className="text-sm font-bold text-gray-500 hover:text-primary-600 transition-colors mr-4 flex items-center h-10">
                            View All
                        </a>
                    )}
                    <button
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all ${canScrollLeft
                            ? 'bg-white hover:bg-primary-600 hover:text-white hover:border-primary-600 text-primary-900 cursor-pointer'
                            : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                            }`}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all ${canScrollRight
                            ? 'bg-white hover:bg-primary-600 hover:text-white hover:border-primary-600 text-primary-900 cursor-pointer'
                            : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                            }`}
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto gap-6 px-4 md:px-8 pb-8 snap-x snap-mandatory scrollbar-hide"
                onScroll={checkScroll}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="snap-start flex-shrink-0"
                    >
                        {renderCard(item)}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
