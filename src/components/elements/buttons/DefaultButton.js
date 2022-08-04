import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

function DefaultButton(props) {
	const { link, i, button_type, wider_links } = props;

	let buttonClasses;

	if (button_type === "secondary") {
		buttonClasses = "bg-transparent border-mist  hover:border-purple hover:text-purple";
	} else {
		buttonClasses = "border-transparent bg-purple hover:bg-[#6142BE] ";
	}

	return (
		<Link href={link?.url}>
			<motion.div
				whileTap={{ scale: 0.975 }}
				className={`inline-block h-[50px] cursor-pointer rounded-md border text-center transition-colors duration-[400] ${buttonClasses} py-[15px] px-8 ${
					i === 0 ? "md:max-w-[283px] " : "md:max-w-[178px]"
				} font-bold leading-[1.1] ${wider_links ? "w-full" : "w-auto"}`}
			>
				{link?.title}
			</motion.div>
		</Link>
	);
}

export default DefaultButton;
