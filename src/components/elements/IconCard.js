import React from "react";
import Image from "~/components/elements/Image";

function IconCard(props) {
	const { icon, text } = props;

	return (
		<div className="text-18px relative mb-[16px] rounded-[15px] bg-light-beige py-[30px] px-5 pb-[36px] md:px-[41px] md:pt-[46px]">
			<div className="max-w-xxs w-full rounded-[15px] bg-beige">
				<div className="p-[15px]">
					<Image image={icon} className="!m-0 flex max-h-[30px] flex-col items-start" />
				</div>
			</div>
			<div className="text-24px my-0 mt-5 font-medium !leading-[1.20] md:mt-[48px]" dangerouslySetInnerHTML={{ __html: text }} />
		</div>
	);
}

export default IconCard;
