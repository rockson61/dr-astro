
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const supabase = createClient(
    process.env.PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkTables() {
    console.log("Checking tables...");

    // Check sellers
    const { data: sellers, error: sellerError } = await supabase.from('sellers').select('*').limit(1);
    if (sellerError) {
        console.log("Sellers table check:", sellerError.message);
    } else {
        console.log("Sellers table exists. Count:", sellers?.length);
    }

    // Check profiles
    const { data: profiles } = await supabase.from('profiles').select('id, full_name').limit(1);
    console.log("Profiles check:", profiles?.length ? "Found profiles" : "No profiles");
}

checkTables();
