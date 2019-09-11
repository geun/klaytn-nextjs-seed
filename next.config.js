require('dotenv').config();
require('dotenv').config({ path: '.env.contract' });

const path = require('path');
const Dotenv = require('dotenv-webpack');

const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');
const withFonts = require('next-fonts');
const withCSS = require('@zeit/next-css');

const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
	require.extensions['.css'] = file => {};
}

// touch
const nextConfig = {
	serverRuntimeConfig: {
		KLAYTN_PRIVATE_KEY: process.env.KLAYTN_PRIVATE_KEY,
		CONTRACT_ABI_JSON: process.env.CONTRACT_ABI_JSON,
		CONTRACT_ADDRESS_JSON: process.env.CONTRACT_ADDRESS_JSON
	},

	publicRuntimeConfig: {
		CAVER_PROVIDER: process.env.CAVER_PROVIDER
	},

	webpack: (config, { isServer }) => {
		if (isServer) {
			const antStyles = /antd\/.*?\/style\/css.*?/;
			const origExternals = [...config.externals];
			config.externals = [
				(context, request, callback) => {
					if (request.match(antStyles)) return callback();
					if (typeof origExternals[0] === 'function') {
						origExternals[0](context, request, callback);
					} else {
						callback();
					}
				},
				...(typeof origExternals[0] === 'function' ? [] : origExternals)
			];

			config.module.rules.unshift({
				test: antStyles,
				use: 'null-loader'
			});
		}

		//   // HOTFIX: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250
		config.plugins.push(
			new FilterWarningsPlugin({
				exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
			})
		);

		config.plugins.push(
			// Read the .env file
			new Dotenv({
				path: path.join(__dirname, '.env'),
				systemvars: true
			})
		);

		return config;
	}
	// webpack: config => {
	//   config.resolve.alias = {
	//     ...config.resolve.alias,
	//     // 'common/dist': 'common/src',
	//   };
	//   return config;
	// },
};

module.exports = withPlugins(
	[
		[
			withOptimizedImages,
			{
				mozjpeg: {
					quality: 60
				},
				webp: {
					preset: 'default',
					quality: 60
				}
			}
		],
		withFonts,
		withCSS
	],
	nextConfig
);
