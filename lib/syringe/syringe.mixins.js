// > http://syringejs.org
// > syringe.mixins.js v0.0.2. Copyright (c) 2013 Michael Holt
// > holt.org. Distributed under the MIT License
/* jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:false, strict:true,
undef:true, unused:true, curly:true, browser:true, indent:4, maxerr:50, laxcomma:true,
forin:false, curly:false, evil: true, laxbreak:true, multistr: true */

window.Syringe.mixin({
	'dom': function (props) {

		'use strict';

		props = props || {};

		var
			actn	= props.action,
			nmsp	= props.namespace,
			proc	= props.processor,
			full	= 'data-syringe-' + actn,
			list, $arr;

		nmsp = nmsp && (typeof nmsp === 'string') ? '.' + nmsp : '';
		proc = (typeof proc === 'function') ? proc : function (item) {
			return item;
		};

		list = [].slice.call(document.querySelectorAll('[' + full + ']'));
		$arr = list.map(proc);

		if (typeof props.before === 'function') {
			props.before.call(this);
		}

		switch (actn) {

		case ('add' || 'register'):
			this.add(list.reduce(function (p, c, i) {
				if (c && c.nodeType === 1) {
					p[props.bindto + nmsp + '.' 
					+ c.getAttribute(full)] = $arr[i];
					return p;
				}
			}, {}));
			break;
		}

		if (typeof props.after === 'function') {
			props.after.call(this);
		}

		return this;
	}
});