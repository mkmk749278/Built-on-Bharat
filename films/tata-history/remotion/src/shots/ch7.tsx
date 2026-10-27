import React from 'react';
import {AbsoluteFill, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camera, ease, fontStacks, tween} from '../../../../../lib/remotion';

// 26/11 at the Taj, told without violence (plan_v6 §4 ch 7): no weapons, no victims, no faces. Spaces, light and
// silhouettes only, all ILLUSTRATION.

const VP: [number, number] = [960, 470];

/** A walking silhouette: head, coat, legs swinging. `lead` raises an arm toward the exit (a staff member guiding). */
const Walker: React.FC<{x: number; y: number; s: number; t: number; lead?: boolean; tone?: string}> = ({x, y, s, t, lead, tone = '#07080A'}) => {
	const sw = Math.sin(t * 7) * 0.35;
	return (
		<g transform={`translate(${x} ${y}) scale(${s})`}>
			<path d={`M -6 -40 L ${-14 + sw * 30} 0 L ${-6 + sw * 30} 0 L 0 -36 L ${6 - sw * 30} 0 L ${14 - sw * 30} 0 L 6 -40 Z`} fill={tone} />
			<path d="M -18 -112 Q 0 -122 18 -112 L 16 -40 L -16 -40 Z" fill={tone} />
			<circle cx={0} cy={-128} r={12} fill={tone} />
			{lead ? <path d="M 14 -108 L 52 -126 L 54 -120 L 16 -98 Z" fill={tone} /> : null}
		</g>
	);
};

/** "Inside, the staff could run. They know every back exit. But many of them stay": a service corridor in one-point
 *  perspective; the ceiling lights die one by one from the near end; the exit at the far end stays lit, and from
 *  `walkFrom`, a staff member leads two guests toward it. */
export const Corridor: React.FC<{outFrom: number; outStep: number; walkFrom: number}> = ({outFrom, outStep, walkFrom}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();
	const depth = (k: number) => 1 / (1 + k * 0.55); // 1 near → small far
	const lights = new Array(7).fill(0).map((_, k) => {
		const d = depth(k);
		const on = 1 - tween(frame, outFrom + k * outStep, outFrom + k * outStep + 8, 0, 1);
		const flick = frame > outFrom + k * outStep - 6 && frame < outFrom + k * outStep ? (random(`fl${k}${frame}`) > 0.5 ? 0.3 : 1) : 1;
		return {k, d, on: on * flick};
	});
	const lit = lights.reduce((a, l) => a + l.on, 0) / lights.length;
	const wt = Math.max(0, (frame - walkFrom) / fps);
	const prog = Math.min(1, wt / 9);
	return (
		<AbsoluteFill style={{background: '#050506'}}>
			<Camera seed="corr" drift={1.5} keys={[{f: 0, scale: 1.0}, {f: durationInFrames, scale: 1.08}]}>
				<svg viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
					<defs>
						<radialGradient id="exit-glow" cx="0.5" cy="0.5" r="0.5">
							<stop offset="0" stopColor="#FFE2B0" stopOpacity={0.9} />
							<stop offset="1" stopColor="#FFB060" stopOpacity={0} />
						</radialGradient>
					</defs>
					{/* walls, floor, ceiling: brightness follows the lights still on */}
					<path d={`M 0 0 L ${VP[0] - 90} ${VP[1] - 120} L ${VP[0] - 90} ${VP[1] + 110} L 0 1080 Z`} fill={`rgba(60,52,44,${0.25 + 0.6 * lit})`} />
					<path d={`M 1920 0 L ${VP[0] + 90} ${VP[1] - 120} L ${VP[0] + 90} ${VP[1] + 110} L 1920 1080 Z`} fill={`rgba(52,46,40,${0.22 + 0.55 * lit})`} />
					<path d={`M 0 1080 L ${VP[0] - 90} ${VP[1] + 110} L ${VP[0] + 90} ${VP[1] + 110} L 1920 1080 Z`} fill={`rgba(40,34,30,${0.3 + 0.55 * lit})`} />
					<path d={`M 0 0 L ${VP[0] - 90} ${VP[1] - 120} L ${VP[0] + 90} ${VP[1] - 120} L 1920 0 Z`} fill={`rgba(30,28,26,${0.3 + 0.5 * lit})`} />
					{/* doors along the walls */}
					{[0, 1, 2, 3].map((k) => {
						const d = depth(k + 0.5);
						const x = (VP[0] - 90) + (0 - (VP[0] - 90)) * d;
						const top = VP[1] - 120 + (0 - (VP[1] - 120)) * d * 0.62;
						const bot = VP[1] + 110 + (1080 - (VP[1] + 110)) * d;
						return <path key={k} d={`M ${x} ${bot} L ${x} ${top + (bot - top) * 0.2} L ${x + 60 * d} ${top + (bot - top) * 0.22} L ${x + 60 * d} ${bot - 6 * d} Z`} fill={`rgba(20,16,14,${0.5 + 0.4 * lit})`} />;
					})}
					{/* the exit, far end, still lit */}
					<rect x={VP[0] - 34} y={VP[1] - 70} width={68} height={170} fill="#F7D7A0" opacity={0.95} />
					<circle cx={VP[0]} cy={VP[1] + 10} r={260} fill="url(#exit-glow)" opacity={0.55} />
					{/* ceiling lights */}
					{lights.map(({k, d, on}) => {
						const y = VP[1] - 120 + (0 - (VP[1] - 120)) * d * 0.9;
						return (
							<g key={k} opacity={0.08 + 0.92 * on}>
								<rect x={VP[0] - 120 * d} y={y} width={240 * d} height={14 * d} rx={4 * d} fill="#FFF1D6" />
								<ellipse cx={VP[0]} cy={y + 40 * d} rx={300 * d} ry={90 * d} fill="#FFE6B8" opacity={0.18 * on} />
							</g>
						);
					})}
					{/* the staff member leads two guests toward the exit */}
					{frame >= walkFrom
						? [0, 1, 2].map((i) => {
								const p = Math.max(0, prog - i * 0.06);
								const d = 1.15 - 0.95 * p;
								const x = VP[0] + (i - 1) * 70 * d + (1 - p) * 120;
								const y = VP[1] + 110 + (1080 - (VP[1] + 110)) * Math.max(0, d - 0.12);
								return <Walker key={i} x={x} y={y} s={2.6 * d} t={wt + i * 0.4} lead={i === 0} />;
							})
						: null}
				</svg>
			</Camera>
			<AbsoluteFill style={{background: 'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 35%, rgba(0,0,0,0.7) 100%)'}} />
		</AbsoluteFill>
	);
};

const SHIRT = '#E9E4DA';

/** Three uniforms, cropped at the collar so there is no face: a waiter, a cook, a manager (`at` per word). From
 *  `allAt` they stand side by side ("People like us"). */
export const Uniforms: React.FC<{at: [number, number, number]; allAt: number}> = ({at, allAt}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const all = tween(frame, allAt, allAt + 40, 0, 1, ease.camera);
	const active = frame >= at[2] ? 2 : frame >= at[1] ? 1 : 0;
	const torso = (kind: number) => (
		<svg viewBox="0 0 600 700" width="100%" height="100%">
			<defs>
				<linearGradient id={`u-light${kind}`} x1="0" y1="0" x2="1" y2="0">
					<stop offset="0" stopColor="#000" stopOpacity={0.45} />
					<stop offset="0.45" stopColor="#000" stopOpacity={0} />
					<stop offset="1" stopColor="#000" stopOpacity={0.55} />
				</linearGradient>
			</defs>
			{kind === 0 ? (
				<>
					{/* waiter: black jacket, white shirt front, bow tie */}
					<path d="M 50 700 L 70 250 Q 110 165 230 145 L 370 145 Q 490 165 530 250 L 550 700 Z" fill="#141416" />
					<path d="M 230 145 L 300 145 L 370 145 L 340 420 L 300 470 L 260 420 Z" fill={SHIRT} />
					<path d="M 230 145 L 300 470 L 240 560 L 180 250 Z" fill="#1E1E22" />
					<path d="M 370 145 L 300 470 L 360 560 L 420 250 Z" fill="#1E1E22" />
					<path d="M 262 168 L 300 184 L 338 168 L 338 202 L 300 186 L 262 202 Z" fill="#0A0A0B" />
					{[0, 1, 2].map((k) => (
						<circle key={k} cx={300} cy={250 + k * 60} r={6} fill="#CFC8BA" />
					))}
				</>
			) : kind === 1 ? (
				<>
					{/* cook: double-breasted whites, a neckerchief */}
					<path d="M 50 700 L 70 250 Q 110 165 230 145 L 370 145 Q 490 165 530 250 L 550 700 Z" fill="#F1EEE7" />
					<path d="M 230 145 L 300 230 L 370 145 L 360 130 L 240 130 Z" fill="#B8432F" />
					<path d="M 300 230 L 300 700" stroke="#D6D1C6" strokeWidth={4} />
					{[0, 1, 2, 3, 4].map((k) => (
						<g key={k}>
							<circle cx={240} cy={290 + k * 80} r={9} fill="#D9D3C6" stroke="#BDB6A6" strokeWidth={2} />
							<circle cx={360} cy={290 + k * 80} r={9} fill="#D9D3C6" stroke="#BDB6A6" strokeWidth={2} />
						</g>
					))}
				</>
			) : (
				<>
					{/* manager: dark suit, tie, a small blank name badge */}
					<path d="M 50 700 L 70 250 Q 110 165 230 145 L 370 145 Q 490 165 530 250 L 550 700 Z" fill="#1B2029" />
					<path d="M 230 145 L 300 330 L 370 145 Z" fill={SHIRT} />
					<path d="M 288 160 L 312 160 L 322 320 L 300 350 L 278 320 Z" fill="#5A1F22" />
					<path d="M 230 145 L 300 330 L 250 520 L 190 250 Z" fill="#232935" />
					<path d="M 370 145 L 300 330 L 350 520 L 410 250 Z" fill="#232935" />
					<rect x={395} y={300} width={86} height={24} rx={3} fill="#C9A45A" />
				</>
			)}
			<rect width={600} height={700} fill={`url(#u-light${kind})`} />
		</svg>
	);
	const W = 520;
	return (
		<AbsoluteFill style={{background: 'radial-gradient(ellipse 60% 60% at 50% 45%, #1C1712 0%, #08080A 75%)'}}>
			<Camera seed="unif" drift={1.5} keys={[{f: 0, scale: 1.04}, {f: durationInFrames, scale: 1.0}]}>
				<AbsoluteFill>
					{[0, 1, 2].map((k) => {
						const solo = k === active ? tween(frame, at[k], at[k] + 14, 0, 1, ease.arrive) * (k < 2 ? 1 - tween(frame, at[k + 1] - 4, at[k + 1] + 6, 0, 1) : 1) : 0;
						const o = Math.max(solo * (1 - all), all * tween(frame, allAt + k * 8, allAt + k * 8 + 24, 0, 1));
						const xSolo = 960;
						const xAll = 960 + (k - 1) * (W + 40);
						const x = xSolo + (xAll - xSolo) * all;
						const sc = 1.25 - 0.25 * all;
						return (
							<div key={k} style={{position: 'absolute', left: x - (W * sc) / 2, top: 1080 - 700 * sc * (W / 600) + 40, width: W * sc, height: (700 * W * sc) / 600, opacity: o}}>
								{torso(k)}
							</div>
						);
					})}
				</AbsoluteFill>
			</Camera>
			{/* a warm key from above, nothing else */}
			<AbsoluteFill style={{background: 'radial-gradient(ellipse 40% 30% at 50% 10%, rgba(255,210,150,0.18) 0%, transparent 100%)'}} />
		</AbsoluteFill>
	);
};

/** "Locks the doors and turns off the lights. She keeps more than sixty guests hidden and silent in the dark":
 *  a banquet hall, chandeliers and laid round tables; the doors swing shut (`doorsAt`), the chandeliers die
 *  (`lightsAt`), and in the dark only low rows of crouched shapes remain, lit by the sliver under the door. */
export const BanquetHall: React.FC<{doorsAt: number; lightsAt: number}> = ({doorsAt, lightsAt}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const shut = tween(frame, doorsAt, doorsAt + 40, 0, 1, ease.arrive);
	const dark = tween(frame, lightsAt, lightsAt + 20, 0, 1);
	const L = 1 - 0.93 * dark;
	const tables = [0, 1, 2].flatMap((row) =>
		[0, 1, 2, 3].map((c) => {
			const s = 1 - row * 0.28;
			return {x: 960 + (c - 1.5) * 420 * s, y: 760 - row * 150, s, key: `${row}${c}`};
		}),
	);
	return (
		<AbsoluteFill style={{background: '#040405'}}>
			<Camera seed="hall" drift={1.2} keys={[{f: 0, scale: 1.0}, {f: durationInFrames, scale: 1.1, y: 10}]}>
				<svg viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
					<rect width={1920} height={1080} fill={`rgba(70,52,34,${0.75 * L})`} />
					<rect y={620} width={1920} height={460} fill={`rgba(40,28,20,${0.9 * L + 0.1})`} />
					{/* the doors in the far wall: corridor light beyond until they close; then a sliver under them */}
					<rect x={860} y={330} width={200} height={290} fill="#FFD9A0" opacity={0.85 * (1 - shut) + 0.04} />
					<rect x={860} y={330} width={100 * shut} height={290} fill={`rgba(58,40,26,${0.4 + 0.6 * L})`} />
					<rect x={1060 - 100 * shut} y={330} width={100 * shut} height={290} fill={`rgba(58,40,26,${0.4 + 0.6 * L})`} />
					<rect x={860} y={330} width={200} height={290} fill="none" stroke={`rgba(30,20,12,${0.5 + 0.5 * L})`} strokeWidth={10} />
					<rect x={866} y={614} width={188} height={5} fill="#FFD9A0" opacity={0.75 * shut} />
					{/* chandeliers */}
					{[0, 1, 2].map((k) => (
						<g key={k} opacity={0.05 + 0.95 * L}>
							<ellipse cx={560 + k * 400} cy={210} rx={90} ry={34} fill="#FFE3B0" />
							<ellipse cx={560 + k * 400} cy={230} rx={260} ry={110} fill="#FFD9A0" opacity={0.18} />
						</g>
					))}
					{/* laid tables */}
					{tables
						.slice()
						.reverse()
						.map((t) => (
							<g key={t.key} opacity={0.1 + 0.9 * L}>
								<ellipse cx={t.x} cy={t.y} rx={150 * t.s} ry={44 * t.s} fill="#EDE5D6" />
								<rect x={t.x - 150 * t.s} y={t.y} width={300 * t.s} height={70 * t.s} fill="#D8CFBE" />
							</g>
						))}
					{/* in the dark: guests crouched low between the tables, barely there */}
					{new Array(26).fill(0).map((_, k) => {
						const x = 140 + k * 64 + random(`g${k}`) * 30;
						const y = 880 + random(`gy${k}`) * 60;
						return <ellipse key={k} cx={x} cy={y} rx={22} ry={28} fill="#1A1A1F" opacity={dark * 0.9} />;
					})}
				</svg>
			</Camera>
		</AbsoluteFill>
	);
};

/** "In the kitchens, young chefs lead guests out through the back": swinging kitchen doors with round windows; they
 *  swing as silhouettes pass toward the light beyond. At `stopAt` ("A number of them are killed doing it") they swing
 *  shut, the light behind them fades, and the frame holds. */
export const KitchenDoors: React.FC<{stopAt: number}> = ({stopAt}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();
	const t = frame / fps;
	const stop = tween(frame, stopAt, stopAt + 40, 0, 1, ease.leave);
	const swing = (1 - stop) * Math.max(0, Math.sin(t * 1.9)) * 48;
	const beyond = 1 - 0.85 * stop;
	return (
		<AbsoluteFill style={{background: '#07070A'}}>
			<Camera seed="kitchen" drift={1.2} keys={[{f: 0, scale: 1.0}, {f: durationInFrames, scale: 1.08}]}>
				<AbsoluteFill style={{background: 'linear-gradient(180deg, #17181C 0%, #0C0C0F 70%)'}} />
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', perspective: 1400}}>
					<div style={{position: 'relative', width: 760, height: 900, top: 60}}>
						{/* light beyond the doors */}
						<div style={{position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 70% at 50% 50%, rgba(255,230,190,${0.85 * beyond}) 0%, rgba(255,190,120,${0.25 * beyond}) 60%, transparent 100%)`}} />
						{/* silhouettes passing through, while the doors swing */}
						{stop < 1
							? [0, 1, 2].map((i) => {
									const ph = ((t * 0.45 + i / 3) % 1) * (1 - stop);
									return (
										<svg key={i} viewBox="0 0 760 900" style={{position: 'absolute', inset: 0, opacity: Math.sin(ph * Math.PI) * (1 - stop)}}>
											<Walker x={380 + (ph - 0.5) * 120} y={860 - ph * 140} s={3.4 - ph * 1.6} t={t + i} lead={i === 0} />
										</svg>
									);
								})
							: null}
						{[-1, 1].map((side) => (
							<div
								key={side}
								style={{
									position: 'absolute',
									top: 0,
									bottom: 0,
									width: 380,
									left: side < 0 ? 0 : 380,
									transformOrigin: side < 0 ? '0% 50%' : '100% 50%',
									transform: `rotateY(${side * -swing}deg)`,
									background: 'linear-gradient(180deg, #4A4D52 0%, #2E3034 100%)',
									boxShadow: 'inset 0 0 0 10px #1E2023',
								}}
							>
								<div style={{position: 'absolute', left: 120, top: 180, width: 140, height: 140, borderRadius: '50%', background: `rgba(255,225,180,${0.75 * beyond})`, boxShadow: 'inset 0 0 0 10px #1E2023'}} />
								<div style={{position: 'absolute', left: 40, right: 40, bottom: 60, height: 120, background: 'rgba(200,205,210,0.12)'}} />
							</div>
						))}
					</div>
				</AbsoluteFill>
			</Camera>
		</AbsoluteFill>
	);
};

/** A plain line of type on black, quiet (a name when no licensed photo exists, a date). */
export const OnBlack: React.FC<{lines: {text: string; size?: number; at: number; until?: number; serif?: boolean}[]; bg?: string; x?: number; y?: number}> = ({lines, bg = '#050506', x = 0, y = 0}) => {
	const frame = useCurrentFrame();
	return (
		<AbsoluteFill style={{background: bg, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 26, transform: `translate(${x}px, ${y}px)`}}>
			{lines.map((l) => (
				<div
					key={l.text}
					style={{
						fontFamily: l.serif ? fontStacks.display : fontStacks.text,
						fontSize: l.size ?? 34,
						letterSpacing: l.serif ? '0.16em' : '0.4em',
						color: 'rgba(236,226,206,0.88)',
						opacity: tween(frame, l.at, l.at + 30, 0, 1) * tween(frame, l.until ?? 1e9, (l.until ?? 1e9) + 30, 1, 0),
					}}
				>
					{l.text}
				</div>
			))}
		</AbsoluteFill>
	);
};
