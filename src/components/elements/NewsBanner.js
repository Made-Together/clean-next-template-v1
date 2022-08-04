import { motion } from "framer-motion";
import React from "react";
import { TextLink } from "~/components/elements/Button";
import { CloseX } from "~/components/elements/Icon";
import Image from "~/components/elements/Image";
import { Link } from "~/components/elements/links/Link";

export default function NewsBanner({ newsBanner, setNewsBannerShown, imageWidth }) {
	return (
		<motion.div exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }} className="flex flex-col items-center">
			<div style={{ boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)" }} className="relative w-full max-w-[860px] rounded-lg bg-white  p-7 text-black">
				{/* Close */}
				{setNewsBannerShown && (
					<div onClick={() => setNewsBannerShown(false)} className="trans-opacity absolute top-[.9rem] right-[.9rem] cursor-pointer hover:opacity-80">
						<CloseX />
					</div>
				)}

				<Link link={newsBanner?.link} className="flex items-center">
					{newsBanner?.image && (
						<div className="mr-8 hidden overflow-hidden rounded-lg md:block" style={{ flex: `0 0 ${imageWidth || `${newsBanner.image.width}px` || "auto"}` }}>
							<Image image={newsBanner.image} />
						</div>
					)}

					<div className="space-y-2">
						{newsBanner.heading && <h4 className="text-20px font-semibold">{newsBanner.heading}</h4>}
						{newsBanner?.content && <div className="text-18px max-w-[570px]" dangerouslySetInnerHTML={{ __html: newsBanner.content }} />}
						{newsBanner?.link?.url && (
							<div className="pt-1">
								<TextLink link={newsBanner.link} className="inline-block" />
							</div>
						)}
					</div>
				</Link>
			</div>
		</motion.div>
	);
}
