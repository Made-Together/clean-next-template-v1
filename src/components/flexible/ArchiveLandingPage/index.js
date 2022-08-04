import React from "react";
import dynamic from "next/dynamic";

const CustomerStoryLandingPage = dynamic(() => import("~/components/flexible/ArchiveLandingPage/CustomerStoryLandingPage"));
const GetStartedLandingPage = dynamic(() => import("~/components/flexible/ArchiveLandingPage/GetStartedLandingPage"));
const IntegrationLandingPage = dynamic(() => import("~/components/flexible/ArchiveLandingPage/IntegrationLandingPage"));
const PartnerLandingPage = dynamic(() => import("~/components/flexible/ArchiveLandingPage/PartnerLandingPage"));
const ResourcesLandingPage = dynamic(() => import("~/components/flexible/ArchiveLandingPage/ResourcesLandingPage"));

export default function ArchiveLandingPage({ post_type, ...props }) {
	switch (post_type) {
		case "integration":
			return <IntegrationLandingPage {...props} />;
		case "customer_story":
			return <CustomerStoryLandingPage {...props} />;
		case "partner":
			return <PartnerLandingPage {...props} />;
		case "get-started":
			return <GetStartedLandingPage {...props} />;
		case "resources":
			return <ResourcesLandingPage {...props} />;
		default:
			return null;
	}
}
