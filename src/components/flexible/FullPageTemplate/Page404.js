import React from "react";
import HeroBL from "~/assets/images/background-lines/404-hero-bl.svg";
import HeroTR from "~/assets/images/background-lines/404-hero-tr.svg";
import LinkGroup from "~/components/elements/links/LinkGroup";

export default function Page404({ page_options_404 }) {
	const { title, description, links } = page_options_404;

	return (
		<div className="bg-purple">
			<div className="relative flex items-center justify-center pt-[180px] pb-[160px] text-center text-white md:py-[34vh]">
				<div className="pointer-events-none absolute top-0 right-0">
					<HeroBL />
				</div>
				<div className="pointer-events-none absolute bottom-0 left-0">
					<HeroTR />
				</div>
				<div className="container">
					<h1 className="text-h1">{title}</h1>
					<div className="mt-5">
						<div dangerouslySetInnerHTML={{ __html: description }} />
						<LinkGroup links={links} className="mt-[44px] flex justify-center" />
					</div>
				</div>
			</div>
		</div>
	);
}
