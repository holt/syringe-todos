(function () {

	'use strict';

	// ## Show Filters View

	this.add('app.views.Filters', (function () {

		// Initialize the object with bindings to the collection, template,
		// and application state objects
		var Filters = function (c, t, s) {
			this.todolist    = c.todolist;
			this.template    = t.filters;
			this.state       = s;
		};

		Filters.prototype = {

			// Render output from the show filters view tmeplate and return
			render: function () {
				return this.template({
					active     : this.todolist.getLength('active'),
					completed  : this.todolist.getLength('completed'),
					state	   : this.state
				});
			}
		};

		return Filters;
	}()), ['app.collections', 'app.templates', 'app.state']);

}.call(window.Syringe));