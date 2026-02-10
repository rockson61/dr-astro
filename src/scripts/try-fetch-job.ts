
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const supabase = createClient(
    process.env.PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function checkJob() {
    const slug = "associate-dentist-nyc";
    console.log(`Checking job with slug: ${slug}`);

    // Try basic select first
    const { data: basicData, error: basicError } = await supabase
        .from('jobs')
        .select('*')
        .eq('slug', slug)
        .single();

    if (basicError) {
        console.error("Basic Fetch Error:", basicError);
    } else {
        console.log("Basic Fetch Success:", basicData?.title);
    }

    // Try complex select used in page
    const { data: complexData, error: complexError } = await supabase
        .from('jobs')
        .select('*, company:listings(business_name, logo_url, city)')
        .eq('slug', slug)
        .single();

    if (complexError) {
        console.error("Complex Fetch Error (with company):", complexError);
    } else {
        console.log("Complex Fetch Success:", complexData?.company);
    }
}

checkJob();
