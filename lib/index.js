#!/usr/bin/env node

/**
 * Module dependencies.
 */
var fs     = require('fs'), 
    cat    = require('cat'),
    chalk  = require('chalk'),
    ini    = require('ini'),
    path   = require('path');

var git = {
  dir    : process.cwd()+'/.git',
  config : process.cwd()+'/.git/config'
}

// If .git directory exists
if ( fs.existsSync( git.dir ) ) {

  // Log it
  console.log( chalk.green.bold('Reading .git/config') )
  console.log( chalk.red.bold('CMD + Click URL to open') )

  // Blank line
  console.log( ' ' )
  
  var config  = ini.parse(fs.readFileSync( git.config, 'utf-8') ),
      remotes = findPropertyNameByRegex(config, 'remote')

  if ( remotes ) {
    remotes.forEach( function (remote, i) {
      
      var git_url  = config[remote].url;

      var http_url = git_url.replace(/git@/, 'http://')
          http_url = http_url.replace(/\.git/, '')
          http_url = http_url.replace(/com\s*:\s*/g, 'com/')

      console.log( 
        chalk.bgWhite.black(' ' +remote+' '), 
        chalk.white( git_url ),
        chalk.cyan( http_url )
      )
    })
  }
  // Blank line
  console.log( ' ' )

} else {
  console.log( chalk.red.bold('No .git directory found.') )
}



/**
 * Private Methods
 */
function has(object, key) {
  return object ? hasOwnProperty.call(object, key) : false;
}

/**
 * Find Property Name By Regex
 * 
 * @param  {Object} object 
 * @param  {Pattern} regex  
 */
function findPropertyNameByRegex(object, regex) {
  var key,
      keys = [];

  for (key in object) {
    if ( key.match(regex) ) {
      keys.push(key)
    }
  }
  if ( keys.length > 0 ) {
    return keys;
  } else {
    return false;
  }
};