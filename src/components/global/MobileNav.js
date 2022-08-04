import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { FeaturedPost } from "~/components/global/HeaderNav";
import { ChevDown } from "~/components/elements/Icon";
import Image from "~/components/elements/Image";
import { Link } from "~/components/elements/links/Link";
import SocialMedia from "~/components/elements/SocialMedia";
import { useTranslation } from "next-i18next";

export default function MobileNav({ navIsOpen, headerMenu, activeMenu, setActiveMenu }) {
	const { t } = useTranslation();
	return (
		<AnimatePresence>
			{navIsOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2, ease: "easeInOut" }}
					className="text-navy-dark fixed inset-0 top-[60px] z-[50] flex h-[calc(100vh_-_60px)] w-screen flex-col space-y-8 overflow-y-auto bg-white px-6 lg:hidden"
				>
					<nav>
						<ul className="">
							{headerMenu?.map((item, i) => (
								<li key={`menuLink${i}`} className="leading-none">
									<Link
										href={item.link.url}
										target={item.link.target}
										className="text-20px pointer-events-auto flex items-center border-b border-grey py-5 font-medium"
										onClick={
											item.subnav !== "none"
												? (e) => {
														e.preventDefault();
														setActiveMenu(activeMenu === i ? null : i);
												  }
												: undefined
										}
									>
										{item.link.title}
										{item.subnav.columns && item.subnav.columns.length > 0 && (
											<div className={`ml-auto transition-all duration-300 ease-in-out ${activeMenu === i && "rotate-180"}`}>
												<div className="fw-icon w-[14px]">
													<ChevDown />
												</div>
											</div>
										)}
									</Link>

									<AnimatePresence>{activeMenu === i && item.subnav.columns && item.subnav.columns.length > 0 && <Subnav {...item.subnav} />}</AnimatePresence>
								</li>
							))}
						</ul>
					</nav>

					<div className="bg-light-beige -mx-6 flex flex-auto flex-col items-center px-3 py-10 text-center">
						<SocialMedia />
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

function Subnav({ two_columns, columns }) {
	return (
		<div className="subnav text-15px z-50 transform pt-6">
			<div className="relative overflow-hidden rounded bg-white text-black">
				<div className="flex flex-col md:flex-row">
					{columns?.map((column, index) => {
						const isFirst = index === 0;
						return (
							<div key={`mobile-subitem-${index}`} className={`flex flex-auto flex-col ${!isFirst ? "bg-beige rounded-lg p-6 md:max-w-[50%]" : "pr-4"}`}>
								<nav
									className={
										two_columns === true || isFirst
											? `flex flex-auto flex-col ${isFirst ? "mb-6 justify-center space-y-6" : "space-y-4"}`
											: "grid flex-auto items-center gap-4"
									}
								>
									{column?.items &&
										column?.items?.map((item, subnavIndex) => (
											<div key={`subnav${subnavIndex}`}>
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

function SubnavItem({ link, icon, description, type, featured_post }) {
	const isFeaturedPost = description === "{{featuredPost}}";

	return !isFeaturedPost ? (
		<div className="w-full rounded-xl">
			<Link href={link?.url} className="relative flex flex-auto items-center">
				{icon && (
					<Image
						image={icon}
						className={`flex-none ${type === "large" ? "mr-4 h-[55px] w-[55px]" : "mr-3 h-[17px]"} object-contain`}
						imgClassName={type === "large" ? "w-[55px] h-[55px]" : "h-[17px]"}
					/>
				)}
				<div>
					<div className={`font-medium ${type === "large" ? "text-16px !leading-tight" : ""}`} dangerouslySetInnerHTML={{ __html: link?.title }} />
					{description && <div className="opacity-[60%]" dangerouslySetInnerHTML={{ __html: description }} />}
				</div>
			</Link>
		</div>
	) : (
		<FeaturedPost {...featured_post} />
	);
}
