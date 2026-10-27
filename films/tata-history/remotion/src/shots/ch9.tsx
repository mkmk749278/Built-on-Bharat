import React from 'react';
import {AbsoluteFill, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camera, colors, Desk, Dust, ease, Footage, fontStacks, Grain, LightLeak, pop, Print, tween, Vignette} from '../../../../../lib/remotion';
import {InkPaper} from '../../../../../lib/remotion/ink';
import {OwnershipMachine, OwnershipTimeline} from '../../../../../lib/remotion/ownership/OwnershipMachine';

const M = 'assets/media';

/** Signature 8 on its stage: the machine in a slow push, dust in the lamp light. `timeline` frames are local. */
export const OwnershipStage: React.FC<{timeline: OwnershipTimeline; still?: boolean}> = ({timeline, still}) => {
	const {durationInFrames} = useVideoConfig();
	return (
		<AbsoluteFill style={{background: '#0D0E11'}}>
			<InkPaper grid={0.08} />
			<Camera seed="om-cam" drift={still ? 0.6 : 2} keys={[{f: 0, scale: 1.0, y: 10}, {f: durationInFrames, scale: still ? 1.03 : 1.06, y: -10}]}>
				<OwnershipMachine timeline={timeline} />
			</Camera>
			<Dust count={40} seed="om-dust" opacity={0.3} color="#FFD7A8" />
			<LightLeak side="left" strength={0.14} seed="om-leak" />
			<Vignette strength={0.58} />
			<Grain opacity={0.12} id="om-g" />
		</AbsoluteFill>
	);
};

/** A vertical news clip shown as what it is: a 9:16 frame in the middle, its own picture blurred and dimmed behind it,
 *  with the source under it. Never stretched to fill 16:9. */
export const VerticalNews: React.FC<{file: string; startFrom: number; label: string}> = ({file, startFrom, label}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const o = tween(frame, 0, 14, 0, 1, ease.arrive);
	return (
		<AbsoluteFill style={{background: '#08090B'}}>
			<AbsoluteFill style={{filter: 'blur(40px) brightness(0.35) saturate(0.7)', transform: 'scale(1.2)'}}>
				<Footage file={file} startFrom={startFrom} grade="modern" />
			</AbsoluteFill>
			<Camera seed="vnews" drift={1.2} keys={[{f: 0, scale: 1.0}, {f: durationInFrames, scale: 1.04}]}>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
					<div style={{position: 'relative', width: 520, height: 924, overflow: 'hidden', borderRadius: 10, opacity: o, boxShadow: '0 40px 100px rgba(0,0,0,0.8)'}}>
						<Footage file={file} startFrom={startFrom} grade="modern" />
					</div>
					<div style={{marginTop: 18, fontFamily: fontStacks.text, fontSize: 20, letterSpacing: '0.3em', color: 'rgba(230,220,200,0.6)', opacity: o}}>{label}</div>
				</AbsoluteFill>
			</Camera>
		</AbsoluteFill>
	);
};

/** One raised hand, a flat silhouette (no face, no person, no count). `down` lowers it to the table. */
const Hand: React.FC<{x: number; y: number; s: number; up: number; tone: string}> = ({x, y, s, up, tone}) => (
	<g transform={`translate(${x} ${y}) scale(${s})`}>
		<g transform={`rotate(${(1 - up) * 78} 0 0)`}>
			<rect x={-14} y={-200} width={28} height={200} rx={12} fill={tone} />
			<path d="M -24 -200 Q -26 -250 -16 -262 L -16 -300 Q -10 -308 -4 -300 L -4 -270 L 0 -312 Q 6 -320 12 -312 L 10 -268 L 16 -300 Q 22 -306 26 -298 L 24 -250 Q 32 -264 40 -258 Q 44 -250 34 -230 Q 26 -210 22 -200 Z" fill={tone} />
		</g>
	</g>
);

/** "The board voted to give Chandrasekaran another term. Noel Tata voted no." A board table in silhouette: hands rise
 *  along it from `upAt`, fading into the dark at both ends (the number of directors is not shown); at `noAt` one hand
 *  in the middle stays down, and a cold light picks it out. ILLUSTRATION. */
export const HandsVote: React.FC<{upAt: number; noAt: number}> = ({upAt, noAt}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();
	const n = 11;
	const mid = 5;
	const spot = tween(frame, noAt, noAt + 30, 0, 1, ease.arrive);
	return (
		<AbsoluteFill style={{background: '#08090B'}}>
			<Camera seed="vote" drift={1.2} keys={[{f: 0, scale: 1.0}, {f: durationInFrames, scale: 1.08, y: 10}]}>
				<svg viewBox="0 0 1920 1080" style={{position: 'absolute', inset: 0}}>
					<defs>
						<linearGradient id="vote-fade" x1="0" y1="0" x2="1" y2="0">
							<stop offset="0" stopColor="#08090B" stopOpacity={1} />
							<stop offset="0.22" stopColor="#08090B" stopOpacity={0} />
							<stop offset="0.78" stopColor="#08090B" stopOpacity={0} />
							<stop offset="1" stopColor="#08090B" stopOpacity={1} />
						</linearGradient>
						<radialGradient id="vote-spot" cx="0.5" cy="0.5" r="0.5">
							<stop offset="0" stopColor="#BFD6EA" stopOpacity={0.35} />
							<stop offset="1" stopColor="#BFD6EA" stopOpacity={0} />
						</radialGradient>
					</defs>
					{/* the table edge, lit from above */}
					<rect x={0} y={760} width={1920} height={320} fill="#1B1611" />
					<rect x={0} y={756} width={1920} height={6} fill="#6B5232" opacity={0.7} />
					<ellipse cx={960} cy={640} rx={260} ry={300} fill="url(#vote-spot)" opacity={spot} />
					{new Array(n).fill(0).map((_, k) => {
						const isNo = k === mid;
						const at = upAt + Math.abs(k - mid) * 4 + random(`vh${k}`) * 10;
						const up = isNo ? 0 : pop(frame, fps, at, 140, 16);
						const x = 160 + k * 160;
						const tone = isNo ? `rgb(${Math.round(42 + 178 * spot)},${Math.round(36 + 184 * spot)},${Math.round(32 + 198 * spot)})` : '#2A2420';
						return <Hand key={k} x={x} y={770} s={1.0} up={Math.min(1, up)} tone={tone} />;
					})}
					<rect width={1920} height={1080} fill="url(#vote-fade)" />
				</svg>
			</Camera>
		</AbsoluteFill>
	);
};

/** The roll call's payoff: the six prints from the film laid out together on the desk, each landing in turn. */
export const SixPrints: React.FC<{files: {file: string; grade?: 'archive' | 'modern'}[]; at: number}> = ({files, at}) => {
	const {durationInFrames} = useVideoConfig();
	const pos: [number, number, number][] = [
		[-560, -200, -3],
		[0, -230, 1.5],
		[560, -190, -1],
		[-560, 220, 2],
		[0, 200, -2],
		[560, 230, 1],
	];
	return (
		<AbsoluteFill>
			<Desk />
			<Camera seed="six" drift={1.5} keys={[{f: 0, scale: 0.98}, {f: durationInFrames, scale: 1.06}]}>
				{files.map((p, i) => (
					<Print key={p.file} file={`${M}/${p.file}`} at={at + i * 6} width={360} x={pos[i][0]} y={pos[i][1]} rotate={pos[i][2]} grade={p.grade ?? 'archive'} seed={`six${i}`} />
				))}
			</Camera>
		</AbsoluteFill>
	);
};

/** "The same bet, all over again": molten iron and a silicon wafer, crossfading. */
export const SameBet: React.FC<{iron: string; ironFrom: number; wafer: React.ReactNode; crossAt: number}> = ({iron, ironFrom, wafer, crossAt}) => {
	const frame = useCurrentFrame();
	const x = tween(frame, crossAt, crossAt + 70, 0, 1, ease.camera);
	return (
		<AbsoluteFill style={{background: '#08090B'}}>
			<AbsoluteFill style={{opacity: 1 - x}}>
				<Footage file={iron} startFrom={ironFrom} grade="furnace" />
			</AbsoluteFill>
			<AbsoluteFill style={{opacity: x}}>{wafer}</AbsoluteFill>
			<AbsoluteFill style={{background: `rgba(${Math.round(255 - 180 * x)},${Math.round(140 + 60 * x)},${Math.round(60 + 170 * x)},0.06)`, mixBlendMode: 'screen'}} />
		</AbsoluteFill>
	);
};

export const CYAN = '#4FD8E8';
