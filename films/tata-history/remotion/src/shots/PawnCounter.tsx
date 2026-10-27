import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camera, Dust, Grain, Vignette, ease, tween} from '../../../../../lib/remotion';
import {InkFigure, InkLine, InkStage, V2} from '../../../../../lib/remotion/ink';

// Cold open: "Ask any Indian family what it means to pledge the house gold." An anonymous family of today at a small
// jeweller-pawnbroker's counter under one bulb: the same low counter as the 1924 bank (plan_v6 §1). The mother holds
// the cloth pouch; at `placeAt` the camera is close on the counter and the pouch lies there, the bangles catching the
// light. At `dimAt` ("When there is nothing else left") the bulb drops a stop. ILLUSTRATION. Never a named person.

const FLOOR = 900;
const COUNTER_TOP = 700;
const BULB: V2 = [1330, 330];
const POUCH: V2 = [1230, COUNTER_TOP - 6];

const Shop: React.FC<{light: number}> = ({light}) => (
	<g>
		{/* back wall shelves and a glass showcase */}
		<rect x={0} y={0} width={1920} height={FLOOR} fill="#0F0D0C" />
		{[300, 420, 540].map((y, i) => (
			<InkLine key={`sh${i}`} seed={`pc-sh${i}`} w={1.6} opacity={0.55} pts={[[1080, y], [1720, y]]} />
		))}
		{[1120, 1240, 1380, 1520, 1640].map((x, i) => (
			<rect key={`box${i}`} x={x} y={262 + (i % 2) * 120} width={46} height={34} rx={4} fill="#2A2018" opacity={0.7} />
		))}
		{/* the counter: glass top on a wooden front */}
		<InkLine seed="pc-top" closed fill="#1B1511" w={2.6} pts={[[1040, COUNTER_TOP], [1780, COUNTER_TOP], [1800, COUNTER_TOP + 18], [1020, COUNTER_TOP + 18]]} />
		<InkLine seed="pc-front" closed fill="#140F0C" w={2.2} pts={[[1030, COUNTER_TOP + 18], [1790, COUNTER_TOP + 18], [1790, FLOOR], [1030, FLOOR]]} />
		{[1180, 1340, 1500, 1660].map((x, i) => (
			<InkLine key={`pl${i}`} seed={`pc-pl${i}`} w={1.2} opacity={0.4} pts={[[x, COUNTER_TOP + 30], [x, FLOOR - 10]]} />
		))}
		{/* a brass balance on the counter */}
		<g transform={`translate(1500 ${COUNTER_TOP})`} opacity={0.95}>
			<InkLine seed="pc-bal1" w={2} pts={[[0, 0], [0, -120]]} />
			<InkLine seed="pc-bal2" w={2} pts={[[-70, -112], [70, -118]]} />
			<InkLine seed="pc-bal3" w={1.4} pts={[[-70, -112], [-84, -60], [-56, -60], [-70, -112]]} />
			<InkLine seed="pc-bal4" w={1.4} pts={[[70, -118], [56, -66], [84, -66], [70, -118]]} />
			<rect x={-26} y={-6} width={52} height={8} fill="#C57D3C" opacity={0.6} />
		</g>
		{/* the bulb, its cord, and its pool */}
		<InkLine seed="pc-cord" w={1.4} pts={[[BULB[0], 0], [BULB[0], BULB[1] - 18]]} />
		<circle cx={BULB[0]} cy={BULB[1]} r={16} fill={`rgba(255,214,150,${0.9 * light})`} />
		<radialGradient id="pc-pool" cx="0.5" cy="0.5" r="0.5">
			<stop offset="0" stopColor="#FFB86B" stopOpacity={0.36 * light} />
			<stop offset="1" stopColor="#FFB86B" stopOpacity={0} />
		</radialGradient>
		<ellipse cx={BULB[0] - 80} cy={COUNTER_TOP + 40} rx={720} ry={430} fill="url(#pc-pool)" />
		{/* the floor */}
		<rect x={0} y={FLOOR} width={1920} height={180} fill="#0C0B0B" />
		<InkLine seed="pc-floor" w={1.6} opacity={0.7} pts={[[0, FLOOR], [1920, FLOOR + 2]]} />
	</g>
);

const Glints: React.FC<{at: number; c: V2}> = ({at, c}) => {
	const frame = useCurrentFrame();
	const pts: [number, number, number][] = [
		[-14, -8, 0],
		[6, -14, 9],
		[18, -2, 17],
		[-4, 2, 26],
	];
	return (
		<g>
			{pts.map(([dx, dy, d], i) => {
				const t = frame - at - d;
				const s = t < 0 ? 0 : Math.max(0, Math.sin((t / 34) * Math.PI)) * (0.6 + 0.4 * Math.sin(t / 9 + i));
				return (
					<path
						key={i}
						transform={`translate(${c[0] + dx} ${c[1] + dy}) scale(${s})`}
						d="M0 -10 L1.6 -1.6 L10 0 L1.6 1.6 L0 10 L-1.6 1.6 L-10 0 L-1.6 -1.6 Z"
						fill="#FFF3DC"
						opacity={0.95}
					/>
				);
			})}
		</g>
	);
};

export const PawnCounter: React.FC<{placeAt: number; dimAt: number}> = ({placeAt, dimAt}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const placed = frame >= placeAt;
	const light = 1 - 0.38 * tween(frame, dimAt, dimAt + 40, 0, 1, ease.camera);
	const close = placed;
	const lightSrc: V2 = BULB;
	return (
		<AbsoluteFill style={{background: '#0C0B0B'}}>
			<Camera
				seed="pawn-cam"
				drift={1.5}
				keys={
					close
						? [
								{f: placeAt, scale: 2.05, x: -520, y: -330},
								{f: durationInFrames, scale: 2.2, x: -560, y: -350},
							]
						: [
								{f: 0, scale: 1.45, x: -255, y: -150},
								{f: placeAt, scale: 1.56, x: -300, y: -175},
							]
				}
			>
				<InkStage grid={0.04}>
					<Shop light={light} />
					{/* father and daughter wait behind; the mother stands at the counter */}
					<InkFigure costume="father2008" x={640} y={FLOOR} scale={1.05} facing={1} seed="pc-father" light={lightSrc} rim={0.6 * light}
						action={{type: 'wait', hands: 'folded', mood: 'worried', glance: false}} look={POUCH} />
					<InkFigure costume="girl2008" x={770} y={FLOOR} scale={0.62} facing={1} seed="pc-girl" light={lightSrc} rim={0.6 * light}
						action={{type: 'wait', hands: 'clasp', mood: 'worried'}} look={[1000, 560]} t0={1.3} />
					<InkFigure costume="mother2008" x={960} y={FLOOR} scale={1.0} facing={1} seed="pc-mother" light={lightSrc} rim={0.8 * light} detail
						action={placed ? {type: 'stand', hands: 'offer', mood: 'resolute'} : {type: 'wait', hands: 'pouch', mood: 'worried', glance: false}}
						prop={placed ? 'none' : 'pouch'} look={POUCH} />
					{placed ? (
						<g>
							<ellipse cx={POUCH[0]} cy={POUCH[1] + 4} rx={30} ry={6} fill="#000" opacity={0.45} />
							<InkLine seed="pc-pouch" closed fill="#B8823E" w={2} pts={[[POUCH[0] - 22, POUCH[1]], [POUCH[0] - 14, POUCH[1] - 24], [POUCH[0], POUCH[1] - 30], [POUCH[0] + 14, POUCH[1] - 24], [POUCH[0] + 22, POUCH[1]]]} />
							<InkLine seed="pc-tie" w={1.4} pts={[[POUCH[0] - 8, POUCH[1] - 30], [POUCH[0], POUCH[1] - 38], [POUCH[0] + 8, POUCH[1] - 30]]} />
							{/* the cloth has fallen open a little: two bangles show */}
							<ellipse cx={POUCH[0] + 34} cy={POUCH[1] - 4} rx={15} ry={5} fill="none" stroke="#E5A85A" strokeWidth={3} />
							<ellipse cx={POUCH[0] + 46} cy={POUCH[1] - 2} rx={15} ry={5} fill="none" stroke="#C99247" strokeWidth={3} />
							<Glints at={placeAt + 6} c={[POUCH[0] + 40, POUCH[1] - 6]} />
						</g>
					) : null}
				</InkStage>
			</Camera>
			<Dust count={30} seed="pc-dust" opacity={0.25 * light} color="#FFD7A0" />
			<Vignette strength={0.66} />
			<Grain opacity={0.13} id="pc-g" />
		</AbsoluteFill>
	);
};
