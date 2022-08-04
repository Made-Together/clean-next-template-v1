/* eslint-disable no-unused-vars */
import React from "react";
import { Layout } from "~/templates/Layout";

import { LayoutRenderer } from "../layouts/LayoutRenderer";

export default function Page(page) {
	const { post_title, sections, post_name } = page;
	return (
		<Layout page={page}>
			<LayoutRenderer page={post_name} prefix="Page_Posttypepage_Sections_Section_Components_" sections={sections} />
		</Layout>
	);
}
