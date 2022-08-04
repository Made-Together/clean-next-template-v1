<?php 
foreach (glob(get_stylesheet_directory()."/gen/types/*.php") as $filename)
{
    include $filename;
}