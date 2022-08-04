import React, { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import styled from "styled-components";
import FormModal from "~/components/elements/forms/FormModal";
import { Link } from "~/components/elements/links/Link";

import { getUtmFromSession } from "~/hooks/useUtmSession";
import useMarketo from "~/hooks/useMarketo";

import useStore from "~/hooks/useStore";

const StyledFormContainer = styled.div`
	form.mktoForm {
		box-shadow: none !important;
		font-family: Matter, Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji" !important;
		border: none;
		margin: 0 !important;
		padding: 0 !important;

		.mktoFormCol {
			padding-left: 0;
			padding-right: 0;
		}

		.mktoField {
			font-family: Matter, Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji" !important;
		}

		.mktoLabel,
		.mktoLabel *,
		.mktoHtmlText,
		.mktoHtmlText * {
			font-family: Matter, Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji" !important;
			text-align: left !important;
			color: #425563 !important;
			font-weight: normal !important;
		}

		select {
			/* Make unselected select text input placeholder color */
			&:not(.mktoValid) {
				color: #6d7280 !important;
			}
		}

		textarea {
			padding-top: 0.75rem !important;
			padding-bottom: 0.75rem !important;
			resize: vertical;
			height: auto !important;
			min-height: 80px !important;
		}

		button[type="submit"].mktoButton {
			font-family: Matter, Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji" !important;
			padding: 1rem 1.25rem !important;
			border-radius: 0.25rem !important;
			box-shadow: none !important;
			color: #fff !important;
			line-height: 1.3 !important;
			font-weight: 500 !important;
			font-size: 16px !important;
			text-align: center !important;
			background-color: #f5663e;
			width: 100% !important;
			cursor: pointer !important;
			border: none !important;
			background-image: none !important;
			text-shadow: none !important;
		}
	}
`;

export default function MarketoForm({ type, form_id, formName, content_download_name, confirmation, setIsSent, initialValues = {} }) {
	const user = useStore((state) => state.user);
	const { email } = user;

	const { utm_campaign = "", utm_source = "", utm_medium = "" } = getUtmFromSession();

	// If is content download, always use the content download form ID so that the form is always the same.
	// The content_download_name variable should route the user to the correct confirmation message.
	if (type === "content-download") {
		// eslint-disable-next-line
		form_id = 1136;
		// eslint-disable-next-line
		initialValues.assetDownloaded = content_download_name;
	}

	const { isSent, isLoaded } = useMarketo({
		form_id,
		formName,
		// Allow user to define their own onLoad function in addition to default load function handler
		onLoad: () => console.log("marketo form loaded"),
		// Allow user to define their own onSubmit function in addition to default submit function handler
		onSubmit: () => console.log("marketo form submitted"),
		initialValues: {
			Email: email,
			utm_campaign__c: utm_campaign,
			utm_source__c: utm_source,
			utm_medium__c: utm_medium,
			...initialValues,
		},
	});

	// trigger external setIsSent prop in case form submit should trigger action outside this component
	useEffect(() => {
		if (setIsSent) {
			setIsSent(isSent);
		}
		// eslint-disable-next-line
	}, [isSent]);

	return (
		<>
			{!isLoaded && (
				<div className="flex justify-center py-8">
					<TailSpin ariaLabel="loading-indicator" color="#F5663E" />
				</div>
			)}

			{!isSent ? (
				<StyledFormContainer>
					<form id={`mktoForm_${form_id}`} />
				</StyledFormContainer>
			) : (
				<Confirmation {...confirmation} />
			)}
		</>
	);
}

function Message({ heading, content, button }) {
	return (
		<div className="space-y-4">
			<h3 className="text-h3" dangerouslySetInnerHTML={{ __html: heading }} />
			<div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
			{button?.url && (
				<div className="pt-1">
					<Link type="button" link={button} />
				</div>
			)}
		</div>
	);
}

function Confirmation(props) {
	const { layout = "inline" } = props;
	const [modalOpen, setModalOpen] = useState(true);

	return (
		<>
			{layout === "inline" && <Message {...props} />}
			{layout === "modal" && modalOpen && (
				<FormModal setModalOpen={setModalOpen}>
					<Message {...props} />
				</FormModal>
			)}
		</>
	);
}
