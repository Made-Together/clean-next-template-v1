import { useState, useEffect } from "react";

function appendScript(baseUrl, setScriptLoaded) {
	if (window.MktoForms2) return setScriptLoaded(true);

	const script = document.createElement("script");
	script.onload = () => (window.MktoForms2 ? setScriptLoaded(true) : null);
	script.src = `${baseUrl}/js/forms2/js/forms2.min.js`;
	document.body.appendChild(script);
	return null;
}

export default function useMarketo({
	baseUrl = "//098-CYL-203.mktoweb.com",
	munchkinId = "098-CYL-203",
	initialValues = {},
	form_id = "",
	formName = "Unnamed Form",
	onLoad = () => {},
	onSubmit = () => {},
}) {
	const [scriptLoaded, setScriptLoaded] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [isSent, setIsSent] = useState(false);

	useEffect(() => {
		if (scriptLoaded) {
			if (isLoaded) return;

			window.MktoForms2.loadForm(baseUrl, munchkinId, form_id, (form) => {
				// set flag to prevent the form from being loaded again
				setIsLoaded(true);

				// set any initial values (utm_source, utm_medium, etc)
				// console.log(initialValues);

				form.setValues(initialValues);

				// console.log(form.getValues());

				// Call user defined onLoad function if it exists
				onLoad && onLoad();

				// Add event listener for when form is successfully submitted
				form.onSuccess((fields, followUpUrl) => {
					console.log("Form submitted successfully");

					// Send event to Google Analytics
					if (typeof window?.dataLayer?.push !== "undefined") {
						window.dataLayer.push({
							event: "form-submit",
							pageUrl: window.location.pathname,
							formName,
						});
					}

					setIsSent(true);

					// Call user defined onSubmit function
					onSubmit && onSubmit();

					// Redirect to followUpUrl if it exists
					console.log(followUpUrl);

					if (followUpUrl && followUpUrl.split("?")[0] !== `${window.location.protocol}//${window.location.host}${window.location.pathname}`) {
						window.open(followUpUrl, "_blank");
					}

					return false;
				});
			});

			return;
		}

		appendScript(baseUrl, setScriptLoaded);
	}, [scriptLoaded, baseUrl, munchkinId, form_id, onLoad]);

	return {
		isSent,
		isLoaded,
	};
}
