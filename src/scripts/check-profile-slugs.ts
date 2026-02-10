
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);

async function checkProfileSlugs() {
    console.log('Checking Profile Slugs...');

    // Select all profiles, check for missing slugs
    const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, full_name, slug');

    if (error) {
        console.error('Error fetching profiles:', error);
        return;
    }

    const missingSlugs = profiles.filter(p => !p.slug);

    console.log(`Total Profiles: ${profiles.length}`);
    console.log(`Profiles with missing slugs: ${missingSlugs.length}`);

    if (missingSlugs.length > 0) {
        console.log('Missing Slugs for:');
        missingSlugs.forEach(p => console.log(` - ${p.full_name} (${p.id})`));
        // Option: we could auto-generate them here if needed?
    } else {
        console.log('✅ All profiles have slugs.');
    }
}

checkProfileSlugs();
