import React from "react";

function LinkedInIcon({ width = 22, height = 22, inverted }) {
	return inverted ? (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 17 17" fill="none">
			<g clipPath="url(#clip0_1313_5121)">
				<path fillRule="evenodd" clipRule="evenodd" d="M0.625 16.1132H3.94251V5.07422H0.625V16.1132Z" fill="white" />
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M16.1011 9.96783V16.1133H12.8533V10.3093C12.8533 8.82979 12.3295 7.91935 11.1771 7.91935C10.4312 7.91138 9.76073 8.41212 9.50091 9.1712C9.40767 9.46254 9.37205 9.77323 9.39615 10.0816V16.1133H6.14844V5.41565H9.39615V6.89511C10.0058 5.76389 11.1237 5.07082 12.3295 5.07423C14.4248 5.07423 16.1011 6.6675 16.1011 9.96783Z"
					fill="white"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M2.33061 0.664933C1.47875 0.571223 0.718808 1.24676 0.63258 2.1715C0.627842 2.21887 0.625947 2.26521 0.625 2.31258C0.625947 3.22599 1.30819 3.96434 2.14773 3.96228C2.1771 3.96228 2.20648 3.96228 2.23585 3.96022C3.08771 4.0529 3.84765 3.37943 3.93388 2.45365C3.93767 2.40629 3.94051 2.35995 3.94146 2.31258C3.97178 1.43109 3.33881 0.691707 2.52865 0.657724C2.46232 0.655665 2.39599 0.657724 2.33061 0.664933Z"
					fill="white"
				/>
			</g>
			<defs>
				<clipPath id="clip0_1313_5121">
					<rect width="17" height="16" fill="white" transform="translate(0 0.5)" />
				</clipPath>
			</defs>
		</svg>
	) : (
		<svg width={width} height={height} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M20.9548 0.130859H1.04993C0.540421 0.130859 0.132812 0.538468 0.132812 1.04798V20.9868C0.132812 21.4624 0.540421 21.87 1.04993 21.87H20.9888C21.4983 21.87 21.9059 21.4624 21.9059 20.9529V1.04798C21.8719 0.538468 21.4643 0.130859 20.9548 0.130859ZM6.58662 18.6431H3.35971V8.28303H6.58662V18.6431ZM4.95618 6.8564C3.93716 6.8564 3.08798 6.00722 3.08798 4.9882C3.08798 3.96917 3.93716 3.11999 4.95618 3.11999C5.9752 3.11999 6.82439 3.96917 6.82439 4.9882C6.82439 6.04119 6.00917 6.8564 4.95618 6.8564ZM18.645 18.6431H15.4181V13.6159C15.4181 12.4271 15.3842 10.8646 13.7537 10.8646C12.0893 10.8646 11.8176 12.1893 11.8176 13.514V18.6431H8.59069V8.28303H11.6817V9.70966H11.7157C12.1573 8.89445 13.2103 8.04526 14.7728 8.04526C18.0336 8.04526 18.645 10.1852 18.645 12.9705V18.6431Z"
				fill="currentColor"
			/>
		</svg>
	);
}

export default LinkedInIcon;
