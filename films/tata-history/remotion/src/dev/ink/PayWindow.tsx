import React from 'react';
import {AbsoluteFill, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camera, Dust, Embers, Grain, HonestyTag, Vignette} from '../../../../../../lib/remotion';
import {
	COSTUMES,
	CostumeName,
	DuskSky,
	Hands,
	InkFigure,
	InkFigureProps,
	InkLine,
	InkStage,
	Prop,
	Steelworks,
	TreeLine,
	V2,
	inkPalette,
	vary,
} from '../../../../../../lib/remotion/ink';
import {SfxCue} from '../../../../../../lib/remotion/sfx';

// Cold open: "thousands of workers are waiting for their wages". A queue of steelworkers at a lit pay window at dusk,
// the works on the horizon. The window stays shut; the line breathes, shuffles one step, waits. ILLUSTRATION.

const HORIZON = 600;
const WINDOW: V2 = [1668, 652];
const LAMP: V2 = [1690, 640];

// the queue runs from the window back into the dusk along a gentle curve; spacing shrinks with depth
const curve = (s: number): V2 => {
	const p0: V2 = [1520, 985];
	const p1: V2 = [880, 760];
	const p2: V2 = [150, 632];
	const u = 1 - s;
	return [u * u * p0[0] + 2 * u * s * p1[0] + s * s * p2[0], u * u * p0[1] + 2 * u * s * p1[1] + s * s * p2[1]];
};
const scaleAt = (y: number): number => 0.12 + ((y - 632) / (985 - 632)) * 0.9;

const CAST: CostumeName[] = ['workerCap', 'workerCloth', 'workerKurta', 'workerCap', 'workerCloth', 'workerWoman', 'workerCap', 'workerKurta'];
const HANDS: {h: Hands; p?: Prop}[] = [{h: 'clasp'}, {h: 'behind'}, {h: 'folded'}, {h: 'hang'}, {h: 'cap', p: 'cap'}, {h: 'clasp'}, {h: 'behind'}, {h: 'hang', p: 'tiffin'}];

export const QUEUE_COUNT = 44;
/** The ripple of one shuffled step down the line starts here (s) and travels at this pace (s per person). */
export const SHUFFLE_AT = 1.6;
export const SHUFFLE_STEP = 0.16;

type Slot = InkFigureProps & {key: string};

const queue = (): Slot[] => {
	// march along the curve: each next worker one body-gap behind, gap scaled by depth
	const slots: Slot[] = [];
	let s = 0;
	for (let i = 0; i < QUEUE_COUNT; i++) {
		const p = curve(s);
		const sc = scaleAt(p[1]);
		const r = (k: string) => random(`pq-${i}-${k}`);
		const base = i === 0 ? 'workerCap' : CAST[Math.floor(r('c') * CAST.length)];
		const hand = i === 0 ? {h: 'clasp' as Hands} : HANDS[Math.floor(r('h') * HANDS.length)];
		slots.push({
			key: `q${i}`,
			seed: `pq${i}`,
			costume: vary(COSTUMES[base], r),
			x: p[0] + (r('jx') - 0.5) * 14 * sc,
			y: p[1],
			scale: sc * (0.95 + r('ht') * 0.1),
			look: [WINDOW[0], WINDOW[1] - 20],
			light: LAMP,
			rim: 0.95 - (1 - sc) * 0.4,
			t0: r('t') * 12,
			prop: hand.p,
			action: {
				type: 'wait',
				hands: hand.h,
				mood: i % 5 === 2 ? 'tired' : 'dignified',
				glance: i !== 0,
				// one step forward, rippling back from the window
				shuffle: i === 0 || i > 26 ? [] : [{at: SHUFFLE_AT + i * SHUFFLE_STEP, steps: 2, dur: 0.9, dist: 26}],
			},
		});
		// advance along the curve by a gap proportional to the depth scale (an arc-length march)
		const gap = 96 * sc;
		let walked = 0;
		while (walked < gap && s < 1) {
			const a = curve(s);
			s += 0.002;
			const b = curve(s);
			walked += Math.hypot(b[0] - a[0], b[1] - a[1]);
		}
	}
	return slots;
};

const SLOTS = queue();

/** SFX for the scene (local frames): the shuffle ripple, a distant furnace, the shutter's creak. */
export const payWindowCues = (fps: number): SfxCue[] => [
	{frame: 0, sfx: 'furnace_distant_bed', gainDb: -18},
	{frame: 0, sfx: 'crowd_murmur_low', gainDb: -22},
	...new Array(6).fill(0).map((_, i) => ({frame: Math.round((SHUFFLE_AT + (1 + i * 3) * SHUFFLE_STEP) * fps), sfx: 'footstep_shuffle_dirt', gainDb: -16 - i * 2})),
];

const PayWindowBuilding: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const t = frame / fps;
	const flicker = 0.88 + 0.12 * Math.sin(t * 7.3) * Math.sin(t * 3.1 + 1);
	return (
		<g>
			<defs>
				<radialGradient id="pw-pool" cx="0.5" cy="0.5" r="0.5">
					<stop offset="0" stopColor="#FF9A45" stopOpacity={0.34 * flicker} />
					<stop offset="0.6" stopColor="#C2581F" stopOpacity={0.1 * flicker} />
					<stop offset="1" stopColor="#C2581F" stopOpacity={0} />
				</radialGradient>
				<radialGradient id="pw-inside" cx="0.55" cy="0.35" r="0.75">
					<stop offset="0" stopColor="#FFD9A0" stopOpacity={0.95 * flicker} />
					<stop offset="0.5" stopColor="#E98A3A" stopOpacity={0.8 * flicker} />
					<stop offset="1" stopColor="#6B2E12" stopOpacity={0.9} />
				</radialGradient>
				<linearGradient id="pw-wall" x1="0" y1="0" x2="1" y2="0">
					<stop offset="0" stopColor="#2A1D15" />
					<stop offset="0.35" stopColor="#1A1512" />
					<stop offset="1" stopColor="#111013" />
				</linearGradient>
			</defs>
			{/* light pool on the ground in front of the window */}
			<ellipse cx={1480} cy={960} rx={640} ry={150} fill="url(#pw-pool)" style={{mixBlendMode: 'screen'}} />
			<polygon points="1626,716 1776,716 1500,1000 980,1000" fill="#FF9A45" opacity={0.07 * flicker} style={{filter: 'blur(30px)', mixBlendMode: 'screen'}} />
			{/* the pay office: a brick wall, a tin awning, the barred window */}
			<InkLine seed="pw-wall" closed fill="url(#pw-wall)" w={2.2} pts={[[1600, 1000], [1590, 470], [1940, 420], [1940, 1000]]} />
			<InkLine seed="pw-roof" closed fill="#141417" w={2.2} pts={[[1560, 478], [1620, 430], [1960, 380], [1960, 426], [1592, 486]]} />
			{/* brick courses */}
			{new Array(13).fill(0).map((_, i) => {
				const y = 520 + i * 36;
				return <InkLine key={`b${i}`} seed={`pw-b${i}`} w={0.9} opacity={0.35} pts={[[1596, y], [1940, y - 22 * (1 - i / 20)]]} />;
			})}
			{new Array(26).fill(0).map((_, i) => {
				const row = i % 13;
				const y = 520 + row * 36;
				const x = 1630 + ((i * 53 + row * 27) % 300);
				return <InkLine key={`bv${i}`} seed={`pw-bv${i}`} w={0.8} opacity={0.3} pts={[[x, y - (x - 1596) * 0.064], [x, y + 36 - (x - 1596) * 0.064]]} />;
			})}
			{/* the window: warm inside, iron bars, a wooden shutter pulled half down, a sill */}
			<rect x={1626} y={580} width={150} height={136} fill="url(#pw-inside)" />
			<rect x={1626} y={580} width={150} height={136} fill="#FFB060" opacity={0.25 * flicker} style={{filter: 'blur(26px)', mixBlendMode: 'screen'}} />
			<InkLine seed="pw-shutter" closed fill="#2B1D13" w={2} pts={[[1626, 580], [1776, 580], [1776, 628], [1626, 632]]} />
			{[0, 1, 2].map((i) => (
				<InkLine key={`sl${i}`} seed={`pw-sl${i}`} w={1} opacity={0.6} pts={[[1630, 594 + i * 12], [1772, 593 + i * 12]]} />
			))}
			{[0, 1, 2, 3, 4, 5].map((i) => (
				<InkLine key={`bar${i}`} seed={`pw-bar${i}`} w={2.6} color="#1A120D" pts={[[1646 + i * 22, 630], [1646 + i * 22, 716]]} />
			))}
			<InkLine seed="pw-frame" closed w={2.4} pts={[[1624, 578], [1778, 578], [1778, 718], [1624, 718]]} />
			<InkLine seed="pw-sill" closed fill="#1E1611" w={2.2} pts={[[1612, 716], [1792, 716], [1798, 732], [1606, 732]]} />
			{/* a hanging lantern just inside */}
			<circle cx={LAMP[0]} cy={LAMP[1]} r={30} fill="#FFE2B0" opacity={0.55 * flicker} style={{filter: 'blur(14px)'}} />
		</g>
	);
};

/** Foreground: steel rails stacked in the yard (the works' product), soft with depth of field. */
const RailStack: React.FC = () => {
	// one rail end in profile: head, web, foot (a flat-bottomed rail)
	const rail = (x: number, y: number, s: number): V2[] => [
		[x - 10 * s, y],
		[x + 10 * s, y],
		[x + 10 * s, y + 9 * s],
		[x + 3 * s, y + 12 * s],
		[x + 3 * s, y + 30 * s],
		[x + 16 * s, y + 35 * s],
		[x + 16 * s, y + 40 * s],
		[x - 16 * s, y + 40 * s],
		[x - 16 * s, y + 35 * s],
		[x - 3 * s, y + 30 * s],
		[x - 3 * s, y + 12 * s],
		[x - 10 * s, y + 9 * s],
	];
	const VP: V2 = [760, 600];
	const ends: V2[] = [];
	for (let row = 0; row < 3; row++) {
		for (let i = 0; i < 4 - row; i++) {
			ends.push([-20 + i * 96 + row * 48, 1080 - 70 - row * 74]);
		}
	}
	const toward = (p: V2, k: number): V2 => [p[0] + (VP[0] - p[0]) * k, p[1] + (VP[1] - p[1]) * k];
	return (
		<g style={{filter: 'blur(3px)'}}>
			{/* each rail runs back toward the vanishing point: its head (top face) catches the window light */}
			{ends.map((e, i) => {
				const r = rail(e[0], e[1], 2.4);
				const a = r[0];
				const b = r[1];
				return (
					<g key={`rl${i}`}>
						<InkLine seed={`pw-rt${i}`} closed fill="#1D1611" w={2.2} pts={[a, b, toward(b, 0.42), toward(a, 0.42)]} />
						<InkLine seed={`pw-rb${i}`} w={1.6} opacity={0.6} pts={[r[6], toward(r[6], 0.42)]} />
					</g>
				);
			})}
			{ends.map((e, i) => (
				<InkLine key={`re${i}`} seed={`pw-re${i}`} closed fill="#120E0C" w={2.6} pts={rail(e[0], e[1], 2.4)} />
			))}
		</g>
	);
};

export const PayWindowQueue: React.FC<{camera?: boolean}> = ({camera = true}) => {
	const {durationInFrames} = useVideoConfig();
	const stage = (
		<InkStage grid={0.05}>
			<DuskSky horizon={HORIZON} glowX={0.32} id="pw-sky" />
			<TreeLine x0={-40} x1={760} ground={HORIZON + 4} seed="pw-trees" height={70} />
			<Steelworks x={560} ground={HORIZON + 6} scale={0.82} seed="pw-works" />
			<TreeLine x0={1180} x1={1640} ground={HORIZON + 6} seed="pw-trees2" height={56} />
			{/* the ground: a packed-earth yard with cart ruts */}
			<rect x={0} y={HORIZON + 4} width={1920} height={1080 - HORIZON} fill="#100F10" opacity={0.85} />
			<InkLine seed="pw-hz" w={1.6} opacity={0.8} pts={[[0, HORIZON + 6], [700, HORIZON + 4], [1300, HORIZON + 7], [1920, HORIZON + 5]]} />
			<InkLine seed="pw-rut1" w={1.1} opacity={0.35} pts={[[0, 760], [500, 720], [1100, 690], [1600, 676]]} />
			<InkLine seed="pw-rut2" w={1.1} opacity={0.3} pts={[[0, 900], [600, 840], [1200, 790], [1560, 770]]} />
			<PayWindowBuilding />
			{[...SLOTS].reverse().map(({key, ...p}) => (
				<InkFigure key={key} {...p} />
			))}
			<RailStack />
		</InkStage>
	);
	return (
		<AbsoluteFill style={{background: '#0D0E11'}}>
			{camera ? (
				<Camera
					seed="pw-cam"
					drift={2}
					keys={[
						{f: 0, scale: 1.0, x: 30, y: 6},
						{f: durationInFrames, scale: 1.075, x: -40, y: -10},
					]}
				>
					{stage}
				</Camera>
			) : (
				stage
			)}
			<Embers count={34} seed="pw-emb" intensity={0.55} originY={0.62} />
			<Dust count={40} seed="pw-dust" opacity={0.3} color="#FFCF9A" />
			<Vignette strength={0.62} />
			<Grain opacity={0.14} id="pw-g" />
			<HonestyTag text="ILLUSTRATION" />
		</AbsoluteFill>
	);
};

export {inkPalette};
