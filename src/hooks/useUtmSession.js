export function parseQueryString(raw) {
	if (!raw) return {};
	return raw
		.replace("?", "")
		.split("&")
		.reduce((acc, p) => {
			let [key, value] = decodeURIComponent(p).split("=");
			// turn boolean to correct value
			if (/true|false/.test(value)) {
				value = value === "true";
			}
			// deal with array
			if (/(\w+)\[\]$/.test(key)) {
				key = key.match(/(\w+)\[\]$/)[1];
				if (!Array.isArray(acc[key])) acc[key] = [];
				acc[key].push(value);
			} else {
				acc[key] = value;
			}
			return acc;
		}, {});
}

export function parseUtm(queryString) {
	const { utm_name = "", utm_source = "", utm_medium = "", utm_campaign = "", utm_term = "", utm_content = "" } = parseQueryString(queryString);

	return {
		utm_name,
		utm_source,
		utm_medium,
		utm_campaign,
		utm_term,
		utm_content,
	};
}

export function setUtmToSession(utm) {
	window.sessionStorage.setItem("utm", JSON.stringify(utm));
}

export function getUtmFromSession() {
	const defaultData = {
		utm_name: "",
		utm_source: "",
		utm_medium: "",
		utm_campaign: "",
		utm_term: "",
		utm_content: "",
	};
	try {
		const json = window.sessionStorage.getItem("utm");
		if (json) {
			return JSON.parse(json);
		}
		return defaultData;
	} catch (err) {
		return defaultData;
	}
}

export function preserveUtm(queryString) {
	const utm = parseUtm(queryString);
	setUtmToSession(utm);
}
