#!/usr/bin/env node

/**
 * Module dependencies.
 */
var fs     = require('fs'), 
    cat    = require('cat'),
    chalk  = require('chalk'),
    path   = require('path');

var git_dir = process.cwd()+'/.git';

if ( fs.existsSync( git_dir ) ) {
  // Do something
  cat( git_dir+'/config', function (data) {
    console.log( data )
  });  

} else {
  console.log('uh oh')
  
}