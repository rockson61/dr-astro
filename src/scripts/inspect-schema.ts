
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);

async function inspectSchema() {
    console.log('Inspecting Schema...');

    const tables = ['articles', 'profiles', 'podcasts', 'events', 'jobs', 'courses'];

    for (const table of tables) {
        // Just try to select 'slug' from one row
        const { data, error } = await supabase.from(table).select('slug').limit(1);

        if (error) {
            console.log(`❌ Table '${table}': Error accessing slug - ${error.message}`);
        } else {
            console.log(`✅ Table '${table}': has 'slug' column.`);
        }
    }
}

inspectSchema();
