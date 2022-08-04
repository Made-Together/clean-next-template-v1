import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Parallax } from "~/components/global/Parallax";
import imageTemp1 from "~/assets/images/temp/BTC_Temp_Scroll_Images/scroll_parallax_image_1.jpg";
import imageTemp2 from "~/assets/images/temp/BTC_Temp_Scroll_Images/scroll_parallax_image_2.svg";
import imageTemp3 from "~/assets/images/temp/BTC_Temp_Scroll_Images/scroll_parallax_image_3.jpg";
import imageTemp4 from "~/assets/images/temp/BTC_Temp_Scroll_Images/scroll_parallax_image_4.svg";
import imageTemp5 from "~/assets/images/temp/BTC_Temp_Scroll_Images/scroll_parallax_image_5.jpg";
import imageTemp6 from "~/assets/images/temp/BTC_Temp_Scroll_Images/scroll_parallax_image_6.svg";
import imageTemp7 from "~/assets/images/temp/BTC_Temp_Scroll_Images/scroll_parallax_image_7.png";
import imageTemp8 from "~/assets/images/temp/BTC_Temp_Scroll_Images/scroll_parallax_image_8.svg";
import imageTemp9 from "~/assets/images/temp/BTC_Temp_Scroll_Images/scroll_parallax_image_9.jpg";
import imageTemp10 from "~/assets/images/temp/BTC_Temp_Scroll_Images/scroll_parallax_image_10.svg";
import imageTemp11 from "~/assets/images/temp/BTC_Temp_Scroll_Images/scroll_parallax_image_11.jpg";
import imageTemp12 from "~/assets/images/temp/BTC_Temp_Scroll_Images/scroll_parallax_image_12.svg";
import imageTemp13 from "~/assets/images/temp/BTC_Temp_Scroll_Images/scroll_parallax_image_13.jpg";

export default function ProductShotParallax({ items }) {
	const parallaxRef = useRef();

	return items ? (
		<div ref={parallaxRef}>
			<div className="mx-[-2vw] mt-12 mb-20 grid grid-cols-8 gap-2 md:mt-16 lg:mt-24">
				<div className="col-span-1">
					<Parallax parallaxRef={parallaxRef} properties={{ x: [0, 0], y: [50, -50] }}>
						<motion.img
							initial={{ y: 50, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: false }}
							transition={{ duration: 0.5 }}
							src={imageTemp1.src}
							alt="tempImage1"
							className="max-h-full max-w-full"
						/>

						<motion.div
							initial={{ y: 50, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: false }}
							transition={{ duration: 0.5 }}
							className="w-full"
						>
							{imageTemp2()}
						</motion.div>
						<motion.img
							initial={{ y: 50, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: false }}
							transition={{ duration: 0.5 }}
							src={imageTemp3.src}
							alt="tempImage3"
							className="max-h-full max-w-full rounded-[15px]"
						/>
					</Parallax>
				</div>
				<div className="col-span-1">
					<Parallax parallaxRef={parallaxRef} properties={{ x: [0, 0], y: [-50, 50] }}>
						<motion.div
							initial={{ y: 50, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: false }}
							transition={{ duration: 0.5 }}
							alt="tempImage4"
							className="w-full rounded-[15px]"
						>
							{imageTemp4()}
						</motion.div>

						<motion.img
							initial={{ y: 50, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: false }}
							transition={{ duration: 0.5 }}
							src={imageTemp5.src}
							alt="tempImage5"
							className="rounded-[15px]"
						/>
						<motion.div
							initial={{ y: 50, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: false }}
							transition={{ duration: 0.5 }}
							alt="tempImage6"
							className="w-full rounded-[15px]"
						>
							{imageTemp6()}
						</motion.div>
					</Parallax>
				</div>
				<div className="col-span-4">
					<motion.img
						initial={{ y: 50, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						viewport={{ once: false }}
						transition={{ duration: 0.5 }}
						src={imageTemp7.src}
						alt="tempImage7"
						className="rounded-[15px]"
					/>
				</div>
				<div className="col-span-1">
					<Parallax parallaxRef={parallaxRef} properties={{ x: [0, 0], y: [-50, 50] }}>
						<motion.div
							initial={{ y: 50, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: false }}
							transition={{ duration: 0.5 }}
							className="w-full"
						>
							{imageTemp8()}
						</motion.div>
						<motion.img
							initial={{ y: 50, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: false }}
							transition={{ duration: 0.5 }}
							src={imageTemp9.src}
							alt="tempImage9"
							className="max-h-full max-w-full"
						/>
						<motion.div
							initial={{ y: 50, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: false }}
							transition={{ duration: 0.5 }}
							className="w-full"
						>
							{imageTemp10()}
						</motion.div>
					</Parallax>
				</div>
				<div className="col-span-1">
					<Parallax parallaxRef={parallaxRef} properties={{ x: [0, 0], y: [50, -50] }}>
						<motion.img
							initial={{ y: 50, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: false }}
							transition={{ duration: 0.5 }}
							src={imageTemp11.src}
							alt="tempImage11"
							className="max-h-full max-w-full"
						/>
						<motion.div
							initial={{ y: 50, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: false }}
							transition={{ duration: 0.5 }}
							className="w-full"
						>
							{imageTemp12()}
						</motion.div>
						<motion.img
							initial={{ y: 50, opacity: 0 }}
							whileInView={{ y: 0, opacity: 1 }}
							viewport={{ once: false }}
							transition={{ duration: 0.5 }}
							src={imageTemp13.src}
							alt="tempImage13"
							className="max-h-full max-w-full"
						/>
					</Parallax>
				</div>
			</div>
		</div>
	) : null;
}
