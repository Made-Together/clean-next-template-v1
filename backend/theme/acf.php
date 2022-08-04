<?php

/**
 * Save Load ACF
 */
add_filter('acf/settings/save_json', function () {
	return get_stylesheet_directory() . '/gen';
});
add_filter('acf/settings/load_json', function () {
	return get_stylesheet_directory() . '/gen';
});

/**
 * Add options pages
 */
if (function_exists('acf_add_options_page')) {
	function register_acf_options_pages()
	{
		// check function exists
		if (!function_exists('acf_add_options_page')) {
			return;
		}

		// register options page
		acf_add_options_page([
			'page_title' => 'Header',
			'menu_title' => 'Header',
			'menu_slug' => 'header',
			'capability' => 'edit_posts',
			'show_in_graphql' => true,
		]);
		// register options page
		acf_add_options_page([
			'page_title' => 'Footer',
			'menu_title' => 'Footer',
			'menu_slug' => 'footer',
			'capability' => 'edit_posts',
			'show_in_graphql' => true,
		]);

		// register redirects page
		acf_add_options_page([
			'page_title' => 'Redirects',
			'menu_title' => 'Redirects',
			'menu_slug' => 'redirects',
			'capability' => 'edit_posts',
			'show_in_graphql' => true,
		]);
	}

	add_action('acf/init', 'register_acf_options_pages');
}
