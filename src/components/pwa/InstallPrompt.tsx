import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsVisible(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
            setIsVisible(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-tuio-navy text-white p-4 rounded-xl shadow-2xl z-50 flex items-center gap-4 animate-fade-in-up border border-tuio-gold/20">
            <div className="bg-white/10 p-2 rounded-lg">
                <Download className="w-6 h-6 text-tuio-gold" />
            </div>
            <div className="flex-grow">
                <h3 className="font-bold text-sm">Install DentalReach</h3>
                <p className="text-xs text-gray-300">Add to home screen for faster access.</p>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={handleInstall}
                    className="px-3 py-1.5 bg-tuio-gold text-tuio-navy text-xs font-bold rounded-lg hover:bg-yellow-400 transition-colors"
                >
                    Install
                </button>
                <button
                    onClick={() => setIsVisible(false)}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
