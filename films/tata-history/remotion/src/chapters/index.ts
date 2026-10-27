import React from 'react';
import {ColdOpen} from './ColdOpen';
import {Dreamer} from './Dreamer';
import {Letter} from './Letter';

// Chapter registry: id (composition id) → chapter title in vo.txt (must match timing.json) → component.
export type ChapterDef = {id: string; title: string; Body: React.FC};
export const CHAPTERS: ChapterDef[] = [
	{id: 'Ch00-ColdOpen', title: 'Cold open', Body: ColdOpen},
	{id: 'Ch01-Dreamer', title: 'The dreamer', Body: Dreamer},
	{id: 'Ch02-Letter', title: 'The letter', Body: Letter},
];
