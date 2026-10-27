import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Camera, colors, Desk, ease, FrameSeq, Footage, Kinetic, LowerThird, Print, Stamp, tween} from '../../../../../lib/remotion';
import {Glint, YearRoller} from '../../../../../lib/remotion/kinetic';
import {PLACES} from '../../../../../lib/remotion/map';
import {Crowd1907} from '../dev/ink/Crowd1907';
import {PayWindowQueue} from '../dev/ink/PayWindow';
import {chapterClock, CounterAt, DeskPrint, Photo, Shot} from '../kit';
import {Furnace} from './Eight';
import {FeeEnvelope, PlaceMap} from '../shots/ch1';
import {TapeFrame} from '../shots/ch3';
import {PawnCounter} from '../shots/PawnCounter';
import {RichLedger} from '../shots/RichLedger';
import {Porthole} from '../shots/ch6';
import {Postcard} from '../shots/ch5';
import {HandsVote, OwnershipStage, SameBet, SixPrints, VerticalNews} from '../shots/ch9';

// Chapter 9, The answer (plan_v6 §4 ch 9): back at the bank → the ownership machine (signature 8) → salt and tea, up
// to the trusts and out → Ratan Tata's farewell → 2026: the vote, the trusts, the R.B.I. → Dholera, the same bet
// again → the roll call (signature 9) → savings, pride, a diamond → that part is yours → the question. 3 min 5 s.
const C = chapterClock('The answer');
const A = C.id('Back to the bank in nineteen twenty four') - 1; // 'So.' alone also opens earlier sentences
const S = (text: string): number => C.S(text, A);
const W = (sentence: string, phrase: string): number => C.W(sentence, phrase, A);
const M = 'assets/media';
const B = `${M}/blender`;

const f = {
	so: 0,
	back: S('Back to the bank'),
	why: S('Why is no Tata on top'),
	because: S("Because the Tata family doesn't own Tata"),
	sits: S('Tata Sons sits at the top'),
	thirds: S('And about two thirds of it'),
	twoThirds: W('And about two thirds of it', 'two'),
	biggest: S('And the biggest of them'),
	man: S('The trust of the man with the diamond'),
	holds: S('It holds about twenty eight percent'),
	twentyEight: W('It holds about twenty eight percent', 'twenty'),
	rest: S('And who owns the rest'),
	most: S('Most of it belongs to the Shapoorji Pallonji'),
	shapoorji: W('Most of it belongs to the Shapoorji Pallonji', 'Shapoorji'),
	own: W('Most of it belongs to the Shapoorji Pallonji', 'own'),
	salt: S('So when you buy that salt'),
	tea: W('So when you buy that salt', 'tea'),
	flows: W('So when you buy that salt', 'flows'),
	out: S('And out, into hospitals'),
	research: W('And out, into hospitals', 'research'),
	scholarships: W('And out, into hospitals', 'scholarships'),
	design: S('For almost a hundred years, that design'),
	died: S('Then, in October twenty twenty four'),
	hall: S('His body lay at a hall'),
	students: S('Students.'),
	funeral: S('He was given a state funeral'),
	noel: S('His half brother, Noel Tata'),
	cracks: S('And in twenty twenty six'),
	fight: S('So what is the fight about'),
	who: S('Who runs Tata, and who decides'),
	board: S('This September, the Tata Sons board'),
	voted: S('Noel Tata voted no'),
	trusts: S("The trusts say that decision doesn't count"),
	sons: S('Tata Sons says it does'),
	catch: S("And here's the catch"),
	rbi: S('To the R.B.I., Tata Sons looks like'),
	public: S('And big finance companies must sell shares'),
	letOff: S('Tata Sons asked to be let off'),
	no: S('The R.B.I. said no'),
	notOver: S('As this film goes out'),
	wins: S('Who wins?'),
	work: S('And while that fight goes on'),
	dholera: S('At a place called Dholera'),
	tiny: S('The tiny chips inside phones and cars'),
	crore: S('Ninety one thousand crore rupees'),
	abroad: S('Today, India buys almost all of its chips'),
	first: S("This would be the country's first big chip factory"),
	y2028: S('The government expects it to start'),
	steel: S('A hundred years ago, the bet was steel'),
	chips: S("Now it's chips"),
	sameBet: S('The same bet, all over again'),
	step: S('But step back for a moment'),
	priest: S("A priest's son"),
	savers: S('Eight thousand ordinary savers'),
	couple: S('A husband and wife who pledged'),
	apprentice: S('An apprentice who worked without pay'),
	engineer: S('A young engineer with a postcard'),
	shovel: S('A man shovelling limestone'),
	common: S('What do they have in common'),
	line: S('Every one of them, at some point'),
	savings: S('Savings.'),
	pride: S('Pride.'),
	diamond: S('A diamond.'),
	fortune: S('That part needs no fortune'),
	yours: S('That part is yours'),
	hundred: S('And a hundred years later, the question'),
	belong: S('Who should a company like this'),
	think: S('What do you think'),
	end: C.end,
};

/** "That part is yours": the queue at the pay window from the cold open, a warm place in it lit for the viewer. */
const YourPlace: React.FC<{at: number}> = ({at}) => {
	const frame = useCurrentFrame();
	const g = tween(frame, at, at + 60, 0, 1, ease.arrive);
	return (
		<AbsoluteFill>
			<PayWindowQueue />
			<AbsoluteFill style={{background: `radial-gradient(ellipse 9% 4% at 86% 95%, rgba(255,215,150,${0.9 * g}) 0%, rgba(255,170,90,${0.35 * g}) 45%, transparent 100%)`, mixBlendMode: 'screen'}} />
		</AbsoluteFill>
	);
};

export const Answer: React.FC = () => (
	<AbsoluteFill style={{background: '#0B0B0C'}}>
		{/* back to the bank, 1924: the third time */}
		<Shot a={0} b={f.why} name="bank-again" tag="RECONSTRUCTION" fadeIn={10}>
			<FrameSeq dir={`${B}/c3`} prefix="c3_" last={122} rate={122 / Math.max(1, f.why)} />
			<Stamp text="BOMBAY · 1924" at={f.back + 30} until={f.why} />
		</Shot>
		<Shot a={f.why} b={f.because} name="rich-list" tag="ILLUSTRATION">
			<RichLedger gapAt={30} holdFrom={f.because - f.why - 60} />
		</Shot>
		<Shot a={f.because} b={f.sits} name="stone" tag="RECONSTRUCTION">
			<FrameSeq dir={`${B}/hero`} prefix="hero_" last={298} from={120} rate={0.8} />
		</Shot>
		{/* signature 8: the ownership machine, on the voice's numbers */}
		<Shot a={f.sits} b={f.salt} name="ownership" atmos={false} tag="ILLUSTRATION">
			<OwnershipStage
				timeline={{
					pourFrom: f.twoThirds - f.sits,
					pourTo: f.twoThirds - f.sits + 170,
					dorabji: f.twentyEight - f.sits,
					shapoorji: f.shapoorji - f.sits,
					companies: f.own - f.sits,
				}}
			/>
			<Kinetic text="TATA SONS" at={20} until={f.thirds - f.sits + 10} display size={70} y={-430} />
		</Shot>
		{/* salt and tea: a share flows up to the trusts, and out */}
		<Shot a={f.salt} b={f.tea} name="salt">
			<Photo file="pix/pixabay_6728600.jpg" dur={f.tea - f.salt} move={[0.02, 0.14, 0.02, 0.03]} grade="modern" depth={0.1} />
		</Shot>
		<Shot a={f.tea} b={f.flows} name="tea">
			<Camera seed="tea9" keys={[{f: 0, scale: 1.04}, {f: f.flows - f.tea, scale: 1.1}]}>
				<Footage file={`${M}/pix/pixabay_30329.mp4`} startFrom={0} grade="modern" />
			</Camera>
		</Shot>
		<Shot a={f.flows} b={f.out} name="up-to-the-trusts" atmos={false} tag="ILLUSTRATION">
			<OwnershipStage still timeline={{pourFrom: -2000, pourTo: -1800, dorabji: -1500, shapoorji: -1400, companies: -1300}} />
			<Kinetic text="A SHARE OF THE PROFIT · TO THE TRUSTS" at={10} until={f.out - f.flows} size={34} y={430} color={colors.gold} />
		</Shot>
		<Shot a={f.out} b={f.research} name="hospitals">
			<Photo file="E005a.jpg" dur={f.research - f.out} move={[0.0, 0.14]} grade="modern" depth={0.06} />
			<Stamp text="TATA MEMORIAL HOSPITAL" sub="MUMBAI" at={6} until={f.research - f.out} />
		</Shot>
		<Shot a={f.research} b={f.scholarships} name="research">
			<Photo file="E002a.jpg" dur={f.scholarships - f.research} move={[0.0, 0.14]} grade="modern" depth={0.08} />
			<Stamp text="INDIAN INSTITUTE OF SCIENCE" sub="BENGALURU" at={6} until={f.scholarships - f.research} />
		</Shot>
		<Shot a={f.scholarships} b={f.design} name="scholarships" tag="ILLUSTRATION">
			<FeeEnvelope giveAt={10} />
		</Shot>
		<Shot a={f.design} b={f.died} name="held-together" atmos={false} tag="ILLUSTRATION">
			<OwnershipStage still timeline={{pourFrom: -2000, pourTo: -1800, dorabji: -1500, shapoorji: -1400, companies: -1300}} />
		</Shot>
		{/* October 2024 */}
		<Shot a={f.died} b={f.hall} name="ratan-dies">
			<DeskPrint file="raw/wm/G002_55_shri-ratan-naval-tata-jpg.jpg" at={-30} width={560} rotate={-1} grade="archive" seed="ratan-2024" />
			<LowerThird name="RATAN TATA" role="DIED 9 OCTOBER 2024" at={30} until={f.hall - f.died} />
		</Shot>
		<Shot a={f.hall} b={f.funeral} name="farewell">
			<VerticalNews file={`${M}/footage/N03_ratan_farewell.mp4`} startFrom={30 * 60} label="MUMBAI, OCTOBER 2024 · ANI" />
		</Shot>
		<Shot a={f.funeral} b={f.noel} name="state-funeral">
			<VerticalNews file={`${M}/footage/N03_ratan_farewell.mp4`} startFrom={12 * 60} label="A STATE FUNERAL · ANI" />
		</Shot>
		<Shot a={f.noel} b={f.cracks} name="noel">
			<DeskPrint file="raw/wm/J010_01_noel-tata-png.jpg" at={4} width={440} rotate={1.5} grade="modern" seed="noel" />
			<LowerThird name="NOEL TATA" role="CHAIRMAN OF THE TATA TRUSTS" at={30} until={f.cracks - f.noel} />
		</Shot>
		{/* 2026 */}
		<Shot a={f.cracks} b={f.board} name="cracks">
			<Photo file="raw/wm/A005_02_bombay-house-mast-jpg.jpg" dur={f.board - f.cracks} move={[0.06, 0.26, -0.02, 0.02]} grade="steel" depth={0.14} />
			<Kinetic text="2026" at={10} until={f.fight - f.cracks} display size={150} scrim={0.5} />
			<Kinetic text="WHO RUNS TATA" at={f.who - f.cracks} until={f.board - f.cracks} display size={70} y={-80} scrim={0.6} />
			<Kinetic text="AND WHO DECIDES THAT" at={W('Who runs Tata, and who decides', 'who') - f.cracks + 30} until={f.board - f.cracks} size={44} y={30} scrim={0.6} />
		</Shot>
		<Shot a={f.board} b={f.trusts} name="the-vote" atmos={false} tag="ILLUSTRATION">
			<HandsVote upAt={W('This September, the Tata Sons board', 'voted') - f.board} noAt={f.voted - f.board} />
			<Stamp text="SEPTEMBER 2026" sub="THE TATA SONS BOARD" at={10} until={f.voted - f.board} />
		</Shot>
		<Shot a={f.trusts} b={f.catch} name="two-sides">
			<Photo file="raw/wm/A005_02_bombay-house-mast-jpg.jpg" dur={f.catch - f.trusts} move={[0.26, 0.34]} grade="steel" depth={0.14} />
			<AbsoluteFill style={{background: 'rgba(8,9,11,0.6)'}} />
			<Kinetic text="THE TRUSTS: THE DECISION DOES NOT COUNT" at={10} until={f.catch - f.trusts} size={40} y={-60} />
			<Kinetic text="TATA SONS: IT DOES" at={f.sons - f.trusts} until={f.catch - f.trusts} size={40} y={40} color={colors.gold} />
		</Shot>
		{/* the R.B.I. */}
		<Shot a={f.catch} b={f.public} name="rbi">
			<DeskPrint file="raw/wm/J011_06_rbi-tower-jpg.jpg" at={f.rbi - f.catch - 20} width={520} rotate={-1.5} grade="modern" seed="rbi" />
			<LowerThird name="RESERVE BANK OF INDIA" role="MUMBAI" at={f.rbi - f.catch + 20} until={f.public - f.catch} />
		</Shot>
		<Shot a={f.public} b={f.notOver} name="listing">
			<Photo file="G008a.jpg" dur={f.notOver - f.public} move={[0.0, 0.2, 0.0, 0.0, 0.02, -0.04]} grade="modern" depth={0.12} />
			<Stamp text="SELL SHARES TO THE PUBLIC" sub="BOMBAY STOCK EXCHANGE" at={20} until={f.letOff - f.public} />
			<Kinetic text="THE R.B.I. SAID NO" at={f.no - f.public} until={f.notOver - f.public} display size={80} scrim={0.6} />
		</Shot>
		<Shot a={f.notOver} b={f.work} name="at-rest" atmos={false} tag="ILLUSTRATION">
			<OwnershipStage still timeline={{pourFrom: -2000, pourTo: -1800, dorabji: -1500, shapoorji: -1400, companies: -1300}} />
		</Shot>
		{/* Dholera: the same bet, again */}
		<Shot a={f.work} b={f.dholera} name="work-goes-on">
			<Camera seed="sanand9" keys={[{f: 0, scale: 1.02}, {f: f.dholera - f.work, scale: 1.1}]}>
				<Footage file={`${M}/footage/Y18_sanand_plant.mp4`} startFrom={66 * 60} grade="modern" />
			</Camera>
			<Stamp text="A TATA FACTORY" sub="TODAY" at={20} until={f.dholera - f.work} />
		</Shot>
		<Shot a={f.dholera} b={f.tiny} name="dholera" atmos={false}>
			<PlaceMap pinAt={W('At a place called Dholera', 'Dholera') - f.dholera} place={PLACES.dholera} label="DHOLERA" sub="GUJARAT · A CHIP FACTORY" />
		</Shot>
		<Shot a={f.tiny} b={f.crore} name="chips" tag="ILLUSTRATIVE FOOTAGE">
			<Camera seed="chip" keys={[{f: 0, scale: 1.04}, {f: f.crore - f.tiny, scale: 1.12}]}>
				<Footage file={`${M}/pix/pixabay_13370.mp4`} startFrom={0} grade="cyan" />
			</Camera>
		</Shot>
		<Shot a={f.crore} b={f.abroad} name="crore">
			<Photo file="J013a.jpg" dur={f.abroad - f.crore} move={[0.0, 0.2, 0.02, -0.02]} grade="cyan" depth={0.08} />
			<CounterAt to={91000} start={6} land={70} prefix="₹" suffix=" CRORE" size={130} />
		</Shot>
		<Shot a={f.abroad} b={f.first} name="abroad" tag="ILLUSTRATIVE FOOTAGE">
			<Camera seed="board" keys={[{f: 0, scale: 1.04}, {f: f.first - f.abroad, scale: 1.12, x: -20}]}>
				<Footage file={`${M}/pix/pixabay_47217.mp4`} startFrom={0} grade="cyan" />
			</Camera>
			<Kinetic text="ALMOST ALL OF INDIA'S CHIPS · BOUGHT FROM ABROAD" at={30} until={f.first - f.abroad} size={36} y={380} scrim={0.6} />
		</Shot>
		<Shot a={f.first} b={f.y2028} name="first-fab">
			<Photo file="J013b.jpg" dur={f.y2028 - f.first} move={[0.0, 0.2]} grade="cyan" depth={0.06} />
			<Stamp text="INDIA'S FIRST BIG CHIP FACTORY" sub="A SILICON WAFER" at={20} until={f.y2028 - f.first} />
		</Shot>
		<Shot a={f.y2028} b={f.steel} name="y2028" atmos={false}>
			<AbsoluteFill style={{background: 'radial-gradient(ellipse 60% 50% at 50% 55%, #10232A 0%, #08090B 72%)'}} />
			<YearRoller from={2026} to={2028} start={10} land={f.steel - f.y2028 - 50} label="EXPECTED TO START" />
		</Shot>
		<Shot a={f.steel} b={f.chips} name="steel-bet">
			<TapeFrame file={`${M}/footage/Y05_steelmaking.mp4`} startFrom={128 * 60} label="MOLTEN IRON · FROM AN OLD TATA STEEL FILM" />
		</Shot>
		<Shot a={f.chips} b={f.sameBet} name="chips-bet">
			<Photo file="J013c.jpg" dur={f.sameBet - f.chips} move={[0.0, 0.2]} grade="cyan" depth={0.06} />
		</Shot>
		<Shot a={f.sameBet} b={f.step} name="same-bet">
			<SameBet iron={`${M}/footage/Y11_port_talbot_close.mp4`} ironFrom={900 * 60} crossAt={40} wafer={<Photo file="J013a.jpg" dur={f.step - f.sameBet} move={[0.1, 0.24]} grade="cyan" depth={0.06} />} />
		</Shot>
		{/* step back: the roll call (signature 9) */}
		<Shot a={f.step} b={f.priest} name="step-back">
			<Photo file="A001a.jpg" dur={f.priest - f.step} move={[0.24, 0.0]} grade="archive" depth={0.24} />
		</Shot>
		<Shot a={f.priest} b={f.savers} name="rc-priest">
			<DeskPrint file="B003a.jpg" at={-40} width={560} rotate={-1} grade="archive" seed="rc1" />
		</Shot>
		<Shot a={f.savers} b={f.couple} name="rc-savers" tag="ILLUSTRATION">
			<Crowd1907 />
		</Shot>
		<Shot a={f.couple} b={f.apprentice} name="rc-couple">
			<Desk />
			<Print file={`${M}/raw/wm/A005_04_dorabji-tata-jpg.jpg`} at={-40} width={420} x={-300} rotate={-2.5} seed="rc-dor" />
			<Print file={`${M}/E003a.jpg`} at={-40} width={340} x={300} rotate={2} seed="rc-meh" />
		</Shot>
		<Shot a={f.apprentice} b={f.engineer} name="rc-apprentice">
			<DeskPrint file="raw/wm/F001_38_j-r-d-tata-1955-jpg.jpg" at={-40} width={500} rotate={1.5} seed="rc-jrd" />
		</Shot>
		<Shot a={f.engineer} b={f.shovel} name="rc-engineer">
			<DeskPrint file="raw/wm/J_14_sudha-murty-at-jaipur-literature-festiva.jpg" at={-40} width={460} rotate={-1.5} grade="modern" seed="rc-sudha" />
		</Shot>
		<Shot a={f.shovel} b={f.common} name="rc-shovel" atmos={false} tag="ILLUSTRATION">
			<Furnace tl={{ore: -400, limestone: 10, coke: 60, blast: 150, tap: 2000}} />
		</Shot>
		<Shot a={f.common} b={f.savings} name="six">
			<SixPrints
				at={-30}
				files={[
					{file: 'B003a.jpg'},
					{file: 'raw/wm/D_02_indian-silver-one-rupee-of-1907-king-edw.jpg', grade: 'modern'},
					{file: 'raw/wm/A005_04_dorabji-tata-jpg.jpg'},
					{file: 'raw/wm/F001_38_j-r-d-tata-1955-jpg.jpg'},
					{file: 'raw/wm/J_14_sudha-murty-at-jaipur-literature-festiva.jpg', grade: 'modern'},
					{file: 'raw/wm/G002_55_shri-ratan-naval-tata-jpg.jpg', grade: 'modern'},
				]}
			/>
		</Shot>
		{/* savings, pride, a diamond */}
		<Shot a={f.savings} b={f.pride} name="echo-savings" tag="ILLUSTRATION">
			<PawnCounter placeAt={-200} dimAt={1e9} />
		</Shot>
		<Shot a={f.pride} b={f.diamond} name="echo-pride" atmos={false} tag="ILLUSTRATION">
			<Porthole file={`${M}/pix/pixabay_255761.mp4`} startFrom={6 * 60} />
		</Shot>
		<Shot a={f.diamond} b={f.fortune} name="echo-diamond" tag="RECONSTRUCTION">
			<FrameSeq dir={`${B}/macro`} prefix="macro_" last={238} from={100} />
		</Shot>
		<Shot a={f.fortune} b={f.hundred} name="your-place" tag="ILLUSTRATION">
			<YourPlace at={f.yours - f.fortune} />
		</Shot>
		{/* the question */}
		<Shot a={f.hundred} b={f.belong} name="counter-last" tag="RECONSTRUCTION">
			<FrameSeq dir={`${B}/c3`} prefix="c3_" last={122} rate={0.5} />
		</Shot>
		<Shot a={f.belong} b={f.think} name="stone-alone" tag="RECONSTRUCTION">
			<Camera seed="alone" keys={[{f: 0, scale: 1.0}, {f: f.think - f.belong, scale: 1.08}]}>
				<FrameSeq dir={`${B}/c2`} prefix="c2_" last={322} from={322} />
			</Camera>
			<Glint x={1128} y={686} at={40} size={170} dur={46} />
		</Shot>
		<Shot a={f.think} b={f.end} name="empty-counter" tag="RECONSTRUCTION">
			<Camera seed="empty" keys={[{f: 0, scale: 1.22, x: -260}, {f: f.end - f.think, scale: 1.28, x: -280}]}>
				<FrameSeq dir={`${B}/c1`} prefix="c1_" last={210} from={0} rate={0} />
			</Camera>
		</Shot>
	</AbsoluteFill>
);

export const answerFrames = f;
