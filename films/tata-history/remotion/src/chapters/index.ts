import React from 'react';
import {ColdOpen} from './ColdOpen';
import {Dreamer} from './Dreamer';

// Chapter registry: id (composition id) → chapter title in vo.txt (must match timing.json) → component.
export type ChapterDef = {id: string; title: string; Body: React.FC};
export const CHAPTERS: ChapterDef[] = [
	{id: 'Ch00-ColdOpen', title: 'Cold open', Body: ColdOpen},
	{id: 'Ch01-Dreamer', title: 'The dreamer', Body: Dreamer},
];
