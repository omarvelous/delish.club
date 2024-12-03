import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  const baseUrl = process.env.BASE_URL;
  const robotText = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;

  return new Response(robotText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
