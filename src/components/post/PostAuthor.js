import React from "react";
import { useTranslation } from "next-i18next";
import Image from "~/components/elements/Image";
import Speakers from "~/components/elements/Speakers";
import LinkedinIcon from "~/assets/images/social/profile/linkedin.svg";
import LinkedinIconAlt from "~/assets/images/social/profile/linkedin-alt.svg";
import TwitterIcon from "~/assets/images/social/profile/twitter.svg";
import TwitterIconAlt from "~/assets/images/social/profile/twitter-alt.svg";

export default function PostAuthor({ author }) {
	const { t } = useTranslation();
	const cardStyle = author?.acf?.author_card_style || "default";
	const name = author?.name;
	const role = author?.acf?.role;
	const image = author?.acf?.custom_profile_image;
	const socials = [
		{
			link: author?.acf?.social?.linkedin,
			icon: LinkedinIcon,
			iconDefault: LinkedinIconAlt,
		},
		{
			link: author?.acf?.social?.twitter,
			icon: TwitterIcon,
			iconDefault: TwitterIconAlt,
		},
	].filter((s) => s?.link?.length > 0);

	return cardStyle === "default" ? (
		<div className="my-[60px] mx-auto max-w-[792px] text-center md:text-left">
			<div
				style={{ boxShadow: "0px 10px 20px rgb(29 34 34 / 6%)" }}
				className="mx-auto items-center justify-between rounded-[15px] border  border-black border-opacity-[0.1] p-8 md:flex"
			>
				<div className="flex flex-col items-center md:max-w-[60%] md:flex-row">
					{image && (
						<div className="mb-4 md:mb-0 md:mr-6">
							<div className="h-[75px] w-[75px] overflow-hidden rounded-full">
								<Image image={image} className="h-full w-full" imgClassName="object-cover h-full w-full" objectFit="cover" />
							</div>
						</div>
					)}
					<div>
						{name && <div className="text-18px font-semibold leading-snug" dangerouslySetInnerHTML={{ __html: `${t("By")} ${name}` }} />}
						{role && <div className="text-16px !leading-snug opacity-50">{role}</div>}
					</div>
				</div>

				{/* socials */}
				{socials?.length > 0 && (
					<div className="mx-3 mb-1 mt-8 md:mb-0 md:mt-0">
						<div className="flex items-center justify-center space-x-3">
							<div className="text-16px whitespace-nowrap">
								{t("Follow on social")}
								{socials.length > 1 ? "s" : ""}
							</div>
							{socials?.map((social, i) => (
								<a
									key={`social-${i}`}
									href={social?.link}
									target="_blank"
									className="mt-[1px] flex items-center transition-opacity duration-150 hover:opacity-80"
									rel="noreferrer"
								>
									<div className="w-[20px]">{React.createElement(social?.iconDefault)}</div>
								</a>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	) : (
		<Speakers
			layout="single"
			heading={t(`Meet the author`)}
			speaker={{
				name,
				role,
				image,
				socials,
			}}
		/>
	);
}
