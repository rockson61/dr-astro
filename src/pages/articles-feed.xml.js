import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * JATS-inspired XML feed for PubMed / PMC / CrossRef compatibility.
 * Not full JATS (which is a full DTD), but provides the essential metadata
 * that indexers look for in a machine-readable format.
 */
export async function GET({ site }) {
    const { data: articles } = await supabase
        .from('articles')
        .select(`
            title, slug, excerpt, content, published_at, doi, 
            author:profiles(full_name, bio),
            category:categories(name)
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(100);

    const escapeXml = (str) => {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    };

    const stripHtml = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]*>?/gm, '').trim();
    };

    const feed = `<?xml version="1.0" encoding="UTF-8"?>
<articles xmlns:xlink="http://www.w3.org/1999/xlink">
  <journal-meta>
    <journal-title>DentalReach Magazine</journal-title>
    <publisher>
      <publisher-name>DentalReach</publisher-name>
      <publisher-loc>India</publisher-loc>
    </publisher>
  </journal-meta>
  ${(articles || []).map(article => {
        const pubDate = new Date(article.published_at);
        return `
  <article article-type="research-article">
    <front>
      <article-meta>
        ${article.doi ? `<article-id pub-id-type="doi">${escapeXml(article.doi)}</article-id>` : ''}
        <article-id pub-id-type="publisher-id">${escapeXml(article.slug)}</article-id>
        <article-categories>
          <subj-group>
            <subject>${escapeXml(article.category?.name || 'Dentistry')}</subject>
          </subj-group>
        </article-categories>
        <title-group>
          <article-title>${escapeXml(article.title)}</article-title>
        </title-group>
        <contrib-group>
          <contrib contrib-type="author">
            <name>
              <surname>${escapeXml((article.author?.full_name || 'DentalReach Team').split(' ').slice(-1)[0])}</surname>
              <given-names>${escapeXml((article.author?.full_name || 'DentalReach Team').split(' ').slice(0, -1).join(' '))}</given-names>
            </name>
          </contrib>
        </contrib-group>
        <pub-date pub-type="epub">
          <day>${pubDate.getDate()}</day>
          <month>${pubDate.getMonth() + 1}</month>
          <year>${pubDate.getFullYear()}</year>
        </pub-date>
        <self-uri xlink:href="${new URL(`/articles/${article.slug}`, site).href}" />
        <abstract>
          <p>${escapeXml(article.excerpt || stripHtml(article.content)?.substring(0, 500))}</p>
        </abstract>
      </article-meta>
    </front>
  </article>`;
    }).join('')}
</articles>`;

    return new Response(feed, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
        },
    });
}
