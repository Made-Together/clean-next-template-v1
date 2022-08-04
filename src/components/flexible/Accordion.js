import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import Chevron from "~/assets/images/icons/chevron.svg";
import { TextLink } from "~/components/elements/Button";
import Image from "~/components/elements/Image";
import Media from "~/components/elements/Media";
import { Section } from "~/components/elements/Section";
import TextCard from "~/components/elements/TextCard";
import { useInView } from "react-intersection-observer";

export default function Accordion({ section, text_card, accordion_items, layout, reverse, gap_size }) {
	const [active, setActive] = React.useState(0);

	const interval = useRef(null);

	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.3,
	});

	useEffect(() => {
		if (inView) {
			interval.current = setInterval(() => {
				setActive((i) => (i + 1) % accordion_items.length);
			}, 9000);
		}

		setActive(0);

		return () => {
			clearInterval(interval.current);
		};
		// eslint-disable-next-line
	}, [interval, inView]);

	const overrideActive = (i) => {
		setActive(i);
		clearInterval(interval.current);

		interval.current = setInterval(() => {
			// eslint-disable-next-line
			setActive((i) => (i + 1) % accordion_items.length);
		}, 9000);
	};

	return (
		<Section {...section}>
			<div className="container" ref={ref}>
				{layout === "header-top" && (
					<header className="mb-12 md:mb-16">
						<TextCard {...text_card} />
					</header>
				)}

				<div className={`hidden items-center gap-12   md:grid md:grid-cols-12 ${gap_size === "small" ? "md:gap-[21px]" : "md:gap-20"}`}>
					<div className={`md:col-span-6 ${reverse && "md:order-1"}`}>
						<div className={` space-y-10 ${reverse && "md:mx-auto"}`}>
							{layout === "header-left" && <TextCard {...text_card} />}
							<AccordionList {...{ active, setActive, accordion_items, overrideActive, inView }} />
						</div>
					</div>

					<div className="md:col-span-6">
						<div className={` ${!reverse ? "ml-auto mr-0" : "md:mx-auto"} ${gap_size === "small" ? "md:max-w-[527px]" : ""}  `}>
							<AccordionMedia {...{ active, accordion_items }} />
						</div>
					</div>
				</div>
				<div className="block space-y-12 md:hidden">
					{accordion_items?.map((accItem, i) => (
						<div key={`mobileAcc${i}`}>
							<h2 className="text-h2 mb-4">{accItem?.heading}</h2>
							<div className="mb-8" dangerouslySetInnerHTML={{ __html: accItem?.content }} />
							<AccordionMediaInner {...accItem} inView />
						</div>
					))}
				</div>
			</div>
		</Section>
	);
}

export function AccordionList({ active, accordion_items, overrideActive, inView }) {
	const ref = React.useRef(null);
	const [listMinHeight, setListMinHeight] = React.useState(null);

	React.useEffect(() => {
		setTimeout(() => {
			if (ref.current && ref.current.clientHeight) {
				setListMinHeight(ref.current.clientHeight + 10);
			}
		}, 500);
	}, [ref]);

	return (
		<div ref={ref} className="accordion-list w-full md:max-w-[510px]" style={{ minHeight: `${listMinHeight}px` }}>
			{accordion_items.map((item, index) => {
				const isOpen = index === active;
				return (
					<div key={`accordion-item-${index}`} onClick={() => !isOpen && overrideActive(index)}>
						<motion.div
							animate={{
								paddingTop: isOpen ? "32px" : "16px",
								paddingBottom: isOpen ? "32px" : "16px",
								marginBottom: isOpen ? "10px" : "0px",
								marginTop: isOpen ? "10px" : "0px",
							}}
							transition={{ ease: [0.04, 0.62, 0.23, 0.98] }}
							className={`accordion-list-item relative select-none overflow-hidden rounded-xl py-6 px-8 ${isOpen ? "bg-beige" : "cursor-pointer"}`}
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									{isOpen && (
										<div className="mr-4">
											<TextLink />
										</div>
									)}
									<h4 className="mr-4 font-semibold" dangerouslySetInnerHTML={{ __html: item.heading }} />
								</div>
								<motion.div
									animate={{
										transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
									}}
								>
									<Chevron />
								</motion.div>
							</div>
							<AnimatePresence>
								{isOpen && (
									<AccordionAnimation className="text-18px overflow-hidden">
										<div className="mr-4 pt-4" dangerouslySetInnerHTML={{ __html: item.content }} />
									</AccordionAnimation>
								)}
							</AnimatePresence>

							<AnimatePresence>
								{inView && isOpen && (
									<motion.div
										key="bg"
										initial={{ width: "0%" }}
										animate={{ width: "100%" }}
										transition={{ duration: 9, ease: "linear" }}
										className="absolute left-0 right-0 bottom-0 h-[3px] w-full rounded-r-[15px] bg-[#D2CCC8]"
									/>
								)}
							</AnimatePresence>
						</motion.div>
					</div>
				);
			})}
		</div>
	);
}

export function AccordionAnimation({ children, className }) {
	return (
		<motion.div
			key="content"
			initial="collapsed"
			animate="open"
			exit="collapsed"
			variants={{
				open: { opacity: 1, height: "auto" },
				collapsed: { opacity: 0, height: 0 },
			}}
			transition={{ ease: [0.04, 0.62, 0.23, 0.98] }}
			className={`${className} `}
		>
			{children}
		</motion.div>
	);
}

export function AccordionMedia({ active, accordion_items }) {
	return (
		<div className="accordion-media">
			{accordion_items.map((item, index) =>
				active === index ? (
					<div key={`accordion-media-${index}`}>
						<AccordionMediaInner {...item} />
					</div>
				) : null
			)}
		</div>
	);
}

export function AccordionMediaInner({ background_image, media, inView = false }) {
	return (
		<div
			className="accordion-item-media relative w-full"
			style={{
				aspectRatio: `${media?.image?.width} / ${media?.image?.height}`,
			}}
		>
			<motion.div
				key="media"
				initial="collapsed"
				animate={!inView && "open"}
				exit="collapsed"
				whileInView={inView ? "open" : undefined}
				viewport={{ once: true }}
				variants={{
					open: { y: 0, opacity: 1 },
					collapsed: { y: background_image ? 32 : 0, opacity: 0 },
				}}
				transition={{ delay: 0.5, duration: 1, ease: [0.04, 0.62, 0.23, 0.98] }}
				className="relative z-[1]"
			>
				<Media {...media} />
			</motion.div>
			{background_image && (
				<motion.div
					initial="collapsed"
					animate={!inView && "open"}
					exit="collapsed"
					whileInView={inView ? "open" : undefined}
					viewport={{ once: true }}
					variants={{
						open: { y: 0, opacity: 1 },
						collapsed: { y: -30, opacity: 0 },
					}}
					transition={{ duration: 1, ease: [0.04, 0.62, 0.6, 0.98] }}
					className="absolute inset-0"
				>
					<Image image={background_image} />
				</motion.div>
			)}
		</div>
	);
}
