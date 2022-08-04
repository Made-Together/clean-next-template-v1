import React from "react";
import { useTranslation } from "next-i18next";
import { Link } from "~/components/elements/links/Link";
import Stats from "~/components/elements/Stats";
import { CustomerStoriesGrid } from "~/components/flexible/ArchiveLandingPage/CustomerStoryLandingPage";
import Masthead from "~/components/flexible/Masthead";
import PurpleCTA from "~/components/global/PurpleCTA";
import PostFlexibleContent from "~/components/post/PostFlexibleContent";
import { Layout } from "~/templates/Layout";

export default function CustomerStory(props) {
	const { t } = useTranslation();
	const { page } = props;

	if (!page) {
		return null;
	}

	return (
		<Layout data={props}>
			<Masthead {...page?.hero} />

			{page?.stats && page?.stats?.length > 0 && (
				<div className="relative z-[1] lg:mt-[-60px]">
					<Stats stats={page.stats} showBackground={false} paddingBottom />
				</div>
			)}

			<section className="container justify-between gap-x-4 lg:flex">
				<div className="lg:max-w-[282px] ">
					<ul className=" grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12 lg:grid-cols-1 lg:gap-[50px]  ">
						{page.company && (
							<li>
								<h4 className="mb-[10px]">{t("Company")}</h4>
								<div className="text-18px">{page.company}</div>
							</li>
						)}
						{page.location && (
							<li>
								<h4 className="mb-[10px]">{t("Location")}</h4>
								<div className="text-18px">{page.location}</div>
							</li>
						)}
						{page.industry && (
							<li>
								<h4 className="mb-[10px]">{t("Industry")}</h4>
								<div className="text-18px">{page.industry}</div>
							</li>
						)}
						{page.bosonprotocol_products && page.bosonprotocol_products.length > 0 && (
							<li>
								<h4 className="mb-[10px]">{t("Boson Protocol Products")}</h4>
								<ul>
									{page.bosonprotocol_products.map((link, i) => (
										<li key={`product-link-${i}`}>
											<Link className="text-18px text-orange underline transition-opacity duration-150 hover:opacity-80" {...link} />
										</li>
									))}
								</ul>
							</li>
						)}
					</ul>
				</div>
				<div className="mt-12 max-w-[791px] lg:mt-[-11px] ">
					<PostFlexibleContent content={page.flexible_post_content} />
				</div>
			</section>

			{/* TODO: get this title in page */}
			<CustomerStoriesGrid posts={page.featured_customer_stories} title={t(`See our next customer story`)} />

			<PurpleCTA />
		</Layout>
	);
}
