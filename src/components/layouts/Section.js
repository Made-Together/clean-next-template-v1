/* eslint-disable import/prefer-default-export */
import React from "react";

import { ContentRenderer } from "./ContentRenderer";

export function Section({
	inner_spacing,
	background_color,
	no_padding_top,
	no_padding_bottom,
	size,
	classname,
	components = [],
	firstSection,
	padding_size,
	overflow_visible,
	add_noise,
	add_fade,
	add_glow,
	glow,
	rounded_corner,
}) {
	const paddingSize = [];

	if (padding_size === "large") {
		paddingSize.push("md:py-42 lg:py-52");
	} else if (padding_size === "semilarge") {
		paddingSize.push("md:py-24 lg:py-40");
	} else if (padding_size === "medium") {
		paddingSize.push("md:py-26 lg:py-32");
	} else if (padding_size === "masthead") {
		paddingSize.push("pt-[9rem] md:py-26 lg:py-32");
	} else {
		paddingSize.push("md:py-24");
	}
	const classes = [
		` ${overflow_visible ? "" : "overflow-hidden"}  relative  py-12 ${add_fade ? "section-dark-fade" : ""} ${
			firstSection ? " pt-[7rem] md:pb-40 md:pt-[9rem] " : paddingSize
		} `,
	];

	const spacingClasses = [];

	if (firstSection) {
		classes.push("!mt-0");
	}

	if (background_color === "purple") {
		classes.push("bg-purple");
	} else if (background_color === "darkPurple") {
		classes.push("bg-[#3D2578]");
	} else {
		classes.push("");
	}

	if (inner_spacing === "small") {
		spacingClasses.push("space-y-8 xl:space-y-10");
	} else if (inner_spacing === "mediumSmall") {
		spacingClasses.push("space-y-8 xl:space-y-[60px]");
	} else if (inner_spacing === "medium") {
		spacingClasses.push("space-y-8 xl:space-y-20");
	} else if (inner_spacing === "large") {
		spacingClasses.push("space-y-8 md:space-y-20 xl:space-y-24");
	} else if (inner_spacing === "xlarge") {
		spacingClasses.push("space-y-8 md:space-y-20 xl:space-y-40");
	} else if (inner_spacing === "xxlarge") {
		spacingClasses.push("space-y-24 md:space-y-24 xl:space-y-40");
	} else {
		spacingClasses.push("space-y-8 xl:space-y-10");
	}

	if (size === "0" || size === null) {
		classes.push("section-0");
	}

	if (no_padding_top) {
		classes.push("!pt-0");
	}

	if (no_padding_bottom) {
		classes.push("!pb-0");
	}

	if (overflow_visible) {
		classes.push("!overflow-visible");
	}

	const layouts = components?.map((comp) => comp.acf_fc_layout);

	if (layouts?.includes("sticky_scroller")) {
		classes.push("md:overflow-visible");
	}
	if (layouts?.includes("case_study")) {
		classes.push("!overflow-visible");
	}
	if (layouts?.includes("platform_section")) {
		classes.push("section-dark-fade-small");
	}
	if (layouts?.includes("scrolling_experience")) {
		classes.push("!py-0");
	}

	// Rounded corners
	if (rounded_corner === "medium") {
		classes.push("rounded-md");
	} else if (rounded_corner === "large") {
		classes.push("rounded-lg");
	} else if (rounded_corner === "xlarge") {
		classes.push("rounded-[16px]");
	}

	if (classname) {
		classes.push(classname);
	}
	return (
		<section data-layouts={layouts} data-background={background_color} className={classes.join(" ")}>
			<div className={spacingClasses}>
				<ContentRenderer content={components} backgroundColor={background_color} />
			</div>
		</section>
	);
}
