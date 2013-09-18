(function () {

	'use strict';

	// ## Application Actions

	var self = this;

	self

		// Create a todo: invoked by main input field submission
		.add('app.actions.create', function ($nt, h, m, c) {
			var val = h.escape($nt.val());
			if (val.replace(/\s/g, '')) {
				c.todolist.addItem(new m.Todo({title: val}));
				$nt.val('');
			}
			return self;
		}, ['app.$.__nt', 'app.helpers', 'app.models', 'app.collections'])


		// Update a todo: invoked by submitting the associated input field
		.add('app.actions.update', function ($li, h, s, c) {
			if (s.editing) {
				var val = h.escape($li.find('input.edit').val());
				c.todolist.getItemById($li.attr('id')).setTitle(val);
			}
			return self;
		}, ['app.$.__li', 'app.helpers', 'app.state', 'app.collections'])


		// Submit a todo: invoked by submitting the associated input field
		.add('app.actions.submit', function ($li, h, s, c) {
			if (s.editing) {
				var val = h.escape($li.find('input.edit').val());
				if (!val.replace(/\s/g, '')) {
					var thisItem = c.todolist.getIndexById($li.attr('id'));
					c.todolist.removeItem(thisItem);
				}
				s.editing = false;
			}
			return self;
		}, ['app.$.__li', 'app.helpers', 'app.state', 'app.collections'])


		// Focus on a todo: invoked by double-clicking an item
		.add('app.actions.focus', function ($li, s, c) {
			$li.addClass('editing');
			$li.find('input.edit').focus();
			s.cache = c.todolist.getItemById($li.attr('id')).getTitle();
			s.editing = true;
			return self;
		}, ['app.$.__li', 'app.state', 'app.collections'])


		// Revert a todo: invoked by hitting ESC whilst editing
		.add('app.actions.revert', function ($li, s, c) {
			c.todolist.getItemById($li.attr('id')).setTitle(s.cache);
			return self;
		}, ['app.$.__li', 'app.state', 'app.collections'])


		// Destroy a todo: invoked by the associated remove button
		.add('app.actions.destroy', function ($li, c) {
			c.todolist.removeItem(c.todolist.getIndexById($li.attr('id')));
			return self;
		}, ['app.$.__li', 'app.collections'])


		// Toggle a todo: invoked by clicking the associated checkbox
		.add('app.actions.toggle', function ($li, c) {
			var thisItem = c.todolist.getItemById($li.attr('id'));
			thisItem.setCompleted(!thisItem.completed);
			return self;
		}, ['app.$.__li', 'app.collections'])


		// Toggle all todos: invoked by clicking the toggle all checkbox
		.add('app.actions.toggleall', function ($ta, c) {
			c.todolist.setCompleted($ta.prop('checked'));
			return self;
		}, ['app.$.__ta', 'app.collections'])


		// Clear completed todos: invoked by clicking the clear button
		.add('app.actions.clear', function (c) {
			c.todolist.clearCompleted();
			return self;
		}, ['app.collections']);

}.call(window.Syringe));