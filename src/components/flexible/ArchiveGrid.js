import React from "react";
import { useTranslation } from "next-i18next";
import { TextLink } from "~/components/elements/Button";
import Image from "~/components/elements/Image";
import { Link } from "~/components/elements/links/Link";
import { Section } from "~/components/elements/Section";
import TextCard from "~/components/elements/TextCard";

export default function ArchiveGrid(props) {
	const { layout } = props;

	return (
		<>
			{layout === "default" && <DefaultArchiveGrid {...props} />}
			{layout === "resources_default" && <ResourcesDefaultArchiveGrid {...props} />}
			{layout === "industry_guides" && <IndustryGuidesArchiveGrid {...props} />}
			{layout === "image_two_cards" && <ImageTwoCardsArchiveGrid {...props} />}
		</>
	);
}

export function DefaultArchiveGrid({ default: { text_card, items }, section }) {
	return (
		<Section {...section}>
			<div className="container">
				{text_card && (
					<div className="mb-12">
						<TextCard {...text_card} />
					</div>
				)}

				<div className="grid gap-8 md:grid-cols-2">
					{items.map((item, index) => (
						<Link href={item?.link?.url} key={`archive-grid-item-${index}`} className="group flex flex-col">
							<div className="trans group-hover:opacity-90">
								<Image image={item.image} />
							</div>
							<div className="mt-7 flex-auto">
								{item.heading && (
									<div className="mb-3 flex items-center space-x-3">
										<h3 className="text-22px" dangerouslySetInnerHTML={{ __html: item.heading }} />
										{item?.link?.url && !item?.link?.title && <TextLink />}
									</div>
								)}
								<div className="text-18px leading-relaxed" dangerouslySetInnerHTML={{ __html: item.content }} />
								{item?.link?.url && item?.link?.title && (
									<div className="mt-3">
										<TextLink>{item?.link?.title}</TextLink>
									</div>
								)}
							</div>
						</Link>
					))}
				</div>
			</div>
		</Section>
	);
}

export function ResourcesDefaultArchiveGrid({ resources_default: { text_card, items }, section }) {
	const { t } = useTranslation();
	const featured = items[0];
	const rest = items.slice(1);
	return (
		<Section {...section}>
			<div className="container">
				{text_card && (
					<div className="mb-8 sm:mb-10 md:mb-16 md:pb-2">
						<TextCard {...text_card} />
					</div>
				)}

				<div className="grid gap-6 md:grid-cols-2">
					<div className="flex flex-col">
						<Link
							href={featured?.link?.url}
							className="group flex flex-auto flex-col justify-between overflow-hidden rounded-xl bg-grey px-6 pt-12 md:px-12 lg:pt-[70px]"
						>
							<div className="space-y-4">
								<h6 className="text-16px font-medium uppercase opacity-50">{featured?.subheading}</h6>
								<h3 className="text-20px leading-[1.34] md:text-[24px]" dangerouslySetInnerHTML={{ __html: featured?.heading }} />
								<TextLink link={featured?.link} />
							</div>
							{featured?.image && (
								<>
									<div className="mt-14 max-h-[280px]">
										<Image image={featured?.image} />
									</div>
									{/* <pre>{JSON.stringify(featured?.image, null, 4)}</pre> */}
								</>
							)}
						</Link>
					</div>

					<div className="flex flex-col space-y-6">
						{rest.map((item, index) => (
							<Link
								href={item?.link?.url}
								key={`archive-grid-rest-item-${index}`}
								className="group flex flex-auto flex-wrap items-center overflow-hidden rounded-xl bg-grey"
							>
								<div className="w-full md:w-5/12">
									<div className="w-full p-4 pt-12 md:max-w-[250px] md:pt-4">
										<Image image={item.image} />
									</div>
								</div>
								<div className="w-full space-y-4 pb-12 pl-6 pr-4 md:w-7/12 md:py-4 md:pl-2 lg:px-8">
									<h6 className="text-16px font-medium uppercase opacity-50">{item.subheading}</h6>
									<h3 className="text-20px md:text-[24px]" dangerouslySetInnerHTML={{ __html: item.heading }} />
									<TextLink link={item.link} />
								</div>
							</Link>
						))}
					</div>
				</div>

				<div className="mt-10 flex justify-center md:mt-[57px]">
					<Link href="/resources">
						<TextLink link={{ title: t("Explore all our resources") }} />
					</Link>
				</div>
			</div>
		</Section>
	);
}

export function IndustryGuidesArchiveGrid({ industry_guides: { text_card, items }, section }) {
	const featured = items[0];
	const rest = items.slice(1);
	return (
		<Section {...section} className="relative">
			<div className="negative-section-margin container relative z-[1]">
				{text_card && (
					<div className="mb-10 sm:mb-12 md:mb-16 md:pb-2">
						<TextCard {...text_card} />
					</div>
				)}

				<div className="grid gap-6">
					<div className="flex flex-col">
						<div className="flex-auto overflow-hidden rounded-xl bg-light-blue px-8 pt-8 md:px-12 md:pt-12">
							<Link href={featured?.link?.url} className="group -ml-12 flex flex-auto flex-wrap items-center">
								<div className="order-1 w-full pl-12 md:order-none md:w-1/2">
									{featured?.image && (
										<div className="max-w-[379px] bg-white md:mx-auto">
											<Image image={featured?.image} />
										</div>
									)}
								</div>
								<div className="w-full pl-12 md:w-1/2">
									<div className="mx-auto mb-10 space-y-5 md:max-w-md md:space-y-4">
										<h3 className="text-36px" dangerouslySetInnerHTML={{ __html: featured?.heading }} />
										<div className="text-18px leading-relaxed" dangerouslySetInnerHTML={{ __html: featured?.content }} />
										<div className="pt-1.5">
											<TextLink link={featured?.link} />
										</div>
									</div>
								</div>
							</Link>
						</div>
					</div>

					<div className="grid gap-6 md:grid-cols-2">
						{rest.map((item, index) => (
							<Link
								href={item?.link?.url}
								key={`rest${index}`}
								className="group flex flex-col justify-between overflow-hidden rounded-xl bg-white p-8 shadow-lg lg:p-12 xl:pt-16 xl:pr-14 xl:pl-16"
							>
								<div className="-mt-1 flex-auto">
									<div className="space-y-4">
										<div className="h-full max-h-[48px] w-full max-w-[100px]">
											<Image image={item?.image} />
										</div>
										<h3 className="text-22px" dangerouslySetInnerHTML={{ __html: item.heading }} />
										<div className="text-18px" dangerouslySetInnerHTML={{ __html: item.content }} />
									</div>
								</div>

								<div className="mt-4">
									<TextLink link={item.link} />
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>

			<div className={`absolute inset-x-0 bottom-0 z-0 h-20 md:h-40 bg-${section?.next_section?.background_color || "white"}`} />
		</Section>
	);
}

export function ImageTwoCardsArchiveGrid({ image_two_cards: { text_card, image, items }, section }) {
	return (
		<Section {...section}>
			<div className="container">
				{text_card && (
					<div className="mb-14 md:mb-16 md:pb-2">
						<TextCard {...text_card} />
					</div>
				)}

				<div className="grid gap-6 md:grid-cols-2">
					<div className="flex flex-col">
						<Link href={image?.link?.url} className="group !flex flex-auto flex-col overflow-hidden rounded-xl">
							<Image image={image?.image} className="h-full w-full" imgClassName="h-full w-full" objectFit="cover" />
						</Link>
					</div>

					<div className="flex flex-col space-y-6">
						{items.map((item, index) => (
							<Link
								href={item?.link?.url}
								key={`img-two-card-item-${index}`}
								className="group flex flex-auto items-center overflow-hidden rounded-xl bg-white p-8 text-black lg:p-12"
							>
								<div className="space-y-4">
									<h3 className="text-22px" dangerouslySetInnerHTML={{ __html: item.heading }} />
									<div className="text-18px leading-relaxed opacity-80" dangerouslySetInnerHTML={{ __html: item.content }} />
									{item?.link?.url && <TextLink link={item.link} />}
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</Section>
	);
}
