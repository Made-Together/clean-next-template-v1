import React from "react";
import { domAnimation, LazyMotion, m } from "framer-motion";
import { SimplePlayIcon } from "~/components/elements/Icon";
import { Link } from "~/components/elements/links/Link";
import PostPreview from "~/components/post/PostPreview";

export default function ResourceGrid({ posts, type }) {
	return posts ? (
		<div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
			{posts?.map((post, index) => (
				<div key={`resource-grid-item-${index}`} className="flex flex-col">
					{type === "Webinar" ? <WebinarPreview {...post} /> : <PostPreview {...post} />}
				</div>
			))}
		</div>
	) : null;
}

export function WebinarPreview({ title, uri }) {
	return (
		<LazyMotion features={domAnimation}>
			<Link href={uri} className="flex flex-auto flex-col">
				<m.div className="cursor-pointer rounded-[15px] bg-grey" whileHover="hover" initial="rest">
					<div className="flex flex-col justify-between p-[40px]">
						<div>
							<div className="text-15px opacity-40">02/08/2021</div>
							<div className="text-28px mt-[5px] font-medium leading-[1.20]">{title}</div>
						</div>
						<div className="mt-[47px] flex justify-between md:mt-[170px]">
							<div>
								<div className="text-16px font-bold">Watch Now</div>
								<m.div className="h-[1.5px] w-full bg-black " variants={{ rest: { y: 0 }, hover: { y: 5 } }} />
							</div>
							<m.div>
								<SimplePlayIcon />
							</m.div>
						</div>
					</div>
				</m.div>
			</Link>
		</LazyMotion>
	);
}
