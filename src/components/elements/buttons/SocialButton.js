import React from "react";
import Link from "next/link";

function SocialButton(props) {
	const { link, children } = props;

	return (
		<Link href={link?.url}>
			<div className="group block">
				<div className="flex cursor-pointer items-center space-x-3 font-medium transition-colors duration-300 group-hover:text-purple">
					<div className="flex h-8 w-8 items-center justify-center rounded-full border-[1px] border-white/10">{children && children}</div>
					<span>{link?.title}</span>
				</div>
			</div>
		</Link>
	);
}

export default SocialButton;
