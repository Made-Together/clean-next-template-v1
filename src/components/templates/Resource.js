/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-danger */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Layout } from "~/components/templates/Layout";
import LinkButton from "~/components/elements/buttons/LinkButton";
import Link from "next/link";
import LinkedInIcon from "~/components/elements/icons/LinkedInIcon";
import TwitterIcon from "~/components/elements/icons/TwitterIcon";
import ResourcesBackground from "../../assets/images/glows/resource-inner-glow.svg";
import { useDate } from "../../hooks/useDate";

export default function Resource(props) {
	const { post_date, taxonomies, post_title, featured_image, post_content, customer } = props;
	// eslint-disable-next-line react/destructuring-assignment
	const [publishDate] = useDate(post_date);
	const [domain, setDomain] = useState(null);

	useEffect(() => {
		setDomain(`${window.location.href}`);
	}, []);

	return (
		<Layout page={props}>
			<div className="overflow-hidden">
				<div className="container relative ">
					<div className="pointer-events-none absolute bottom-0 right-0 left-0 top-[10%]">
						<div className="mx-[-30%]">
							<Image src={ResourcesBackground} />
						</div>
					</div>

					<div className="relative mx-auto max-w-[1000px]">
						<div className="max-w-[800px] pt-24 pb-14 md:pt-60 md:pb-32">
							<div className="mb-12 md:mb-20">
								<LinkButton
									link={{ url: customer ? "/customer-stories/" : "/resources", title: customer ? "Back to customers" : "Back to resources" }}
									backArrow
								/>
							</div>
							<h1 className="t-48 mb-5 md:mb-10">{post_title}</h1>
							<div className="flex items-center font-medium uppercase tracking-[0.15em]">
								{taxonomies && <span className="t-13 mr-4 rounded-md bg-darkBlue px-3 py-2 uppercase">{taxonomies && taxonomies[0]?.terms[0]?.name}</span>}
								<span className="t-13 font-medium leading-6 opacity-80 ">{publishDate}</span>
							</div>
						</div>
					</div>
					<div className="mb-14 md:mb-40">
						{featured_image && (
							<div className="relative aspect-[1200/400]">
								<Image src={featured_image} layout="fill" objectFit="cover" objectPosition="center" />
							</div>
						)}
					</div>
					<div className="mx-auto max-w-[800px]">
						<div className="post-prose" dangerouslySetInnerHTML={{ __html: post_content }} />
						<div className=" my-12 h-[1px] bg-gradient-to-r from-[#EAFFFF26] via-[#EAFFFF4d]  to-[#EAFFFF26] md:my-16" />
						<div className="flex items-center justify-between gap-5">
							<LinkButton
								link={{ url: customer ? "/customer-stories/" : "/resources", title: customer ? "Back to customers" : "Back to resources" }}
								backArrow
							/>
							<div className="flex items-center justify-end gap-3">
								<div className="mr-1">Share</div>
								<Link href={`https://www.linkedin.com/sharing/share-offsite/?url=${domain}`} target="_blank" rel="nofollow" className="">
									<div className="block h-8 w-8 cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-[#EAFFFF26] via-[#EAFFFF4d] to-[#EAFFFF26] p-[1px]">
										<div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-darkNavy">
											<LinkedInIcon width="14" height="14" />
										</div>
									</div>
								</Link>
								<Link href={`http://twitter.com/share?url=${domain}`} target="_blank" rel="nofollow" className="">
									<div className="block h-8 w-8 cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-[#EAFFFF26] via-[#EAFFFF4d] to-[#EAFFFF26] p-[1px]">
										<div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-darkNavy">
											<TwitterIcon width="14" height="14" />
										</div>
									</div>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
