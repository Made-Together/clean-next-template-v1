import React from "react";
import Media from "~/components/elements/Media";
import NewsBanner from "~/components/elements/NewsBanner";
import { getSectionColourClasses, Section } from "~/components/elements/Section";
import TextCard from "~/components/elements/TextCard";
import OffscreenGallerySlider from "~/components/flexible/OffscreenGallerySlider";
import ProductShotParallax from "~/components/flexible/ProductShotParallax";

export default function OneColumn({ section, layout, text_card, media: { media, remove_margin_bottom }, has_cta, cta, gallery, padded, is_padded_section }) {
	const isOffscreen = layout === "offscreen-gallery";
	const isProductShotParallax = layout === "product-shot-parallax";
	const layoutClasses =
		is_padded_section === true
			? `py-16 md:py-24 px-5 sm:px-8 ${remove_margin_bottom && "!pb-0 mb-12 md:mb-16"} rounded-xl overflow-hidden ${getSectionColourClasses(
					padded?.background_color
			  )}`
			: "";

	const mediaClasses = `mt-8 sm:mt-16 md:mt-20 ${is_padded_section === true ? "sm:px-5 max-w-5xl mx-auto" : ""}`;

	return (
		<Section {...section} className={remove_margin_bottom || isOffscreen || isProductShotParallax ? "overflow-hidden !pb-0" : ""}>
			<div className={`${!isOffscreen && !isProductShotParallax ? "container" : ""} ${is_padded_section ? " !max-w-[100%]" : ""} `}>
				<div className={layoutClasses}>
					<div className={isOffscreen || is_padded_section || isProductShotParallax ? "container" : ""}>
						<TextCard {...text_card} />
					</div>

					{has_cta && (
						<div className="container mt-8 sm:mt-12 md:mt-14">
							<NewsBanner newsBanner={cta} />
						</div>
					)}

					<div>
						{media && media?.type && (
							<div className={mediaClasses}>
								<Media {...media} />
							</div>
						)}
						{gallery?.length > 0 && (
							<>
								{isOffscreen && <OffscreenGallerySlider items={gallery} />}
								{isProductShotParallax && <ProductShotParallax items={gallery} />}
							</>
						)}
					</div>
				</div>
			</div>
		</Section>
	);
}
