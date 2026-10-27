import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camera, Desk, ease, pop, tween} from '../../../../../lib/remotion';

/** "In February nineteen oh four, a letter reaches him": an envelope slides onto the desk and the lamp finds it.
 *  An object only: no address, no writing, never a recreated letter (PLAYBOOK §8.6). ILLUSTRATION. */
export const Envelope: React.FC<{at: number}> = ({at}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();
	const p = pop(frame, fps, at, 120, 20);
	const x = (1 - p) * -900;
	const rot = -8 + 5 * p;
	return (
		<AbsoluteFill>
			<Desk />
			<Camera seed="env" drift={2} keys={[{f: 0, scale: 1.0, y: 20}, {f: durationInFrames, scale: 1.14, y: -10}]}>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
					<div
						style={{
							position: 'relative',
							width: 760,
							height: 430,
							transform: `translateX(${x}px) rotate(${rot}deg)`,
							background: 'linear-gradient(165deg, #E9DFC6 0%, #D9CBA8 60%, #CDBD97 100%)',
							boxShadow: '0 40px 80px rgba(0,0,0,0.65), inset 0 0 60px rgba(120,90,40,0.18)',
						}}
					>
						<svg width={760} height={430} style={{position: 'absolute', inset: 0}}>
							{/* the back flap's folds, as on an envelope turned face down */}
							<path d="M0 0 L380 250 L760 0" fill="none" stroke="rgba(110,85,45,0.35)" strokeWidth={2} />
							<path d="M0 430 L300 205 M760 430 L460 205" fill="none" stroke="rgba(110,85,45,0.22)" strokeWidth={2} />
							{/* a plain wax seal where the flap meets */}
							<circle cx={380} cy={250} r={34} fill="#7A1E16" />
							<circle cx={380} cy={250} r={24} fill="none" stroke="#5A130E" strokeWidth={3} />
						</svg>
					</div>
				</AbsoluteFill>
			</Camera>
		</AbsoluteFill>
	);
};

/** A dream that dies with him: the picture drains of colour and light from `from` to the end of the shot. */
export const Fading: React.FC<{from: number; children: React.ReactNode}> = ({from, children}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const t = tween(frame, from, durationInFrames, 0, 1, ease.leave);
	return <AbsoluteFill style={{filter: `grayscale(${t}) brightness(${1 - 0.75 * t})`}}>{children}</AbsoluteFill>;
};
