import React from "react";
import Image from "~/components/elements/Image";
import { ProfileImage } from "~/components/elements/Profile";

function Speakers(props) {
	const { layout, heading, speaker, speakers } = props;

	return layout === "single" ? <SingleSpeaker heading={heading} speaker={speaker} /> : <MultipleSpeakers heading={heading} speakers={speakers} />;
}

export default Speakers;

function Heading({ children, className = "" }) {
	return <div className={`text-15px !font-bold uppercase opacity-50 ${className}`}>{children}</div>;
}

function Role({ children, className = "" }) {
	return <div className={`${className} text-18px opacity-[0.42]`}>{children}</div>;
}

function Socials({ socials, className = "" }) {
	return (
		<div className={`flex items-center space-x-[24px]  ${className}`}>
			{socials &&
				socials?.map((social, i) => {
					const iconType = typeof social?.icon;

					return social?.link?.length > 0 ? (
						<a key={`speaker-${i}`} href={social?.link} target="_blank" className="transition-opacity duration-150 hover:opacity-80" rel="noreferrer">
							{iconType === "string" ? (
								<img src={social?.icon} className="h-[24px] w-[24px]" alt="" />
							) : (
								<Image image={social?.icon} className="h-[24px] w-[24px]" imgClassName="w-[24px] h-[24px] !my-0" />
							)}
						</a>
					) : null;
				})}
		</div>
	);
}

function Border({ className = "" }) {
	return <div className={`h-[1px] w-full bg-black bg-opacity-[0.13] ${className}`} />;
}

function SingleSpeaker({ heading, speaker }) {
	const hasSocials = speaker?.socials && speaker?.socials?.filter((social) => social?.link?.length > 0).length > 0;
	return (
		<div
			style={{ boxShadow: "0px 10px 20px rgb(29 34 34 / 6%)" }}
			className="mx-auto my-[60px] max-w-[792px] justify-between rounded-[15px] border border-black border-opacity-[0.14] md:flex"
		>
			<div className="md:py-18 flex flex-col justify-center px-8 py-10 md:px-12">
				<div className="mb-3">
					<Heading>{heading}</Heading>
					<div className="text-h3 mt-2 font-medium" dangerouslySetInnerHTML={{ __html: speaker?.name }} />
					{speaker?.role && <Role className="mt-3">{speaker?.role}</Role>}
				</div>

				{hasSocials && <Socials socials={speaker?.socials} className="mt-[18px] md:mt-10" />}
			</div>

			<div className="w-full md:max-w-[305px]">
				<Image
					image={speaker?.image}
					className="h-full"
					imgClassName="rounded-b-[15px] md:rounded-bl-none md:rounded-r-[15px] md:max-w-[305px] h-full"
					objectFit="cover"
				/>
			</div>
		</div>
	);
}

function MultipleSpeakers({ heading, speakers }) {
	return (
		<div className="mx-auto max-w-[792px]">
			<Heading> {heading} </Heading>
			<Border className="mt-[25px]" />
			{speakers?.map((speaker, i) => (
				<React.Fragment key={`speaker${i}`}>
					<div className="pt-[28px] sm:pb-[28px]">
						<div className="items-center justify-between sm:flex">
							<div className="flex items-center space-x-[25px]">
								<ProfileImage className="h-[81px] w-[81px]" image={speaker?.image} />
								<div>
									<div className="text-26px font-medium ">{speaker?.name}</div>
									<Role>{speaker?.role}</Role>
								</div>
							</div>
							<Socials socials={speaker?.socials} />
						</div>
					</div>
					<Border />
				</React.Fragment>
			))}
		</div>
	);
}
