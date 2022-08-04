import React, { useState } from "react";
import { CrossCircle, TickCircle } from "~/components/elements/Icon";
import { Section } from "~/components/elements/Section";
import Switch from "~/components/elements/Switch";
import TextCard from "~/components/elements/TextCard";

export default function GridSwitcher({ section, text_card, grid_collection }) {
	const [isActive, setIsActive] = useState(false);

	const activeCollection = isActive ? 1 : 0;

	return (
		<Section {...section} className="">
			<div className="container">
				<div className="flex flex-col content-center items-center justify-center text-center md:flex-row md:items-center md:justify-between md:text-left">
					<TextCard
						{...text_card}
						options={{
							headingClasses: "text-center md:text-left lg:text-center",
							mobileSectionAlignment: "items-center md:items-start",
						}}
					/>

					<div className="mt-6 flex items-center  space-x-[30px] self-center sm:justify-end md:mt-0 md:justify-start ">
						<div className="text-[14px] font-semibold"> {grid_collection[0]?.switch_label}</div>
						<Switch onClick={() => setIsActive(!isActive)} active={isActive} />
						<div className="text-14px font-semibold"> {grid_collection[1]?.switch_label}</div>
					</div>
				</div>

				<div className="mt-[50px] ">
					<div className="grid grid-cols-1 gap-y-[24px] gap-x-[26px] md:grid-cols-2">
						{grid_collection[activeCollection]?.item?.map((gridItem, i) => (
							<GridItem key={`gridItem${i}`} {...gridItem} />
						))}
					</div>
				</div>
			</div>
		</Section>
	);
}

export function GridItem({ heading, content, features }) {
	return (
		<div className="rounded-[15px] bg-grey py-[2rem] px-[25px] text-center md:px-[50px] md:pt-[53px] md:pb-[58px] md:text-left">
			<div className="text-32px font-semibold">{heading}</div>
			<div className="text-16px mx-auto mt-[13px] opacity-60 md:mr-8">{content}</div>
			<div className="mt-[36px] mb-[32px] w-full border-b border-dashed border-[#041B29] border-opacity-[0.15]" />
			<div className="ml-[-8px] flex w-full flex-wrap gap-y-4 ">
				{features?.map((feature, i) => (
					<div key={`feature${i}`} className="flex w-full items-center space-x-[13px] pl-[8px] lg:w-1/2">
						<div className="mt-[1px] flex-none">{feature?.truefalse ? <TickCircle /> : <CrossCircle />}</div>
						<div className="text-18px !leading-snug tracking-[-0.01em]" dangerouslySetInnerHTML={{ __html: feature?.feature }} />
					</div>
				))}
			</div>
		</div>
	);
}
