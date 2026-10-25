import {noise2D} from '@remotion/noise';
import React from 'react';
import {AbsoluteFill, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camera, Grain, HonestyTag, LightLeak, Vignette} from '../../../../../../lib/remotion';
import {COSTUMES, InkFigure, InkLine, InkStage, SCOOTER, Scooter, V2, add, scooterBob} from '../../../../../../lib/remotion/ink';
import {SfxCue} from '../../../../../../lib/remotion/sfx';

// Chapter 7, 2008: "Indian families riding on scooters. Four or five people, on one scooter."
// A father, a mother side-saddle with the little one in her lap, a boy standing in front holding the handlebar, on
// an evening road. The city streams past; the saree's end and the girl's plait fly in the wind. ILLUSTRATION.

const SPEED = 620; // road speed, stage px per second at the scooter's depth
const ROAD = 760;
const SX = 800;
const SY = 990;
const SS = 1.62;

const wrap = (v: number, w: number): number => ((v % w) + w) % w;

/** The city streams past in layers: far towers, shopfronts, streetlights, the road. */
const City: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = frame / fps;
	const far = t * SPEED * 0.12;
	const mid = t * SPEED * 0.42;
	const near = t * SPEED;
	const towers = new Array(16).fill(0).map((_, i) => {
		const w = 90 + random(`tw${i}`) * 110;
		const hgt = 140 + random(`th${i}`) * 260;
		const x = wrap(i * 150 - far, 16 * 150) - 150;
		return {x, w, hgt, i};
	});
	const shops = new Array(10).fill(0).map((_, i) => {
		const w = 220 + random(`sw${i}`) * 120;
		const x = wrap(i * 300 - mid, 10 * 300) - 300;
		return {x, w, i, hgt: 150 + random(`sh${i}`) * 70};
	});
	return (
		<g>
			{/* far towers with scattered lit windows */}
			{towers.map((b) => (
				<g key={`t${b.i}`}>
					<InkLine seed={`tw${b.i}`} closed fill="#101115" w={1.2} opacity={0.75} pts={[[b.x, ROAD - 120], [b.x, ROAD - 120 - b.hgt], [b.x + b.w, ROAD - 120 - b.hgt], [b.x + b.w, ROAD - 120]]} />
					{new Array(18).fill(0).map((_, k) => {
						const on = random(`win${b.i}-${k}`) < 0.45;
						if (!on) {
							return null;
						}
						const cx = b.x + 10 + (k % 4) * ((b.w - 20) / 4);
						const cy = ROAD - 120 - b.hgt + 16 + Math.floor(k / 4) * (b.hgt / 5);
						const cool = random(`wc${b.i}-${k}`) < 0.3;
						return <rect key={k} x={cx} y={cy} width={8} height={10} fill={cool ? '#BFD8E8' : '#F2B66A'} opacity={0.35 + random(`wo${b.i}-${k}`) * 0.3} />;
					})}
				</g>
			))}
			{/* shopfronts: shutters, a lit counter, a blank glowing board (no lettering) */}
			{shops.map((s) => (
				<g key={`s${s.i}`}>
					<InkLine seed={`sh${s.i}`} closed fill="#141317" w={1.6} pts={[[s.x, ROAD - 6], [s.x, ROAD - s.hgt], [s.x + s.w, ROAD - s.hgt], [s.x + s.w, ROAD - 6]]} />
					<rect x={s.x + 16} y={ROAD - s.hgt + 14} width={s.w - 32} height={30} fill={random(`sb${s.i}`) < 0.5 ? '#E8A04E' : '#9FC4D6'} opacity={0.13} />
					<rect x={s.x + 26} y={ROAD - 90} width={s.w - 52} height={80} fill="#F3B56E" opacity={random(`so${s.i}`) < 0.6 ? 0.17 : 0.04} />
					<rect x={s.x + 26} y={ROAD - 90} width={s.w - 52} height={80} fill="#FFB866" opacity={0.1} style={{filter: 'blur(18px)'}} />
					{new Array(5).fill(0).map((_, k) => (
						<InkLine key={k} seed={`shl${s.i}-${k}`} w={0.9} opacity={0.35} pts={[[s.x + 26, ROAD - 90 + k * 8], [s.x + s.w - 26, ROAD - 90 + k * 8]]} />
					))}
				</g>
			))}
			<rect x={0} y={ROAD} width={1920} height={1080 - ROAD} fill="#0E0E10" />
			<InkLine seed="kerb" w={1.6} opacity={0.7} pts={[[-20, ROAD + 2], [1940, ROAD + 2]]} />
			{/* other traffic: tail lights in the far lane, out of focus */}
			{new Array(7).fill(0).map((_, i) => {
				const x = wrap(i * 330 - t * SPEED * 0.25 + random(`car${i}`) * 120, 7 * 330) - 200;
				const y = ROAD + 34 + random(`cy${i}`) * 14;
				return (
					<g key={`c${i}`} style={{filter: 'blur(5px)'}}>
						<circle cx={x} cy={y} r={7} fill="#FF4A2E" opacity={0.75} />
						<circle cx={x + 40} cy={y} r={7} fill="#FF4A2E" opacity={0.75} />
					</g>
				);
			})}
			{/* lane dashes rushing past */}
			{new Array(9).fill(0).map((_, i) => {
				const x = wrap(i * 260 - near * 1.15, 9 * 260) - 260;
				return <InkLine key={`d${i}`} seed={`dash${i}`} closed fill="#3A332B" w={1.2} opacity={0.8} pts={[[x, 1010], [x + 120, 1010], [x + 126, 1022], [x + 6, 1022]]} />;
			})}
		</g>
	);
};

/** Streetlights between the camera and the shops: poles that pass, sodium cones that sweep over the family. */
const StreetLights: React.FC<{front: boolean}> = ({front}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = frame / fps;
	const gap = 900;
	return (
		<g>
			{[0, 1, 2, 3].map((i) => {
				const x = wrap(i * gap - t * SPEED * 0.8, 4 * gap) - 300;
				if (front) {
					return <ellipse key={i} cx={x + 60} cy={ROAD + 200} rx={360} ry={110} fill="#FF9F4A" opacity={0.11} style={{filter: 'blur(30px)', mixBlendMode: 'screen'}} />;
				}
				return (
					<g key={i}>
						<InkLine seed={`pole${i}`} w={3} pts={[[x, ROAD + 10], [x, 300], [x + 14, 276], [x + 90, 268]]} />
						<InkLine seed={`head${i}`} closed fill="#1A1714" w={1.8} pts={[[x + 70, 262], [x + 116, 262], [x + 110, 276], [x + 76, 276]]} />
						<circle cx={x + 93} cy={276} r={9} fill="#FFD9A0" />
						<circle cx={x + 93} cy={282} r={54} fill="#FFA24A" opacity={0.3} style={{filter: 'blur(16px)'}} />
						<polygon points={`${x + 80},280 ${x + 106},280 ${x + 280},${ROAD + 40} ${x - 100},${ROAD + 40}`} fill="#FFB060" opacity={0.06} style={{filter: 'blur(12px)'}} />
					</g>
				);
			})}
		</g>
	);
};

export const scooterCues = (): SfxCue[] => [
	{frame: 0, sfx: 'scooter_two_stroke_pass', gainDb: -12},
	{frame: 0, sfx: 'city_traffic_evening_india', gainDb: -16},
	{frame: 50, sfx: 'scooter_horn_short', gainDb: -24},
];

export const ScooterFamily: React.FC<{camera?: boolean}> = ({camera = true}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();
	const t = frame / fps;
	const bob = scooterBob(t);
	const wind: V2 = [-SPEED * 1.1, -20 + noise2D('gust', t * 0.8, 0) * 40];
	const lamp: V2 = [SX + 600, 260];
	const lap: V2 = add(SCOOTER.seatRear, [30, -14]);
	const fig = {x: SX, y: SY, scale: SS, light: lamp, wind, detail: true} as const;
	const stage = (
		<InkStage grid={0.04}>
			<defs>
				<linearGradient id="sf-sky" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#0B0D14" stopOpacity={0.5} />
					<stop offset="0.6" stopColor="#2E1E16" stopOpacity={0.6} />
					<stop offset="0.72" stopColor="#140F0D" stopOpacity={0.4} />
				</linearGradient>
			</defs>
			<rect width={1920} height={1080} fill="url(#sf-sky)" />
			<City />
			<StreetLights front={false} />
			<Scooter x={SX} y={SY} scale={SS} speed={SPEED} seed="sf-scooter" />
			{/* the father drives; the mother sits side-saddle behind with the little girl in her lap; the boy stands in front */}
			<InkFigure {...fig} seed="sf-father" costume={COSTUMES.father2008} action={{type: 'ride', seat: add(SCOOTER.seatFront, [0, -2]), bar: SCOOTER.grip, floor: SCOOTER.floor, bob, mood: 'resolute'}} />
			<InkFigure
				{...fig}
				seed="sf-mother"
				costume={COSTUMES.mother2008}
				action={{type: 'pillion', seat: add(SCOOTER.seatRear, [0, -2]), floor: SCOOTER.pillionFoot, hold: add(lap, [16, -40]), bob, mood: 'warm'}}
			/>
			<InkFigure {...fig} seed="sf-girl" costume={COSTUMES.girl2008} build={{height: 0.44, head: 1.4}} action={{type: 'lap', seat: lap, bob, mood: 'warm'}} look={[SX + 900, SY - 500]} />
			<InkFigure {...fig} seed="sf-boy" costume={COSTUMES.boy2008} action={{type: 'perch', floor: SCOOTER.floorFront, bar: add(SCOOTER.grip, [6, 6]), bob, mood: 'hopeful'}} look={[SX + 1200, SY - 420]} />
			<StreetLights front />
		</InkStage>
	);
	return (
		<AbsoluteFill style={{background: '#0D0E11'}}>
			{camera ? (
				<Camera
					seed="sf-cam"
					drift={4}
					keys={[
						{f: 0, scale: 1.02, x: 10, y: 4},
						{f: durationInFrames, scale: 1.08, x: -20, y: -6},
					]}
				>
					{stage}
				</Camera>
			) : (
				stage
			)}
			<LightLeak color="#FF9A45" side="right" strength={0.16} seed="sf-leak" />
			<Vignette strength={0.6} />
			<Grain opacity={0.14} id="sf-g" />
			<HonestyTag text="ILLUSTRATION" />
		</AbsoluteFill>
	);
};
