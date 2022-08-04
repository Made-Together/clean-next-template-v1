// import { WpLink } from "~/elements/Wp";

// export function Button({ link }) {
// 	return <WpLink link={link}>{link.title}</WpLink>;
// }

import React from "react";
import styled from "styled-components";
import { ArrowRight } from "~/components/elements/Icon";

/**
 * Button
 */
export function Button({ link, button, size, className = "", children, ...other }) {
	let typeClasses = `${className} text-white trans border border-2 border-inherit select-none appearance-none font-semibold`;

	if (size === "small") {
		typeClasses += " inline-block text-13px px-5 py-2";
	} else if (size === "wide") {
		typeClasses += " block text-16px px-7 py-5 leading-[1.3] text-center font-bold";
	} else if (size === "huge") {
		typeClasses += " w-full text-16px  py-5 px-5 font-bold cursor-pointer text-center";
	} else {
		typeClasses += " inline-block text-16px px-7 py-2.5 leading-[1.3]";
	}

	if (button?.type === "outline") {
		typeClasses += " bg-transparent border border-2";
		if (button?.color === "white") {
			typeClasses += "bg-white border-white hover:bg-white hover:text-black";
		}
		if (button?.color === "black") {
			typeClasses += " border-black text-black hover:bg-black hover:text-white";
		}
	} else if (!button?.color || button?.color === "black") {
		typeClasses += " bg-black border-black hover:bg-green hover:border-green hover:text-black";
	}

	return link?.title ? (
		<div className={typeClasses} {...other} dangerouslySetInnerHTML={{ __html: link?.title }} />
	) : (
		<div className={typeClasses} {...other}>
			{children}
		</div>
	);
}

export default Button;

/**
 * Text Link
 */
const TextLinkStyled = styled.div`
	.text-link-underline {
		.text-link-white & {
			@apply bg-white;
		}
	}
`;
export function TextLink({ className = "", link, children, reverse, iconSize, underlineColour = "black" }) {
	return (
		<TextLinkStyled className={`text-16px group inline-flex cursor-pointer select-none items-center leading-tight ${className}`}>
			<OrangeBG iconSize={iconSize} reverse={reverse}>
				<ArrowRight className="w-full" />
			</OrangeBG>
			{(link?.title || children) && (
				<div className="text-inherit ml-2 inline-block font-bold transition duration-300 ease-in-out group-hover:translate-x-1 group-hover:text-purple ">
					{link?.title && <span dangerouslySetInnerHTML={{ __html: link?.title }} />}
					{!link?.title && children && children}
					<div
						className={`text-link-underline mt-1 h-[2px] w-full rounded bg-black group-hover:bg-orange
          bg-${underlineColour} transition-colors duration-300 ease-in-out`}
					/>
				</div>
			)}
		</TextLinkStyled>
	);
}

export function OrangeBG({ children, disableHover = false, reverse, iconSize = "w-[22px] h-[22px]" }) {
	return (
		<span
			className={`bg-orange transition-colors duration-300 ease-in-out  ${
				reverse && "rotate-180"
			} rounded-[50%] ${iconSize} flex items-center justify-center p-[6px] ${disableHover ? "" : "group-hover:bg-black"}`}
			style={{ flex: "0 0 auto" }}
		>
			{children}
		</span>
	);
}
