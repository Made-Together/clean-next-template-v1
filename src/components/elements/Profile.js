import React from "react";
import styled from "styled-components";
import Image from "~/components/elements/Image";

const ProfileImageContainer = styled.div`
	img {
		margin: 0 !important;
	}
`;

function Profile(props) {
	const { image, title, description, left_column, right_column } = props;

	return (
		<div className=" mb-[16px] ">
			<div className="rounded-t-[15px] border border-purple bg-purple px-5 py-[30px]  md:px-[35px] ">
				<div className="flex items-center space-x-[36px]">
					<ProfileImage image={image} />
					<div>
						<div className="!text-24px !font-medium !text-white">{title}</div>
						<div className="!text-22px !leading-[28px] !text-white">{description}</div>
					</div>
				</div>
			</div>
			<div className="rounded-b-[15px] border  border-purple">
				<div className="justify-between gap-x-[25px] px-5 pt-[34px] pb-[45px] md:px-[47px] lg:flex">
					<ProfileColumn {...left_column} />
					<ProfileColumn {...right_column} />
				</div>
			</div>
		</div>
	);
}

export default Profile;

export function ProfileImage({ image, className = " w-[110px] h-[110px] " }) {
	return (
		<ProfileImageContainer>
			<Image image={image} className={`h-hull w-full overflow-hidden rounded-full ${className}`} objectFit="cover" />
		</ProfileImageContainer>
	);
}

export function ProfileColumn({ heading, bulletPoints }) {
	return (
		<div className="!text-18px max-w-[436px] flex-auto">
			<div className="font-semibold text-orange ">{heading}</div>
			<ul>
				{bulletPoints?.map((point, i) => (
					<li key={`${point?.fieldGroupName}${i}`}>{point?.text}</li>
				))}
			</ul>
		</div>
	);
}
