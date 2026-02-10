
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);

async function verifyStorage() {
    console.log('Testing Storage API...');
    const { data, error } = await supabase.storage.listBuckets();

    if (error) {
        console.error('❌ Storage Error:', error.message);
    } else {
        console.log(`✅ Storage Accessible! Found ${data.length} buckets.`);
        data.forEach(b => console.log(` - ${b.name}`));
    }
}

verifyStorage();
