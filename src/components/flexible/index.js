import React from "react";
import Accordion from "~/components/flexible/Accordion";
import ArchiveGrid from "~/components/flexible/ArchiveGrid";
import Awards from "~/components/flexible/Awards";
import Testimonial from "~/components/flexible/Testimonial";
import Masthead from "~/components/flexible/Masthead";
import IconGrid from "~/components/flexible/IconGrid";
import OneColumn from "~/components/flexible/OneColumn";
import Tabs from "~/components/flexible/Tabs";
import TwoColumns from "~/components/flexible/TwoColumns";
import CTA from "~/components/flexible/CTA";
import ArchiveLandingPage from "~/components/flexible/ArchiveLandingPage";
import HistorySlider from "~/components/flexible/HistorySlider";
import GridSwitcher from "~/components/flexible/GridSwitcher";
import FAQs from "~/components/flexible/FAQs";
import OfficesTest from "~/components/flexible/Offices";
import CardLinks from "~/components/flexible/CardLinks";
import StatsSection from "~/components/flexible/StatsSection";
import PressReleaseBlock from "~/components/flexible/PressReleaseBlock";
import ScrollingMasthead from "~/components/flexible/ScrollingMasthead";
import TestimonialSlider from "~/components/flexible/TestimonialSlider";
import TwoColumnVerticalScroll from "~/components/flexible/TwoColumnVerticalScroll";
import WordSlider from "~/components/flexible/WordSlider";
import FullPageTemplate from "~/components/flexible/FullPageTemplate";
import JobsList from "~/components/flexible/JobsList";
import ASXAnnouncements from "~/components/flexible/ASXAnnouncements";
import Space from "~/components/elements/Space";
import ABTest from "~/components/elements/ABTest";

export default function FlexibleLayout(props) {
	const { acf_fc_layout } = props;

	switch (acf_fc_layout) {
		case "masthead":
			return <Masthead {...props} />;
		case "two_columns":
			return <TwoColumns {...props} />;
		case "one_column":
			return <OneColumn {...props} />;
		case "icon_grid":
			return <IconGrid {...props} />;
		case "cta":
			return <CTA {...props} />;
		case "testimonial_section":
			return <Testimonial {...props} />;
		case "archive_grid":
			return <ArchiveGrid {...props} />;
		case "accordion":
			return <Accordion {...props} />;
		case "tabs":
			return <Tabs {...props} />;
		case "archive_landing_page":
			return <ArchiveLandingPage {...props} />;
		case "awards":
			return <Awards {...props} />;
		case "history_slider":
			return <HistorySlider {...props} />;
		case "faqs":
			return <FAQs {...props} />;
		case "grid_switcher":
			return <GridSwitcher {...props} />;
		case "offices":
			return <OfficesTest {...props} />;
		case "html":
			return <div dangerouslySetInnerHTML={{ __html: props?.html }} />;
		case "press_release_block":
			return <PressReleaseBlock {...props} />;
		case "card_links":
			return <CardLinks {...props} />;
		case "stats_section":
			return <StatsSection {...props} />;
		case "testimonial_slider":
			return <TestimonialSlider {...props} />;
		case "scrolling_masthead":
			return <ScrollingMasthead {...props} />;
		case "two_column_vertical_scroll":
			return <TwoColumnVerticalScroll {...props} />;
		case "word_slider":
			return <WordSlider {...props} />;
		case "full_page_template":
			return <FullPageTemplate {...props} />;
		case "jobs_list":
			return <JobsList {...props} />;
		case "asx_announcements":
			return <ASXAnnouncements {...props} />;
		case `space`:
			return <Space {...props?.space} />;
		case `ab_test`:
			return <ABTest {...props} />;
		default:
			return <div className="mx-8 border border-orange p-12 text-center text-orange">&quot;{acf_fc_layout}&quot; flexible layout not found</div>;
	}
}
