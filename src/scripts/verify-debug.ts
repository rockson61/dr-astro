
import { createClient } from '@supabase/supabase-js';

const NEW_URL = 'http://database-supabase-f8b77d-103-178-166-64.traefik.me';
const NEW_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjU5NDI4ODYsImV4cCI6MTg5MzQ1NjAwMCwicm9sZSI6ImFub24iLCJpc3MiOiJzdXBhYmFzZSJ9.X1C0IEKSRGx-qEbY57WQXWitmZogx9SMAEdVMyKU1sc';

const supabase = createClient(NEW_URL, NEW_KEY);

async function verify() {
    console.log('Client URL:', supabase.supabaseUrl);
    console.log('Rest values:', supabase.rest.url);

    try {
        const { data, error, status, statusText } = await supabase.from('profiles').select('*').limit(1);

        console.log('Status:', status);
        console.log('StatusText:', statusText);

        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Data:', data);
        }

    } catch (e) {
        console.error('Exception:', e);
    }
}

verify();
