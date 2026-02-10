
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

async function inspectUser() {
    const email = 'demo@dentalreach.io';
    console.log(`Inspecting user: ${email}`);

    const { data, error } = await supabase.auth.admin.listUsers();

    if (error) {
        console.error('Error listing users:', error);
        return;
    }

    const user = data.users.find(u => u.email === email);

    if (user) {
        console.log('User Found:');
        console.log('ID:', user.id);
        console.log('Email:', user.email);
        console.log('Confirmed At:', user.email_confirmed_at);
        console.log('Last Sign In:', user.last_sign_in_at);
        console.log('App Metadata:', user.app_metadata);
        console.log('User Metadata:', user.user_metadata);
        console.log('Suspended:', user.banned_until);
    } else {
        console.log('❌ User not found in list!');
    }
}

inspectUser();
