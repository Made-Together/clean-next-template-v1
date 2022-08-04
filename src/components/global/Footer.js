import React, { useContext } from "react";
import Logo from "~/components/elements/Logo";
import { Link } from "~/components/elements/links/Link";
import { GlobalContext } from "~/utils/context";
import SocialMedia from "~/components/elements/SocialMedia";
import NewsletterForm from "~/components/elements/forms/GetStartedEmailForm";

export default function Footer() {
	const [context] = useContext(GlobalContext);
	const footerMenus = context?.options?.footer_menus;

	return (
		<footer className="bg-black pt-24 pb-14 text-white">
			<div className="container">
				<div className="-ml-8 flex-wrap md:flex">
					<div className="w-full pl-8 lg:w-[25%]">
						<Link href="/" className="inline-block max-w-[88px]">
							<Logo className="w-full" type="block" color="light" />
						</Link>
					</div>

					<div className="mt-4 flex flex-1 flex-wrap justify-between gap-x-6 pl-8 md:mt-0 md:gap-x-0 lg:space-x-12 lg:pr-12 xl:space-x-20">
						{footerMenus?.map(({ heading, links }, index) => (
							<div className="mt-6 md:mt-12 lg:mt-0 " key={`footer-menu-${index}`}>
								<h6 className="text-18px mb-4 mb-8 font-medium text-dark-grey">{heading}</h6>
								<ul className="text-16px space-y-2 md:space-y-4">
									{links &&
										links?.map(({ link }, linkIndex) => (
											<li key={`footer-menu-${index}-link-${linkIndex}`}>
												<Link link={link} className="trans hover:text-green">
													{link.title}
												</Link>
											</li>
										))}
								</ul>
							</div>
						))}
					</div>
				</div>
				<div className="flex flex-wrap justify-between pt-24">
					<div className="flex-auto pr-10">
						<SocialMedia />
					</div>
					<div className="text-14px flex max-w-[60%] flex-auto items-center space-x-2">
						<h4 className="text-h4 max-w-[305px] opacity-90">Get the latest updates and early access</h4>
						<div className="flex-auto">
							<NewsletterForm />
						</div>
					</div>
				</div>
				<div className="text-14px mt-14  flex  justify-between border-t border-[#18263A] pt-14">
					<div className="flex-wrap items-center md:flex">
						<ul className="flex flex-auto flex-wrap">
							{context?.options?.footer_legal_menu &&
								context?.options?.footer_legal_menu?.map(({ link }, index) => (
									<div key={`footer-legal-${index}`} className="trans group my-3 mr-8 opacity-50 hover:opacity-100">
										<Link link={link}>{link.title}</Link>
									</div>
								))}
						</ul>
					</div>

					<div className="flex flex-col flex-wrap opacity-50 sm:flex-row sm:flex-nowrap sm:items-center sm:justify-between">
						{context?.options?.footer_copyright && (
							<div className="mr-8 flex flex-auto items-center">
								<span>{context?.options?.footer_copyright.replace("2022", new Date().getFullYear())}</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</footer>
	);
}
