
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import slugify from 'slugify';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_KEY) {
    console.error('Missing Service Key');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_KEY);

async function backfillSlugs() {
    console.log('Starting Slug Backfill...');

    // Fetch profiles without slugs or check all
    const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*');

    if (error) {
        console.error('Error fetching profiles:', error);
        return;
    }

    let updatedCount = 0;

    for (const profile of profiles) {
        if (!profile.slug) {
            let baseSlug = slugify(profile.full_name || 'user', { lower: true, strict: true });

            // Allow simplified slugs for known users if preferred, but general logic:
            // Ensure uniqueness could be tricky in a script without a loop, but for backfill:
            // We'll append a short random string if needed, or just hope name is unique for now? 
            // Better: 'demo-user', 'super-admin'.

            let finalSlug = baseSlug;

            // Check if slug exists (naive check)
            const { data: existing } = await supabase.from('profiles').select('id').eq('slug', finalSlug).single();
            if (existing) {
                finalSlug = `${baseSlug}-${Math.floor(Math.random() * 1000)}`;
            }

            console.log(`Updating ${profile.full_name} (${profile.id}) -> ${finalSlug}`);

            const { error: updateError } = await supabase
                .from('profiles')
                .update({ slug: finalSlug })
                .eq('id', profile.id);

            if (updateError) {
                console.error('Failed to update:', updateError.message);
            } else {
                updatedCount++;
            }
        }
    }

    console.log(`✅ Backfill complete. Updated ${updatedCount} profiles.`);
}

backfillSlugs();
