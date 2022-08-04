import { m } from "framer-motion";
import React, { useEffect, useState } from "react";
import SwiperCore, { EffectCreative } from "swiper";
import { OrangeBG } from "~/components/elements/Button";
import { ArrowRight } from "~/components/elements/Icon";
import Image from "~/components/elements/Image";
import { Section } from "~/components/elements/Section";
import TextCard from "~/components/elements/TextCard";
import { Link } from "~/components/elements/links/Link";

SwiperCore.use([EffectCreative]);

export default function Offices({ section, offices, text_card }) {
	const [activeTab] = useState(0);
	const [swiper] = useState(null);

	const slideTo = (index) => swiper?.slideTo(index);
	const backdrop = "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)";

	useEffect(() => {
		slideTo(activeTab);
		// eslint-disable-next-line
	}, [activeTab]);

	return (
		<Section {...section}>
			<div className="container">
				<TextCard {...text_card} />
				<div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-6">
					{offices?.map((office, i) => (
						<div key={`office${i}`} className="offices-grid-item relative aspect-[38/51] overflow-hidden rounded-xl px-8 py-9">
							<Image imgClassName="w-full h-full" image={office?.image} objectFit="cover" objectPosition="center" />
							<div className="absolute inset-0" style={{ background: backdrop }}>
								<div className="absolute inset-x-4 bottom-9 lg:inset-x-8 ">
									<h3 className="text-36px mb-5 text-white">{office.country}</h3>
									<div className="mb-4 h-5">
										{office.phone ? (
											<a className="text-white underline duration-300 hover:text-purple" href={`tel:${office.phone.replace("-", "")}`}>
												{office.phone}
											</a>
										) : (
											""
										)}
									</div>
									<address className="mb-6 not-italic text-white" dangerouslySetInnerHTML={{ __html: office.address }} />
									<Link className="text-white" type="text" underlineColour="white" link={{ url: `mailto:${office.contact}`, title: office.contact }} />
								</div>
							</div>
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
				className={`text-28px   font-medium transition-opacity duration-150 group-hover:opacity-100 ${activeTab === i ? "opacity-100" : "opacity-20"}`}
			>
				{label}
			</m.div>
		</m.div>
	);
}
