import React from "react";
import styled from "styled-components";
import { Layout } from "~/templates/Layout";
import PurpleCTA from "~/components/global/PurpleCTA";
import PostFlexibleContent from "~/components/post/PostFlexibleContent";
import PostAuthor from "~/components/post/PostAuthor";
import PostMasthead, { ShareLinks } from "~/components/post/PostMasthead";
import RelatedPosts from "~/components/post/RelatedPosts";

const PostContainer = styled.div`
	.post-text {
		max-width: 792px;
		margin-left: auto;
		margin-right: auto;
	}
`;

export default function Post(props) {
	const { page } = props;

	const { post_date_gmt, post_modified_gmt, blog_hero, flexible_post_content, page_options, related } = props.page;

	const category = page.categories?.nodes[0]?.name || "";

	return (
		<Layout data={props}>
			<PostMasthead
				{...blog_hero}
				date={post_date_gmt}
				modified={post_modified_gmt}
				heading={blog_hero?.heading || page?.post_title}
				image={blog_hero?.image || page?.featured_image}
				category={category}
				author={page?.author}
				hasPostContent={!!(flexible_post_content || page.post_content)}
			/>

			{(flexible_post_content || page.post_content) && (
				<section className="relative my-20 md:my-28">
					<div className="container">
						<PostContainer className="mx-auto max-w-[996px]">
							{flexible_post_content && <PostFlexibleContent content={flexible_post_content} />}

							{page.post_content && <div className="post-content post-text prose" dangerouslySetInnerHTML={{ __html: page.post_content }} />}

							{!page_options?.hide_share_links && (
								<div className="mx-auto mt-12 max-w-[792px]">
									<div className="text-16px mb-2">Share article</div>
									<ShareLinks bgColor="bg-black" iconColor="text-white" />
								</div>
							)}

							{page?.author?.acf?.show_author_card && !page_options?.hide_author_card && (
								<div className="mt-12">
									<PostAuthor author={page.author} />
								</div>
							)}
						</PostContainer>
					</div>
				</section>
			)}

			{related && <RelatedPosts posts={related.map(({ related_post }) => related_post)} />}
			{!page_options?.hide_footer_cta && <PurpleCTA />}
		</Layout>
	);
}
