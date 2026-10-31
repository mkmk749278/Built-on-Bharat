import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camera, colors, ease, Footage, fontStacks, pop, tween} from '../../../../../lib/remotion';

const BLUE = 'rgba(206,228,255,0.9)';

/** One stroke of a drawing, drawn in from `at` over `dur` frames (pathLength 1 trick). */
const Stroke: React.FC<{d: string; at: number; dur?: number; w?: number; o?: number}> = ({d, at, dur = 40, w = 2.6, o = 1}) => {
	const frame = useCurrentFrame();
	const p = tween(frame, at, at + dur, 0, 1, ease.sweep);
	return <path d={d} pathLength={1} fill="none" stroke={BLUE} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={1} strokeDashoffset={1 - p} opacity={o} />;
};

// A classical facade: the student of architecture (drawn, not a real building).
const BUILDING: string[] = [
	'M 520 790 L 1400 790',
	'M 560 760 L 1360 760 L 1360 790 M 560 760 L 560 790',
	'M 560 470 L 1360 470 L 1360 420 L 560 420 Z',
	'M 560 420 L 960 250 L 1360 420',
	'M 640 404 L 960 272 L 1280 404 Z',
	...[0, 1, 2, 3, 4, 5].map((k) => {
		const x = 620 + k * 136;
		return `M ${x} 470 L ${x} 760 M ${x + 56} 470 L ${x + 56} 760`;
	}),
	'M 900 760 L 900 600 Q 928 560 956 600 L 956 760',
];

// A small hatchback in side elevation: the same lines becoming a car (drawn, not a factory drawing).
const CAR: string[] = [
	'M 300 772 L 1620 772',
	'M 470 700 L 470 616 Q 480 584 540 574 L 700 556 Q 768 470 866 444 L 1176 434 Q 1262 440 1332 522 L 1404 600 Q 1446 612 1446 652 L 1446 700',
	'M 470 700 L 540 700 M 700 700 L 1200 700 M 1360 700 L 1446 700',
	'M 540 700 A 80 80 0 0 1 700 700 M 1200 700 A 80 80 0 0 1 1360 700',
	'M 680 700 A 60 60 0 1 1 680 699.9 M 1340 700 A 60 60 0 1 1 1340 699.9',
	'M 790 548 L 880 466 L 1040 460 L 1040 548 Z',
	'M 1070 548 L 1070 460 L 1176 458 Q 1240 466 1292 540 Z',
	'M 1056 556 L 1056 690 M 760 600 L 800 600 M 1100 600 L 1140 600',
	'M 470 840 L 1446 840 M 470 822 L 470 858 M 1446 822 L 1446 858',
];

/** "He studied architecture in America" → "A car designed in India, by Indians": blueprint lines on the channel's
 *  grid draw a facade; with `carAt`, the facade fades and the same pen draws a small car. ILLUSTRATION. */
export const Drafting: React.FC<{carAt?: number; buildingFrom?: number}> = ({carAt, buildingFrom = 0}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const bOut = carAt === undefined ? 1 : tween(frame, carAt - 20, carAt + 10, 1, 0.08);
	return (
		<AbsoluteFill style={{background: 'radial-gradient(ellipse 80% 70% at 50% 45%, #15283C 0%, #0A121C 80%)'}}>
			<Camera seed="draft" drift={2} keys={[{f: 0, scale: 1.0}, {f: durationInFrames, scale: 1.1, y: -10}]}>
				<AbsoluteFill
					style={{
						backgroundImage:
							'linear-gradient(rgba(160,200,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(160,200,255,0.10) 1px, transparent 1px), linear-gradient(rgba(160,200,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(160,200,255,0.05) 1px, transparent 1px)',
						backgroundSize: '120px 120px, 120px 120px, 24px 24px, 24px 24px',
					}}
				/>
				<svg viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0, filter: 'drop-shadow(0 0 6px rgba(150,200,255,0.55))'}}>
					{buildingFrom > -1000 ? (
						<g opacity={bOut}>
							{BUILDING.map((d, i) => (
								<Stroke key={i} d={d} at={buildingFrom + 6 + i * 9} dur={36} />
							))}
						</g>
					) : null}
					{carAt !== undefined
						? CAR.map((d, i) => <Stroke key={i} d={d} at={carAt + i * 12} dur={i === 1 ? 70 : 40} w={i === 1 ? 3.2 : 2.6} />)
						: null}
					{/* the title block, bottom right: lines only */}
					<g opacity={tween(frame, 20, 50, 0, 0.7)}>
						<rect x={1500} y={900} width={340} height={110} fill="none" stroke={BLUE} strokeWidth={1.5} />
						<path d="M 1500 940 L 1840 940 M 1640 940 L 1640 1010" stroke={BLUE} strokeWidth={1.2} />
					</g>
				</svg>
			</Camera>
		</AbsoluteFill>
	);
};

/** "Then the complaints start. Quality. Power.": two cold words stamped into brushed steel, each slamming in on its
 *  word; the first falls back as the second lands. */
export const SteelWords: React.FC<{words: {text: string; at: number}[]}> = ({words}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();
	const sweep = tween(frame, 0, durationInFrames, -30, 130, ease.camera);
	return (
		<AbsoluteFill style={{background: 'linear-gradient(180deg, #2B3036 0%, #1A1D21 55%, #121417 100%)'}}>
			<AbsoluteFill style={{background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 2px, transparent 5px)'}} />
			<AbsoluteFill style={{background: `linear-gradient(105deg, transparent ${sweep - 18}%, rgba(170,200,230,0.16) ${sweep}%, transparent ${sweep + 18}%)`}} />
			<Camera seed="steel" drift={2} keys={[{f: 0, scale: 1.0}, {f: durationInFrames, scale: 1.06}]}>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
					{words.map((w, i) => {
						const next = words[i + 1];
						const p = pop(frame, fps, w.at, 260, 22);
						const back = next ? tween(frame, next.at - 4, next.at + 14, 0, 1, ease.arrive) : 0;
						if (frame < w.at - 2) return null;
						return (
							<div
								key={w.text}
								style={{
									position: 'absolute',
									fontFamily: fontStacks.display,
									fontSize: 230,
									letterSpacing: '0.12em',
									color: '#C9D3DC',
									opacity: (0.3 + 0.7 * Math.min(1, p)) * (1 - 0.75 * back),
									transform: `translateY(${-230 * back}px) scale(${(1.35 - 0.35 * p) * (1 - 0.35 * back)})`,
									textShadow: '0 2px 0 rgba(255,255,255,0.25), 0 -2px 0 rgba(0,0,0,0.8), 0 0 60px rgba(120,170,220,0.25)',
								}}
							>
								{w.text}
							</div>
						);
					})}
				</AbsoluteFill>
			</Camera>
		</AbsoluteFill>
	);
};

/** The 1999 meeting room as a long glass table under cold window light, empty chairs down both sides. With `darkAt`
 *  the room's lights die ("The deal is off"). No people: nobody's face is invented. ILLUSTRATION. */
export const GlassTable: React.FC<{darkAt?: number}> = ({darkAt = 1e9}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const dark = tween(frame, darkAt, darkAt + 50, 0, 1, ease.leave);
	return (
		<AbsoluteFill style={{background: '#0C1016', filter: `brightness(${1 - 0.82 * dark})`}}>
			{/* the far wall of windows */}
			<AbsoluteFill style={{background: 'linear-gradient(180deg, #1A2430 0%, #233243 38%, #0E1218 60%)'}} />
			{new Array(9).fill(0).map((_, k) => (
				<div key={k} style={{position: 'absolute', top: 150, height: 330, left: 180 + k * 180, width: 150, background: 'linear-gradient(180deg, rgba(200,225,250,0.55), rgba(150,185,220,0.25))', opacity: 0.55, boxShadow: 'inset 0 0 0 3px rgba(20,28,38,0.9)'}}>
					{/* mullions and a transom: a window, not a panel */}
					<div style={{position: 'absolute', left: 73, top: 0, bottom: 0, width: 4, background: 'rgba(20,28,38,0.9)'}} />
					<div style={{position: 'absolute', left: 0, right: 0, top: 110, height: 4, background: 'rgba(20,28,38,0.9)'}} />
				</div>
			))}
			<Camera seed="room" drift={1.5} keys={[{f: 0, scale: 1.0, y: 0}, {f: durationInFrames, scale: 1.1, y: -20}]}>
				<AbsoluteFill style={{perspective: 1100, perspectiveOrigin: '50% 30%'}}>
					{/* the table */}
					<div
						style={{
							position: 'absolute',
							left: 660,
							width: 600,
							top: 420,
							height: 1400,
							transform: 'rotateX(74deg)',
							transformOrigin: '50% 0%',
							background: 'linear-gradient(180deg, rgba(190,215,240,0.32) 0%, rgba(90,120,150,0.22) 50%, rgba(30,40,55,0.5) 100%)',
							border: '2px solid rgba(210,230,250,0.35)',
							boxShadow: '0 0 80px rgba(150,190,230,0.15)',
						}}
					>
						<div style={{position: 'absolute', inset: 0, background: 'repeating-linear-gradient(90deg, transparent 0px, transparent 40px, rgba(220,235,255,0.10) 40px, rgba(220,235,255,0.10) 110px)'}} />
					</div>
					{/* chairs, both sides, receding */}
					{[0, 1, 2, 3, 4, 5].flatMap((k) => {
						const t = k / 5;
						const s = 1 - 0.62 * t;
						const y = 940 - 470 * Math.pow(t, 0.7);
						const dx = 470 - 300 * Math.pow(t, 0.8);
						return [-1, 1].map((side) => (
							<div
								key={`${k}${side}`}
								style={{
									position: 'absolute',
									left: 960 + side * dx - 70 * s,
									top: y - 150 * s,
									width: 140 * s,
									height: 190 * s,
									borderRadius: 18 * s,
									background: 'linear-gradient(180deg, #232A33 0%, #0E1116 100%)',
									boxShadow: `inset 0 ${3 * s}px 0 rgba(180,210,240,0.18)`,
								}}
							/>
						));
					})}
				</AbsoluteFill>
			</Camera>
			<AbsoluteFill style={{background: 'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 40%, rgba(0,0,0,0.6) 100%)'}} />
		</AbsoluteFill>
	);
};

/** Signature 6, the silence: a night plane window, city lights far below, and a slow count of minutes with no tick.
 *  `fadeAt`: the window dies to near-black and holds ("Hold on to that silence"). ILLUSTRATION. */
export const Porthole: React.FC<{file: string; startFrom: number; countFrom?: number; countTo?: number; minutes?: number; fadeAt?: number; side?: React.ReactNode; x?: number; brightness?: number}> = ({
	file,
	startFrom,
	countFrom = 1e9,
	countTo = 1e9 + 1,
	minutes = 0,
	fadeAt = 1e9,
	side,
	x = -80,
	brightness = 0.62,
}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const n = Math.round(tween(frame, countFrom, countTo, 0, minutes, ease.camera));
	const co = tween(frame, countFrom - 10, countFrom + 20, 0, 1) * tween(frame, fadeAt - 30, fadeAt, 1, 0);
	const fade = tween(frame, fadeAt, fadeAt + 50, 1, 0.3, ease.leave); // v9: dims, never to black (0.05 read as a frozen frame)
	return (
		<AbsoluteFill style={{background: '#08090B'}}>
			<AbsoluteFill style={{opacity: fade}}>
				<Camera seed="porthole" drift={1} keys={[{f: 0, scale: 1.0}, {f: durationInFrames, scale: 1.14, x: 20}]}>
					{/* cabin wall */}
					<AbsoluteFill style={{background: 'radial-gradient(ellipse 50% 60% at 46% 50%, #23262B 0%, #121417 60%, #08090B 100%)'}} />
					<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
						<div style={{position: 'relative', left: x, width: 560, height: 780, borderRadius: '46% / 40%', padding: 34, background: 'linear-gradient(160deg, #3A3E44 0%, #1B1D21 100%)', boxShadow: '0 30px 80px rgba(0,0,0,0.7)'}}>
							<div style={{position: 'relative', width: '100%', height: '100%', borderRadius: '44% / 38%', overflow: 'hidden', boxShadow: 'inset 0 0 50px 18px rgba(0,0,0,0.9)'}}>
								<div style={{position: 'absolute', inset: 0, filter: `brightness(${brightness}) saturate(0.8)`}}>
									<Footage file={file} startFrom={startFrom} grade="modern" />
								</div>
								<AbsoluteFill style={{boxShadow: 'inset 0 0 60px 26px rgba(0,0,0,0.85)', borderRadius: '44% / 38%'}} />
								{/* a faint reflection on the pane */}
								<AbsoluteFill style={{background: 'linear-gradient(125deg, rgba(255,255,255,0.06) 0%, transparent 35%)'}} />
							</div>
						</div>
					</AbsoluteFill>
				</Camera>
			</AbsoluteFill>
			{side}
			{/* the minutes: no tick, just the number */}
			<div style={{position: 'absolute', right: 230, top: 470, textAlign: 'right', opacity: co}}>
				<div style={{fontFamily: fontStacks.numbers, fontSize: 120, color: colors.ink, letterSpacing: '0.04em', lineHeight: 1}}>{n}</div>
				<div style={{fontFamily: fontStacks.text, fontSize: 24, letterSpacing: '0.4em', color: 'rgba(230,220,200,0.6)', marginTop: 14}}>MINUTES</div>
			</div>
		</AbsoluteFill>
	);
};
