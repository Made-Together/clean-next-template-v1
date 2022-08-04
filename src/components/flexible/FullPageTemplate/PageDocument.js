import moment from "moment";
import React, { useState } from "react";
import HeroBL from "~/assets/images/background-lines/404-hero-bl.svg";
import HeroTR from "~/assets/images/background-lines/404-hero-tr.svg";
import { CategoryLink } from "~/components/elements/links/CategoryLink";
import PostFlexibleContent from "~/components/post/PostFlexibleContent";
import { DropDownSelect } from "~/components/flexible/JobsList";

export default function PageDocument({ document_page_options }) {
	const { header, title, hero_description, revision_date, flexible_post_content } = document_page_options;
	const [activeAnchor, setActiveAnchor] = useState(0);
	const isLanding = header === "landing";

	return (
		<div>
			<div className={`${isLanding && "bg-dark-green text-center text-white "} relative`}>
				<div className="absolute top-0 right-0">
					<img className="max-h-[300px]" loading="eager" src={HeroBL} alt="hero bg" />
				</div>
				<div className="absolute bottom-0 left-0">
					<div className="max-h-[430px]">
						<HeroTR />
					</div>
				</div>
				<div className={`container pt-36 md:pt-44  ${isLanding && "!pt-20 pb-16 md:!pt-[14rem] md:pb-44"}`}>
					<h1 className="text-h1" dangerouslySetInnerHTML={{ __html: title }} />
					{!isLanding && revision_date && <p className="mt-5 opacity-50">Last updated {moment(revision_date, "DD-MM-YYYY").format("Do MMMM YYYY")}</p>}
					<p className={`${isLanding && "mx-auto mt-5 max-w-[610px]"}`} dangerouslySetInnerHTML={{ __html: hero_description }} />
				</div>
			</div>
			<div className="container  mt-[60px] items-start justify-between pb-20 md:mt-[120px] md:flex md:pb-32 ">
				{/* @todo: mobile version sidebar */}
				<div className="sticky top-[10rem] hidden pr-3 md:block md:w-3/12 md:space-y-[30px]">
					<AnchorLinksSidebar postContent={flexible_post_content} activeAnchor={activeAnchor} setActiveAnchor={setActiveAnchor} />
				</div>
				<div className="block md:hidden">
					<DropDownSelect
						defaultValue={activeAnchor}
						onChange={(e) =>
							document.getElementById(e.target.value).scrollIntoView({
								behavior: "smooth",
							})
						}
					>
						{flexible_post_content?.map(
							(sidebar, i) =>
								sidebar?.acf_fc_layout === "anchor" && (
									<option key={`anchor${i}`} value={sidebar?.slug}>
										{sidebar?.label}
									</option>
								)
						)}
					</DropDownSelect>
				</div>
				<div className="mt-6 md:-mt-12 md:w-2/3 md:pr-10">
					<div className="max-w-[714px]">
						<PostFlexibleContent content={flexible_post_content} />
					</div>
				</div>
			</div>
		</div>
	);
}

export function AnchorLinksSidebar({ postContent, activeAnchor, setActiveAnchor }) {
	return postContent
		? postContent?.map((sidebar, i) =>
				sidebar?.acf_fc_layout === "anchor" ? (
					<div key={`sidebaranchor${i}`} onClick={() => setActiveAnchor(i)}>
						<CategoryLink slug={sidebar?.slug} name={sidebar?.label} type="anchor" active={activeAnchor === i} />
					</div>
				) : null
		  )
		: null;
}
