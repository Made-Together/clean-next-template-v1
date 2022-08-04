/* eslint-disable no-return-assign */
/* eslint-disable no-array-constructor */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-array-index-key */

import React from "react";
import { LandingPage } from "./LandingPage";
import { Section } from "./Section";

export function LayoutRenderer({ sections, page, page_props }) {
	if (!sections) return null;
	return sections?.map((section, i) => {
		if (section.acf_fc_layout === "landing_page") {
			return <LandingPage key={`${page}${i}`} {...section} />;
		}
		return <Section key={`${page}${i}`} {...section} firstSection={i === 0} i={i} />;
	});
}

export const getSectionBackroundColor = (sections, i, isBefore) => {
	if (!sections[i]) return null;
	if (sections[i].backgroundColour) return sections[i].backgroundColour;
	const section = sections[i];
	if (section.acf_fc_layout.includes("reusable_block") && section.reusable_block) {
		const layouts = section?.reusable_block.postTypePage.sections;
		const layout = layouts[isBefore ? layouts.length - 1 : 0];
		return layout.backgroundColour;
	}
	return null;
};
