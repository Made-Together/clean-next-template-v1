import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import parse, { domToReact } from "html-react-parser";

export function WpImage({ image, layout = "responsive", className = "", ...props }) {
	const [loaded, setLoaded] = useState(false);

	if (!image || !image.url) return null;
	return (
		<Image
			draggable={false}
			src={image.url || image}
			width={layout !== "fill" && image.width}
			height={layout !== "fill" && image.height}
			alt={image.alt}
			layout={layout}
			onLoadingComplete={() => setLoaded(true)}
			className={`${className}`}
			{...props}
		/>
	);
}

export function WpLink({ link, children, ...props }) {
	if (!link || !link.url) return children;
	return (
		<Link href={link.url} title={link.title} target={link.target} rel={link.rel} {...props}>
			{children}
		</Link>
	);
}

export const parseWithWpImage = (content) =>
	parse(content, {
		replace: (domNode) => {
			if (domNode && domNode.name === "img") {
				return (
					<span className={domNode.attribs.class}>
						<WpImage
							image={{
								url: domNode.attribs.src,
								height: domNode.attribs.height,
								width: domNode.attribs.width,
								alt: domNode.attribs.alt,
							}}
						/>
					</span>
				);
			}

			if (domNode && domNode.name === "a") {
				if (domNode.attribs.href) {
					return (
						<WpLink
							link={{
								url: domNode.attribs.href,
								target: domNode.attribs.target,
								title: domNode.attribs.title,
								rel: domNode.attribs.rel,
							}}
						>
							{domToReact(domNode.children)}
						</WpLink>
					);
				}
			}

			return "";
		},
	});

export function WpWysiwyg({ content }) {
	return <div className="prose">{parseWithWpImage(content)}</div>;
}
