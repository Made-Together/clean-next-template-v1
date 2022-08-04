import { getFromWordpress } from "~/utils/server";

export default function Robots() {}

export const getServerSideProps = async ({ res }) => {
	const data = await getFromWordpress(`together/robots`);
	const is_public = data.blog_public === "1";
	const robots = `User-agent: *
${is_public && process.env.NEXT_PUBLIC_DOMAIN_EN === "www.bosonprotocol.io" ? "Allow: /*" : "Disallow: /*"}`;

	res.setHeader("Content-Type", "text/plain");
	res.write(robots);
	res.end();

	return {
		props: {},
	};
};
