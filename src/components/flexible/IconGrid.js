/* eslint-disable */
import React from "react";
import { motion } from "framer-motion";
import { TextLink } from "~/components/elements/Button";
import Image from "~/components/elements/Image";
import { Link } from "~/components/elements/links/Link";
import { getSectionColourClasses, Section } from "~/components/elements/Section";
import TextCard from "~/components/elements/TextCard";
import QuoteIcon from "~/assets/images/icons/careers-values-quote.svg";
import useSpanHeading from "../../hooks/useSpanHeading";

export default function IconGrid({
	section,
	layout,
	text_card,
	text_card_layout,
	image,
	image_max_width,
	grid_items,
	careers_values_grid_items,
	bottom_button,
	is_padded_section,
	padded,
	has_overflow_background,
	grid_item_options,
	align_logo,
	logo_size,
}) {
	const bgColor = is_padded_section === true ? padded?.background_color : section?.background_color;

	const layoutClasses =
		is_padded_section === true ? `py-16 md:py-20 lg:py-24 px-8 lg:px-12 rounded-xl overflow-hidden ${getSectionColourClasses(padded?.background_color)}` : "";

	const gridItemBg = bgColor === "grey" ? "bg-white" : "bg-grey";

	return (
		<Section {...section} className={`relative ${has_overflow_background ? "negative-section-margin" : ""}`}>
			<div className={`container relative z-10 ${is_padded_section ? "!max-w-[100%]" : ""}`}>
				<div className={layoutClasses}>
					<div className={`${is_padded_section ? "mx-auto max-w-[1200px]" : ""}`}>
						{text_card && (
							<div
								className={`${text_card.heading || text_card_layout === "two-col" ? "mb-16" : "mb-10"} ${
									text_card_layout === "two-col" && "grid items-center gap-12 md:grid-cols-2"
								}`}
							>
								<TextCard {...text_card} />
								{image && (
									<div className="mx-auto w-full" style={{ maxWidth: `${image_max_width}px` }}>
										<Image image={image} />
									</div>
								)}
							</div>
						)}

						{layout === "default" && (
							<DefaultGrid gridItems={grid_items} gridItemOptions={grid_item_options} gridItemBg={gridItemBg} sectionBg={bgColor} largeIcon />
						)}
						{layout === "customer-stories" && (
							<CustomerStoriesGrid gridItems={grid_items} gridItemBg={gridItemBg} alignLogo={align_logo} logoSize={logo_size} />
						)}
						{layout === "industries" && <IndustriesGrid gridItems={grid_items} />}
						{layout === "customer-logos" && <CustomerLogosGrid gridItems={grid_items} />}
						{layout === "integrations" && <IntegrationsGrid gridItems={grid_items} />}
						{layout === "pricing" && <PricingGrid gridItems={grid_items} />}
						{layout === "default-logo-grid" && <DefaultLogoGrid gridItems={grid_items} />}
						{layout === "careers-values" && <CareersValuesGrid gridItems={careers_values_grid_items} />}

						{bottom_button?.url?.length > 0 && (
							<div className="mt-12 text-center">
								<Link link={bottom_button} type="text" />
							</div>
						)}
					</div>
				</div>
			</div>

			{has_overflow_background && <div className={`absolute inset-x-0 bottom-0 z-0  h-[250px] bg-${section?.nextSection?.backgroundColor || "white"}`} />}
		</Section>
	);
}

export function DefaultGrid({ gridItems, gridItemOptions, gridItemBg, sectionBg, largeIcon }) {
	if (gridItemOptions?.backgroundColor) {
		gridItemBg = gridItemOptions?.backgroundColor;
	}

	const matchingBgColors = sectionBg === gridItemBg && gridItemOptions?.border !== true;
	const contentClasses = `max-w-[480px] ${
		gridItemOptions?.contentFontSize === "lg" ? "text-18px" : gridItemOptions?.contentFontSize === "md" ? "text-16px" : "text-14px"
	} `;

	const padding = gridItemOptions?.padding === "sm" ? "p-5" : gridItemOptions?.padding === "md" ? "p-8" : "p-6 md:p-10";

	const columns = gridItemOptions?.columns == 3 ? "md:grid-cols-3 sm:grid-cols-2" : "sm:grid-cols-2";

	// Added new font size option and assigned font-weight to each size according to design
	const headingClasses =
		gridItemOptions?.headingFontSize === "xl"
			? "text-30px md:mb-3 !font-medium leading-none"
			: gridItemOptions?.headingFontSize === "lg"
			? "text-24px md:mb-3 !font-medium leading-tight"
			: gridItemOptions?.headingFontSize === "md"
			? "text-20px !font-bold"
			: "text-18px !font-bold";

	return (
		<div className={`z-10 grid ${columns} ${matchingBgColors ? "-mt-2 gap-x-20 gap-y-6 md:gap-y-10" : "-mt-4 gap-6"}`}>
			{gridItems.map((gridItem, index) => (
				<motion.div
					key={`icon-grid-item-${index}`}
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ delay: index / 10 }}
					viewport={{ once: true }}
					className="relative flex flex-col"
				>
					<Link
						link={gridItem?.link}
						className={`relative flex flex-auto flex-col rounded-lg bg-${gridItemBg} ${gridItemOptions?.border && "border border-grey"} ${
							gridItemOptions?.shadow && "shadow-lg"
						} ${!matchingBgColors && padding}`}
					>
						<GridItemContent
							{...gridItem}
							largeIcon={largeIcon}
							headingClasses={`${headingClasses}`}
							iconPosition={gridItemOptions.iconPosition}
							iconPadding={gridItemOptions?.iconPadding}
							iconSize={gridItemOptions.iconSize}
							contentClasses={contentClasses}
						/>
					</Link>
				</motion.div>
			))}
		</div>
	);
}

export function CustomerStoriesGrid({ gridItems, gridItemBg, gridCols = 3, alignLogo, logoSize }) {
	return (
		<div className={`grid md:grid-cols-${gridCols} z-10 gap-6 sm:grid-cols-2`}>
			{gridItems?.map((props, index) => (
				<CustomerStoriesGridItem key={`customer-grid-item-${index}`} {...props} gridItemBg={gridItemBg} alignLogo={alignLogo} logoSize={logoSize} />
			))}
		</div>
	);
}

export function CustomerStoriesGridItem({ gridItemBg = "bg-white", image, icon, subheading, heading, content, link, alignLogo, logoSize, children }) {
	return (
		<Link link={link} className={`group flex flex-col ${gridItemBg} rounded-[10px] p-10 shadow-lg`}>
			{children || (
				<>
					<div className="flex-1">
						{(image || icon) && (
							<div
								className={`mb-6 h-full max-h-[45px] min-h-[35px] ${alignLogo === "right" ? "ml-auto" : alignLogo === "center" ? "mx-auto" : ""} ${
									logoSize === "large" ? "max-w-[140px]" : "max-w-[100px]"
								} `}
							>
								<Image image={image || icon} className="h-full max-h-full w-auto object-contain" objectFit="contain" objectPosition="left center" />
							</div>
						)}
						{subheading && <div className="text-15px mb-[13px] font-bold uppercase leading-[1.33] tracking-[0.01em]">{subheading}</div>}
						{heading && (
							<div
								className={`${gridItemBg !== "bg-white" ? "text-22px font-medium leading-tight" : "text-20px"} `}
								dangerouslySetInnerHTML={{
									__html: useSpanHeading(heading, "underline-stroke underline-stroke-orange "),
								}}
							/>
						)}
						{content && <div dangerouslySetInnerHTML={{ __html: content }} />}
					</div>

					{link?.url && link?.title && (
						<div className="mt-10">
							<TextLink>{link.title}</TextLink>
						</div>
					)}
				</>
			)}
		</Link>
	);
}

export function IndustriesGrid({ gridItems }) {
	return (
		<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
			{gridItems.map((gridItem, index) => (
				<Link
					link={gridItem?.link}
					key={`industries-grid-item-${index}`}
					className="hover:invert-image trans flex flex-col rounded-[10px] bg-grey  p-4 hover:bg-purple hover:text-white hover:drop-shadow-[0_6px_9px_rgba(0,0,0,0.19)]"
				>
					<div
						className="text-20px md:text-24px font-semibold leading-none"
						dangerouslySetInnerHTML={{
							__html: gridItem.heading,
						}}
					/>
					<div className="h-[2.5rem]" />
					<div className="flex items-end justify-between">
						{gridItem?.link?.url && (
							<div>
								<TextLink link={gridItem.link} iconSize="h-[26px] w-[26px]" />
							</div>
						)}
						<div className="h-[35px] w-[35px]">
							<Image image={gridItem.icon} className="h-full w-auto" />
						</div>
					</div>
				</Link>
			))}
		</div>
	);
}

export function DefaultLogoGrid({ gridItems }) {
	return (
		<div className={`grid lg:grid-cols-${gridItems.length >= 6 ? 6 : gridItems.length} grid-cols-2 gap-8  md:grid-cols-3 md:gap-14`}>
			{gridItems.map((gridItem, index) => (
				<Link link={gridItem?.link} key={`logo-grid-item-${index}`} className="trans flex flex-col">
					{gridItem.icon && <Image image={gridItem.icon} className="h-full w-full object-contain" objectFit="contain" />}
				</Link>
			))}
		</div>
	);
}

export function CustomerLogosGrid({ gridItems }) {
	return (
		<div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
			{gridItems.map((gridItem, index) => (
				<Link link={gridItem?.link} key={`customer-logo-item-${index}`} className="trans flex flex-col items-center justify-center rounded-[10px] bg-grey p-2 px-4">
					{gridItem.icon && <Image image={gridItem.icon} className="h-full w-full object-contain " objectFit="contain" imgClassName="h-full w-full" />}
				</Link>
			))}
		</div>
	);
}

export function PricingGrid({ gridItems }) {
	return (
		<div className="mx-auto grid gap-3 lg:grid-cols-3">
			{gridItems.map((gridItem, index) => (
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ delay: index / 10 }}
					viewport={{ once: true }}
					className="flex flex-col rounded-[15px] bg-white p-6 md:p-10"
					key={`pricing-grid-${index}`}
				>
					<GridItemContent {...gridItem} headingClasses="text-24px md:mt-12 !font-medium" contentClasses="text-16px opacity-60" />
				</motion.div>
			))}
		</div>
	);
}

export function IntegrationsGrid({ gridItems }) {
	return (
		<div className="z-10 -mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
			{gridItems.map((gridItem, index) => (
				<Link link={gridItem?.link} key={`integrations-grid-item-${index}`} className="trans group flex flex-col rounded-xl bg-grey p-6 shadow-lg duration-300 hover:shadow-none md:p-10">
					<GridItemContent {...gridItem} headingClasses="!font-bold md:mt-12" />
				</Link>
			))}
		</div>
	);
}

export function CareersValuesGrid({ gridItems }) {
	return (
		<div className="z-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
			{gridItems.map((gridItem, index) => (
				<div key={`career-values-grid-item-${index}`} className="relative flex flex-col rounded-xl bg-grey p-6 md:p-8">
					{gridItem.type === "quote" && <QuoteIcon className="absolute bottom-0 right-[7%] h-auto max-h-[30%] max-w-[35%]" />}
					<div className="flex flex-auto flex-col">
						{gridItem.icon && (
							<div className="flex-auto">
								<div className={`${"mb-6 h-[58px] max-w-[143px] lg:mb-8"}`}>
									<Image
										image={gridItem.icon}
										className="h-full"
										imgClassName="h-full w-auto object-contain object-left"
										objectFit="contain"
										objectPosition="left"
									/>
								</div>
							</div>
						)}
						<div className={` flex flex-col ${gridItem.type === "quote" ? " flex-auto justify-between" : ""}`}>
							<h4 className="text-24px mb-3 md:text-[20px] lg:mb-4 lg:text-[24px]">{gridItem.heading}</h4>
							<div className={`text-18px ${gridItem.type === "quote" ? "max-w-[60%]" : ""}`}>{gridItem.content}</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export function GridItemContent({
	icon,
	iconPosition = "block",
	iconPadding,
	iconSize,
	heading,
	link,
	content,
	largeIcon,
	contentClasses = "text-14px",
	headingClasses = "",
}) {
	return (
		<div className={`relative z-10 flex-1 ${iconPosition === "inline" ? "flex space-x-6 md:my-4" : ""}`}>
			{icon && (
				// Added new iconSize option for the default Icon Grid
				<div
					className={`${
						iconPosition === "block"
							? `h-[50px] max-w-[143px] ${iconPadding === "large" ? " mb-6 md:mb-[77px]" : "mb-6"}`
							: largeIcon
							? "h-[71px] w-[71px]"
							: "h-[58px] w-[58px]"
					}
          ${
						iconSize === "large"
							? " h-[70px] max-w-[70px]"
							: iconSize === "medium"
							? " h-[64px] max-w-[64px]"
							: iconSize === "small"
							? " !h-[44px] max-w-[44px]"
							: ""
					}`}
				>
					<Image image={icon} className="h-full" imgClassName="h-full w-auto object-contain object-left" objectFit="contain" objectPosition="left" />
				</div>
			)}

			<div>
				{heading && (
					<div
						className={`mb-2 font-semibold ${headingClasses}`}
						dangerouslySetInnerHTML={{
							__html: useSpanHeading(heading, "underline-stroke underline-stroke-orange"),
						}}
					/>
				)}
				{content && (
					<div
						className={` ${contentClasses} xl:pr-2`}
						dangerouslySetInnerHTML={{
							__html: useSpanHeading(content, "underline-stroke underline-stroke-orange"),
						}}
					/>
				)}

				{link?.url && (
					<div className={`${iconPosition === "block" ? "mt-8" : "mt-4"}`}>
						<TextLink link={link} />
					</div>
				)}
			</div>
		</div>
	);
}
