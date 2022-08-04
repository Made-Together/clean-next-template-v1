import React from "react";
import Media from "~/components/elements/Media";
import { Section } from "~/components/elements/Section";
import TextCard from "~/components/elements/TextCard";

export default function Masthead(props) {
	const layouts = {
		"one-col": DefaultMasthead,
		"two-col": DefaultMasthead,
	};

	const layout = props.layout || "one-col";
	return layouts[layout] ? layouts[layout](props) : null;
}

function DefaultMasthead(props) {
	const { layout_settings, text_card, media, layout, options, background_image } = props;

	// eslint-disable-next-line
	const leftColumnWidth = +options?.left_column_width || 6;

	const columnWidths = {
		left: leftColumnWidth,
		right: 12 - leftColumnWidth,
	};
	const isOneColLayout = layout === "one-col";

	const textCardContainerClasses = isOneColLayout ? "md:col-span-12" : `md:col-span-${columnWidths.left}`;
	const mediaContainerClasses = isOneColLayout ? "mt-8 max-w-[1044px] mx-auto w-full md:col-span-12" : `md:col-span-${columnWidths.right}`;

	const sectionClasses = "";

	return (
		<Section {...layout_settings.section} className={`relative ${sectionClasses} `}>
			<div className="container relative">
				<div className="text grid items-center gap-12 md:grid-cols-12">
					<div className={`text-card-container  ${textCardContainerClasses}`}>
						<TextCard {...text_card} />
					</div>

					{media?.type && !background_image && (
						<div className={`media-container z-10 ${mediaContainerClasses} `}>
							<Media {...media} priority className={`${media?.type !== "video" ? "pointer-events-none select-none" : ""} `} />
						</div>
					)}
				</div>
			</div>
		</Section>
	);
}
