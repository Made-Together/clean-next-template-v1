import React from "react";
import { useTranslation } from "next-i18next";
import Image from "~/components/elements/Image";
import { Link } from "~/components/elements/links/Link";
import { getSectionColourClasses, Section } from "~/components/elements/Section";
import TestimonialSlider from "~/components/flexible/TestimonialSlider";
import Background from "../../assets/images/icons/testimonial-logo-background.svg";
// TODO: readd the testimonial slider and getSectionColourClasses

export default function Testimonial(props) {
	const { t } = useTranslation();
	const { section, layout, section_heading, reverse, padded, testimonial_slides } = props;
	const testimonial = props?.testimonial?.acf;
	const isLargeHeading = layout === "large-heading";
	const layoutClasses =
		layout === "padded" ? `md:px-3 lg:px-6 py-16 md:py-12 md:pb-16 rounded-xl overflow-hidden  ${getSectionColourClasses(padded?.background_color)}` : "";

	return (
		<Section {...section} className="overflow-hidden">
			{layout === "slider" ? (
				<TestimonialSlider slides={testimonial_slides} />
			) : (
				<div className={`${layout === "padded" ? "!max-w-[1378px] md:container" : ""}`}>
					<div className={layoutClasses}>
						{isLargeHeading && (
							<div className="container mb-16">
								<h2 className="text-h2 mx-auto max-w-[798px] text-center" dangerouslySetInnerHTML={{ __html: section_heading }} />
							</div>
						)}
						<div className="container lg:!max-w-6xl">
							<div className="">
								<div className={`${"-ml-12 flex flex-wrap items-center md:flex-nowrap lg:-ml-20"}`}>
									<div className={`order-1 w-full flex-auto pl-12 md:order-none md:w-7/12 lg:pl-20 ${reverse && "md:!order-1"}`}>
										<div className={`md:max-w-lg ${reverse && "ml-auto mr-0"}`}>
											{!isLargeHeading && (
												<h6 className="text-16px mb-[36px] font-bold uppercase md:mt-10">{section_heading || t("See what our customers say")}</h6>
											)}
											<div className="text-26px mb-4 font-medium leading-snug" dangerouslySetInnerHTML={{ __html: testimonial?.quote }} />
											<div className="text-18px mb-14 leading-snug">
												<span className="font-semibold">{testimonial?.cite_name}</span>
												{testimonial?.cite_role && <span>, {testimonial?.cite_role}</span>}
												<br />
												{testimonial?.cite_company && <span className="text-16px">{testimonial?.cite_company}</span>}
											</div>
											<Link type="button" link={{ url: "/customer-stories/", title: t("See more Customer Stories") }} className="inline-block" />
										</div>
									</div>

									<div className={` mb-12 w-full flex-auto flex-col justify-center pl-12 md:mt-0 md:flex md:w-5/12 lg:pl-20`}>
										<div className="mx-auto w-full max-w-[380px] md:mx-0">
											{(testimonial?.images?.type || testimonial?.images?.type) === "headshot" && testimonial?.images?.cite_image?.url && (
												<div>
													<Image className="w-full" image={testimonial?.images?.cite_image} width={380} height={456} />
												</div>
											)}

											{testimonial?.images?.type === "logo" && (
												<div className="relative">
													<Background className="w-full max-w-full" viewBox="0 0 411 490" />
													<div className="absolute inset-0 flex items-center justify-center">
														<div className="z-[1] flex h-full max-h-[31%] max-w-[64%] flex-auto items-center justify-center rounded-lg bg-white">
															<div className="h-[50%] w-[85%]">
																<Image className="h-full w-full" image={{ ...testimonial?.images?.logo, src: testimonial?.images?.logo.url }} />
															</div>
														</div>
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</Section>
	);
}
