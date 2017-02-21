import fs from 'fs';
import es3 from 'rollup-plugin-es3';
import replace from 'rollup-plugin-post-replace';
import babel from 'rollup-plugin-babel';
import memory from 'rollup-plugin-memory';

var babelRc = JSON.parse(fs.readFileSync('.babelrc','utf8')); // eslint-disable-line

export default {
	exports: 'default',
	useStrict: false,
	globals: {
		preact: 'preact'
	},
	plugins: [
		memory({
			path: 'src/index',
			contents: "export { default } from './index';"
		}),
		
		babel({
			babelrc: false,
			presets: [
				['es2015', { loose:true, modules:false }]
			].concat(babelRc.presets.slice(1)),
			plugins: babelRc.plugins,
			exclude: 'node_modules/**'
		}),
		
		// strip Object.freeze()
		es3(),

		// remove Babel helpers
		replace({
			'throw ': 'return; throw '
		})
	]
};
