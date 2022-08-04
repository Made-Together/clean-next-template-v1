import React from "react";
import { motion } from "framer-motion";
import { useWindowSize } from "react-use";
import Image from "~/components/elements/Image";
import Video from "~/components/elements/Video";

export default function Media(props) {
	const { options, className, containerClassName, priority = false } = props;
	const sectionAlignmentClasses = options?.alignment === "center" ? "md:items-center" : options?.alignment === "right" ? "md:items-end" : "md:items-start";

	const [paddingLeft, setPaddingLeft] = React.useState("0%");

	const { width } = useWindowSize();

	React.useEffect(() => {
		if (width < 1280) {
			setPaddingLeft("0%");
			return;
		}

		const leftOverlayMinus =
			props?.overlay &&
			props?.overlay
				?.map(({ position: { left } }) => left)
				.filter((left) => left[0] === "-")
				.pop();

		if (leftOverlayMinus) {
			setPaddingLeft(leftOverlayMinus);
		}
	}, [props, width]);

	return (
		<div className={`media-item-container flex flex-col ${sectionAlignmentClasses} ${className}`}>
			<div className={`w-full md:${options?.maxWidth || ""} ${containerClassName} ${props.overlay && "relative"}`} style={{ paddingLeft }}>
				{props.type === "image" && <Image image={{ ...props.image, src: props.image.url }} priority={priority} />}
				{props.type === "video" && <Video {...props?.video?.video} />}

				{props.overlay &&
					props.overlay.map(({ image, maxHeight, maxWidth, position }, index) => (
						<div
							key={`overlay${index}`}
							className="absolute z-10"
							style={{
								...position,
							}}
						>
							<div style={{ maxHeight: `${maxHeight || 100}%`, maxWidth: `${maxWidth || 100}%` }}>
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.3 + index * 0.3 }}
									viewport={{ once: false }}
								>
									<Image image={image} />
								</motion.div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}
