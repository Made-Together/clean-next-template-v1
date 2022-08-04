import React, { useRef } from "react";
import { Link } from "~/components/elements/links/Link";
import Media from "~/components/elements/Media";
import { getSectionColourClasses, Section } from "~/components/elements/Section";
import TextCard from "~/components/elements/TextCard";
import TwoColumnsExtraContent from "~/components/elements/TwoColumnsExtraContent";
import { Parallax } from "~/components/global/Parallax";

export default function TwoColumns(props) {
	const { section, text_card, media, rhs_extra_content, options, layout, padded, text_card_extra_content, two_columns_extra_content, parallax } = props;
	const parallaxRef = useRef(null);

	// eslint-disable-next-line
	const leftColumnWidth = +options?.leftColumnWidth || 6;
	const rightColumnWidth = 12 - leftColumnWidth;

	const textCardContainerClasses = `md:col-span-${leftColumnWidth} ${options?.reverse ? "md:order-1" : ""}`;
	const mediaContainerClasses = `md:col-span-${rightColumnWidth}`;
	const isPadded = layout === "padded" || layout === "padded-split-heading";
	const layoutClasses = isPadded
		? `py-8 sm:py-12 px-6 sm:px-8 md:p-12 lg:p-14 xl:p-20 rounded-xl overflow-hidden ${getSectionColourClasses(padded?.background_color)}`
		: "";

	const overlay = rhs_extra_content?.rhs_extra_content_type === "image-overlay" ? rhs_extra_content?.image_overlay?.image_overlay?.images : [];

	return (
		<Section {...section} className="overflow-x-hidden">
			<div className={`container ${isPadded ? "!max-w-[1442px]" : ""}`}>
				<div className={`${layoutClasses}`}>
					{layout !== "padded-split-heading" ? (
						<div
							className={`grid gap-12 md:grid-cols-12 lg:gap-14 ${isPadded && "container px-0"} ${
								!rhs_extra_content?.rhs_extra_content_type ? "items-center" : `items-${rhs_extra_content.align}`
							}`}
						>
							<div className={`${textCardContainerClasses}`}>
								<TextCard {...text_card} extraContent={text_card_extra_content} />
							</div>

							<div className={`${mediaContainerClasses} ${parallax ? "relative overflow-hidden" : ""} `}>
								{parallax ? (
									<Parallax parallaxRef={parallaxRef} properties={{ x: [0, 0], y: [125, -125] }}>
										<Media {...media} overlay={overlay} containerClassName="mx-auto" />
									</Parallax>
								) : (
									<Media {...media} overlay={overlay} />
								)}

								{rhs_extra_content?.rhs_extra_content_type && <RHSExtraContent {...rhs_extra_content} />}
								{parallax && (
									<>
										<div className="switcher-fade absolute top-0 right-0 left-0 h-[144px] w-full" />
										<div className="switcher-fade absolute bottom-0 right-0 left-0 h-[144px] w-full rotate-180" />
									</>
								)}
							</div>
						</div>
					) : (
						<SplitHeading {...props} mediaContainerClasses={mediaContainerClasses} textCardContainerClasses={textCardContainerClasses} />
					)}
				</div>
			</div>
			{/* TODO: add this back in */}
			<TwoColumnsExtraContent {...two_columns_extra_content} />
		</Section>
	);
}

function RHSExtraContent({ rhs_extra_content_type, card_cta }) {
	return (
		<div>
			{rhs_extra_content_type === "card-cta" && (
				<div className="mx-auto space-y-12 md:max-w-lg">
					{card_cta?.map((cta) => (
						<div className="space-y-3">
							<div className="font-semibold" dangerouslySetInnerHTML={{ __html: cta.heading }} />
							<div className="text-18px" dangerouslySetInnerHTML={{ __html: cta.content }} />
							{cta.link && <Link link={cta.link} type="text" />}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

/**
 * @func SplitHeading
 * @description Split heading onto it's own line with text card content and media below
 */
function SplitHeading({ text_card, text_card_extra_content, media, rhs_extra_content, options, textCardContainerClasses, mediaContainerClasses }) {
	return (
		<div>
			<div className="grid gap-x-12 gap-y-10 md:grid-cols-12">
				<div className="md:col-span-12">
					<TextCard subheading={text_card.subheading} heading={text_card.heading} options={text_card.options} />
				</div>
				<div className={`${textCardContainerClasses} ${options?.reverse ? "md:order-1" : ""}`}>
					<TextCard content={text_card.content} options={text_card.options} extraContent={text_card_extra_content} />
				</div>

				<div className={`${mediaContainerClasses}`}>
					<Media {...media} />

					{rhs_extra_content?.rhs_extra_content_type && <RHSExtraContent {...rhs_extra_content} />}
				</div>
			</div>
		</div>
	);
}
