import { useHotkeys } from "react-hotkeys-hook";

export default function WpEditHotkey({ id }) {
	useHotkeys(
		"w+p+m",
		() => {
			if (typeof window !== "undefined" && id) {
				window.open(`https://cms.bosonprotocol.io/wp-admin/post.php?post=${id}&action=edit`);
			}
		},
		[id]
	);
	return null;
}
