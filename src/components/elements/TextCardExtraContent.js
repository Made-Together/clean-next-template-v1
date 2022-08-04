import React from "react";
import Image from "~/components/elements/Image";
import { Link } from "~/components/elements/links/Link";
import { getSectionColourClasses } from "~/components/elements/Section";

export default function TextCardExtraContent(props) {
	const hasBorderSeparator =
		/^((testimonial))$/g.test(props?.layout) || (props?.layout === "cta" && (!props?.cta?.background_color || props?.cta?.background_color === "transparent"));

	return (
		<div className={`!mt-12 ${hasBorderSeparator && "border-t border-[#d2d3d3] !pt-8"} ${props?.layout === "mini-card" && "border-t border-grey !pt-8"}`}>
			<TextCardExtraContentRenderer {...props} />
		</div>
	);
}

function TextCardExtraContentRenderer({ layout, testimonial, cta, miniCard }) {
	switch (layout) {
		case "testimonial":
			return <Testimonial {...testimonial?.testimonial_selector} />;
		case "cta":
			return <CTA {...cta} />;
		case "mini-card":
			return <MiniCard {...miniCard} />;
		default:
			return null;
	}
}

function MiniCard(props) {
	return (
		<div className="text-18px md:max-w-[425px]">
			{props?.heading && <h4 className="text-20px font-bold leading-[1.2] tracking-[-0.01em] ">{props?.heading}</h4>}
			{props?.content && <div className="text-16px mt-[10px] " dangerouslySetInnerHTML={{ __html: props?.content }} />}
		</div>
	);
}

function Testimonial(props) {
	const testimonial = props?.acf;
	return (
		<div className="text-18px pr-10">
			<div className="mb-6" dangerouslySetInnerHTML={{ __html: testimonial?.quote }} />
			<div className="font-semibold">
				{testimonial?.cite_name}
				{testimonial?.cite_company && <span>, {testimonial.cite_company}</span>}
			</div>
		</div>
	);
}

function CTA({ heading, content, icon, link, background_color }) {
	return (
		<div className={`space-y-2.5 rounded-lg p-8 lg:p-10 ${getSectionColourClasses(background_color)}`}>
			{icon && <Image image={icon} className="inline-block w-full max-w-[28px] pb-3" />}
			{heading && <h3 className="text-20px font-semibold">{heading}</h3>}
			{content && <div className="text-18px leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />}
			{link?.url && <Link link={link} type="text" className="pb-1" />}
		</div>
	);
}
