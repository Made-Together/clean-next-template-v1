import { motion } from "framer-motion";
import React from "react";

function FadeInView({ children, ...other }) {
	return (
		<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, ease: "linear" }} viewport={{ once: true }} {...other}>
			{children}
		</motion.div>
	);
}

export default FadeInView;
