import React from 'react';
import {useCurrentFrame} from 'remotion';
import {colors, ease, fontStacks, TableDoc, tween} from '../../../../../lib/remotion';
import {Table} from '../v7';

/**
 * "And yet you won't find a single Tata at the top of any rich list" (ILLUSTRATION): a ruled register on the archive
 * table, headed India's richest, with no names at all (v9: the grey name-bars of v8 read as unfinished on a phone, and
 * any invented name would read as fake). A bronze pencil does the looking: a pencilled "Tata?" runs down the margin row
 * by row as the voice says it, and on "How is that possible?" it stops below the last line and is struck through.
 */
export const RichList: React.FC<{dur: number; holdFrom: number}> = ({dur, holdFrom}) => {
	const frame = useCurrentFrame();
	const rows = 10;
	const rowH = 76;
	const search = tween(frame, 20, holdFrom, 0, rows, ease.sweep);
	const strike = tween(frame, holdFrom + 6, holdFrom + 30, 0, 1, ease.arrive);
	const lit = (i: number) => Math.max(0, 1 - Math.abs(search - i - 0.5) * 0.8) * (1 - strike);
	return (
		<Table seed="rich" keys={[{f: 0, scale: 1.55, y: 240}, {f: holdFrom, scale: 1.72, y: 300}, {f: dur, scale: 1.8, y: 312}]}>
			<TableDoc w={22} h={30} x={1} y={2} rot={-2} at={-200} paper="#EDE4CF" seed="rich-doc">
				<div style={{padding: '70px 64px', fontFamily: fontStacks.text, color: '#2B2318'}}>
					<div style={{fontFamily: fontStacks.display, fontSize: 44, letterSpacing: '0.22em', marginBottom: 10}}>INDIA'S RICHEST</div>
					<div style={{height: 3, background: '#2B2318', opacity: 0.7, marginBottom: 20}} />
					{new Array(rows).fill(0).map((_, i) => (
						<div key={i} style={{position: 'relative', display: 'flex', alignItems: 'flex-end', height: rowH, borderBottom: '1.5px solid rgba(43,35,24,0.32)'}}>
							<div style={{width: 70, paddingBottom: 10, fontFamily: fontStacks.numbers, fontSize: 34, fontVariantNumeric: 'lining-nums', opacity: 0.8}}>{i + 1}.</div>
							<div style={{position: 'absolute', left: 60, right: 0, top: 6, bottom: 6, background: `rgba(197,125,60,${0.16 * lit(i)})`}} />
						</div>
					))}
					{/* the pencilled search: "Tata?" walks down the margin and ends below the list, struck through */}
					<div
						style={{
							position: 'absolute',
							right: 70,
							top: 156 + Math.min(search, rows) * rowH - 52,
							fontFamily: fontStacks.text,
							fontStyle: 'italic',
							fontSize: 52,
							color: colors.bronze,
							opacity: tween(frame, 10, 30, 0, 1),
						}}
					>
						Tata?
						<div style={{position: 'absolute', left: -8, right: -8, top: '54%', height: 4, background: colors.bronze, transform: `scaleX(${strike})`, transformOrigin: '0 50%'}} />
					</div>
				</div>
			</TableDoc>
		</Table>
	);
};
