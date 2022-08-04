import React, { useState } from "react";
import Footer from "~/components/global/Footer";
import TailwindUnpurge from "~/components/global/TailwindUnpurge";
import Header from "~/components/global/Header";
import Seo from "~/components/global/Seo";
import WpEditHotkey from "~/components/elements/WpEditHotkey";
import { GlobalContext } from "~/utils/context";

export function Layout({ data, children, mainClassName }) {
	const [context, setContext] = React.useState(data);

	return (
		<GlobalContext.Provider value={[context, setContext]}>
			<PasswordProtect password={data?.page?.post_password}>
				<Seo page={data?.page} />
				{!data?.hideHeader && <Header color={data?.headerColor} />}
				<main className={`${mainClassName || ""}`}>{children}</main>
				{!data?.hideFooter && <Footer />}
				<WpEditHotkey id={data?.page?.ID} />
				<TailwindUnpurge />
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
