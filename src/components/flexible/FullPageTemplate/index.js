import React from "react";
import Page404 from "~/components/flexible/FullPageTemplate/Page404";
import PageDocument from "~/components/flexible/FullPageTemplate/PageDocument";
import PageInvestorRelations from "~/components/flexible/FullPageTemplate/PageInvestorRelations";

export default function FullPageTemplate({ layout, ...props }) {
	switch (layout) {
		case "404":
			return <Page404 {...props} />;
		case "document":
			return <PageDocument {...props} />;
		case "investor-relations":
			return <PageInvestorRelations {...props} />;
		default:
			return null;
	}
}
