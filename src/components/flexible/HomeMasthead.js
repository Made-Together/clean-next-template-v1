/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Media from "../elements/Media";
import { TextContent } from "./TextContent";

function HomeMasthead(props) {
	const { content, media, links } = props;

	return (
		<div className="container pt-5 md:pt-12 ">
			<div className="w-full items-center justify-between md:flex md:space-x-6">
				<div className="w-full md:max-w-[644px]">
					<TextContent {...content} isMasthead />
				</div>
				<div className="mt-12 w-full md:mt-0 md:max-w-[530px]  ">
					<div className="relative lg:ml-[3rem] lg:mr-[-11.8rem]">
						<div className="dark-fade relative aspect-[670/503] backdrop-blur-2xl">
							<Media {...media} priority />
						</div>
					</div>
				</div>
			</div>
			<div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{links?.map((link, i) => (
					<LinkBlock link={link} key={`link${i}`} />
				))}
			</div>
		</div>
	);
}

export default HomeMasthead;

export function LinkBlock({ link, type }) {
	const [hover, setHover] = useState(false);

	return (
		<Link href={link?.link || "/#"}>
			<a
				style={{ boxShadow: "0px 0px 40px rgba(234, 255, 255, 0.03)" }}
				className="relative cursor-pointer rounded-lg border border-white border-opacity-10 py-6 px-5 backdrop-blur-[50px] md:p-8 lg:p-4 xl:p-8"
			>
				<motion.div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
					<div className={`${type === "grid" ? "md:flex md:space-x-8" : ""} relative`}>
						<div className="mx-auto mb-3 w-[48px] md:mx-0">
							<Media {...link?.icon} />
						</div>
						<TextContent {...link?.content} innerOnly />
					</div>
				</motion.div>
			</a>
		</Link>
	);
}
