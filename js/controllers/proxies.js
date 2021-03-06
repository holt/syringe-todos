(function () {

	'use strict';

	// ## State Definitions

	this.add('app.actions.proxies', function ($) {

		var ENTER_KEY	= 13;
		var ESC_KEY	= 27;
		var self	= this;

		// ### Todo Header Events

		// Proxy for item creation
		$.todos.hd.on('keydown', 'input', function (e) {
			if (e.which === ENTER_KEY) {
				self.exec('app.actions.create')
				.exec('app.helpers.repaint');
			}
		});

		// Proxy for toggle all checkbox
		$.todos.mn.on('click', 'input:first', function () {
			self.exec('app.actions.toggleall')
			.exec('app.helpers.repaint');
		});

		// ### Todo List Events

		// Proxy for item checkbox or remove button selection
		$.todos.tl.on('click', 'input.toggle, button.destroy', function (e) {
			self.set('app.$.todos.li', $(this).parents('li:first'))
			.exec('app.actions.' + $(e.target).attr('class'))
			.exec('app.helpers.repaint');
		});

		// Proxy for editable item change of focus
		$.todos.tl.on('blur', 'input', function () {
			self.exec('app.actions.submit')
			.exec('app.helpers.repaint');
		});

		// Proxy for editable item
		$.todos.tl.on('dblclick', 'label', function () {
			self.set('app.$.todos.li', $(this).parents('li:first'))
				.exec('app.actions.focus');
		});

		// Proxy for item editing and submission
		$.todos.tl.on('keyup', 'input', function (e) {
			self.set('app.$.todos.li', $(this).parents('li:first'));
			if (e.which === ENTER_KEY) {
				self.exec('app.actions.submit')
				.exec('app.helpers.repaint');
			} else if (e.which === ESC_KEY) {
				self.exec('app.actions.revert')
				.exec('app.helpers.repaint');
			} else {
				self.exec('app.actions.update');
			}
		});

		// ### Todo Footer Events

		// Proxy for clear completed todos button
		$.todos.ft.on('click', 'button', function () {
			self.exec('app.actions.clear')
			.exec('app.helpers.repaint');
		});

		return this;

	}, ['app.$']);

}.call(window.Syringe));