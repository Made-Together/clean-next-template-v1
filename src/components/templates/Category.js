import React from "react";
import chunk from "lodash/chunk";
import { useRouter } from "next/router";
import ResourceFiltering from "~/components/elements/resources/ResourcesFiltering";
import ResourcesMasthead from "~/components/elements/resources/ResourcesMasthead";
import ResourcesPagination from "~/components/elements/resources/ResourcesPagination";
import PurpleCTA from "~/components/global/PurpleCTA";
import ResourceGrid from "~/components/elements/resources/ResourcesGrid";
import { Layout } from "~/templates/Layout";
import useResources from "~/hooks/useResources";
import useStore from "~/hooks/useStore";

export default function CategoryPage(props) {
	const { page } = props;

	const router = useRouter();
	const { slug } = router.query;
	const pageNumber = !Number.isNaN(+slug[slug.length - 1]) ? +slug[slug.length - 1] : 1;

	const currentCategory = page.taxonomy === "category" ? page?.slug : "";
	const currentIndustry = page.taxonomy === "industry" ? page?.slug : "";

	const posts = useResources({
		category: currentCategory,
		industry: currentIndustry,
		pageNumber,
	});

	// TODO: needs a less expensive way of getting total post count
	const totalPostsCount = chunk(
		useResources({
			category: currentCategory,
			industry: currentIndustry,
		}),
		9
	).length;

	const resourceSearch = useStore((state) => state.resourceSearch);

	return (
		<Layout data={props} mainClassName="  ">
			<ResourcesMasthead>
				Boson Protocol{" "}
				<span className="text-embellishment  underline-stroke underline-stroke-yellow-alt-3">
					<span dangerouslySetInnerHTML={{ __html: page?.acf?.category?.masthead?.heading || page?.name }} />
					<span>.</span>
				</span>
			</ResourcesMasthead>
			<div className="relative">
				<ResourceFiltering currentCategory={`/resources/category/${currentCategory}/`} currentIndustry={`/resources/industry/${currentIndustry}/`} />
				{!resourceSearch && (
					<section className="py-20 md:py-28">
						<div className="container">
							<ResourceGrid posts={posts} type={page.post_title} />

							<div className="text-16px mx-auto  mt-12 flex items-center justify-center lg:mt-20">
								<ResourcesPagination
									path={`/resources/${page?.taxonomy}/${page?.slug}/`}
									pageNumber={pageNumber - 1}
									numberOfPages={totalPostsCount}
									prev={`/resources/${page?.taxonomy}/${page?.slug}/${pageNumber - 1 > 1 ? pageNumber - 1 : ""}`}
									next={`/resources/${page?.taxonomy}/${page?.slug}/${pageNumber + 1}`}
								/>
							</div>
						</div>
					</section>
				)}
			</div>

			<PurpleCTA />
		</Layout>
	);
}
