import React from "react";

// Layout specific classes
function getLayoutSpecificClasses(acf_fc_layout) {
	let layoutSpecificClasses = "";

	if (acf_fc_layout === "history_slider") {
		layoutSpecificClasses = "!pb-[10rem] md:!pb-[15rem]";
	}

	return layoutSpecificClasses;
}

// Helper function to decide padding amounts on sections

function getSectionPaddingClasses(backgroundColor, acf_fc_layout, previous_section, next_section) {
	const previousBackground = previous_section?.section?.background_color || "white";
	const nextBackground = next_section?.section?.background_color || "white";

	const classes = ["section"];

	if (!previous_section || previous_section?.section?.sectionClass?.includes("hidden")) {
		classes.push("section-first");
	} else if (previousBackground !== backgroundColor) {
		classes.push("section-top");
	}

	if (previous_section && nextBackground !== backgroundColor) {
		classes.push("section-bot");
	}

	return classes.join(" ");
}

// Helper function to decide colour classes by background colour
export function getSectionColourClasses(backgroundColor) {
	if (!backgroundColor) return "";

	let colourClasses = "";
	switch (backgroundColor) {
		case "dark-green":
			colourClasses = "bg-dark-green text-white";
			break;
		case "purple":
			colourClasses = "bg-purple text-white";
			break;
		case "beige":
			colourClasses = "bg-beige";
			break;
		case "light-beige":
			colourClasses = "bg-light-beige";
			break;
		case "light-purple":
			colourClasses = "bg-light-purple";
			break;
		case "lighter-purple":
			colourClasses = "bg-lighter-purple";
			break;
		case "light-blue":
			colourClasses = "bg-light-blue";
			break;
		case "white":
			colourClasses = "bg-white";
			break;
		case "grey":
			colourClasses = "bg-grey";
			break;
		case "light-pink":
			colourClasses = "bg-light-pink";
			break;
		default:
			colourClasses = `bg-${backgroundColor}`;
			break;
	}
	return colourClasses;
}

export function Section(props) {
	const { sectionRef, children, previous_section, next_section, acf_fc_layout = "default", id, className = "", sectionClass = "" } = props;

	const backgroundColor = props.background_color ? props.background_color : "white";

	const paddingClasses = getSectionPaddingClasses(backgroundColor, acf_fc_layout, previous_section, next_section);

	const colourClasses = getSectionColourClasses(backgroundColor);
	const layoutSpecificClasses = getLayoutSpecificClasses(acf_fc_layout);

	const allClasses = [paddingClasses, sectionClass, className, layoutSpecificClasses, colourClasses];

	return (
		<section ref={sectionRef} id={id} data-layout={acf_fc_layout} className={allClasses.join(" ")}>
			{children}
		</section>
	);
}
