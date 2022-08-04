import React from "react";
import styled from "styled-components";
import Image from "~/components/elements/Image";
import { getSectionColourClasses, Section } from "~/components/elements/Section";
import TextCard from "~/components/elements/TextCard";
import CFLines from "~/assets/images/background-lines/contact-form-lines.svg";
import GetStartedEmailForm from "~/components/elements/forms/GetStartedEmailForm";
import { useTranslation } from "next-i18next";

export default function CTA(props) {
	const { layout } = props;

	return (
		<>
			{layout === "purple-email-form" && <PurpleEmailFormCTA {...props} />}
			{layout === "event" && <EventCTA {...props} />}
			{(layout === "one-col" || layout === "one-col-padded") && <OneColumnCTA {...props} />}
			{layout === "overflow-image" && <OverflowImageCTA {...props} />}
		</>
	);
}

export function PurpleEmailFormCTA({ text_card, section, is_investors = false }) {
	const { t } = useTranslation();
	return (
		<Section {...section} className="text-link-white relative bg-purple !py-0">
			<div className="container relative !py-14 md:!py-20 lg:!py-24">
				<div className="pointer-events-none absolute inset-y-0 right-0 hidden h-full max-w-[45%] md:block">
					<CFLines className="h-full object-cover object-left-top" />
				</div>
				<div className="grid items-center gap-8 md:grid-cols-12">
					<div className="text-card-container md:col-span-7">
						<div className="mx-auto max-w-lg md:mx-0 md:max-w-full">{text_card?.text_card && <TextCard {...text_card.text_card} />}</div>
					</div>

					<div className="relative md:col-span-5">
						<div className="mb-3 md:mr-0 md:ml-auto md:max-w-[483px]">
							{!is_investors ? (
								<GetStartedEmailForm />
							) : (
								<div
									dangerouslySetInnerHTML={{
										__html: `
                    <form class="mt-3 flex flex-col text-16px space-y-2 relative" action="https://bosonprotocol.us14.list-manage.com/subscribe/post?u=fbdc4a808d934691e516d7452&amp;id=d5c8197e67" method="post" id="mc-embedded-subscribe-form" target="_blank" >
                      <div class="flex-auto relative">
                        <input type="text" value="" name="FNAME"  placeholder="My First Name" class="h-[47px] w-full rounded px-5 border-none text-black" id="mce-FNAME" required autocomplete="first-name">
                      </div>
                      <div class="flex-auto relative">
                        <input type="email" value="" name="EMAIL"   placeholder="My Work Email" class="h-[47px] w-full rounded px-5 border-none text-black" id="mce-EMAIL" required>
                      </div>

                      <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                      <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_fbdc4a808d934691e516d7452_d5c8197e67" tabindex="-1" value=""></div>

                      <button
                        type="submit"
                        class="h-[47px] bg-orange text-white font-semibold px-7 rounded leading-none"
                      >
                        ${t("Get Started")}
                      </button>
                    </form>
                  `,
									}}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
}

const EventCTAStyled = styled.div`
	.text-card-heading-h3 {
		.text-h6 {
			font-size: 15px;
		}
	}
`;
export function EventCTA({ section, event }) {
	const { image, day = "", month = "" } = event;

	return (
		<Section {...section} className="relative">
			<div className="container">
				<EventCTAStyled className="rounded-xl bg-light-purple px-10 py-14 xl:px-16">
					<div className="-ml-10 flex flex-wrap items-center">
						<div className="flex-auto pl-10 sm:w-1/2 lg:w-3/12">
							{event && (
								<TextCard
									{...event}
									options={{
										...event?.options,
										headingClasses: "leading-[1.20] text-36px",
									}}
								/>
							)}
						</div>
						<div className="block w-full flex-auto pl-10 sm:hidden lg:block lg:w-4/12">
							<div className="mx-auto mt-8 max-w-[320px] lg:mt-0">{image && <Image image={image} />}</div>
						</div>

						{day && month && (
							<div className="mt-10 inline-flex flex-auto justify-end pl-10 sm:mt-0 sm:w-1/2 lg:w-3/12">
								<div className="flex-auto md:max-w-[270px]">
									<div className="text-36px relative mb-3 -ml-2 flex font-medium leading-none sm:mb-0">
										<div className="pointer-events-none absolute  inset-[-20px] select-none xl:top-[-54px] xl:right-[-47px] xl:bottom-[-49px] xl:left-[-29px]">
											<img
												src={require("~/assets/images/underlines/circle-purple.svg").default}
												className="pointer-events-none h-full w-full select-none"
												alt="circle-purple"
											/>
										</div>
										<div className="w-1/2 pl-2">
											<div className="flex h-[120px] flex-col items-center justify-center bg-white">{day}</div>
										</div>
										<div className="w-1/2 pl-2">
											<div className="flex h-[120px] flex-col items-center justify-center bg-white">{month}</div>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</EventCTAStyled>
			</div>
		</Section>
	);
}

export function OneColumnCTA({ text_card, section, layout, padded }) {
	const layoutClasses =
		layout === "one-col-padded" ? `py-20 sm:py-24 lg:py-28 px-8 rounded-xl overflow-hidden ${getSectionColourClasses(padded?.background_color)}` : "";

	return (
		<Section {...section} className="relative">
			<div className={`container ${layout === "one-col-padded" ? "!max-w-[1442px]" : ""}`}>
				<div className={layoutClasses}>
					<div className={layout === "one-col-padded" ? "mx-auto max-w-[1200px]" : ""}>
						<TextCard {...text_card.text_card} />
					</div>
				</div>
			</div>
		</Section>
	);
}

export function OverflowImageCTA({ text_card, section, overflow_image }) {
	const noMarTop = overflow_image.remove_margin_top;

	return (
		<Section {...section} className={`relative ${noMarTop ? "-mt-8" : ""}`}>
			<div className="container">
				<div
					className={`rounded-2xl px-8 sm:px-10 md:px-14 lg:px-16 ${getSectionColourClasses(overflow_image?.background_color)} ${
						overflow_image?.background_color === "purple" ? "text-link-white" : ""
					}`}
				>
					<div className="grid items-center gap-10 py-10 sm:py-12 md:grid-cols-12 md:py-0">
						<div className="md:col-span-5 md:py-16">
							<TextCard {...text_card.text_card} />
						</div>
						<div className="md:col-span-7">
							<div className=" md:-mb-24 md:-mt-20 md:-mr-5">
								<Image image={overflow_image.image} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
}
