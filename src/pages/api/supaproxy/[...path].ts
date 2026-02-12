
import type { APIRoute } from 'astro';

export const ALL: APIRoute = async ({ request, params }) => {
    const path = params.path || '';
    const internalUrl = import.meta.env.INTERNAL_SUPABASE_URL;

    if (!internalUrl) {
        return new Response(JSON.stringify({ error: 'INTERNAL_SUPABASE_URL not set' }), { status: 500 });
    }

    // Construct target URL
    const url = new URL(request.url);
    const search = url.search;
    const targetUrl = `${internalUrl}/${path}${search}`;

    console.log(`[Proxy] Forwarding ${request.method} ${url.pathname} -> ${targetUrl}`);

    try {
        // Clone headers to filter/modify
        const headers = new Headers(request.headers);

        // Remove headers that might confuse the destination or are Vercel specific
        headers.delete('host');
        headers.delete('connection');

        // Add required headers for Supabase/Traefik
        // Assuming internalUrl is http://hostname, we extract hostname
        const targetUrlObj = new URL(internalUrl);
        headers.set('Host', targetUrlObj.host);

        const response = await fetch(targetUrl, {
            method: request.method,
            headers: headers,
            body: request.body ? await request.arrayBuffer() : undefined, // pass body
            // @ts-ignore - Node fetch options
            duplex: 'half'
        });

        console.log(`[Proxy] Response: ${response.status}`);

        // Forward response
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
        });
    } catch (error: any) {
        console.error(`[Proxy] Error:`, error);
        return new Response(JSON.stringify({ error: 'Proxy Error', details: error.message }), { status: 502 });
    }
};
