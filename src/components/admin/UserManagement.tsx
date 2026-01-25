import React, { useState, useEffect } from 'react';
import { Users, Mail, Ban, CheckCircle, Search, X, Edit } from 'lucide-react';
import { createSupabaseBrowserClient } from '../../lib/supabase';
import GlassCard from '../ui/GlassCard';
import GlassContainer from '../layouts/GlassContainer';

// Initialize Supabase client
const supabase = createSupabaseBrowserClient();

interface User {
    id: string;
    email: string;
    full_name: string | null;
    is_banned: boolean;
    verified: boolean;
    role: 'user' | 'author' | 'editor' | 'moderator' | 'admin' | 'super_admin';
    created_at: string;
    verification_status?: string;
    account_status?: string;
}

const ROLES = ['user', 'author', 'editor', 'moderator', 'admin', 'super_admin'];
type FilterStatus = 'all' | 'active' | 'banned';

export default function UserManagement() {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messageTitle, setMessageTitle] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [isSending, setIsSending] = useState(false);

    // Derived state mimicking AuthContext
    const isAdmin = userRole === 'admin' || userRole === 'super_admin';
    const isSuperAdmin = userRole === 'super_admin';

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setCurrentUser(user);
                const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
                setUserRole(profile?.role || 'user');
            } else {
                // Redirect if not logged in
                window.location.href = '/login';
            }
        };
        checkAuth();
    }, []);

    useEffect(() => {
        if (currentUser && (isAdmin || isSuperAdmin)) {
            fetchUsers();
        }
    }, [currentUser, isAdmin, isSuperAdmin]);

    const fetchUsers = async () => {
        try {
            setIsLoading(true);

            // Fetch all profiles
            const { data: profilesData, error: profilesError } = await supabase
                .from('profiles')
                .select('id, email, full_name, verification_status, account_status, role, created_at')
                .order('created_at', { ascending: false });

            if (profilesError) throw profilesError;

            if (!profilesData || profilesData.length === 0) {
                setUsers([]);
                return;
            }

            // Map to User interface
            const mappedUsers: User[] = profilesData.map((profile: any) => ({
                id: profile.id,
                email: profile.email || 'Email Hidden',
                full_name: profile.full_name || null,
                is_banned: profile.account_status === 'suspended' || profile.account_status === 'banned',
                verified: profile.verification_status === 'verified',
                role: profile.role || 'user',
                created_at: profile.created_at,
                verification_status: profile.verification_status,
                account_status: profile.account_status
            }));

            setUsers(mappedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
            alert('Failed to load users');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBanUser = async (userId: string, currentBanStatus: boolean) => {
        try {
            const newStatus = !currentBanStatus ? 'suspended' : 'active';
            const { error } = await supabase
                .from('profiles')
                .update({ account_status: newStatus })
                .eq('id', userId);

            if (error) throw error;

            // Send notification
            const notificationTitle = !currentBanStatus ? 'Account Restricted' : 'Account Restored';
            const notificationMsg = !currentBanStatus
                ? 'Your account has been restricted. Please contact support@dentalreach.co for more information.'
                : 'Your account has been restored. You can now access all features.';

            await sendNotification(userId, notificationTitle, notificationMsg, 'general');

            // Refresh users list
            await fetchUsers();
            alert(`User ${!currentBanStatus ? 'banned' : 'unbanned'} successfully!`);
        } catch (error) {
            console.error('Error banning user:', error);
            alert('Failed to update user status');
        }
    };

    const sendNotification = async (userId: string, title: string, message: string, type: string = 'admin_message') => {
        try {
            await supabase.from('notifications').insert({
                user_id: userId,
                title,
                message,
                type,
                read: false
            });
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    };

    const handleSendMessage = async () => {
        if (!selectedUser || !messageTitle || !messageContent) {
            alert('Please fill in all fields');
            return;
        }

        try {
            setIsSending(true);
            await sendNotification(selectedUser.id, messageTitle, messageContent, 'general');

            setMessageTitle('');
            setMessageContent('');
            setShowMessageModal(false);
            setSelectedUser(null);
            alert('Message sent successfully!');
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message');
        } finally {
            setIsSending(false);
        }
    };

    const filteredUsers = users.filter(user => {
        const term = searchTerm.toLowerCase();
        const nameMatch = user.full_name?.toLowerCase().includes(term);
        const emailMatch = user.email.toLowerCase().includes(term);

        // Safety check for search
        const matchesSearch = term === '' || nameMatch || emailMatch;

        const matchesFilter =
            filterStatus === 'all' ||
            (filterStatus === 'active' && !user.is_banned) ||
            (filterStatus === 'banned' && user.is_banned);

        return matchesSearch && matchesFilter;
    });

    const stats = {
        total: users.length,
        active: users.filter(u => !u.is_banned).length,
        banned: users.filter(u => u.is_banned).length,
        verified: users.filter(u => u.verified).length
    };

    if (!currentUser || (!isAdmin && !isSuperAdmin)) {
        if (isLoading && !currentUser) return <div className="p-8 text-center">Loading...</div>;
        if (currentUser && !isAdmin) return <div className="p-8 text-center text-red-500">Access Denied</div>;
    }

    return (
        <GlassContainer className="pt-24 pb-16">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">User Management</h1>
                    <p className="text-slate-600">Manage users, ban accounts, and send messages</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <GlassCard hoverEffect className="p-6">
                        <div className="flex justify-between">
                            <div><p className="text-sm text-slate-600">Total</p><p className="text-2xl font-bold">{stats.total}</p></div>
                            <Users className="text-blue-600" />
                        </div>
                    </GlassCard>
                    <GlassCard hoverEffect className="p-6">
                        <div className="flex justify-between">
                            <div><p className="text-sm text-slate-600">Active</p><p className="text-2xl font-bold text-green-600">{stats.active}</p></div>
                            <CheckCircle className="text-green-600" />
                        </div>
                    </GlassCard>
                    <GlassCard hoverEffect className="p-6">
                        <div className="flex justify-between">
                            <div><p className="text-sm text-slate-600">Banned</p><p className="text-2xl font-bold text-red-600">{stats.banned}</p></div>
                            <Ban className="text-red-600" />
                        </div>
                    </GlassCard>
                    <GlassCard hoverEffect className="p-6">
                        <div className="flex justify-between">
                            <div><p className="text-sm text-slate-600">Verified</p><p className="text-2xl font-bold text-purple-600">{stats.verified}</p></div>
                            <CheckCircle className="text-purple-600" />
                        </div>
                    </GlassCard>
                </div>

                {/* Controls */}
                <GlassCard className="p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                            />
                        </div>
                        <select
                            value={filterStatus}
                            onChange={(e: any) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 border rounded-lg"
                        >
                            <option value="all">All Users</option>
                            <option value="active">Active Only</option>
                            <option value="banned">Banned Only</option>
                        </select>
                    </div>
                </GlassCard>

                {/* Table */}
                <GlassCard className="!p-0 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50/50 border-b">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">User</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Role</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredUsers.map(user => (
                                    <tr key={user.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-600 font-bold">
                                                    {user.email[0].toUpperCase()}
                                                </div>
                                                <div className="text-sm font-medium">{user.full_name || user.email}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 capitalize text-sm">{user.role}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.is_banned ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                                {user.is_banned ? 'Banned' : 'Active'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleBanUser(user.id, user.is_banned)}
                                                    className={`px-3 py-1 rounded text-sm font-medium ${user.is_banned ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                                                >
                                                    {user.is_banned ? 'Unban' : 'Ban'}
                                                </button>
                                                <button
                                                    onClick={() => { setSelectedUser(user); setShowMessageModal(true); }}
                                                    className="px-3 py-1 rounded text-sm font-medium bg-blue-100 text-blue-700"
                                                >
                                                    Message
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </GlassCard>

                {/* Modal */}
                {showMessageModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
                            <h3 className="font-bold text-lg mb-4">Send Message</h3>
                            <input
                                className="w-full mb-3 p-2 border rounded"
                                placeholder="Title"
                                value={messageTitle}
                                onChange={e => setMessageTitle(e.target.value)}
                            />
                            <textarea
                                className="w-full mb-4 p-2 border rounded"
                                placeholder="Message content..."
                                rows={4}
                                value={messageContent}
                                onChange={e => setMessageContent(e.target.value)}
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setShowMessageModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSendMessage}
                                    disabled={isSending}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {isSending ? 'Sending...' : 'Send'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </GlassContainer>
    );
}
