import React from 'react';
import {random, useCurrentFrame} from 'remotion';
import {colors, ease, fontStacks, TableDoc, tween} from '../../../../../lib/remotion';
import {Table} from '../v7';

/**
 * "And yet you won't find a single Tata at the top of any rich list" (ILLUSTRATION): a typed list of India's richest
 * on the archive table, its rows out of focus (seeded nonsense, so no row can be read as a real name or number). The
 * camera runs down the list as the voice says it; on "How is that possible?" it stops on the empty top line.
 */
export const RichList: React.FC<{dur: number; holdFrom: number}> = ({dur, holdFrom}) => {
	const frame = useCurrentFrame();
	const word = (seed: string, n: number) =>
		new Array(n)
			.fill(0)
			.map((_, i) => String.fromCharCode(97 + Math.floor(random(`${seed}${i}`) * 26)))
			.join('');
	const rows = new Array(16).fill(0).map((_, i) => ({
		name: `${word(`a${i}`, 5 + Math.floor(random(`l${i}`) * 4))} ${word(`b${i}`, 6 + Math.floor(random(`m${i}`) * 5))}`,
		figure: `${(9 - i * 0.5 + random(`f${i}`)).toFixed(1)}`,
	}));
	const mark = tween(frame, holdFrom, holdFrom + 30, 0, 1, ease.arrive);
	return (
		<Table seed="rich" keys={[{f: 0, scale: 1.55, y: 260}, {f: holdFrom, scale: 1.75, y: 330}, {f: dur, scale: 1.82, y: 345}]}>
			<TableDoc w={22} h={30} x={1} y={2} rot={-2} at={-200} paper="#EDE4CF" seed="rich-doc">
				<div style={{padding: '70px 64px', fontFamily: fontStacks.text, color: '#2B2318'}}>
					<div style={{fontFamily: fontStacks.display, fontSize: 40, letterSpacing: '0.24em', marginBottom: 10}}>INDIA'S RICHEST</div>
					<div style={{height: 3, background: '#2B2318', opacity: 0.7, marginBottom: 26}} />
					{rows.map((r, i) => (
						<div key={i} style={{display: 'flex', alignItems: 'baseline', height: 66, borderBottom: '1px solid rgba(43,35,24,0.25)'}}>
							<div style={{width: 60, fontFamily: fontStacks.numbers, fontSize: 30}}>{i + 1}</div>
							{/* depth of field: every name soft */}
							<div style={{flex: 1, fontSize: 34, filter: `blur(${5.5 + (i % 3) * 0.8}px)`, textTransform: 'capitalize'}}>{r.name}</div>
							<div style={{width: 120, textAlign: 'right', fontFamily: fontStacks.numbers, fontSize: 30, filter: 'blur(4.5px)'}}>{r.figure}</div>
						</div>
					))}
					{/* no Tata on it: a bronze pencil line under the header, where the eye looks for one */}
					<div style={{position: 'absolute', left: 64, top: 136, height: 4, width: `${mark * 70}%`, background: colors.bronze, opacity: 0.8}} />
				</div>
			</TableDoc>
		</Table>
	);
};
