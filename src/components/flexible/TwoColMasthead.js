/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import Image from "next/image";
import React from "react";
import Media from "../elements/Media";
import { TextContent } from "./TextContent";

function TwoColMasthead(props) {
	const { content, media, options, marquee, stats } = props;

	return (
		<div className="container relative z-20">
			<div className={`flex flex-col-reverse items-center md:flex-row md:justify-between md:gap-x-12 ${options?.reverse ? "flex-row-reverse" : ""}`}>
				<div className="mt-12 flex-shrink md:mt-0">
					<TextContent innerOnly isMasthead {...content} />
				</div>

				<div
					className={`${
						options.negative_margins_media && options.extra_negative_margin ? "mr-[-20%]" : options.negative_margins_media ? "mr-[-10%]" : "max-w-[588px]"
					}  w-full flex-1`}
				>
					<Media {...media} priority />
				</div>
			</div>
			{marquee && options.add_marquee && (
				<div className="mt-20 ">
				</div>
			)}
		</div>
	);
}

export default TwoColMasthead;
