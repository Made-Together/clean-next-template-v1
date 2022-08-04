import React from "react";
import { Layout } from "~/templates/Layout";
import TextCard from "~/components/elements/TextCard";
import PurpleCTA from "~/components/global/PurpleCTA";
import { useTranslation } from "next-i18next";

export default function PressRelease(props) {
	const { t } = useTranslation();
	const { page } = props;
	if (!page) return null;

	return (
		<Layout data={props}>
			<section className="bg-dark-green py-36 pt-48 text-white">
				<div className="container">
					<TextCard subheading={t("Press Release")} heading={page.post_title} options={{ heading_tag: "h1" }} />
				</div>
			</section>

			<section className="relative my-20 md:my-28">
				<div className="container">
					<div className="mx-auto max-w-[768px]">
						{page.post_content && <div className="post-content prose" dangerouslySetInnerHTML={{ __html: page.post_content }} />}
					</div>
				</div>
			</section>

			<PurpleCTA />
		</Layout>
	);
}
