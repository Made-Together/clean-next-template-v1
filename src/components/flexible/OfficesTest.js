import { m } from "framer-motion";
import React, { useLayoutEffect, useState } from "react";
import SwiperCore, { EffectCreative } from "swiper";
import { OrangeBG } from "~/components/elements/Button";
import { ArrowRight } from "~/components/elements/Icon";
import Image from "~/components/elements/Image";
import { Section } from "~/components/elements/Section";
import TextCard from "~/components/elements/TextCard";

SwiperCore.use([EffectCreative]);

export default function OfficesTest({ section, offices, text_card }) {
	const [activeTab] = useState(0);
	const [swiper] = useState(null);

	const slideTo = (index) => swiper?.slideTo(index);

	useLayoutEffect(() => {
		slideTo(activeTab);
		// eslint-disable-next-line
	}, [activeTab]);

	return (
		<Section {...section}>
			<div className="container">
				<TextCard {...text_card} />
				<div className="mt-24 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{offices?.map((office) => (
						<div className="aspect-51/38 relative rounded-xl px-8 py-9">
							<Image className="absolute inset-0" image={office?.image} objectFit="cover" objectPosition="center" />
						</div>
					))}
				</div>
			</div>
		</Section>
	);
}

export function OfficeTab({ onClick, activeTab, i, label }) {
	return (
		<m.div key={`nav${i}`} onClick={onClick} className="group relative w-1/2 cursor-pointer" whileHover="hover" initial="rest">
			<div className="absolute bottom-0 left-0 right-0 top-[0.219rem] m-auto flex items-center">
				<m.div
					animate={activeTab === i ? "hover" : "rest"}
					variants={{
						rest: {
							opacity: activeTab === i ? 1 : 0,
							scale: activeTab === i ? 1 : 0,
							transition: {
								opacity: {
									duration: 0.1,
								},
							},
						},
						hover: {
							opacity: 1,
							scale: 1,
						},
					}}
				>
					<OrangeBG disableHover>
						<ArrowRight />
					</OrangeBG>
				</m.div>
			</div>
			<m.div
				animate={activeTab === i ? "hover" : "rest"}
				variants={{
					rest: {
						x: activeTab === i ? 30 : 0,
					},
					hover: {
						x: 30,
					},
				}}
				className={`text-28px font-medium transition-opacity duration-150 group-hover:opacity-100 ${activeTab === i ? "opacity-100" : "opacity-20"}`}
			>
				{label}
			</m.div>
		</m.div>
	);
}
