import React from "react";
import { useTranslation } from "next-i18next";
import { Button, TextLink } from "~/components/elements/Button";
import Image from "~/components/elements/Image";
import { Link } from "~/components/elements/links/Link";
import TextCard from "~/components/elements/TextCard";
import PurpleCTA from "~/components/global/PurpleCTA";
import ResourceFiltering from "~/components/elements/resources/ResourcesFiltering";
import ResourcesGrid from "~/components/elements/resources/ResourcesGrid";
import { PostCategory } from "~/components/post/PostPreview";
import useResources from "~/hooks/useResources";
import useCategories from "~/hooks/useCategories";
import useStore from "~/hooks/useStore";

export default function ResourcesPage({ resources_landing_page }) {
	const resourceSearch = useStore((state) => state.resourceSearch);
	const { filtering, featured, category_list } = resources_landing_page;

	const categories = useCategories();
	const posts = useResources({});
	const categoryListMapped = category_list.map((rs) => {
		const cat = categories.filter((c) => c.id === rs.category_name).pop();
		if (!cat) return null;

		return {
			...rs,
			cat,
			posts: posts?.filter((p) => p.categories && p.categories.filter((postCats) => postCats.slug === cat.slug).length > 0).slice(0, 6),
		};
	});

	return (
		<>
			<div className="relative z-[10]">
				{filtering?.hide_filtering_bar !== true && <ResourceFiltering />}
				{!resourceSearch ? (
					<div>
						{featured.hide_featured_section !== true && (
							<FeaturedSection textCard={featured.text_card} posts={featured.featured_posts.map(({ post }) => post)} />
						)}
						{categoryListMapped &&
							categoryListMapped.map((category, index) => <CategorySection key={`category-section-${index}`} {...category} isOdd={index % 2 === 0} />)}
					</div>
				) : null}
			</div>
			<PurpleCTA />
		</>
	);
}

export function FeaturedSection({ posts = [], textCard }) {
	const firstPost = posts[0];
	const { t } = useTranslation();

	return firstPost ? (
		<section className="container my-24 md:my-28">
			{textCard && (
				<header className="mb-16">
					<TextCard {...textCard} />
				</header>
			)}

			<div>
				<Link href={firstPost?.permalink} className="group flex flex-col items-center rounded-[15px] bg-grey md:flex-row">
					<Image
						image={firstPost?.featured_image}
						className="flex w-full flex-auto  self-stretch rounded-t-[15px] md:max-w-[550px] md:rounded-l-[15px] md:rounded-tr-none"
						imgClassName="rounded-t-[15px] md:rounded-tr-none md:rounded-l-[15px] md:max-w-[550px] w-full h-full"
						objectFit="cover"
						layout="responsive"
					/>

					<div className="w-full">
						<div className="mx-auto py-[50px] pl-[15px] pr-[25px] md:max-w-[470px] md:py-[97px]">
							{firstPost?.categories && firstPost?.categories.length > 0 && <PostCategory>{firstPost?.categories[0]?.name}</PostCategory>}
							<h2 className="text-h2">{firstPost?.post_title}</h2>
							{firstPost?.acf?.preview_teaser && <div className="text-p2 mt-[20px]">{firstPost?.acf?.preview_teaser}</div>}
							<div className="mt-[20px]">
								<TextLink>{firstPost?.acf?.read_now_link_title || t("Read now")}</TextLink>
							</div>
						</div>
					</div>
				</Link>

				{posts?.slice(1) && (
					<div className="mt-[70px]">
						<ResourcesGrid posts={posts?.slice(1)} type="" />
					</div>
				)}
			</div>
		</section>
	) : null;
}

export function CategorySection(props) {
	const { cat, text_card, posts, isOdd } = props;
	if (!cat || posts?.length === 0) return null;

	return (
		<section className={`${isOdd ? "bg-grey" : "bg-white"}`}>
			<div className="container py-20 md:py-28">
				{text_card && (
					<header className="mb-10 md:mb-16">
						<TextCard {...text_card} />
					</header>
				)}
				<ResourcesGrid posts={posts} />
				<Link href={cat.link} className="mt-12 block w-full md:mt-20">
					<Button
						size="huge"
						className={`!border-transparent text-black !duration-500 hover:shadow ${isOdd ? "!bg-white hover:!bg-white" : "!bg-grey hover:!bg-grey"}`}
					>
						Show more
					</Button>
				</Link>
			</div>
		</section>
	);
}
