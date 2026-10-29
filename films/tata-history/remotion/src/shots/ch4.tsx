import React from 'react';
import {AbsoluteFill, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camera, colors, ease, Footage, fontStacks, tween} from '../../../../../lib/remotion';

/** "He leaves everything to a charitable trust": a ledger page of the new trust, the three bequests written in as the
 *  voice names them, twenty one small lights for the jewellery (the Jubilee the brightest). With `keepFrom`, everything
 *  but the shares fades ("Those the trust keeps"); with `lockAt`, the page darkens like a closing drawer.
 *  A typeset illustration, not a facsimile of the will. ILLUSTRATION. */
export const TrustLedger: React.FC<{at: [number, number, number]; keepFrom?: number; lockAt?: number; seed: string}> = ({at, keepFrom = 1e9, lockAt = 1e9, seed}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const keep = tween(frame, keepFrom, keepFrom + 40, 0, 1, ease.camera);
	const lock = tween(frame, lockAt, lockAt + 30, 0, 1, ease.leave);
	const lines = ['His shares in Tata Sons', 'His property', 'Twenty one pieces of jewellery'];
	return (
		<AbsoluteFill>
			<Camera seed={seed} drift={2} keys={[{f: 0, scale: 0.98, tiltX: 12}, {f: durationInFrames, scale: 1.1, tiltX: 8}]}>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
					<div
						style={{
							width: 1180,
							padding: '70px 90px 80px',
							background: 'linear-gradient(170deg, #EDE3CB 0%, #D8C9A6 100%)',
							boxShadow: '0 40px 90px rgba(0,0,0,0.6)',
							filter: `brightness(${1 - 0.8 * lock})`,
						}}
					>
						<div style={{fontFamily: fontStacks.display, fontSize: 38, letterSpacing: '0.24em', color: '#3A2C1A'}}>SIR DORABJI TATA TRUST · 1932</div>
						<div style={{height: 2, background: '#8A6A3A', margin: '18px 0 34px', opacity: 0.6}} />
						{lines.map((l, i) => {
							const o = tween(frame, at[i], at[i] + 24, 0, 1, ease.arrive);
							// v8: struck letter by letter like a 1932 typewriter (uneven ink, a slight wander off the line), not swept
							const typed = Math.max(0, Math.floor((frame - at[i]) / 2));
							const fade = i === 0 ? 1 : 1 - 0.8 * keep;
							return (
								<div key={l} style={{position: 'relative', fontFamily: fontStacks.text, fontWeight: 500, fontSize: 56, lineHeight: 1.55, color: '#22190F', opacity: Math.min(1, o * 2) * fade, letterSpacing: '0.02em'}}>
									{i === 0 ? <span style={{position: 'absolute', left: -10, top: '14%', height: '74%', width: `calc(${keep * 100}% + 20px)`, maxWidth: 760, background: colors.gold, opacity: 0.4, borderRadius: 6}} /> : null}
									<span style={{position: 'relative'}}>
										{l.split('').map((ch, k) => (
											<span
												key={k}
												style={{
													opacity: k < typed ? 0.72 + 0.28 * random(`${seed}${i}${k}o`) : 0,
													display: 'inline-block',
													transform: `translateY(${(random(`${seed}${i}${k}y`) - 0.5) * 3}px)`,
													whiteSpace: 'pre',
												}}
											>
												{ch}
											</span>
										))}
									</span>
								</div>
							);
						})}
					</div>
				</AbsoluteFill>
			</Camera>
		</AbsoluteFill>
	);
};

/** A company film with burned-in captions along the bottom: crop to the picture above them (scaled from the top),
 *  with a slow push. Used only for archive moments, labelled where it plays. */
export const CaptionCrop: React.FC<{file: string; startFrom: number; keep?: number; rate?: number}> = ({file, startFrom, keep = 0.7, rate = 1}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const s = (1 / keep) * (1 + 0.05 * tween(frame, 0, durationInFrames, 0, 1, ease.camera));
	return (
		<AbsoluteFill style={{overflow: 'hidden', background: '#000'}}>
			<AbsoluteFill style={{transform: `scale(${s})`, transformOrigin: '50% 0%'}}>
				<Footage file={file} startFrom={startFrom} rate={rate} grade="archive" />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
