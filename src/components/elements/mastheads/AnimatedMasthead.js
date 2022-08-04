import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "~/components/elements/Section";
import CircleAnimation from "~/assets/images/underlines/circle.json";
import GetStartedEmailForm from "~/components/elements/forms/GetStartedEmailForm";
import Lottie from "react-lottie-player/dist/LottiePlayerLight";
import UnderlineOrange1 from "~/assets/images/underlines/underline-orange.svg";
import UnderlineOrange3 from "~/assets/images/underlines/underline-stroke-orange-alt-10.svg";

export default function AnimatedMasthead({ section }) {
	const [active, setActive] = useState(0);

	useEffect(() => {
		const intervalId = setTimeout(() => {
			setActive((active + 1) % 3);
		}, 4000);
		return () => clearTimeout(intervalId);
	}, [active]);

	return (
		<Section {...section} className="relative overflow-hidden bg-purple py-16 text-white md:py-0">
			<div className="container">
				<div className="flex flex-wrap items-center">
					<div className="relative w-full md:w-1/2 md:py-32 lg:py-36 xl:py-48">
						<TextSlider active={active} />

						<div className="pointer-events-none inset-y-0 mt-12 flex w-[130%] select-none flex-col justify-center md:absolute md:left-[105%] md:mt-0 2xl:left-[115%] 2xl:w-[145%]">
							<ImageSlider active={active} />

							{/* Preload Laptop Images */}
							<div className="pointer-events-none absolute top-0 left-[400vw] z-[-1] w-[130%]">
								<Image width={870} height={575} layout="responsive" src="/static/images/homepage-masthead/laptop-1.png" alt="" priority />
								<Image width={870} height={575} layout="responsive" src="/static/images/homepage-masthead/laptop-2-screen.png" alt="" priority />
								<Image width={870} height={575} layout="responsive" src="/static/images/homepage-masthead/laptop-3-screen.png" alt="" priority />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
}

function MotionImage({ children, y = "25%", x = "0%", delay = 0, exitDelay = 0, ...other }) {
	return (
		<motion.div
			initial={{ y, x, opacity: 0 }}
			animate={{ y: 0, x: 0, opacity: 1 }}
			exit={{
				opacity: 0,
				x: x === "0%" ? "0%" : "5%",
				y: y === "25%" ? "-25%" : "0",

				transition: { delay: exitDelay, duration: 0.45, ease: "easeOut" },
			}}
			transition={{ delay, duration: 0.45, ease: "easeOut" }}
			{...other}
		>
			{children}
		</motion.div>
	);
}

function VideoElement() {
	return (
		<div className="relative">
			<div className="overflow-hidden rounded">
				<video src="/static/images/homepage-masthead/video/vid.mp4" muted playsInline autoPlay loop />
			</div>
			<div className="absolute right-[8%] top-[-10%]">
				<Image src="/static/images/homepage-masthead/video/thumbsup.svg" width={50} height={27} priority alt="" />
			</div>
			<div className="absolute inset-x-[5%] bottom-0">
				<Image src="/static/images/homepage-masthead/video/timeline.svg" width={235} height={32} priority alt="" />
			</div>
		</div>
	);
}

function ImageSlider({ active }) {
	const slides = [
		[
			<MotionImage key="icon-1-top" className="absolute top-[5%] left-[6.2%] w-full max-w-[22%] object-contain" delay={0.4} exitDelay={0}>
				<VideoElement />
			</MotionImage>,
			<MotionImage key="icon-1-bottom" className="absolute bottom-[14%] right-[20%] w-full max-w-[30%] object-contain" delay={0.6} exitDelay={0.1}>
				<Image width={261} height={234} layout="responsive" src="/static/images/homepage-masthead/1-bottom.png" alt="" priority objectFit="contain" />
			</MotionImage>,
		],
		[
			<MotionImage key="laptop-2-screen" className="absolute inset-0 h-full w-full object-contain" y="0" exitDelay={0.3}>
				<Image width={870} height={575} layout="responsive" src="/static/images/homepage-masthead/laptop-2-screen.png" alt="" priority objectFit="contain" />
			</MotionImage>,
			<MotionImage key="icon-2-top" className="absolute top-[1%] left-[21%] w-full max-w-[38%] object-contain" delay={0.5} exitDelay={0}>
				<Image width={331} height={92} layout="responsive" src="/static/images/homepage-masthead/2-top.svg" alt="" priority objectFit="contain" />
			</MotionImage>,
			<MotionImage key="icon-2-right" className="absolute top-[23%] left-[57%] w-full max-w-[26%] object-contain" delay={0.7} exitDelay={0.1}>
				<Image width={191} height={281} layout="responsive" src="/static/images/homepage-masthead/2-right.svg" alt="" objectFit="contain" />
			</MotionImage>,
			<MotionImage key="icon-2-bottom" className="absolute bottom-[10%] left-[2%] w-full max-w-[26%] object-contain" delay={0.9} exitDelay={0.2}>
				<Image width={208} height={210} layout="responsive" src="/static/images/homepage-masthead/2-bottom.png" alt="" objectFit="contain" />
			</MotionImage>,
		],
		[
			<MotionImage key="laptop-3-screen" className="h-full w-full object-contain" y="0" exitDelay={0.2}>
				<Image width={870} height={575} layout="responsive" src="/static/images/homepage-masthead/laptop-3-screen.png" alt="" priority objectFit="contain" />
			</MotionImage>,
			<MotionImage key="icon-3-top" className="absolute top-[8%] right-[21%] w-full max-w-[33%] object-contain" delay={0.4} exitDelay={0}>
				<Image width={254} height={170} layout="responsive" src="/static/images/homepage-masthead/3-top.svg" alt="" objectFit="contain" />
			</MotionImage>,
			<MotionImage key="icon-3-bottom" className="absolute bottom-[18%] left-[0%] w-full max-w-[59%] object-contain" delay={0.5} exitDelay={0.1}>
				<Image width={434} height={144} layout="responsive" src="/static/images/homepage-masthead/3-bottom-newest.svg" alt="" objectFit="contain" />
			</MotionImage>,
		],
	];

	return (
		<div className="aspect-h-[793] aspect-w-[1199]">
			<div>
				<div className="relative h-full w-full">
					<MotionImage key="laptop-1" className="absolute inset-0 h-full w-full object-contain" y="0">
						<Image width={870} height={575} layout="responsive" src="/static/images/homepage-masthead/laptop-1.png" alt="" priority objectFit="contain" />
					</MotionImage>
					<AnimatePresence exitBeforeEnter={false}>{slides[active].map((slide) => slide)}</AnimatePresence>
				</div>
			</div>
		</div>
	);
}

function UnderlineAnimation({ src, ...other }) {
	return (
		<div {...other}>
			<motion.div exit={{ opacity: 0 }} className="relative overflow-hidden">
				<motion.div
					initial={{ x: 0 }}
					animate={{ x: "100%" }}
					exit={{ x: "100%" }}
					transition={{ duration: 0.35, ease: "easeOut" }}
					className="absolute inset-0 bg-purple"
				/>
				{src()}
			</motion.div>
		</div>
	);
}

function TextSlider({ active }) {
	return (
		<div className="py-8 text-center md:max-w-[600px] md:py-0 md:text-left">
			<h1 className="text-18px mb-3 opacity-60">Unified Sales Enablement Platform</h1>
			<div>
				<h2 className="text-h1 mb-6">
					<span className="relative">
						Onboard
						<AnimatePresence exitBeforeEnter>
							{active === 0 && <UnderlineAnimation src={UnderlineOrange1} className="absolute inset-x-0 top-[100%]" />}
						</AnimatePresence>
					</span>
					,{" "}
					<span className="relative">
						empower
						<AnimatePresence exitBeforeEnter>
							{active === 1 && (
								<motion.span exit={{ opacity: 0 }} className="">
									<div className="absolute inset-[-1rem] left-[-1.5rem] right-[-2rem] bottom-[-2rem] flex   flex-col justify-center">
										<Lottie loop={false} animationData={CircleAnimation} play />
									</div>
								</motion.span>
							)}
						</AnimatePresence>
					</span>{" "}
					and{" "}
					<span className="relative">
						engage
						<AnimatePresence exitBeforeEnter>
							{active === 2 && <UnderlineAnimation src={UnderlineOrange3} className="absolute inset-x-0 top-[100%]" />}
						</AnimatePresence>
					</span>{" "}
					smarter.
				</h2>
			</div>

			<div className="md:max-w-[540px]">
				<article className="mb-9">
					Your customers are smart. But what about your team? Make sure your teams are buyer-ready and deliver experiences that close 3x more deals than
					competitors.
				</article>
				<div className="select-none md:max-w-[480px]">
					<GetStartedEmailForm />
				</div>
			</div>
		</div>
	);
}
