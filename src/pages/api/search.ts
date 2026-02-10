
import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get('q');
    const type = url.searchParams.get('type') || 'all';

    if (!q || q.length < 2) {
        return new Response(JSON.stringify({ results: [] }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const query = `%${q}%`;
    let results: any[] = [];

    try {
        // Parallel queries based on type filter
        const promises = [];

        // 1. Articles
        if (type === 'all' || type === 'articles') {
            promises.push(
                supabase
                    .from('articles')
                    .select('id, title, slug, excerpt, image_url, category, created_at')
                    .eq('status', 'published')
                    .or(`title.ilike.${query},excerpt.ilike.${query}`)
                    .limit(5)
                    .then(({ data }) => data?.map(d => ({ ...d, type: 'article' })) || [])
            );
        }

        // 2. Profiles (Professionals)
        if (type === 'all' || type === 'people') {
            promises.push(
                supabase
                    .from('profiles')
                    .select('id, full_name, slug, avatar_url, specialty, role')
                    .or(`full_name.ilike.${query},specialty.ilike.${query}`)
                    .limit(5)
                    .then(({ data }) => data?.map(d => ({ ...d, type: 'profile' })) || [])
            );
        }

        // 3. Jobs
        if (type === 'all' || type === 'jobs') {
            promises.push(
                supabase
                    .from('jobs')
                    .select('id, title, slug, company_name, location, type')
                    .eq('is_active', true)
                    .or(`title.ilike.${query},company_name.ilike.${query}`)
                    .limit(5)
                    .then(({ data }) => data?.map(d => ({ ...d, type: 'job' })) || [])
            );
        }

        // 4. Events
        if (type === 'all' || type === 'events') {
            promises.push(
                supabase
                    .from('events')
                    .select('id, title, slug, start_date, location, type')
                    .or(`title.ilike.${query},location.ilike.${query}`)
                    .limit(5)
                    .then(({ data }) => data?.map(d => ({ ...d, type: 'event' })) || [])
            );
        }

        // 5. Listings (Directory)
        if (type === 'all' || type === 'directory') {
            promises.push(
                supabase
                    .from('listings')
                    .select('id, business_name, slug, description, type, is_verified')
                    .eq('is_verified', true)
                    .or(`business_name.ilike.${query},description.ilike.${query}`)
                    .limit(5)
                    .then(({ data }) => data?.map(d => ({ ...d, type: 'listing' })) || [])
            );
        }

        const allResults = await Promise.all(promises);
        results = allResults.flat();

    } catch (error) {
        console.error('Search API Error:', error);
        return new Response(JSON.stringify({ error: 'Search failed' }), { status: 500 });
    }

    return new Response(JSON.stringify({ results }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};
