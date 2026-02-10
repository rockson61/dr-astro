
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const supabase = createClient(
    process.env.PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkProducts() {
    console.log("Probing products schema...");

    // Try to insert an empty object to trigger "null value in column ... violates not-null constraint"
    const { error } = await supabase.from('products').insert({});

    if (error) {
        console.log("Insert Error:", JSON.stringify(error, null, 2));
    } else {
        console.log("Insert Success (Surprisingly)");
    }

    // Try to get one product to see columns if any exist
    const { data } = await supabase.from('products').select('*').limit(1);
    if (data && data.length > 0) {
        console.log("Existing Product Keys:", Object.keys(data[0]));
    }
}

checkProducts();
