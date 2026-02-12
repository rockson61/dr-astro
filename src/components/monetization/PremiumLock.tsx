import React from 'react';

export default function PremiumLock() {
    return (
        <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white z-10"></div>
            <div className="relative z-20 flex flex-col items-center justify-center p-12 text-center mt-12 bg-gray-50/90 backdrop-blur-sm rounded-[32px] border border-gray-200 shadow-lg max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-tuio-red/10 rounded-full flex items-center justify-center mb-6 text-3xl">
                    🔒
                </div>
                <h3 className="font-tuio text-3xl uppercase text-tuio-navy mb-4">Premium Content</h3>
                <p className="text-gray-600 mb-8 max-w-md">
                    This article is exclusive to Pro members. Upgrade your plan to unlock full access to clinical cases, research, and more.
                </p>
                <a
                    href="/dashboard/billing"
                    className="px-8 py-4 bg-tuio-red text-white rounded-full font-bold uppercase tracking-wide hover:bg-tuio-navy transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                    Unlock Access
                </a>
                <p className="mt-4 text-sm text-gray-500">
                    Already a member? <a href="/login" className="text-tuio-red underline">Log in</a>
                </p>
            </div>

            {/* Blurred Dummy Content */}
            <div className="filter blur-md opacity-30 select-none pointer-events-none" aria-hidden="true">
                <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <h2 className="text-2xl font-bold mb-4">Clinical Case Integration</h2>
                <p className="mb-4">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </div>
    );
}
