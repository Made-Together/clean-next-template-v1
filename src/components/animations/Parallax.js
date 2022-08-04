/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useState, useLayoutEffect } from "react";

import { motion, useViewportScroll, useTransform, useSpring } from "framer-motion";

function Parallax({ parallaxRef, children, offset = 50, properties, className }) {
	const [elementTop, setElementTop] = useState(0);
	const [clientHeight, setClientHeight] = useState(0);

	const { scrollY } = useViewportScroll();

	const style = {};

	for (const prop in properties) {
		const [start, end] = properties[prop];
		const initial = elementTop - clientHeight;
		const final = elementTop + offset;
		const yRange = useTransform(scrollY, [initial, final], [start, end]);
		const val = useSpring(yRange, { stiffness: 400, damping: 90 });
		style[prop] = val;
	}

	useLayoutEffect(() => {
		const element = parallaxRef.current;
		const onResize = () => {
			setElementTop(element.getBoundingClientRect().top + window.scrollY || window.pageYOffset);
			setClientHeight(window.innerHeight);
		};
		onResize();
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, [parallaxRef]);

	return (
		<motion.div ref={parallaxRef} style={style} className={className}>
			{children}
		</motion.div>
	);
}

export default Parallax;
