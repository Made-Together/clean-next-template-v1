import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "~/components/elements/links/Link";
import { Button } from "~/components/elements/Button";

export default function HeaderDropdown({
	className = "",
	dropdownItems = [],
	children,
	buttonClassName,
	button,
	setNavIsOpen,
	hasDropdownIcon = false,
	dropdownClassName = "",
}) {
	const [headerDropdownOpen, setHeaderDropdownOpen] = useState(false);
	return (
		<div
			className={`relative inline-block ${className}`}
			onMouseEnter={() => {
				setHeaderDropdownOpen(true);
				if (setNavIsOpen) setNavIsOpen(false);
			}}
			onMouseLeave={() => setHeaderDropdownOpen(false)}
		>
			{button ? (
				<Button button={button} size="small" className={`${buttonClassName} cursor-pointer`}>
					<div className="flex items-center">
						{children}
						{hasDropdownIcon && (
							<svg className="relative -mr-1" width="10" height="6" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									className="transition-color duration-[50ms] "
									fillRule="evenodd"
									clipRule="evenodd"
									d="M.501 1.265l1.06-1.06 3.47 3.47 3.47-3.47 1.06 1.06-4.53 4.53-4.53-4.53z"
									fill="currentColor"
								/>
							</svg>
						)}
					</div>
				</Button>
			) : (
				<div className={`${buttonClassName} select-none`}>{children}</div>
			)}

			<AnimatePresence>
				{headerDropdownOpen && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ opacity: { duration: 0.2 }, ease: [0.04, 0.62, 0.23, 0.98] }}
						className={`text-15px absolute top-[100%] left-auto right-0 z-50 transform pt-[1.2rem] ${dropdownClassName}`}
					>
						<div className="w-full overflow-hidden rounded bg-white text-black shadow-lg">
							{dropdownItems.map((item, i) => (
								<div key={`headerdropdown${i}`} className="trans flex flex-col items-start border-l-4 border-transparent  hover:border-orange">
									<Link className="trans !block w-full px-3 py-2 font-medium hover:text-purple" target={item.target} href={item.url}>
										{item.title}
									</Link>
								</div>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
