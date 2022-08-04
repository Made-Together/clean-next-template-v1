/* eslint-disable import/prefer-default-export */
import React from "react";
import Contact from "../landingPages/Contact";
import GetStarted from "../landingPages/GetStarted";
import FourOhFour from "../landingPages/FourOhFour";
import Legal from "../landingPages/Legal";
import Resources from "../landingPages/Resources";

export function LandingPage(page) {
	const { layout, get_started, contact, legal, four_oh_four, resources } = page;

	if (layout === "staging_index") {
		return <div>staging</div>;
	}
	if (layout === "contact") {
		return <Contact {...contact} />;
	}
	if (layout === "get-started") {
		return <GetStarted {...get_started} />;
	}
	if (layout === "fourOhFour") {
		return <FourOhFour {...four_oh_four} />;
	}
	if (layout === "legal") {
		return <Legal {...legal} />;
	}
	if (layout === "resources") {
		return <Resources {...resources} />;
	}
	// eslint-disable-next-line no-console
	console.log("IMPLEMENT", page);
	return null;
}
