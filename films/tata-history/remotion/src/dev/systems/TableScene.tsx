import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {ArchiveTable, TableDoc, colors, ease, fontStacks, Grain, tween, Vignette} from '../../../../../../lib/remotion';
import {TABLE_TOP} from '../../v7';

// Dev: the archive table with a quote and a photograph (plan_v7 §2.3).
export const TableScene: React.FC = () => {
	const frame = useCurrentFrame();
	const sweep = tween(frame, 90, 150, 0, 1, ease.sweep);
	return (
		<>
			<ArchiveTable meta={TABLE_TOP} dir="assets/media/table" keys={[{f: 0, scale: 1.0}, {f: 300, scale: 1.12, y: 20}]}>
				<TableDoc w={14} h={18} x={-9} y={-1} rot={-6} at={4} paper="#F2EBDD" seed="ph">
					<div style={{position: 'absolute', inset: 24}}>
						<Img src={staticFile('assets/media/B003b.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.4) contrast(1.1)'}} />
					</div>
				</TableDoc>
				<TableDoc w={26} h={14} x={6} y={2} rot={2.5} at={30} seed="q">
					<div style={{padding: '60px 70px', fontFamily: fontStacks.quote, color: '#2E2418'}}>
						{['Why, I will undertake to eat', 'every pound of steel rail', 'they succeed in making.'].map((l, i) => (
							<div key={i} style={{position: 'relative', fontSize: 58, lineHeight: 1.4, fontStyle: 'italic', width: 'fit-content'}}>
								{i === 1 ? <span style={{position: 'absolute', left: -8, top: '12%', height: '78%', width: `calc(${sweep * 100}% + 16px)`, background: colors.gold, opacity: 0.45, borderRadius: 6, mixBlendMode: 'multiply'}} /> : null}
								<span style={{position: 'relative'}}>{l}</span>
							</div>
						))}
						<div style={{marginTop: 26, fontFamily: fontStacks.display, fontSize: 24, letterSpacing: '0.26em', color: '#5A4426'}}>— SIR FREDERICK UPCOTT · AS TOLD IN TATA'S HISTORIES</div>
					</div>
				</TableDoc>
			</ArchiveTable>
			<Vignette strength={0.35} />
			<Grain opacity={0.08} id="tbl-g" />
		</>
	);
};
