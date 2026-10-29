import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camera, colors, ease, fontStacks, Grade, grades, tween} from '../../../../../lib/remotion';

const M = 'assets/media';

/** "About eighty seven percent came from T.C.S. alone": one bar for all the dividends Tata's companies sent up to
 *  Tata Sons last year, drawn to scale; the T.C.S. share fills in cyan as the counter runs, the rest stays bronze. */
export const ProfitBar: React.FC<{fillAt: number; share: number}> = ({fillAt, share}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const W = 1400;
	const grow = tween(frame, 10, 50, 0, 1, ease.arrive);
	const fill = tween(frame, fillAt, fillAt + 90, 0, share, ease.arrive);
	// v8: drawn in ink on drafting vellum (the outside reviews read the teal-and-orange bar as a dashboard)
	const INK = '#2B2318';
	const OCHRE = '#B5542A';
	return (
		<AbsoluteFill style={{background: 'radial-gradient(ellipse 75% 70% at 48% 45%, #EFE5CF 0%, #DDCFB0 55%, #A8946E 100%)'}}>
			<svg width="100%" height="100%" style={{position: 'absolute', inset: 0, opacity: 0.22, mixBlendMode: 'multiply'}}>
				<filter id="bar-grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={11} /><feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.27  0 0 0 0 0.18  0 0 0 0.9 0" /></filter>
				<rect width="100%" height="100%" filter="url(#bar-grain)" />
			</svg>
			<AbsoluteFill style={{backgroundImage: 'linear-gradient(rgba(70,90,110,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(70,90,110,0.09) 1px, transparent 1px)', backgroundSize: '48px 48px'}} />
			<AbsoluteFill style={{boxShadow: 'inset 0 0 260px rgba(40,26,12,0.55)'}} />
			<Camera seed="bar" drift={1.5} keys={[{f: 0, scale: 1.0, x: 20}, {f: durationInFrames, scale: 1.07, x: -20}]}>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
					<div style={{width: W}}>
						<div style={{fontFamily: fontStacks.text, fontWeight: 700, fontSize: 32, letterSpacing: '0.2em', color: INK, marginBottom: 26, opacity: grow}}>
							DIVIDENDS SENT UP TO TATA SONS · LAST YEAR
						</div>
						<div
							style={{
								position: 'relative',
								height: 120,
								width: W * grow,
								border: `3px solid ${INK}`,
								borderRadius: 3,
								overflow: 'hidden',
								backgroundImage: `repeating-linear-gradient(135deg, rgba(43,35,24,0.28) 0 2px, transparent 2px 14px)`,
							}}
						>
							<div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(fill / grow || 0) * 100}%`, maxWidth: '100%', background: OCHRE, borderRight: `3px solid ${INK}`}} />
						</div>
						<div style={{position: 'relative', height: 130, marginTop: 24}}>
							<div style={{position: 'absolute', left: 0, fontFamily: fontStacks.numbers, fontWeight: 700, fontSize: 120, color: OCHRE, opacity: tween(frame, fillAt, fillAt + 20, 0, 1)}}>
								{Math.round(fill * 100)}%
								<span style={{fontFamily: fontStacks.text, fontWeight: 700, fontSize: 40, letterSpacing: '0.2em', marginLeft: 26, color: INK}}>T.C.S.</span>
							</div>
							<div style={{position: 'absolute', right: 0, top: 36, textAlign: 'right', fontFamily: fontStacks.text, fontWeight: 700, fontSize: 30, letterSpacing: '0.16em', color: INK, opacity: tween(frame, fillAt + 90, fillAt + 120, 0, 1)}}>
								EVERY OTHER TATA COMPANY
							</div>
						</div>
					</div>
				</AbsoluteFill>
			</Camera>
		</AbsoluteFill>
	);
};

/** "Was Corus worth it? People still argue": the two halves of the bet side by side, neither winning. */
export const SplitPair: React.FC<{left: string; right: string; leftLabel: string; rightLabel: string; grade?: Grade}> = ({left, right, leftLabel, rightLabel, grade = 'modern'}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const half = (file: string, label: string, side: -1 | 1) => {
		const s = 1.06 + 0.06 * tween(frame, 0, durationInFrames, 0, 1, ease.camera);
		const o = tween(frame, side < 0 ? 0 : 14, side < 0 ? 24 : 38, 0, 1, ease.arrive);
		return (
			<div style={{position: 'absolute', top: 0, bottom: 0, width: 954, left: side < 0 ? 0 : 966, overflow: 'hidden', opacity: o}}>
				<Img src={staticFile(`${M}/${file}`)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${s}) translateX(${side * -10 * tween(frame, 0, durationInFrames, 0, 1)}px)`, filter: grades[grade].filter}} />
				<div style={{position: 'absolute', left: 0, right: 0, bottom: 70, textAlign: 'center', fontFamily: fontStacks.text, fontSize: 24, letterSpacing: '0.34em', color: 'rgba(240,232,214,0.9)', textShadow: '0 2px 12px rgba(0,0,0,0.9)'}}>{label}</div>
			</div>
		);
	};
	return (
		<AbsoluteFill style={{background: '#08090B'}}>
			{half(left, leftLabel, -1)}
			{half(right, rightLabel, 1)}
		</AbsoluteFill>
	);
};
