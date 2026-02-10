
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.PUBLIC_SUPABASE_ANON_KEY;

console.log('URL:', SUPABASE_URL);
console.log('Key (first 10 chars):', SUPABASE_ANON_KEY?.substring(0, 10));

const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);

async function testAnonKey() {
    console.log('Testing Anon Key with public read...');
    const { data, error } = await supabase.from('articles').select('count', { count: 'exact', head: true });

    if (error) {
        console.error('❌ Anon Key Blocked/Invalid:', error.message);
        console.error('Status:', error.code, error.hint, error.details);
    } else {
        console.log('✅ Anon Key Works! Articles count:', count);
    }
}

testAnonKey();
