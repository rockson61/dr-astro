import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Subscription failed');

            setStatus('success');
            setMessage('Subscribed successfully!');
            setEmail('');
        } catch (error: any) {
            setStatus('error');
            setMessage(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className="relative">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={status === 'loading' || status === 'success'}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-tuio-gold disabled:opacity-50"
                />
                <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="absolute right-1 top-1 bottom-1 bg-tuio-gold text-tuio-navy px-3 rounded-md hover:bg-yellow-400 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                    {status === 'loading' ? (
                        <div className="w-4 h-4 border-2 border-tuio-navy border-t-transparent rounded-full animate-spin" />
                    ) : status === 'success' ? (
                        <CheckCircle className="w-4 h-4" />
                    ) : (
                        <Send className="w-4 h-4" />
                    )}
                </button>
            </div>
            {status === 'error' && (
                <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {message}
                </p>
            )}
            {status === 'success' && (
                <p className="text-xs text-green-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> {message}
                </p>
            )}
            <p className="text-xs text-gray-400">
                Join 10,000+ dental professionals. No spam, ever.
            </p>
        </form>
    );
}
