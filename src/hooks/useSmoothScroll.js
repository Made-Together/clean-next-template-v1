import { useEffect } from "react";
import { useRouter } from "next/router";

/**
 * @function useSmoothScroll
 * @desc toggle the scroll-behavior css property between route changes
 * @returns null
 */
export default function useSmoothScroll() {
	const router = useRouter();

	// useEffect(() => {
	// 	if (typeof window === "undefined") return;
	// 	document.querySelector("html").style.scrollBehavior = "smooth";

	// 	const handleRouteChangeStart = () => {
	// 		document.querySelector("html").style.scrollBehavior = "";
	// 	};

	// 	const handleRouteChangeEnd = () => {
	// 		document.querySelector("html").style.scrollBehavior = "smooth";
	// 	};

	// 	router.events.on("routeChangeStart", handleRouteChangeStart);
	// 	router.events.on("routeChangeComplete", handleRouteChangeEnd);

	// 	// If the component is unmounted, unsubscribe
	// 	// from the event with the `off` method:
	// 	return () => {
	// 		router.events.off("routeChangeStart", handleRouteChangeEnd);
	// 	};
	// }, []);

	return null;
}
