import path from 'path';
import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
Config.setConcurrency(4);
// The shared toolkit lives in lib/remotion (outside this project): resolve its imports from this project's node_modules.
Config.overrideWebpackConfig((config) => ({
	...config,
	resolve: {
		...config.resolve,
		modules: [path.join(process.cwd(), 'node_modules'), 'node_modules'],
	},
}));
