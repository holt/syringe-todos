(function ($) {

	'use strict';

	// ## Main Application

	// Add a pointer to the local context and obtain the app object from the injection
	// container.
	var 
		VERSION	= '0.0.4',
		self	= this,
		app	= self.get('app');

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

		// Add a pointer to our DOM management library
		.add({
			'app.$': $
		})

		// Use the .dom() mixin to automatically collect all the nodes in the
		// DOM that have a Syringe "add" action.
		.dom({
			'action': 'add',
			'bindto': 'app.$',

			// The processor is an iterator that allows the nodes in the 
			// NodeList to be processed (in this case jQuerified) before
			// being added to the repository			
			'processor': function (el) { return $(el); }
		})

		// Bind the event proxies that handle UI actions
		.exec('app.actions.proxies')

		// Render all the page components
		.exec('app.helpers.repaint')

		// App version
		.add('app.VERSION', VERSION);

	});

}.call(window.Syringe, window.jQuery));