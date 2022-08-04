import React from "react";
import { Section } from "~/components/elements/Section";
import Stats from "~/components/elements/Stats";
import TextCard from "~/components/elements/TextCard";

export default function StatsSection({ section, stats, text_card }) {
	return (
		<Section {...section}>
			<div className="">
				<div>
					<div className="container">
						<TextCard {...text_card} />
					</div>
					<Stats stats={stats} showBackground={false} paddingTop paddingBottom={false} />
				</div>
			</div>
		</Section>
	);
}
