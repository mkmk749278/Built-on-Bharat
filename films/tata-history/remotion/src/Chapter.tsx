import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {LogoBug, loadBrandFonts} from '../../../../lib/remotion';
import {T, VO_FILE} from './timing';
import {FilmGround} from './v7';

loadBrandFonts();

/**
 * One chapter as its own composition (for stills and shard renders): the chapter's picture plus the VO from the
 * chapter's start, so every preview is in sync with the voice. Frame 0 = the chapter's first frame in the film.
 */
export const chapterComp = (title: string, Body: React.FC): React.FC => {
	const C: React.FC = () => {
		const {start, end} = T.chapter(title);
		return (
			<AbsoluteFill style={{background: '#0D0E11'}}>
				<FilmGround>
					<Body />
				</FilmGround>
				<LogoBug />
				<Audio src={staticFile(VO_FILE)} startFrom={start} endAt={end} />
			</AbsoluteFill>
		);
	};
	C.displayName = `Chapter(${title})`;
	return C;
};
