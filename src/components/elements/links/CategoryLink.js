import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { OrangeBG } from "~/components/elements/Button";
import { ArrowRight } from "~/components/elements/Icon";

export function CategoryLink({ slug, name, active, type, disable, ...other }) {
	const [activeHover, setActiveHover] = useState(false);

	return (
		<motion.li
			className="flex cursor-pointer items-center space-x-[10px] font-medium  "
			whileHover="hover"
			initial="rest"
			onMouseEnter={() => setActiveHover(true)}
			onMouseLeave={() => setActiveHover(false)}
			{...other}
		>
			<div className="mt-[2px] inline-block">
				<motion.div
					initial="rest"
					animate={active || activeHover ? "hover" : "rest"}
					variants={{
						rest: {
							opacity: 0,
							scale: 0,
						},
						hover: {
							opacity: 1,
							scale: 1,
						},
					}}
				>
					<OrangeBG>
						<ArrowRight />
					</OrangeBG>
				</motion.div>
			</div>
			{type === "anchor" ? (
				<a href={disable || !slug ? null : `#${slug?.trim()}`} dangerouslySetInnerHTML={{ __html: name }} />
			) : (
				<Link href={`/integrations#${slug?.trim()}`}>
					<div dangerouslySetInnerHTML={{ __html: name }} />
				</Link>
			)}
		</motion.li>
	);
}
