
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabase = createClient(
    process.env.PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function inspect() {
    console.log("--- Inspecting Roles ---");
    // Get distinct roles if possible, or just dump some profiles
    const { data: profiles, error } = await supabase.from('profiles').select('role, slug, id, full_name');

    if (error) {
        console.error("Error fetching profiles:", error);
        return;
    }

    const roleCounts: Record<string, number> = {};
    profiles.forEach(p => {
        const r = p.role || 'unknown';
        roleCounts[r] = (roleCounts[r] || 0) + 1;
    });

    console.log("Role Counts:", roleCounts);
    console.log("Total Profiles:", profiles.length);

    console.log("\n--- Sample Slugs ---");
    profiles.slice(0, 5).forEach(p => console.log(`${p.slug} (${p.full_name})`));

    // Check specific specific slug if user mentioned one failing, e.g. from previous turn
    // But user just said "clicked on any profile".
    // I suspect the seeding might have issues or the roles are distinct.
}

inspect();
