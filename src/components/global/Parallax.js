import React, { useState, useEffect } from "react";

import { motion, useViewportScroll, useTransform, useSpring } from "framer-motion";

export function Parallax({ parallaxRef, children, offset = 50, properties }) {
	const [elementTop, setElementTop] = useState(0);
	const [clientHeight, setClientHeight] = useState(0);

	const { scrollY } = useViewportScroll();

	const style = {};

	// eslint-disable-next-line
	for (const prop in properties) {
		const [start, end] = properties[prop];
		const initial = elementTop - clientHeight;
		const final = elementTop + offset;
		// eslint-disable-next-line
		const yRange = useTransform(scrollY, [initial, final], [start, end]);
		// eslint-disable-next-line
		const val = useSpring(yRange, { stiffness: 400, damping: 90 });
		style[prop] = val;
	}

	useEffect(() => {
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
		<motion.div ref={parallaxRef} style={style}>
			{children}
		</motion.div>
	);
}
