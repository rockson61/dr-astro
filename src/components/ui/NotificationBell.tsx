import React, { useState, useEffect } from 'react';
import { Bell, Check } from 'lucide-react';
import { createSupabaseBrowserClient } from '../../lib/supabase';

const supabase = createSupabaseBrowserClient();

export default function NotificationBell() {
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchUnreadCount();
        const interval = setInterval(fetchUnreadCount, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, []);

    const fetchUnreadCount = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { count, error } = await supabase
            .from('notifications')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('is_read', false);

        if (!error && count !== null) setUnreadCount(count);
    };

    const fetchLatestNotifications = async () => {
        setIsLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data } = await supabase
                .from('notifications')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(5);
            setNotifications(data || []);
        }
        setIsLoading(false);
    };

    const toggleDropdown = () => {
        if (!isOpen) {
            fetchLatestNotifications();
        }
        setIsOpen(!isOpen);
    };

    const markAsRead = async (id: string, link?: string) => {
        await supabase
            .from('notifications')
            .update({ is_read: true })
            .eq('id', id);

        setUnreadCount(prev => Math.max(0, prev - 1));
        setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));

        if (link) {
            window.location.href = link;
        }
    };

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full border-2 border-white">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-2 border-b border-gray-50 flex justify-between items-center">
                        <h3 className="font-bold text-tuio-navy text-sm">Notifications</h3>
                        <a href="/dashboard/notifications" className="text-xs text-tuio-red font-bold hover:underline">View All</a>
                    </div>

                    {isLoading ? (
                        <div className="p-8 text-center text-gray-400 text-xs">Loading...</div>
                    ) : notifications.length > 0 ? (
                        <div className="max-h-80 overflow-y-auto">
                            {notifications.map(notif => (
                                <div
                                    key={notif.id}
                                    onClick={() => markAsRead(notif.id, notif.link)}
                                    className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${!notif.is_read ? 'bg-blue-50/50' : ''}`}
                                >
                                    <div className="flex gap-3">
                                        <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${!notif.is_read ? 'bg-tuio-red' : 'bg-gray-200'}`}></div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800 leading-tight mb-1">{notif.title}</p>
                                            <p className="text-xs text-gray-500 line-clamp-2">{notif.message}</p>
                                            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">
                                                {new Date(notif.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-gray-400 text-sm">
                            No notifications yet.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
