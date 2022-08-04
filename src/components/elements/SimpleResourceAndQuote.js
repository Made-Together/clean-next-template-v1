/* eslint-disable react/no-danger */
import React from "react";

import LinkButton from "~/elements/buttons/LinkButton";
import Link from "next/link";
import { WpImage } from "./Wp";

function SimpleResourceAndQuote(props) {
	const { className, customer } = props;

	return (
		<Link href={`/customers/${customer[0]?.post_name}`}>
			<div
				className={`border-mist/20 bg-darkNavy/50 shadow-dualQuote group cursor-pointer rounded-2xl border-[1px] p-4 transition-colors duration-300 hover:bg-purple/20 lg:p-16  ${className}`}
			>
				<div className="after:bg-mist relative z-10 after:absolute after:inset-x-0 after:h-[1px] after:opacity-10">
					<div className="mb-10">
						<div className="t-13 mb-6 flex items-center justify-between">
							<div className="max-h-[34px] w-full max-w-[140px]">
								<WpImage image={customer[0]?.preview?.logo} objectFit="contain" objectPosition="left" />
							</div>
							<div className="t-13 text-mist rounded-md bg-[#102139] py-2 px-3 font-medium uppercase ">WHY HUBBLE?</div>
						</div>
						<h2 className="t-32 mb-8 font-medium">{customer[0]?.post_title}</h2>
						<LinkButton link={{ url: `/customers/${customer[0]?.post_name}`, title: "Read case study" }} />
					</div>
				</div>
				<div className="pt-8">
					<blockquote>
						<div className="after:t-64 relative mb-4 flex after:absolute after:right-0 after:-top-2 after:text-purple after:content-['“']">
							<div className="t-22 max-w-[420px]" dangerouslySetInnerHTML={{ __html: customer[0]?.preview?.quote }} />
						</div>
						<cite className="t-18 not-italic">{customer[0]?.preview?.name}</cite>
					</blockquote>
				</div>
			</div>
		</Link>
	);
}

export default SimpleResourceAndQuote;
