import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import React, { useState } from "react";
import { useWindowSize } from "react-use";
import { Link } from "~/components/elements/links/Link";
import { DropdownCross } from "~/components/elements/Icon";
import { AccordionAnimation } from "~/components/flexible/Accordion";

function Accordion(props) {
	const { accordionItems, heading, disableInternalSpacing, centerHeading } = props;
	const [open, setOpen] = useState(null);

	return (
		<div className={`${disableInternalSpacing ? "" : "my-16"}`}>
			{heading && <h2 className={`text-h2 mb-[28px] md:mb-[56px] ${centerHeading ? "text-center" : ""}`}>{heading}</h2>}
			<div>
				<div className="h-[2px] w-full bg-black bg-opacity-20 " />
				{accordionItems?.map((accItem, i) => (
					<AccordionItem key={`accItem${i}`} {...accItem} onClick={() => setOpen(i === open ? null : i)} open={open === i} />
				))}
			</div>
		</div>
	);
}

export default Accordion;

export function AccordionItem({ title, description, link, open, onClick }) {
	const { width } = useWindowSize();

	return (
		<LayoutGroup>
			<div className="">
				<motion.div className="pt-[18px]  md:pt-[28px] ">
					<header onClick={onClick} className="group flex cursor-pointer items-center justify-between pb-4">
						<h6 className="text-18px md:text-22px pr-6 transition-colors duration-150 group-hover:text-purple ">{title}</h6>
						<motion.div className="relative top-[1px]" animate={{ rotate: open ? 45 : 0 }}>
							<DropdownCross />
						</motion.div>
					</header>
					<motion.div>
						<AnimatePresence exitBeforeEnter initial={false}>
							{open && (
								<AccordionAnimation className="overflow-hidden ">
									<div className="text-18px pr-6 pb-6">
										<div className="prose" dangerouslySetInnerHTML={{ __html: description }} />
									</div>
									{link && link?.url ? <Link link={link} type="text" /> : null}
								</AccordionAnimation>
							)}
						</AnimatePresence>
					</motion.div>
				</motion.div>
				<motion.div
					initial="closed"
					animate={open ? "open" : "closed"}
					variants={{
						closed: {
							marginTop: width < 768 ? 5 : 15,
						},
						open: {
							marginTop: width < 768 ? 25 : 31,
						},
					}}
					className="h-[2px] w-full bg-black bg-opacity-20 "
				/>
			</div>
		</LayoutGroup>
	);
}
