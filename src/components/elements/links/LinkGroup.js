import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "~/components/elements/links/Link";
import FormModal from "~/components/elements/forms/FormModal";
import MarketoForm from "~/components/elements/forms/MarketoForm";

function LinkGroup({ links, className = "" }) {
	return (
		<div className={`w-full md:w-auto ${className}`}>
			<div className="-mb-4 md:flex md:space-x-5">
				{links &&
					links?.map(({ link }, i) => (
						<div key={`linkgroupitem${i}`} className="pb-4">
							{link.type !== "form" ? (
								<Link {...link} className={links.length > 1 ? "w-full md:w-auto" : ""} />
							) : (
								<>
									<Link {...link} type="button" className={links.length > 1 ? "w-full md:w-auto" : ""} />
									<SingleLinkNavigation item={link} />
								</>
							)}
						</div>
					))}
			</div>
		</div>
	);
}

export function SingleLinkNavigation({ item }) {
	const modalMap = {
		"#enquiries": {
			heading: "General Enquiries",
		},
	};

	// Map of all the marketo form data to the links
	const { link, formGroup } = item;
	const match = modalMap[link?.url];

	const [modalOpen, setModalOpen] = useState(false);
	const [activeModal, setActiveModal] = useState(null);
	const [isSent, setIsSent] = useState(false);

	if (!match || !formGroup?.marketo_form?.form_id) return null;
	match.marketo_form = formGroup.marketo_form;

	try {
		// eslint-disable-next-line
		useEffect(() => {
			if (typeof window === "undefined") return;

			if (!activeModal && !modalOpen && window?.location?.hash) {
				setActiveModal(modalMap[window?.location?.hash]);
				setModalOpen(true);
			} else if (window?.location?.hash === "#" || window?.location?.hash === "") {
				setActiveModal(null);
				setModalOpen(false);
			}
			// eslint-disable-next-line
		}, [location?.hash]);
		// eslint-disable-next-line
		useEffect(() => {
			if (isSent) {
				setModalOpen(false);
			}
		}, [isSent]);
	} catch (error) {
		console.log(error);
	}

	return (
		<AnimatePresence>
			{activeModal && modalOpen && (
				<FormModal
					setModalOpen={(open) => {
						if (!open) {
							window.location.hash = "";
						}
					}}
				>
					<div onClick={(e) => e.stopPropagation()}>
						{!isSent && <h4 className="text-h4 mb-8">{activeModal.heading}</h4>}
						{activeModal.html && <div dangerouslySetInnerHTML={{ __html: activeModal.html }} />}
						{activeModal.marketo_form && <MarketoForm {...activeModal.marketo_form} setIsSent={setIsSent} />}
					</div>
				</FormModal>
			)}
		</AnimatePresence>
	);
}

export default LinkGroup;
