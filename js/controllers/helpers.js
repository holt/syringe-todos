(function () {

	'use strict';

	// ## Global Utilities

	this

		// Use the DOM to safely escape a string
		.add('app.helpers.escape', function ($, str) {
			var elem = document.createElement('div');
			elem.appendChild(document.createTextNode(str));
			return $.trim(elem.innerHTML);
		}, ['app.$'])

		// Toggle display state: used to show or hide filter and item blocks
		.add('app.helpers.repaint', function ($, s, v, c) {

			// Replace the "toggle all" checkbox with an updated version
			var $elem = $(v.toggleall.render());
			$.syr.ta.replaceWith($elem);
			$.syr.ta = $elem;

			// Render the todo list and filters
			$.syr.tl.html(v.todolist.render());
			$.syr.ft.html(v.filters.render());

			// Show main block if there is at least one todo item
			$.syr.mn.css({
				display: (c.todolist.getLength() !== 0) ? 'block' : 'none'
			});

			// Show the todo list if there is at least one todo item in 
			// this filter state
			$.syr.tl.css({
				display: (c.todolist.getLength(s.show) !== 0) ? 'block' : 'none'
			});

			// Show the filters if there is at least one todo item
			$.syr.ft.css({
				display: (c.todolist.getLength() !== 0) ? 'block' : 'none'
			});

			return this;
		}, ['app.$', 'app.state', 'app.views', 'app.collections']);

}.call(window.Syringe));