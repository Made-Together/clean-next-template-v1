import React from "react";
import { useWindowSize } from "react-use";
import styled from "styled-components";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "~/components/elements/Image";
import { Section } from "~/components/elements/Section";
import TextCard from "~/components/elements/TextCard";

const MarqueeSwiper = styled.div`
	width: 100%;
	.swiper-wrapper {
		transition-timing-function: linear;
	}
`;

export default function TwoColumnVerticalScroll({ section, text_card, media, options }) {
	// eslint-disable-next-line
	const leftColumnWidth = +options?.left_column_width || 6;

	const textCardContainerClasses = `md:col-span-${leftColumnWidth}`;
	const mediaContainerClasses = `md:col-span-${12 - leftColumnWidth}`;

	return (
		<Section {...section}>
			<div className="mx-auto max-w-[1370px] overflow-hidden bg-grey  md:rounded-[15px] ">
				<div className="container overflow-hidden lg:!pl-20">
					<div className={`${"grid items-center gap-12 md:grid-cols-12"}`}>
						<div className={`${textCardContainerClasses} ${options?.reverse ? "md:order-1" : ""}`}>
							<div className="pt-20 lg:py-[214px]">
								<TextCard {...text_card} />
							</div>
						</div>

						<div className={`${mediaContainerClasses} pb-16 md:pb-0`}>
							<div className=" relative left-[-1.5rem]  h-full w-full gap-x-[34px]  md:static  md:flex ">
								<MarqueeSlider images={media?.left_side_images} />
								<MarqueeSlider images={media?.right_side_images} reverse />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
}

export function MarqueeSlider({ images, reverse }) {
	const { width } = useWindowSize();

	return (
		<MarqueeSwiper>
			<Swiper
				modules={[Autoplay]}
				loop
				direction={width < 768 ? "horizontal" : "vertical"}
				slidesPerView="auto"
				speed={6000}
				autoplay={{
					delay: 1,
					disableOnInteraction: false,
					reverseDirection: !!reverse,
				}}
				className="pointer-events-none max-h-[700px] w-full select-none !overflow-visible"
			>
				{images?.map((image, i) => (
					<SwiperSlide
						className={` pointer-events-none mr-4 !w-[25%]  select-none flex-col justify-between md:mr-12 md:flex md:!w-full`}
						key={`marqueeSwiper${i}`}
						style={{ height: "auto" }}
					>
						<Image image={image} className="mb-[30px] max-w-[150px] rounded-[15px] md:w-full md:max-w-[238px]" imgClassName="rounded-[15px] w-full" />
					</SwiperSlide>
				))}
			</Swiper>
		</MarqueeSwiper>
	);
}
