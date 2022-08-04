import React from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import ResourcesGrid from "~/components/elements/resources/ResourcesGrid";
import { OrangeDropdown, SearchIcon } from "~/components/elements/Icon";
import useCategories from "~/hooks/useCategories";
import useIndustries from "~/hooks/useIndustries";
import useStore from "~/hooks/useStore";
import useSearch from "~/hooks/useSearch";

function SelectBox({ options, current }) {
	const router = useRouter();
	return (
		<div className="relative inline-block w-full">
			<select
				className="relative w-full appearance-none bg-transparent"
				onChange={(e) => router.push(e.currentTarget.value)}
				defaultValue={current || "/resources/"}
			>
				{options &&
					options.map((option, index) => (
						// eslint-disable-next-line
						<option key={`cat${index}`} selected={current === option.value} value={option.value} className="text-black" dangerouslySetInnerHTML={{ __html: option.label }} />
					))}
			</select>
			<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pl-2 pr-4">
				<OrangeDropdown />
			</div>
		</div>
	);
}

export default function ResourceFiltering({ currentCategory, currentIndustry }) {
	const { t } = useTranslation();
	const [resourceSearch, setResourceSearch] = [useStore((state) => state.resourceSearch), useStore((state) => state.setResourceSearch)];

	const categories = useCategories();
	const industries = useIndustries();

	const { isLoading, results } = useSearch(resourceSearch);

	return (
		<>
			<div className="top-[61px] z-[10] min-h-[92px] md:sticky md:top-[67px] lg:top-[69px]">
				<div className="bg-[#032C32] text-white">
					<div className="filter-fields container flex flex-col items-center justify-between gap-y-5 py-[25px] md:flex-row md:gap-y-0 md:space-x-[17px]">
						<div className="flex w-full flex-col items-center gap-y-5 sm:flex-row sm:gap-y-0  sm:space-x-[17px] md:max-w-[607px]">
							<SelectBox
								current={currentCategory}
								options={[
									{ label: t("Select a category"), value: "/resources/" },
									...categories.map((c) => ({ label: c.name, value: `/${c.link.trim().replace(/^[a-zA-Z]{3,5}:\/{2}[a-zA-Z0-9_.:-]+\//, "")}` })),
								]}
							/>
							<SelectBox
								current={currentIndustry}
								options={[
									{ label: t("Select industry"), value: "/resources/" },
									...industries.map((c) => ({ label: c.name, value: `/${c.link.trim().replace(/^[a-zA-Z]{3,5}:\/{2}[a-zA-Z0-9_.:-]+\//, "")}` })),
								]}
							/>
						</div>
						<div className="relative w-full flex-auto md:max-w-[295px]">
							<div className="absolute left-[16px] top-[25%] ">
								<SearchIcon />
							</div>
							<input
								className="text-16px w-full bg-transparent py-[8px] pl-[50px] placeholder-white  placeholder-opacity-100 opacity-100"
								name="search"
								placeholder={t("Search for something")}
								value={resourceSearch}
								onChange={(e) => setResourceSearch(e.currentTarget.value)}
							/>
						</div>
					</div>
				</div>
			</div>

			{resourceSearch && results && (
				<section className="bg-white py-20 md:py-28">
					<div className="container">
						{results.length > 0 && <ResourcesGrid posts={results} />}
						{isLoading && <div>{t("Loading results")}...</div>}
						{results.length === 0 && !isLoading && (
							<div>
								{t("No posts found matching")} &quot;{resourceSearch}&quot;
							</div>
						)}
					</div>
				</section>
			)}
		</>
	);
}
