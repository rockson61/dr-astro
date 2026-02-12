import { s as supabase } from '../../chunks/supabase_CFYPoMlB.mjs';
export { renderers } from '../../renderers.mjs';

const cleanSlug = (slug) => decodeURIComponent(slug);
const GET = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = Math.min(parseInt(searchParams.get("limit") || "9", 10), 50);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "newest";
    let orderField = "created_at";
    let ascending = false;
    if (sort === "oldest") ascending = true;
    else if (sort === "mostLiked") orderField = "likes_count";
    else if (sort === "mostViewed") orderField = "views_count";
    let query = supabase.from("articles").select("id, title, excerpt, author, category, image_url, images, created_at, views_count, likes_count, user_id", { count: "exact" }).eq("is_approved", true);
    if (category) {
      query = query.eq("category", category);
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
    }
    query = query.order(orderField, { ascending }).range((page - 1) * limit, page * limit - 1);
    const { data, error, count } = await query;
    if (error) {
      console.error("Articles fetch error:", error);
      throw error;
    }
    const articlesWithSlugs = (data || []).map((article) => ({
      ...article,
      slug: article.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || article.id
    }));
    const responseData = {
      articles: articlesWithSlugs,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      }
    };
    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300"
      }
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch articles" }), { status: 500 });
  }
};
const POST = async ({ request }) => {
  try {
    const { slug } = await request.json();
    if (!slug) {
      return new Response(JSON.stringify({ error: "Slug is required" }), { status: 400 });
    }
    let article = null;
    const decodedSlug = cleanSlug(slug);
    const isNumeric = /^\d+$/.test(decodedSlug);
    if (isNumeric) {
      const { data } = await supabase.from("articles").select("*").eq("id", Number(decodedSlug)).eq("is_approved", true).single();
      article = data;
    } else {
      const idMatch = decodedSlug.match(/(?:^|\-)(?:id:)?(\d+)$/);
      if (idMatch) {
        const { data } = await supabase.from("articles").select("*").eq("id", Number(idMatch[1])).eq("is_approved", true).single();
        article = data;
      }
      if (!article) {
        const decodedTitle = decodedSlug.replace(/-id:\d+$/, "").replace(/-\d+$/, "").replace(/-/g, " ").replace(/\s+/g, " ").trim();
        const { data } = await supabase.from("articles").select("*").ilike("title", decodedTitle).eq("is_approved", true).maybeSingle();
        article = data;
      }
    }
    if (!article) {
      return new Response(JSON.stringify({ error: "Article not found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ article }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600"
      }
    });
  } catch (error) {
    console.error("Error fetching article:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch article" }), { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
