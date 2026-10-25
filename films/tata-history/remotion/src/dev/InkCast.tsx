import React from 'react';
import {COSTUMES, CostumeName, InkFigure, InkStage, Prop} from '../../../../../lib/remotion/ink';

// Internal check: every costume in a row, lit from the right.
const ROW: {c: CostumeName; prop?: Prop}[] = [
	{c: 'workerCap'},
	{c: 'workerCloth'},
	{c: 'workerKurta'},
	{c: 'workerWoman'},
	{c: 'dhotiKurta', prop: 'pouch'},
	{c: 'clerk'},
	{c: 'elder', prop: 'cane'},
	{c: 'parsi'},
	{c: 'youngMan'},
	{c: 'nauvari', prop: 'pouch'},
	{c: 'nauvariElder'},
	{c: 'boy'},
	{c: 'girl'},
];

export const InkCast: React.FC = () => (
	<InkStage>
		{ROW.map((r, i) => (
			<InkFigure
				key={r.c}
				seed={`cast${i}`}
				costume={COSTUMES[r.c]}
				x={90 + i * 145}
				y={760}
				scale={0.95}
				prop={r.prop}
				action={{type: 'wait', hands: r.prop === 'pouch' ? 'pouch' : r.prop === 'cane' ? 'cane' : 'clasp', glance: false}}
				light={[1900, 300]}
			/>
		))}
	</InkStage>
);
