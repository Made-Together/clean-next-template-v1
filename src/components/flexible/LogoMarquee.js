/* eslint-disable react/no-array-index-key */
import Image from "next/image";
import React from "react";
import Marquee from "react-easy-marquee";

function LogoMarquee(props) {
	const { logos } = props;

	return (
		<div className="container">
			<Marquee duration={20000} height="97px" className=" border-01  rounded-[10px]  py-8">
				{logos?.map((logo, i) => (
					<div style={{}} key={`logo${i}`} className="mr-8  flex h-[33px] w-[100px] items-center md:w-[146px] lg:mr-16 ">
						<Image height={logo?.logo?.height} width={logo?.logo?.width} src={logo?.logo?.url} />
					</div>
				))}
			</Marquee>
		</div>
	);
}

export default LogoMarquee;
