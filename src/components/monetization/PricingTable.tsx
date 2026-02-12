import React, { useState } from 'react';

const plans = [
    {
        id: 'free',
        name: 'Free',
        price: '$0',
        features: ['Access to free articles', 'Community access', 'Weekly newsletter'],
        cta: 'Current Plan',
        current: true, // simplified logic for now
    },
    {
        id: 'pro', // This should be replaced with your actual Stripe Price ID
        stripePriceId: 'price_1Q...', // Placeholder
        name: 'Pro Member',
        price: '$19/mo',
        features: ['Unlimited premium articles', 'Exclusive clinical cases', 'CE Credits included', 'Priority support'],
        cta: 'Upgrade to Pro',
        popular: true,
    }
];

export default function PricingTable({ user, subscription }: { user: any, subscription?: any }) {
    const [loading, setLoading] = useState<string | null>(null);

    const handleSubscribe = async (priceId: string) => {
        if (!user) {
            window.location.href = '/login';
            return;
        }
        setLoading(priceId);
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priceId })
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert("Error initiating checkout: " + data.error);
            }
        } catch (err) {
            console.error(err);
            alert("Checkout failed");
        } finally {
            setLoading(null);
        }
    };

    const isPro = subscription?.status === 'active';

    return (
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col">
                <h3 className="font-tuio text-2xl uppercase text-tuio-navy mb-2">Free</h3>
                <div className="text-4xl font-bold text-tuio-navy mb-6">$0<span className="text-lg text-gray-400 font-normal">/mo</span></div>
                <ul className="space-y-4 mb-8 flex-grow">
                    {plans[0].features.map(f => (
                        <li className="flex items-center gap-2 text-gray-600">
                            <span className="text-green-500">✓</span> {f}
                        </li>
                    ))}
                </ul>
                <button className="w-full py-3 rounded-full font-bold uppercase tracking-wide border-2 border-gray-200 text-gray-400 cursor-not-allowed">
                    {isPro ? 'Downgrade' : 'Current Plan'}
                </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-tuio-navy rounded-[32px] p-8 shadow-xl border border-tuio-navy flex flex-col relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 bg-tuio-red text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                    Popular
                </div>
                <h3 className="font-tuio text-2xl uppercase mb-2">Pro Member</h3>
                <div className="text-4xl font-bold mb-6">$19<span className="text-lg text-white/60 font-normal">/mo</span></div>
                <ul className="space-y-4 mb-8 flex-grow">
                    {plans[1].features.map(f => (
                        <li className="flex items-center gap-2 text-white/90">
                            <span className="text-tuio-red bg-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">✓</span> {f}
                        </li>
                    ))}
                </ul>
                {isPro ? (
                    <div className="w-full py-3 bg-green-500 text-white rounded-full font-bold uppercase tracking-wide text-center">
                        Active
                    </div>
                ) : (
                    <button
                        onClick={() => handleSubscribe(plans[1].stripePriceId || 'price_test_123')}
                        disabled={!!loading}
                        className="w-full py-3 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-white hover:text-tuio-red transition-all"
                    >
                        {loading ? 'Processing...' : 'Upgrade Now'}
                    </button>
                )}
            </div>
        </div>
    );
}
