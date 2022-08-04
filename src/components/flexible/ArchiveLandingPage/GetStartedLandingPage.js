import React from "react";
import styled from "styled-components";

import Image from "~/components/elements/Image";
import { Link } from "~/components/elements/links/Link";
import Media from "~/components/elements/Media";
import TextCard from "~/components/elements/TextCard";
import MarketoForm from "~/components/elements/forms/MarketoForm";

const PageStyled = styled.div``;

export default function GetStartedLandingPage({ get_started_landing_page }) {
	const testimonial = get_started_landing_page.left_section?.testimonial?.acf;
	const [isSent, setIsSent] = React.useState(false);

	return (
		<PageStyled>
			<div className="flex min-h-screen items-center justify-center py-6">
				<div className="container !max-w-[1470px] items-center justify-between text-center md:flex">
					<div className="left w-full max-w-[742px] rounded-2xl bg-purple px-6 py-8 text-white md:w-7/12 md:px-8 md:py-16 lg:px-16 lg:py-20">
						<div className="mx-auto max-w-[480px]">
							<Link href="/" className="mb-6 !flex h-auto md:mb-8">
								<div className="mx-auto flex h-full max-h-8 w-auto flex-auto object-contain md:max-h-[48px]">
									<Image image={get_started_landing_page.left_section.logo} objectFit="contain" className="flex-auto" />
								</div>
							</Link>
							<TextCard {...get_started_landing_page.left_section.text_card} />
							<div className="my-6 md:my-6 lg:my-12">
								<Media {...get_started_landing_page.left_section.media} />
							</div>
							<div className={`${"flex flex-wrap items-center md:flex-nowrap"}`}>
								<div className="hidden w-full max-w-[114px] flex-auto flex-col justify-center md:mr-5 md:flex">
									<div className="w-full">
										<Image className="w-full" image={testimonial?.images?.logo} />
									</div>
								</div>
								<div className="w-full md:text-left">
									<div className="mt-3 md:ml-auto md:max-w-[21rem]">
										<div className="mb-2 text-base font-medium leading-snug" dangerouslySetInnerHTML={{ __html: testimonial?.quote }} />
										<div className="text-14px leading-tight">
											<span className="font-bold">{testimonial?.cite_name}</span>
											{testimonial?.cite_role && <span>, {testimonial?.cite_role}</span>}
											{testimonial?.cite_company && <span className="text-16px"> at {testimonial?.cite_company}</span>}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="right mt-8 w-full md:mt-0 md:w-5/12 md:px-6 lg:px-12">
						{isSent ? (
							<div>
								<TextCard {...get_started_landing_page.form_submitted.text_card} />
							</div>
						) : (
							<div>
								<div className="mx-auto flex h-full max-h-20 w-auto object-contain">
									<Image image={get_started_landing_page.right_section.image} className="flex-auto" objectFit="contain" />
								</div>
								<div className="mb-8">
									<TextCard {...get_started_landing_page.right_section.text_card} />
								</div>
								<MarketoForm {...get_started_landing_page.right_section.marketo_form} formName="Get Started Form" setIsSent={setIsSent} />
							</div>
						)}
					</div>
				</div>
			</div>
		</PageStyled>
	);
}
