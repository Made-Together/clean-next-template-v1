import React, { useState } from "react";
import { Link } from "~/components/elements/links/Link";
import Image from "~/components/elements/Image";
import { CategoryLink } from "~/components/elements/links/CategoryLink";
import PurpleCTA from "~/components/global/PurpleCTA";
import { DropDownSelect } from "~/components/flexible/JobsList";
import useIntegrations from "~/hooks/useIntegrations";
import { useTranslation } from "next-i18next";

export default function IntegrationLandingPage() {
	const { t } = useTranslation();
	const categoriesWithIntegrations = useIntegrations();
	const [activeAnchor, setActiveAnchor] = useState(0);

	return (
		<>
			<section>
				<div className="container py-8 pb-24 lg:pb-32">
					<div className="justify-between md:flex">
						<div className="top-[5rem] flex w-full space-x-6 md:sticky md:top-[10rem]  md:block md:w-2/12 md:space-x-0">
							<div className="block w-full md:hidden">
								<DropDownSelect
									defaultOption={t("All Integrations")}
									defaultValue={activeAnchor}
									onChange={(e) =>
										document.getElementById(e.target.value).scrollIntoView({
											behavior: "smooth",
										})
									}
								>
									{categoriesWithIntegrations?.map((category) => (
										<option key={category?.slug} value={category?.slug} dangerouslySetInnerHTML={{ __html: category?.name }} />
									))}
								</DropDownSelect>
							</div>

							<div className="sticky top-[10rem] hidden max-h-[calc(100vh_-_300px)] overflow-y-auto md:block md:space-y-7">
								{categoriesWithIntegrations?.map((category, i) => (
									<div key={`cat${i}`}>
										<CategoryLink
											{...category}
											name={category?.shortName || category?.name}
											type="anchor"
											active={activeAnchor === i}
											onClick={() => setActiveAnchor(i)}
										/>
										{category?.description && <div className={`text-13px mt-2 pl-[32px] ${activeAnchor === i ? "" : "hidden"}`}>{category?.description}</div>}
									</div>
								))}
							</div>
						</div>

						<div className="mt-4 w-full space-y-8 md:mt-[-27px] md:w-9/12 md:space-y-20 lg:space-y-24">
							{categoriesWithIntegrations?.map((category, i) => (
								<div key={`cat${i}`} id={category?.slug} className="py-2 md:py-4">
									<h3
										className="text-36px mb-5 text-center md:mb-[34px] md:text-left"
										dangerouslySetInnerHTML={{ __html: category?.shortName || category?.name }}
									/>
									{category?.posts && category?.posts?.length > 0 && <IntegrationsGrid posts={category.posts} />}
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
			<PurpleCTA />
		</>
	);
}

export function IntegrationsGrid({ posts }) {
	return (
		<ul className="grid grid-cols-2 gap-[12px] lg:grid-cols-3 xl:grid-cols-4 ">
			{posts
				.sort((a, b) => a.post_title.toLowerCase().localeCompare(b.post_title.toLowerCase()))
				.map((item, key) => (
					<IntegrationsGridCard key={`integration-card-${key}`} {...item} />
				))}
		</ul>
	);
}

export function IntegrationsGridCard({ acf, post_title, permalink, integration_tag }) {
	const isPublished = acf?.has_inner_page === true && acf?.inner_page_published === true;
	return (
		<Link
			href={isPublished ? permalink : "#"}
			className={`flex flex-col rounded-[8px] border border-black border-opacity-[0.1] px-5 pt-8 pb-7 ${
				!isPublished ? "pointer-events-none" : " trans hover:shadow-lg"
			}`}
		>
			<li className="flex flex-auto flex-col">
				<div className="flex-auto">
					<div className="h-[45px] max-w-[70%]">
						{acf.logo ? (
							<Image
								image={acf.logo}
								imgClassName="max-h-[45px] h-full max-w-full gatsby-image-auto"
								className="h-full max-w-full"
								objectFit="contain"
								objectPosition="left center"
							/>
						) : (
							<div className="h-[45px] w-[45px] bg-grey" />
						)}
					</div>
					<h3 className="text-16px mt-8 font-heading font-bold !leading-[1.2] tracking-[-0.01em]" dangerouslySetInnerHTML={{ __html: post_title }} />
					{acf.teaser && <div className="text-13px mt-[8px]" dangerouslySetInnerHTML={{ __html: acf.teaser }} />}
				</div>
				{integration_tag?.length > 0 && (
					<div className="mt-5 flex flex-wrap gap-[6px]">
						{integration_tag?.map((tag, i) => (
							<div key={`tag${i}`} className="text-13px select-none rounded bg-orange px-[8px] pt-[2px] pb-[4px] text-white grayscale ">
								{tag?.name}
							</div>
						))}
					</div>
				)}
			</li>
		</Link>
	);
}
