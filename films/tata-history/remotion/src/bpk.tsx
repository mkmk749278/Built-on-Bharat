import React from 'react';
import {AbsoluteFill, delayRender, continueRender, Img, interpolate, Easing, staticFile, useCurrentFrame} from 'remotion';
import {loadFont} from '@remotion/fonts';

// The film goes out on Be Practical with Kishore (owner, 2026-11-05: "we are uploading it to Be Practical With
// Kishore"; Built on Bharat continues there as a playlist). The channel's own marks, from mkmk749278/Creator
// assets/brand: the logo square as the corner bug (Creator video/doc: top-right, 78 px, 12 px radius, 0.82 opacity)
// and its logo sting (Creator video/prahlad/logo_sting, ported here frame for frame) in the outro only.

export const BPK = {navy: '#0b1631', yellow: '#ffd34d', blue: '#5a7bc0', ink: '#f4f6fb'};

let fontsStarted = false;
export const loadBpkFonts = (): void => {
	if (fontsStarted) return;
	fontsStarted = true;
	const h = delayRender('Loading Inter');
	Promise.all(['400', '800'].map((w) => loadFont({family: 'Inter', url: staticFile(`fonts/inter-latin-${w}-normal.woff2`), weight: w})))
		.then(() => continueRender(h))
		.catch((e: unknown) => {
			throw e;
		});
};

/** The channel's logo square, top-right, the whole film except the outro (where the sting names the channel). */
export const ChannelBug: React.FC<{hideFrom?: number}> = ({hideFrom = Infinity}) => {
	const frame = useCurrentFrame();
	const o = interpolate(frame, [hideFrom - 12, hideFrom], [0.82, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	if (o <= 0) return null;
	return (
		<AbsoluteFill style={{pointerEvents: 'none'}}>
			<Img
				src={staticFile('brand/bpk_logo_512.png')}
				style={{position: 'absolute', right: 40, top: 36, width: 78, height: 78, borderRadius: 12, opacity: o, boxShadow: '0 4px 18px rgba(0,0,0,0.5)'}}
			/>
		</AbsoluteFill>
	);
};

const ease3 = Easing.bezier(0.215, 0.61, 0.355, 1); // power3.out
const ease2 = Easing.bezier(0.25, 0.46, 0.45, 0.94); // power2.out
const tw = (f: number, a: number, d: number, from: number, to: number, e = ease2) =>
	interpolate(f, [a, a + d], [from, to], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e});

const LINES: Array<{d: string; c: string; len: number}> = [
	{d: 'M0 420 H160', c: BPK.yellow, len: 160},
	{d: 'M0 480 H250', c: BPK.blue, len: 250},
	{d: 'M0 532 H270 C320 532 320 584 370 584 H420', c: BPK.yellow, len: 440},
	{d: 'M0 586 H200 C250 586 250 636 300 636 H360', c: BPK.blue, len: 380},
];
const DOTS = [
	{x: 160, y: 420, r: 14, c: BPK.yellow},
	{x: 250, y: 480, r: 13, c: BPK.blue},
	{x: 420, y: 584, r: 14, c: BPK.yellow},
	{x: 360, y: 636, r: 13, c: BPK.blue},
];

const Circuit: React.FC<{t: number; flip?: boolean}> = ({t, flip}) => (
	<svg viewBox="0 0 520 1080" style={{position: 'absolute', top: 0, height: '100%', width: 400, [flip ? 'right' : 'left']: 0, transform: flip ? 'scaleX(-1)' : undefined}}>
		<g fill="none" strokeWidth={5} strokeLinecap="round">
			{LINES.map((l, i) => (
				<path key={i} d={l.d} stroke={l.c} strokeDasharray={l.len + 2} strokeDashoffset={(l.len + 2) * (1 - tw(t, 0.05 + (i % 4) * 0.08, 0.9, 0, 1))} />
			))}
		</g>
		{DOTS.map((d, i) => {
			const s = tw(t, 0.75 + i * 0.05, 0.35, 0, 1, Easing.bezier(0.34, 1.9, 0.64, 1));
			return <circle key={i} cx={d.x} cy={d.y} r={d.r * s} fill={d.c} />;
		})}
	</svg>
);

/** The Be Practical with Kishore sting, then it holds as the end card (`hold` frames on). 60 fps. */
export const BpkSting: React.FC<{tagline?: boolean}> = ({tagline = true}) => {
	const frame = useCurrentFrame();
	const t = frame / 60;
	const letters = 'PRACTICAL'.split('');
	const rise = (a: number, d: number, y0: number, blur: number) => {
		const k = tw(t, a, d, 0, 1, ease3);
		return {opacity: k, transform: `translateY(${(1 - k) * y0}px)`, filter: `blur(${(1 - k) * blur}px)`};
	};
	const sweepX = tw(t, 1.9, 1.1, 0, 2600, Easing.inOut(Easing.sin));
	return (
		<AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 45%, #13224a 0%, ${BPK.navy} 55%, #070d1f 100%)`, fontFamily: 'Inter, sans-serif', color: BPK.ink, overflow: 'hidden'}}>
			<Circuit t={t} />
			<Circuit t={t} flip />
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', transform: `scale(${1 + 0.035 * Math.min(1, t / 4.2) + 0.01 * Math.max(0, t - 4.2) / 6})`}}>
				<div style={{display: 'flex', fontWeight: 800, fontSize: 172, lineHeight: 0.95, letterSpacing: '-0.01em'}}>
					<span style={{marginRight: 52, ...rise(0.25, 0.55, 60, 12)}}>BE</span>
					{letters.map((ch, i) => (
						<span key={i} style={{color: BPK.yellow, display: 'inline-block', ...rise(0.4 + i * 0.045, 0.5, 80, 14)}}>
							{ch}
						</span>
					))}
				</div>
				<div style={{fontSize: 80, fontWeight: 800, marginTop: 8, ...rise(1.05, 0.5, 30, 0)}}>with Kishore</div>
				{tagline && (
					<div style={{fontSize: 44, fontWeight: 400, marginTop: 26, opacity: tw(t, 1.4, 0.7, 0, 1), transform: `scale(${1.06 - 0.06 * tw(t, 1.4, 0.7, 0, 1)})`}}>
						Real questions. Simple explanations.
					</div>
				)}
			</AbsoluteFill>
			<div style={{position: 'absolute', top: '-20%', left: '-20%', width: 260, height: '140%', transform: `translateX(${sweepX}px)`, background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.16) 50%, rgba(255,255,255,0) 100%)'}} />
			<AbsoluteFill style={{background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)'}} />
		</AbsoluteFill>
	);
};
