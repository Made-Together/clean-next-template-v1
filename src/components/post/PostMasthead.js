import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { useTranslation } from "next-i18next";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from "react-share";
import styled from "styled-components";
import BlogSwirlLarge from "~/assets/images/background-lines/blog-hero-swirl-large.inline.svg";
import BlogSwirl from "~/assets/images/background-lines/blog-hero-swirl.inline.svg";
import PodcastSwirl from "~/assets/images/background-lines/podcast-hero-swirl.inline.svg";
import PlayIcon from "~/assets/images/icons/BlogPlay.svg";
import FacebookSVG from "~/assets/images/social/facebook.inline.svg";
import LinkedInSVG from "~/assets/images/social/linkedin.inline.svg";
import TwitterSVG from "~/assets/images/social/twitter.inline.svg";
import { Button } from "~/components/elements/Button";
import FormModal from "~/components/elements/forms/FormModal";
import { BulletPoint } from "~/components/elements/Icon";
import Image from "~/components/elements/Image";
import TextCard from "~/components/elements/TextCard";
import Video from "~/components/elements/Video";
import MarketoForm from "~/components/elements/forms/MarketoForm";

export default function PostMasthead({
	layout,
	heading,
	content,
	date,
	modified,
	link,
	download,
	image,
	stats,
	extra_content_under_button,
	hide_share_buttons,
	hide_author,
	gated_content,
	embeddable_content,
	bullet_points,
	category,
	author,
	hasPostContent,
}) {
	let isDefault = false;
	let isEvent = false;
	let isPodcast = false;
	let isVideo = false;
	let isGated = false;
	let isDownload = false;

	let paddingClasses = "pt-24 pb-16  md:pt-28 md:pb-20 lg:pt-40 lg:pb-28";
	let heroClasses = "text-white bg-purple";
	let swirlClasses = "bottom-0 right-0 text-[#5E3061]";
	let textClasses = "md:max-w-xl ";
	let halfWidth = false;
	let twoThirdWidth = false;

	const [modalOpen, setModalOpen] = useState(false);
	const [isSent, setIsSent] = useState(false);

	switch (layout) {
		case "default":
			heroClasses = "text-white bg-purple";
			swirlClasses = "pointer-events-none bottom-0 right-0 text-[#5E3061]";
			isDefault = true;
			halfWidth = true;

			break;
		case "event":
			heroClasses = "text-black bg-beige !pb-0";
			swirlClasses = "pointer-events-none top-[2rem] right-0 text-[#F1EBDF]";
			isEvent = true;
			halfWidth = true;

			break;
		case "podcast":
			heroClasses = "text-black bg-light-purple ";
			swirlClasses = "pointer-events-none bottom-0 right-0 text-[#CED3FB]";
			isPodcast = true;
			textClasses = "md:max-w-[720px]";
			twoThirdWidth = true;
			// paddingClasses = "pt-24 pb-[8rem]  md:pt-28 md:pb-[10rem] lg:pt-40 lg:pb-[13rem]";
			paddingClasses += " !pb-0";
			break;
		case "video":
			paddingClasses += " !pb-0";
			heroClasses = "text-black bg-light-blue overflow-hidden";
			swirlClasses = "pointer-events-none top-[13rem] right-0 text-[#99C3EA]";
			isVideo = true;
			textClasses = "md:max-w-[720px]";
			twoThirdWidth = true;
			break;
		case "webinar":
			heroClasses = "text-black bg-lime bg-opacity-[0.30] overflow-hidden";
			swirlClasses = "top-[13rem] right-0 text-lime";
			isVideo = true;
			textClasses = "md:max-w-[720px]";
			twoThirdWidth = true;
			break;
		case "gated-content":
			heroClasses = "text-white bg-dark-green overflow-hidden";
			swirlClasses = "bottom-[-180px] right-0 text-[#145058]";
			isGated = true;
			halfWidth = true;
			break;
		case "download":
			heroClasses = `text-black bg-beige ${download?.offset_image && "!pb-0"}`;
			swirlClasses = "bottom-[-180px] right-0 text-[#145058]";
			textClasses = "md:max-w-[561px]";
			isDownload = true;
			halfWidth = true;
			break;
		default:
			break;
	}
	if (category === "Uncategorized") {
		// eslint-disable-next-line
		category = "";
	}

	// eslint-disable-next-line
	let leftColumnWidth = halfWidth ? "md:col-span-6" : twoThirdWidth ? "md:col-span-8" : "";
	if (leftColumnWidth === "") leftColumnWidth = "md:col-span-6";

	// eslint-disable-next-line
	let rightColumnWidth = halfWidth ? "md:col-span-6" : twoThirdWidth ? "md:col-span-4" : "";
	if (rightColumnWidth === "") rightColumnWidth = "md:col-span-6";

	return (
		<section className={`relative ${paddingClasses} ${heroClasses} layout-${layout}`}>
			{!isDownload && <div className={`absolute ${swirlClasses} `}>{isGated ? <BlogSwirlLarge /> : isPodcast ? <PodcastSwirl /> : <BlogSwirl />}</div>}
			{isDownload && download?.offsetImage && (
				<div className="pointer-events-none absolute bottom-0 left-0 right-0 mx-auto block  h-[64px] w-full bg-white md:hidden xl:block" />
			)}
			<div className="container relative">
				<div
					className={`grid ${
						(isDownload && download?.image_offset) || isGated ? "items-start" : "items-center"
					}  relative gap-y-12 md:grid-cols-12 md:gap-x-16 lg:gap-x-20`}
				>
					<div className={`${leftColumnWidth}`}>
						<div className={` md:mb-6 ${textClasses} `}>
							<TextCard
								{...{
									subheading: category,
									heading,
									content,
									// dont show link here if it is a download because we want to link to the modal
									links: !isDownload && !download?.isGated ? [{ link: { link, type: "button" } }] : [],
									options: {
										heading_tag: "h1",
										heading_classes: "text-h2",
										content_classes: "prose",
										custom_y_spacing: "space-y-4 lg:space-y-3",
									},
								}}
							/>
							{isGated && <Hosts gated_content={gated_content} />}

							{!isDownload && (
								<>
									<div className={`mt-8  h-[1px] w-full ${isDefault || isGated ? "bg-white opacity-20 " : "bg-black opacity-[0.16] "} `} />
									<DateAndShare
										hide_share_buttons={hide_share_buttons}
										date={date}
										modified={modified}
										author={author}
										category={category}
										layout={layout}
										isEvent={isEvent}
										isGated={isGated}
										gated_content={gated_content}
										hide_author={hide_author}
									/>
								</>
							)}

							{isDownload && (
								<>
									{/* Gated download form modal */}
									{download?.is_gated && (
										<div className="mt-8">
											<Button className="" onClick={() => setModalOpen(true)}>
												{link?.title || "Download now"}
											</Button>
										</div>
									)}

									<AnimatePresence>
										{modalOpen && <DownloadModal isSent={isSent} setIsSent={setIsSent} setModalOpen={setModalOpen} {...download?.hubspot_form} />}
									</AnimatePresence>

									{extra_content_under_button && (
										<div className="prose mt-8 w-full space-y-4" dangerouslySetInnerHTML={{ __html: extra_content_under_button }} />
									)}
									{bullet_points && (
										<div className="mt-8 space-y-3 md:columns-2">
											{bullet_points?.map((point, i) =>
												point?.bullet_point ? (
													<div key={`bg${i}`} className="flex items-center space-x-[7px] md:space-x-[14px] ">
														<div className="flex-none">
															<BulletPoint />
														</div>
														<div className="text-18px">{point?.bullet_point}</div>
													</div>
												) : null
											)}
										</div>
									)}
								</>
							)}
						</div>
					</div>

					{(image || isGated) && (
						<div className={`${rightColumnWidth}`}>
							{image && !isGated && !isVideo && (
								<div className={`overflow-hidden rounded-[15px] ${isDownload ? "md:mr-0 md:max-w-[461px]" : "md:max-w-[546px]"}  mx-auto w-full`}>
									<Image image={image} />
								</div>
							)}

							{isGated && (
								<div className="mx-auto max-w-[560px] rounded-[15px] bg-white px-[45px] py-[40px] text-black md:mt-8 md:mr-4 md:max-w-[420px]">
									<div>
										{!isSent && <FormHeader {...gated_content.form_marketo_form} />}
										<MarketoForm {...gated_content?.form_marketo_form} formName="Resources Download Form" setIsSent={setIsSent} />
									</div>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
			{stats && <EventStats stats={stats} />}

			{(isVideo || isPodcast) && embeddable_content && (
				<>
					<div className="relative mx-auto h-full w-full md:mt-12 lg:mt-20 ">
						<div className="absolute inset-x-0 top-[50%] bottom-0 bg-white" />
						<div className="container relative">
							<Video {...embeddable_content?.video} />
						</div>
					</div>
					{!hasPostContent && <div className="relative bg-white pb-16 md:pb-20 lg:pb-28" />}
				</>
			)}
		</section>
	);
}

export function FormHeader({ heading, content }) {
	return heading || content ? (
		<header className="mb-[24px] space-y-4">
			{heading && <h4 className="text-24px mx-auto font-medium leading-[1.20]" dangerouslySetInnerHTML={{ __html: heading }} />}
			{content && <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />}
		</header>
	) : null;
}

export function DownloadModal({ setModalOpen, marketo_form, isSent, setIsSent }) {
	return (
		<FormModal setModalOpen={setModalOpen}>
			<>
				{!isSent && <FormHeader {...marketo_form} />}
				<MarketoForm {...marketo_form} formName="Resources Download Form" setIsSent={setIsSent} />
			</>
		</FormModal>
	);
}

export function Hosts({ gated_content }) {
	const { t } = useTranslation();
	return gated_content?.hosts && gated_content?.hosts?.length > 0 ? (
		<div className="text-14px mt-[54px]">
			<div className="font-semibold uppercase leading-[1.69]">{t("Hosted By")}</div>

			<div className="mt-[16px] flex items-center space-x-[50px]">
				{gated_content?.hosts?.map((host, i) => (
					<div key={`host${i}`} className="flex items-center space-x-[22px]">
						{host?.image && <Image image={host?.image} className="h-[58px] w-[58px]" />}
						<div className="">
							<div className="text-15px font-bold">{host?.name}</div>
							<div className="opacity-60">{host?.job_title}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	) : null;
}

export function EventStats({ stats }) {
	return (
		<div className="relative bg-beige px-4 pt-14 pb-20 lg:pt-24">
			<div className="container  mb-[-20px] flex flex-wrap items-center justify-between gap-y-12 rounded-[15px] bg-white py-[40px] px-[30px]">
				{stats?.map((stat, i) => (
					<div key={`stat${i}`} className="flex w-full flex-col items-center justify-center sm:w-1/2 md:w-1/4">
						<div className="text-18px ">{stat?.heading}</div>
						<div className="text-30px font-medium">{stat?.content}</div>
					</div>
				))}
			</div>
		</div>
	);
}

export function DateAndShare({ date, modified, isEvent = false, isGated, gated_content, hide_share_buttons = false, author, hide_author = false }) {
	const { t } = useTranslation();
	return (
		<div className={`text-16px mt-4 ${!isEvent && `mt-[33px]`} ${isGated && "flex flex-wrap md:gap-y-6 "} `}>
			{!isGated && (
				<div className="flex">
					{date && !isEvent && <div className="font-semibold">{moment(date).format("Do MMM YYYY")}</div>}

					{modified && !isEvent && moment(modified).format("DD/MM/YY") !== moment(date).format("DD/MM/YY") && (
						<div className="ml-5 opacity-40">
							{t("Updated")}: {moment(modified).format("Do MMM YYYY")}
						</div>
					)}
				</div>
			)}

			{isGated && (
				<div className="text-18px -mb-4 flex flex-wrap items-center">
					{gated_content?.date && (
						<div className="mr-[38px] mb-4">
							<div>{t("Date")}</div>
							<div className="text-24px font-medium lg:text-[30px]" dangerouslySetInnerHTML={{ __html: gated_content?.date }} />
						</div>
					)}
					{gated_content?.startTime && (
						<div className="mr-[38px] mb-4">
							<div>{t("Start Time")}</div>
							<div className="text-24px font-medium lg:text-[30px]" dangerouslySetInnerHTML={{ __html: gated_content?.startTime }} />
						</div>
					)}
					{gated_content?.location && (
						<div className="mb-4 w-full">
							<div>{t("Location")}</div>
							<div className="text-24px font-medium lg:text-[30px]" dangerouslySetInnerHTML={{ __html: gated_content?.location }} />
						</div>
					)}
				</div>
			)}
			<div className="mt-4 items-center justify-between md:flex">
				{!isGated && !hide_author && author?.name && (
					<div className="flex items-center">
						{author?.acf?.custom_profile_image ? (
							<Image
								className="mr-3 h-9 w-9 overflow-hidden rounded-full"
								objectFit="cover"
								imgClassName="w-full h-full"
								objectPosition="center"
								image={author?.acf?.custom_profile_image}
							/>
						) : null}
						<div className="text-16px font-semibold tracking-tight">
							{t("By")} {author?.name}
						</div>
					</div>
				)}
				{!hide_share_buttons && (
					<div className={`mt-6 flex items-center space-x-[13px] md:mt-0 ${isGated && "mt-5 md:mt-0"}`}>
						<p>{t("Share")}</p>
						<ShareLinks />
					</div>
				)}
			</div>
		</div>
	);
}

export function PodcastPlayer({ content }) {
	const [play, setPlay] = useState(false);

	return (
		<div className="absolute bottom-0 left-0 right-0 mx-auto px-5 ">
			<div className="container mb-[-67px] flex min-h-[154px]   max-w-[1200px] flex-wrap items-center justify-between gap-y-12 rounded-[15px] bg-grey py-[40px] px-[30px] md:mb-[-104px] md:min-h-[200px] md:py-[54px] md:px-[56px]">
				{!play ? (
					<img
						src={PlayIcon}
						alt="play icon"
						onClick={() => setPlay(true)}
						onKeyPress={(e) => e}
						className=" h-[55px] w-[55px] cursor-pointer transition-transform duration-150 hover:scale-[0.975] md:h-[105px] md:w-[105px]"
					/>
				) : (
					<Video {...content?.video} />
				)}
			</div>
		</div>
	);
}

function ShareButton(props) {
	return (
		<LazyMotion features={domAnimation}>
			<m.div
				whileTap={{ scale: 0.97 }}
				whileHover={{ opacity: 0.75 }}
				className={`${props?.bgColor} banner-safari-fix social group relative flex h-9 w-9  cursor-pointer items-center justify-center rounded-full shadow-md transition-colors duration-300 ease-in-out hover:text-purple focus:outline-none`}
			>
				{props?.children}
			</m.div>
		</LazyMotion>
	);
}

const ShareLinksContainer = styled.div`
	svg {
		height: 17px;
		width: 17px;
	}
`;

export function ShareLinks({ bgColor = "bg-white", iconColor = "text-black" }) {
	const [shareURL, setShareURL] = useState(null);

	useEffect(() => {
		const url = typeof window !== "undefined" ? window.location.href : "";
		if (url) {
			setShareURL(url);
		}
	}, []);

	return (
		<ShareLinksContainer className="flex space-x-[10px] text-black">
			<ShareButton bgColor={bgColor}>
				<FacebookShareButton url={shareURL} className="absolute top-0 left-0 right-0 bottom-0 z-10 h-full w-full focus:outline-none" />
				<FacebookSVG className={iconColor} />
			</ShareButton>

			<ShareButton bgColor={bgColor}>
				<TwitterShareButton url={shareURL} className="absolute top-0 left-0 right-0 bottom-0 z-10 h-full w-full focus:outline-none" />
				<TwitterSVG className={iconColor} />
			</ShareButton>

			<ShareButton bgColor={bgColor}>
				<LinkedinShareButton url={shareURL} className="absolute top-0 left-0 right-0 bottom-0 z-10 h-full w-full focus:outline-none" />
				<LinkedInSVG className={iconColor} />
			</ShareButton>
		</ShareLinksContainer>
	);
}
