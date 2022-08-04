import { motion } from "framer-motion";
import React from "react";
import Image from "~/components/elements/Image";
import styled from "styled-components";
import { Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

const SwiperContainer = styled.div`
	width: 100%;
	.swiper-wrapper {
		transition-timing-function: linear;
	}
`;
export default function OffscreenGallerySlider({ items }) {
	return items ? (
		<section className="mx-[-20vw] mt-12 sm:mx-[-15vw] md:mt-16 lg:mt-24 xl:mx-[-5vw]">
			{items.length > 1 ? (
				<SwiperContainer>
					<Swiper
						modules={[Autoplay]}
						direction="horizontal"
						grabCursor={false}
						loop
						slidesPerView="auto"
						allowTouchMove={false}
						autoplay={{
							delay: 1,
							disableOnInteraction: false,
						}}
						freeMode
						speed={8000}
						className="-ml-5 flex items-end !overflow-visible sm:-ml-8"
					>
						{items?.map((item, index) => (
							<SwiperSlide key={`offscreen-gallery-${index}`} className="max-w-[33%] flex-auto !overflow-visible pl-5 sm:pl-8">
								<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index / 10 }}>
									<Image image={item} className="shadow-xl" />
								</motion.div>
							</SwiperSlide>
						))}
					</Swiper>
				</SwiperContainer>
			) : (
				<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}>
					<Image image={items[0]} className="shadow-xl" />
				</motion.div>
			)}
		</section>
	) : null;
}
