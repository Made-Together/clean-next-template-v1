import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "~/components/elements/links/Link";
import { OrangeBG, Button } from "~/components/elements/Button";
import { ArrowRight, DropDownArrow, LocationPin } from "~/components/elements/Icon";
import { Section } from "~/components/elements/Section";
import useJobs from "~/hooks/useJobs";

export default function JobsList({ section, subheading, heading, show_more_label }) {
	const allJobs = useJobs();
	const [allLocations, setAllLocations] = useState();
	const [allDepartments, setAllDepartments] = useState();
	const [filteredJobs, setFilteredJobs] = useState();
	const [paginatedJobs, setPaginatedJobs] = useState();

	useEffect(() => {
		setFilteredJobs(allJobs);
		setPaginatedJobs(allJobs);
		setAllLocations([...new Set(allJobs?.map((job) => job?.location?.location_str))]);
		setAllDepartments([...new Set(allJobs?.map((job) => job?.department))]);
	}, [allJobs]);

	const initialLoadMore = 6;
	const [loadMore, setLoadMore] = useState(initialLoadMore);

	const [location, setLocation] = useState("");
	const [filteredLocations, setFilteredLocations] = useState(allLocations);

	const [department, setDepartment] = useState("");
	const [filteredDepartments, setFilteredDepartments] = useState(allDepartments);

	useEffect(() => {
		setFilteredDepartments(
			location ? [...new Set(allJobs?.filter((job) => job.location.location_str === location)?.map((job) => job?.department))] : allDepartments
		);
		// eslint-disable-next-line
	}, [allLocations, location]);

	useEffect(() => {
		setFilteredLocations(
			department ? [...new Set(allJobs?.filter((job) => job.department === department)?.map((job) => job?.location?.location_str))] : allLocations
		);
		// eslint-disable-next-line
	}, [allDepartments, department]);

	useEffect(() => {
		setFilteredJobs(
			allJobs?.filter((job) => {
				setLoadMore(initialLoadMore);

				if (!department && !location) return true;

				const dMatch = department ? job.department === department : false;
				const lMatch = location ? job.location.location_str === location : false;

				if (department && location) return dMatch && lMatch;
				if (department) return dMatch;
				if (location) return lMatch;

				return null;
			})
		);
		// eslint-disable-next-line
	}, [department, location]);

	useEffect(() => {
		setPaginatedJobs(filteredJobs?.slice(0, loadMore) || []);
	}, [filteredJobs, loadMore]);

	return (
		<Section {...section}>
			<div className="container">
				<div className="flex flex-col items-end justify-between md:flex-row">
					<div className="w-full text-center md:w-1/2 md:text-left">
						<h6 className="text-h6 opacity-50">{subheading}</h6>
						<h2 className="text-h2 mt-[10px]">{heading}</h2>
					</div>
					<div className="mt-6 w-full items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-[24px] md:mt-0 md:w-1/2">
						<div className="w-full md:w-1/2">
							<DropDownSelect defaultOption="Location" selectClass="!py-[11px] md:!py-[18px]" rounded onChange={(e) => setLocation(e.target.value)}>
								{filteredLocations?.map((locationItem) => (
									<option key={locationItem} value={locationItem}>
										{locationItem}
									</option>
								))}
							</DropDownSelect>
						</div>
						<div className="w-full md:w-1/2">
							<DropDownSelect defaultOption="Department" selectClass="!py-[11px] md:!py-[18px]" rounded onChange={(e) => setDepartment(e.target.value)}>
								{filteredDepartments?.map((departmentItem) => (
									<option key={departmentItem} value={departmentItem}>
										{departmentItem}
									</option>
								))}
							</DropDownSelect>
						</div>
					</div>
				</div>

				<div className="mt-8 space-y-4 md:mt-20 md:space-y-[24px]">
					<AnimatePresence exitBeforeEnter>
						{paginatedJobs?.map((e, i) => (
							<motion.div
								key={e.id + i}
								initial={{ opacity: 0 }}
								animate={{
									opacity: 1,
									transition: { duration: 0.35, delay: (i * 0.1) % (initialLoadMore * 0.1) },
								}}
								exit={{ opacity: 0, transition: { duration: 0.2 } }}
							>
								<JobItem {...e} />
							</motion.div>
						))}
					</AnimatePresence>
				</div>

				<AnimatePresence exitBeforeEnter={false}>
					{filteredJobs?.length > loadMore && (
						<motion.div
							key="load-more-button"
							initial={{ opacity: 0 }}
							animate={{
								opacity: 1,
								transition: { duration: 0.5, delay: initialLoadMore * 0.1 + 0.35 },
							}}
							exit={{ opacity: 0, transition: { duration: 0.4 } }}
						>
							<Button size="huge" className="mt-12 md:mt-20" onClick={() => setLoadMore(loadMore + 6)}>
								{show_more_label}
							</Button>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</Section>
	);
}

export function DropDownSelect({ defaultOption, children, rounded, selectClass = "", ...other }) {
	return (
		<div className="relative flex-auto select-none">
			<select
				style={{ backgroundImage: "none" }}
				id=""
				className={`w-full flex-auto appearance-none rounded-md border-[#D0D8E3] py-[18px] pl-[20px] md:pl-[30px] ${selectClass} ${
					rounded ? " rounded-md" : ""
				} `}
				{...other}
			>
				{defaultOption && <option value="">{defaultOption}</option>}
				{children}
			</select>
			<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pl-2 pr-4">
				<DropDownArrow />
			</div>
		</div>
	);
}

export function JobItem({ title, location, department, url }) {
	return (
		<Link
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="trans group !flex transform cursor-pointer flex-col rounded-[15px] bg-grey !duration-300 hover:-translate-y-1 hover:shadow-md"
		>
			<div className="flex flex-col items-center justify-between py-[25px] px-[25px] md:flex-row md:space-x-8 md:px-[40px] lg:px-[60px]">
				<h3 className="text-22px w-full md:w-auto md:flex-[0_0_50%]" dangerouslySetInnerHTML={{ __html: title }} />
				<div className="mt-3 w-full items-center justify-between md:mt-0 md:flex md:w-auto md:flex-auto">
					<div className="mr-6 flex items-start md:mr-12 lg:mr-16">
						<div className="mt-[4px] mr-2  flex-none leading-tight">
							<LocationPin />
						</div>
						<div className="text-18px !leading-snug">
							<span dangerouslySetInnerHTML={{ __html: location?.location_str }} />
							{department && ` · ${department}`}
						</div>
					</div>
					<div className="mt-[5px] flex justify-end md:mt-0 md:scale-[1.3]">
						<OrangeBG>
							<ArrowRight />
						</OrangeBG>
					</div>
				</div>
			</div>
		</Link>
	);
}
