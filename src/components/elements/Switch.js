import { motion } from "framer-motion";
import React from "react";

function Switch({ active, onClick }) {
	return (
		<motion.div
			layout
			key="switch"
			onClick={onClick}
			style={{ justifyContent: active ? "flex-end" : "flex-start" }}
			className="flex h-[36px] w-[75px] cursor-pointer rounded-[48px] bg-grey p-[3px]"
		>
			<motion.div layout className="h-[30px] w-[30px] rounded-full bg-orange " />
		</motion.div>
	);
}

export default Switch;
