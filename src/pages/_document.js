import Document, { Html, Head, Main, NextScript } from "next/document";
// import Script from "next/script";

export default class MyDocument extends Document {
	render() {
		return (
			<Html>
				{/* optimize anti-flicker snippet — https://support.google.com/optimize/answer/7100284 */}
				<style dangerouslySetInnerHTML={{ __html: `.async-hide { opacity: 0 !important} ` }} />
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
