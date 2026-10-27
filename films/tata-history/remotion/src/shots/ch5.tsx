import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camera, Desk, ease, fontStacks, pop, tween} from '../../../../../lib/remotion';

/** A blank 1970s inland postcard on the desk, turned over: an object only. Her words stay in the narration; nothing is
 *  written on it (never a recreated letter, PLAYBOOK §8.6). ILLUSTRATION. */
export const Postcard: React.FC<{at: number; flipAt?: number}> = ({at, flipAt = 1e9}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();
	const p = pop(frame, fps, at, 120, 20);
	const flip = tween(frame, flipAt, flipAt + 40, 0, 180, ease.camera);
	return (
		<AbsoluteFill>
			<Desk />
			<Camera seed="pc" drift={2} keys={[{f: 0, scale: 1.0}, {f: durationInFrames, scale: 1.12, y: -10}]}>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', perspective: 1600}}>
					<div
						style={{
							position: 'relative',
							width: 820,
							height: 520,
							transform: `translateY(${(1 - p) * 500}px) rotate(${-4 + 3 * p}deg) rotateY(${flip}deg)`,
							transformStyle: 'preserve-3d',
						}}
					>
						{[0, 1].map((side) => (
							<div
								key={side}
								style={{
									position: 'absolute',
									inset: 0,
									backfaceVisibility: 'hidden',
									transform: side ? 'rotateY(180deg)' : undefined,
									background: 'linear-gradient(165deg, #EADBB0 0%, #D9C793 100%)',
									boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
									padding: 40,
								}}
							>
								{side === 0 ? (
									<>
										<div style={{fontFamily: fontStacks.text, fontWeight: 600, fontSize: 30, letterSpacing: '0.4em', color: '#7A2E1C'}}>POST CARD</div>
										<div style={{position: 'absolute', right: 40, top: 36, width: 110, height: 130, border: '3px solid #7A2E1C', opacity: 0.7}} />
										<div style={{position: 'absolute', left: 420, top: 110, bottom: 40, width: 2, background: '#7A2E1C', opacity: 0.4}} />
										{[0, 1, 2, 3].map((k) => (
											<div key={k} style={{position: 'absolute', left: 450, right: 40, top: 250 + k * 60, height: 2, background: '#7A2E1C', opacity: 0.35}} />
										))}
									</>
								) : null}
							</div>
						))}
					</div>
				</AbsoluteFill>
			</Camera>
		</AbsoluteFill>
	);
};

/** "Less than ten days later, a telegram arrives. Come for an interview. In Pune.": a telegram form of the period
 *  with only the words the narration says, typed in as they are spoken. ILLUSTRATION. */
export const Telegram: React.FC<{at: number; line1At: number; line2At: number}> = ({at, line1At, line2At}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();
	const p = pop(frame, fps, at, 120, 20);
	const type = (text: string, from: number) => text.slice(0, Math.max(0, Math.floor((frame - from) / 2.5)));
	return (
		<AbsoluteFill>
			<Desk />
			<Camera seed="tg" drift={2} keys={[{f: 0, scale: 1.0}, {f: durationInFrames, scale: 1.16, y: -20}]}>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
					<div
						style={{
							width: 980,
							padding: '44px 56px 60px',
							background: 'linear-gradient(170deg, #F2E9CF 0%, #E2D3AE 100%)',
							boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
							transform: `translateY(${(1 - p) * -500}px) rotate(${2 - 1.5 * p}deg)`,
						}}
					>
						<div style={{fontFamily: fontStacks.text, fontWeight: 700, fontSize: 30, letterSpacing: '0.5em', color: '#3A2C1A'}}>TELEGRAM</div>
						<div style={{height: 3, background: '#3A2C1A', margin: '16px 0 40px', opacity: 0.6}} />
						<div style={{fontFamily: fontStacks.numbers, fontSize: 52, color: '#1E1810', letterSpacing: '0.06em', minHeight: 70}}>{type('COME FOR AN INTERVIEW', line1At)}</div>
						<div style={{fontFamily: fontStacks.numbers, fontSize: 52, color: '#1E1810', letterSpacing: '0.06em', minHeight: 70}}>{type('PUNE', line2At)}</div>
					</div>
				</AbsoluteFill>
			</Camera>
		</AbsoluteFill>
	);
};
