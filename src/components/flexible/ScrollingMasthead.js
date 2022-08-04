import { AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Section } from "~/components/elements/Section";
import OrangeArrow from "~/components/elements/animatedArrows/OrangeArrow";
import WhiteArrowLeft from "~/components/elements/animatedArrows/WhiteArrowLeft";
import WhiteArrowRight from "~/components/elements/animatedArrows/WhiteArrowRight";
import UnderlineStroke8 from "~/assets/images/underlines/underline-stroke-orange-alt-8.svg";
import UnderlineStroke9 from "~/assets/images/underlines/underline-stroke-orange-alt-9.svg";
import DifferenceSwirl from "~/assets/images/background-lines/difference-swirl.svg";

export default function SrollingMasthead({ pages, section }) {
	const ref = useRef();
	const length = pages.length + 1; // this is takes up two pages
	const [progress, setProgress] = useState(0);
	const [scrollY, setScrollY] = useState(0);

	const maxProgress = 1;

	// Transform scroll progress to Y value
	const motionProgress = useMotionValue(progress);
	const arrowY = useTransform(motionProgress, [0.34, 0.46, 0.56], [0, -200, -700]);

	// Get the current page number and the progress percentage within page
	const pageProgressWidth = 1 / (length + 1);
	const activePage = Math.floor(progress * (length + 1));
	let currentPageProgress = (progress % pageProgressWidth) / pageProgressWidth;

	// Scroll handler
	useEffect(() => {
		const onScroll = (e) => {
			setScrollY(e.target.documentElement.scrollTop);
		};
		window.addEventListener("scroll", onScroll);

		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Set the progress value based on scroll offset and the container height
	useEffect(() => {
		if (!ref.current) return;
		const relevantHeight = ref.current.offsetHeight;
		const sectionY = ref.current.offsetTop;
		const sectionOverflow = scrollY - sectionY;

		// eslint-disable-next-line
		let _progress = sectionOverflow / relevantHeight;

		if (_progress < 0) _progress = 0;
		if (_progress > maxProgress) _progress = maxProgress;

		setProgress(_progress);

		// This is one way we can set motionvalues, we need motionvalues for useTransform
		motionProgress.set(_progress);
		// eslint-disable-next-line
	}, [length, ref, scrollY]);

	// Handle white overlay
	let whiteOverlayOpacity = 0;
	const whiteOverlayCutoff = 0.8;
	if (progress > whiteOverlayCutoff) {
		whiteOverlayOpacity = (progress - whiteOverlayCutoff) / (1 - whiteOverlayCutoff);
	}

	return (
		<Section className="relative overflow-hidden" sectionRef={ref} {...section}>
			{progress < 0.8 && (
				<div className="pointer-events-none fixed top-0 bottom-0 left-0 right-0 select-none opacity-40">
					<div
						style={{
							transform: `translateY(${progress * -20}%)`,
							opacity: progress < 0.7 ? 1 : 1 - (progress - 0.7) * 10,
						}}
					>
						{DifferenceSwirl()}
					</div>
				</div>
			)}
			<AnimatePresence>{progress > 0.4 && progress < 0.58 && <OrangeArrow motionProgress={motionProgress} arrowY={arrowY} />}</AnimatePresence>

			<div className="absolute top-0 bottom-0 left-0 right-0 bg-white" style={{ opacity: whiteOverlayOpacity }} />
			<div className="absolute bottom-0 left-0 right-0 h-[150px] bg-gradient-to-t from-white" />
			<div className="relative" style={{ height: "7000px" }}>
				{pages.map((page, i) => {
					const isActive = activePage === i;
					if (page.layout === "masthead") {
						return (
							<StickyPage key={`pagemasthead${i}`} active={isActive} ignoreTopFade currentPageProgress={currentPageProgress} pageStartY={0} pageEndY={-25}>
								<MastheadPage {...page.masthead} />
							</StickyPage>
						);
					}
					if (page.layout === "text") {
						return (
							<StickyPage key={`pagetext${i}`} active={isActive} currentPageProgress={currentPageProgress}>
								<TextPage {...page.text} />
							</StickyPage>
						);
					}
					// Last page spans 2 pages so update page progress
					if (isActive) {
						currentPageProgress /= 2;
					} else {
						currentPageProgress = 0.5 + currentPageProgress / 2;
					}

					return (
						<StickyPage
							key={`sticky-page-${i}`}
							index={i}
							active={isActive || activePage === i + 1}
							currentPageProgress={currentPageProgress}
							wide
							activePage={activePage}
							pageStartY={5}
							pageEndY={-15}
							spanTwoPages
						>
							<ThisIsPage currentPageProgress={currentPageProgress} {...page.this_is} />
						</StickyPage>
					);
				})}{" "}
			</div>
		</Section>
	);
}

function MastheadPage({ heading, text }) {
	return (
		<div>
			<h1 className="text-104px">{heading}</h1>
			<p className="text-26px mt-8">{text}</p>
			<div className="flex flex-col items-center pt-2">{UnderlineStroke9()}</div>
		</div>
	);
}

function TextPage({ heading, content }) {
	return (
		<div>
			<h2 className="text-h2">{heading}</h2>
			<p className="text-26px mt-8">{content}</p>
		</div>
	);
}

function ThisIsPage({ words, main_text, currentPageProgress }) {
	let lineVisible = false;

	const motionCurrentProgress = useMotionValue(currentPageProgress);
	const arrowLeftPathLength = useTransform(motionCurrentProgress, [0, 0.2, 0.21, 0.4], [0, 1, 1, 0]);
	const arrowLeftOpacity = useTransform(motionCurrentProgress, [0.21, 0.3], [1, 0]);
	const arrowRightPathLength = useTransform(motionCurrentProgress, [0.22, 0.4], [0, 1]);
	const arrowRightOpacity = useTransform(motionCurrentProgress, [0.22, 0.3], [0, 1]);
	/* eslint-disable */
	useEffect(() => {
		motionCurrentProgress.set(currentPageProgress);
	}, [currentPageProgress]);

	if (currentPageProgress < 0.22) {
		currentPageProgress = 0;
	} else {
		currentPageProgress -= 0.22;
	}
	if (currentPageProgress > 0.42) {
		currentPageProgress = 0.42;
	}
	if (currentPageProgress > 0.4) {
		lineVisible = true;
	}
	/* eslint-enable */

	const translateY = currentPageProgress * -6;

	return (
		<div wide>
			<h2 className="text-104px-small-mobile">
				<span>{main_text}</span>
				<div className="relative h-[1em] overflow-hidden">
					<div className="relative mt-[-0.1em]" style={{ transform: `translateY(${translateY}em)` }}>
						{words?.map((word, i) => {
							const wordClasses = [];
							if (word.style === "yellow") {
								wordClasses.push("text-yellow");
							} else if (word.style === "blue") {
								wordClasses.push("text-light-blue");
							} else {
								wordClasses.push("text-orange");
							}
							return (
								<div className={wordClasses.join(" ")} key={`word-${i}`}>
									{word.word}
								</div>
							);
						})}
					</div>
				</div>
				<div className="absolute top-[-50%] left-[20%] right-[20%] sm:top-[-20%] md:top-[0] ">
					<WhiteArrowLeft arrowLeftOpacity={arrowLeftOpacity} arrowLeftPathLength={arrowLeftPathLength} />
				</div>
				<div className="absolute top-[-69%] right-[15%] md:top-[-18%] md:right-[25%] ">
					<WhiteArrowRight arrowRightOpacity={arrowRightOpacity} arrowRightPathLength={arrowRightPathLength} />
				</div>
				<div className="absolute top-[100%] left-[20%] right-[20%] flex flex-col items-center">{lineVisible && UnderlineStroke8()}</div>
			</h2>
		</div>
	);
}

function StickyPage({ active, children, ignoreTopFade, wide, currentPageProgress, pageStartY = 25, pageEndY = -50 }) {
	const translateY = pageStartY + currentPageProgress * pageEndY;
	let opacity = 1;

	if (currentPageProgress > 0.75) {
		opacity = 1 - (currentPageProgress - 0.75) * 4;
	} else if (currentPageProgress < 0.25 && !ignoreTopFade) {
		opacity = currentPageProgress * 4;
	}

	return active ? (
		<div
			className="fixed top-0 bottom-0 flex w-full"
			style={{
				opacity,
				transform: `translateY(${translateY}%)`,
			}}
		>
			<div className="absolute top-[50%] left-0 right-0 translate-y-[-50%]">
				<div className={`${wide ? "max-w-[1200px]" : "max-w-[640px]"} my-auto mx-auto px-3 text-center`}>{children}</div>
			</div>
		</div>
	) : null;
}
