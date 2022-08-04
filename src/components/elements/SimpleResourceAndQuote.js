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
				className={`group cursor-pointer rounded-2xl border-[1px] border-mist/20 bg-darkNavy/50 p-4 shadow-dualQuote transition-colors duration-300 hover:bg-purple/20 lg:p-16  ${className}`}
			>
				<div className="relative z-10 after:absolute after:inset-x-0 after:h-[1px] after:bg-mist after:opacity-10">
					<div className="mb-10">
						<div className="flex items-center justify-between mb-6 t-13">
							<div className="max-h-[34px] w-full max-w-[140px]">
								<WpImage image={customer[0]?.preview?.logo} objectFit="contain" objectPosition="left" />
							</div>
							<div className="t-13 rounded-md bg-[#102139] py-2 px-3 font-medium uppercase text-mist ">WHY HUBBLE?</div>
						</div>
						<h2 className="mb-8 font-medium t-32">{customer[0]?.post_title}</h2>
						<LinkButton link={{ url: `/customers/${customer[0]?.post_name}`, title: "Read case study" }} />
					</div>
				</div>
				<div className="pt-8">
					<blockquote>
						<div className="after:t-64 relative mb-4 flex after:absolute after:right-0 after:-top-2 after:text-purple after:content-['“']">
							<div className="t-22 max-w-[420px]" dangerouslySetInnerHTML={{ __html: customer[0]?.preview?.quote }} />
						</div>
						<cite className="not-italic t-18">{customer[0]?.preview?.name}</cite>
					</blockquote>
				</div>
			</div>
		</Link>
	);
}

export default SimpleResourceAndQuote;
