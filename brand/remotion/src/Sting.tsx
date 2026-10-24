import React from 'react';
import {
	AbsoluteFill,
	Easing,
	Img,
	interpolate,
	random,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {noise2D} from '@remotion/noise';
import {colors, fonts} from './brand';
import './fonts';

// "Forged": the outro sting (PLAYBOOK §6.5). The medallion is pulled out of darkness by forge light, lands with a
// strike and a burst of sparks, a glint runs across the metal, then the name and tagline. Everything is a pure
// function of the frame (60 fps, authored at 1920x1080, rendered 4K with --scale=2).

export const STING_FRAMES = 360;

// SFX cues for the mix (PLAYBOOK §10.2): frame -> sound.
export const stingCues = [
	{frame: 0, sfx: 'low_riser', gainDb: -12},
	{frame: 72, sfx: 'metal_strike', gainDb: -6},
	{frame: 74, sfx: 'spark_burst', gainDb: -10},
	{frame: 118, sfx: 'glint_shimmer', gainDb: -12},
	{frame: 150, sfx: 'soft_whoosh', gainDb: -12},
] as const;

const STRIKE = 72;
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const MED = 600; // medallion diameter on the 1080p canvas
const CX = 960;
const CY = 418;

const Grid: React.FC<{frame: number}> = ({frame}) => {
	const draw = interpolate(frame, [0, 70], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
	const lines: React.ReactNode[] = [];
	const step = 120;
	for (let x = 0; x <= 1920; x += step) {
		const len = 1080;
		lines.push(
			<line key={`v${x}`} x1={x} y1={0} x2={x} y2={1080} strokeDasharray={len} strokeDashoffset={len * (1 - draw)} />,
		);
	}
	for (let y = 0; y <= 1080; y += step) {
		const len = 1920;
		lines.push(
			<line key={`h${y}`} x1={0} y1={y} x2={1920} y2={y} strokeDasharray={len} strokeDashoffset={len * (1 - draw)} />,
		);
	}
	// A few drafting marks around the medallion, like the logo's blueprint.
	const r = MED / 2 + 70;
	const ring = 2 * Math.PI * r;
	const ringDraw = interpolate(frame, [20, 110], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
	return (
		<svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
			<g stroke={colors.muted} strokeWidth={1} opacity={0.09}>
				{lines}
			</g>
			<g stroke={colors.muted} fill="none" opacity={0.22}>
				<circle cx={CX} cy={CY} r={r} strokeWidth={1.2} strokeDasharray={ring} strokeDashoffset={ring * (1 - ringDraw)} />
				<line x1={CX - r - 60} y1={CY} x2={CX + r + 60} y2={CY} strokeWidth={1} strokeDasharray="6 10" opacity={ringDraw} />
				<line x1={CX} y1={CY - r - 60} x2={CX} y2={CY + r + 60} strokeWidth={1} strokeDasharray="6 10" opacity={ringDraw} />
			</g>
		</svg>
	);
};

type Spark = {angle: number; speed: number; life: number; size: number; delay: number; hue: number};

// Most sparks leave the lower rim (where the strike lands), a few fly off the sides and top.
const SPARKS: Spark[] = new Array(90).fill(0).map((_, i) => {
	const low = random(`b${i}`) < 0.68;
	const a = low ? Math.PI * (0.08 + 0.84 * random(`a${i}`)) : Math.PI * (1 + random(`a${i}`));
	return {
		angle: a,
		speed: 3 + Math.pow(random(`s${i}`), 1.6) * 22,
		life: 18 + random(`l${i}`) * 58,
		size: 1.2 + Math.pow(random(`z${i}`), 2) * 3.4,
		delay: Math.pow(random(`d${i}`), 2) * 16,
		hue: random(`h${i}`),
	};
});

const Sparks: React.FC<{frame: number}> = ({frame}) => {
	const t0 = frame - STRIKE;
	if (t0 < 0) return null;
	return (
		<>
			{SPARKS.map((s, i) => {
				const t = t0 - s.delay;
				if (t < 0 || t > s.life) return null;
				// Born on the rim, flung outward, pulled down by gravity, slowed by air.
				const drag = (1 - Math.pow(0.955, t)) / (1 - 0.955);
				const x = CX + Math.cos(s.angle) * (MED / 2 - 6) + Math.cos(s.angle) * s.speed * drag;
				const y = CY + Math.sin(s.angle) * (MED / 2 - 6) + Math.sin(s.angle) * s.speed * drag + 0.11 * t * t;
				const k = t / s.life;
				const fade = 1 - k * k;
				const vx = Math.cos(s.angle) * s.speed * Math.pow(0.955, t);
				const vy = Math.sin(s.angle) * s.speed * Math.pow(0.955, t) + 0.22 * t;
				const len = Math.max(4, Math.hypot(vx, vy) * 1.6);
				const rot = (Math.atan2(vy, vx) * 180) / Math.PI;
				const col = s.hue > 0.7 ? '#FFE3A3' : colors.ember;
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: x,
							top: y,
							width: len,
							height: s.size,
							borderRadius: s.size,
							background: `linear-gradient(90deg, rgba(255,138,61,0), ${col})`,
							boxShadow: `0 0 ${6 + s.size * 2}px ${col}`,
							opacity: fade,
							transform: `translate(-100%, -50%) rotate(${rot}deg)`,
							transformOrigin: '100% 50%',
						}}
					/>
				);
			})}
		</>
	);
};

const EMBERS = new Array(46).fill(0).map((_, i) => ({
	x: random(`ex${i}`) * 1920,
	y0: 1080 + random(`ey${i}`) * 900,
	rise: 0.9 + random(`er${i}`) * 1.6,
	size: 1.2 + random(`es${i}`) * 2.4,
	phase: random(`ep${i}`) * 100,
}));

const Embers: React.FC<{frame: number}> = ({frame}) => {
	const on = interpolate(frame, [30, 110], [0, 1], clamp);
	return (
		<>
			{EMBERS.map((e, i) => {
				const y = e.y0 - frame * e.rise * 2.2;
				const x = e.x + noise2D('ember', i, (frame + e.phase) / 90) * 40;
				const flicker = 0.55 + 0.45 * noise2D('flick', i * 3, frame / 14);
				const yy = ((y % 1980) + 1980) % 1980 - 900;
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: x,
							top: yy,
							width: e.size,
							height: e.size,
							borderRadius: '50%',
							background: '#FFB070',
							boxShadow: `0 0 ${4 + e.size * 3}px ${colors.ember}`,
							opacity: on * flicker * 0.75,
						}}
					/>
				);
			})}
		</>
	);
};

const Tagline: React.FC<{frame: number}> = ({frame}) => {
	const text = 'THE EMPIRES AND HABITS THAT BUILT A NATION';
	const start = 168;
	return (
		<div
			style={{
				position: 'absolute',
				top: 868,
				width: 1920,
				textAlign: 'center',
				fontFamily: fonts.text,
				fontWeight: 500,
				fontSize: 25,
				letterSpacing: '0.42em',
				color: colors.muted,
				whiteSpace: 'pre',
			}}
		>
			{text.split('').map((ch, i) => {
				const o = interpolate(frame, [start + i * 0.9, start + i * 0.9 + 14], [0, 1], clamp);
				return (
					<span key={i} style={{opacity: o, display: 'inline-block', transform: `translateY(${(1 - o) * 8}px)`}}>
						{ch}
					</span>
				);
			})}
		</div>
	);
};

export const Sting: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// The medallion arrives from the dark, tilted, and lands on the strike.
	const land = spring({frame: frame - 8, fps, config: {damping: 13, stiffness: 70, mass: 1.1}, durationInFrames: 70});
	const rotY = interpolate(land, [0, 1], [-28, 0]);
	const rotX = interpolate(land, [0, 1], [10, 0]);
	const scale = interpolate(land, [0, 1], [1.16, 1]);

	// Forge light: a warm sweep reveals the metal from left to right, then settles.
	const reveal = interpolate(frame, [2, 64], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
	const exposure = interpolate(frame, [0, 70, STRIKE, STRIKE + 10, 150], [0.25, 0.92, 1.12, 1.04, 1.0], clamp);

	// The strike: a short camera kick and a flash on the rim.
	const kick = frame >= STRIKE ? Math.exp(-(frame - STRIKE) / 4) : 0;
	const shakeX = noise2D('shx', frame / 2, 0) * 9 * kick;
	const shakeY = noise2D('shy', 0, frame / 2) * 7 * kick;
	const flash = frame >= STRIKE ? Math.exp(-(frame - STRIKE) / 7) : 0;

	// Glint: a bright band crossing the metal after it lands.
	const glint = interpolate(frame, [112, 158], [-0.45, 1.45], {...clamp, easing: Easing.inOut(Easing.quad)});

	// Name and a hairline either side of it.
	const nameIn = spring({frame: frame - 138, fps, config: {damping: 18, stiffness: 90}});
	const rule = interpolate(frame, [150, 205], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});

	// Never still: a slow push over the whole sting, and a breathing glow.
	const push = interpolate(frame, [0, STING_FRAMES], [1, 1.045]);
	const breathe = 0.5 + 0.5 * noise2D('glow', frame / 80, 1);
	const glowOp = interpolate(frame, [4, 60], [0, 1], clamp) * (0.55 + 0.25 * breathe) + flash * 0.35;

	const medMask = `url(${staticFile('img/medallion_2048.png')})`;

	return (
		<AbsoluteFill style={{background: colors.bg, overflow: 'hidden'}}>
			<AbsoluteFill style={{transform: `translate(${shakeX}px, ${shakeY}px) scale(${push})`}}>
				<AbsoluteFill
					style={{
						background: `radial-gradient(ellipse 70% 60% at 50% 42%, #191a1f 0%, ${colors.bg} 62%, #08090b 100%)`,
					}}
				/>
				<Grid frame={frame} />
				{/* Forge glow behind the medallion */}
				<div
					style={{
						position: 'absolute',
						left: CX - 620,
						top: CY - 520,
						width: 1240,
						height: 1040,
						borderRadius: '50%',
						background: `radial-gradient(circle, rgba(255,138,61,0.30) 0%, rgba(197,125,60,0.12) 38%, rgba(13,14,17,0) 68%)`,
						opacity: glowOp,
					}}
				/>
				<Embers frame={frame} />
				{/* Contact shadow */}
				<div
					style={{
						position: 'absolute',
						left: CX - MED * 0.5,
						top: CY + MED * 0.43,
						width: MED,
						height: 90,
						borderRadius: '50%',
						background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 70%)',
						opacity: interpolate(land, [0, 1], [0, 1]),
					}}
				/>
				<div
					style={{
						position: 'absolute',
						left: CX - MED / 2,
						top: CY - MED / 2,
						width: MED,
						height: MED,
						perspective: 1600,
					}}
				>
					<div
						style={{
							width: MED,
							height: MED,
							transform: `rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${scale})`,
							WebkitMaskImage: `linear-gradient(100deg, #000 ${reveal * 130 - 30}%, rgba(0,0,0,0) ${reveal * 130}%)`,
						}}
					>
						<Img
							src={staticFile('img/medallion_2048.png')}
							style={{width: MED, height: MED, filter: `brightness(${exposure}) contrast(1.04)`}}
						/>
						{/* Glint, confined to the metal by the medallion's own alpha */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								WebkitMaskImage: medMask,
								WebkitMaskSize: '100% 100%',
								background: `linear-gradient(115deg, rgba(255,255,255,0) ${glint * 100 - 14}%, rgba(255,236,190,0.55) ${
									glint * 100
								}%, rgba(255,255,255,0) ${glint * 100 + 14}%)`,
								mixBlendMode: 'screen',
							}}
						/>
						{/* Strike: a short warm bloom of the metal itself */}
						{flash > 0.02 ? (
							<Img
								src={staticFile('img/medallion_2048.png')}
								style={{
									position: 'absolute',
									inset: 0,
									width: MED,
									height: MED,
									filter: 'blur(14px) brightness(1.5) sepia(0.6) saturate(1.6)',
									mixBlendMode: 'screen',
									opacity: flash * 0.55,
								}}
							/>
						) : null}
					</div>
				</div>
				<Sparks frame={frame} />
				{/* Name */}
				<div
					style={{
						position: 'absolute',
						top: 772,
						width: 1920,
						textAlign: 'center',
						fontFamily: fonts.display,
						fontWeight: 700,
						fontSize: 66,
						letterSpacing: '0.16em',
						paddingLeft: '0.16em',
						backgroundImage: `linear-gradient(180deg, #F3D98B 0%, ${colors.gold} 45%, ${colors.bronze} 100%)`,
						WebkitBackgroundClip: 'text',
						color: 'transparent',
						opacity: nameIn,
						transform: `translateY(${(1 - nameIn) * 18}px)`,
						filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.6))',
					}}
				>
					BUILT ON BHARAT
				</div>
				{/* Hairlines either side of the tagline */}
				<div
					style={{
						position: 'absolute',
						top: 882,
						left: CX - 760,
						width: 170 * rule,
						height: 1,
						background: `linear-gradient(90deg, rgba(197,125,60,0), ${colors.bronze})`,
					}}
				/>
				<div
					style={{
						position: 'absolute',
						top: 882,
						left: CX + 760 - 170 * rule,
						width: 170 * rule,
						height: 1,
						background: `linear-gradient(90deg, ${colors.bronze}, rgba(197,125,60,0))`,
					}}
				/>
				<Tagline frame={frame} />
			</AbsoluteFill>
			{/* Atmosphere: vignette and fine grain */}
			<AbsoluteFill
				style={{background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)'}}
			/>
			<AbsoluteFill style={{opacity: interpolate(frame, [0, 10], [1, 0], clamp), background: '#000'}} />
		</AbsoluteFill>
	);
};
