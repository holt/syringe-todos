(function () {

	'use strict';

	// ## Todo List View

	this.add('app.views.TodoList', (function () {

		// Initialize the object with bindings to the collection, template,
		// and application state objects
		var TodoList = function (c, t, s) {
			this.todolist	= c.todolist;
			this.template	= t.todolist;
			this.state	= s;
		};

		TodoList.prototype = {

			// Render output from the todo list view tmeplate and return
			render: function () {
				return this.template({
					todolist: this.todolist.getData(this.state.show)
				});
			}
		};

		return TodoList;
	}()), ['app.collections', 'app.templates', 'app.state']);

}.call(window.Syringe));