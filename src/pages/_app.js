import Head from "next/head";
import React from "react";
import "tailwindcss/tailwind.css";
import "~/assets/styles/globals.scss";

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<link rel="shortcut icon" href="/favicon.svg" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}
