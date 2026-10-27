import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camera, ease, Footage, fontStacks, tween} from '../../../../../lib/remotion';

/** Old standard-definition company film (586×480 VHS) shown as what it is: a 4:3 tape window in the dark, with its
 *  label, never stretched to fill a 4K frame. */
export const TapeFrame: React.FC<{file: string; startFrom: number; label: string; scan?: boolean; rate?: number}> = ({file, startFrom, label, scan = true, rate = 1}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const o = tween(frame, 0, 12, 0, 1, ease.arrive);
	return (
		<AbsoluteFill style={{background: '#0B0B0C'}}>
			<Camera seed="tape" drift={2} keys={[{f: 0, scale: 1.0}, {f: durationInFrames, scale: 1.06}]}>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
					<div style={{position: 'relative', width: 1060, height: 795, opacity: o, borderRadius: 18, overflow: 'hidden', boxShadow: '0 0 160px rgba(255,120,30,0.25), 0 40px 90px rgba(0,0,0,0.7)'}}>
						<Footage file={file} startFrom={startFrom} rate={rate} grade="modern" />
						{/* scanlines: it is a tape (off for later standard-definition video) */}
						{scan ? <AbsoluteFill style={{background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 2px, transparent 4px)'}} /> : null}
					</div>
					<div style={{marginTop: 26, fontFamily: fontStacks.text, fontSize: 22, letterSpacing: '0.3em', color: 'rgba(230,220,200,0.6)', opacity: o}}>{label}</div>
				</AbsoluteFill>
			</Camera>
		</AbsoluteFill>
	);
};

/** "It should be a happy ending, shouldn't it? It isn't.": black, and one ember drifting up. */
export const LastEmber: React.FC = () => {
	const frame = useCurrentFrame();
	const y = 640 - frame * 1.2;
	const o = tween(frame, 0, 20, 0, 1) * tween(frame, 60, 110, 1, 0.4);
	return (
		<AbsoluteFill style={{background: '#050506'}}>
			<div
				style={{
					position: 'absolute',
					left: 960 + Math.sin(frame / 14) * 12,
					top: y,
					width: 8,
					height: 8,
					borderRadius: 4,
					background: '#FFB25A',
					boxShadow: '0 0 18px 6px rgba(255,140,40,0.7)',
					opacity: o,
				}}
			/>
		</AbsoluteFill>
	);
};
