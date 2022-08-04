import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { useWindowSize } from "react-use";
import styled from "styled-components";
import Image from "~/components/elements/Image";
import { Link } from "~/components/elements/links/Link";

export default function HeaderNav({ items }) {
	const [showSubnav, setShowSubnav] = useState(null);
	if (!items || !items.length) return null;

	return (
		<nav className="header-nav text-16px flex items-center space-x-7 tracking-[0.03em] text-black" role="navigation">
			{items.map((props, index) => (
				<MenuItem key={`menu-item-${index}`} isLast={index === items.length - 1} showSubnav={showSubnav} setShowSubnav={setShowSubnav} {...props} />
			))}
		</nav>
	);
}

function MenuItem(props) {
	const { link, subnav, isLast, showSubnav, setShowSubnav } = props;
	const currentSubnavIsShown = showSubnav === link?.title;
	const hasSubnav = subnav?.columns?.length > 0;

	return (
		<div className="group relative" onMouseEnter={() => setShowSubnav(link?.title)} onMouseLeave={() => setShowSubnav(null)}>
			<div>
				<Link
					href={link?.url}
					className={`flex items-center group-hover:text-purple ${currentSubnavIsShown && "text-purple"}`}
					onClick={(e) => {
						if (!link?.url || link?.url === "#") e.preventDefault();
					}}
				>
					{link?.title} &nbsp;
					{hasSubnav && (
						<div className={`transform transition-transform duration-200 ease-in-out ${currentSubnavIsShown && "-scale-y-[100%]"}`}>
							<svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M1.01562 1L5.51562 6L10.0156 1" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</div>
					)}
				</Link>
			</div>
			<motion.div
				animate={currentSubnavIsShown ? "open" : "close"}
				initial={{ display: "none" }}
				variants={{
					open: {
						display: "block",
						transition: {
							delayChildren: 0.1,
						},
					},
					close: {
						display: "none",
						transition: {
							when: "afterChildren",
						},
					},
				}}
			>
				<motion.div
					variants={{
						open: { opacity: 1, y: 0 },
						close: { opacity: 0, y: 10 },
					}}
					transition={{ opacity: { duration: 0.2 }, ease: [0.04, 0.62, 0.23, 0.98] }}
				>
					<Subnav {...subnav} isLast={isLast} />
				</motion.div>
			</motion.div>
		</div>
	);
}

export function Subnav({ columns, two_columns, isLast }) {
	const [render, setRender] = useState(false);
	const { width } = useWindowSize();

	useEffect(() => setRender(true), []);

	if (!columns?.length || !render) return null;

	return (
		<div
			className={`subnav text-15px absolute top-[100%] z-50 transform pt-6 ${two_columns === true ? "min-w-[764px]" : "min-w-[462px]"} ${
				width < 1570 && isLast ? "left-auto right-0 translate-x-[35%]" : "left-[50%] right-auto translate-x-[-50%]"
			}`}
		>
			<div className="relative overflow-hidden rounded bg-white text-black" style={{ boxShadow: "0px 15px 30px 0px rgba(0,0,0,.06)" }}>
				<div className={`flex ${two_columns === true ? "" : "flex-col"}`}>
					{columns?.map((column, index) => {
						const isFirst = index === 0;

						return (
							<div
								key={`header-column-${index}`}
								className={`flex flex-auto flex-col p-8 ${!isFirst ? "bg-light-beige" : ""}`}
								style={{ flex: two_columns && isFirst ? "1 1 480px" : "1 1 auto" }}
							>
								{column?.heading?.length > 0 && (
									<h4
										className={`text-12px mb-6 -mt-1 border-b pb-4 uppercase text-dark-grey opacity-[60%] ${
											isFirst ? " border-light-beige" : "border-[#E2E0DB]"
										}`}
									>
										{column.heading}
									</h4>
								)}
								<nav
									className={
										two_columns === true || isFirst
											? `flex flex-auto flex-col ${isFirst ? "justify-between space-y-6" : "space-y-4"}`
											: "grid grid-cols-2 gap-4"
									}
								>
									{column?.items &&
										column?.items?.map((item, columnIndex) => (
											<div key={`column-${columnIndex}`}>
												<SubnavItem {...item} type={isFirst ? "large" : "small"} />
											</div>
										))}
								</nav>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

const SubnavItemStyledLink = styled(Link)`
	width: 100%;

	position: relative;
	&:before {
		content: "";
		display: block;
		position: absolute;
		inset: -10px;
		background-color: #f8f5f0;
		border-radius: 0.5rem;
		opacity: 0;
		transition: opacity 0.2s ease-in-out;
	}

	&:hover:before {
		opacity: 1;
	}
`;

function SubnavItem({ link, icon, description, featured_post, type, animated_icon = "", icon_type = "static" }) {
	const [hover, setHover] = useState(false);
	const isFeaturedPost = description === "{{featuredPost}}";
	const [animationData, setAnimationData] = useState();
	const [animationPlaying, setAnimationPlaying] = useState(false);
	const [goTo, setGoTo] = useState(0);

	useEffect(() => {
		const setAnimatedIcon = async () => {
			const response = await fetch(new URL(animated_icon).pathname).then((data) => data.json());
			setAnimationData(response);
		};

		if (animated_icon && icon_type === "animated") {
			setAnimatedIcon();
		}
	}, [animated_icon, icon_type]);

	useEffect(() => {
		setAnimationPlaying(hover);
		if (!hover) {
			setGoTo(0);
		}
	}, [hover]);

	return !isFeaturedPost ? (
		<SubnavItemStyledLink href={link?.url} className="group rounded-lg" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
			<div className="relative flex items-center">
				{icon && icon_type === "static" && (
					<Image
						image={icon}
						className={`flex-none ${type === "large" ? "mr-6 h-[55px] w-[55px]" : "mr-3 h-[17px]"} object-contain`}
						imgClassName={type === "large" ? "w-[55px] h-[55px]" : "h-[17px]"}
					/>
				)}
				{animated_icon && animationData && icon_type === "animated" && (
					<div className={`bg-light-beige flex-none rounded-2xl ${type === "large" ? "mr-6 h-[55px] w-[55px]" : "mr-3 h-[17px]"} object-contain`}>
						<Lottie play={animationPlaying} loop goTo={goTo} onLoopComplete={() => !hover && setAnimationPlaying(false)} animationData={animationData} />
					</div>
				)}
				<div className="relative">
					<motion.span
						className="block !leading-snug"
						animate={{
							color: hover && !description ? "#1D2222" : "#1D2222",
						}}
						dangerouslySetInnerHTML={{ __html: link?.title }}
					/>
					{!description && (
						<motion.div
							animate={{ y: hover ? 0 : 8, opacity: hover ? 1 : 0 }}
							transition={{
								duration: 0.5,
								opacity: { duration: 0.2 },
								ease: [0.04, 0.62, 0.23, 0.98],
							}}
							className="absolute bottom-[-3px] left-0 h-[1px]  w-full bg-orange"
						/>
					)}
					{description && <div className="text-15px mt-[4px] font-normal !leading-tight opacity-[60%]" dangerouslySetInnerHTML={{ __html: description }} />}
				</div>
			</div>
		</SubnavItemStyledLink>
	) : (
		<FeaturedPost {...featured_post} />
	);
}

export function FeaturedPost(props) {
	const { permalink, featured_image, post_title } = props;
	const { t } = useTranslation();
	return (
		<div>
			<Link href={permalink} className="flex flex-auto flex-col transition-opacity duration-300 hover:opacity-80 lg:max-w-[230px]">
				<div className="mb-5 flex-auto">
					{/* 38 : 23 */}
					<div className="aspect-w-38 aspect-h-23 overflow-hidden rounded-[8px]">
						<div className="bg-grey">
							{featured_image && <Image image={featured_image} className="h-full w-full " objectFit="cover" imgClassName="w-full h-full object-cover" />}
						</div>
					</div>
				</div>
				<div className="flex-auto space-y-3 font-semibold">
					<h4 className="text-[16px]" dangerouslySetInnerHTML={{ __html: post_title }} />
					<div className="opacity-85 trans text-[12px] uppercase hover:opacity-75">{t("Read now")}</div>
				</div>
			</Link>
		</div>
	);
}
