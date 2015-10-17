(function () {

	'use strict';

	// ## Todo Item Model	

	var self = this;

	self.add('app.models.Todo', (function () {

		// Unique ID generator (that keys off of the Syringe object ID)
		var getGuid = (function () {
			var count = 0;
			return function () {
				return self.id + '/' + (++count);
			};
		}());

		// Initialize the object with a new (or generated) ID, title, 
		// and completion state
		var Todo = function (obj) {
			if (obj.title) {
				this.id		= obj.id	|| getGuid();
				this.completed	= obj.completed	|| false;
				this.title	= obj.title;
			}
		};

		Todo.prototype = {

			// Return the item model title
			getTitle: function () {
				return this.title;
			},

			// Set the item model title
			setTitle: function (title) {
				this.title = title || this.title;
				this.save();
				return this;
			},

			// Set the item model completion state
			setCompleted: function (completed) {
				this.completed = completed;
				this.save();
				return this;
			},

			// Return the item completion state
			isCompleted: function () {
				return this.completed;
			}
		};

		return Todo;
	}()));

}.call(window.Syringe));