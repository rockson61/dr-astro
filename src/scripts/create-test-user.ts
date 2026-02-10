
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('❌ Missing credentials');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function createTestUser() {
    const email = 'verify_test_user_' + Date.now() + '@example.com';
    const password = 'password123';

    console.log(`Creating test user: ${email}`);

    const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: 'Verification User' }
    });

    if (error) {
        console.error('Error creating user:', error);
    } else {
        console.log('✅ User created successfully!');
        console.log('ID:', data.user.id);
        console.log('Email:', data.user.email);
        console.log('Password:', password);

        // Also create a profile for them
        const { error: profileError } = await supabase.from('profiles').insert({
            id: data.user.id,
            email: email,
            full_name: 'Verification User',
            first_name: 'Verification',
            last_name: 'User',
            role: 'dentist',
            is_verified: true
        });

        if (profileError) {
            console.error('Error creating profile:', profileError);
        } else {
            console.log('✅ Profile created successfully!');
        }
    }
}

createTestUser();
