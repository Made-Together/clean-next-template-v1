import React from "react";
import { Section } from "~/components/elements/Section";
// eslint-disable-next-line
import FlexibleLayout from "~/components/flexible";

export default function ABTest(props) {
	const createTestSection = (block, className) => ({
		...block,
		section: {
			...block?.section,
			sectionClass: `${block?.section?.sectionClass} ab-test-component ${className}`,
		},
	});

	const varA = props?.variant_a_flexible_content.map((block) => createTestSection(block, "ab-test-a"));
	const varB = props?.variant_b_flexible_content.map((block) => createTestSection(block, "ab-test-b"));

	return (
		<Section {...props.section} className="is-ab-test relative">
			<div>
				<FlexibleLayout {...varA[0]} />
			</div>
			<div>
				<FlexibleLayout {...varB[0]} />
			</div>
		</Section>
	);
}
