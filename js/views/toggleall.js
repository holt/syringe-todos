(function () {

	'use strict';

	// ## Toggle All View

	this.add('app.views.ToggleAll', (function () {

		// Initialize the object with bindings to the collection, template,
		// and application state objects
		var ToggleAll = function (c, t) {
			this.todolist = c.todolist;
			this.template = t.toggleall;
		};

		ToggleAll.prototype = {

			// Render output from the toggle all view tmeplate and return
			render: function () {
				return this.template({
					checked: this.todolist.getLength('completed') === this.todolist.getLength()
				});
			}
		};

		return ToggleAll;
	}()), ['app.collections', 'app.templates']);

}.call(window.Syringe));