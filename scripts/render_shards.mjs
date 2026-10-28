#!/usr/bin/env node
// Render a composition in shards, bundled once (PLAYBOOK §10.5): each shard is written to tmp_* and renamed when
// complete, finished shards are skipped on a restart (worker restarts kill long renders), then the shards are joined
// with `ffmpeg -f concat -c copy` and, if given, the master audio is laid under the picture.
//
// Usage: node scripts/render_shards.mjs films/<slug>/remotion COMP OUT_DIR [--seconds 30] [--scale 1] [--crf 18]
//          [--concurrency 4] [--audio MIX.wav] [--maxrate 16M] [--out FILM.mp4] [--copy]
// Start long renders detached: setsid nohup node scripts/render_shards.mjs … > log 2>&1 < /dev/null & disown
import {createRequire} from 'node:module';
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const [project, comp, out, ...rest] = process.argv.slice(2);
if (!out) {
	console.error('usage: render_shards.mjs PROJECT COMP OUT_DIR [--seconds S] [--scale K] [--crf N] [--concurrency C] [--audio WAV] [--maxrate R] [--out MP4]');
	process.exit(2);
}
const opt = (name, def) => {
	const i = rest.indexOf(`--${name}`);
	return i >= 0 ? rest[i + 1] : def;
};
const seconds = Number(opt('seconds', 30));
const scale = Number(opt('scale', 1));
const crf = Number(opt('crf', 18));
const concurrency = Number(opt('concurrency', 4));
const audio = opt('audio', null);
const maxrate = opt('maxrate', scale > 1 ? '40M' : '16M');
const final = opt('out', path.join(out, `${comp}.mp4`));

const req = createRequire(path.resolve(project, 'package.json'));
const {bundle} = req('@remotion/bundler');
const {selectComposition, renderMedia} = req('@remotion/renderer');

fs.mkdirSync(out, {recursive: true});
const libModules = path.resolve(project, '../../../lib/remotion/node_modules');
if (!fs.existsSync(libModules)) fs.symlinkSync(path.relative(path.dirname(libModules), path.resolve(project, 'node_modules')), libModules);
const webpackOverride = (config) => ({...config, resolve: {...config.resolve, modules: [path.resolve(project, 'node_modules'), 'node_modules']}});
const serveUrl = await bundle({entryPoint: path.resolve(project, 'src/index.ts'), publicDir: path.resolve(project, 'public'), webpackOverride});
const chromiumOptions = {gl: 'swangle'};
const composition = await selectComposition({serveUrl, id: comp, chromiumOptions});
const per = Math.round(seconds * composition.fps);
const total = composition.durationInFrames;
const shards = [];
for (let a = 0; a < total; a += per) shards.push([a, Math.min(total, a + per) - 1]);
console.log(`${comp}: ${total} frames, ${shards.length} shards of ${per}, scale ${scale}`);

for (const [a, b] of shards) {
	const name = `shard_${String(a).padStart(6, '0')}.mp4`;
	const file = path.join(out, name);
	if (fs.existsSync(file)) continue;
	const tmp = path.join(out, `tmp_${name}`);
	const t0 = Date.now();
	await renderMedia({
		serveUrl, composition, codec: 'h264', outputLocation: tmp, frameRange: [a, b], scale, crf, concurrency,
		muted: true, chromiumOptions, x264Preset: 'medium', pixelFormat: 'yuv420p',
	});
	fs.renameSync(tmp, file);
	console.log(`shard ${a}-${b} ${((Date.now() - t0) / (b - a + 1)).toFixed(0)} ms/frame`);
}

// join, check length, lay the audio under it with a capped bitrate
const list = path.join(out, 'shards.txt');
fs.writeFileSync(list, shards.map(([a]) => `file 'shard_${String(a).padStart(6, '0')}.mp4'\n`).join(''));
const joined = path.join(out, 'joined.mp4');
execFileSync('ffmpeg', ['-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', joined]);
const dur = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', joined]).toString());
const want = total / composition.fps;
console.log(`picture ${dur.toFixed(2)} s, composition ${want.toFixed(2)} s`);
if (Math.abs(dur - want) > 0.15) throw new Error('picture length does not match the composition');
const args = ['-y', '-v', 'error', '-i', joined];
if (audio) args.push('-i', audio, '-map', '0:v', '-map', '1:a', '-c:a', 'aac', '-b:a', '320k', '-ac', '2', '-shortest');
if (rest.includes('--copy')) args.push('-c:v', 'copy', '-movflags', '+faststart', final); // review copies: no re-encode
else args.push('-c:v', 'libx264', '-preset', 'slow', '-crf', String(crf), '-maxrate', maxrate, '-bufsize', String(parseInt(maxrate) * 2) + 'M',
	'-pix_fmt', 'yuv420p', '-movflags', '+faststart', final);
execFileSync('ffmpeg', args);
console.log('wrote', final);
