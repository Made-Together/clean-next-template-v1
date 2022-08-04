/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Lottie from "react-lottie-player";

function LottiePlayer({ lottie, data, className, loop_lottie, ...props }) {
	const [animationData, setAnimationData] = useState();

	const [play, setPlay] = useState(false);
	const [ref, inView] = useInView({
		threshold: 0.25,
	});

	useEffect(() => {
		if (lottie?.length && !animationData) {
			import(`../../assets/lotties/${lottie}.json`).then(setAnimationData);
		}
	}, []);

	useEffect(() => {
		if (inView) {
			setPlay(true);
		} else {
			setPlay(false);
		}
	}, [inView, play]);

	if (!animationData)
		return (
			<div style={{ transform: "translateZ(0px)" }} className="flex h-full w-full items-center justify-center">
				<div className="h-[50px] w-[50px]">
					<svg version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0">
						<circle fill="none" stroke="#fff" strokeWidth="4" cx="50" cy="50" r="44" opacity="0.5" />
						<circle fill="#fff" stroke="#8655FF" strokeWidth="3" cx="8" cy="54" r="6">
							<animateTransform attributeName="transform" dur="2s" type="rotate" from="0 50 48" to="360 50 52" repeatCount="indefinite" />
						</circle>
					</svg>
				</div>
			</div>
		);
	return (
		<div style={{ transform: "translateZ(0px)" }} ref={ref} className={`pointer-events-none h-full w-full ${className}`}>
			{animationData && <Lottie height="100%" width="100%" loop={loop_lottie} animationData={animationData} play={play} {...props} />}
		</div>
	);
}

export default LottiePlayer;
