import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";

import Logo from "~/components/elements/Logo";
import { Link } from "~/components/elements/links/Link";
import HeaderNav from "~/components/global/HeaderNav";
import MobileNav from "~/components/global/MobileNav";
import { useTranslation } from "next-i18next";
import { BurgerIcon, BurgerIconClose } from "~/components/elements/Icon";
import { GlobalContext } from "~/utils/context";

export default function Header({ color = "" }) {
	const router = useRouter();
	const { t } = useTranslation();
	const [context] = useContext(GlobalContext);
	const [scrolled, setScrolled] = React.useState(false);
	const [activeMenu, setActiveMenu] = React.useState(0);
	const [navIsOpen, setNavIsOpen] = React.useState(false);
	const headerActions = context?.options?.header_actions?.links;

	useEffect(() => {
		if (typeof window !== "object") return false;

		function handleScroll() {
			setScrolled(window.scrollY > 0);
		}

		handleScroll();
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const handleRouteChange = () => setNavIsOpen(false);
		router.events.on("routeChangeComplete", handleRouteChange);
		return () => router.events.off("routeChangeComplete", handleRouteChange);
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<header
				className={`header fixed inset-x-0 top-0 z-50 ${color === "white" && !scrolled && !navIsOpen && "text-white"} ${
					(scrolled || navIsOpen) && "bg-white text-black shadow-md md:shadow-lg"
				} transition-colors duration-300`}
			>
				<div
					className={`container flex !max-w-[1442px] items-center justify-between px-4  sm:px-8 ${
						!scrolled && !navIsOpen ? "py-6" : "py-4"
					} transition-all duration-150`}
				>
					<div className="order-1 flex flex-auto items-center lg:order-none">
						<Link href="/" className="header-logo relative right-[6px] bottom-[2px] max-w-[100px] md:max-w-[139px] lg:bottom-0 lg:right-0">
							<Logo color={color === "white" && !scrolled && !navIsOpen ? "white" : "dark"} className="w-full" />
						</Link>
					</div>

					<div className="hidden flex-auto justify-end lg:flex">
						<HeaderNav items={context?.options?.header_menu} />

						<div className="ml-8 space-x-3">
							<Link
								type="button"
								button={headerActions[0].link.button}
								link={{
									url: headerActions && headerActions[0]?.link?.link?.url,
									title: headerActions && headerActions[0]?.link?.link?.title,
								}}
							/>
						</div>
					</div>

					<div className="flex flex-auto justify-start lg:hidden">
						<button
							onClick={() => setNavIsOpen(!navIsOpen)}
							type="button"
							className={`flex items-center ${navIsOpen && "active"}`}
							style={{ minWidth: "40px" }}
						>
							{!navIsOpen ? <BurgerIcon /> : <BurgerIconClose />}
						</button>
					</div>

					<div className="order-2 flex items-end justify-center lg:hidden">
						<div className="flex text-right" style={{ minWidth: "40px" }} />
					</div>
				</div>
			</header>

			<MobileNav setActiveMenu={setActiveMenu} activeMenu={activeMenu} navIsOpen={navIsOpen} headerMenu={context?.options?.header_menu} />
		</>
	);
}

// function LanguageDropdown({ color, scrolled }) {
// 	return (
// 		<Button
// 			className="group"
// 			size="small"
// 			button={{
// 				type: "outline",
// 				color: color === "white" && !scrolled ? "white" : "black",
// 			}}
// 		>
// 			<div className="flex items-center">
// 				<div className="mr-2">English</div>
// 				<svg className="relative -mr-1" width="10" height="6" fill="none" xmlns="http://www.w3.org/2000/svg">
// 					<path
// 						className="group-hover:fill-[#000]"
// 						fillRule="evenodd"
// 						clipRule="evenodd"
// 						d="M.501 1.265l1.06-1.06 3.47 3.47 3.47-3.47 1.06 1.06-4.53 4.53-4.53-4.53z"
// 						fill="#fff"
// 					/>
// 				</svg>
// 			</div>
// 		</Button>
// 	);
// }
