import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('❌ Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// --- HELPER FUNCTIONS ---
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomBoolean = () => Math.random() > 0.5;

// --- DATA ---

const users = [
    { id: '1e04ac95-b236-4d76-9d10-36eddf9e7e72', full_name: 'Dr. Sarah Johnson', role: 'dentist', email: 'sarah.johnson@example.com', bio: 'Pioneer in Digital Dentistry.', specialty: 'Prosthodontist', clinic: 'Johnson Dental Arts', city: 'New York' },
    { id: '22222222-2222-2222-2222-222222222222', full_name: 'Dr. Michael Chen', role: 'dentist', email: 'michael.chen@example.com', bio: 'Cosmetic Dentistry Specialist.', specialty: 'Cosmetic Dentist', clinic: 'Chen Smiles', city: 'San Francisco' },
    { id: '33333333-3333-3333-3333-333333333333', full_name: 'Dr. Emily Davis', role: 'dentist', email: 'emily.davis@example.com', bio: 'Pediatric Dental Expert.', specialty: 'Pediatric Dentist', clinic: 'Tiny Teeth', city: 'London' },
    { id: '44444444-4444-4444-4444-444444444444', full_name: 'Dr. James Wilson', role: 'dentist', email: 'james.wilson@example.com', bio: 'General Dentistry & Implants.', specialty: 'General Dentist', clinic: 'Wilson Family Dental', city: 'Berlin' },
    { id: '55555555-5555-5555-5555-555555555555', full_name: 'Dr. Robert Smith', role: 'dentist', email: 'robert.smith@example.com', bio: 'Oral & Maxillofacial Surgeon.', specialty: 'Oral Surgeon', clinic: 'Smith Implants', city: 'Sydney' },
    { id: '66666666-6666-6666-6666-666666666666', full_name: 'Dr. Lisa Wong', role: 'dentist', email: 'lisa.wong@example.com', bio: 'Orthodontics and Aligners.', specialty: 'Orthodontist', clinic: 'Wong Ortho', city: 'Toronto' },
    { id: '77777777-7777-7777-7777-777777777777', full_name: 'Dr. David Brown', role: 'student', email: 'david.brown@example.com', bio: 'Final year dental student.', specialty: 'Student', clinic: 'University Clinic', city: 'Boston' },
    { id: '88888888-8888-8888-8888-888888888888', full_name: 'Technician Mark Lee', role: 'professional', email: 'mark.lee@example.com', bio: 'Master Ceramist.', specialty: 'Lab Technician', clinic: 'Elite Lab', city: 'Seoul' },
];

const categories = [
    { title: 'Best Digital Dentist 2026', slug: 'best-digital-dentist-2026', description: 'Awarding excellence in digital workflows.' },
    { title: 'Young Implantologist of the Year', slug: 'young-implantologist-2026', description: 'Recognizing rising stars in implantology.' },
    { title: 'Best Dental Clinic Design', slug: 'best-clinic-design-2026', description: 'For the most aesthetically pleasing practice.' },
    { title: 'Community Service Award', slug: 'community-service-2026', description: 'For outstanding contribution to public health.' }
];

const reviewComments = [
    "Excellent professional! Highly recommended.",
    "Very knowledgeable and patient with explanations.",
    "State of the art clinic and great staff.",
    "Truly an expert in their field.",
    "Great experience, will definitely refer colleagues.",
    "Innovative approach to complex cases."
];

async function seed() {
    console.log('🌱 Starting Database Seeding...');

    // 1. PROFILES
    console.log('...Seeding Profiles');
    for (const u of users) {
        // Create Auth User (This might fail if they exist, which is fine, we just need the profile)
        // Note: We cannot create Auth users via Client SDK easily without Admin API, 
        // assuming profiles table upsert is sufficient for public data data testing.
        // For Auth to work, these IDs must exist in auth.users. 
        // The SQL migration 0003_seed_data.sql handles auth users for the first 5.
        // We will just upsert profiles here.

        // Ensure Auth User Exists
        const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
            email: u.email,
            password: 'password123',
            email_confirm: true,
            user_metadata: { full_name: u.full_name }
        });

        if (authError && !authError.message.includes('already registered')) {
            console.error(`Failed to create auth user for ${u.full_name}:`, authError.message);
        } else if (authUser?.user) {
            // Update the ID in our local list to match the real auth ID if needed 
            // (But we want to force specific IDs for seeding if possible. 
            // admin.createUser usually generates a new ID unless we can specify it? 
            // supabase.auth.admin.createUser doesn't allow specifying ID in the JS SDK usually.
            // Wait. If I can't specify ID, then my 'users' array IDs are useless.
            // I MUST use the returned ID from authUser.user.id.
            u.id = authUser.user.id;
        } else if (authError && authError.message.includes('already registered')) {
            // Fetch existing user to get ID
            const { data: listData } = await supabase.auth.admin.listUsers();
            const existingUser = listData.users.find(user => user.email === u.email);
            if (existingUser) {
                u.id = existingUser.id;
            }
        }

        const { error } = await supabase.from('profiles').upsert({
            id: u.id,
            full_name: u.full_name,
            first_name: u.full_name.split(' ')[1],
            last_name: u.full_name.split(' ').slice(2).join(' ') || u.full_name.split(' ')[2] || 'Doe',
            email: u.email,
            role: u.role,
            bio: u.bio,
            specialty: u.specialty,
            clinic_name: u.clinic,
            location: u.city,
            is_verified: true,
            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.id}`,
            // reputation_score: randomInt(100, 5000) // Dummy score (Column might be missing)
        });
        if (error) console.error(`Failed to seed profile ${u.full_name}:`, error.message);
    }

    // 2. ARTICLES
    console.log('...Seeding Articles');
    const article_titles = [
        "Advances in AI for Dentistry", "The Guide to Zirconia Crowns", "Managing Pediatric Anxiety",
        "Root Canal Myths Debunked", "The Business of Dentistry", "Digital Smile Design Basics",
        "Implant Maintenance Protocols", "Ethics in Dental Practice", "Ergonomics for Surgeons", "Future of Tele-dentistry"
    ];

    for (let i = 0; i < 20; i++) {
        const author = randomItem(users);
        const title = i < article_titles.length ? article_titles[i] : `Dental Article #${i + 1}`;
        const { error } = await supabase.from('articles').upsert({
            title: title + (i > 9 ? ` ${i}` : ''), // Ensure unique title
            slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + (i > 9 ? `-${i}` : ''),
            excerpt: `This is a summary of the article about ${title}.`,
            content: `<p>This is the main content for <strong>${title}</strong>. It contains valuable insights.</p>`,
            category: randomItem(['Clinical', 'Business', 'Technology', 'News']),
            author_id: author.id,
            image_url: `https://source.unsplash.com/random/800x600/?dentist,medical,${i}`,
            is_approved: true,
            views_count: randomInt(100, 10000),
            likes_count: randomInt(10, 500),
            created_at: new Date(Date.now() - randomInt(0, 31536000000)).toISOString() // Random date in last year
        });
        if (error) console.error(`Failed to seed article ${title}:`, error.message);
    }

    // 3. LISTINGS (Seller Applications)
    console.log('...Seeding Business Listings');
    for (const u of users) {
        if (u.role === 'dentist') {
            const { error } = await supabase.from('seller_applications').upsert({
                user_id: u.id,
                business_name: u.clinic,
                business_type: 'Dental Clinic',
                business_description: `Premier dental clinic in ${u.city}.`,
                address: `123 Medical Way, ${u.city}`,
                phone: '+1-555-0199',
                status: 'approved', // Auto-approve for listing visibility
                reviewed_at: new Date().toISOString()
            });
            if (error) console.error(`Failed to seed listing for ${u.clinic}:`, error.message);
        }
    }

    // 4. AWARDS
    console.log('...Seeding Awards');
    // Categories
    const { data: insertedCats, error: catError } = await supabase.from('award_categories').upsert(
        categories.map(c => ({
            name: c.title,
            slug: c.slug,
            description: c.description,
            is_active: true,
            start_date: new Date().toISOString(),
            end_date: new Date(Date.now() + 86400000 * 30).toISOString() // Ends in 30 days
        }))
    ).select();

    if (catError) console.error('Failed to seed categories:', catError.message);

    if (insertedCats) {
        // Participants
        for (const cat of insertedCats) {
            // Pick 3 random users per category
            const randomParticipants = users.sort(() => 0.5 - Math.random()).slice(0, 3);

            for (const p of randomParticipants) {
                // Nominate
                const { data: part, error: partError } = await supabase.from('award_participants').upsert({
                    category_id: cat.id,
                    user_id: p.id,
                    status: 'approved',
                    nomination_video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                }).select().single();

                if (partError) console.error(`Failed to seed participant ${p.full_name}:`, partError.message);

                if (part) {
                    // Add Votes
                    const voteCount = randomInt(5, 50);
                    // We can't easily insert individual vote rows without infinite mock users, 
                    // so we might just rely on 'award_scores' if that table exists, 
                    // OR we just create a few votes from the known users.
                    for (const voter of users) {
                        if (randomBoolean()) {
                            const { error: voteError } = await supabase.from('award_votes').upsert({
                                participant_id: part.id,
                                voter_id: voter.id,
                                category_id: cat.id
                            }, { ignoreDuplicates: true });
                            if (voteError) console.error('Vote Error:', voteError.message);
                        }
                    }

                    // Pre-calculate Score
                    if (supabase.from('award_scores')) { // Check if table exists in mind (it does in legacy)
                        const { error: scoreError } = await supabase.from('award_scores').upsert({
                            participant_id: part.id,
                            score: voteCount * 10,
                            breakdown: { votes: voteCount, judges: 0 }
                        });
                        if (scoreError) console.error('Score Error pre-check:', scoreError.message);
                    }
                }
            }
        }
    }

    // 5. REVIEWS
    console.log('...Seeding Reviews');
    for (const target of users) {
        // 3-5 reviews per user
        const reviewCount = randomInt(3, 5);
        const reviewers = users.filter(u => u.id !== target.id).sort(() => 0.5 - Math.random()).slice(0, reviewCount);

        for (const reviewer of reviewers) {
            const { error: reviewError } = await supabase.from('profile_ratings').upsert({
                profile_id: target.id,
                rater_id: reviewer.id,
                rating: randomInt(3, 5), // Mostly positive
                comment: randomItem(reviewComments),
                created_at: new Date(Date.now() - randomInt(0, 7776000000)).toISOString() // Last 3 months
            }, { onConflict: 'profile_id,rater_id' });
            if (reviewError) console.error(`Review Error for ${target.full_name}:`, reviewError.message);
        }
    }

    console.log('✅ Seeding Complete! Database is populated.');
}

seed().catch(console.error);
