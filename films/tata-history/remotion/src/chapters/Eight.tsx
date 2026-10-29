import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {Camera, colors, Embers, Footage, Kinetic, QuoteCard, Stamp, tween} from '../../../../../lib/remotion';
import {BlastFurnace, camAt, furnaceCamKeys, FurnaceTimeline} from '../../../../../lib/remotion/furnace/BlastFurnace';
import {InkPaper} from '../../../../../lib/remotion/ink';
import {YearRoller} from '../../../../../lib/remotion/kinetic';
import {Crowd1907} from '../dev/ink/Crowd1907';
import {DepthPhoto} from '../../../../../lib/remotion/three/DepthPhoto';
import {ArchiveClip} from '../v7';
import {TablePhoto} from '../v7';
import {chapterClock, CounterAt, DeskPrint, Photo, Shot} from '../kit';
import {PLACES} from '../../../../../lib/remotion/map';
import {PlaceMap} from '../shots/ch1';
import {TapeFrame} from '../shots/ch3';

// Chapter 3, The eight thousand (plan_v6 §4 ch 3): the share office, Sahlin's words, the coins, the counter →
// standing in the line under the Raj → Upcott's boast → the furnace cutaway and real molten iron → 1911/1912 → war
// rails → the indigestion reply → Jamshedpur → the other dreams → "It isn't." 1 min 57 s.
const C = chapterClock('The eight thousand');
const {S, W} = C;

const f = {
	office: S('The share office opens'),
	who: S('Who are they?'),
	wrote: S('One man who was there'),
	old: S('Old and young, he said'),
	mites: S('They came, offering their mites'),
	coins: S('Their mites.'),
	weeks: S('In a matter of weeks'),
	eight: W('In a matter of weeks', 'thousand'),
	crore: S('Two crore thirty one lakh rupees'),
	crWord: W('Two crore thirty one lakh rupees', 'rupees'),
	imagine: S("Now imagine you're standing"),
	raj: S('India is ruled by Britain'),
	saved: S("You've saved this money slowly"),
	bet: S("And you're about to bet it"),
	would: S('Would you have done it'),
	believed: S('Not everyone believed'),
	upcott: S("According to Tata's own histories"),
	eat: S('He said he would eat'),
	how: S('So how do you turn a hill'),
	tower: S('You build a tower of fire'),
	ore: S('Iron ore, limestone and baked coal'),
	lime: W('Iron ore, limestone and baked coal', 'limestone'),
	coal: W('Iron ore, limestone and baked coal', 'coal'),
	blast: S('Hot air blasts in at the bottom'),
	pours: S('And out pours iron'),
	lava: W('And out pours iron', 'lava'),
	iron1911: S('The first iron flows'),
	steel1912: S('The first steel, in nineteen twelve'),
	war: S('Then the First World War comes'),
	rails: S("Britain's armies need rails"),
	reply: S('Years later, as the Tata story goes'),
	indigestion: S('If he had kept his promise'),
	y1919: S('In nineteen nineteen'),
	jamshedpur: S('Jamshedpur.'),
	after: S('After the man who never saw it'),
	other: S('His other dreams come true too'),
	opens: S('The institute opens in Bangalore'),
	lakes: S('And monsoon lakes'),
	gone: S('So the dreamer is gone'),
	happy: S('It should be a happy ending'),
	isnt: S("It isn't."),
	end: C.end,
};

const UPCOTT = ['Why, I will undertake to eat', 'every pound of steel rail', 'they succeed in making.'];

/** The furnace cutaway, its charges and tap on the voice's words (frames local to the shot). */
export const Furnace: React.FC<{tl: FurnaceTimeline}> = ({tl}) => {
	const frame = useCurrentFrame();
	const cam = camAt(furnaceCamKeys(tl), frame);
	return (
		<AbsoluteFill style={{background: '#0D0E11'}}>
			<InkPaper grid={0.09} />
			<BlastFurnace cam={cam} timeline={tl} />
			<Embers count={30} seed="bf-emb" intensity={0.5} />
		</AbsoluteFill>
	);
};

/** A warm glow that dies to black: "It should be a happy ending". */
const WarmHold: React.FC<{children: React.ReactNode}> = ({children}) => {
	const frame = useCurrentFrame();
	return (
		<AbsoluteFill>
			{children}
			<AbsoluteFill style={{background: `rgba(255,150,60,${0.12 * tween(frame, 0, 60, 0, 1)})`, mixBlendMode: 'soft-light'}} />
		</AbsoluteFill>
	);
};

/** The lamp on the archive table going down: the edges first, the photograph last, never to black. */
const LampDown: React.FC<{from: number; to: number}> = ({from, to}) => {
	const k = tween(useCurrentFrame(), from, to, 0, 1);
	return (
		<AbsoluteFill
			style={{
				background: `radial-gradient(ellipse 34% 46% at 50% 48%, rgba(5,5,6,${0.35 * k}) 0%, rgba(5,5,6,${0.8 * k}) 70%, rgba(5,5,6,${0.9 * k}) 100%)`,
				pointerEvents: 'none',
			}}
		/>
	);
};

export const Eight: React.FC = () => {
	const pours = f.pours - f.how;
	const tl: FurnaceTimeline = {
		ore: f.ore - f.how,
		limestone: f.lime - f.how,
		coke: f.coal - f.how,
		blast: f.blast - f.how,
		tap: pours + 40,
	};
	return (
		<AbsoluteFill style={{background: '#0B0B0C'}}>
			{/* Bombay, 1907: the share office opens, and the people come */}
			<Shot a={0} b={f.wrote} name="crowd-1907">
				<DepthPhoto file="assets/media/loc7/L01c.jpg" keys={[{f: 0, dolly: 0.0, y: -0.02}, {f: f.wrote, dolly: 0.2, y: 0.02}]} depth={0.24} grade="archive" />
				<Stamp text="BOMBAY · 1907" at={10} until={f.office + 40} />
			</Shot>
			{/* one man who was there wrote it down */}
			<Shot a={f.wrote} b={f.coins} name="sahlin">
				<QuoteCard
					lines={['Old and young, rich and poor,', 'men and women, they came,', 'offering their mites.']}
					attribution="AN EYEWITNESS · AS RECORDED IN TATA'S HISTORY"
					at={6}
					mark={2}
					markFrom={f.mites - f.wrote}
					markTo={f.coins - f.wrote - 20}
					seed="q-sahlin"
				/>
			</Shot>
			{/* their few coins */}
			<Shot a={f.coins} b={f.weeks} name="rupee-1907">
				<DeskPrint file="raw/wm/D_02_indian-silver-one-rupee-of-1907-king-edw.jpg" at={4} width={640} rotate={-3} grade="modern" seed="rupee" />
				<Stamp text="ONE RUPEE · 1907" at={30} until={f.weeks - f.coins} />
			</Shot>
			{/* eight thousand Indians; two crore thirty one lakh */}
			<Shot a={f.weeks} b={f.imagine} name="counter-1907">
				<AbsoluteFill style={{filter: 'brightness(0.45) blur(2px)'}}>
					<DepthPhoto file="assets/media/loc7/L02c.jpg" keys={[{f: 0, dolly: 0.02}, {f: f.imagine - f.weeks, dolly: 0.16}]} depth={0.22} grade="archive" />
				</AbsoluteFill>
				<Kinetic text="8,000 INDIANS" at={f.eight - f.weeks} until={f.crore - f.weeks + 10} display size={84} y={-150} />
				<CounterAt to={23175000} start={f.crore - f.weeks - 50} land={f.crWord - f.weeks} prefix="Rs. " size={150} y={40} />
			</Shot>
			{/* stand in that line */}
			<Shot a={f.imagine} b={f.raj} name="line">
				<DepthPhoto file="assets/media/A001b.jpg" keys={[{f: 0, dolly: 0.04, x: -0.02}, {f: f.raj - f.imagine, dolly: 0.26, x: 0.03, y: 0.02}]} depth={0.24} grade="archive" />
			</Shot>
			<Shot a={f.raj} b={f.saved} name="raj">
				<Photo file="E001a.jpg" dur={f.saved - f.raj} move={[0.0, 0.14, 0.02, -0.02]} depth={0.12} />
				<Stamp text="DELHI DURBAR · 1903" sub="A PAINTING" at={10} until={f.saved - f.raj} />
			</Shot>
			{/* savings for a daughter's wedding: close on the woman with her pouch, then the lit door */}
			<Shot a={f.saved} b={f.bet} name="savings">
				<DepthPhoto file="assets/media/cm/cm_4-bangles-jpg.jpg" keys={[{f: 0, dolly: 0.1, x: -0.02}, {f: f.bet - f.saved, dolly: 0.2, x: 0.0}]} depth={0.16} grade="archive" />
			</Shot>
			{/* would you have done it: into the faces of the Bombay street, 1906 */}
			<Shot a={f.bet} b={f.believed} name="would">
				<DepthPhoto file="assets/media/loc7/L03c.jpg" keys={[{f: 0, dolly: 0.3, x: -0.05, y: -0.13}, {f: f.believed - f.bet, dolly: 0.42, x: -0.06, y: -0.14}]} depth={0.24} grade="archive" />
			</Shot>
			{/* Upcott laughs */}
			<Shot a={f.believed} b={f.how} name="upcott">
				<QuoteCard lines={UPCOTT} attribution="SIR FREDERICK UPCOTT · AS TOLD IN TATA'S HISTORIES" at={6} mark={1} markFrom={f.eat - f.believed} markTo={f.how - f.believed - 30} tone="newsprint" seed="q-upcott" />
			</Shot>
			{/* a tower of fire */}
			<Shot a={f.how} b={f.lava} name="furnace" atmos={false} tag="ILLUSTRATION">
				<Furnace tl={tl} />
			</Shot>
			{/* the match cut on "lava": the drawing's glow becomes real molten iron */}
			<Shot a={f.lava} b={f.iron1911 + 90} name="molten" leak={colors.ember}>
				<TapeFrame file="assets/media/footage/Y05_steelmaking.mp4" startFrom={128 * 60} label="MOLTEN IRON · FROM AN OLD TATA STEEL FILM" />
			</Shot>
			{/* 1911, 1912 */}
			<Shot a={f.iron1911 + 90} b={f.war} name="years" atmos={false}>
				<AbsoluteFill style={{filter: 'brightness(0.42)'}}>
					<ArchiveClip file="assets/media/footage/Y04_jamshedpur_100.mp4" startFrom={45 * 60} rate={0.5} clear={0.26} anchor="50% 0%" grade="furnace" />
				</AbsoluteFill>
				<Embers count={24} seed="yr-emb" intensity={0.6} />
				<Sequence durationInFrames={f.steel1912 - f.iron1911 - 90}>
					<YearRoller from={1907} to={1911} start={0} land={W('The first iron flows', 'eleven') - f.iron1911 - 90} label="FIRST IRON" />
				</Sequence>
				<Sequence from={f.steel1912 - f.iron1911 - 90}>
					<YearRoller from={1911} to={1912} start={0} land={W('The first steel, in nineteen twelve', 'twelve') - f.steel1912} label="FIRST STEEL" />
				</Sequence>
			</Shot>
			{/* the war needs rails */}
			<Shot a={f.war} b={f.reply} name="war-rails">
				<DeskPrint file="raw/wm/05_29_first-train-of-supplies-leaving-baghdad.jpg" at={4} width={900} rotate={-1.5} seed="ww1a" />
				<Stamp text="MESOPOTAMIA · 1917" sub="A BRITISH ARMY SUPPLY TRAIN" at={20} until={f.rails + 60} />
				<Sequence from={f.rails - f.war + 60}>
					<DeskPrint file="raw/wm/05_28_engines-on-decauville-railway-line-three.jpg" at={4} width={900} rotate={2} seed="ww1b" />
				</Sequence>
			</Shot>
			{/* "some indigestion" */}
			<Shot a={f.reply} b={f.y1919} name="indigestion">
				{/* v8: the payoff on the works that made the rails, not the same quote card again 30 s later */}
				<TablePhoto file="v8/V8_tisco_aerial.jpg" dur={f.y1919 - f.reply} aspect={960 / 560} w={28} seed="tisco-aerial" />
				<Kinetic text="SOME INDIGESTION" at={f.indigestion - f.reply + 110} until={f.y1919 - f.reply} display size={70} y={330} />
			</Shot>
			{/* 1919: Jamshedpur, after the man who never saw it */}
			<Shot a={f.y1919} b={f.after} name="jamshedpur" atmos={false}>
				<PlaceMap pinAt={f.jamshedpur - f.y1919 - 10} place={PLACES.jamshedpur} label="JAMSHEDPUR" sub="SAKCHI, RENAMED IN 1919" />
			</Shot>
			<Shot a={f.after} b={f.other} name="never-saw">
				<DeskPrint file="B003b.jpg" at={4} width={460} rotate={-2} seed="jnt-oval" />
			</Shot>
			{/* the other dreams */}
			<Shot a={f.other} b={f.lakes} name="iisc-statue" fadeIn={10}>
				<Photo file="E002a.jpg" dur={f.lakes - f.other} move={[0.0, 0.2, 0, 0, 0.02, -0.02]} grade="modern" depth={0.1} />
				<Stamp text="INDIAN INSTITUTE OF SCIENCE" sub="BANGALORE, TODAY · JAMSETJI'S STATUE" at={f.opens - f.other} until={f.lakes - f.other} />
			</Shot>
			<Shot a={f.lakes} b={f.gone} name="lakes">
				<Camera seed="lake-cam" keys={[{f: 0, scale: 1.04}, {f: f.gone - f.lakes, scale: 1.12}]}>
					<Footage file="assets/media/footage/Y15_khopoli_hydro.mp4" startFrom={60 * 60} grade="modern" />
				</Camera>
				<Stamp text="THE WESTERN GHATS" sub="TATA POWER'S HYDRO LAKES, TODAY" at={20} until={f.gone - f.lakes} />
			</Shot>
			{/* "It isn't.": the lamp goes down on his photograph (plan_v7: no void, so no ember on black) */}
			<Shot a={f.gone} b={f.end} name="alive">
				<WarmHold>
					<DeskPrint file="B003a.jpg" at={-40} width={600} rotate={1} grade="furnace" seed="jnt-end" />
				</WarmHold>
				<LampDown from={f.isnt - f.gone} to={f.end - f.gone} />
			</Shot>
		</AbsoluteFill>
	);
};

export const eightFrames = f;
