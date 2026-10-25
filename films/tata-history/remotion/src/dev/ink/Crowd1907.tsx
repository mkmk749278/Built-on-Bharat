import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camera, Dust, Grain, HonestyTag, LightLeak, Vignette} from '../../../../../../lib/remotion';
import {COSTUMES, InkCrowd, InkFigure, InkLine, InkStage, V2, Smoke, vary} from '../../../../../../lib/remotion/ink';
import {SfxCue} from '../../../../../../lib/remotion/sfx';
import {random} from 'remotion';

// Chapter 3: "Old and young, he said. Rich and poor. Men and women. They came, offering their mites."
// Bombay, 1907: ordinary Indians come to the share office with their savings. The heroes in front pair up as the
// line says them: an old man and a boy, a Parsi gentleman and a worker, a woman with her pouch. ILLUSTRATION.

const GROUND = 712;
const DOOR: V2 = [1380, 560];

/** The share office: a stone facade with an arcade, the doorway lit from inside. */
const ShareOffice: React.FC = () => {
	const frame = useCurrentFrame();
	const glow = 0.9 + 0.1 * Math.sin(frame / 40);
	const arch = (cx: number, w: number, top: number, bottom: number): V2[] => {
		const pts: V2[] = [[cx - w / 2, bottom]];
		for (let i = 0; i <= 12; i++) {
			const a = Math.PI - (i / 12) * Math.PI;
			pts.push([cx + Math.cos(a) * (w / 2), top + w / 2 - Math.sin(a) * (w / 2) * 1.1]);
		}
		pts.push([cx + w / 2, bottom]);
		return pts;
	};
	return (
		<g>
			<defs>
				<radialGradient id="so-door" cx="0.5" cy="0.6" r="0.7">
					<stop offset="0" stopColor="#FFD9A0" stopOpacity={0.95 * glow} />
					<stop offset="0.55" stopColor="#E48A3C" stopOpacity={0.85} />
					<stop offset="1" stopColor="#5E2A12" stopOpacity={0.95} />
				</radialGradient>
				<linearGradient id="so-stone" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#1C1916" />
					<stop offset="1" stopColor="#14120F" />
				</linearGradient>
				<radialGradient id="so-spill" cx="0.5" cy="0.5" r="0.5">
					<stop offset="0" stopColor="#FF9A45" stopOpacity={0.3 * glow} />
					<stop offset="1" stopColor="#FF9A45" stopOpacity={0} />
				</radialGradient>
			</defs>
			{/* facade block, cornice, a parapet with urns */}
			<InkLine seed="so-block" closed fill="url(#so-stone)" w={2.2} pts={[[960, GROUND], [960, 250], [1960, 250], [1960, GROUND]]} />
			<InkLine seed="so-corn" closed fill="#1A1714" w={2} pts={[[940, 250], [1960, 250], [1960, 226], [948, 226]]} />
			<InkLine seed="so-corn2" w={1.4} opacity={0.7} pts={[[960, 270], [1960, 270]]} />
			<InkLine seed="so-band" w={1.4} opacity={0.6} pts={[[960, 400], [1960, 400]]} />
			{[1000, 1120, 1240, 1520, 1640, 1760, 1880].map((x, i) => (
				<InkLine key={`urn${i}`} seed={`so-urn${i}`} closed fill="#1A1714" w={1.4} pts={[[x - 9, 226], [x - 12, 212], [x - 6, 200], [x, 194], [x + 6, 200], [x + 12, 212], [x + 9, 226]]} />
			))}
			{/* the arcade: dark side arches, the lit central door */}
			{[1060, 1200, 1560, 1700, 1840].map((cx, i) => (
				<g key={`ar${i}`}>
					<InkLine seed={`so-a${i}`} closed fill="#0E0D0F" w={2} pts={arch(cx, 96, 430, GROUND)} />
					<InkLine seed={`so-w${i}`} closed fill="#151316" w={1.4} opacity={0.9} pts={arch(cx, 50, 300, 384)} />
				</g>
			))}
			{/* columns between the bays */}
			{[1130, 1270, 1490, 1630, 1770].map((x, i) => (
				<g key={`col${i}`}>
					<InkLine seed={`so-c${i}`} w={1.5} opacity={0.8} pts={[[x - 12, 420], [x - 12, GROUND]]} />
					<InkLine seed={`so-d${i}`} w={1.5} opacity={0.8} pts={[[x + 12, 420], [x + 12, GROUND]]} />
					<InkLine seed={`so-e${i}`} w={1.5} opacity={0.8} pts={[[x - 18, 420], [x + 18, 420]]} />
				</g>
			))}
			<ellipse cx={DOOR[0]} cy={GROUND + 40} rx={420} ry={90} fill="url(#so-spill)" style={{mixBlendMode: 'screen'}} />
			<InkLine seed="so-door" closed fill="url(#so-door)" w={2.6} pts={arch(DOOR[0], 170, 400, GROUND)} />
			<InkLine seed="so-door2" closed w={1.4} opacity={0.7} pts={arch(DOOR[0], 196, 386, GROUND)} />
			<polygon points={`${DOOR[0] - 85},${GROUND} ${DOOR[0] + 85},${GROUND} ${DOOR[0] + 300},${GROUND + 120} ${DOOR[0] - 300},${GROUND + 120}`} fill="#FFB060" opacity={0.08 * glow} style={{filter: 'blur(24px)', mixBlendMode: 'screen'}} />
			{/* steps */}
			{[0, 1, 2].map((i) => (
				<InkLine key={`st${i}`} seed={`so-st${i}`} closed fill="#191614" w={1.6} pts={[[DOOR[0] - 140 - i * 22, GROUND + i * 10], [DOOR[0] + 140 + i * 22, GROUND + i * 10], [DOOR[0] + 144 + i * 22, GROUND + 10 + i * 10], [DOOR[0] - 144 - i * 22, GROUND + 10 + i * 10]]} />
			))}
		</g>
	);
};

/** Background city to the left: rooflines, a clock tower, a tram wire, trees. */
const Street: React.FC = () => (
	<g>
		<InkLine seed="st-sky1" closed fill="#111215" w={1.4} opacity={0.9} pts={[[-20, GROUND], [-20, 420], [120, 420], [130, 380], [260, 380], [270, 440], [420, 440], [430, 360], [470, 330], [510, 360], [520, 450], [700, 450], [700, 400], [860, 400], [880, 470], [970, 470], [970, GROUND]]} />
		<InkLine seed="st-tower" closed fill="#111215" w={1.4} pts={[[600, 450], [600, 250], [620, 222], [640, 250], [640, 450]]} />
		<circle cx={620} cy={290} r={12} fill="none" stroke="#D59B5F" strokeWidth={1.3} opacity={0.7} />
		{[60, 160, 300, 460, 760, 900].map((x, i) => (
			<rect key={`wn${i}`} x={x} y={470 + (i % 2) * 40} width={14} height={18} fill="#E9A15A" opacity={0.18 + (i % 3) * 0.06} />
		))}
		<InkLine seed="st-wire" w={1} opacity={0.4} pts={[[-20, 360], [400, 384], [960, 372]]} />
		<InkLine seed="st-lamp" w={2} pts={[[300, GROUND + 60], [300, 470]]} />
		<InkLine seed="st-lamp2" closed fill="#1A1410" w={1.6} pts={[[288, 470], [312, 470], [318, 446], [282, 446]]} />
		<circle cx={300} cy={458} r={22} fill="#FFD3A0" opacity={0.25} style={{filter: 'blur(10px)'}} />
	</g>
);

const HEROES = [
	// old and young: a grandfather with his cane, a boy at his side
	{seed: 'h-elder', costume: COSTUMES.elder, prop: 'cane' as const, hands: 'cane' as const, x: -60, y: 1010, scale: 1.0, speed: 95},
	{seed: 'h-boy', costume: COSTUMES.boy, prop: 'none' as const, hands: 'hang' as const, x: 40, y: 1032, scale: 1.04, speed: 95 / 0.62},
	// rich and poor: a Parsi gentleman and a mill hand
	{seed: 'h-parsi', costume: COSTUMES.parsi, prop: 'bundle' as const, hands: 'pouch' as const, x: 380, y: 920, scale: 0.82, speed: 140},
	{seed: 'h-worker', costume: COSTUMES.workerCloth, prop: 'pouch' as const, hands: 'pouch' as const, x: 250, y: 936, scale: 0.84, speed: 140},
	// men and women: a woman in a nine-yard saree, her savings tied in a cloth pouch
	{seed: 'h-woman', costume: COSTUMES.nauvari, prop: 'pouch' as const, hands: 'pouch' as const, x: 690, y: 975, scale: 0.94, speed: 130},
	{seed: 'h-clerk', costume: COSTUMES.clerk, prop: 'none' as const, hands: 'hang' as const, x: 560, y: 862, scale: 0.72, speed: 150},
];

export const crowd1907Cues = (): SfxCue[] => [
	{frame: 0, sfx: 'crowd_murmur_street_1900s', gainDb: -14},
	{frame: 0, sfx: 'footsteps_crowd_stone', gainDb: -18},
	{frame: 30, sfx: 'tram_bell_distant', gainDb: -26},
];

export const Crowd1907: React.FC<{camera?: boolean}> = ({camera = true}) => {
	const {durationInFrames} = useVideoConfig();
	const stage = (
		<InkStage grid={0.05}>
			<defs>
				<linearGradient id="c7-sky" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#0E1014" stopOpacity={0.3} />
					<stop offset="0.55" stopColor="#3B2416" stopOpacity={0.55} />
					<stop offset="0.66" stopColor="#1A1410" stopOpacity={0.5} />
				</linearGradient>
			</defs>
			<rect width={1920} height={1080} fill="url(#c7-sky)" />
			<Street />
			<Smoke from={[480, 330]} seed="c7-smoke" opacity={0.25} wind={0.3} />
			<ShareOffice />
			<rect x={0} y={GROUND} width={1920} height={1080 - GROUND} fill="#0F0E0F" opacity={0.85} />
			<InkLine seed="c7-curb" w={1.4} opacity={0.6} pts={[[-20, GROUND + 4], [960, GROUND + 2], [1960, GROUND + 5]]} />
			<InkLine seed="c7-curb2" w={1.1} opacity={0.35} pts={[[-20, 820], [700, 800], [1960, 790]]} />
			{/* the crowd at the door, waiting their turn, facing in */}
			<InkCrowd
				seed="c7-door"
				count={30}
				area={{x0: 1000, x1: 1700, yFar: GROUND + 14, yNear: GROUND + 70}}
				scaleFar={0.38}
				scaleNear={0.5}
				cast={['dhotiKurta', 'clerk', 'nauvari', 'nauvariElder', 'parsi', 'youngMan', 'workerCloth', 'elder']}
				action={(i, r) => ({type: 'wait', hands: (['clasp', 'pouch', 'hang', 'behind'] as const)[Math.floor(r('hh') * 4)], mood: 'hopeful'})}
				faceToward={DOOR[0]}
				look={DOOR}
				light={DOOR}
				haze={0.35}
			/>
			{/* the street fills: people walking in toward the office from the left */}
			<InkCrowd
				seed="c7-walk"
				count={11}
				area={{x0: -120, x1: 860, yFar: GROUND + 60, yNear: GROUND + 130}}
				scaleFar={0.5}
				scaleNear={0.64}
				cast={['dhotiKurta', 'nauvari', 'youngMan', 'workerCap', 'nauvariElder', 'clerk', 'girl']}
				action={(i, r) => ({type: 'walk', speed: 120 + r('sp') * 50, hands: r('hd') < 0.4 ? 'pouch' : 'hang', mood: 'hopeful'})}
				props={['none', 'pouch', 'bundle']}
				facing={1}
				light={DOOR}
			/>
			{/* and from the right, toward the door */}
			<InkCrowd
				seed="c7-right"
				members={[
					{seed: 'r-a', costume: COSTUMES.nauvariElder, x: 2080, y: 900, scale: 0.8, facing: -1, prop: 'pouch', action: {type: 'walk', speed: 105, hands: 'pouch', mood: 'hopeful'}, light: DOOR},
					{seed: 'r-b', costume: COSTUMES.workerKurta, x: 2010, y: 880, scale: 0.76, facing: -1, action: {type: 'walk', speed: 130, mood: 'hopeful'}, light: DOOR},
					{seed: 'r-c', costume: COSTUMES.youngMan, x: 2160, y: 1040, scale: 1.05, facing: -1, prop: 'bundle', action: {type: 'walk', speed: 150, hands: 'pouch', mood: 'hopeful'}, light: DOOR, detail: true},
					{seed: 'r-d', costume: COSTUMES.girl, x: 2260, y: 1050, scale: 1.05, facing: -1, action: {type: 'walk', speed: 150, mood: 'hopeful'}, light: DOOR, detail: true},
					{seed: 'r-e', costume: COSTUMES.dhotiKurta, x: 1880, y: 830, scale: 0.66, facing: -1, prop: 'pouch', action: {type: 'walk', speed: 120, hands: 'pouch', mood: 'hopeful'}, light: DOOR},
				]}
			/>
			{HEROES.map((h, i) => (
				<InkFigure
					key={h.seed}
					seed={h.seed}
					costume={vary(h.costume, (k) => random(`${h.seed}${k}`) * (i === 0 ? 0 : 1))}
					x={h.x}
					y={h.y}
					scale={h.scale}
					prop={h.prop}
					action={{type: 'walk', speed: h.speed, hands: h.hands, mood: i === 0 ? 'resolute' : 'hopeful'}}
					light={DOOR}
					look={i === 1 ? [h.x + 300, h.y - 600] : undefined}
					t0={i * 0.37}
					detail
				/>
			))}
		</InkStage>
	);
	return (
		<AbsoluteFill style={{background: '#0D0E11'}}>
			{camera ? (
				<Camera
					seed="c7-cam"
					drift={2}
					keys={[
						{f: 0, scale: 1.0, x: 40, y: 0},
						{f: durationInFrames, scale: 1.08, x: -50, y: -14},
					]}
				>
					{stage}
				</Camera>
			) : (
				stage
			)}
			<LightLeak color="#FF9A45" side="right" strength={0.18} seed="c7-leak" />
			<Dust count={50} seed="c7-dust" opacity={0.35} color="#FFD7A8" />
			<Vignette strength={0.6} />
			<Grain opacity={0.14} id="c7-g" />
			<HonestyTag text="ILLUSTRATION" />
		</AbsoluteFill>
	);
};
