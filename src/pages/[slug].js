import React from "react";
import Post from "~/templates/Post";
import Page from "~/templates/Page";
import { getFromWordpress } from "~/utils/server";

export default function Template(data) {
	const { post_type } = data;
	switch (post_type) {
		case "post":
			return <Post {...data} />;
		default:
			return <Page {...data} />;
	}
}

export async function getStaticPaths() {
	const data = await getFromWordpress(`together/paths`);
	return { paths: data?.map((slug) => `/${slug}`), fallback: false };
}

export async function getStaticProps({ params }) {
	const data = await getFromWordpress(`together/post?slug=${params.slug}`);
	return { props: data };
}
