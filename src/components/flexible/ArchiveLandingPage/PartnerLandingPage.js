import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { motion, AnimatePresence } from "framer-motion";
import Image from "~/components/elements/Image";
import { Link } from "~/components/elements/links/Link";
import { CategoryLink } from "~/components/elements/links/CategoryLink";
import { DropDownSelect } from "~/components/flexible/JobsList";
import usePartners from "~/hooks/usePartners";
import useSpanHeading from "~/hooks/useSpanHeading";
import useCategoriesFromPosts from "~/hooks/useCategoriesFromPosts";

export default function PartnerLandingPage(props) {
	const { t } = useTranslation();
	const { partner_landing_page } = props;
	const posts = usePartners();
	const categories = useCategoriesFromPosts(posts, "partner_category");

	const [filter, setFilter] = useState(null);
	const fiteredPosts = filter ? posts.filter((post) => post?.partner_category?.some((cat) => cat?.slug === filter)) : posts;

	return (
		<div className="container mt-20 md:mt-32" id={partner_landing_page?.ID}>
			{Object.keys(categories).length > 0 && (
				<PartnerCategorySearch posts={posts} {...partner_landing_page} categories={categories} setFilter={setFilter} filter={filter} />
			)}
			<ul className="grid grid-cols-2 gap-[10px] md:grid-cols-3 lg:grid-cols-6">
				<AnimatePresence exitBeforeEnter>
					{fiteredPosts?.map((post, i) => {
						const { post_title, acf, permalink } = post;
						const { has_inner_page, inner_page_published, custom_link, logo } = acf;
						return (
							<motion.a
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0, transition: { delay: i * 0.01 } }}
								exit={{ opacity: 0, y: -10, transition: { delay: i * 0.007 } }}
								href={has_inner_page ? (custom_link?.length > 0 ? custom_link : inner_page_published ? permalink : "#") : "#"}
								target={custom_link?.length && !/^\/(?!\/)/.test(custom_link) ? "_blank" : ""}
								className={`group block h-full select-none ${!has_inner_page || !inner_page_published ? "pointer-events-none cursor-default" : ""}`}
								key={post_title + i + filter}
								rel="noreferrer"
							>
								<div className="!flex h-full w-full items-center bg-grey">
									<Image image={logo} width={136} height={50} className="w-full p-5 px-7" imgClassName="max-h-[50px] w-full" />
								</div>
							</motion.a>
						);
					})}
				</AnimatePresence>
			</ul>

			<div className="mt-12">
				<Link type="text" link={{ url: "/integrations/", title: t("Explore our integrations") }} />
			</div>
		</div>
	);
}

// @todo make this generic with the customer stories one
export function PartnerCategorySearch({ categories, heading, description, setFilter, filter }) {
	const { t } = useTranslation();

	return (
		<div className="mb-[40px]">
			<div className="mb-5 md:mb-[60px]">
				<h2
					className="text-h2 max-w-[376px]"
					dangerouslySetInnerHTML={{
						__html: useSpanHeading(heading, "underline-stroke underline-stroke-orange"),
					}}
				/>
				{description && <div className="mt-5 max-w-[570px] space-y-4" dangerouslySetInnerHTML={{ __html: description }} />}
			</div>
			<ul className="hidden max-w-full select-none items-center overflow-x-auto whitespace-nowrap md:flex md:space-x-[24px]">
				<li>
					<CategoryLink name={t("All Partners")} onClick={() => setFilter(null)} active={filter === null} disable type="anchor" />
				</li>

				{Object.keys(categories).map((key) => {
					const category = categories[key];
					return (
						<li key={`partner-category-${key}`}>
							<CategoryLink disable type="anchor" {...category} active={filter === category?.slug} onClick={() => setFilter(category?.slug)} />
						</li>
					);
				})}
			</ul>
			<div className="md:hidden">
				<DropDownSelect rounded defaultOption={t("All Partners")} onChange={(e) => setFilter(e.target.value || null)}>
					{Object.keys(categories).map((key) => {
						const category = categories[key];
						return (
							<option key={`mobile-partner-category-${key}`} value={category?.slug} selected={filter === category?.slug}>
								{category.name}
							</option>
						);
					})}
				</DropDownSelect>
			</div>

			<div className="mt-[40px] h-[1px] w-full bg-black opacity-20" />
		</div>
	);
}
