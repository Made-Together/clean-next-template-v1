/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-danger */
/* eslint-disable no-use-before-define */
import React from "react";
import { motion } from "framer-motion";
import { useWindowSize } from "../../hooks/useWindowSize";
import ButtonGroup from "../elements/buttons/ButtonGroup";
import UnderstandIcon from "../elements/icons/UnderstandIcon";
import SeeIcon from "../elements/icons/SeeIcon";
import EnableIcon from "../elements/icons/EnableIcon";

export function TextContent({
	visual_controls,
	centered = true,
	innerOnly = false,
	subheading,
	heading,
	heading_size,
	heading_font_weight,
	isMasthead,
	content,
	link,
	links,
	visibleFields = ["heading", "subheading", "content", "link"],
	content_spacing,
	content_size,
	groupHover,
	wider_links,
}) {
	if (!visual_controls) visual_controls = { restrictWidth: {} };
	if (link && !link.type) link = { link };

	const { width } = useWindowSize();

	const classes = {
		outerContainer: [],
		container: ["text-center "],
		subheading: [``],
		heading: [],
		content: [`pt-4 text-mist`],
		links: [],
	};

	if (!innerOnly) {
		classes.outerContainer.push("container");
	}

	if (centered) {
		classes.container.push("mx-auto");
		classes.links.push("flex justify-center");

		if (!visual_controls.restrict_width?.main) {
			classes.container.push("max-w-[900px]");
		}
		if (visual_controls.restrict_width?.content) {
			classes.content.push("mx-auto");
		}
		if (visual_controls.restrict_width?.heading) {
			classes.heading.push("mx-auto text-center");
		}
	} else {
		classes.container.push("md:text-left");
		if (visual_controls.restrict_width?.main) {
			classes.container.push("mx-auto md:mx-0");
		}
		if (visual_controls.restrict_width?.content) {
			classes.content.push("mx-auto md:mx-0");
		}
		if (visual_controls.restrict_width?.heading) {
			classes.heading.push("mx-auto md:mx-0");
		}
	}

	if (heading_size === "95") {
		classes.heading.push("t-64");
	} else if (heading_size === "64") {
		classes.heading.push("t-64");
	} else if (heading_size === "32") {
		classes.heading.push("t-32");
	} else if (heading_size === "20") {
		classes.heading.push("t-20-heading");
	} else if (heading_size === "24") {
		classes.heading.push("t-24");
	} else {
		classes.heading.push("t-48");
	}

	if (heading_font_weight === "semibold") {
		classes.heading.push("font-semibold");
	} else if (heading_font_weight === "bold") {
		classes.heading.push("font-bold");
	} else if (heading_font_weight === "medium") {
		classes.heading.push("font-medium");
	} else if (heading_font_weight === "regular") {
		classes.heading.push("");
	} else {
		classes.heading.push("");
	}

	if (visual_controls?.subheading_size === "large") {
		classes.subheading.push("font-roboto");
	} else {
		classes.subheading.push("t-subheading ");
	}

	if (visual_controls?.subheading_color) {
		if (visual_controls?.subheading_color === "pink") {
			classes.subheading.push("text-pink");
		} else if (visual_controls?.subheading_color === "lightBlue") {
			classes.subheading.push("text-lightBlue");
		} else if (visual_controls?.subheading_color === "purple") {
			classes.subheading.push("text-purple");
		} else if (visual_controls?.subheading_color === "green") {
			classes.subheading.push("text-green");
		} else if (visual_controls?.subheading_color === "red") {
			classes.subheading.push("text-red");
		} else if (visual_controls?.subheading_color === "mist") {
			classes.subheading.push("text-mist");
		} else if (visual_controls?.subheading_color === "blue") {
			classes.subheading.push("text-blue");
		} else if (visual_controls?.subheading_color === "mastheadMist") {
			classes.subheading.push("text-mist !opacity-60");
		} else {
			classes.subheading.push(" ");
		}
	}

	if (visual_controls?.subheading_spacing) {
		if (visual_controls?.subheading_spacing === "large") {
			classes.subheading.push("mb-12");
		} else {
			classes.subheading.push("mb-4");
		}
	}

	if (content_spacing === "large") {
		classes.content.push("md:mt-32");
	} else if (content_spacing === "small") {
		classes.content.push("!pt-2");
	} else if (content_spacing === "medium") {
		classes.content.push("md:mt-4 lg:mt-10");
	} else if (content_spacing === "mediumSmall") {
		classes.content.push("md:mt-4 lg:mt-[1.25rem]");
	}

	if (content_size === "18") {
		classes.content.push("t-18");
	} else if (content_size === "16") {
		classes.content.push("leading-[1.4] tracking-[-0.011em]");
	} else if (content_size === "22") {
		classes.content.push("t-22");
	} else if (content_size === "20") {
		classes.content.push("t-20");
	} else {
		classes.content.push("t-18");
	}

	let HeadingTag = "h3";
	if (isMasthead && !subheading) {
		HeadingTag = "h1";
	} else if (heading_size === "default") {
		HeadingTag = "h2";
	}

	let SubHeadingTag = "h6";
	if (isMasthead && subheading) {
		SubHeadingTag = "h1";
	}

	return (
		<TextContentWrapper innerOnly={innerOnly} className={`relative z-10 ${classes.outerContainer.join(" ")}`}>
			<motion.div className={classes.container.join(" ")} {...maxWidthProps(visual_controls.restrict_width?.main, width)}>
				{subheading && visibleFields.includes("subheading") && (
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.6, ease: "linear" }}
						viewport={{ once: true }}
						className={`${centered ? "mx-auto justify-center" : "justify-center md:justify-start"} ${classes.subheading.join(" ")} flex items-center`}
					>
						{visual_controls?.subheading_icon && visual_controls?.subheading_icon !== "none" && (
							<div className="mr-2 inline-block flex-none">
								<SubheadingIconSelector icon={visual_controls?.subheading_icon} />
							</div>
						)}
						<SubHeadingTag
							className={` inline-block text-center ${centered ? "mx-auto md:text-center" : "md:text-left"} `}
							dangerouslySetInnerHTML={{
								__html: subheading,
							}}
						/>
					</motion.div>
				)}
				{heading && visibleFields.includes("heading") && (
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, ease: "linear" }}
						className={`${centered ? "mx-auto" : ""} ${classes.heading.join(" ")}`}
						// eslint-disable-next-line no-use-before-define
						{...maxWidthProps(visual_controls.restrict_width?.heading, width)}
					>
						<HeadingTag
							className="text-content-heading"
							dangerouslySetInnerHTML={{
								__html: heading,
							}}
						/>
					</motion.div>
				)}
				{content && visibleFields.includes("content") && (
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1, duration: 0.6, ease: "linear" }}
						{...maxWidthProps(visual_controls.restrict_width?.content, width)}
						className={classes.content.join(" ")}
						dangerouslySetInnerHTML={{ __html: content }}
					/>
				)}

				{links && (
					<div className={`mt-8 w-full ${centered ? "mx-auto" : ""}  ${classes.links.join(" ")}`}>
						<ButtonGroup links={links} centered={centered} groupHover={groupHover} wider_links={wider_links} />
					</div>
				)}
			</motion.div>
		</TextContentWrapper>
	);
}

export const maxWidthProps = (setting, width) => {
	if (!setting) return {};

	return {
		style: {
			maxWidth: width > 768 ? `${setting}px` : null,
		},
	};
};

export function TextContentWrapper({ innerOnly, className, children, style = null }) {
	return innerOnly ? (
		children
	) : (
		<div className={className} style={style}>
			{children}
		</div>
	);
}

function SubheadingIconSelector({ icon }) {
	switch (icon) {
		case "see":
			return <SeeIcon />;
		case "understand":
			return <UnderstandIcon />;
		case "enable":
			return <EnableIcon />;

		default:
			// eslint-disable-next-line no-console
			console.log(`no icon found`);
			return null;
	}
}
