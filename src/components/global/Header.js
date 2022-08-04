/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/function-component-definition */
/* eslint-disable arrow-body-style */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-void */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "~/components/global/Logo";
import {motion} from "framer-motion";

function Header({ data, showNewsBanner, hiddenShadow = false }) {
	const { menu, button } = data;
	return (
		<header
			className="fixed top-0 left-0 right-0 z-[100] transition-shadow duration-200">
			<div
				className={`container relative z-[95] flex !max-w-[none] items-center justify-between !px-5 py-6 xl:!px-12 transition-colors duration-300 `}
			>
				<Link href="/">
					<a className="cursor-pointer">
						<Logo />
					</a>
				</Link>
				<div className=" hidden items-center space-x-[48px] font-medium lg:flex">
					{menu?.map((menuItem, i) => (
						<motion.div  className="relative">
							<Link href={menuItem?.link?.url || "/#"}>
								<a className="transition-colors duration-300 hover:text-purple">{menuItem?.link?.title}</a>
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</header>
	);
}

export default Header;
