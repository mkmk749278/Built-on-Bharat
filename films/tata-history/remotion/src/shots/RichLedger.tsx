import React from 'react';
import {AbsoluteFill, random, useCurrentFrame} from 'remotion';
import {Camera, colors, ease, fontStacks, tween} from '../../../../../lib/remotion';

// Cold open: "And yet you won't find a single Tata at the top of any rich list." A gilt-edged ledger of the world's
// richest, as an ILLUSTRATION: rank numbers only, every name and figure a blurred bar (no real person is named or
// implied). A gold scan line runs down the ranks looking for a Tata; at `gapAt` it stops on a row that is empty, a dashed
// outline where a name would be. From `holdFrom` ("How is that possible?") everything stills and dims but that row.

const ROWS = 14;
const ROW_H = 62;
const GAP_ROW = ROWS; // the empty line sits below the list, unnumbered: not on it at all

export const RichLedger: React.FC<{gapAt: number; holdFrom: number}> = ({gapAt, holdFrom}) => {
	const frame = useCurrentFrame();
	const scan = tween(frame, 8, gapAt, 0, GAP_ROW, ease.sweep);
	const rows = ROWS + 1;
	const hold = tween(frame, holdFrom - 6, holdFrom + 24, 0, 1, ease.camera);
	const top = 150;
	return (
		<AbsoluteFill style={{background: '#0D0E11'}}>
			<Camera seed="ledger-cam" drift={2} keys={[{f: 0, scale: 1.0, y: 80, tiltX: 8}, {f: gapAt, scale: 1.14, y: -150, tiltX: 6}, {f: holdFrom + 120, scale: 1.24, y: -210, tiltX: 5}]}>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
					<div
						style={{
							position: 'relative',
							width: 1180,
							height: top + (ROWS + 1) * ROW_H + 80,
							background: 'linear-gradient(170deg, #E9DFC8 0%, #D9CBAA 100%)',
							boxShadow: '0 40px 90px rgba(0,0,0,0.65), inset 0 0 80px rgba(90,60,25,0.4)',
							borderLeft: `14px solid ${colors.gold}`,
						}}
					>
						<div style={{position: 'absolute', top: 54, left: 70, fontFamily: fontStacks.display, fontWeight: 700, fontSize: 40, letterSpacing: '0.24em', color: '#3A2C1A'}}>
							THE RICHEST
						</div>
						<div style={{position: 'absolute', top: 112, left: 70, right: 70, height: 2, background: '#8A6A3A', opacity: 0.6}} />
						{Array.from({length: rows}, (_, i) => {
							const y = top + i * ROW_H;
							const gap = i === GAP_ROW;
							const lit = Math.max(0, 1 - Math.abs(scan - i) * 0.9);
							const dim = gap ? 1 : 1 - 0.55 * hold;
							const w1 = 280 + random(`ln${i}`) * 300;
							const w2 = 120 + random(`lv${i}`) * 90;
							return (
								<div key={i} style={{position: 'absolute', top: y, left: 70, right: 70, height: ROW_H, opacity: dim}}>
									<div style={{position: 'absolute', left: 0, top: 14, fontFamily: fontStacks.numbers, fontSize: 30, fontWeight: 700, color: '#5A4426'}}>
										{gap ? '' : String(i + 1).padStart(2, '0')}
									</div>
									{gap ? (
										<div style={{position: 'absolute', left: 90, top: 16, width: 520, height: 30, border: '2px dashed #8A6A3A', borderRadius: 4, opacity: 0.4 + 0.6 * tween(frame, gapAt - 10, gapAt + 20, 0, 1)}} />
									) : (
										<>
											<div style={{position: 'absolute', left: 90, top: 20, width: w1, height: 22, borderRadius: 11, background: '#6E5634', filter: 'blur(5px)', opacity: 0.6}} />
											<div style={{position: 'absolute', right: 0, top: 20, width: w2, height: 22, borderRadius: 11, background: '#6E5634', filter: 'blur(5px)', opacity: 0.5}} />
										</>
									)}
									<div style={{position: 'absolute', left: -20, right: -20, top: 0, bottom: 0, background: `rgba(229,168,90,${0.28 * lit * (1 - hold)})`, mixBlendMode: 'multiply'}} />
									<div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 1, background: '#8A6A3A', opacity: 0.35}} />
								</div>
							);
						})}
						{/* the scan line */}
						<div
							style={{
								position: 'absolute',
								left: 40,
								right: 40,
								top: top + scan * ROW_H + ROW_H / 2,
								height: 3,
								background: `linear-gradient(90deg, rgba(229,168,90,0), ${colors.gold}, rgba(229,168,90,0))`,
								boxShadow: `0 0 18px ${colors.gold}`,
								opacity: 1 - hold * 0.6,
							}}
						/>
					</div>
				</AbsoluteFill>
			</Camera>
			<AbsoluteFill style={{background: `rgba(0,0,0,${0.35 * hold})`, pointerEvents: 'none'}} />
		</AbsoluteFill>
	);
};
