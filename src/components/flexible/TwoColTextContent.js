// eslint-disable react/no-array-index-key
/* eslint-disable react/no-danger */
import React from "react";

function TwoColTextContent(props) {
	const { heading, content, content_options, heading_options, container_width, type = "text", grids } = props;

	const content_class = [];
	const content_contianer_class = [];
	switch (content_options?.content_font_size) {
		case "22px":
			content_class.push("t-22");
			break;
		case "20px":
			content_class.push("t-20");
			break;
		case "16px":
			content_class.push("t-16");
			break;
		case "18px":
		default:
			content_class.push("t-18");
			break;
	}

	switch (content_options?.content_container_width) {
		case "partial":
			content_contianer_class.push("w-full lg:w-[588px]");
			break;

		case "full":
		default:
			content_contianer_class.push("w-full");
			break;
	}

	return (
		<div className="container relative z-10 mx-auto" style={container_width ? { maxWidth: `${container_width}px` } : {}}>
			<div className="mb-10 block justify-between lg:mb-44 lg:flex lg:space-x-6" style={content_options?.gap ? { gap: `${content_options?.gap}px` } : {}}>
				<div style={{ maxWidth: heading_options?.heading_width ? `${heading_options.heading_width}px` : "510px" }} className="mx-auto w-full lg:mx-0">
					<div className="t-48 mb-4 text-center font-medium lg:text-left">{heading}</div>
				</div>
				{type === "text" && (
					<div className={content_contianer_class}>
						<div
							className={`${content_class.join(" ")} ${
								content_options.content_alignment === "right" ? "lg:ml-auto" : "mx-auto lg:m-0"
							} text-center lg:text-left`}
							style={{ maxWidth: `${content_options.content_width ? `${content_options.content_width}px` : "auto"} ` }}
							dangerouslySetInnerHTML={{ __html: content }}
						/>
					</div>
				)}
				{type === "grid" && (
					<ul
						className="mx-auto mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mx-0 lg:gap-6"
						style={content_options?.content_container_width ? { maxWidth: `${content_options?.content_container_width}px` } : {}}
					>
						{grids.map((grid_item) => (
							<li className="border-01 px-4 py-6 text-center lg:p-8">
								<h3 className="t-24-heading mb-3 font-medium">{grid_item.subheading}</h3>
								<article className="t-18">{grid_item.content}</article>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default TwoColTextContent;
