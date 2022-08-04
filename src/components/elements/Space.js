import React from "react";
import styled, { css } from "styled-components";
import { theme } from "../../../tailwind.config";

const SpaceContainer = styled.div`
	margin-top: 0 !important;
	margin-bottom: ${(props) => props.space_default}px!important;

	${({ space_sm }) =>
		space_sm &&
		css`
			@media screen and (min-width: ${theme.screens.sm}) and (max-width: ${theme.screens.md}) {
				margin-bottom: ${(props) => props.space_sm}px!important;
			}
		`}

	${({ space_md }) =>
		space_md &&
		css`
			@media screen and (min-width: ${theme.screens.md}) and (max-width: ${theme.screens.lg}) {
				margin-bottom: ${(props) => props.space_md}px!important;
			}
		`}

		${({ space_lg }) =>
		space_lg &&
		css`
			@media screen and (min-width: ${theme.screens.lg}) and (max-width: ${theme.screens.xl}) {
				margin-bottom: ${(props) => props.space_lg}px!important;
			}
		`}

		${({ space_xl }) =>
		space_xl &&
		css`
			@media screen and (min-width: ${theme.screens.xl}) {
				margin-bottom: ${(props) => props.space_xl}px!important;
			}
		`}
`;

export default function Space(props) {
	return <SpaceContainer {...props} />;
}
