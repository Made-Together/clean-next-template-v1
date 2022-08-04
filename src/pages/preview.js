import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Template from "~/pages/[...slug]";
import { getFromWordpress } from "~/utils/server";

export default function Preview(data) {
	return <Template {...data} />;
}

export async function getServerSideProps(ctx) {
	const {
		query: { post_id },
		locale = "en",
	} = ctx;

	const [page, options] = await Promise.all([
		getFromWordpress(`together/preview?post_id=${post_id}&cache=${+new Date()}`),
		getFromWordpress(`together/options?lang=${locale}`),
	]);

	// TODO: consolidate this with code in [...slug].js
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
	};
}
