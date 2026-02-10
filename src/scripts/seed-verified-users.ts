
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

const USERS_PER_ROLE = 5;

// Mock data content
const SPECIALTIES = ['General', 'Ortho', 'Surgeon', 'Pediatric', 'Cosmetic', 'Lab', 'Manufacturing'];
const LOCATIONS = ['New York', 'London', 'Mumbai', 'Singapore', 'Sydney'];

async function seed() {
    console.log('--- Starting Database Seed ---');

    console.log("Cleaning Dependent Tables...");
    const { error: evError } = await supabase.from('events').delete().gt('id', 0);
    const { error: artError } = await supabase.from('articles').delete().gt('id', 0);
    const { error: podError } = await supabase.from('podcasts').delete().gt('id', 0);
    const { error: jobError } = await supabase.from('jobs').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    console.log("Cleaning Profiles Table...");
    const { error: delError } = await supabase.from('profiles').delete()
        .neq('email', 'admin@dentalreach.io')
        .neq('email', 'demo@dentalreach.io')
        .neq('email', 'dr-sarah-chen@dentalreach.io');

    if (delError) {
        console.error("Profile delete error:", delError.message);
    } else {
        console.log("✅ Profiles cleaned.");
    }

    console.log('--- Starting Creating Users ---');

    // Valid Roles: 'super_admin' | 'admin' | 'editor' | 'author' | 'dentist' | 'student' | 'business'
    const ROLE_MAPPINGS = [
        { label: 'Dentist', role: 'dentist' },
        { label: 'Student', role: 'student' },
        { label: 'Professional', role: 'author' }, // Mapping Professional -> Author
        { label: 'Manufacturer', role: 'business' }, // Mapping Manufacturer -> Business
        { label: 'Lab Technician', role: 'business' } // Mapping Lab -> Business
    ];

    for (const mapping of ROLE_MAPPINGS) {
        const { label, role } = mapping;
        console.log(`Processing ${USERS_PER_ROLE} verified users for Label: ${label} (Role: ${role})`);

        for (let i = 1; i <= USERS_PER_ROLE; i++) {
            const emailSlug = slugify(label, { lower: true }).replace('-', '_');
            const email = `verified_v2_${emailSlug}${i}@dentalreach.io`; // V2 to ensure fresh
            const password = 'password123';
            const name = `${label} User ${i}`;
            const slug = slugify(name, { lower: true }) + `-${emailSlug}`;

            let userId;

            // Try creating user 
            const { data: authData, error: authError } = await supabase.auth.admin.createUser({
                email,
                password,
                email_confirm: true,
                user_metadata: { full_name: name }
            });

            if (authError) {
                if (authError.message.includes("already registered")) {
                    // User exists. fallback mechanism
                    const { data: profData } = await supabase.from('profiles').select('id').eq('email', email).single();

                    if (profData) {
                        userId = profData.id;
                    } else {
                        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
                            email,
                            password
                        });

                        if (loginError) {
                            console.error(`Login failed for existing user ${email}:`, loginError.message);
                            continue;
                        }
                        userId = loginData.user.id;
                    }
                } else {
                    console.error(`Failed to create ${email}:`, authError.message);
                    continue;
                }
            } else {
                userId = authData.user.id;
            }

            if (!userId) {
                console.error(`Could not determine ID for ${email}`);
                continue;
            }

            // Create Profile
            const { error: profileError } = await supabase.from('profiles').upsert({
                id: userId,
                email: email,
                full_name: name,
                first_name: label.split(' ')[0],
                last_name: `User ${i}`,
                role: role, // Using valid mapped role
                slug: slug,
                is_verified: true,
                specialty: SPECIALTIES[i % SPECIALTIES.length],
                location: LOCATIONS[i % LOCATIONS.length],
                bio: `This is a demo bio for ${name}, a verified ${label}.`,
                avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${slug}`,
                clinic_name: `${name}'s ${label === 'Lab Technician' ? 'Lab' : 'Clinic'}`
            });

            if (profileError) {
                console.error(`Failed to seed profile ${email}:`, profileError.message);
            } else {
                console.log(`✅ Seeded ${name} (${slug})`);
            }
        }
    }
}

seed();
