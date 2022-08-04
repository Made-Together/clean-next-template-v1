import React from "react";
import Head from "next/head";
import { Link } from "~/components/elements/links/Link";
import Image from "~/components/elements/Image";
import { TextLink } from "~/components/elements/Button";
import PurpleCTA from "~/components/global/PurpleCTA";
import { CategoryLink } from "~/components/elements/links/CategoryLink";
import styled from "styled-components";
import { ArrowRightCircle } from "~/components/elements/Icon";
import useIntegrationCategories from "~/hooks/useIntegrationCategories";
import { Layout } from "~/templates/Layout";
import FlexibleLayout from "~/components/flexible";

const StyledPage = styled.div`
	section.masthead + section.section-first {
		padding-top: 6rem;
		@media screen and (min-width: 768px) {
			padding-top: 8rem;
		}
	}
`;

export default function IntegrationPost(props) {
	const { post_title, hero, logo, flexible_content, integrationCategories, inner_page_published } = props.page;
	const allCategories = useIntegrationCategories();

	return (
		<StyledPage>
			<Layout data={props}>
				<Head>{!inner_page_published && <meta name="robots" content="noindex" />}</Head>

				<section className="masthead mx-auto max-w-[1370px] rounded-[15px] pt-24 ">
					<div className="w-full justify-between rounded-[15px] bg-grey px-[25px] pt-[2rem] pb-20 md:flex md:space-x-4 md:px-[82px] md:pt-[82px] md:pb-[110px]">
						<div className="hidden w-full md:block md:w-3/12">
							{/* @todo this link should probably be in options */}
							<div className="mb-[46px]">
								<Link to="/integrations/">
									<TextLink reverse link={{ title: "Back to integrations", url: "/integrations/" }} />
								</Link>
							</div>
							<div className="mb-[43px] h-[1px] w-full max-w-[282px] bg-black bg-opacity-[0.29]" />
							{allCategories && allCategories.length > 0 && (
								<ul className="flex space-x-6 md:block md:space-y-[24px] md:space-x-0">
									{allCategories.map((category, i) => (
										<CategoryLink key={`intcat${i}`} {...category} />
									))}
								</ul>
							)}
						</div>
						<div className="mt-5 w-full md:w-8/12">
							<div className="mb-[28px] items-center md:mb-[60px] lg:flex lg:space-x-[39px]">
								<div
									style={{ backgroundColor: hero.logo_background_colour || "#fff" }}
									className="flex h-[166px] w-[166px] flex-none items-center justify-center rounded-[16px]"
								>
									<Image image={logo} className="h-full max-h-[70px] w-full max-w-[100px]" />
								</div>

								<div className="mt-5 md:max-w-[538px] lg:mt-0">
									<h1 className="text-35px leading-[1.71] tracking-[-0.02em]" dangerouslySetInnerHTML={{ __html: post_title }} />
									<div dangerouslySetInnerHTML={{ __html: hero?.description }} />
								</div>
							</div>
							<div className="h-[1px] w-full bg-black bg-opacity-[0.29]" />
							<div className="mt-[28px] justify-between gap-10 md:mt-[56px] lg:flex lg:space-x-4">
								<div className="prose md:max-w-[548px]" dangerouslySetInnerHTML={{ __html: hero.content }} />
								<div className="flex-auto lg:pl-3">
									<ul className="mt-5 flex space-x-6 pr-5 lg:mt-0 lg:block lg:space-y-4 lg:space-x-0">
										{integrationCategories?.nodes && integrationCategories?.nodes.length > 0 && (
											<li>
												<h4 className="text-20px mb-[6px] font-bold leading-[1.20] text-orange ">Category</h4>
												<ul>
													{integrationCategories?.nodes.map((category, i) => (
														<li className="" key={i}>
															<Link className="group inline-flex items-center gap-3" to={`/integrations/#${category?.slug}`}>
																<div className="mt-1">
																	<ArrowRightCircle />
																</div>
																<span className="duration-300 group-hover:translate-x-1 group-hover:text-purple">
																	{category?.taxonomyIntegrationCategory?.shortName}
																</span>
															</Link>
														</li>
													))}
												</ul>
											</li>
										)}

										{hero.pairs_with && hero.pairs_with.length > 0 && hero?.pairs_with[0]?.link && (
											<li>
												<h4 className="text-20px mb-[6px] font-bold leading-[1.20] text-orange ">Pairs with</h4>
												<ul>
													{hero.pairs_with.map((link, i) => (
														<li className="" key={i}>
															<Link className="group inline-flex items-center gap-3" to={link.link.url}>
																<div className="mt-1">
																	<ArrowRightCircle />
																</div>
																<span className="duration-300 group-hover:translate-x-1 group-hover:text-purple">{link?.link?.title}</span>
															</Link>
														</li>
													))}
												</ul>
											</li>
										)}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</section>

				{flexible_content?.map((layout, i) => (
					<FlexibleLayout {...layout} key={(layout?.acf_fc_layout || "") + i} />
				))}

				<PurpleCTA />
			</Layout>
		</StyledPage>
	);
}
