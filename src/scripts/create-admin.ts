
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL; // Should be updated now or use process.env to be safe if not reloaded
// We need to make sure we use the correct URL even if dotenv hasn't reloaded the file in this process context, 
// but since we are spawning a new process with `run_command`, it will read the updated file.
// However, the replace_file_content happens in parallel? No, tools are sequential if not specified otherwise, but here they are.
// I will hardcode the correct URL here just to be absolutely sure for this script.
const CORRECT_URL = 'http://api.db.dentaloffice.io';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_KEY) {
    console.error('❌ Missing service key');
    process.exit(1);
}

const supabase = createClient(CORRECT_URL, SUPABASE_SERVICE_KEY);

async function createSuperAdmin() {
    const email = 'admin@dentalreach.io';
    const password = 'password123';

    console.log(`Creating Super Admin: ${email}`);

    // check if exists
    const { data: listData } = await supabase.auth.admin.listUsers();
    const existingUser = listData.users.find(u => u.email === email);
    let userId;

    if (existingUser) {
        console.log('User exists, updating password...');
        userId = existingUser.id;
        await supabase.auth.admin.updateUserById(userId, {
            password: password,
            email_confirm: true,
            user_metadata: { full_name: 'Super Admin' }
        });
    } else {
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { full_name: 'Super Admin' }
        });
        if (error) {
            console.error('Error creating auth user:', error);
            return;
        }
        userId = data.user.id;
    }

    console.log('Auth ID:', userId);

    // Upsert Profile with super_admin role
    // We try 'super_admin'. If the enum constraint fails, we'll fall back to 'dentist' and log a warning.
    // Ideally we should know the enum, but 'dentist' is safe provided we can bypass RLS with service key later.
    // But the user asked for "Super Admin", so let's try to store that role.

    // Check if we can use 'super_admin'
    const { error: profileError } = await supabase.from('profiles').upsert({
        id: userId,
        email: email,
        full_name: 'Super Admin',
        first_name: 'Super',
        last_name: 'Admin',
        role: 'super_admin', // Trying this
        is_verified: true,
        specialty: 'Administration',
        clinic_name: 'DentalReach HQ',
        location: 'Global',
        slug: 'super-admin'
    });

    if (profileError) {
        console.error('Failed to set super_admin role:', profileError.message);
        if (profileError.message.includes('invalid input value for enum')) {
            console.log('Falling back to "dentist" role but keeping name Super Admin');
            await supabase.from('profiles').upsert({
                id: userId,
                email: email,
                full_name: 'Super Admin',
                first_name: 'Super',
                last_name: 'Admin',
                role: 'dentist', // Fallback
                is_verified: true
            });
        }
    } else {
        console.log('✅ Profile created with super_admin role!');
    }
}

createSuperAdmin();
