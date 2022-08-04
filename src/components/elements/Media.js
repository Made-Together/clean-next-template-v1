import React from "react";
import FadeInView from "../animations/FadeInView";
import LottiePlayer from "./LottiePlayer";

import { WpImage } from "./Wp";

function Media({ type, image, collection, lottie, priority = false, ...other }) {
	if (type === "image")
		return (
			<FadeInView>
				<WpImage image={image} priority={priority} {...other} />
			</FadeInView>
		);
	// if (type === "lottie") return <LottiePlayer lottie={lottie} />;
	if (collection && type === "collection") return <CollectionHandler collection={collection} />;
}

export default Media;

function CollectionHandler({ collection }) {
	switch (collection) {
		default:
			// eslint-disable-next-line no-console
			console.log(`no collection found`);
			return null;
	}
}
