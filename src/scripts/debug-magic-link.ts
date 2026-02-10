
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

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function debugMagicLink() {
    const email = 'demo@dentalreach.io';

    console.log(`Attempting Magic Link for: ${email}`);

    const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: 'http://localhost:4321/dashboard'
        }
    });

    if (error) {
        console.error('❌ Magic Link Failed!');
        console.error('Error Status:', error.status);
        console.error('Error Message:', error.message);
    } else {
        console.log('✅ Magic Link Sent Successfully!');
        console.log('Data:', data);
    }
}

debugMagicLink();
