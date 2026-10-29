import React from 'react';
import {AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {
	Atmosphere,
	colors,
	ease,
	Footage,
	FrameSeq,
	fontStacks,
	Grain,
	HonestyTag,
	Kinetic,
	Letterbox,
	LowerThird,
	pop,
	PortraitPlate,
	Stamp,
	TableDoc,
	tween,
	Vignette,
} from '../../../../../lib/remotion';
import {GemCompare, Glint} from '../../../../../lib/remotion/kinetic';
import {YearRoller} from '../../../../../lib/remotion/kinetic';
import {DepthPhoto} from '../../../../../lib/remotion/three/DepthPhoto';
import {MapBombayJamshedpur} from '../dev/map/MapScenes';
import {RichList} from '../shots/RichList';
import {ArchiveClip, Table} from '../v7';
import {Filmstrip} from '../shots/Filmstrip';
import {T} from '../timing';
import {CounterAt} from '../kit';

// Cold open (plan_v6 §4; handoff scenes/00_cold_open.md). Every cut and landing is a VO frame from T.
const CH = T.chapter('Cold open');
const L = (f: number): number => f - CH.start; // film frame → chapter-local frame
const S = (text: string, after = 0): number => L(T.sentence(text, after).startFrame);
const E = (text: string, after = 0): number => L(T.sentence(text, after).endFrame);
const W = (sentence: string, phrase: string, after = 0): number => L(T.word(sentence, phrase, after).startFrame);
const id = (text: string): number => T.sentence(text).id;

const M = 'assets/media';
// The bank counter: Blender shots c1-c3 (scripts/blender/counter.py), rendered every 2nd frame on the farm.
const COUNTER = `${M}/blender`;

const f = {
	bombay: S('Bombay.'),
	year: S('Nineteen twenty four'),
	man: S('A man walks into a bank'),
	diamondWord: W('A man walks into a bank', 'diamond'),
	carats: S('Two hundred and forty five carats'),
	caratsWord: W('Two hundred and forty five carats', 'carats'),
	more: S('More than twice the size'),
	twice: W('More than twice the size', 'twice'),
	kohinoor: W('More than twice the size', 'kohinoor'),
	sell: S('Is he here to sell it'),
	no: S('No.', id('Is he here to sell it')),
	loan: S('He wants a loan'),
	guarantee: W('He wants a loan', 'guarantee'),
	ask: S('Ask any Indian family'),
	last: S("It's the last thing you do"),
	nothing: S('When there is nothing else left'),
	why: S('So why is he doing it'),
	because: S('Because more than fourteen hundred'),
	kms: W('Because more than fourteen hundred', 'kilometres'),
	town: W('Because more than fourteen hundred', 'steel town'),
	thousands: W('Because more than fourteen hundred', 'thousands'),
	company: S('And the company that pays them'),
	never: S('You may never have heard his name'),
	sir: S('Sir Dorabji Tata'),
	steel: S('The company is Tata Steel'),
	look: S('Now look around you today'),
	salt: S('The salt in your kitchen'),
	tea: S('The tea in your cup'),
	bridges: S('The steel in our bridges'),
	plane: S('Maybe even the plane over your head'),
	tata: S('Tata.', id('Maybe even the plane over your head')),
	yet: S('And yet you won'),
	how: S('How is that possible'),
	answer: S('The answer is in this bank'),
	what: S('In what happens to that diamond'),
	choice: S('A choice this man makes'),
	eight: W('A choice this man makes', 'eight years later'),
	controls: W('A choice this man makes', 'controls'),
	y2026: S('And in twenty twenty six'),
	fight: W('And in twenty twenty six', 'fight'),
	but: S('But to understand why'),
	beginning: S('And the beginning is not what you think'),
	palace: S("It's not a palace"),
	priests: S("It's a family of priests"),
	gujarat: W("It's a family of priests", 'gujarat'),
	end: CH.end - CH.start,
};

/** A shot: a Sequence from `a` to `b` (chapter-local), with an optional fade-in and the standard atmosphere. */
const Shot: React.FC<{a: number; b: number; children: React.ReactNode; name: string; fadeIn?: number; atmos?: boolean; leak?: string | false}> = ({
	a,
	b,
	children,
	name,
	fadeIn = 0,
	atmos = true,
	leak = false,
}) => (
	<Sequence from={a} durationInFrames={Math.max(1, b - a)} name={name}>
		<FadeIn frames={fadeIn}>{children}</FadeIn>
		{atmos ? <Atmosphere leak={leak} dust seed={name} /> : null}
	</Sequence>
);

const FadeIn: React.FC<{frames: number; children: React.ReactNode}> = ({frames, children}) => {
	const frame = useCurrentFrame();
	return <AbsoluteFill style={{opacity: frames ? tween(frame, 0, frames, 0, 1, ease.arrive) : 1}}>{children}</AbsoluteFill>;
};

/** Four modern shots for "look around you today": each cut on its sentence, a slow push inside. */
const Today: React.FC = () => {
	const frame = useCurrentFrame();
	const push = (a: number) => 1.04 + 0.05 * tween(frame, a, a + 90, 0, 1);
	const at = (x: number) => x - f.look;
	return (
		<AbsoluteFill>
			<Sequence from={0} durationInFrames={at(f.salt)}>
				<AbsoluteFill style={{transform: `scale(${push(0)})`}}>
					<Footage file={`${M}/pix/pixabay_30329.mp4`} startFrom={60} grade="modern" />
				</AbsoluteFill>
			</Sequence>
			<Sequence from={at(f.salt)} durationInFrames={at(f.tea) - at(f.salt)}>
				<DepthPhoto file={`${M}/pix/pixabay_6728600.jpg`} keys={[{f: 0, dolly: 0.02, x: 0.02}, {f: 90, dolly: 0.1, x: 0.03}]} depth={0.1} grade="modern" />
			</Sequence>
			<Sequence from={at(f.tea)} durationInFrames={at(f.bridges) - at(f.tea)}>
				<AbsoluteFill style={{transform: `scale(${push(at(f.tea))})`}}>
					<Footage file={`${M}/pix/pixabay_30329.mp4`} startFrom={0} grade="modern" />
				</AbsoluteFill>
			</Sequence>
			<Sequence from={at(f.bridges)} durationInFrames={at(f.plane) - at(f.bridges)}>
				<AbsoluteFill style={{transform: `scale(${1.25 + 0.06 * tween(frame, at(f.bridges), at(f.plane), 0, 1)})`, transformOrigin: '62% 46%'}}>
					<Footage file={`${M}/pix/pixabay_107597.mp4`} startFrom={120} grade="modern" />
				</AbsoluteFill>
			</Sequence>
			<Sequence from={at(f.plane)} durationInFrames={at(f.yet) - at(f.plane)}>
				<AbsoluteFill style={{transform: `scale(${push(at(f.plane))})`}}>
					<Footage file={`${M}/pix/pixabay_35780.mp4`} startFrom={0} grade="modern" />
				</AbsoluteFill>
			</Sequence>
		</AbsoluteFill>
	);
};

const DIAMOND = `${M}/blender`;

export const ColdOpen: React.FC = () => {
	const frame = useCurrentFrame();
	const bars = tween(frame, f.man - 20, f.man + 20, 0, 1) * (1 - tween(frame, f.ask - 20, f.ask + 10, 0, 1));
	return (
		<AbsoluteFill style={{background: '#0B0B0C'}}>
			{/* 1 · Bombay, 1924: a real street, the camera moving through it */}
			<Shot a={0} b={f.man} name="street">
				<DepthPhoto file={`${M}/A001a.jpg`} keys={[{f: 0, dolly: 0, x: -0.015}, {f: f.man, dolly: 0.2, x: 0.015}]} depth={0.24} grade="archive" />
				<Stamp text="BOMBAY · 1924" at={f.year - 6} until={f.man} />
			</Shot>

			{/* 2 · the bank: the case slides into the lamp pool, landing on "diamond" */}
			<Shot a={f.man} b={f.carats} name="counter-1">
				<FrameSeq dir={`${COUNTER}/c1`} prefix="c1_" last={210} />
				<HonestyTag text="RECONSTRUCTION" />
			</Shot>

			{/* 3 · the stone: Blender hero shot; 245 lands on "carats" */}
			<Shot a={f.carats} b={f.more} name="diamond-hero">
				<FrameSeq dir={`${DIAMOND}/hero`} prefix="hero_" last={298} />
				<CounterAt to={245} start={6} land={f.caratsWord - f.carats} suffix=" CARATS" size={72} y={330} />
				<HonestyTag text="RECONSTRUCTION" />
			</Shot>

			{/* 4 · to scale beside the Koh-i-Noor as it is today */}
			<Shot a={f.more} b={f.sell} name="gems" leak={colors.ember}>
				<AbsoluteFill style={{background: 'radial-gradient(ellipse 70% 60% at 50% 45%, #17181C 0%, #0B0B0C 75%)'}} />
				<GemCompare kohinoorAt={f.kohinoor - f.more - 20} jubileeAt={f.twice - f.more} />
			</Shot>

			{/* 5 · not to sell: a loan, the diamond as the guarantee */}
			<Shot a={f.sell} b={f.ask} name="counter-2">
				<FrameSeq dir={`${COUNTER}/c2`} prefix="c2_" last={322} />
				{/* the stone catches the light as the lid settles: on the crown edge the render already lights */}
				<Glint x={1128} y={686} at={284} size={180} />
				<Glint x={868} y={646} at={298} size={110} dur={24} />
				<HonestyTag text="RECONSTRUCTION" />
			</Shot>

			{/* 6 · the house gold (plan_v7): a real hand, real bangles; the light drops on "nothing else left" */}
			<Shot a={f.ask} b={f.last} name="house-gold" fadeIn={10}>
				<DepthPhoto file={`${M}/cm/cm_4-bangles-jpg.jpg`} keys={[{f: 0, dolly: 0.02, x: 0.012}, {f: f.last - f.ask, dolly: 0.17, x: -0.01}]} depth={0.16} grade="furnace" />
			</Shot>
			<Shot a={f.last} b={f.why} name="last-thing">
				{/* a cut-in on the same bangles: tighter, the light going */}
				<DepthPhoto file={`${M}/cm/cm_4-bangles-jpg.jpg`} keys={[{f: 0, dolly: 0.24, x: 0.085, y: -0.01}, {f: f.why - f.last, dolly: 0.32, x: 0.08, y: 0.0}]} depth={0.16} grade="furnace" />
				<AbsoluteFill style={{background: '#050403', opacity: tween(frame - f.last, f.nothing - f.last, f.why - f.last, 0, 0.55, ease.leave)}} />
			</Shot>

			{/* 7 · so why: the man and his wife, their own photograph (BnF, public domain) */}
			<Shot a={f.why} b={f.because} name="the-couple-co">
				<DepthPhoto file={`${M}/A005e.jpg`} keys={[{f: 0, dolly: 0.2, x: 0.07}, {f: f.because - f.why, dolly: 0.22, x: -0.07}]} depth={0.16} grade="archive" />
			</Shot>

			{/* 8 · 1,400 km away: the map, then the queue at the pay window */}
			<Shot a={f.because} b={f.thousands} name="map" atmos={false}>
				<MapBombayJamshedpur dur={f.thousands - f.because} />
			</Shot>
			{/* the workers and the works: Tata Steel's own archive film, cropped clear of its captions */}
			<Shot a={f.thousands} b={f.company} name="worker" leak={colors.ember}>
				{/* v8: the early works (period photographs at 0:44–0:49 of the centenary film); 0:50 on is modern, graded sepia */}
				<ArchiveClip file={`${M}/footage/Y04_jamshedpur_100.mp4`} startFrom={48 * 60} rate={0.4} clear={0.26} anchor="50% 0%" grade="furnace" />
				<Stamp text="JAMSHEDPUR" sub="THE EARLY WORKS · FROM A TATA STEEL FILM" at={10} until={f.company - f.thousands} />
			</Shot>
			<Shot a={f.company} b={f.never} name="works" leak={colors.ember}>
				<ArchiveClip file={`${M}/footage/Y04_jamshedpur_100.mp4`} startFrom={44 * 60} rate={0.5} clear={0.26} anchor="50% 0%" grade="furnace" />
			</Shot>

			{/* 9 · Sir Dorabji Tata; Tata Steel */}
			<Shot a={f.never} b={f.look} name="dorabji">
				<PortraitPlate file={`${M}/A005d.jpg`} place={`${M}/A001a.jpg`} side="right" share={0.52} focus="50% 22%" />
				<LowerThird name="SIR DORABJI TATA" role="1859 – 1932" at={f.sir - f.never + 10} until={f.steel - f.never - 4} />
				<Stamp text="TATA STEEL" sub="JAMSHEDPUR" at={f.steel - f.never} until={f.look - f.never} />
			</Shot>

			{/* 10 · today: salt, tea, a bridge, a plane overhead */}
			<Shot a={f.look} b={f.yet} name="today" leak={false}>
				<Today />
				<Sequence from={f.tata - f.look - 4}>
					<Filmstrip />
				</Sequence>
			</Shot>

			{/* 11 · and yet: no Tata on any rich list */}
			<Shot a={f.yet} b={f.answer} name="ledger">
				<RichList dur={f.answer - f.yet} holdFrom={f.how - f.yet} />
				<HonestyTag text="ILLUSTRATION" />
			</Shot>

			{/* 12 · the answer is in this bank (plan_v7: on the archive table, not the counter again): the Imperial Bank's
			    seal; her photograph; his; the years roll to 1932 */}
			<Shot a={f.answer} b={f.y2026} name="the-choice">
				<Table
					seed="choice"
					keys={[
						{f: 0, scale: 1.9, x: -230, y: -40},
						{f: f.what - f.answer, scale: 1.55, x: 60, y: 0},
						{f: f.choice - f.answer, scale: 1.3, x: 40, y: 10},
						{f: f.y2026 - f.answer, scale: 1.36, x: 30, y: 10},
					]}
				>
					<TableDoc w={11} h={10.7} x={9} y={-1} rot={5} at={-30} paper="#E6DABE" seed="seal">
						<Img src={staticFile(`${M}/raw/wm/F_06_sbi-imperial-bank-seal-jpg.jpg`)} style={{width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'multiply'}} />
					</TableDoc>
					<TableDoc w={9.5} h={19.5} x={-5} y={0} rot={-4} at={f.what - f.answer} paper="#F1EADB" seed="meh">
						<Img src={staticFile(`${M}/E003a.jpg`)} style={{position: 'absolute', inset: 14, width: 'calc(100% - 28px)', height: 'calc(100% - 28px)', objectFit: 'cover', filter: 'sepia(0.3) contrast(1.06)'}} />
					</TableDoc>
					<TableDoc w={13} h={15.2} x={-17} y={1} rot={3} at={f.choice - f.answer} paper="#F1EADB" seed="dor2">
						<Img src={staticFile(`${M}/A005d.jpg`)} style={{position: 'absolute', inset: 16, width: 'calc(100% - 32px)', height: 'calc(100% - 32px)', objectFit: 'cover', filter: 'sepia(0.3) contrast(1.06)'}} />
					</TableDoc>
				</Table>
				<Sequence from={f.choice - f.answer}>
					<YearRoller from={1924} to={1932} start={8} land={f.eight - f.choice} />
				</Sequence>
			</Shot>
			{/* 13 · twenty twenty six: Bombay House, the fight */}
			<Shot a={f.y2026} b={f.but} name="bombay-house">
				<DepthPhoto file={`${M}/raw/wm/A005_02_bombay-house-mast-jpg.jpg`} keys={[{f: 0, dolly: 0.04}, {f: f.but - f.y2026, dolly: 0.16}]} depth={0.14} grade="steel" />
				<Stamp text="BOMBAY HOUSE · 2026" at={6} until={f.but - f.y2026} />
				<Kinetic text="THE TRUSTS" at={f.fight - f.y2026} until={f.but - f.y2026} x={-360} y={-140} display />
				<Kinetic text="TATA SONS" at={f.fight - f.y2026 + 8} until={f.but - f.y2026} x={360} y={-140} display />
			</Shot>

			{/* 14 · the stone warms to furnace orange; we go back to the beginning */}
			<Shot a={f.but} b={f.beginning} name="the-plant" leak={colors.ember}>
				<ArchiveClip file={`${M}/footage/Y05_steelmaking.mp4`} startFrom={120 * 60} rate={0.6} anchor="50% 50%" grade="furnace" />
			</Shot>
			<Shot a={f.beginning} b={f.end} name="priests" fadeIn={16}>
				<DepthPhoto file={`${M}/B019a.jpg`} keys={[{f: 0, dolly: 0.0, x: -0.02}, {f: f.end - f.beginning, dolly: 0.2, x: 0.02}]} depth={0.2} grade="furnace" />
			</Shot>

			<Letterbox amount={bars} />
			<Vignette strength={0.25} />
			<Grain opacity={0.08} id="co-g" />
		</AbsoluteFill>
	);
};

export const coldOpenFrames = f;
