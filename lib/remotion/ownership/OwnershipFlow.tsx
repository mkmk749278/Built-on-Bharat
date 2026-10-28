// Ownership flow (plan_v7; replaces the molten "ownership machine" the outside review read as a school science tank).
// Tata Sons as an institution: dark glass cards joined by fine bus lines, in the family of the T.C.S. dividend bar.
// Owners come in on the VO's words; the share bar inside Tata Sons is to scale (claims T76, T77, T111: trusts about
// 66%, the Sir Dorabji Tata Trust 27.98%, the Shapoorji Pallonji group 18.37%, Tata companies about 13%); the only
// numbers on screen are the VO's: TWO THIRDS and 28%. Then the money moves: dividends rise from the companies to Tata
// Sons and on to the trusts, and out of the trusts into hospitals, research and scholarships.
import {noise2D} from '@remotion/noise';
import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../brand';
import {fontStacks} from '../fonts';
import {ease, pop, tween} from '../motion';
import {SfxCue} from '../sfx';
import {SHARES} from './OwnershipMachine';

export type FlowTimeline = {
	sons: number;
	trusts: number;
	dorabji: number;
	shapoorji: number;
	companies: number;
	/** dividends rise (companies → Tata Sons → trusts) */
	up: number;
	/** money goes out of the trusts (hospitals, research, scholarships) */
	out: number;
};
/** Everything already in place, money moving gently: for the shots that come back to the structure. */
export const FLOW_HELD: FlowTimeline = {sons: -900, trusts: -800, dorabji: -700, shapoorji: -600, companies: -500, up: -400, out: -300};

export const flowCues = (t: FlowTimeline): SfxCue[] => [
	{frame: t.sons, sfx: 'glass_panel_slide', gainDb: -14},
	{frame: t.trusts, sfx: 'glass_panel_slide', gainDb: -12},
	{frame: t.dorabji, sfx: 'diamond_glint_shimmer', gainDb: -12},
	{frame: t.shapoorji, sfx: 'tick_soft', gainDb: -14},
	{frame: t.companies, sfx: 'tick_soft', gainDb: -14},
	{frame: t.up, sfx: 'data_pulse_rise', gainDb: -14},
	{frame: t.out, sfx: 'data_pulse_rise', gainDb: -14},
];

const CYAN = '#4FD8E8';
const GLASS = 'rgba(255,255,255,0.045)';
const EDGE = 'rgba(214,178,120,0.38)';
const COMPANIES = ['T.C.S.', 'TATA STEEL', 'TATA MOTORS', 'TATA CONSUMER', 'TITAN', 'AIR INDIA'];

const Card: React.FC<{x: number; y: number; w: number; h: number; at: number; children?: React.ReactNode; glow?: string; dim?: number}> = ({x, y, w, h, at, children, glow, dim = 1}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const p = pop(frame, fps, at, 140, 20);
	if (frame < at) return null;
	return (
		<div
			style={{
				position: 'absolute',
				left: x - w / 2,
				top: y - h / 2,
				width: w,
				height: h,
				background: GLASS,
				border: `1.5px solid ${EDGE}`,
				borderRadius: 10,
				boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 60px rgba(0,0,0,0.55)${glow ? `, 0 0 46px ${glow}` : ''}`,
				backdropFilter: 'blur(14px)',
				opacity: Math.min(1, p * 1.4) * dim,
				transform: `translateY(${(1 - p) * 24}px) scale(${0.97 + 0.03 * p})`,
			}}
		>
			{children}
		</div>
	);
};

const Label: React.FC<{children: React.ReactNode; size?: number; color?: string; spacing?: string; weight?: number}> = ({children, size = 22, color = 'rgba(236,226,206,0.92)', spacing = '0.3em', weight = 600}) => (
	<div style={{fontFamily: fontStacks.text, fontWeight: weight, fontSize: size, letterSpacing: spacing, color, whiteSpace: 'nowrap'}}>{children}</div>
);

/** A bus line drawn on at `at` over `dur`, with light pulses running along it from `pulseFrom` (direction a → b). */
const Bus: React.FC<{d: string; len: number; at: number; dur?: number; pulseFrom?: number; color?: string; seed: string}> = ({d, len, at, dur = 40, pulseFrom = 1e9, color = colors.gold, seed}) => {
	const frame = useCurrentFrame();
	const p = tween(frame, at, at + dur, 0, 1, ease.sweep);
	if (p <= 0) return null;
	const pulses = frame >= pulseFrom ? [0, 1, 2] : [];
	return (
		<g>
			<path d={d} fill="none" stroke={EDGE} strokeWidth={1.8} strokeDasharray={`${len * p} ${len}`} />
			{pulses.map((k) => {
				const t = ((frame - pulseFrom) / 80 + k / 3 + noise2D(seed, k, 0) * 0.02) % 1;
				const L = Math.min(90, len * 0.35);
				return (
					<g key={k} opacity={Math.sin(Math.PI * t)}>
						<path d={d} fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" strokeDasharray={`${L} ${len + L}`} strokeDashoffset={L - t * (len + L)} opacity={0.35} style={{filter: 'blur(4px)'}} />
						<path d={d} fill="none" stroke="#FFF7E6" strokeWidth={2.2} strokeLinecap="round" strokeDasharray={`${L * 0.6} ${len + L}`} strokeDashoffset={L * 0.6 - t * (len + L)} />
					</g>
				);
			})}
		</g>
	);
};

export const OwnershipFlow: React.FC<{t: FlowTimeline; background?: string}> = ({t, background}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	// the camera: close on Tata Sons, easing back as the owners arrive, then a slow drift
	const open = tween(frame, t.trusts - 50, t.trusts + 30, 0, 1, ease.camera);
	const zoom = 1.3 - 0.28 * open + 0.035 * tween(frame, t.trusts + 30, durationInFrames, 0, 1);
	const camY = 170 * (1 - open);
	// the share bar inside Tata Sons, to scale
	const BW = 640;
	const seg = (from: number, share: number) => tween(frame, from, from + 50, 0, share, ease.arrive) * BW;
	const trustsW = seg(t.trusts, SHARES.trusts);
	const dorW = seg(t.dorabji, SHARES.dorabji);
	const spW = seg(t.shapoorji, SHARES.shapoorji);
	const coW = seg(t.companies, SHARES.companies);
	const glint = tween(frame, t.dorabji + 20, t.dorabji + 40, 0, 1) * (1 - tween(frame, t.dorabji + 60, t.dorabji + 120, 0, 1));
	return (
		<AbsoluteFill style={{background: '#07080A', overflow: 'hidden'}}>
			{background ? (
				<AbsoluteFill style={{transform: `scale(${1.1 + 0.04 * tween(frame, 0, durationInFrames, 0, 1)})`}}>
					<Img src={staticFile(background)} style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(10px) brightness(0.22) saturate(0.5) sepia(0.3)'}} />
				</AbsoluteFill>
			) : null}
			<AbsoluteFill style={{background: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(20,26,32,0.5) 0%, rgba(8,9,11,0.92) 80%)'}} />
			{/* faint blueprint grid: the machine-room world */}
			<AbsoluteFill style={{backgroundImage: 'linear-gradient(rgba(142,146,155,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(142,146,155,0.06) 1px, transparent 1px)', backgroundSize: '48px 48px'}} />
			<AbsoluteFill style={{transform: `translateY(${camY}px) scale(${zoom})`, transformOrigin: '50% 28%'}}>
				<svg width={1920} height={1080} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
					{/* owners → Tata Sons */}
					<Bus d="M330 455 V300 H570" len={395} at={t.trusts + 10} pulseFrom={t.up + 40} seed="tr" />
					<Bus d="M1560 425 V300 H1350" len={335} at={t.shapoorji + 10} seed="sp" />
					<Bus d="M1790 575 V300 H1350" len={715} at={t.companies + 10} seed="co" />
					{/* Tata Sons → the companies it holds (the bus and its drops); dividends rise along it */}
					<Bus d="M960 375 V872" len={497} at={t.sons + 30} pulseFrom={t.up} color={CYAN} seed="up" />
					{COMPANIES.map((_, i) => {
						const x = 260 + i * 280;
						return <Bus key={i} d={`M${x} 923 V872 H960`} len={Math.abs(960 - x) + 51} at={t.sons + 40 + i * 6} pulseFrom={t.up} color={CYAN} seed={`c${i}`} />;
					})}
					{/* out of the trusts: hospitals, research, scholarships */}
					<Bus d="M330 735 V772" len={37} at={t.out - 20} pulseFrom={t.out} seed="o1" />
				</svg>
				<Card x={960} y={300} w={780} h={150} at={t.sons} glow={glint > 0 ? `rgba(255,236,190,${0.35 * glint})` : undefined}>
					<div style={{position: 'absolute', left: 70, top: 26}}>
						<Label size={40} spacing="0.34em" weight={700} color={colors.ink}>TATA SONS</Label>
					</div>
					<div style={{position: 'absolute', left: 70, top: 92, width: BW, height: 20, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden'}}>
						<div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: trustsW, background: colors.bronze, opacity: 0.9}} />
						<div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: dorW, background: `linear-gradient(90deg, ${colors.gold}, #F6DE9A)`, boxShadow: `0 0 ${30 * glint}px #FFF1C8`}} />
						<div style={{position: 'absolute', left: BW * SHARES.trusts, top: 0, bottom: 0, width: spW, background: '#7D838C'}} />
						<div style={{position: 'absolute', left: BW * (SHARES.trusts + SHARES.shapoorji), top: 0, bottom: 0, width: Math.min(coW, BW * (1 - SHARES.trusts - SHARES.shapoorji)), background: '#4B5058'}} />
					</div>
				</Card>
				<Card x={330} y={525} w={430} h={140} at={t.trusts}>
					<div style={{position: 'absolute', left: 34, top: 24}}>
						<Label size={21}>CHARITABLE TRUSTS</Label>
						<div style={{fontFamily: fontStacks.numbers, fontSize: 52, color: colors.bronze, marginTop: 8, opacity: tween(frame, t.trusts + 20, t.trusts + 40, 0, 1)}}>TWO THIRDS</div>
					</div>
				</Card>
				<Card x={330} y={675} w={430} h={120} at={t.dorabji} glow={`rgba(212,175,55,${0.25 + 0.3 * glint})`}>
					<div style={{position: 'absolute', left: 34, top: 18}}>
						<Label size={19} color={colors.gold}>SIR DORABJI TATA TRUST</Label>
						<div style={{fontFamily: fontStacks.numbers, fontSize: 50, color: colors.gold, marginTop: 6}}>28%</div>
					</div>
					{/* the diamond's light: the one white point */}
					<svg style={{position: 'absolute', right: 26, top: 30, width: 60, height: 60, overflow: 'visible', opacity: 0.55 + 0.45 * glint, filter: `drop-shadow(0 0 ${10 + 22 * glint}px #FFF3D0)`}} viewBox="-30 -30 60 60">
						<path d={`M0 ${-26 - 10 * glint} L4 -4 L${26 + 10 * glint} 0 L4 4 L0 ${26 + 10 * glint} L-4 4 L${-26 - 10 * glint} 0 L-4 -4 Z`} fill="#FFFFFF" transform={`rotate(${frame * 0.15})`} />
					</svg>
				</Card>
				<Card x={1560} y={470} w={460} h={90} at={t.shapoorji}>
					<div style={{position: 'absolute', left: 30, top: 30}}>
						<Label size={20}>SHAPOORJI PALLONJI GROUP</Label>
					</div>
				</Card>
				<Card x={1560} y={620} w={460} h={90} at={t.companies}>
					<div style={{position: 'absolute', left: 30, top: 30}}>
						<Label size={20}>TATA'S OWN COMPANIES</Label>
					</div>
				</Card>
				{COMPANIES.map((c, i) => (
					<Card key={c} x={260 + i * 280} y={965} w={240} h={84} at={t.sons + 50 + i * 8} dim={0.85}>
						<div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
							<Label size={19} spacing="0.22em">{c}</Label>
						</div>
					</Card>
				))}
				{['HOSPITALS', 'RESEARCH', 'SCHOLARSHIPS'].map((c, i) => (
					<Card key={c} x={130 + i * 200} y={800} w={190} h={54} at={t.out + i * 12} glow="rgba(212,175,55,0.25)">
						<div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
							<Label size={16} spacing="0.16em" color={colors.gold}>{c}</Label>
						</div>
					</Card>
				))}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
