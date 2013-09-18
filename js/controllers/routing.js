(function (Router) {

	'use strict';

	// ## Todo Routing

	this.add('app.routing', function (h, s) {

		// Add the different routes to a new Director instance
		var router = new Router({
			'/': function () {
				s.show = 'all';
			},
			'/:show': function (show) {
				s.show = show;
			}
		}).configure({
			'on': h.repaint // Re-render the view after a change
		});

		// Set the default route and update the show state
		router.init('/');
		s.show = router.getRoute(0) || 'all';

		return this;

	}, ['app.helpers', 'app.state']);

}.call(window.Syringe, window.Router));