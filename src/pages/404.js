import React from "react";
import Page from "~/components/templates/Page";
import { getFromWordpress } from "~/utils/server";

export default function FourOhFour(data) {
	return <Page {...data} />;
}

export async function getStaticProps() {
	const data = await getFromWordpress(`together/post?slug=404-2`);
	return { props: data };
}
