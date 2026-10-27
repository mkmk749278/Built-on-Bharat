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
	const CYAN = '#4FD8E8';
	return (
		<AbsoluteFill style={{background: 'radial-gradient(ellipse 70% 60% at 50% 50%, #141A20 0%, #08090B 75%)'}}>
			<Camera seed="bar" drift={1.5} keys={[{f: 0, scale: 1.0}, {f: durationInFrames, scale: 1.05}]}>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
					<div style={{width: W}}>
						<div style={{fontFamily: fontStacks.text, fontSize: 24, letterSpacing: '0.34em', color: 'rgba(230,220,200,0.7)', marginBottom: 26, opacity: grow}}>
							DIVIDENDS SENT UP TO TATA SONS · LAST YEAR
						</div>
						<div style={{position: 'relative', height: 120, width: W * grow, background: colors.bronze, opacity: 0.85, borderRadius: 4, overflow: 'hidden'}}>
							<div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(fill / grow || 0) * 100}%`, maxWidth: '100%', background: `linear-gradient(90deg, ${CYAN}, #9EF2FA)`, boxShadow: `0 0 50px ${CYAN}`}} />
						</div>
						<div style={{position: 'relative', height: 120, marginTop: 24}}>
							<div style={{position: 'absolute', left: 0, fontFamily: fontStacks.numbers, fontSize: 110, color: CYAN, opacity: tween(frame, fillAt, fillAt + 20, 0, 1)}}>
								{Math.round(fill * 100)}%
								<span style={{fontFamily: fontStacks.text, fontSize: 30, letterSpacing: '0.3em', marginLeft: 26, color: 'rgba(230,220,200,0.85)'}}>T.C.S.</span>
							</div>
							<div style={{position: 'absolute', right: 0, top: 30, textAlign: 'right', fontFamily: fontStacks.text, fontSize: 24, letterSpacing: '0.3em', color: 'rgba(230,220,200,0.6)', opacity: tween(frame, fillAt + 90, fillAt + 120, 0, 1)}}>
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
