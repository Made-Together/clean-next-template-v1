import React from "react";
import { useTranslation } from "next-i18next";
import { TextLink } from "~/components/elements/Button";
import Image from "~/components/elements/Image";
import { Link } from "~/components/elements/links/Link";
import { PlayPreview } from "~/components/elements/Icon";

export default function PostPreview(post) {
	const { t } = useTranslation();
	const { post_title, permalink, featured_image, categories = [], acf } = post;

	let category = categories[0]?.name || "";
	if (category === "Uncategorized") {
		category = "";
	}

	return (
		<Link href={permalink} className="group !flex flex-auto flex-col">
			<div className="mb-5 w-full md:mb-8">
				{/* 38 : 23 */}
				<div className="aspect-w-38 aspect-h-23 overflow-hidden rounded-[15px]">
					<div className=" bg-grey">
						{featured_image && (
							<Image
								image={featured_image}
								className="h-full w-full "
								objectFit="cover"
								imgClassName={`w-full h-full object-cover ${category === "Video" ? "transform scale-105 group-hover:scale-100 trans !duration-300" : ""}`}
							/>
						)}

						{category === "Video" && (
							<div className="absolute inset-0 flex h-full w-full items-center justify-center">
								<div className="transition-transform duration-300 group-hover:scale-[1.05]">
									<PlayPreview />
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="flex flex-auto flex-col">
				<div className="flex-auto">
					{category && <PostCategory className="md:mb-5" dangerouslySetInnerHTML={{ __html: category }} />}
					<h4 className="text-22px mt-2 mb-5 font-medium md:max-w-[300px]" dangerouslySetInnerHTML={{ __html: post_title }} />
				</div>
				<div>
					<TextLink>{acf?.read_now_link_title || (category === "Video" ? t("Watch now") : t("Read now"))}</TextLink>
				</div>
			</div>
		</Link>
	);
}

export function PostCategory({ children, className = "", ...other }) {
	return (
		<h6 className={`text-15px font-semibold uppercase tracking-normal opacity-50 ${className}`} {...other}>
			{children}
		</h6>
	);
}
