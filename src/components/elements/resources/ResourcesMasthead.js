import React from "react";
import Graphic from "~/assets/images/background-lines/resource-swirl.svg";

export default function ResourcesMasthead({ children }) {
	return (
		<section className="overflow-hidden bg-dark-green !pt-[6rem] !pb-[5rem] text-white md:!pt-[13rem] md:!pb-[164px]">
			<div className="pointer-events-none absolute top-0 right-0 select-none">
				<Graphic />
			</div>
			<div className="container relative">
				<h1 className="text-h1 max-w-3xl">{children}</h1>
			</div>
		</section>
	);
}
