import React from "react";
import { getFromWordpress } from "~/utils/server";
import Resource from "~/components/templates/Resource";

export default function PostTemplate(data) {
	return <Resource {...data} />;
}

export async function getStaticPaths() {
	const data = await getFromWordpress(`together/paths?post_type=resource`);

	return { paths: data.map((slug) => `/${slug}`), fallback: false };
}

export async function getStaticProps({ params }) {
	const data = await getFromWordpress(`together/post?slug=${params.post}`);
	return { props: data };
}
