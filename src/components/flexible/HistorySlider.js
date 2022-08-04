import React, { useRef } from "react";
import styled from "styled-components";
import { A11y, Scrollbar, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ButtonChevron from "~/assets/images/icons/button-chevron.svg";
import Image from "~/components/elements/Image";
import { Section } from "~/components/elements/Section";
import TextCard from "~/components/elements/TextCard";

const HistorySliderContainer = styled.div`
	.swiper-button-disabled {
		@apply !pointer-events-none !opacity-25;
	}

	.swiper-scrollbar {
		bottom: -71px !important;
		height: 2px !important;

		@media (min-width: 768px) {
			bottom: -129px !important;
		}
		.swiper-scrollbar-drag {
			@apply bg-orange;
		}
	}
`;

export default function HistorySlider({ section, text_card, slides, layout }) {
	const historySlider = useRef(null);
	const navigationPrevRef = useRef(null);
	const navigationNextRef = useRef(null);

	return (
		<Section {...section} className="overflow-hidden">
			<HistorySliderContainer className="container">
				<div className={` flex flex-col justify-between md:flex-row`}>
					<TextCard {...text_card} />

					<div className="mt-6 flex items-end space-x-[6px] md:mt-0">
						<div ref={navigationPrevRef}>
							<SliderButton direction="left" />
						</div>
						<div ref={navigationNextRef}>
							<SliderButton direction="right" />
						</div>
					</div>
				</div>

				<div className="mt-[60px] md:mt-[115px]">
					<Swiper
						modules={[A11y, Scrollbar, Navigation]}
						navigation={{
							prevEl: navigationPrevRef.current,
							nextEl: navigationNextRef.current,
						}}
						onBeforeInit={(swiper) => {
							// eslint-disable-next-line
							swiper.params.navigation.prevEl = navigationPrevRef.current;
							// eslint-disable-next-line
							swiper.params.navigation.nextEl = navigationNextRef.current;
						}}
						scrollbar={{ draggable: true }}
						ref={historySlider}
						className="relative flex w-full flex-col "
						slidesPerView="auto"
						grabCursor
						style={{ overflow: `visible` }}
					>
						{slides.map((slide, i) => (
							<SwiperSlide
								className={`${layout === "history" ? `mr-12 flex max-w-[298px] flex-col last:mr-0 md:mr-24` : `mr-8 max-w-[380px]`} select-none`}
								style={{ height: "auto" }}
								key={`hpswiper${i}`}
							>
								{layout === "history" && <HistorySlide slide={slide} />}
								{layout === "icon" && <IconSlide slide={slide} />}
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</HistorySliderContainer>
		</Section>
	);
}

function HistorySlide({ slide }) {
	return (
		<div className="flex flex-auto flex-col justify-between" style={{ height: "auto" }}>
			<div className="flex-auto">
				<div className="text-32px">{slide?.heading}</div>
				<div className="text-18px mt-[12px]" dangerouslySetInnerHTML={{ __html: slide?.content }} />
			</div>
			{slide?.logos && (
				<div className="mt-[35px] flex h-auto w-full space-x-[6px]">
					{slide?.logos?.map((logo, i) => (
						<div key={`logo${i}`} className="flex h-full w-full max-w-[90px] items-center justify-center rounded bg-grey py-[9px] px-[10px]">
							<Image image={logo?.logo} className="h-auto w-full" imgClassName="w-full h-full max-h-[16px]" />
						</div>
					))}
				</div>
			)}
		</div>
	);
}

function IconSlide({ slide }) {
	return (
		<div className="flex h-full flex-col rounded-[10px] bg-dark-grey bg-opacity-[.05] p-10">
			<div className="flex-1">
				<div className="mb-6 h-[58px] max-w-[143px]">
					<Image image={slide?.icon} className="h-full" imgClassName="h-full w-auto object-contain object-left" objectFit="contain" />
				</div>
				<div className="text-20px mb-2 font-semibold leading-[1.1]">{slide?.heading}</div>
				<div className="text-16px mt-[14px]" dangerouslySetInnerHTML={{ __html: slide?.content }} />
			</div>
		</div>
	);
}

export function SliderButton({ direction, ...other }) {
	return (
		<div
			className={`flex cursor-pointer items-center justify-center rounded-full border border-black border-opacity-10 py-[10px] px-[12px] text-black transition-colors duration-150 hover:bg-black hover:text-white `}
			{...other}
		>
			<div className={`${direction === "left" ? "rotate-180" : ""} `}>
				<ButtonChevron />
			</div>
		</div>
	);
}
