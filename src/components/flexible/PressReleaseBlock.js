import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { TextLink, Button } from "~/components/elements/Button";
import { Link } from "~/components/elements/links/Link";
import { Section } from "~/components/elements/Section";
import TextCard from "~/components/elements/TextCard";
import usePressReleases from "~/hooks/usePressReleases";

export default function PressReleaseBlock({ section, layout, text_card, posts_to_display }) {
	return (
		<Section {...section}>
			<div className="container">
				<PressReleaseBlockInner layout={layout} text_card={text_card} posts_to_display={posts_to_display} />
			</div>
		</Section>
	);
}

export function PressReleaseBlockInner({ layout, text_card, posts_to_display, featuredPressReleases, cta, contentMaxWidth }) {
	const { t } = useTranslation();
	const allPressReleases = usePressReleases();
	const [showMore, setShowMore] = useState(8);

	const latestPostLayout = layout === "latest-posts";
	const allPostLayout = layout === "all-posts";

	const releases = featuredPressReleases || allPressReleases?.slice(0, latestPostLayout ? posts_to_display : showMore);
	return (
		<>
			<div className="">
				<TextCard {...text_card} />
			</div>
			<div className="mt-10 md:mt-[80px]">
				<div className="grid grid-cols-1 gap-x-[27px] gap-y-[40px] sm:grid-cols-2 md:grid-cols-3 md:gap-y-[60px] lg:grid-cols-4">
					{releases?.map((press, i) => (
						<PressReleasePreview key={i + press.post_title} {...press} />
					))}
				</div>
				{allPostLayout && allPressReleases?.length > showMore && (
					<Button className="mt-12 md:mt-20" size="huge" onClick={() => setShowMore(showMore + 4)}>
						{t("Load more")}...
					</Button>
				)}
			</div>
			{cta ? <PressSectionCta {...cta} contentMaxWidth={contentMaxWidth} /> : null}
		</>
	);
}

export function PressSectionCta({ heading, description, link, contentMaxWidth }) {
	return (
		<Link
			href={link.url}
			className="mt-12 block w-full rounded-[5px] bg-light-purple py-[25px] px-[25px] transition-shadow duration-300 hover:shadow-lg md:mt-20 md:rounded-[15px] md:py-[50px] md:px-[60px]"
		>
			<div className="items-center md:flex">
				<div className={`space-y-4 md:pr-4 ${contentMaxWidth || `max-w-[480px]`}`}>
					<h3 className="font-bold">{heading}</h3>
					<p className="text-18px">{description}</p>
				</div>
				<div className="ml-auto mt-4 md:mt-0">
					<Link link={link} type="text" />
				</div>
			</div>
		</Link>
	);
}

export function PressReleasePreview({ post_title, permalink, post_date_gmt, acf }) {
	const url = acf?.link_url || permalink;
	return (
		<Link className="group !pointer-events-auto !flex flex-col" href={url} target={acf?.link_url ? "_blank" : ""}>
			<div className="flex-1 space-y-2">
				<div className="text-14px font-medium opacity-60">{post_date_gmt}</div>
				<div className="text-20px font-medium leading-[1.25] tracking-[-0.02em] " dangerouslySetInnerHTML={{ __html: post_title }} />
			</div>
			<div className="mt-5">
				<TextLink>Read Article</TextLink>
			</div>
		</Link>
	);
}
