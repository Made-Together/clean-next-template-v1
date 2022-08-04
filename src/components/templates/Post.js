import React from "react";
import { Layout } from "~/templates/Layout";

export default function Post(page) {
	const { post_title, some_field } = page;
	return (
		<Layout page={page}>
			<h1 className="bg-[white]">
				Post: {post_title}
				<div>Some acf thing: {some_field}</div>
			</h1>
		</Layout>
	);
}
