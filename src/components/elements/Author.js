import React from "react";
import { useTranslation } from "next-i18next";
import { ProfileImage } from "~/components/elements/Profile";
import LinkedinIcon from "~/assets/images/social/linkedin-alt.inline.svg";
import TwitterIcon from "~/assets/images/social/twitter-alt.inline.svg";

function Author(props) {
	const { t } = useTranslation();
	const { member } = props;
	const author = member[0]?.postTypeTeamMember;

	const iconClasses = "h-full transition-colors duration-150 cursor-pointer group-hover:text-purple";
	return (
		<div className="mx-auto mt-[60px] max-w-[792px] rounded-[15px] border border-black border-opacity-10">
			<div className="text-18px items-center justify-between py-[34px] px-[42px] md:flex">
				<div className="flex items-center space-x-[22px] ">
					<ProfileImage image={author?.image} className="h-[85px] w-[85px]" />
					<div>
						<div className="font-semibold ">
							{t("By")} {member[0]?.title}
						</div>
						<div className="opacity-40 md:max-w-[250px]">{author?.position}</div>
					</div>
				</div>
				<div className="mt-6 flex items-center space-x-[10px] md:mt-0">
					<div className="text-16px">{t("Follow on socials")}</div>
					<div className="flex items-center space-x-[13px]  ">
						{author?.linkedin && (
							<a className="group" href={author?.linkedin} target="_blank" rel="noreferrer">
								<LinkedinIcon className={iconClasses} />
							</a>
						)}
						{author?.twitter && (
							<a className="group" href={author?.twitter} target="_blank" rel="noreferrer">
								<TwitterIcon className={iconClasses} />
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Author;
