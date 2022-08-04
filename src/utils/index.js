export const getFirstSectionBg = (wpPage) => {
	try {
		return wpPage?.flexibleContent?.flexibleContent[0]?.section?.backgroundColor || "";
	} catch (error) {
		return "";
	}
};
