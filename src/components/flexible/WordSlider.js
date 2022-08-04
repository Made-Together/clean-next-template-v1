import React from "react";
import Marquee from "~/components/elements/Marquee";
import { Section } from "~/components/elements/Section";
import TextCard from "~/components/elements/TextCard";

export default function WordSlider({ section, text_card, top_row, bottom_row }) {
	return (
		<Section {...section} className="">
			<div className="container">
				<TextCard {...text_card} />
			</div>
			<div className="mt-5 md:mt-[80px]">
				<Marquee slides={top_row} />
				<Marquee slides={bottom_row} reverse dark />
			</div>
		</Section>
	);
}
