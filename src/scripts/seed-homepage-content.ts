
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing Supabase URL or Service Role Key");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedHomepageContent() {
    console.log("🌱 Seeding Homepage Content...");

    // 1. PRODUCTS
    console.log("📦 Seeding Products...");
    const products = [
        {
            title: "Dental Chair X3000",
            slug: "dental-chair-x3000",
            category: "Equipment",
            price: 4500,
            description: "Experience the future of dental ergonomics with the X3000.",
            images: ["https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=800"],
            status: "active"
        },
        {
            title: "Intraoral Camera HD",
            slug: "intraoral-camera-hd",
            category: "Diagnostics",
            price: 899,
            description: "High definition intraoral camera for precise diagnostics.",
            images: ["https://images.pexels.com/photos/3845126/pexels-photo-3845126.jpeg?auto=compress&cs=tinysrgb&w=800"],
            status: "active"
        }
    ];

    for (const p of products) {
        // Need a seller_id. We'll try to find one or create a dummy one if needed.
        // For now, let's just list the first user we find as seller
        const { data: users } = await supabase.from("profiles").select("id").limit(1);
        if (!users || users.length === 0) {
            console.warn("No users found to assign as seller for products. Skipping.");
            continue;
        }
        const sellerId = users[0].id;

        const { title, ...rest } = p;
        const { error } = await supabase.from("products").upsert({
            ...rest,
            name: title,
            seller_id: sellerId
        }, { onConflict: "slug" });

        if (error) console.error(`Error seeding product ${title}:`, JSON.stringify(error, null, 2));
    }

    // 2. EVENTS
    console.log("📅 Seeding Events...");
    const events = [
        {
            title: "Dental Expo 2026",
            slug: "dental-expo-2026",
            start_date: "2026-10-15T09:00:00Z",
            location: "New York, NY",
            image_url: "https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=800",
            type: "conference"
        }
    ];

    for (const e of events) {
        const { error } = await supabase.from("events").upsert(e, { onConflict: "slug" });
        if (error) console.error(`Error seeding event ${e.title}:`, error.message);
    }

    // 3. JOBS
    console.log("💼 Seeding Jobs...");
    const jobs = [
        {
            title: "Associate Dentist",
            slug: "associate-dentist-nyc",
            company_name: "Smile Care SEO",
            location: "New York, NY",
            type: "full_time",
            salary_range: "$150k - $200k",
            created_at: new Date().toISOString()
        }
    ];

    for (const j of jobs) {
        // Need employer_id
        const { data: users } = await supabase.from("profiles").select("id").limit(1);
        if (!users || users.length === 0) continue;

        const { error } = await supabase.from("jobs").upsert({
            ...j,
            employer_id: users[0].id
        }, { onConflict: "slug" });
        if (error) console.error(`Error seeding job ${j.title}:`, error.message);
    }

    // 4. PODCASTS
    console.log("🎙️ Seeding Podcasts...");
    const podcasts = [
        {
            title: "Ep 42: The Future of AI in Dentistry",
            slug: "ep-42-ai-dentistry",
            episode_number: 42,
            host_name: "DentalReach Team",
            guest_names: ["Dr. A. Smith"],
            duration_minutes: 45,
            image_url: "https://images.pexels.com/photos/6954162/pexels-photo-6954162.jpeg?auto=compress&cs=tinysrgb&w=800"
        }
    ];

    for (const pod of podcasts) {
        // podcasts usually need a user_id too
        const { data: users } = await supabase.from("profiles").select("id").limit(1);
        if (!users || users.length === 0) continue;

        const { error } = await supabase.from("podcasts").upsert({
            ...pod,
            user_id: users[0].id
        }, { onConflict: "slug" });
        if (error) console.error(`Error seeding podcast ${pod.title}:`, error.message);
    }

    // 5. AWARDS
    console.log("🏆 Seeding Awards...");
    const awards = [
        {
            title: "Best Clinical Case 2026",
            slug: "best-clinical-case",
            year: 2026,
            description: "Awarded for exceptional clinical skill."
        }
    ];
    for (const a of awards) {
        const { error } = await supabase.from("awards").upsert(a, { onConflict: "slug" });
        if (error) console.error(`Error seeding award ${a.title}:`, error.message);
    }

    // 6. GUIDES (Check existence first)
    console.log("📚 Seeding Guides...");
    // Verify table exists by trying a select
    const { error: guideCheckError } = await supabase.from("guides").select("id").limit(1);

    if (guideCheckError && guideCheckError.code === '42P01') { // undefined_table
        console.warn("⚠️ 'guides' table does not exist. Skipping guides seeding.");
    } else {
        const guides = [
            {
                title: "Ultimate Guide to Digital Workflow",
                slug: "digital-workflow-guide",
                pages: 42,
                file_size: "4.5 MB",
                image_url: "https://images.pexels.com/photos/3845653/pexels-photo-3845653.jpeg?auto=compress&cs=tinysrgb&w=400"
            }
        ];
        for (const g of guides) {
            const { error } = await supabase.from("guides").upsert(g, { onConflict: "slug" });
            if (error) console.error(`Error seeding guide ${g.title}:`, error.message);
        }
    }

    console.log("✅ Seeding completed.");
}

seedHomepageContent().catch(console.error);
