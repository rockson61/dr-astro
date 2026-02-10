
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyRLS() {
    console.log('--- Verifying RLS Policies ---');

    // 1. Sign Up a new test user
    const email = `rls-test-${Date.now()}@example.com`;
    const password = 'password123';

    console.log(`Signing up new user: ${email}`);
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (authError) {
        console.error('Signup failed:', authError);
        return;
    }

    let session = authData.session;

    if (!session) {
        // Try signing in immediately 
        const { data: loginData } = await supabase.auth.signInWithPassword({ email, password });
        session = loginData.session;
    }

    if (!session) {
        console.error('Could not get session. Email confirmation might be required.');
        return;
    }

    console.log('Logged in as:', session.user.email);

    // 2. Attempt to INSERT a Job
    console.log('Attempting to INSERT a job...');
    const { data, error } = await supabase.from('jobs').insert({
        title: 'RLS Test Job',
        company_name: 'Test Corp',
        location: 'Remote',
        employer_id: session.user.id,
        slug: 'rls-test-job-' + Date.now(),
        is_active: true
    }).select();

    if (error) {
        console.error('❌ INSERT Failed (Expected if RLS is missing):', error.message);
        console.error('Error Details:', error);
    } else {
        console.log('✅ INSERT Succeeded (RLS allows write). Job ID:', data[0].id);

        // Cleanup
        await supabase.from('jobs').delete().eq('id', data[0].id);
    }
}

verifyRLS();
