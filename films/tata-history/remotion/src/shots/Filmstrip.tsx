import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, ease, fontStacks, pop, tween} from '../../../../../lib/remotion';

// Cold open, "Tata.": the four everyday shots (salt, tea, a bridge, a plane) freeze and slide into one row of frames,
// and the one word is engraved beneath them. No box, no label: the name under the things it makes.
const FRAMES = ['today_salt', 'today_tea', 'today_bridge', 'today_plane'];

export const Filmstrip: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const k = tween(frame, 0, 26, 0, 1, ease.arrive);
	const word = pop(frame, fps, 14, 200, 16);
	const w = 400;
	const gap = 28;
	const total = FRAMES.length * w + (FRAMES.length - 1) * gap;
	return (
		<AbsoluteFill style={{background: '#0B0B0C'}}>
			{FRAMES.map((n, i) => {
				// each frame starts full screen (the last one shown is the plane) and lands in the row
				const x0 = 0;
				const x1 = -total / 2 + i * (w + gap) + w / 2;
				const s = interpolate(k, [0, 1], [i === 3 ? 1 : 0.6, w / 1920]);
				return (
					<AbsoluteFill key={n} style={{alignItems: 'center', justifyContent: 'center', opacity: i === 3 ? 1 : Math.min(1, k * 2)}}>
						<div
							style={{
								width: 1920,
								height: 1080,
								transform: `translate(${interpolate(k, [0, 1], [x0, x1])}px, ${interpolate(k, [0, 1], [0, -60])}px) scale(${s})`,
								boxShadow: `0 ${30 * k}px ${80 * k}px rgba(0,0,0,0.7)`,
								outline: `${6 / Math.max(s, 0.2)}px solid rgba(229,168,90,${0.5 * k})`,
							}}
						>
							<Img src={staticFile(`assets/media/stills/${n}.jpg`)} style={{width: '100%', height: '100%', objectFit: 'cover', filter: `saturate(${1 - 0.25 * k}) brightness(${1 - 0.15 * k})`}} />
						</div>
					</AbsoluteFill>
				);
			})}
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
				<div
					style={{
						transform: `translateY(${150 + (1 - word) * 30}px)`,
						opacity: word,
						fontFamily: fontStacks.display,
						fontWeight: 700,
						fontSize: 120,
						letterSpacing: `${0.6 - 0.22 * word}em`,
						paddingLeft: '0.38em',
						background: `linear-gradient(180deg, #F3D9A4 0%, ${colors.gold} 40%, ${colors.bronze} 75%, #8A5426 100%)`,
						WebkitBackgroundClip: 'text',
						backgroundClip: 'text',
						color: 'transparent',
						filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.8))',
					}}
				>
					TATA
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
