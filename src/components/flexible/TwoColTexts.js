import React from "react";
import { motion } from "framer-motion";
import { TextContent } from "~/components/flexible/TextContent";

function TwoColTexts(props) {
	const { heading, text_contents } = props;

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.5,
			},
		},
	};

	const plusSignContainer = {
		initial: { opacity: 1 },
		final: {
			opacity: 1,
			transition: {
				staggerChildren: 0.5,
				staggerDirection: -1,
			},
		},
	};

	const plusSignItem = {
		initial: { x: 0 },
		final: {
			x: "-1500px",
			opacity: 0,
			transition: {
				duration: 2,
				bounce: 0,
			},
		},
	};

	const item = {
		hidden: { x: "1000px" },
		show: {
			x: 0,
			transition: {
				duration: 2,
				bounce: 0,
			},
		},
	};

	return (
		<div className="container relative z-10">
			<div className="mb-8 flex items-center justify-center lg:mb-24 lg:gap-16">
				<motion.h2
					initial={{ opacity: 0, x: "-300px" }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 2, ease: [0.04, 0.62, 0.23, 0.98] }}
					className="t-48 font-medium"
				>
					{heading}
				</motion.h2>
				<hr className="to-mist hidden h-[2px] flex-auto border-0 bg-gradient-to-r from-transparent md:block" />
			</div>
			<div className="relative">
				<motion.div variants={plusSignContainer} viewport={{ once: true }} initial="initial" whileInView="final" className="absolute top-0 left-0">
					<motion.div variants={plusSignItem} className="mb-4">
						<PlusSign />
					</motion.div>
					<motion.div variants={plusSignItem} className="mb-4">
						<PlusSign />
					</motion.div>
				</motion.div>
				<motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 gap-16 lg:grid-cols-2">
					{text_contents.map((text_content, i) => (
						<motion.div key={i} variants={item}>
							<TextContent {...text_content.text_content} />
						</motion.div>
					))}
				</motion.div>
			</div>
		</div>
	);
}

function PlusSign() {
	return (
		<svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
			<line x1="32.8984" y1="17.4563" x2="0.498436" y2="17.4562" stroke="#EAFFFF" strokeWidth="0.50625" />
			<line x1="16.4422" y1="33.3984" x2="16.4422" y2="0.998436" stroke="#EAFFFF" strokeWidth="0.50625" />
		</svg>
	);
}

export default TwoColTexts;
