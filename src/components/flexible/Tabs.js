import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Media from "~/components/elements/Media";
import { Section } from "~/components/elements/Section";
import TextCard from "~/components/elements/TextCard";

export default function Tabs({ section, tabs, text_card }) {
	const [active, setActive] = React.useState(0);
	return (
		<Section {...section}>
			<div className="container !max-w-[1466px]">
				<div>
					<TextCard {...text_card} />
				</div>

				<div className="mx-auto mt-10 mb-8 max-w-[988px] md:mb-16 ">
					<div className="tabs -mb-6 -ml-4 flex flex-wrap md:-ml-6">
						{tabs.map((tab, index) => (
							<div key={`tab-heading-${index}`} className="flex w-1/2 flex-auto justify-center pb-4 pl-4 md:w-1/3 md:pb-6 md:pl-6">
								<button
									onClick={() => active !== index && setActive(index)}
									className={`trans flex-auto rounded-[4em] border border-dashed border-[#D6D6D6] px-6 py-3 font-bold leading-tight transition-colors lg:px-10 lg:py-5 ${
										active === index ? "!border-solid !border-orange bg-orange text-white" : " hover:border-solid"
									}`}
									type="button"
								>
									{tab.heading}
								</button>
							</div>
						))}
					</div>
				</div>

				<div className="overflow-hidden rounded-[15px] bg-light-beige px-6 md:px-8">
					{tabs.map((tab, index) => (
						<motion.div key={`tab-item-${index}`}>
							<AnimatePresence initial={false}>
								{active === index && (
									<>
										{tab?.content?.text_card?.heading ? (
											<motion.header key="tab-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
												<div className="pt-10 pb-10 md:py-16 md:px-3 md:pt-[81px]">
													<TextCard {...tab?.content?.text_card} />
												</div>
											</motion.header>
										) : (
											<div className="py-5 md:py-6 lg:py-7" />
										)}
										<motion.div key="tab-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
											<div className="mx-auto w-full max-w-[1046px]">
												<Media {...tab.content.media} />
											</div>
										</motion.div>
									</>
								)}
							</AnimatePresence>
						</motion.div>
					))}
				</div>
			</div>
		</Section>
	);
}
