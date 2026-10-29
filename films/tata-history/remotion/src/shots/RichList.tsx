import React from 'react';
import {random, useCurrentFrame} from 'remotion';
import {colors, ease, fontStacks, TableDoc, tween} from '../../../../../lib/remotion';
import {Table} from '../v7';

/**
 * "And yet you won't find a single Tata at the top of any rich list" (ILLUSTRATION): a typed list of India's richest
 * on the archive table, its rows soft ink strokes with no letters (v8), so no row can be read as a real or invented name. The
 * camera runs down the list as the voice says it; on "How is that possible?" it stops on the empty top line.
 */
export const RichList: React.FC<{dur: number; holdFrom: number}> = ({dur, holdFrom}) => {
	const frame = useCurrentFrame();
	// v8: no letterforms at all (an invented name reads as fake on pause, blur or not): each row is a ruled line with
	// a soft ink stroke where a name would sit, and no figures.
	const rows = new Array(16).fill(0).map((_, i) => ({w: 38 + random(`w${i}`) * 40, w2: 8 + random(`v${i}`) * 10}));
	const mark = tween(frame, holdFrom, holdFrom + 30, 0, 1, ease.arrive);
	return (
		<Table seed="rich" keys={[{f: 0, scale: 1.55, y: 260}, {f: holdFrom, scale: 1.75, y: 330}, {f: dur, scale: 1.82, y: 345}]}>
			<TableDoc w={22} h={30} x={1} y={2} rot={-2} at={-200} paper="#EDE4CF" seed="rich-doc">
				<div style={{padding: '70px 64px', fontFamily: fontStacks.text, color: '#2B2318'}}>
					<div style={{fontFamily: fontStacks.display, fontSize: 40, letterSpacing: '0.24em', marginBottom: 10}}>INDIA'S RICHEST</div>
					<div style={{height: 3, background: '#2B2318', opacity: 0.7, marginBottom: 26}} />
					{rows.map((r, i) => (
						<div key={i} style={{display: 'flex', alignItems: 'center', height: 66, borderBottom: '1px solid rgba(43,35,24,0.25)'}}>
							<div style={{width: 60, fontFamily: fontStacks.numbers, fontSize: 30, fontVariantNumeric: 'lining-nums'}}>{i + 1}</div>
							<div style={{flex: 1, display: 'flex', alignItems: 'center', gap: 14, filter: `blur(${2.2 + (i % 3) * 0.5}px)`}}>
								<div style={{height: 13, width: `${r.w}%`, borderRadius: 7, background: '#2B2318', opacity: 0.5}} />
								<div style={{height: 13, width: `${r.w2}%`, borderRadius: 7, background: '#2B2318', opacity: 0.35}} />
							</div>
						</div>
					))}
					{/* no Tata on it: a bronze pencil line under the header, where the eye looks for one */}
					<div style={{position: 'absolute', left: 64, top: 136, height: 4, width: `${mark * 70}%`, background: colors.bronze, opacity: 0.8}} />
				</div>
			</TableDoc>
		</Table>
	);
};
