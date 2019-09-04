const routes = require('express').Router();

routes.get('/status', (req, res) => {
	res.status(200).json({ message: 'Connected!' });
});

routes.get('/users', (req, res) => {
	res.status(200).json({
		users: [
			{
				name: '이은미',
				email: 'eunmi@passme.com'
			},
			{
				name: '박태희',
				email: 'taghe@passme.com'
			}
		]
	});
});

module.exports = routes;
