import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, ease, fontStacks, Stamp, TableDoc, tween} from '../../../../../lib/remotion';
import {MapPin, mapCam, project, SatMap, tiltAt} from '../../../../../lib/remotion/map';
import {PLATES} from '../plates';
import {Table} from '../v7';

/**
 * Dholera from orbit (plan_v7 §3): the same ground in Copernicus Sentinel-2 images, late 2022 and late 2025, dissolving
 * one into the other: new roads, plots and buildings on a salt flat. The stamp says only what the images show (the
 * Dholera industrial region, two dates); it does not mark any building as the chip factory.
 */
export const DholeraFromOrbit: React.FC<{landAt: number}> = ({landAt}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const c = project([72.2, 22.25]);
	const fromIndia = landAt > 0;
	const cam = mapCam(
		fromIndia
			? [
					{f: 0, x: 60, y: -10, zoom: 1.05},
					{f: Math.max(1, landAt + 60), x: c[0], y: c[1], zoom: 150},
					{f: durationInFrames, x: c[0], y: c[1] + 0.3, zoom: 172},
				]
			: [
					{f: 0, x: c[0], y: c[1], zoom: 150},
					{f: durationInFrames, x: c[0] + 0.3, y: c[1], zoom: 168},
				],
		frame,
	);
	const tilt = fromIndia ? tiltAt(frame, [{f: 0, t: 0}, {f: landAt + 60, t: 30}]) : 30;
	// the later image fades in once the camera has arrived
	const later = fromIndia ? tween(frame, landAt + 90, landAt + 200, 0, 1, ease.camera) : 1;
	const d23 = {...PLATES.dholera2023, fade: [0, 0] as [number, number]};
	const d26 = {...PLATES.dholera2026, fade: [0, 0] as [number, number]};
	return (
		<AbsoluteFill>
			<SatMap cam={cam} tilt={tilt} plates={[PLATES.india_bm, d23]} dimOutside={0.5} id="dh23">
				{fromIndia ? <MapPin at={[72.2, 22.25]} from={landAt} cam={cam} label="DHOLERA" sub="GUJARAT" side="right" until={landAt + 80} /> : null}
			</SatMap>
			<AbsoluteFill style={{opacity: later}}>
				<SatMap cam={cam} tilt={tilt} plates={[PLATES.india_bm, d26]} dimOutside={0.5} id="dh26" />
			</AbsoluteFill>
			{fromIndia ? (
				<Stamp
					text={later < 0.5 ? 'DHOLERA · LATE 2022' : 'DHOLERA · LATE 2025'}
					sub="FROM ORBIT · COPERNICUS SENTINEL-2"
					at={landAt + 90}
					until={durationInFrames}
				/>
			) : null}
		</AbsoluteFill>
	);
};

/**
 * "This September, the Tata Sons board voted to give Chandrasekaran another term. Noel Tata voted no." A typed note on
 * the archive table, only the VO's facts, labelled ILLUSTRATION (it is not a document of the meeting).
 */
export const BoardNote: React.FC<{voteAt: number; noAt: number; dur: number}> = ({voteAt, noAt, dur}) => {
	const frame = useCurrentFrame();
	const line = (at: number) => interpolate(frame, [at, at + 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const mark = tween(frame, noAt + 10, noAt + 40, 0, 1, ease.sweep);
	return (
		<Table seed="board" keys={[{f: 0, scale: 1.55, y: 20}, {f: dur, scale: 1.75, y: 40}]}>
			<TableDoc w={24} h={15} x={0} y={0} rot={-1.5} at={4} paper="#ECE4D0" seed="bnote">
				<div style={{padding: '56px 64px', fontFamily: fontStacks.numbers, color: '#2B2318'}}>
					<div style={{fontFamily: fontStacks.display, fontSize: 34, letterSpacing: '0.24em'}}>TATA SONS BOARD · SEPTEMBER 2026</div>
					<div style={{height: 2, background: '#2B2318', opacity: 0.6, margin: '16px 0 34px'}} />
					<div style={{fontSize: 36, opacity: line(voteAt)}}>ANOTHER TERM FOR N. CHANDRASEKARAN</div>
					<div style={{position: 'relative', fontSize: 36, marginTop: 26, opacity: line(noAt), width: 'fit-content'}}>
						<span style={{position: 'absolute', left: -8, top: '10%', height: '80%', width: `calc(${mark * 100}% + 16px)`, background: colors.gold, opacity: 0.45, borderRadius: 4}} />
						<span style={{position: 'relative'}}>NOEL TATA · VOTED NO</span>
					</div>
				</div>
			</TableDoc>
		</Table>
	);
};
