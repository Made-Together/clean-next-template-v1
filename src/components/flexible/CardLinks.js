import React from "react";
import styled from "styled-components";
import { Section } from "~/components/elements/Section";
import TextCard from "~/components/elements/TextCard";

const CardContainer = styled.div`
	.outline-style {
		box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.15);
		p {
			opacity: 0.7;
		}
	}
`;

export default function CardLinks({ section, cards }) {
	return (
		<Section {...section}>
			<div className="container">
				<CardContainer className="grid gap-[24px] md:grid-cols-2">
					{cards?.map((card, i) => (
						<div
							key={`card${i}`}
							className={` rounded-[15px] py-[25px] px-[25px]  md:py-12 md:px-[50px] ${
								card?.style === "solid" ? "bg-grey md:py-[74px] " : "outline-style md:py-[57px]"
							}`}
						>
							<div className="mx-auto md:max-w-[487px]">
								<TextCard
									{...card?.text_card}
									options={{
										...card?.text_card?.options,
										headingClasses: card?.style === "solid" ? `md:mb-[18px] mr-auto md:mx-auto ` : `md:mb-[5px]`,
									}}
								/>
							</div>
						</div>
					))}
				</CardContainer>
			</div>
		</Section>
	);
}
