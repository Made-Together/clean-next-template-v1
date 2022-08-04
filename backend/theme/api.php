<?php

// ini_set('log_errors','On');
// ini_set('display_errors','Off');
// ini_set('error_reporting', E_ALL );
// define('WP_DEBUG', false);
// define('WP_DEBUG_LOG', true);
// define('WP_DEBUG_DISPLAY', false);
header("Access-Control-Allow-Origin: *");


add_filter( 'wp_rest_cache/allowed_endpoints', function( $allowed_endpoints ) {
	if ( ! isset( $allowed_endpoints[ 'together' ] ) ) {
		$allowed_endpoints[ 'together' ][] = 'options';
		$allowed_endpoints[ 'together' ][] = 'redirects';
	}

	return $allowed_endpoints;
}, 10, 1);

add_action('rest_api_init', function () {

	// format values returned from the get_fields function
	add_filter('acf/format_value', 'format_acf_field_values', 10, 3);

	register_rest_route('together', 'post', [
		'methods' => 'GET',
		'callback' => 'get_post_by_slug_rest_endpoint',
	]);

	register_rest_route('together', 'paths', [
		'methods' => 'GET',
		'callback' => 'get_paths_for_rest_endpoint',
	]);

	register_rest_route('together', 'post_previews', [
		'methods' => 'GET',
		'callback' => 'get_post_preview_data',
	]);

	register_rest_route('together', 'preview', [
		'methods' => 'GET',
		'callback' => 'get_post_by_preview_rest_endpoint',
	]);

	register_rest_route('together', 'private', [
		'methods' => 'GET',
		'callback' => 'get_post_by_private_rest_endpoint',
	]);

	register_rest_route('together', 'robots', [
		'methods' => 'GET',
		'callback' => 'get_indexable_endpoint',
	]);

	register_rest_route('together', 'options', [
		'methods' => 'GET',
		'callback' => 'get_global_options',
	]);

	register_rest_route('together', 'redirects', [
		'methods' => 'GET',
		'callback' => 'get_redirects',
	]);

	register_rest_route('together', 'search', [
		'methods' => 'GET',
		'callback' => 'get_search_results',
	]);
});


function format_acf_field_values($value, $post_id, $field)
{
	// remove superfluous image data
	if ($field['type'] === 'image' && !empty($value) && isset($value['sizes'])) {
		foreach (
			['name', 'sizes', 'icon', 'link', 'uploaded_to', 'filename', 'status', 'menu_order', 'author', 'ID', 'subtype', 'type', 'modified', 'filesize']
			as $key
		) {
			unset($value[$key]);
		}
	}

	if ($field['label'] === 'Block') {
		$value->acf = get_fields($value);
		$value->featured_image = get_the_post_thumbnail_url($value);
		return $value;
	}

	// Single post object
	if ($field['type'] === 'post_object' && !empty($value)) {
		$value = get_post_preview_data_for_post($value);
	}

	// Multiple post objects
	if ($field['type'] === 'relationship' && !empty($value)) {
		$value = array_map('get_post_preview_data_for_post', $value);
	}

	return $value;
}

// Post types to retrieve
function get_post_types_for_rest_endpoints()
{
	return ['post', 'page'];
}

function strip_hostname_from_permalink($permalink)
{
	return parse_url($permalink, PHP_URL_PATH);
}

// Get slug from post
function return_slug_from_post($post)
{
	$permalink = get_permalink($post);

	$path = strip_hostname_from_permalink($permalink);
	return $path !== '/' ? $path : '';
}

function return_slug_from_category($cat)
{
	return strip_hostname_from_permalink(get_category_link($cat));
}

function get_paginated_category_pages($cat)
{
	if ($cat->slug === 'uncategorized') return [];

	$slug = return_slug_from_category($cat);
	$count = $cat->count;

	$perPage = 9;
	$pagiPagesCount = $count / $perPage;
	$pagiPages = [];

	for ($i=2; $i < $pagiPagesCount; $i++) {
		$pagiPages[] = $slug.$i.'/';
	}

	return $pagiPages;
}

function get_paths_for_rest_endpoint($request)
{
	$language_code = $request->get_param('lang');
	if ($language_code) {
		do_action('wpml_switch_language', $language_code);
	}

	$postsTypes = array_filter(get_post_types_for_rest_endpoints());

	$paths = get_posts([
		'posts_per_page' => -1,
		'post_type' => $postsTypes,
		'suppress_filters' => 0,
	]);

	$arrayOfPaths = array_values(array_filter(array_map('return_slug_from_post', $paths)));

	$resourcePaths = [];

	foreach ([get_categories(['hide_empty' => true])] as $cats) {
		$resourcePaths = array_merge($resourcePaths, array_map('return_slug_from_category', $cats));
		// Get paths for paginated categories
		foreach($cats as $c) {
			$resourcePaths = array_merge($resourcePaths, get_paginated_category_pages($c));
		}
	}

	return new WP_REST_Response(array_merge($resourcePaths, $arrayOfPaths));
}

// Get Data endpoint
function get_post_by_slug_rest_endpoint($request)
{
	$maybe_slug = $request->get_param('slug');
	$language_code = $request->get_param('lang');
	$array_of_slug_parts = array_values(array_filter(explode('/', $maybe_slug)));
	$included_post_types = get_post_types_for_rest_endpoints();

	if ($request->get_param('post_type')) {
		$included_post_types = [$request->get_param('post_type')];
	}

	// TODO: Make this work when using different slugs in multilingual setup
	if (str_contains($maybe_slug, 'resources/')) {
		// Is category/custom taxonomy
		if (str_contains($maybe_slug, 'resources/industry') || str_contains($maybe_slug, 'resources/category')) {
			// Get the category name from the slug, also check to see if is a paginated page, if so, get the second to last part of the url, which will be the category slug
			$catName = is_numeric(end($array_of_slug_parts)) ? end(array_slice($array_of_slug_parts, -2, 1)) : end(array_slice($array_of_slug_parts, -1, 1));
			$taxonomyType = (str_contains($maybe_slug, 'resources/category')) ? 'category' : 'industry';

			$c = get_term_by('slug', $catName, $taxonomyType);
			$c->acf = get_fields($c);
			$c->post_type = 'category';
			return new WP_REST_Response($c);
		}

		$included_post_types = ['post'];
		// use the last part of the permalink
		$maybe_slug = end($array_of_slug_parts);
	}

	$data = (object) [];

	if ($maybe_slug) {
		$maybe_post = get_page_by_path($maybe_slug, OBJECT, $included_post_types);
		if (!$maybe_post) {
			$maybe_post = get_page_by_path(end($array_of_slug_parts), OBJECT, $included_post_types);
		}

		if ($maybe_post) {
			$post_language = apply_filters('wpml_post_language_details', "", $maybe_post->ID);
			if ($language_code !== $post_language['language_code']) {
				$translated_id = apply_filters('wpml_object_id', $maybe_post->ID, $maybe_post->post_type, false, $language_code);
				$maybe_post = get_post($translated_id);
			}
		}

		if ($maybe_post) {
			$data = include_rest_data_for_post($maybe_post);
		}
	}

	return new WP_REST_Response($data);
}

function get_post_preview_data(WP_REST_Request $data)
{
	$postType = $data->get_param('post_type');
	$postsPerPage = $data->get_param('posts_per_page');
	$posts = get_posts([
		'post_type' => $postType,
		'posts_per_page' => $postsPerPage ?: -1,
	]);

	$mappedPosts = [];
	foreach ($posts as $post) {
		$mappedPosts[] = get_post_preview_data_for_post($post);
	}

	return new WP_REST_Response($mappedPosts);
}

function get_post_featured_image($post, $width = 760, $height = 460)
{
	$src = wp_get_attachment_image_src(get_post_thumbnail_id($post), 'full', true)[0];
	if (str_contains($src, 'images/media/default.png')) {
		$src = '';
	}

	return [
		'src' => $src ?? '',
		'width' => $width,
		'height' => $height,
	];
}

function get_post_author_data($post)
{
	if (!$post['post_author']) {
		return [];
	}

	return [
		'name' => get_the_author_meta('first_name', $post['post_author']) . ' ' . get_the_author_meta('last_name', $post['post_author']),
		'acf' => get_fields('user_' . $post['post_author']),
	];
}

function get_post_preview_data_for_post($post)
{
	$postType = $post->post_type;

	$fields = [
		'post' => ['ID', 'post_title', 'permalink', 'featured_image', 'categories' => ['categories', 'industry'], 'acf' => ['preview_teaser', 'read_now_link_title', 'blog_hero']],
		'press_release' => ['ID', 'post_title', 'post_date_gmt', 'permalink', 'acf' => ['link_url', 'logo']],
		'investor_videos' => ['ID', 'post_title', 'post_date_gmt', 'permalink', 'acf' => ['content', 'placeholder_image', 'preview_teaser']],
		'financial_report' => ['ID', 'post_title', 'post_date_gmt', 'featured_image', 'permalink', 'categories' => ['financial_report_type'] ,'acf' => ['description', 'file']],
		'team_member' => ['ID', 'post_title', 'post_date_gmt', 'featured_image', 'acf' => ['image', 'position', 'preview_description', 'linkedin', 'second_position', 'introduction', 'learn_more_link']],

		'customer_story' => ['ID', 'post_title', 'permalink', 'acf' => ['preview_image', 'preview_logo', 'preview_description']],
		'testimonial' => ['ID', 'post_title', 'acf' => ['quote', 'cite_name', 'cite_role', 'cite_company', 'images']],
		'integration' => ['ID', 'post_title', 'categories' => ['integration_category', 'integration_tag'], 'acf' => ['logo', 'teaser', 'has_inner_page', 'inner_page_published']],
		'partner' => ['ID', 'post_title', 'categories' => ['partner_category'], 'acf' => ['logo', 'has_inner_page', 'inner_page_published', 'custom_link']],
	];

	$postTypeFields = $fields[$postType];
	$mappedPost = [];

	foreach ($postTypeFields as $key => $field) {
		if ($field === 'post_date_gmt') {
			// Format dates
			$mappedPost[$field] = date_format(date_create($post->post_date_gmt), 'jS M Y');
		} elseif ($key === 'acf') {
			// Get specified ACF fields
			$mappedPost['acf'] = [];
			foreach ($postTypeFields['acf'] as $acfField) {
				$mappedPost['acf'][$acfField] = get_field($acfField, $post->ID);
			}
		} elseif ($field === 'permalink') {
			// Get post permalink
			$mappedPost['permalink'] = return_slug_from_post($post);
		} elseif ($field === 'featured_image') {
			// Get post featured image
			$mappedPost['featured_image'] = get_post_featured_image($post);
		} elseif ($key === 'categories') {

			foreach($field as $taxonomy) {
				if (!empty($post)) {
					if ($taxonomy === 'categories') {
						$cats = wp_get_post_categories($post->ID, 'category');
						$mappedPost[$taxonomy] = array_map(function ($c) {
							$cat = get_category($c);
							return [
								'id' => $c,
								'name' => $cat->name,
								'slug' => $cat->slug,
							];
						}, $cats);
					} else {
						$customTaxonomy = wp_get_object_terms($post->ID, $taxonomy);
						$mappedPost[$taxonomy] = array_map(function ($customTaxonomyItem) {
							return [
								'id' => $customTaxonomyItem->term_id,
								'name' => $customTaxonomyItem->name,
								'slug' => $customTaxonomyItem->slug,
							];
						}, $customTaxonomy);
					}
				}
			}
		} else {
			$mappedPost[$field] = $post->$field;
		}
	}

	return $mappedPost;
}


function get_global_options()
{
	$options = get_fields('options');
	unset($options['redirects']);
	return new WP_REST_Response($options);
}

function get_redirects()
{
	return new WP_REST_Response(get_field('redirects', 'options'));
}

function get_search_results(WP_REST_Request $request)
{
	$query = $request->get_param('q');
	$posts = [];

	if (!empty($query)) {
		$q = new WP_Query();
		$q->parse_query([
			'post_type' => 'post',
			's' => $query,
			'posts_per_page' => 20,
		]);

		if (function_exists('relevanssi_do_query')) {
			$__posts = relevanssi_do_query( $q );
		} else {
			$__posts = $q->get_posts();
		}

		foreach ($__posts as $post) {
			$posts[] = get_post_preview_data_for_post($post);
		}
	}

	return new WP_REST_Response($posts);
}

// Get Preview endpoint
function get_post_by_preview_rest_endpoint($request)
{
	$maybe_post_id = $request->get_param('post_id');
	$data = [];
	if ($maybe_post_id) {
		$maybe_posts = get_posts([
			'post_status' => 'any',
			'post_parent' => intval($maybe_post_id),
			'post_type' => 'revision',
			'sort_column' => 'ID',
			'sort_order' => 'desc',
			'posts_per_page' => 1,
		]);
		if ($maybe_posts && count($maybe_posts) > 0) {
			$data = include_rest_data_for_post($maybe_posts[0]);
		}
	}
	return new WP_REST_Response($data);
}

// Get Private endpoint
function get_post_by_private_rest_endpoint($request)
{
	$maybe_post_id = $request->get_param('post_id');
	$key = $request->get_param('key');
	if (!$key || $key !== "SOME_KEY") {
		return new WP_Error('invalid_key', "Invalid key used for private post");
	}
	$data = [];

	if ($maybe_post_id) {
		$maybe_post = get_post(intval($maybe_post_id));
		if ($maybe_post) {
			$data = include_rest_data_for_post($maybe_post);
		}
	}
	return new WP_REST_Response($data);
}

function parse_flexible_content_section($section, $sections, $key)
{
	$section['section']['acf_fc_layout'] = $section['acf_fc_layout'];

	// Add ACF fields and featured image to resources listing page
	if ($section['acf_fc_layout'] === 'archive_landing_page') {
		if ($section['post_type'] === 'resources') {
			$resourceLP = $section['resources_landing_page'];
			foreach ($resourceLP['featured']['featured_posts'] as $i => $postItem) {
				$resourceLP['featured']['featured_posts'][$i]['post'] = get_post_preview_data_for_post($postItem['post']);
			}

			foreach ($resourceLP['category_list'] as $i => $cat) {
				$posts = [];
				$catID = $cat['category_name'];

				foreach (get_posts(['post_type' => 'post', 'posts_per_page' => 6, 'category__in' => [$catID]]) as $p) {
					$posts[] = get_post_preview_data_for_post($p);
				}

				$resourceLP['category_list'][$i]['category_name'] = get_category($catID);
				$resourceLP['category_list'][$i]['category_permalink'] = get_category_link($catID);
				$resourceLP['category_list'][$i]['posts'] = $posts;
			}
		}
	}

	if (!empty($sections[$key - 1]['section'])) {
		$section['section']['previous_section'] = ['section' => $sections[$key - 1]['section']];
	}

	if (!empty($sections[$key + 1]['section'])) {
		$section['section']['next_section'] = ['section' => $sections[$key + 1]['section']];
	}

	return $section;
}

// Include additional data for when we return posts to rest api
function include_rest_data_for_post($post)
{
	$post = (array) $post;
	if (!function_exists('get_fields')) {
		return $post;
	}

	$post['permalinks'] = [];
	foreach(['en', 'fr'] as $lang) {
		$translatedPermalink = get_permalink(apply_filters('wpml_object_id', $post['ID'], $post['post_type'], false, $lang));
		if (!empty($translatedPermalink)) {
			$post['permalinks'][$lang] = str_replace('/homepage/', '/', $translatedPermalink);
		}
	}

	// Acf Data
	$post['url'] = get_permalink($post['ID']);

	$post['post_content'] = wpautop($post['post_content']);

	$maybe_acf = get_fields($post['ID']);

	if ($maybe_acf) {
		foreach ($maybe_acf as $key => $value) {
			if ($key === 'flexible_content') {
				// First we iterate over all sections to find "block" layouts, if is block layout, return the section inside the block post, else just return the section
				$sectionsWithBlocks = [];
				foreach ($value as $section) {
					$sectionsWithBlocks[] = $section['acf_fc_layout'] === 'block' ? get_field('flexible_content', $section['block'])[0] : $section;
				}

				// Then we parse $sectionsWithBlocks to determine stuff like previous/next section existance, background colors so the frontend can space sections nicely
				$flexibleSections = [];
				foreach ($sectionsWithBlocks as $flexibleKey => $flexibleValue) {
					$flexibleSections[] = parse_flexible_content_section($flexibleValue, $sectionsWithBlocks, $flexibleKey);
				}

				// Update the original $value with the parsed flexible sections
				$value = $flexibleSections;
			}


			// We will include all acf fields with the post
			// If there is overlap like if you name an acf field 'menu_order' it will
			// Come through as 'acf_menu_order'
			$post[isset($post[$key]) && $post[$key] ? 'acf_' . $key : $key] = $value;
		}
	}

	if ($post['post_type'] === 'post') {
		$post['author'] = get_post_author_data($post);
	}

	// Yoast Data
	$post['seo'] = [
		'title' => $post['post_title'],
		'description' => '',
		'image' => '',
		'indexable' => '0', // 0 means yes according to yoast
	];

	$title = get_post_meta($post['ID'], '_yoast_wpseo_title', true);
	if ($title) {
		$post['seo']['title'] = wpseo_replace_vars($title, $post);
	}

	$meta_description = get_post_meta($post['ID'], '_yoast_wpseo_metadesc', true);
	if ($meta_description) {
		$post['seo']['description'] = $meta_description;
	}

	$image = get_post_meta($post['ID'], '_yoast_wpseo_opengraph-image', true);
	if ($image) {
		$post['seo']['image'] = $image;
	} else if (!empty(get_post_featured_image($post['ID']))) {
		$featuredImage = get_post_featured_image($post['ID'])['src'];
		$post['seo']['image'] = empty($featuredImage) ? 'https://cms.bosonprotocol.io/wp-content/uploads/2022/01/btc-og.jpg' : $featuredImage;
	}

	$indexable = get_post_meta($post['ID'], '_yoast_wpseo_meta-robots-noindex', true);
	if ($indexable) {
		$post['seo']['indexable'] = $indexable;
	}

	// Fix for previews post type being revision
	if ($post['post_type'] === 'revision') {
		$post['post_type'] = get_post_type($post['post_parent']);
	}

	$post['featured_image'] = get_post_featured_image($post['ID']);

	return $post;
}

// Get Indexable Endpoint to determine robots.txt
function get_indexable_endpoint($request)
{
	return new WP_REST_Response([
		'blog_public' => get_option('blog_public'),
	]);
}
