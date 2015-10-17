(function () {

	'use strict';

	// ## Todolist Collection

	this.add('app.collections.TodoList', (function () {

		// Todolist constructor - adds the local save method to
		// all the models in the provided data object
		var TodoList = function (s) {
			this.state = s;
			(this.data = s.cache || []).forEach(function (item) {
				item.save = this.save.bind(this);
			}, this);
		};

		TodoList.prototype = {

			// Save the collection data to localStorage
			save: function () {
				this.state.store(this.data);
			},

			// Set all models in the collection to a completed state
			setCompleted: function (completed) {
				this.getData().forEach(function (item) {
					item.setCompleted((completed === false) ? false : true);
				});
				return this;
			},

			// Retrieve data from the collection, which optional filtering
			// by show state
			getData: function (show) {
				switch (show) {
				case 'active':
					return this.data.filter(function (item) {
						return item.isCompleted() === false;
					});
				case 'completed':
					return this.data.filter(function (item) {
						return item.isCompleted() === true;
					});
				default:
					return this.data;
				}
			},

			// Return the data of an item in the collection item by
			// passing the model ID
			getItemById: function (id) {
				return this.data.filter(function (item) {
					return item.id === id;
				})[0];
			},

			// Return the index of an item in the collection item by
			// passing the model ID
			getIndexById: function (id) {
				var _idx = false;
				this.data.forEach(function (item, idx) {
					if (item.id === id) {
						_idx = idx;
						return;
					}
				});
				return _idx;
			},

			// Flush all completed models from the collection
			clearCompleted: function () {
				var tmpdata = [];
				this.data.forEach(function (item) {
					if (item.isCompleted() !== true) {
						tmpdata.push(item);
					}
				}, this);
				this.data = tmpdata;
				this.save();
				return this;
			},

			// Get the length of the collection, with optional filtering
			getLength: function (show) {
				return this.getData(show).length;
			},

			// Remove an item from the collection by index
			removeItem: function (idx) {
				this.data.splice(idx, 1);
				this.save();
				return this;
			},

			// Add a new item to the collection
			addItem: function (item) {
				item.save = this.save.bind(this);
				this.data.push(item);
				this.save();
				return this;
			}
		};

		return TodoList;
	}()), ['app.state']);

}.call(window.Syringe));