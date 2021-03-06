<?php
/**
 * @file
 * Embeds .info file information into the jquery plugin file itself.
 *
 * The header of the jquery file must look like the following example, line for line exact.
 */

//Here is the header required to use this script...
/*
 * {{ name }} jQuery JavaScript Plugin v{{ version }}
 * {{ homepage }}
 *
 * {{ description }}.
 *
 * Copyright 2013, {{ name }}
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Date: {{ date }}
 */

require_once dirname(__FILE__) . '/../vendor/autoload.php';

// Translate arguments to vars.
list(
  $this_file,
  $prev_version,
  $new_version,
  $package_name,
  $description,
  $homepage,
  $author,
  $path_to_root,
  $date
) = $argv;

// Get the source file of the jquery plugin.
$source_file = $path_to_root . '/jquery.click_replace.js';
$source = file_get_contents($source_file);

// Pull out only comment lines for manipulation to protect code.
preg_match_all("/(\/| )?\*.*$/m", $source, $matches);
$comment_lines = $comment_lines_replace = $matches[0];

// Target each comment line based on convention
js_replace_name_version($comment_lines_replace[1], $package_name, $new_version);
js_replace_homepage($comment_lines_replace[2], $homepage);
js_replace_description($comment_lines_replace[4], $description);
js_replace_date($comment_lines_replace[9], $date);

// Replace the old comment block with new one.
$find     = implode(PHP_EOL, $comment_lines);
$replace  = implode(PHP_EOL, $comment_lines_replace);
$source   = str_replace($find, $replace, $source);

// Save the new version of the file
if (file_put_contents($source_file, $source)) {
  echo "$source_file has been updated.";
}
else {
  echo "Error updating $source_file";
}
