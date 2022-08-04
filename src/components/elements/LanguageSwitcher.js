import Link from "next/link";
import { useRouter } from "next/router";

import EnFlag from "~/assets/images/flags/en.png";
import FrFlag from "~/assets/images/flags/fr.png";

export default function LanguageSwitcher() {
	const flagMap = {
		en: EnFlag,
		fr: FrFlag,
	};

	const router = useRouter();
	const { locales, locale: activeLocale } = router;
	// const otherLocales = locales.filter((locale) => locale !== activeLocale);

	return (
		<div>
			<ul className="flex space-x-3">
				{locales.map((locale) => {
					const { pathname, query, asPath } = router;
					return (
						<li key={`lang-switch-${locale}`} className={activeLocale === locale ? "pointer-events-none" : "trans opacity-50 hover:opacity-100"}>
							<Link href={{ pathname, query }} as={asPath} locale={locale}>
								<a>
									<img src={flagMap[locale].src} alt={locale} className="max-w-[1.33rem]" />
								</a>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
