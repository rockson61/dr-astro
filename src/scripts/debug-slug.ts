
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const supabase = createClient(process.env.PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function debugSlug() {
    console.log("Fetching profile for 'verified_v2_dentist1@dentalreach.io'...");

    const { data, error } = await supabase.from('profiles').select('*').eq('email', 'verified_v2_dentist1@dentalreach.io');

    if (error) {
        console.error("Error:", error);
        return;
    }

    if (data && data.length > 0) {
        console.log("Profile Found:");
        console.log("ID:", data[0].id);
        console.log("Slug:", data[0].slug);
        console.log("Email:", data[0].email);
    } else {
        console.log("Profile NOT FOUND by email.");
        // List any profiles
        const { data: all } = await supabase.from('profiles').select('slug, email').limit(5);
        console.log("Sample profiles:", all);
    }
}

debugSlug();
