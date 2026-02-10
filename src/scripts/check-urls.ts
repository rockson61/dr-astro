
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const ANON_KEY = process.env.PUBLIC_SUPABASE_ANON_KEY;
const URLS = [
    'http://api.db.dentaloffice.io',
    'http://db.dentaloffice.io',
    'http://103.178.166.64' // Direct IP
];

async function testUrl(url) {
    console.log(`\nTesting URL: ${url}`);
    const supabase = createClient(url, ANON_KEY!);

    try {
        const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
        if (error) {
            console.log('❌ Error:', error.message);
            // manually fetch to see headers if needed
        } else {
            console.log('✅ Success! Connection working.');
            return true;
        }
    } catch (e) {
        console.log('❌ Exception:', e.message);
    }
    return false;
}

async function verify() {
    console.log('Key:', ANON_KEY?.substring(0, 15) + '...');

    for (const url of URLS) {
        const working = await testUrl(url);
        if (working) break;
    }
}

verify();
