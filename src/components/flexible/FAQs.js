import React from "react";
import Accordion from "~/components/elements/Accordion";
import { Section } from "~/components/elements/Section";

export default function FAQs({ section, faq }) {
	return (
		<Section {...section} className="">
			<div className="container">
				<FAQsInner heading={faq?.heading} items={faq?.items} />
			</div>
		</Section>
	);
}

export function normalizeAccordionData(item) {
	return {
		title: item.heading,
		description: item.content,
		link: item.link
			? item.link
			: item.file
			? {
					title: "Download",
					url: item?.file?.url,
			  }
			: null,
	};
}

export function FAQsInner({ heading, items }) {
	return (
		<div className="space-y-[28px] lg:flex lg:space-y-0 lg:space-x-[30px] xl:space-x-[60px]">
			<h2 className="text-h2 flex-1 text-center md:text-left">{heading}</h2>
			<div className="lg:w-[588px]">
				<Accordion accordionItems={items.map(normalizeAccordionData)} disableInternalSpacing />
			</div>
		</div>
	);
}
