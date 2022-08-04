import React from "react";
import { Layout } from "~/templates/Layout";
import FlexibleLayout from "~/components/flexible";

export default function Page(props) {
	const { page } = props;
	if (!page) return null;

	const { flexible_content } = page;
	if (!flexible_content) return null;

	return (
		<Layout data={props}>
			{flexible_content?.map((layout, i) => (
				<FlexibleLayout {...layout} key={(layout?.acf_fc_layout || "") + i} />
			))}
		</Layout>
	);
}
