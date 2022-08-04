import React from "react";
import { DefaultSeo } from "next-seo";
import { appWithTranslation } from "next-i18next";
import Scripts from "~/components/global/Scripts";
import useSmoothScroll from "~/hooks/useSmoothScroll";
import seoConfig from "../../next-seo.config";
import "@fontsource/plus-jakarta-sans";
import "~/assets/styles/globals.scss";

function MyApp({ Component, pageProps }) {
	const { locale } = pageProps;
	useSmoothScroll();
	return (
		<>
			<Scripts />
			<DefaultSeo {...seoConfig[locale]} />
			<Component {...pageProps} />
		</>
	);
}

export default appWithTranslation(MyApp);
