/* eslint-disable react/no-array-index-key */
import React from "react";
import DefaultButton from "./DefaultButton";
import LinkButton from "./LinkButton";

function ButtonGroup({ links, centered, wider_links }) {
	return (
		<div
			className={`w-full flex-grow items-center justify-center gap-y-6  space-y-4 md:flex md:w-auto md:space-y-0 md:space-x-5 md:space-y-0 lg:space-x-6 ${
				centered ? "md:justify-center" : "md:justify-start"
			}`}
		>
			{links?.map((link, i) =>
				link?.type === "button" ? <DefaultButton key={`button${i}`} wider_links={wider_links} {...link} i={i} /> : <LinkButton key={`link${i}`} {...link} />
			)}
		</div>
	);
}

export default ButtonGroup;
