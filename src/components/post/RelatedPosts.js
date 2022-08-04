import React from "react";
import { useTranslation } from "next-i18next";
import PostPreview from "~/components/post/PostPreview";

function RelatedPosts({ posts }) {
	const { t } = useTranslation();
	return posts && posts?.length > 0 ? (
		<section className="my-20 md:my-28">
			<div className="container">
				<h2 className="text-h2">{t("Explore other resources")}</h2>
				<div className="mt-10 grid grid-cols-1 gap-[25px] md:mt-[64px] md:grid-cols-3 ">
					{posts?.map((post, i) => (
						<PostPreview key={`rp${i}`} {...post} />
					))}
				</div>
			</div>
		</section>
	) : null;
}

export default RelatedPosts;
