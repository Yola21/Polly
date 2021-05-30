require("@rails/ujs").start(); 
require("@rails/activestorage").start(); 
require("channels"); 
require("stylesheets/application.scss");
var componentRequireContext = require.context("src", true); 
var ReactRailsUJS = require("react_ujs"); 
ReactRailsUJS.useContext(componentRequireContext); // Support component names relative to this directory: