import React from "react";
import LinkGroup from "~/components/elements/links/LinkGroup";
import TextCardExtraContent from "~/components/elements/TextCardExtraContent";
import useSpanHeading from "../../hooks/useSpanHeading";

export default function TextCard({
	subheading = "",
	heading = "",
	content = "",
	links = [],
	extraContent,
	options: {
		max_width = "",
		text_alignment = "",
		has_mobile_text_alignment = false,
		mobile_text_alignment = "",
		section_alignment = "",
		subheading_classes = "",
		heading_tag = "",
		heading_classes = "",
		heading_max_width = "",
		content_max_width = "",
		content_classes = "",
		custom_y_spacing = "",
		mobile_section_alignment = "",
	} = {},
}) {
	const HeadingTag = heading_tag || "h2";
	const ySpacings = {
		h1: "space-y-6",
		h2: "space-y-5",
		h3: "space-y-3",
	};

	const ySpacing = custom_y_spacing || ySpacings[HeadingTag] || "space-y-2";

	const flexItemAlignment = text_alignment === "center" ? "items-center" : "items-start";

	const sectionAlignmentClasses = section_alignment === "center" ? "md:items-center" : section_alignment === "right" ? "items-end" : "items-start";

	return (
		<div className={`flex w-full flex-col ${mobile_section_alignment} ${sectionAlignmentClasses}`}>
			<div
				className={`text-card flex flex-col text-card-heading-${HeadingTag} ${flexItemAlignment} ${ySpacing} text-${
					has_mobile_text_alignment ? mobile_text_alignment : text_alignment
				} md:text-${text_alignment} md:${max_width}`}
			>
				{subheading && (
					<h6
						className={`text-h6 w-full font-semibold tracking-[0.12em] text-dark-grey ${subheading_classes || ""}`}
						dangerouslySetInnerHTML={{ __html: subheading }}
					/>
				)}
				{heading && (
					<HeadingTag
						className={`w-full text-${HeadingTag} ${heading_classes || ""} md:${heading_max_width}`}
						dangerouslySetInnerHTML={{
							// eslint-disable-next-line
							__html: useSpanHeading(heading, "underline-stroke underline-stroke-orange"),
						}}
					/>
				)}
				{content && <div className={`w-full space-y-4 ${content_classes || ""} md:${content_max_width || ""}`} dangerouslySetInnerHTML={{ __html: content }} />}
				{links?.length > 0 && links[0]?.link?.link?.url?.length > 0 && <LinkGroup links={links} className={HeadingTag === "h1" ? "md:pt-4" : "pt-2"} />}

				{extraContent?.layout && <TextCardExtraContent {...extraContent} />}
			</div>
		</div>
	);
}
