import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Page from "~/templates/Page";
import Post from "~/templates/Post";
import PressRelease from "~/templates/PressRelease";
import CustomerStory from "~/templates/CustomerStory";
import Category from "~/templates/Category";
import Integration from "~/templates/Integration";
import { getFromWordpress } from "~/utils/server";

export default function Template(data) {
	switch (data?.page?.post_type) {
		case "page":
			return <Page {...data} />;
		case "post":
			return <Post {...data} />;
		case "press_release":
			return <PressRelease {...data} />;
		case "category":
			return <Category {...data} />;
		case "customer_story":
			return <CustomerStory {...data} />;
		case "integration":
			return <Integration {...data} />;
		default:
			return <Page {...data} />;
	}
}

export async function getStaticPaths() {
	const data = await getFromWordpress(`together/paths`);
	const routes = data.map((rs) => ({ params: { slug: rs.split("/").filter((f) => f) }, locale: "en" }));

	return {
		paths: routes,
		fallback: "blocking",
	};
}

export async function avoidRateLimit() {
	function sleep(ms = 200) {
		// eslint-disable-next-line
		return new Promise((res) => setTimeout(res, ms));
	}

	if (process.env.NODE_ENV === "production") {
		await sleep();
	}
}

export async function getStaticProps(ctx) {
	await avoidRateLimit();

	const {
		params: { slug },
		locale = "en",
	} = ctx;

	const [page, options] = await Promise.all([
		getFromWordpress(`together/post?slug=${slug ? slug.join("/") : ""}&lang=${locale}`),
		getFromWordpress(`together/options?lang=${locale}`),
	]);

	if (!page?.post_title && !page?.name) {
		// Try to match to a redirect
		const redirects = await getFromWordpress(`together/redirects?lang=${locale}`);
		if (redirects) {
			const match = redirects.filter(({ from }) => from === `/${slug.join("/")}/`).pop();
			if (match) {
				return {
					redirect: {
						destination: match.to,
						permanent: true,
					},
				};
			}
		}

		// No redirect found, return 404
		return {
			notFound: true,
		};
	}

	return {
		props: {
			page,
			options,
			locale,
			...(await serverSideTranslations(locale, ["common"])),
			hideHeader: !!(page?.flexible_content && page?.flexible_content[0]?.post_type === "get-started"),
			hideFooter: !!(page?.flexible_content && page?.flexible_content[0]?.post_type === "get-started"),
			headerColor: (() => {
				if (page?.post_type === "post") {
					return /^((default)|(gated-content))$/g.test(page?.blog_hero?.layout) || !page?.blog_hero?.layout ? "white" : "";
				}
				if (page?.post_type === "category" || page?.post_type === "press_release") {
					return "white";
				}
				if (page?.flexible_content) {
					return /^((dark-green)|(purple))$/g.test(page?.flexible_content[0]?.section?.background_color) ? "white" : "";
				}
				return "";
			})(),
		},
		revalidate: 60, // In seconds
	};
}
