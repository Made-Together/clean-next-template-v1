import parse from "html-react-parser";
import React from "react";
import styled from "styled-components";
import Accordion from "~/components/elements/Accordion";
import Media from "~/components/elements/Media";

import Author from "~/components/elements/Author";
import IconCard from "~/components/elements/IconCard";
import Profile from "~/components/elements/Profile";
import Quote from "~/components/elements/Quote";
import Speakers from "~/components/elements/Speakers";
import Space from "~/components/elements/Space";

const PostMedia = styled.div`
	img {
		margin: 0 !important;
	}

	.media-item-container.md\:items-center {
		> .w-full,
		> .md\:w-full {
			width: auto !important;
			max-width: 100%;
		}
	}
`;

export default function PostContent({ content }) {
	return (
		<div className="post-content prose space-y-12">
			{content && content.map((props, index) => <RenderFlexibleSection key={`flexible-section-${index}`} {...props} />)}
		</div>
	);
}

function RenderFlexibleSection(props) {
	const { acf_fc_layout } = props;

	switch (acf_fc_layout) {
		case `anchor`:
			return <div id={props?.slug?.trim()} data-label={props.label} />;
		case `text`:
			return <div className="post-text marker:text-orange">{parse(props?.text || "")}</div>;
		case `quote`:
			return <Quote {...props} />;
		case `space`:
			return <Space {...props?.space} />;
		case `accordion`:
			return <Accordion {...props} accordionItems={props.accordion_items} />;
		case `icon_card`:
			return <IconCard {...props} />;
		case `profile`:
			return <Profile {...props} />;
		case `author`:
			return <Author {...props} />;
		case `speakers`:
			return <Speakers {...props} />;
		case `media`:
			return (
				<PostMedia className="rounded-[15px]">
					<Media {...props.media} />
				</PostMedia>
			);
		default:
			return null;
	}
}
