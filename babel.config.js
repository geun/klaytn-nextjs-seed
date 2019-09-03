module.exports = function(api) {
	api.cache(true);

	const presets = ['next/babel'];
	const plugins = [
		['styled-components'],
		[
			'@babel/plugin-proposal-decorators',
			{
				legacy: true
			}
		],
		['@babel/plugin-syntax-dynamic-import'],
		['@babel/plugin-proposal-optional-chaining'],

		['import', { libraryName: 'antd', style: 'css' }]
	];

	return {
		presets,
		plugins
	};
};
