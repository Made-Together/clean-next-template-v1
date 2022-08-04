import React from "react";
import { AnimatePresence } from "framer-motion";

export default function Stats({ stats, showBackground = true, paddingTop = false, paddingBottom = false }) {
	if (!stats || stats.length === 0) return null;

	return (
		<div className="px-[25px]">
			<ul
				className={`mx-auto max-w-[1370px] ${showBackground && "rounded-[20px] bg-grey"} ${paddingTop ? "pt-16 sm:pt-20 md:pt-[85px]" : ""} ${
					paddingBottom ? "pb-16 sm:pb-20 md:pb-[85px]" : ""
				}`}
			>
				<div className="container flex flex-wrap justify-center gap-y-12 !px-0 md:flex-nowrap md:gap-x-3">
					<AnimatePresence exitBeforeEnter>
						{stats?.map((stat, i) => (
							<div className={`w-1/2 justify-center text-center md:w-1/${stats.length} px-1`} key={`stat${i}`}>
								<h3
									className={`mb-4 md:mb-[18px] lg:mb-[23px] ${
										showBackground ? "text-yellow  md:text-[80px] " : "text-orange md:text-[100px]"
									} text-[66px] leading-[1] tracking-[-0.03em]  `}
								>
									{stat.number}
								</h3>
								<div className="text-p2 mx-auto max-w-[237px]">{stat.text}</div>
							</div>
						))}
					</AnimatePresence>
				</div>
			</ul>
		</div>
	);
}
