import React from "react";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import { OrangeBG } from "~/components/elements/Button";
import { ArrowRight } from "~/components/elements/Icon";

export default function ResourcesPagination({ numberOfPages, pageNumber, path }) {
	const router = useRouter();
	return (
		<ReactPaginate
			className="flex select-none items-center space-x-1"
			pageClassName="h-[30px] w-[30px] rounded flex flex-col items-center justify-center"
			activeClassName="bg-orange text-white"
			breakLabel="..."
			breakClassName="w-[30px] flex justify-center"
			initialPage={pageNumber}
			onClick={({ event: { currentTarget } }) => {
				router.push(currentTarget.href);
			}}
			hrefBuilder={(page, pageCount) => (page > 1 && page <= pageCount ? `${path + page}/` : path)}
			hrefAllControls
			pageRangeDisplayed={4}
			marginPagesDisplayed={2}
			pageCount={numberOfPages}
			renderOnZeroPageCount={null}
			previousLabel={
				<div className={`flex items-center space-x-2 pr-2 ${pageNumber === 0 ? "pointer-events-none cursor-default opacity-0" : ""}`}>
					<div className="rotate-180 transform">
						<OrangeBG>
							<ArrowRight />
						</OrangeBG>
					</div>
					<div>Previous</div>
				</div>
			}
			nextLabel={
				<div className={`flex items-center space-x-2 pl-2 ${pageNumber === numberOfPages - 1 ? "pointer-events-none cursor-default opacity-0" : ""}`}>
					<div>Next</div>
					<OrangeBG>
						<ArrowRight />
					</OrangeBG>
				</div>
			}
		/>
	);
}
