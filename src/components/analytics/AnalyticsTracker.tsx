import React, { useEffect, useRef } from 'react';

interface AnalyticsTrackerProps {
    articleId: number;
}

export default function AnalyticsTracker({ articleId }: AnalyticsTrackerProps) {
    const hasFiredRead = useRef(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasFiredRead.current) {
                trackEvent('read');
                hasFiredRead.current = true;
            }
        }, 30000);

        trackEvent('view');

        return () => clearTimeout(timer);
    }, [articleId]);

    const trackEvent = async (type: string) => {
        try {
            await fetch('/api/analytics/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ article_id: articleId, type })
            });
        } catch (e) {
            console.error(e);
        }
    };

    return null;
}
