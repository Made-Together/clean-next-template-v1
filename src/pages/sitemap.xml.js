/* eslint-disable import/named */

// import { getEnvValue, getFromWordpress } from "~/utils/server";

export default function Sitemap() {}

// export const getServerSideProps = async ({ res }) => {
// 	const data = await getFromWordpress(`together/paths`);
// 	const baseUrl = getEnvValue("WORDPRESS_REPLACE_URL");
// 	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
//     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//       ${data
// 				.map(
// 					(url) => `
//             <url>
//               <loc>${baseUrl}/${url}</loc>
//               <lastmod>${new Date().toISOString()}</lastmod>
//               <changefreq>monthly</changefreq>
//               <priority>1.0</priority>
//             </url>
//           `
// 				)
// 				.join("")}
//     </urlset>
//   `;

// 	res.setHeader("Content-Type", "text/xml");
// 	res.write(sitemap);
// 	res.end();

// 	return {
// 		props: {},
// 	};
// };
