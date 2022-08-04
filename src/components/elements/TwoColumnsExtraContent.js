import React, { useState, useEffect, useLayoutEffect } from "react";
import chunk from "lodash/chunk";
import TextCard from "~/components/elements/TextCard";
import Image from "~/components/elements/Image";
import Modal from "~/components/elements/forms/FormModal";
import { CustomerStoriesGridItem } from "~/components/flexible/IconGrid";
import { useRouter } from "next/router";

export default function TwoColumnsExtraContent(props) {
	const { layout } = props;

	return layout !== null && layout !== "" ? (
		<div className="mt-16">
			<TwoColumnsExtraContentRenderer {...props} />
		</div>
	) : null;
}

function TwoColumnsExtraContentRenderer({ layout, icon_cards, languages_modal }) {
	switch (layout) {
		case "icon-cards":
			return <IconCards {...icon_cards} />;
		case "languages-modal":
			return <LanguagesModal {...languages_modal} />;
		default:
			return null;
	}
}

function IconCards({ items }) {
	return (
		<div className="container">
			<div className="grid gap-6 md:grid-cols-2">
				{items.map((item, index) => (
					<CustomerStoriesGridItem backgroundColor="bg-white" key={`${item?.heading}${index}`} link={item?.link}>
						<div className="flex-auto">
							<h3 className="text-22px mb-3" dangerouslySetInnerHTML={{ __html: item?.heading }} />
							<div className="text-18px leading-relaxed opacity-80" dangerouslySetInnerHTML={{ __html: item?.content }} />
						</div>
					</CustomerStoriesGridItem>
				))}
			</div>
		</div>
	);
}

function LanguagesModal({ items, text_card }) {
	const router = useRouter();
	const [modalOpen, setModalOpen] = useState(false);

	const [chunkedRows, setChunkedRows] = useState();

	useEffect(() => {
		setChunkedRows(chunk(items, Math.ceil(items.length / 4)));
	}, [items]);

	useEffect(() => {
		if (!modalOpen && router.asPath.split("#")[1] === "supported-languages") {
			setModalOpen(true);
		}
		// eslint-disable-next-line
	}, [router.asPath]);

	// Remove hash from url
	useEffect(() => {
		const hashy = router.asPath.split("#")[1];
		if (!modalOpen && hashy === "supported-languages") {
			router.push(
				{
					pathname: router.asPath.split("#")[0],
				},
				"",
				{ scroll: false }
			);
		}
		// eslint-disable-next-line
	}, [modalOpen]);

	useLayoutEffect(() => {
		const onResize = () => {
			const mes = window.innerWidth > 768 ? 4 : window.innerWidth > 640 ? 2 : 1;
			setChunkedRows(chunk(items, Math.ceil(items.length / mes)));
		};
		onResize();
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
		// eslint-disable-next-line
	}, []);

	return (
		modalOpen && (
			<Modal maxWidth={1040} setModalOpen={setModalOpen}>
				<div className="mx-auto mb-4 max-w-[1000px]">
					{text_card?.heading.length && (
						<header className="mb-8 lg:mb-12">
							<TextCard {...text_card} />
						</header>
					)}

					<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
						{chunkedRows?.map((rowItems, index) => (
							<div key={`row${index}`} className="space-y-2 sm:space-y-4 md:space-y-6">
								{rowItems.map((language, itemIndex) => (
									<div key={`item-${itemIndex}`} className="flex items-center space-x-4">
										<div className="flex-[0_0_40px]">
											{language.flag ? <Image className="w-full" image={language.flag} /> : <div className="h-[27px] w-full rounded bg-grey" />}
										</div>
										<div className="text-15px">{language.heading}</div>
									</div>
								))}
							</div>
						))}
					</div>
				</div>
			</Modal>
		)
	);
}
