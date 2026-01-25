
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabase = createClient(process.env.PUBLIC_SUPABASE_URL!, process.env.PUBLIC_SUPABASE_ANON_KEY!);

async function inspect() {
    console.log('--- PROFILES ---');
    const { data: profiles, error: pError } = await supabase.from('profiles').select('*');
    if (pError) console.error(pError);
    else console.table(profiles);

    console.log('\n--- ARTICLES ---');
    const { data: articles, error: aError } = await supabase.from('articles').select('id, title, author_id, slug').limit(5);
    if (aError) console.error(aError);
    else console.table(articles);

    console.log('\n--- LEADERBOARD VIEW ---');
    const { data: lb, error: lError } = await supabase.from('profile_composite_reputation').select('*');
    if (lError) console.error(lError);
    else console.table(lb);
}

inspect();
