
import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get('q');
    const type = url.searchParams.get('type') || 'all';
    const sort = url.searchParams.get('sort') || 'relevance'; // 'relevance' | 'newest' | 'oldest'
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');

    if (!q || q.length < 2) {
        return new Response(JSON.stringify({ results: [] }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const query = `%${q}%`;
    let results: any[] = [];

    // Sorting Logic Helpers
    const isNewest = sort === 'newest';
    const isOldest = sort === 'oldest';
    const orderCol = 'created_at';
    // for events use start_date, mostly created_at

    try {
        const promises = [];

        // 1. Articles
        if (type === 'all' || type === 'articles') {
            let qb = supabase
                .from('articles')
                .select('id, title, slug, excerpt, image_url, category, created_at')
                .eq('status', 'published')
                .or(`title.ilike.${query},excerpt.ilike.${query}`);

            if (startDate) qb = qb.gte('created_at', startDate);
            if (endDate) qb = qb.lte('created_at', endDate);

            if (isNewest) qb = qb.order('created_at', { ascending: false });
            else if (isOldest) qb = qb.order('created_at', { ascending: true });

            promises.push(
                qb.limit(10)
                    .then(({ data }) => data?.map(d => ({ ...d, type: 'article' })) || [])
            );
        }

        // 2. Profiles (Professionals) - Date filter applies to join date
        if (type === 'all' || type === 'people') {
            let qb = supabase
                .from('profiles')
                .select('id, full_name, slug, avatar_url, specialty, role, created_at')
                .or(`full_name.ilike.${query},specialty.ilike.${query}`);

            if (startDate) qb = qb.gte('created_at', startDate);
            if (endDate) qb = qb.lte('created_at', endDate);

            if (isNewest) qb = qb.order('created_at', { ascending: false });
            // Profile relevance usually ignores date, but if sort requested, we honor it.

            promises.push(
                qb.limit(5)
                    .then(({ data }) => data?.map(d => ({ ...d, type: 'profile' })) || [])
            );
        }

        // 3. Jobs
        if (type === 'all' || type === 'jobs') {
            let qb = supabase
                .from('jobs')
                .select('id, title, slug, company_name, location, type, created_at')
                .eq('is_active', true)
                .or(`title.ilike.${query},company_name.ilike.${query}`);

            if (startDate) qb = qb.gte('created_at', startDate);
            if (endDate) qb = qb.lte('created_at', endDate);
            if (isNewest) qb = qb.order('created_at', { ascending: false });

            promises.push(
                qb.limit(5)
                    .then(({ data }) => data?.map(d => ({ ...d, type: 'job' })) || [])
            );
        }

        // 4. Events (Use start_date for filtering/sorting usually, but user might mean publish date. Let's use start_date for relevance)
        if (type === 'all' || type === 'events') {
            let qb = supabase
                .from('events')
                .select('id, title, slug, start_date, location, type, created_at')
                .or(`title.ilike.${query},location.ilike.${query}`);

            // For events, searching by date usually means "occurring in".
            // But if global filter says "Past Month", it might mean "Created".
            // Let's stick to created_at for consistency with other types for "Newest", but maybe start_date for filtering?
            // Standardizing on created_at for the "Date Range" filter is safer for generic search.
            if (startDate) qb = qb.gte('created_at', startDate);
            if (endDate) qb = qb.lte('created_at', endDate);
            if (isNewest) qb = qb.order('created_at', { ascending: false });

            promises.push(
                qb.limit(5)
                    .then(({ data }) => data?.map(d => ({ ...d, type: 'event' })) || [])
            );
        }

        // 5. Listings
        if (type === 'all' || type === 'directory') {
            let qb = supabase
                .from('listings')
                .select('id, business_name, slug, description, type, is_verified, created_at')
                .eq('is_verified', true)
                .or(`business_name.ilike.${query},description.ilike.${query}`);

            if (startDate) qb = qb.gte('created_at', startDate);
            if (endDate) qb = qb.lte('created_at', endDate);
            if (isNewest) qb = qb.order('created_at', { ascending: false });

            promises.push(
                qb.limit(5)
                    .then(({ data }) => data?.map(d => ({ ...d, type: 'listing' })) || [])
            );
        }

        // 6. Products
        if (type === 'all' || type === 'products') {
            let qb = supabase
                .from('products')
                .select('id, name, slug, price, category, images, created_at')
                .eq('status', 'active')
                .or(`name.ilike.${query},description.ilike.${query}`);

            if (startDate) qb = qb.gte('created_at', startDate);
            if (endDate) qb = qb.lte('created_at', endDate);
            if (isNewest) qb = qb.order('created_at', { ascending: false });

            promises.push(
                qb.limit(5)
                    .then(({ data }) => data?.map(d => ({
                        ...d,
                        title: d.name,
                        image_url: d.images?.[0] || null,
                        type: 'product'
                    })) || [])
            );
        }

        const allResults = await Promise.all(promises);
        results = allResults.flat();

        // Client-side Sort capability for mixed types (Relevance can be improved here)
        if (isNewest) {
            results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        } else if (isOldest) {
            results.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        }

    } catch (error) {
        console.error('Search API Error:', error);
        return new Response(JSON.stringify({ error: 'Search failed' }), { status: 500 });
    }

    return new Response(JSON.stringify({ results }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};
