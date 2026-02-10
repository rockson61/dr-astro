
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

const DEMO_USER_ID = '02836530-7c2e-4162-a524-ff8fa6b8bff8'; // From previous output
const DEMO_EMAIL = 'demo@dentalreach.io';

async function fixDemoUser() {
    console.log(`Fixing user: ${DEMO_USER_ID} (${DEMO_EMAIL})`);

    // 1. Force Password Update & Confirm Email
    console.log('...Updating Auth User');
    const { data: authData, error: authError } = await supabase.auth.admin.updateUserById(DEMO_USER_ID, {
        password: 'password123',
        email_confirm: true,
        user_metadata: { full_name: 'Demo User' },
        app_metadata: { provider: 'email', providers: ['email'] }
    });

    if (authError) {
        console.error('❌ Auth Update Failed:', authError.message);
        console.error(authError);
    } else {
        console.log('✅ Auth Update Success!');
        console.log('Confirmed:', authData.user.email_confirmed_at);
        console.log('Last Sign In:', authData.user.last_sign_in_at);
    }

    // 2. Check Profile
    console.log('...Checking Profile');
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', DEMO_USER_ID)
        .single();

    if (profileError) {
        console.error('❌ Profile Fetch Failed:', profileError.message);
    } else {
        console.log('✅ Profile Found:', profile.full_name);
        console.log('Is Verified:', profile.is_verified);
    }
}

fixDemoUser();
