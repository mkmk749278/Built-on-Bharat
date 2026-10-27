import React from 'react';
import {ColdOpen} from './ColdOpen';
import {Dreamer} from './Dreamer';
import {Letter} from './Letter';
import {Eight} from './Eight';
import {Diamond} from './Diamond';
import {Pilot} from './Pilot';
import {Humiliation} from './Humiliation';

// Chapter registry: id (composition id) → chapter title in vo.txt (must match timing.json) → component.
export type ChapterDef = {id: string; title: string; Body: React.FC};
export const CHAPTERS: ChapterDef[] = [
	{id: 'Ch00-ColdOpen', title: 'Cold open', Body: ColdOpen},
	{id: 'Ch01-Dreamer', title: 'The dreamer', Body: Dreamer},
	{id: 'Ch02-Letter', title: 'The letter', Body: Letter},
	{id: 'Ch03-Eight', title: 'The eight thousand', Body: Eight},
	{id: 'Ch04-Diamond', title: 'The diamond', Body: Diamond},
	{id: 'Ch05-Pilot', title: 'The pilot', Body: Pilot},
	{id: 'Ch06-Humiliation', title: 'The humiliation', Body: Humiliation},
];
