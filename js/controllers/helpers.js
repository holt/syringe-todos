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
			var $el = $(v.toggleall.render());
			$.todos.ta.replaceWith($el);
			$.todos.ta = $el;

			// Render the todo list and filters
			$.todos.tl.html(v.todolist.render());
			$.todos.ft.html(v.filters.render());

			// Show main block if there is at least one todo item
			$.todos.mn.css({
				display: (c.todolist.getLength() !== 0) ? 'block' : 'none'
			});

			// Show the todo list if there is at least one todo item in 
			// this filter state
			$.todos.tl.css({
				display: (c.todolist.getLength(s.show) !== 0) ? 'block' : 'none'
			});

			// Show the filters if there is at least one todo item
			$.todos.ft.css({
				display: (c.todolist.getLength() !== 0) ? 'block' : 'none'
			});

			return this;
		}, ['app.$', 'app.state', 'app.views', 'app.collections']);

}.call(window.Syringe));