import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import React, { useEffect, useState } from "react";
import Accordion from "~/components/elements/Accordion";
import { Button, TextLink } from "~/components/elements/Button";
import { BigPlus, CrossBlack, ModalClose } from "~/components/elements/Icon";
import Image from "~/components/elements/Image";
import { Link } from "~/components/elements/links/Link";
import { Section } from "~/components/elements/Section";
import { FAQsInner, normalizeAccordionData } from "~/components/flexible/FAQs";
import { PressReleaseBlockInner } from "~/components/flexible/PressReleaseBlock";
import { PostCategory } from "~/components/post/PostPreview";
import LinkedInSVG from "~/assets/images/social/linkedin-basic.inline.svg";
import Video from "~/components/elements/Video";
import ASXAnnouncements from "~/components/flexible/ASXAnnouncements";
import useYourir from "~/hooks/useYourir";
import useInvestorVideos from "~/hooks/useInvestorVideos";

export default function PageInvestorRelations({ investor_relations_options }) {
	const scriptStatus = useYourir("https://yourir.info/a9c1d5d553a012b2.js");
	const [scriptLoaded, setScriptLoaded] = useState(false);

	useEffect(() => {
		if (scriptStatus === "ready") {
			setTimeout(() => setScriptLoaded(true), 2500);
		}
	}, [scriptStatus]);

	const sections = {
		shares: {
			backgroundColor: "grey",
			tabTitle: investor_relations_options.shares.tab_title,
			component: <SharesSection {...investor_relations_options.shares} scriptLoaded={scriptLoaded} />,
		},
		announcements: {
			tabTitle: investor_relations_options.announcements.tab_title,
			component: <ASXAnnouncements scriptLoaded={scriptLoaded} short {...investor_relations_options?.announcements} />,
		},
		reports: {
			backgroundColor: "grey",
			tabTitle: investor_relations_options.reports.tab_title,
			component: <ReportsSection {...investor_relations_options.reports} />,
		},
		videos: {
			tabTitle: investor_relations_options.videos.tab_title,
			component: <VideosSection {...investor_relations_options.videos} />,
		},
		press: {
			backgroundColor: "grey",
			tabTitle: investor_relations_options.press.tab_title,
			component: <PressSection {...investor_relations_options.press} />,
		},
		board: {
			tabTitle: investor_relations_options.board.tab_title,
			component: <BoardSection {...investor_relations_options.board} />,
		},
		governance: {
			backgroundColor: "grey",
			tabTitle: investor_relations_options.governance.tab_title,
			component: <GovernanceSection {...investor_relations_options.governance} />,
		},
		faq: {
			tabTitle: investor_relations_options.faq.tab_title,
			component: <FaqSection {...investor_relations_options.faq} />,
		},
		enquiries: {
			backgroundColor: "grey",
			tabTitle: investor_relations_options.enquiries.tab_title,
			component: <EnquiriesSection {...investor_relations_options.enquiries} />,
		},
	};

	const sectionKeys = Object.keys(sections);

	return (
		<div className="relative">
			{/* Tabs */}
			<Tabs items={sectionKeys} sections={sections} />
			{/* Content sections */}
			{sectionKeys.map((section, i) => {
				// Get previous and next bg colors
				const prevIndex = sectionKeys[i - 1];
				const previousSection = prevIndex
					? {
							background_color: sections[prevIndex].background_color,
					  }
					: null;
				const nextIndex = sectionKeys[i + 1];
				const nextSection = nextIndex
					? {
							background_color: sections[nextIndex].background_color,
					  }
					: null;

				if (section === "shares") {
					return sections[section].component;
				}

				return (
					<Section
						key={`content-${section}`}
						id={section}
						background_color={sections[section].background_color || null}
						previous_section={previousSection}
						next_section={nextSection}
					>
						<div className="container">{sections[section].component ? sections[section].component : null}</div>
					</Section>
				);
			})}
		</div>
	);
}

function Tabs({ items, sections }) {
	return (
		<div className="sticky top-[69.5px] z-[3] hidden bg-dark-green text-white transition-colors duration-300 md:block">
			<div className="container">
				<ul className="space-x-4 text-center lg:space-x-7">
					{items.map((section) => {
						if (!sections[section].tabTitle) return null;
						return (
							<li className="text-14px lg:text-16px inline-block pt-5 pb-6 font-medium" key={`tab-${section}`}>
								<a className="transition-color duration-300 hover:text-purple" href={`#${section}`}>
									{sections[section].tabTitle}
								</a>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

function SharesSection({ heading, scriptLoaded }) {
	const [sectionVisible, setSectionVisible] = useState(false);
	React.useEffect(() => {
		if (sectionVisible) {
			setTimeout(() => {
				// eslint-disable-next-line
				window?.yourir?.setupFormatting && window?.yourir?.setupFormatting();
			}, 200);
		}
	}, [sectionVisible]);

	return (
		<>
			<div className="flex h-[169px] flex-col items-center justify-center bg-grey text-center" style={{ display: scriptLoaded ? "none" : "flex" }}>
				<div className="lds-ellipsis">
					<div />
					<div />
					<div />
					<div />
				</div>
			</div>

			<section id="shares" style={{ display: !scriptLoaded ? "none" : "block" }}>
				<div className="relative bg-grey">
					<div className="container py-8 md:py-12">
						<div className="items-center space-y-4 lg:mr-20 lg:flex lg:space-y-0 ">
							<div>
								<h4 className="text-26px max-w-[250px]">Boson Protocol Holdings Limited (ASX:BTH).</h4>
							</div>
							<div className="ml-auto">
								<div className="text-35px font-semibold">
									<span data-yourir="price" />
								</div>
								<h6 className="text-20px font-normal opacity-80">Price (AUD)</h6>
							</div>
							<div className="lg:ml-20">
								<div className="text-35px font-semibold">
									<span data-yourir="change">
										<span data-yourir="pctChange minDecimals='0'" />
									</span>
								</div>
								<h6 className="text-20px font-normal opacity-80">
									as at <span data-yourir="lastTradeTime format='Do MMM YYYY h:mm A'" /> (ACST)
								</h6>
							</div>
						</div>
					</div>

					<div
						className="group absolute left-[50%] top-[100%] mt-[-55px] ml-[-67.5px] cursor-pointer select-none text-center"
						onClick={() => setSectionVisible(!sectionVisible)}
					>
						<div className="scale-[0.8] md:scale-[1]">
							<BigPlus minus={sectionVisible} />
						</div>
						<span className="text-14px mt-[-18px] block opacity-80 group-hover:text-purple">{sectionVisible ? "Hide" : "See"} chart</span>
					</div>
				</div>

				<motion.div id="charts" className="overflow-hidden" animate={{ height: sectionVisible ? "auto" : "0px" }}>
					<div className="border-b-border-grey container border-b py-12 md:py-20 lg:py-24">
						<h2 className="text-h3">{heading}</h2>
						<table className="yourir-summary-table mt-8 mb-10 md:mt-16">
							<tbody>
								<tr>
									<td>Price</td>
									<td>Movement +/-</td>
									<td>Volume</td>
									<td>52 Week Range</td>
									<td>Market Cap.</td>
								</tr>
								<tr>
									<td>
										<span data-yourir="price" />
									</td>
									<td>
										<span data-yourir="change">
											<span data-yourir="pctChange" />
										</span>
									</td>
									<td>
										<span data-yourir="volume" />
									</td>
									<td>
										<span data-yourir="yearLow" /> / <span data-yourir="yearHigh" />
									</td>
									<td>
										<span data-yourir="marketCap scale=true" />
									</td>
								</tr>
							</tbody>
						</table>
						<div data-yourir="priceComparisonChart1 height=500 range=3m announcements.visible=false">
							<div className="price-chart" data-yourir="plots" />
							<div className="mt-6 space-y-4 rounded-[5px] border border-grey px-6 py-5 md:mt-16 md:rounded-[15px] lg:flex lg:space-y-0 lg:space-x-12 lg:py-[32px] lg:px-[36px]">
								<div className="flex-1">
									<h5 className="text-18px font-bold">Range</h5>
									<div className="yourir-toggle-buttons">
										{[
											{ value: "1d", label: "Today" },
											{ value: "1w", label: "1 Week" },
											{ value: "1m", label: "1 Month" },
											{ value: "3m", label: "3 Months" },
											{ value: "6m", label: "6 Months" },
											{ value: "1y", label: "1 Year" },
										].map((setting) => (
											<button type="button" key={setting.value} data-yourir="range" value={setting.value}>
												{setting.label}
											</button>
										))}
									</div>
								</div>
								<div className="flex-1">
									<h5 className="text-18px font-bold">Show</h5>
									<div className="yourir-toggle-buttons">
										<button type="button" data-yourir="volume.visible" className="volume">
											Volume
										</button>
										<button type="button" data-yourir="announcements.visible" className="news">
											News
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</section>
		</>
	);
}

function ReportsSection({ heading, featured_financial_reports }) {
	const { t } = useTranslation();
	const [page, setPage] = useState(0);

	if (!featured_financial_reports) return null;

	const perPage = 4;
	const initialVisible = 4;
	const showMoreButton = featured_financial_reports.length > 4 + page * perPage;
	return (
		<>
			<h2 className="text-h2 max-w-[580px]">{heading}</h2>
			<div className="mt-10 md:mt-16 md:flex">
				<div className="md:w-2/5 lg:w-1/2">
					<ReportsSectionItem isLarge {...featured_financial_reports[0]} />
				</div>
				{featured_financial_reports && (
					<div className="border-l-border-grey flex-1 flex-col justify-between space-y-4 pt-4 md:ml-6 md:flex md:space-y-0 md:border-l md:pt-0 md:pl-6 lg:ml-14 lg:pl-14">
						{featured_financial_reports.slice(1, initialVisible).map((financialReport, i) => (
							<ReportsSectionItem isLast={i === featured_financial_reports.length - 1} isLarge={false} key={`financial-report-${i}`} {...financialReport} />
						))}
					</div>
				)}
			</div>
			{page > 0 && (
				<div className="mt-6 grid grid-cols-1 gap-12 gap-y-0 lg:grid-cols-2">
					{featured_financial_reports &&
						featured_financial_reports
							.slice(initialVisible, initialVisible + perPage * page)
							.map((financialReport, i) => <ReportsSectionItem isLarge={false} key={`fin-report-${i}`} {...financialReport} />)}
				</div>
			)}
			{showMoreButton && (
				<div className="mt-12 md:mt-16" onClick={() => setPage(page + 1)}>
					<Button className="cursor-pointer" link={{ title: t("Load more") }} size="wide" />
				</div>
			)}
		</>
	);
}

function ReportsSectionItem({ isLarge, post_title, featured_image, acf, financial_report_type }) {
	if (!acf) return null;
	const { description, file } = acf;
	return (
		<a
			download
			className={`group block  ${
				isLarge ? " border-b pb-4 md:border-none md:pb-0" : "flex-row-reverse items-center border-b pb-4 md:flex md:py-8"
			} border-b-border-grey`}
			href={file?.url}
		>
			{isLarge && featured_image && (
				<div
					className={`mb-4 ${
						isLarge ? "md:mb-8" : "md:mb-0 md:ml-4 md:w-[100px]"
					} overflow-hidden rounded-[5px] transition-opacity duration-300 group-hover:opacity-80 md:rounded-[15px]`}
				>
					<Image
						objectFit="cover"
						imgClassName={`aspect-[3/2] ${isLarge ? "md:aspect-[5.8/3]" : "md:aspect-[1/0.8]"}`}
						image={{ src: featured_image.src, width: 600, height: 340 }}
					/>
				</div>
			)}
			<div className="flex-1 space-y-3">
				<h6 className={`text-12px uppercase ${isLarge ? "md:text-15px" : ""} font-bold opacity-60`}>
					{financial_report_type && financial_report_type[0]?.name}
				</h6>
				<h4 className="text-22px" dangerouslySetInnerHTML={{ __html: post_title }} />
				{isLarge && <p className="text-16px hidden opacity-60 md:block" dangerouslySetInnerHTML={{ __html: description }} />}
			</div>
		</a>
	);
}

function VideosSection({ heading }) {
	const { t } = useTranslation();
	const investorVideos = useInvestorVideos();
	const [page, setPage] = useState(0);
	const perPage = 4;
	const initialVisible = 4;
	const showMoreButton = investorVideos?.length > 4 + page * perPage;

	return (
		<>
			<h2 className="text-h2" dangerouslySetInnerHTML={{ __html: heading }} />
			<ul className="mt-12 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-2 md:gap-y-12 lg:gap-y-14">
				{investorVideos?.slice(0, initialVisible + perPage * page)?.map((post, i) => (
					<div key={`iv${i}`}>
						<Video
							display_type="modal"
							{...post?.acf?.content}
							video_modal={{
								placeholder_image: post?.acf?.content?.placeholder_image,
								placeholder_image_aspect_ratio: true,
								placeholder_image_wrapper_classname: "border border-grey",
							}}
						>
							<div className="mt-7">
								<div className="flex-auto space-y-3">
									<PostCategory>{post?.post_date_gmt}</PostCategory>
									<h4 className="text-22px mr-10 font-medium" dangerouslySetInnerHTML={{ __html: post.post_title }} />
									<div className="text-16px mr-8 opacity-60" dangerouslySetInnerHTML={{ __html: post.acf.preview_teaser }} />
									<TextLink>{t("Watch now")}</TextLink>
								</div>
							</div>
						</Video>
					</div>
				))}
			</ul>

			{showMoreButton && (
				<div className="mt-12 md:mt-16" onClick={() => setPage(page + 1)}>
					<Button className="cursor-pointer" link={{ title: t("Show more videos") }} size="wide" />
				</div>
			)}
		</>
	);
}

function PressSection({ heading, cta }) {
	return <PressReleaseBlockInner text_card={{ heading }} cta={cta} contentMaxWidth="max-w-[600px]" layout="latest-posts" posts_to_display={4} />;
}

function BoardSection(props) {
	const { heading, featured_team_members } = props;
	const [openModal, setOpenModal] = useState(false);
	const [activeMember, setActiveMember] = useState(null);

	const modalHandler = (i) => {
		setOpenModal(true);
		setActiveMember(i);
	};

	return (
		<LayoutGroup>
			<h2 className="text-h2">{heading}</h2>
			<ul className="mt-12 grid grid-cols-1 gap-6 gap-y-8 md:mt-20 md:grid-cols-2 md:gap-y-12 lg:grid-cols-3">
				{featured_team_members?.map((teamMember, i) => (
					<BoardSectionTeamMember
						key={`board-member-${i}`}
						i={i}
						name={teamMember.post_title}
						modalHandler={modalHandler}
						setOpenModal={setOpenModal}
						setActiveMember={setActiveMember}
						{...teamMember.acf}
					/>
				))}
			</ul>
			<AnimatePresence>
				{openModal && <BoardMemberModal setOpenModal={setOpenModal} members={featured_team_members} activeMember={activeMember} />}
			</AnimatePresence>
		</LayoutGroup>
	);
}

function BoardMemberModal({ setOpenModal, members, activeMember }) {
	const member = members[activeMember];
	const { t } = useTranslation();
	return (
		<motion.div
			key="modal"
			style={{ willChange: "opacity" }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={() => setOpenModal(false)}
			className="fixed inset-0 z-[1000] flex h-screen w-full flex-col items-end overflow-y-scroll bg-[#000000] bg-opacity-60"
		>
			<motion.div
				initial={{ x: "100%" }}
				animate={{ x: 0 }}
				exit={{ x: "100%" }}
				transition={{ duration: 0.2 }}
				onClick={(e) => e.stopPropagation()}
				className="flex w-full max-w-[708px] flex-1 justify-center bg-white px-6 lg:pl-[102px] lg:pr-[120px]"
			>
				<div className="fixed top-[10px] right-[10px] z-10 cursor-pointer md:top-[30px] md:right-[30px]" onClick={() => setOpenModal(false)}>
					<div className="cursor-pointer justify-center rounded-full border border-black border-opacity-[0.17] p-[14px] transition-colors duration-150 hover:border-opacity-100 hover:text-purple">
						<ModalClose />
					</div>
				</div>
				<div className="w-full max-w-[488px] py-12 pt-20 md:pt-12">
					<div className="w-full overflow-hidden rounded-[15px]">
						<Image image={member?.acf?.image} className="w-full  rounded-[15px]" imgClassName="w-full  " />
					</div>

					<div className="mt-[30px] flex items-start justify-between">
						<div>
							<h4 className="text-22px mb-1.5 font-medium">{member?.post_title}</h4>
							<h5 className="text-16px mb-1.5 opacity-60">{member?.acf?.position}</h5>
							<h6 className="text-14px font-normal opacity-40">{member?.acf?.second_position}</h6>
						</div>
						{member?.acf?.linkedin && (
							<a
								href={member?.acf?.linkedin}
								target="_blank"
								className="flex cursor-pointer items-center justify-center rounded-full border border-black border-opacity-[0.17] py-[9px] pl-[9px] pr-[8px] transition-colors duration-150 hover:border-opacity-60 hover:text-purple "
								rel="noreferrer"
							>
								<LinkedInSVG />
							</a>
						)}
					</div>
					{member?.acf?.introduction && (
						<div className="text-16px mt-[45px] font-medium ">
							<div className="">{t("Brief Introduction")}</div>
							<div className="mt-[7px] opacity-60">
								<div className="text-16px prose font-normal " dangerouslySetInnerHTML={{ __html: member?.acf?.introduction }} />
							</div>
						</div>
					)}
					{/* @todo: figure out if this is supposed to be link or accordion */}
					{member?.acf?.learn_more_link?.title && member?.acf?.learn_more_link?.url && (
						<div className="mt-[50px]">
							<a href={member?.acf?.learn_more_link?.url} target="_blank" rel="noopener noreferrer" className="block">
								<div className="flex items-center justify-between">
									<div className="text-15px font-medium ">{member?.acf?.learn_more_link?.title}</div>
									<CrossBlack />
								</div>
								<div className="mt-[13px] h-px w-full bg-black bg-opacity-[0.17]" />
							</a>
						</div>
					)}
				</div>
			</motion.div>
		</motion.div>
	);
}

function BoardSectionTeamMember({ name, image, position, preview_description, linkedin, second_position, modalHandler, i }) {
	return (
		<motion.li key={`tm${i}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.15 }}>
			<header className="">
				<div
					onClick={() => modalHandler(i)}
					className="trans cursor-pointer overflow-hidden rounded-[5px] !duration-300 hover:opacity-90 hover:shadow-xl md:rounded-[15px]"
				>
					<Image objectFit="cover" className="aspect-[1/1] w-full" image={image} />
				</div>
				<div className="mt-5 mb-1 flex items-center space-x-4 md:mb-3 md:mt-7">
					<div className="flex-auto">
						<h4
							onClick={() => modalHandler(i)}
							className="text-22px trans inline-block cursor-pointer font-medium hover:opacity-90"
							dangerouslySetInnerHTML={{ __html: name }}
						/>
					</div>
					{linkedin && (
						<div className="scale-[1.2]">
							<a
								href={linkedin}
								target="_blank"
								className="flex cursor-pointer items-center justify-center rounded-full border border-black border-opacity-[0.17] py-[8px] pl-[8px] pr-[7px] transition-colors duration-150 hover:border-opacity-60 hover:text-purple "
								rel="noreferrer"
							>
								<LinkedInSVG />
							</a>
						</div>
					)}
				</div>
			</header>
			<div className="text-16px space-y-2">
				{position && <h5 dangerouslySetInnerHTML={{ __html: position }} />}
				<div className="space-y-1 leading-tight opacity-60">
					{second_position && <div dangerouslySetInnerHTML={{ __html: second_position }} />}
					{preview_description && <div dangerouslySetInnerHTML={{ __html: preview_description }} />}
				</div>
			</div>
		</motion.li>
	);
}

export function GovernanceSection({ heading, items }) {
	return <FAQsInner heading={heading} items={items} />;
}

function FaqSection({ heading, help_link, help_title, items }) {
	return items ? (
		<div className="mx-auto max-w-[790px]">
			<Accordion centerHeading heading={heading} accordionItems={items.map(normalizeAccordionData)} disableInternalSpacing />
			<div className="mt-10 items-center space-y-4 text-center md:mt-12 md:flex md:space-y-0 md:text-left">
				<h4 className="text-[20px] md:text-[30px]">{help_title}</h4>
				{help_link && help_link?.url && (
					<div className="ml-auto">
						<Link href={help_link?.url}>
							<TextLink link={help_link} />
						</Link>
					</div>
				)}
			</div>
		</div>
	) : null;
}

function EnquiriesSection({ heading, description, contacts }) {
	return (
		<>
			<div className="mx-auto mb-8 max-w-[700px] space-y-3 text-center md:mb-12 lg:mb-24">
				<h2 className="text-h2">{heading}</h2>
				{description && <p className="text-20px">{description}</p>}
			</div>
			<div className="grid grid-cols-1 gap-4 text-center md:grid-cols-2 md:gap-8">
				{contacts?.map((contact, i) => (
					<div
						key={`contact-${i}`}
						className="flex-1 rounded-[5px] bg-white py-12 px-4 transition-shadow duration-300 hover:shadow-lg md:rounded-[15px] md:py-24"
					>
						<h3 className="text-h4">{contact.name}</h3>
						<h4 className="text-22px mt-3 mb-6 font-normal">
							{contact.description}
							{contact.phone_number && (
								<span className="mt-2 block lg:mt-0 lg:inline-block">
									<span className="hidden lg:inline-block">, </span> <a href={`tel:${contact.phone_number.replace(/\s/g, "")}`}>{contact.phone_number}</a>
								</span>
							)}
						</h4>
						<Link link={contact.link} type="text" />
					</div>
				))}
			</div>
		</>
	);
}
