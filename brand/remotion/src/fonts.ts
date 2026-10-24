import {loadFont} from '@remotion/fonts';
import {continueRender, delayRender, staticFile} from 'remotion';
import {fonts} from './brand';

// Vendored OFL fonts (PLAYBOOK §10.2): never fetched from a CDN at render time.
const handle = delayRender('Loading brand fonts');
Promise.all([
	loadFont({family: fonts.display, url: staticFile('fonts/cinzel-latin-700-normal.woff2'), weight: '700'}),
	loadFont({family: fonts.text, url: staticFile('fonts/inter-latin-500-normal.woff2'), weight: '500'}),
	loadFont({family: fonts.text, url: staticFile('fonts/inter-latin-600-normal.woff2'), weight: '600'}),
])
	.then(() => continueRender(handle))
	.catch((err: unknown) => {
		throw err;
	});
