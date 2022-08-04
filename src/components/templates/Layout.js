/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { GlobalContext } from "~/utils/context";
import Header from "../global/Header";
import Footer from "../global/Footer";

export function Layout({ page = false, children }) {
	const isIndexable = page?.seo?.indexable !== "1"; // This 1 value is yoast for "not indexable"

	return (
		<GlobalContext.Provider value={{ page }}>
			<PasswordProtect password={page.post_password}>
				{page && page.seo && (
					<NextSeo
						title={page.seo.title}
						description={page.seo.description}
						canonical={page.url}
						openGraph={{
							url: page.url,
							title: page.seo.title,
							description: page.seo.description,
							images: [
								{
									url: page.seo.image,
								},
							],
						}}
						robotsProps={{
							index: isIndexable,
							follow: isIndexable,
						}}
					/>
				)}
				<Head>
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				</Head>
				<Header data={page?.global?.header} showNewsBanner={page?.page_options?.show_news_banner} hiddenShadow={page?.post_name === "why-hubble" && true} />

				<main>{children}</main>
				<Footer data={page?.global?.footer} cta={page?.global?.cta} />
			</PasswordProtect>
		</GlobalContext.Provider>
	);
}

export function PasswordProtect({ password, children }) {
	const [allowed, setAllowed] = useState(!password);
	if (allowed) return children;
	return (
		<div className="p-12">
			<input
				onChange={(e) => {
					if (e.target.value === password) {
						setAllowed(true);
					}
				}}
				className="border border-black"
				type="text"
				preview_placeholder="Enter password"
			/>
		</div>
	);
}
