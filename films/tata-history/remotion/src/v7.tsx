import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {ArchiveTable, CamKey, ease, Footage, Grade, TableMeta} from '../../../../lib/remotion';
import top from './tables/top.json';
import {SatGround} from '../../../../lib/remotion/map';
import {PLATES} from './plates';

// v7 kit (scenes/plan_v7.md): the archive table every document lies on, and archive footage cropped clear of the
// captions some official films burn into their lower frame.

export const TABLE_TOP = top as TableMeta;

export const Table: React.FC<{keys?: CamKey[]; seed?: string; children?: React.ReactNode}> = ({keys, seed, children}) => (
	<ArchiveTable meta={TABLE_TOP} dir="assets/media/table" keys={keys} seed={seed}>
		{children}
	</ArchiveTable>
);

/**
 * Archive footage with a slow push, cropped above a burned-in caption band: `clear` is the share of the frame's
 * height (from the bottom) that must never show. The crop is a scale anchored at `anchor` (CSS origin).
 */
export const ArchiveClip: React.FC<{file: string; startFrom?: number; clear?: number; anchor?: string; grade?: Grade; rate?: number; push?: number}> = ({
	file,
	startFrom = 0,
	clear = 0,
	anchor = '50% 0%',
	grade = 'archive',
	rate = 1,
	push = 0.05,
}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const base = 1 / (1 - clear);
	const s = base * (1 + push * interpolate(frame, [0, durationInFrames], [0, 1], {extrapolateRight: 'clamp', easing: ease.camera}));
	return (
		<AbsoluteFill style={{overflow: 'hidden', background: '#000'}}>
			<AbsoluteFill style={{transform: `scale(${s})`, transformOrigin: anchor}}>
				<Footage file={file} startFrom={startFrom} grade={grade} rate={rate} />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

/** Real ground under every map in the film: the all-India plate first, then the Sentinel-2 close-ups. */
const GROUND = [PLATES.india_bm, ...Object.entries(PLATES).filter(([k]) => k !== 'india_bm' && k !== 'dholera2023').map(([, p]) => p)];
export const FilmGround: React.FC<{children: React.ReactNode}> = ({children}) => <SatGround.Provider value={{plates: GROUND}}>{children}</SatGround.Provider>;
