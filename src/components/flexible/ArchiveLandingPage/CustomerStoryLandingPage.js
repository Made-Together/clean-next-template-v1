import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { Link } from "~/components/elements/links/Link";
import React, { useState } from "react";
import styled from "styled-components";
import { Button, TextLink } from "~/components/elements/Button";
import Image from "~/components/elements/Image";
import Stats from "~/components/elements/Stats";
import TextCard from "~/components/elements/TextCard";
import PurpleCTA from "~/components/global/PurpleCTA";
import useCustomerStories from "~/hooks/useCustomerStories";

export default function CustomerStoryLandingPage(props) {
	const { featured_customer_stories_header, featured_customer_stories, stats, all_customer_stories_header } = props.customer_story_landing_page;
	const allCustomerStories = useCustomerStories();
	const featuredCustomerStoriesIds = featured_customer_stories.map((fcs) => fcs.ID);

	const restCustomerStories = allCustomerStories.filter((cs) => !featuredCustomerStoriesIds.includes(cs.ID));

	return (
		<>
			<CustomerStoriesGrid textCard={featured_customer_stories_header?.text_card} posts={featured_customer_stories} />
			<div className="my-20 md:my-32">
				<Stats stats={stats} paddingTop paddingBottom />
			</div>
			<CustomerStoriesGrid textCard={all_customer_stories_header?.text_card} posts={restCustomerStories} showSearch />
			<PurpleCTA />
		</>
	);
}

export function CustomerStoriesGrid({ posts, title, showSearch = false, textCard }) {
	const { t } = useTranslation();
	const [showMore, setShowMore] = useState(6);
	const [filter] = useState(null);

	if (!posts || posts.length === 0) return null;
	const filteredPosts = filter ? posts.filter((post) => post?.customerStoriesCategory?.nodes?.some((cat) => cat?.slug === filter)) : posts;

	return (
		<div className="container my-20 md:my-32">
			{textCard?.heading && (
				<header className="mb-14">
					<TextCard {...textCard} />
				</header>
			)}
			{title && <h2 className="text-h2 mb-[40px] md:mb-[69px]">{title}</h2>}
			{/* {showSearch && (
        <CustomerStoriesCategorySearch posts={posts} setFilter={setFilter} filter={filter} />
      )} */}
			<ul className="grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-[24px] md:gap-y-[56px] ">
				<AnimatePresence>
					{filteredPosts?.slice(0, showMore)?.map((post, i) => (
						<motion.li
							key={`filtered-post-${i}`}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.35, delay: (i * 0.1) % (showMore * 0.1) }}
							className="group flex flex-col"
						>
							<CustomerStoryPreview {...post} />
						</motion.li>
					))}
				</AnimatePresence>
			</ul>

			{showSearch && filteredPosts?.length > showMore && (
				<Button className="mt-12 md:mt-20" size="huge" onClick={() => setShowMore(showMore + 6)}>
					{t("Load more")}...
				</Button>
			)}
		</div>
	);
}

const StoryTitle = styled.div`
	strong {
		font-weight: 600;
	}
`;
export function CustomerStoryPreview({ permalink, acf }) {
	const { t } = useTranslation();
	return (
		<Link href={permalink} className="flex flex-auto flex-col">
			<div className="flex-1">
				<div className="relative bg-grey">
					<Image image={acf?.preview_image} imgClassName="rounded-[15px] transition-shadow !duration-300 group-hover:shadow-xl" />
					{acf?.preview_logo && (
						<div className="absolute bottom-[20px] left-[20px]">
							<div className="product-shadow max-w-[186px] rounded-[15px] bg-white py-[13px] px-[25px] ">
								<Image image={acf.preview_logo} />
							</div>
						</div>
					)}
				</div>

				<StoryTitle className="text-22px mt-5 leading-[1.215] md:mt-[40px]" dangerouslySetInnerHTML={{ __html: acf?.preview_description }} />
			</div>

			<div className="mt-4 md:mt-[30px]">
				<TextLink>{t("Read customer story")}</TextLink>
			</div>
		</Link>
	);
}

// export const CustomerStoriesCategorySearch = ({ posts, setFilter, filter }) => {
//   const categories = {};
//   posts.map((post) => {
//     if (post?.customerStoriesCategory?.nodes && post?.customerStoriesCategory?.nodes?.length > 0) {
//       post?.customerStoriesCategory?.nodes.map((category) => {
//         categories[category.slug] = category;
//       });
//     }
//   });
//   if (!Object.keys(categories).length === 0) return null;
//   return (
//     <div className="mb-10 md:mb-[90px]">
//       <h2 className="text-h2 mb-5 md:mb-[60px]">All customer stories</h2>
//       <ul className="flex items-center  md:space-x-[30px] overflow-auto whitespace-nowrap">
//         <li>
//           <CategoryLink
//             name="All Stories"
//             onClick={() => setFilter(null)}
//             active={filter === null}
//             disable
//             type="anchor"
//           />
//         </li>
//         {Object.keys(categories).map((key) => {
//           const category = categories[key];
//           return (
//             <CategoryLink
//               key={key}
//               {...category}
//               disable
//               type="anchor"
//               active={filter === category?.slug}
//               onClick={() => setFilter(category?.slug)}
//             />
//           );
//         })}
//       </ul>
//     </div>
//   );
// };
