import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";

export const pageView = (url) => {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({
		event: "pageview",
		page: url,
	});
};

export default function Scripts() {
	const router = useRouter();

	useEffect(() => {
		router.events.on("routeChangeComplete", pageView);
		return () => {
			router.events.off("routeChangeComplete", pageView);
		};
	}, [router.events]);

	return <div />;
}
