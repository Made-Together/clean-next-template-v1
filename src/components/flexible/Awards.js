import React, { useState } from "react";
import Image from "~/components/elements/Image";
import { getSectionColourClasses, Section } from "~/components/elements/Section";
import TextCard from "~/components/elements/TextCard";
import { Button } from "~/components/elements/Button";

export default function Awards({ text_card, awards, section, layout, load_more_label, padded }) {
	const [loadMore, setLoadMore] = useState(5);
	const layoutClasses = layout === "padded" ? `py-16 md:py-20 px-6 md:rounded-xl overflow-hidden ${getSectionColourClasses(padded?.background_color)}` : "";

	// @todo: how to add varations to block components on a page by page basis
	return (
		<Section {...section} className="relative">
			<div className="!max-w-[1466px] md:container">
				<div className={`relative z-10 ${layoutClasses}`}>
					{text_card && (
						<div className="mb-16">
							<TextCard {...text_card} />
						</div>
					)}

					<AwardsGrid awards={awards?.slice(0, loadMore)} />

					<div className="container">
						{awards?.length > loadMore && (
							<Button size="huge" className="mt-12  md:mt-20" onClick={() => setLoadMore(loadMore + 5)}>
								{load_more_label}
							</Button>
						)}
					</div>
				</div>
			</div>
		</Section>
	);
}

export function AwardsGrid({ awards }) {
	return (
		<div className="mt-[4rem] grid grid-cols-2 justify-items-center gap-x-3 gap-y-8 md:container md:mt-[7rem] md:grid-cols-3 md:gap-y-16 lg:grid-cols-5">
			{awards.map((award, index) => (
				<div key={`award-${index}`} className="flex max-w-[211px] flex-col items-center justify-between">
					<div>
						<div className="h-[100px]">{award?.icon && <Image image={award.icon} className="h-full w-auto" imgClassName="max-h-[100px]" />}</div>
						<div
							className="text-18px mx-auto mt-4 max-w-[180px] text-center font-medium leading-[1.135] md:mt-[33px] "
							dangerouslySetInnerHTML={{
								__html: award?.heading,
							}}
						/>
					</div>
					<div className="text-15px mt-[11px] text-center font-semibold leading-[1.25] opacity-30" dangerouslySetInnerHTML={{ __html: award?.content }} />
				</div>
			))}
		</div>
	);
}
