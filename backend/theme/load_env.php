<?php

function next_env(){
	global $next_env;
	if(!$next_env){
		$raw_env = file_get_contents(get_stylesheet_directory(). "/.env");
		if(!$raw_env){
			return wp_die('No .env found');
		}
		array_map(function($line) use (&$next_env) {
			$split = explode("=", $line);
			if (isset($split[1])) {
				$next_env[$split[0]] = $split[1];
			}
		}, explode("\n", $raw_env));
	}
	return $next_env;
}

function next_env_var($name){
	return next_env()[$name];
}
