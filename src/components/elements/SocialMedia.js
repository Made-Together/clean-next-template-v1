import React, { useContext } from "react";
import { GlobalContext } from "~/utils/context";

import TwitterIcon from "~/assets/images/social/twitter.inline.svg";
import FacebookIcon from "~/assets/images/social/facebook.inline.svg";
import LinkedinIcon from "~/assets/images/social/linkedin.inline.svg";
import YoutubeIcon from "~/assets/images/social/youtube.inline.svg";

export default function SocialMedia() {
	const [context] = useContext(GlobalContext);
	const socialLinks = context?.options?.footer_social_menu;
	return socialLinks ? (
		<ul className="mt-6 flex space-x-6 md:mt-0">
			{socialLinks?.map(({ link, icon }, index) => (
				<li key={`social${index}`} className="h-[24px]">
					<a href={link.url} target={link.target} className="block h-full hover:text-purple">
						{icon === "twitter" && <TwitterIcon className="h-full transition-colors duration-150" />}
						{icon === "facebook" && <FacebookIcon className="h-full transition-colors duration-150" />}
						{icon === "linkedin" && <LinkedinIcon className="h-full transition-colors duration-150" />}
						{icon === "youtube" && <YoutubeIcon className="h-full transition-colors duration-150" />}
					</a>
				</li>
			))}
		</ul>
	) : null;
}
