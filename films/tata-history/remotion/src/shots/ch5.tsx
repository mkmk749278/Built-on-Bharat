import React from 'react';
import {AbsoluteFill, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camera, Desk, ease, fontStacks, pop, tween} from '../../../../../lib/remotion';

/** One line of illegible cursive: pen loops (a prolate cycloid) broken into word-length runs. No letterforms. */
const scribble = (seed: string, x0: number, y0: number, len: number): string => {
	let d = '';
	let x = x0;
	let w = 0;
	while (x < x0 + len) {
		const n = 4 + Math.floor(random(`${seed}-n${w}`) * 6); // loops in this word
		const h = 9 + random(`${seed}-h${w}`) * 6;
		for (let i = 0; i <= n * 12; i++) {
			const t = (i / 12) * Math.PI * 2;
			const tall = random(`${seed}-t${w}-${Math.floor(i / 12)}`) > 0.78 ? 2.1 : 1;
			const px = x + t * 3.1 - 6.5 * Math.sin(t);
			const py = y0 - h * tall * (0.5 - 0.5 * Math.cos(t)) + Math.sin(t * 0.13) * 1.5;
			d += `${i === 0 ? 'M' : 'L'}${px.toFixed(1)} ${py.toFixed(1)} `;
		}
		x += n * Math.PI * 2 * 3.1 + 22 + random(`${seed}-g${w}`) * 14;
		w++;
	}
	return d;
};

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
										{/* v8: no longer blank. A stamp, a Bangalore postmark of April 1974 and his name in her hand (the
										    narration's facts only; no address is claimed) */}
										<div style={{position: 'absolute', right: 40, top: 36, width: 110, height: 130, border: '3px solid #7A2E1C', opacity: 0.7}} />
										<div style={{position: 'absolute', right: 52, top: 48, width: 86, height: 106, background: 'linear-gradient(160deg, #9B4A2E, #6E2C1B)', outline: '3px dotted #EADBB0', outlineOffset: -4}} />
										<svg style={{position: 'absolute', right: 96, top: 60, width: 190, height: 190, overflow: 'visible', opacity: 0.62, transform: 'rotate(-14deg)'}} viewBox="-95 -95 190 190">
											<circle r={78} fill="none" stroke="#2A2A3A" strokeWidth={3} />
											<circle r={52} fill="none" stroke="#2A2A3A" strokeWidth={2} />
											<path id="pm-arc" d="M -64 0 A 64 64 0 0 1 64 0" fill="none" />
											<text fontFamily={fontStacks.text} fontWeight={700} fontSize={17} letterSpacing="0.18em" fill="#2A2A3A">
												<textPath href="#pm-arc" startOffset="50%" textAnchor="middle">BANGALORE</textPath>
											</text>
											<text y={8} textAnchor="middle" fontFamily={fontStacks.text} fontWeight={700} fontSize={20} letterSpacing="0.1em" fill="#2A2A3A">APR 1974</text>
											{[0, 1, 2, 3].map((k) => <path key={k} d={`M 90 ${-30 + k * 20} q 40 -10 80 0 t 80 0`} fill="none" stroke="#2A2A3A" strokeWidth={3} />)}
										</svg>
										<div style={{position: 'absolute', left: 420, top: 110, bottom: 40, width: 2, background: '#7A2E1C', opacity: 0.4}} />
										{[0, 1, 2, 3].map((k) => (
											<div key={k} style={{position: 'absolute', left: 450, right: 40, top: 250 + k * 60, height: 2, background: '#7A2E1C', opacity: 0.35}} />
										))}
										<div style={{position: 'absolute', left: 462, top: 196, fontFamily: fontStacks.quote, fontStyle: 'italic', fontSize: 50, color: '#1F2A4A', transform: 'rotate(-2deg)'}}>
											Mr. J.R.D. Tata
										</div>
									</>
								) : (
									<>
										{/* her message as handwriting seen too far off to read (v9: v8's grey bars read as unfinished): pen loops in
										    ink, written on as she "writes a postcard", never letters, so none of her words is invented */}
										<svg style={{position: 'absolute', inset: 0, overflow: 'hidden'}} viewBox="0 0 820 520">
											<g transform="translate(40 0) skewX(-14)">
											{Array.from({length: 6}, (_, k) => (
												<path
													key={k}
													d={scribble(`pc-line${k}`, 40, 92 + k * 66, k === 5 ? 320 : 600)}
													pathLength={1}
													fill="none"
													stroke="#1F2A4A"
													strokeWidth={2.2}
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeDasharray="1 1"
													strokeDashoffset={1 - tween(frame, flipAt + 30 + k * 26, flipAt + 30 + (k + 1) * 26, 0, 1)}
													opacity={0.82}
												/>
											))}
											</g>
										</svg>
									</>
								)}
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
