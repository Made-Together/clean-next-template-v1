const useSpanHeading = (text = "", spanClass = "underline-stroke underline-stroke-orange") => {
	if (!text) return "";
	const shortcodeRegex = /\[span([^\]]*)\]([\s\S]*?)\[\/span\]/g;
	const matches = text.match(shortcodeRegex);
	if (!matches) return text;

	return text.replace(shortcodeRegex, '<span class="text-embellishment $1"><span>$2</span></span>');
};

export default useSpanHeading;
