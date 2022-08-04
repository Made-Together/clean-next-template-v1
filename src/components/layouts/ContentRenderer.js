/* eslint-disable import/prefer-default-export */
/* eslint-disable react/no-array-index-key */
import React from "react";
import { TextContent } from "~/components/flexible/TextContent";
import HomeMasthead from "../flexible/HomeMasthead";
import LogoMarquee from "../flexible/LogoMarquee";
import TwoColMasthead from "../flexible/TwoColMasthead";
import TwoColTextContent from "../flexible/TwoColTextContent";

export function ContentRenderer({ content = [] }) {
	return (
		<>
			{content.map((layout, i) => {
				const layoutName = layout?.acf_fc_layout;
				if (layoutName === "text_content") {
					return <TextContent key={i} {...layout} />;
				}
				if (layoutName === "home_masthead") {
					return <HomeMasthead key={i} {...layout} />;
				}
				if (layoutName === "logo_marquee") {
					return <LogoMarquee key={i} {...layout} />;
				}
				if (layoutName === "two_col_text_content") {
					return <TwoColTextContent key={i} {...layout} />;
				}
				if (layoutName === "two_col_masthead") {
					return <TwoColMasthead key={i} {...layout} />;
				}
				// eslint-disable-next-line no-console
				console.log("IMPLEMENT ", layoutName, layout);

				return null;
			})}
		</>
	);
}
