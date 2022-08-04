import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

function TogetherImage({ image, objectFit = "contain", objectPosition = "center", className, imgClassName = "", ...other }) {
	const src = image?.src || image?.url;
	return src?.length > 0 ? (
		<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className={`next-image-wrapper ${className}`}>
			<Image
				src={src}
				width={image?.width}
				height={image?.height}
				alt={image?.alt}
				objectFit={objectFit}
				objectPosition={objectPosition}
				layout="responsive"
				draggable="false"
				className={imgClassName}
				{...other}
			/>
		</motion.div>
	) : null;
}

export default TogetherImage;
