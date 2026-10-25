import React from 'react';
import {AbsoluteFill, Audio, Composition, Sequence, staticFile} from 'remotion';
import {LogoBug, loadBrandFonts} from '../../../../lib/remotion';
import {chapterComp} from './Chapter';
import {CHAPTERS} from './chapters';
import {FPS, T, VO_FILE} from './timing';

loadBrandFonts();

const Film: React.FC = () => (
	<AbsoluteFill style={{background: '#0D0E11'}}>
		{CHAPTERS.map(({title, Body}) => {
			const {start, end} = T.chapter(title);
			return (
				<Sequence key={title} from={start} durationInFrames={end - start} name={title}>
					<Body />
				</Sequence>
			);
		})}
		<LogoBug />
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
	</>
);
