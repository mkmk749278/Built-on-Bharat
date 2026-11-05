import React from 'react';
import {AbsoluteFill, Audio, Composition, Sequence, staticFile} from 'remotion';
import {loadBrandFonts} from '../../../../lib/remotion';
import {ChannelBug, loadBpkFonts} from './bpk';
import {chapterComp} from './Chapter';
// ---- S2 dev systems (begin) ----
import {DevCompositions} from './dev';
// ---- S2 dev systems (end) ----
import {CHAPTERS} from './chapters';
import {FPS, T, VO_FILE} from './timing';
import {FilmGround} from './v7';

loadBrandFonts();
loadBpkFonts();

const Film: React.FC = () => (
	<AbsoluteFill style={{background: '#0D0E11'}}>
		<FilmGround>
			{CHAPTERS.map(({title, Body}) => {
				const {start, end} = T.chapter(title);
				return (
					<Sequence key={title} from={start} durationInFrames={end - start} name={title}>
						<Body />
					</Sequence>
				);
			})}
		</FilmGround>
		<ChannelBug hideFrom={T.chapter('Outro').start} />
		<Audio src={staticFile(VO_FILE)} />
	</AbsoluteFill>
);

export const Root: React.FC = () => (
	<>
		<Composition id="TataHistory" component={Film} durationInFrames={T.json.durationInFrames} fps={FPS} width={1920} height={1080} />
		{CHAPTERS.map(({id, title, Body}) => {
			const {start, end} = T.chapter(title);
			return (
				<Composition
					key={id}
					id={id}
					component={chapterComp(title, Body)}
					durationInFrames={end - start}
					fps={FPS}
					width={1920}
					height={1080}
				/>
			);
		})}
		{/* ---- S2 dev systems (begin): Dev-* compositions for the shared systems, see src/dev/ ---- */}
		<DevCompositions />
		{/* ---- S2 dev systems (end) ---- */}
	</>
);
