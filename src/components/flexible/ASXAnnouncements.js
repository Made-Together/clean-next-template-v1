import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DownloadIcon, PriceSensitiveIcon } from "~/components/elements/Icon";
import { TextLink } from "~/components/elements/Button";
import { Link } from "~/components/elements/links/Link";
import Switch from "~/components/elements/Switch";
import useYourir from "~/hooks/useYourir";

const AnnouncementsStyled = styled.div`
	.yourir-disabled {
		@apply opacity-0;
	}

	.next-page {
		span.bg-orange {
			order: 1;
			/* transform: rotate(180deg); */
		}

		.inline-block {
			@apply !ml-0 !mr-2;
		}

		&.group:hover .inline-block {
			transform: none !important;
		}
	}

	.previous-page {
		span.bg-orange {
			order: -1;
			transform: scale(-1) translateY(-1px);
		}

		&.group:hover .inline-block {
			transform: none !important;
		}
	}

	.yourir-price-sensitive + .yourir-price-sensitive-target {
		opacity: 1 !important;
	}
`;

export default function ASXAnnouncements({ heading, description, short = false }) {
	const scriptStatus = useYourir("https://yourir.info/a9c1d5d553a012b2.js");

	useEffect(() => {
		if (scriptStatus === "ready") {
			setTimeout(() => {
				if (window?.yourir?.setupFormatting) {
					window?.yourir?.setupFormatting();
				}
			}, 200);
		}
	}, [scriptStatus]);

	const priceSensitiveRef = React.useRef(null);
	const [showPriceSensitive, setShowPriceSensitive] = useState(false);

	useEffect(() => {
		const checkbox = priceSensitiveRef.current;
		if (checkbox) {
			checkbox.click();
		}
	}, [showPriceSensitive]);

	return (
		<div className={`${!short ? "container py-20 md:py-32" : ""}`}>
			<AnnouncementsStyled data-yourir={`announcements pageSize=${short ? 5 : 100} startYear=2017`}>
				{heading && (
					<div className="mb-8 text-center md:mb-12">
						<h2 className="text-h2">{heading}</h2>
						<p className="mx-auto mt-4 max-w-[800px] md:mt-6">{description}</p>
					</div>
				)}
				<div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0">
					<div className="mt-6 flex w-full items-center space-x-[24px] md:mt-0 md:w-1/2">
						<select className="w-full flex-auto appearance-none rounded-md border-[#D0D8E3] py-[18px] pl-[30px]" data-yourir="year" label="year" />

						<select className="w-full flex-auto appearance-none rounded-md border-[#D0D8E3] py-[18px] pl-[30px]" data-yourir="filter">
							<option value="">All types</option>
							<option value="securityHolder">Security Holder Notices</option>
							<option value="annualReports">Annual Reports</option>
							<option value="periodicReports">Periodic Reports</option>
							<option value="dividendNotices">Dividend Notices</option>
							<option value="companyAdministration">Company Administration</option>
							<option value="priceSensitive">Price Sensitive</option>
							<option value="nonProcedural">Non-Procedural</option>
						</select>
					</div>
					<div className="text-18px mx-auto mt-4 flex items-center space-x-3 md:mt-0 md:ml-auto md:mr-0">
						<div className="w-[24px]">
							<PriceSensitiveIcon />
						</div>
						<div>Price Sensitive</div>
						<Switch onClick={() => setShowPriceSensitive(!showPriceSensitive)} active={showPriceSensitive} />
						<input ref={priceSensitiveRef} className="screenreader-text" type="checkbox" data-yourir="priceSensitiveOnly" />
					</div>
				</div>
				<div className="my-12 space-y-4 lg:space-y-6" data-yourir="items" style={{ minHeight: scriptStatus !== "ready" ? `${511}px` : "" }}>
					<a
						download
						className="block items-center space-y-2 rounded-[5px] bg-grey px-6 py-5 transition-shadow duration-300 hover:shadow-lg md:flex md:space-y-0 md:rounded-[15px] lg:py-[26px] lg:px-[60px]"
						href="#"
						target="_blank"
						rel="noreferrer"
					>
						{/* eslint-disable-next-line */}
						<h3 className="text-22px font-medium lg:w-[600px]" data-yourir="$cur.heading" />
						<div className="text-18px mb-2 ml-auto md:mb-0 md:pl-6" data-yourir="$cur.date" />
						<div className="flex md:ml-[25px] lg:ml-[60px] xl:ml-[120px]">
							<div data-yourir="$cur.priceSensitiveCSS">
								<div className="hidden w-0" data-yourir="$cur.priceSensitiveMarker" />
							</div>
							<div className="yourir-price-sensitive-target mr-[12px] w-[30px] opacity-0 md:mr-[25px] lg:mr-[40px] xl:mr-[80px]">
								<div className="">
									<PriceSensitiveIcon />
								</div>
							</div>
							<div className="">
								<DownloadIcon />
							</div>
						</div>
					</a>
				</div>
				<div data-yourir="if isEmpty" className="mt-12">
					No results
				</div>

				<div className="flex justify-center space-x-10">
					<div data-yourir="prevPage">
						<TextLink className="previous-page">Prev Page</TextLink>
					</div>
					<div data-yourir="nextPage">
						<TextLink className="next-page">Next Page</TextLink>
					</div>
				</div>

				{short && (
					<div className="mt-8 flex flex-col items-center justify-center">
						<Link className="mx-auto" type="button" link={{ url: "/company/investors/asx/", title: "Show All ASX Announcements" }} />
					</div>
				)}
			</AnnouncementsStyled>
		</div>
	);
}
