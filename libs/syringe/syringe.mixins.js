// > http://syringejs.org
// > syringe.mixins.js v0.0.1. Copyright (c) 2013 Michael Holt
// > holt.org. Distributed under the MIT License
/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:false, strict:true,
undef:true, unused:true, curly:true, browser:true, indent:4, maxerr:50, laxcomma:true,
forin:false, curly:false, evil: true, laxbreak:true, multistr: true */

window.Syringe.mixin({
	'dom': function (props) {

		'use strict';

		if (typeof props.before === 'function') {
			props.before.call(this);
		}

		props = props || {};

		var 
			self	= this,
			action	= props.action,
			bindto	= props.bindto,
			$	= self.get(bindto),
			ns	= props.ns && 'string' === typeof props.ns ? '.' + props.ns : '';

		// Grab all the DOM nodes that have a "data-syringe-" prefix
		var nodelist = document.querySelectorAll('[data-syringe-' + action + ']');

		switch (action) {
		
		case ('add' || 'register'):
		
			if ($) {
				[].slice.call(nodelist).forEach(function (elem) {
					if (elem && elem.nodeType === 1) {
						[].slice.call(elem.attributes).forEach(function (attr) {
							if (attr.name.indexOf('data-') === 0) {
								self.add(bindto + ns + '.' + attr.value, $(elem));
							}
						});
					}
				});
			}
			break;
		}

		if (typeof props.after === 'function') {
			props.after.call(this);
		}

		return this;
	}
});