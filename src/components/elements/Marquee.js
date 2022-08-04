import React from "react";
import styled from "styled-components";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "~/components/elements/Image";

const RowSliderContainer = styled.div`
	width: 100%;
	.swiper-wrapper {
		transition-timing-function: linear;
	}
`;

function Marquee({ slides, reverse, dark, className, slideClass = "max-w-max", type }) {
	return (
		<RowSliderContainer>
			<Swiper
				modules={[Autoplay]}
				loop
				direction="horizontal"
				slidesPerView="auto"
				speed={6000}
				spaceBetween={26}
				autoplay={{
					delay: 1,
					disableOnInteraction: false,
					reverseDirection: !!reverse,
				}}
				className={`space-x-[26px] !py-5 ${className} `}
			>
				{slides?.map((slide, i) => (
					<SwiperSlide className={`${slideClass} pointer-events-none select-none `} key={`wordSwiper${i}`}>
						<div
							className="h-full w-full"
							style={{
								aspectRatio: `${slide?.width} / ${slide?.height}`,
							}}
						>
							{type === "image" ? <Image className="h-full w-full" image={slide} /> : <WordSlide {...slide} dark={dark} />}
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</RowSliderContainer>
	);
}

export default Marquee;

export function WordSlide({ i, text, dark }) {
	let wordClass = "bg-light-purple text-black";

	if (dark) {
		wordClass = "bg-purple text-white";
	}

	return (
		<div
			className={`text-30px leading-[36px] ${wordClass} max-w-max rounded-[18px] px-[30px] pt-[12px] pb-[18px] font-semibold  `}
			key={`wordSwiper${i}`}
			style={{ height: "auto", boxShadow: " 0px 4px 9px rgba(0, 0, 0, 0.15)" }}
		>
			{text}
		</div>
	);
}
