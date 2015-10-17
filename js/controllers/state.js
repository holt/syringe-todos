(function () {

	'use strict';

	// ## State Definitions

	this.add('app.state', function (m) {

		// Adds an item to localStorage
		var store = function (data) {
			return (localStorage) ?
			localStorage.setItem('todos-syringe', JSON.stringify(data)) :
			false;
		};

		// Retrieves an item from localStorage (if possible)
		var retrieve = function () {
			var data = localStorage ?
			localStorage.getItem('todos-syringe') :
			false;
			return (data && JSON.parse(data)) || [];
		};

		// Fetch stored items and build a list of initialized models
		// to pass to the Todo collection constructor
		var data = retrieve();
		retrieve().forEach(function (item, idx) {
			data[idx] = new m.Todo(item);
		});

		// Set the initial page states and place the retrieved data in
		// the state cache
		this.set('app.state', {
			'show'		: 'all',
			'editing'	: false,
			'cache'		: data,
			'store'		: store,
			'retrieve'	: retrieve
		});

		return this;

	}, ['app.models']);

}.call(window.Syringe));