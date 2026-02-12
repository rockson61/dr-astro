import { s as supabase } from '../../chunks/supabase_woKm2pOd.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const type = url.searchParams.get("type") || "all";
  const sort = url.searchParams.get("sort") || "relevance";
  const startDate = url.searchParams.get("startDate");
  const endDate = url.searchParams.get("endDate");
  if (!q || q.length < 2) {
    return new Response(JSON.stringify({ results: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
  const query = `%${q}%`;
  let results = [];
  const isNewest = sort === "newest";
  const isOldest = sort === "oldest";
  try {
    const promises = [];
    if (type === "all" || type === "articles") {
      let qb = supabase.from("articles").select("id, title, slug, excerpt, image_url, category, created_at").eq("status", "published").or(`title.ilike.${query},excerpt.ilike.${query}`);
      if (startDate) qb = qb.gte("created_at", startDate);
      if (endDate) qb = qb.lte("created_at", endDate);
      if (isNewest) qb = qb.order("created_at", { ascending: false });
      else if (isOldest) qb = qb.order("created_at", { ascending: true });
      promises.push(
        qb.limit(10).then(({ data }) => data?.map((d) => ({ ...d, type: "article" })) || [])
      );
    }
    if (type === "all" || type === "people") {
      let qb = supabase.from("profiles").select("id, full_name, slug, avatar_url, specialty, role, created_at").or(`full_name.ilike.${query},specialty.ilike.${query}`);
      if (startDate) qb = qb.gte("created_at", startDate);
      if (endDate) qb = qb.lte("created_at", endDate);
      if (isNewest) qb = qb.order("created_at", { ascending: false });
      promises.push(
        qb.limit(5).then(({ data }) => data?.map((d) => ({ ...d, type: "profile" })) || [])
      );
    }
    if (type === "all" || type === "jobs") {
      let qb = supabase.from("jobs").select("id, title, slug, company_name, location, type, created_at").eq("is_active", true).or(`title.ilike.${query},company_name.ilike.${query}`);
      if (startDate) qb = qb.gte("created_at", startDate);
      if (endDate) qb = qb.lte("created_at", endDate);
      if (isNewest) qb = qb.order("created_at", { ascending: false });
      promises.push(
        qb.limit(5).then(({ data }) => data?.map((d) => ({ ...d, type: "job" })) || [])
      );
    }
    if (type === "all" || type === "events") {
      let qb = supabase.from("events").select("id, title, slug, start_date, location, type, created_at").or(`title.ilike.${query},location.ilike.${query}`);
      if (startDate) qb = qb.gte("created_at", startDate);
      if (endDate) qb = qb.lte("created_at", endDate);
      if (isNewest) qb = qb.order("created_at", { ascending: false });
      promises.push(
        qb.limit(5).then(({ data }) => data?.map((d) => ({ ...d, type: "event" })) || [])
      );
    }
    if (type === "all" || type === "directory") {
      let qb = supabase.from("listings").select("id, business_name, slug, description, type, is_verified, created_at").eq("is_verified", true).or(`business_name.ilike.${query},description.ilike.${query}`);
      if (startDate) qb = qb.gte("created_at", startDate);
      if (endDate) qb = qb.lte("created_at", endDate);
      if (isNewest) qb = qb.order("created_at", { ascending: false });
      promises.push(
        qb.limit(5).then(({ data }) => data?.map((d) => ({ ...d, type: "listing" })) || [])
      );
    }
    if (type === "all" || type === "products") {
      let qb = supabase.from("products").select("id, name, slug, price, category, images, created_at").eq("status", "active").or(`name.ilike.${query},description.ilike.${query}`);
      if (startDate) qb = qb.gte("created_at", startDate);
      if (endDate) qb = qb.lte("created_at", endDate);
      if (isNewest) qb = qb.order("created_at", { ascending: false });
      promises.push(
        qb.limit(5).then(({ data }) => data?.map((d) => ({
          ...d,
          title: d.name,
          image_url: d.images?.[0] || null,
          type: "product"
        })) || [])
      );
    }
    const allResults = await Promise.all(promises);
    results = allResults.flat();
    if (isNewest) {
      results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (isOldest) {
      results.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    }
  } catch (error) {
    console.error("Search API Error:", error);
    return new Response(JSON.stringify({ error: "Search failed" }), { status: 500 });
  }
  return new Response(JSON.stringify({ results }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
