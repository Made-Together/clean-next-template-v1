import { motion } from "framer-motion";
import React from "react";
import { useClickAway } from "react-use";
import { CloseXAlt } from "~/components/elements/Icon";

export default function FormModal({ setModalOpen, maxWidth = 555, children }) {
	const ref = React.useRef(null);
	useClickAway(ref, () => setModalOpen(false));

	return (
		<motion.div
			key="modal"
			style={{ willChange: "opacity" }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={() => setModalOpen(false)}
			className="fixed inset-0 z-[1000] !m-0 h-screen w-full bg-[#000000] bg-opacity-60"
		>
			<motion.div
				initial={{ y: 20 }}
				animate={{ y: 0 }}
				exit={{ y: -20 }}
				onClick={(e) => e.stopPropagation()}
				className="flex h-full items-center justify-center"
			>
				<div className="my-auto max-h-full w-full overflow-auto py-20">
					<div className="flex flex-col justify-center px-[25px]">
						<div ref={ref} className="relative mx-auto w-full rounded-[15px] bg-white  p-8 text-black md:p-[45px]" style={{ maxWidth }}>
							<div className="relative top-[-15px] right-[-15px] mb-[-13px] flex flex-col items-end">
								<div className="cursor-pointer" onClick={() => setModalOpen(false)}>
									<CloseXAlt />
								</div>
							</div>

							<div>{children && children}</div>
						</div>
					</div>
				</div>
			</motion.div>
		</motion.div>
	);
}
