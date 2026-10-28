import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Camera, colors, Desk, ease, FrameSeq, Footage, Kinetic, LowerThird, PortraitPlate, Print, Stamp, tween} from '../../../../../lib/remotion';
import {Glint, YearRoller} from '../../../../../lib/remotion/kinetic';
import {PLACES} from '../../../../../lib/remotion/map';
import {DepthPhoto} from '../../../../../lib/remotion/three/DepthPhoto';
import {FLOW_HELD, OwnershipFlow} from '../../../../../lib/remotion/ownership/OwnershipFlow';
import {ArchiveClip} from '../v7';
import {RichList} from '../shots/RichList';
import {BoardNote, DholeraFromOrbit} from '../shots/ch9v7';
import {chapterClock, CounterAt, DeskPrint, Photo, Shot} from '../kit';
import {Furnace} from './Eight';
import {TapeFrame} from '../shots/ch3';
import {Porthole} from '../shots/ch6';
import {Postcard} from '../shots/ch5';
import {SameBet, SixPrints} from '../shots/ch9';

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

export const Answer: React.FC = () => (
	<AbsoluteFill style={{background: '#0B0B0C'}}>
		{/* back to the bank, 1924: the third time */}
		<Shot a={0} b={f.why} name="bombay-again" fadeIn={10}>
			<DepthPhoto file={`${M}/A001a.jpg`} keys={[{f: 0, dolly: 0.12, x: 0.01}, {f: f.why, dolly: 0.26, x: -0.01}]} depth={0.24} grade="archive" />
			<Stamp text="BOMBAY · 1924" at={f.back + 30} until={f.why} />
		</Shot>
		<Shot a={f.why} b={f.because} name="rich-list" tag="ILLUSTRATION">
			<RichList dur={f.because - f.why} holdFrom={f.because - f.why - 60} />
		</Shot>
		<Shot a={f.because} b={f.sits} name="bombay-house">
			<Photo file="raw/wm/A005_02_bombay-house-mast-jpg.jpg" dur={f.sits - f.because} move={[0.02, 0.18, 0.01, -0.01]} grade="steel" depth={0.14} />
			<Stamp text="BOMBAY HOUSE" sub="TATA SONS · MUMBAI" at={20} until={f.sits - f.because} />
		</Shot>
		{/* signature 8: the ownership machine, on the voice's numbers */}
		<Shot a={f.sits} b={f.salt} name="ownership" atmos={false}>
			<OwnershipFlow
				t={{sons: 10, trusts: f.twoThirds - f.sits, dorabji: f.biggest - f.sits, shapoorji: f.shapoorji - f.sits, companies: f.own - f.sits, up: 1e9, out: 1e9}}
				background="assets/media/raw/wm/A005_02_bombay-house-mast-jpg.jpg"
			/>
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
		<Shot a={f.flows} b={f.out} name="up-to-the-trusts" atmos={false}>
			<OwnershipFlow t={{...FLOW_HELD, up: 0, out: 1e9}} background="assets/media/raw/wm/A005_02_bombay-house-mast-jpg.jpg" />
		</Shot>
		<Shot a={f.out} b={f.research} name="hospitals">
			<Photo file="E005a.jpg" dur={f.research - f.out} move={[0.0, 0.14]} grade="modern" depth={0.06} />
			<Stamp text="TATA MEMORIAL HOSPITAL" sub="MUMBAI" at={6} until={f.research - f.out} />
		</Shot>
		<Shot a={f.research} b={f.scholarships} name="research">
			<Photo file="E002a.jpg" dur={f.scholarships - f.research} move={[0.0, 0.14]} grade="modern" depth={0.08} />
			<Stamp text="INDIAN INSTITUTE OF SCIENCE" sub="BENGALURU" at={6} until={f.scholarships - f.research} />
		</Shot>
		<Shot a={f.scholarships} b={f.design} name="scholarships">
			<Photo file="cm/cm_school-children-wash-in-schools-india-26.jpg" dur={f.design - f.scholarships} move={[0.04, 0.18, 0.0, 0.0, 0.02, -0.02]} grade="modern" depth={0.18} />
		</Shot>
		<Shot a={f.design} b={f.died} name="held-together" atmos={false}>
			<OwnershipFlow t={FLOW_HELD} background="assets/media/raw/wm/A005_02_bombay-house-mast-jpg.jpg" />
		</Shot>
		{/* October 2024 */}
		<Shot a={f.died} b={f.hall} name="ratan-dies">
			<PortraitPlate file="assets/media/raw/wm/G002_57_ratan-tata-1-jpg.jpg" place="assets/media/B009c.jpg" side="right" share={0.48} focus="50% 25%" grade="archive" />
			<LowerThird name="RATAN TATA" role="DIED 9 OCTOBER 2024" at={30} until={f.hall - f.died} />
		</Shot>
		<Shot a={f.hall} b={f.funeral} name="farewell">
			<Photo file="cm/cm_campus-of-national-centre-for-the-perfor.jpg" dur={f.funeral - f.hall} move={[0.02, 0.2, 0.02, -0.02]} grade="archive" depth={0.16} />
			<Stamp text="THE NCPA · SOUTH MUMBAI" sub="ARCHIVAL PHOTOGRAPH" at={20} until={f.funeral - f.hall} />
		</Shot>
		<Shot a={f.funeral} b={f.noel} name="state-funeral">
			<PortraitPlate file="assets/media/cm/ratan_tata_dgr_girish.jpg" place="assets/media/cm/cm_campus-of-national-centre-for-the-perfor.jpg" side="left" share={0.42} focus="50% 22%" grade="archive" push={[1.0, 1.05]} />
			<Stamp text="A STATE FUNERAL" sub="MUMBAI" at={20} until={f.noel - f.funeral} />
		</Shot>
		<Shot a={f.noel} b={f.cracks} name="noel">
			<PortraitPlate file="assets/media/raw/wm/J010_01_noel-tata-png.jpg" place="assets/media/raw/wm/A005_02_bombay-house-mast-jpg.jpg" side="right" share={0.44} focus="50% 25%" grade="modern" />
			<LowerThird name="NOEL TATA" role="CHAIRMAN OF THE TATA TRUSTS" at={30} until={f.cracks - f.noel} />
		</Shot>
		{/* 2026 */}
		<Shot a={f.cracks} b={f.board} name="cracks">
			<Photo file="raw/wm/A005_02_bombay-house-mast-jpg.jpg" dur={f.board - f.cracks} move={[0.06, 0.26, -0.02, 0.02]} grade="steel" depth={0.14} />
			<Kinetic text="2026" at={10} until={f.fight - f.cracks} display size={150} scrim={0.5} />
			<Kinetic text="WHO RUNS TATA" at={f.who - f.cracks} until={f.board - f.cracks} display size={70} y={-80} scrim={0.6} />
			<Kinetic text="AND WHO DECIDES THAT" at={W('Who runs Tata, and who decides', 'who') - f.cracks + 30} until={f.board - f.cracks} size={44} y={30} scrim={0.6} />
		</Shot>
		<Shot a={f.board} b={f.trusts} name="the-vote" tag="ILLUSTRATION">
			<BoardNote voteAt={W('This September, the Tata Sons board', 'voted') - f.board} noAt={f.voted - f.board} dur={f.trusts - f.board} />
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
			<Photo file="raw/wm/J011_06_rbi-tower-jpg.jpg" dur={f.public - f.catch} move={[0.02, 0.18, 0.0, 0.0, 0.03, -0.02]} grade="steel" depth={0.14} />
			<LowerThird name="RESERVE BANK OF INDIA" role="MUMBAI" at={f.rbi - f.catch + 20} until={f.public - f.catch} />
		</Shot>
		<Shot a={f.public} b={f.notOver} name="listing">
			<Photo file="G008a.jpg" dur={f.notOver - f.public} move={[0.0, 0.2, 0.0, 0.0, 0.02, -0.04]} grade="modern" depth={0.12} />
			<Stamp text="SELL SHARES TO THE PUBLIC" sub="BOMBAY STOCK EXCHANGE" at={20} until={f.letOff - f.public} />
			<Kinetic text="THE R.B.I. SAID NO" at={f.no - f.public} until={f.notOver - f.public} display size={80} scrim={0.6} />
		</Shot>
		<Shot a={f.notOver} b={f.work} name="at-rest" atmos={false}>
			<OwnershipFlow t={FLOW_HELD} background="assets/media/raw/wm/A005_02_bombay-house-mast-jpg.jpg" />
		</Shot>
		{/* Dholera: the same bet, again */}
		<Shot a={f.work} b={f.dholera} name="work-goes-on">
			<Camera seed="sanand9" keys={[{f: 0, scale: 1.02}, {f: f.dholera - f.work, scale: 1.1}]}>
				<ArchiveClip file={`${M}/footage/Y18_sanand_plant.mp4`} startFrom={66 * 60} clear={0.14} anchor="50% 0%" grade="modern" push={0} />
			</Camera>
			<Stamp text="A TATA FACTORY" sub="TODAY" at={20} until={f.dholera - f.work} />
		</Shot>
		<Shot a={f.dholera} b={f.tiny} name="dholera" atmos={false}>
			<DholeraFromOrbit landAt={W('At a place called Dholera', 'Dholera') - f.dholera} />
		</Shot>
		<Shot a={f.tiny} b={f.crore} name="chips">
			<Photo file="J013a.jpg" dur={f.crore - f.tiny} move={[0.06, 0.24]} grade="cyan" depth={0.08} />
			<Stamp text="A SILICON WAFER" sub="HUNDREDS OF CHIPS ON ONE DISC" at={20} until={f.crore - f.tiny} />
		</Shot>
		<Shot a={f.crore} b={f.abroad} name="crore">
			<AbsoluteFill style={{filter: 'brightness(0.45)'}}>
				<DholeraFromOrbit landAt={-1} />
			</AbsoluteFill>
			<CounterAt to={91000} start={6} land={70} prefix="₹" suffix=" CRORE" size={130} />
		</Shot>
		<Shot a={f.abroad} b={f.first} name="abroad">
			<Photo file="cm/cm_photolithography-lab-in-the-lcn-cleanroo.jpg" dur={f.first - f.abroad} move={[0.02, 0.18, 0.02, -0.02]} grade="modern" depth={0.16} />
			<Stamp text="A CHIP CLEANROOM" sub="LONDON" at={20} until={f.first - f.abroad} />
			<Kinetic text="ALMOST ALL OF INDIA'S CHIPS · BOUGHT FROM ABROAD" at={30} until={f.first - f.abroad} size={36} y={380} scrim={0.6} />
		</Shot>
		<Shot a={f.first} b={f.y2028} name="first-fab">
			<Photo file="cm/cm_clean-room-jpg.jpg" dur={f.y2028 - f.first} move={[0.04, 0.2, 0.0, 0.02]} grade="cyan" depth={0.16} />
			<Stamp text="INSIDE A CHIP FACTORY" sub="A CLEANROOM" at={20} until={f.y2028 - f.first} />
		</Shot>
		<Shot a={f.y2028} b={f.steel} name="y2028" atmos={false}>
			<AbsoluteFill style={{filter: 'brightness(0.4)'}}>
				<DholeraFromOrbit landAt={-1} />
			</AbsoluteFill>
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
			<PortraitPlate file="assets/media/B003a.jpg" place="assets/media/B019a.jpg" side="right" share={0.5} focus="50% 20%" />
		</Shot>
		<Shot a={f.savers} b={f.couple} name="rc-savers">
			<DepthPhoto file={`${M}/loc7/L01c.jpg`} keys={[{f: 0, dolly: 0.18}, {f: f.couple - f.savers, dolly: 0.28}]} depth={0.24} grade="archive" />
		</Shot>
		<Shot a={f.couple} b={f.apprentice} name="rc-couple">
			<DepthPhoto file={`${M}/A005e.jpg`} keys={[{f: 0, dolly: 0.16, x: 0.06}, {f: f.apprentice - f.couple, dolly: 0.22, x: 0.05}]} depth={0.16} grade="archive" />
		</Shot>
		<Shot a={f.apprentice} b={f.engineer} name="rc-apprentice">
			<PortraitPlate file={`${M}/jrd/jrd_pen.jpg`} place={`${M}/J003a.jpg`} side="left" share={0.48} focus="45% 25%" />
		</Shot>
		<Shot a={f.engineer} b={f.shovel} name="rc-engineer">
			<PortraitPlate file="assets/media/raw/wm/J_14_sudha-murty-at-jaipur-literature-festiva.jpg" place="assets/media/E002a.jpg" side="right" share={0.46} focus="50% 25%" grade="modern" />
		</Shot>
		<Shot a={f.shovel} b={f.common} name="rc-shovel" leak={colors.ember}>
			<ArchiveClip file={`${M}/footage/Y04_jamshedpur_100.mp4`} startFrom={60 * 60} rate={0.6} clear={0.26} anchor="50% 0%" grade="furnace" />
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
		<Shot a={f.savings} b={f.pride} name="echo-savings">
			<DepthPhoto file={`${M}/cm/cm_4-bangles-jpg.jpg`} keys={[{f: 0, dolly: 0.16}, {f: f.pride - f.savings, dolly: 0.22}]} depth={0.16} grade="furnace" />
		</Shot>
		<Shot a={f.pride} b={f.diamond} name="echo-pride" atmos={false} tag="ILLUSTRATION">
			<Porthole file={`${M}/pix/pixabay_255761.mp4`} startFrom={6 * 60} />
		</Shot>
		<Shot a={f.diamond} b={f.fortune} name="echo-diamond">
			<PortraitPlate file={`${M}/E003a.jpg`} place={`${M}/A001a.jpg`} side="right" share={0.42} focus="50% 18%" />
		</Shot>
		<Shot a={f.fortune} b={f.hundred} name="your-place">
			<DepthPhoto file={`${M}/loc7/L03c.jpg`} keys={[{f: 0, dolly: 0.1, x: -0.02, y: -0.06}, {f: f.hundred - f.fortune, dolly: 0.36, x: -0.05, y: -0.13}]} depth={0.24} grade="archive" />
		</Shot>
		{/* the question */}
		<Shot a={f.hundred} b={f.belong} name="bombay-house-last">
			<Photo file="raw/wm/A005_02_bombay-house-mast-jpg.jpg" dur={f.belong - f.hundred} move={[0.2, 0.32, 0.0, 0.0, 0.02, 0.0]} grade="night" depth={0.14} />
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
