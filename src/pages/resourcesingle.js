/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";

import { getStaticProps as getPageStaticProps } from "~/pages/[slug]";
import { Layout } from "~/components/templates/Layout";
import LinkButton from "~/components/elements/buttons/LinkButton";
import Link from "next/link";
import LinkedInIcon from "~/components/elements/icons/LinkedInIcon";
import TwitterIcon from "~/components/elements/icons/TwitterIcon";

export default function ResourceSingle(props) {
	return (
		<Layout page={props}>
			<div className="container pb-20 md:pb-40">
				<div className="mx-auto max-w-[1000px]">
					<div className="max-w-[800px] pt-36 pb-14 md:pt-60 md:pb-32">
						<div className="mb-12 md:mb-20">
							<LinkButton link={{ url: "/", title: "Back to resources" }} backArrow />
						</div>
						<h1 className="t-48 mb-5 md:mb-10">Mi gravida dui nisl a, arcu. Nec in ipsum tristique ultrices ac morbi neque.</h1>
						<div className="flex items-center font-medium uppercase tracking-[0.15em]">
							<span className=" t-13 bg-darkBlue mr-4 rounded-md px-3 py-2">ARTICLE</span>
							<span className="t-13 font-medium leading-6 opacity-80 ">APRIL 14, 2022</span>
						</div>
					</div>
				</div>
				<div className="mb-14 md:mb-40">
					<Image src="https://picsum.photos/1200/400" width="1200" height="400" />
				</div>
				<div className="mx-auto max-w-[800px]">
					<div className="post-prose">
						<DummyContent />
					</div>
					<div className="my-16 h-[1px] bg-gradient-to-r from-[#EAFFFF26]  via-[#EAFFFF4d] to-[#EAFFFF26]" />
					<div className="flex items-center justify-between gap-5">
						<LinkButton link={{ url: "/", title: "Back to resources" }} backArrow />
						<div className="flex items-center justify-end gap-3">
							<div className="mr-1">Share</div>
							<Link href="/" target="_blank" rel="nofollow" className="">
								<div className="block h-8 w-8 overflow-hidden rounded-full bg-gradient-to-r from-[#EAFFFF26] via-[#EAFFFF4d] to-[#EAFFFF26] p-[1px]">
									<div className="bg-darkNavy relative flex h-full w-full items-center justify-center overflow-hidden rounded-full">
										<LinkedInIcon width="14" height="14" />
									</div>
								</div>
							</Link>
							<Link href="/" target="_blank" rel="nofollow" className="">
								<div className="block h-8 w-8 overflow-hidden rounded-full bg-gradient-to-r from-[#EAFFFF26] via-[#EAFFFF4d] to-[#EAFFFF26] p-[1px]">
									<div className="bg-darkNavy relative flex h-full w-full items-center justify-center overflow-hidden rounded-full">
										<TwitterIcon width="14" height="14" />
									</div>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export async function getStaticProps() {
	const props = await getPageStaticProps({ params: { slug: "home" } });
	return props;
}

function DummyContent() {
	return (
		<>
			<h4>Donec gravida velit et vitae iaculis.</h4>
			<p>
				Donec semper scelerisque sed congue. Pellentesque nunc, donec tristique ornare sem urna commodo sit maecenas. Augue pellentesque eget bibendum lorem
				odio in lacus. Aliquet suspendisse sit fringilla nunc nec consequat vulputate purus. Orci, sagittis malesuada id quam integer. Odio suspendisse
				fermentum quam arcu eleifend praesent. Placerat gravida tempus, odio eu semper. Enim in nam a massa enim libero sed.
			</p>
			<h4>Risus magna ut aliquam etiam nibh netus.</h4>
			<p>
				Feugiat at enim bibendum curabitur enim. Nulla leo lacus sit sed purus pharetra, mattis in id. Ultrices sit sed diam neque feugiat tristique in. Purus
				pellentesque ut adipiscing magna sed. Cursus eu ligula consequat, massa. Porttitor duis ut integer interdum. Turpis aliquet elit libero, metus,
				pharetra.
			</p>
			<p>
				Malesuada quis pellentesque tortor dui proin blandit sollicitudin. At nisi consequat dui lorem penatibus feugiat diam laoreet arcu. Elit pellentesque
				non suscipit quisque ut dignissim. Pharetra nulla eget et nulla. A orci, proin velit varius a fermentum.
			</p>
			<img src="https://picsum.photos/792/390" alt="test" />
			<h4>Nunc mauris fermentum est porta diam quis.</h4>
			<p>
				Aliquet nullam amet nulla metus sagittis leo sed mauris. Arcu luctus porta leo interdum massa dolor. Malesuada fermentum, lacus aliquet malesuada tellus
				egestas luctus. Augue risus mi ultricies semper lacus. Molestie adipiscing mi non aliquet condimentum porttitor at. Diam facilisis mattis eu quis velit
				aliquet. Et urna imperdiet mauris lacus semper non, scelerisque nunc, quis. Elit cras tristique aliquet dictum. Mattis lacus dolor mattis consequat
				vestibulum tellus pulvinar facilisi porttitor. Turpis aliquam molestie ullamcorper malesuada ac feugiat nisi. Ipsum accumsan, quis imperdiet enim neque
				nulla dictum gravida. Ipsum morbi vulputate convallis egestas. Amet lorem enim sit mauris. Ultricies ut in risus a lorem.
			</p>
			<p>
				Posuere vel maecenas etiam sit semper mauris. Iaculis vehicula dui aliquet aliquam quis euismod vulputate facilisis. Eu egestas egestas consequat,
				viverra at dignissim nam. Malesuada eu venenatis, egestas nibh pharetra mauris a duis. Ultricies velit leo parturient enim, sit. Mattis nunc elementum,
				purus arcu. Vivamus diam sed faucibus gravida vel eget. Augue vel, risus venenatis nunc, sed mi iaculis. Tincidunt semper tristique tempor,
				pellentesque. Gravida neque morbi augue leo quis quisque nulla enim. Sit adipiscing nunc lacus massa odio. Praesent facilisi viverra porta bibendum
				egestas semper dictum.
			</p>
			<h4>Egestas phasellus sem odio interdum congue.</h4>
			<p>
				Imperdiet vitae aliquam dolor consequat, aliquam porttitor suscipit enim ultrices. Dictum lorem risus fames etiam at bibendum in. Eget ullamcorper sem
				amet egestas pellentesque quam ullamcorper. Dolor magna mollis sit faucibus fringilla vitae, consequat ut curabitur. Orci nascetur diam viverra mi ut
				eu. Netus eget venenatis, amet molestie in tempus. Cursus egestas adipiscing nunc elit viverra in. Pharetra, aenean vel tristique ullamcorper fusce.
				Lobortis mattis cursus sit morbi cras sed. Tellus mauris, augue leo eu ipsum morbi gravida gravida. Mi nibh ut facilisis leo at senectus.
			</p>
			<h4>Facilisis tortor, in sed semper.</h4>
			<p>
				Tincidunt in est, aliquet tortor amet. Nec purus sed quisque imperdiet aliquet erat. Pharetra, ut facilisi tempor ipsum quis in sed quam volutpat.
				Ridiculus lorem integer augue arcu ultrices dui, condimentum auctor vel. At nunc, diam blandit sit amet. Sagittis auctor ultrices adipiscing adipiscing
				ac diam aliquet quam. Pharetra, est turpis commodo nibh euismod ultricies. Amet nibh sem auctor est, diam nulla scelerisque. Adipiscing blandit vitae,
				massa sollicitudin sapien, sed mauris, ut. Integer mattis molestie vitae pellentesque felis. Vel vel quis non nisl, consectetur faucibus morbi urna
				fames. Congue mauris tempor purus in lectus et, nec tellus. Sed et ultrices pretium sem sed.
			</p>
			<img src="https://picsum.photos/792/391" alt="test" />
			<h4>Arcu, nullam orci est tempus.</h4>
			<p>
				We may provide you with access to third-party tools over which we neither monitor nor have any control nor input. You acknowledge and agree that we
				provide access to such tools ”as is” and “as available” without any warranties, representations or conditions of any kind and without any endorsement.
				We shall have no liability whatsoever arising from or relating to your use of optional third-party tools. Any use by you of optional tools offered
				through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools
				are provided by the relevant third-party provider(s). We may also, in the future, offer new services and/or features through the website (including, the
				release of new tools and resources). Such new features and/or services shall also be subject to these Terms of Service.
			</p>
			<h4>Nulla id enim nunc at.</h4>
			<p>
				Libero mattis nulla condimentum magna venenatis, nulla id. Rutrum vitae ante lacus, sed pharetra odio. Viverra semper amet lacus eget egestas in gravida
				scelerisque. Netus augue eros, malesuada cras eu amet integer. Praesent sit adipiscing morbi viverra adipiscing mi. In at morbi auctor diam, quis
				adipiscing. Mauris massa in iaculis sit. Ornare in vulputate habitant at tempor. Quisque nulla ante phasellus et. Dignissim volutpat nunc rhoncus,
				ultrices egestas. Amet bibendum nec, senectus purus est duis sit non. Ullamcorper vitae eget integer posuere a aliquet. Tortor eleifend eleifend tempus,
				orci, orci. Dapibus diam sed pulvinar eu suspendisse.
			</p>
		</>
	);
}
