import React from "react";
import { SimpleQuote } from "~/components/elements/Icon";

function Quote(props) {
	const { name, quote, type } = props;

	return type === "simple" ? (
		<div className="my-16 mx-auto max-w-[792px] justify-between md:flex">
			<div className="mb-3 flex-none md:mb-0">
				<SimpleQuote />
			</div>
			<div className="text-24px relative mx-auto max-w-[636px] px-[10px] font-semibold leading-[1.40] lg:px-0   ">{quote}</div>
			<div className="mt-[-25px] self-end ">
				<div className="rotate-[188deg]">
					<SimpleQuote />
				</div>
			</div>
		</div>
	) : (
		<div className="text-18px relative mb-[16px] rounded-[15px] bg-light-beige py-[30px] px-5 pb-[36px] md:px-[41px] md:pt-[46px]">
			<div className="absolute bottom-0 right-0">
				<svg width="177" height="130" viewBox="0 0 177 130" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M77.8502 158.424C59.3965 177.117 27.9695 172.175 13.255 152.381C-4.16012 129.004 -7.63738 84.698 22.7021 45.0648C37.7509 25.4062 55.8871 10.5012 77.0922 0.349609L86.8721 17.5106C56.7071 33.4361 34.161 55.0287 30.966 91.2302C44.5761 91.2302 55.8681 90.6931 65.9258 94.614C77.3765 99.0781 84.3318 107.357 87.1864 116.851C91.7146 131.715 89.5195 146.603 77.8502 158.424ZM187.222 158.424C168.768 177.117 137.341 172.175 122.627 152.381C105.212 129.004 101.734 84.698 132.074 45.0648C147.123 25.4062 165.259 10.5012 186.464 0.349609L196.244 17.5106C166.079 33.4361 143.533 55.0287 140.338 91.2302C153.948 91.2302 165.24 90.6931 175.298 94.614C186.748 99.0781 193.704 107.357 196.558 116.851C201.086 131.715 198.891 146.603 187.222 158.424Z"
						fill="#F1EBE2"
					/>
				</svg>
			</div>
			<div className="relative">
				<p className="max-w-[667px] font-medium">{quote}</p>
				<div className=" mt-14">{name}</div>
			</div>
		</div>
	);
}

export default Quote;
