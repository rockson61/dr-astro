
import { createClient } from '@supabase/supabase-js';

const NEW_URL = 'http://database-supabase-f8b77d-103-178-166-64.traefik.me';
const NEW_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjU5NDI4ODYsImV4cCI6MTg5MzQ1NjAwMCwicm9sZSI6ImFub24iLCJpc3MiOiJzdXBhYmFzZSJ9.X1C0IEKSRGx-qEbY57WQXWitmZogx9SMAEdVMyKU1sc';

console.log(`Testing URL: ${NEW_URL}`);
console.log(`Testing Key: ${NEW_KEY.substring(0, 10)}...`);

const supabase = createClient(NEW_URL, NEW_KEY);

async function verify() {
    try {
        console.log('1. Checking Health (via public table select)...');
        // Use 'head: true' and 'count: exact' to just check connectivity and existence
        const { count, error } = await supabase.from('profiles').select('*', { count: 'exact', head: true });

        if (error) {
            console.error('❌ Table Select Failed:', error.message);
            console.error('Details:', error);
        } else {
            console.log(`✅ Table Select Success! Count: ${count}`);
        }

        console.log('2. Checking Auth Health...');
        const { data: authData, error: authError } = await supabase.auth.getSession();
        if (authError) {
            console.error('❌ Auth Session Check Failed:', authError.message);
        } else {
            console.log('✅ Auth Service Responded.');
        }

    } catch (e: any) {
        console.error('❌ Exception during verification:', e.message);
    }
}

verify();
