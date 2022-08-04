import React from "react";
import Template from "~/pages/[slug]";
import { getFromWordpress } from "~/utils/server";

export default function Preview(data) {
	return <Template {...data} />;
}

Preview.getInitialProps = async (ctx) => {
	const { post_id } = ctx.query;
	return getFromWordpress(`together/preview?post_id=${post_id}`);
};
