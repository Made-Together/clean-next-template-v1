/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import React from "react";

function LinkButton(props) {
	const { color, link, backArrow = false } = props;

	return (
		<Link href={link?.url}>
			<a className="group inline-block">
				<div className={`flex cursor-pointer items-center gap-x-3 font-medium ${backArrow && "flex-row-reverse"}`}>
					<span className="transition duration-300 group-hover:underline">{link.title}</span>
					<span
						className={`m-0 ${backArrow && "rotate-180"} ${
							color?.color === "navy" ? "text-darkNavy" : "text-purple"
						} transition-transform duration-300 group-hover:translate-x-2`}
					>
						<LinkArrow />
					</span>
				</div>
			</a>
		</Link>
	);
}

export default LinkButton;

export const LinkContent = React.forwardRef(({ onClick, href, backArrow, title, color }, ref) => (
	<div className="group inline-block">
		<div className={`flex cursor-pointer items-center gap-x-3 font-medium ${backArrow && "flex-row-reverse"}`}>
			<span className="transition duration-300 group-hover:underline">{title}</span>
			<span
				className={`m-0 ${backArrow && "rotate-180"} ${
					color?.color === "navy" ? "text-darkNavy" : "text-purple"
				} transition-transform duration-300 group-hover:translate-x-2`}
			>
				<LinkArrow />
			</span>
		</div>
	</div>
));

function LinkArrow() {
	return (
		<svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect y="0.867188" width="32" height="32" rx="16" fill="currentColor" />
			<path
				d="M15.6094 12.2578C15.75 12.1328 15.8828 12.1328 16.0078 12.2578L20.9062 17.1797C21.0469 17.3047 21.0469 17.4297 20.9062 17.5547L16.0078 22.4766C15.8828 22.6016 15.75 22.6016 15.6094 22.4766L15.1406 22.0078C15.0938 21.9609 15.0703 21.8984 15.0703 21.8203C15.0703 21.7422 15.0938 21.6719 15.1406 21.6094L18.7734 17.9766H10.7812C10.5938 17.9766 10.5 17.8828 10.5 17.6953V17.0391C10.5 16.8516 10.5938 16.7578 10.7812 16.7578H18.7734L15.1406 13.125C15.0156 12.9844 15.0156 12.8516 15.1406 12.7266L15.6094 12.2578Z"
				fill="white"
			/>
		</svg>
	);
}
