(function ($) {

	'use strict';

	// ## Main Application

	// Add a pointer to the local context and obtain the app object from the injection
	// container.
	var VERSION	= '0.0.1';
	var self	= this;
	var app		= self.get('app');

	$(function () {

		self

		// Set the default app state (this includes the localStorage
		// data fetch)
		.exec('app.state')

		// Set the filter routes
		.exec('app.routing')

		// Create and add a todo list collection instance
		.add({
			'app.collections.todolist': new app.collections.TodoList()
		})

		// Create and add the application view instances
		.add({
			'app.views.filters'	: new app.views.Filters(),
			'app.views.todolist'	: new app.views.TodoList(),
			'app.views.toggleall'	: new app.views.ToggleAll()
		})

		// Add internal pointers to our DOM management library and all
		// relevant page elements
		.add({
			'app.$'		: $,
			'app.$.__hd'	: $('#header'),
			'app.$.__mn'	: $('#main'),
			'app.$.__ft'	: $('#footer'),
			'app.$.__tl'	: $('#todo-list'),
			'app.$.__nt'	: $('#new-todo'),
			'app.$.__ta'	: $('#toggle-all'),
			'app.$.__li'	: $()
		})

		// Bind the event proxies that handle UI actions
		.exec('app.actions.proxies')

		// Render all the page components
		.exec('app.helpers.repaint')

		// App version
		.add('app.VERSION', VERSION);

	});

}.call(window.Syringe, window.jQuery));