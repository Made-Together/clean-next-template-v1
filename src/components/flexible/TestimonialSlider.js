import React, { useEffect, useRef, useState } from "react";
import { EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "~/components/elements/Image";
import { SliderButton } from "~/components/flexible/HistorySlider";

export default function TestimonialSlider({ slides }) {
	const [activeTab, setActiveTab] = useState(0);

	const [swiper, setSwiper] = useState(null);

	const slideTo = (index) => swiper?.slideTo(index);

	useEffect(() => {
		slideTo(activeTab);
		// eslint-disable-next-line
	}, [activeTab]);

	const testimonialSlider = useRef(null);

	return (
		<div className="container relative flex flex-col items-center lg:flex-row">
			<div className="mb-8 w-full lg:mr-12 lg:mb-0 lg:w-1/2">
				<Swiper
					onSwiper={setSwiper}
					modules={[EffectFade]}
					className={` pointer-events-none w-full max-w-[409px] overflow-hidden rounded-[10px] `}
					slidesPerView={1}
					draggable={false}
					effect="fade"
					noSwiping
					fadeEffect={{ crossFade: true }}
				>
					{slides.map((slide, i) => (
						<SwiperSlide key={`swiperImage${i}`} className="pointer-events-none h-full overflow-hidden " style={{ height: "auto" }}>
							<div className="pointer-events-none h-full w-full ">
								<Image
									image={slide?.acf?.images?.cite_image}
									loading="eager"
									objectFit="cover"
									imgClassName="h-full"
									className="pointer-events-none mx-auto h-full "
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<Swiper
				onActiveIndexChange={(i) => setActiveTab(i.activeIndex)}
				className="relative z-40 flex w-full flex-col lg:w-1/2"
				slidesPerView={1}
				ref={testimonialSlider}
				grabCursor
			>
				{slides?.map((slide, i) => (
					<SwiperSlide key={`careerSlider${i}`} className="flex justify-between pb-12 md:py-12 md:pt-6" style={{ height: "auto" }}>
						<div>
							<div className="text-[20px] font-medium leading-[1.42] tracking-[0.01em] text-black lg:text-[32px] ">{slide?.acf?.quote}</div>
							<div className="text-14px mt-[10px] uppercase leading-[1.604] md:mt-[50px]">
								<div className="font-semibold ">{slide?.acf?.cite_name}</div>
								<div className="font-normal ">{slide?.acf?.cite_role}</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			{slides?.length > 1 && (
				<div className="absolute bottom-[0.5rem] right-0 z-50 flex max-w-[40%] items-center space-x-[8px] md:mb-0 md:w-[150px] lg:bottom-[2.5rem]">
					<SliderButton direction="left" onClick={() => testimonialSlider.current.swiper.slidePrev()} disabled={activeTab === 0} />
					<SliderButton onClick={() => testimonialSlider.current.swiper.slideNext()} disabled={activeTab === slides.length - 1} />
				</div>
			)}
		</div>
	);
}
