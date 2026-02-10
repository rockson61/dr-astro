
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

async function createDemoUser() {
    const email = 'demo@dentalreach.io';
    const password = 'password123';

    console.log(`Creating/Updating demo user: ${email}`);

    // Try to get existing user first to avoid duplicates or errors
    const { data: listData } = await supabase.auth.admin.listUsers();
    const existingUser = listData.users.find(u => u.email === email);

    let userId;

    if (existingUser) {
        console.log('User already exists, updating password...');
        userId = existingUser.id;
        const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
            password: password,
            email_confirm: true,
            user_metadata: { full_name: 'Demo User' }
        });
        if (updateError) {
            console.error('Error updating auth user:', updateError);
            return;
        }
    } else {
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { full_name: 'Demo User' }
        });

        if (error) {
            console.error('Error creating user:', error);
            return;
        }
        userId = data.user.id;
    }

    console.log('✅ Auth User ready!');
    console.log('ID:', userId);

    // Upsert Profile
    const { error: profileError } = await supabase.from('profiles').upsert({
        id: userId,
        email: email,
        full_name: 'Demo User',
        first_name: 'Demo',
        last_name: 'User',
        role: 'dentist',
        is_verified: true,
        specialty: 'General Dentist',
        clinic_name: 'Demo Clinic',
        location: 'New York',
        slug: 'demo-user'
    });

    if (profileError) {
        console.error('Error creating profile:', profileError);
    } else {
        console.log('✅ Profile created/updated successfully!');
    }
}

createDemoUser();
