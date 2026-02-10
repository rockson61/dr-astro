
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('❌ Missing credentials');
    process.exit(1);
}

// Use ANON key to simulate client-side login
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function debugLogin() {
    const email = 'demo@dentalreach.io';
    const password = 'password123';

    console.log(`Attempting login for: ${email}`);

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        console.error('❌ Login Failed!');
        console.error('Error Status:', error.status);
        console.error('Error Message:', error.message);
        console.error('Error Name:', error.name);
    } else {
        console.log('✅ Login Successful!');
        console.log('User ID:', data.user.id);
        console.log('Access Token:', data.session?.access_token ? 'Present' : 'Missing');
    }
}

debugLogin();
