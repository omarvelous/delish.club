import { recipes } from "./_app.recipes._index";

export const loader = async () => {
  const baseUrl = process.env.BASE_URL;
  let urlSet: string = "";

  for (const recipe of recipes) {
    const url = new URL(`/recipes/${recipe.id}/${recipe.slug}`, baseUrl).toString();
    urlSet += `  <url>
    <loc>${url}</loc>
    <lastmod>${recipe.updatedAt}</lastmod>
    <changefreq>yearly</changefreq>
  </url>`;
    urlSet += `\n`;
  }

  const sitemapText = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>"2024-11-11"</lastmod>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>
${urlSet}
</urlset>`;

  return new Response(sitemapText, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
