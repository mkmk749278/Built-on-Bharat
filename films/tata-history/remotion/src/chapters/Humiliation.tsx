import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Camera, colors, Desk, Footage, Kinetic, LowerThird, Print, QuoteCard, Stamp} from '../../../../../lib/remotion';
import {DeskCalendar, YearRoller} from '../../../../../lib/remotion/kinetic';
import {FurnaceTimeline} from '../../../../../lib/remotion/furnace/BlastFurnace';
import {chapterClock, CounterAt, DeskPrint, Photo, Shot} from '../kit';
import {Furnace} from './Eight';
import {TapeFrame} from '../shots/ch3';
import {CaptionCrop} from '../shots/ch4';
import {Drafting, GlassTable, Porthole, SteelWords} from '../shots/ch6';

// Chapter 6, The humiliation (plan_v6 §4 ch 6): 1991 → Ratan Tata, the grandmother, the architect → two years at the
// furnace → the Indica, its bookings and its complaints → Detroit 1999, the room, "a favour" → the silent flight home
// (signature 6) → does not sell, fixes, buys → Corus 2007 and the Upcott callback → four 2008 pages. 2 min 4 s.
const C = chapterClock('The humiliation');
// every lookup searches from this chapter's first sentence on (short lines like 'Power.' also open earlier sentences)
const A = C.id('Nineteen ninety one.');
const S = (text: string): number => C.S(text, A);
const W = (sentence: string, phrase: string): number => C.W(sentence, phrase, A);
const M = 'assets/media';

const f = {
	y1991: 0,
	crisis: S('India comes close to running out'),
	opens: W('India comes close to running out', 'opens'),
	hands: S('That same year, J.R.D. hands over'),
	quiet: W('That same year, J.R.D. hands over', 'quiet'),
	ratan: S('Ratan Tata.'),
	born: S('Yes, he was born a Tata'),
	look: S('But look at how he started'),
	parents: S('His parents separated'),
	arch: S('He studied architecture'),
	home: S('Then his grandmother fell ill'),
	first: S('His first years at Tata'),
	floor: S('On the shop floor'),
	steel: S('At the steel plant in Jamshedpur'),
	lime: W('At the steel plant in Jamshedpur', 'limestone'),
	blast: W('At the steel plant in Jamshedpur', 'blast'),
	man: S('The man who would one day run Tata'),
	picture: S('Can you picture that'),
	bet: S('Then he makes his first big bet'),
	car: S('A car designed in India'),
	indica: S('The Indica, unveiled'),
	book: S('About one lakh fifteen thousand'),
	complaints: S('Then the complaints start'),
	quality: S('Quality.'),
	power: S('Power.'),
	detroit: S('So in nineteen ninety nine'),
	ford: W('So in nineteen ninety nine', 'Ford'),
	sell: S('To sell the car business'),
	kadle: S('Tata veteran Pravin Kadle'),
	asked: S('According to him, the Ford people asked'),
	why: W('According to him, the Ford people asked', 'why'),
	favourS: S('And buying it, they said'),
	favour: W('And buying it, they said', 'favour'),
	off: S('The deal is off'),
	back: S('They fly back the same evening'),
	spoke: S('Kadle says Ratan Tata hardly spoke'),
	know: S('You know that silence'),
	hold: S('Hold on to that silence'),
	what: S('So what does Tata do'),
	notSell: S('It does not sell'),
	fixes: S('It fixes the car'),
	buying: S('And it starts buying'),
	y2007: S('Then, in two thousand seven'),
	corus: S('Tata Steel wins Corus'),
	twelve: W('Tata Steel wins Corus', 'twelve'),
	upcott: S('Remember Upcott'),
	eat: W('Remember Upcott', 'eat'),
	hundred: S('A hundred years later'),
	next: S('But the next year tests'),
	proudest: S('His proudest moment'),
	biggest: S('His biggest deal'),
	hardest: S('His hardest defeat'),
	darkest: S('And his darkest night'),
	end: C.end,
};

const UPCOTT = ['Why, I will undertake to eat', 'every pound of steel rail', 'they succeed in making.'];

export const Humiliation: React.FC = () => {
	const tl: FurnaceTimeline = {
		// the camera keys need coke + 40 < blast - 30: the coke charge comes just before the blast if the words are close
		ore: Math.min(f.lime - f.steel, f.blast - f.steel - 105) - 80,
		limestone: Math.min(f.lime - f.steel, f.blast - f.steel - 105),
		coke: f.blast - f.steel - 75,
		blast: f.blast - f.steel,
		tap: f.man - f.steel + 10,
	};
	return (
		<AbsoluteFill style={{background: '#0B0B0C'}}>
			{/* 1991 */}
			<Shot a={0} b={f.opens} name="india-1991" fadeIn={8}>
				<Photo file="G010a.jpg" dur={f.opens} move={[0.0, 0.2, 0.02, -0.02]} grade="archive" depth={0.14} />
				<Kinetic text="1991" at={4} until={f.crisis - 6} display size={170} />
				<Stamp text="INDIA · 1991" sub="A STREET THAT YEAR" at={f.crisis} until={f.opens} />
			</Shot>
			<Shot a={f.opens} b={f.hands} name="bse">
				<Photo file="G008a.jpg" dur={f.hands - f.opens} move={[0.0, 0.18, 0.0, 0.0, 0.02, -0.04]} grade="modern" depth={0.12} />
				<Stamp text="BOMBAY STOCK EXCHANGE" sub="TODAY" at={20} until={f.hands - f.opens} />
			</Shot>
			{/* J.R.D. hands over to a quiet, private man */}
			<Shot a={f.hands} b={f.ratan} name="handover">
				<Desk />
				<Print file={`${M}/raw/wm/F001_38_j-r-d-tata-1955-jpg.jpg`} at={4} width={400} x={-320} rotate={-2.5} seed="jrd-h" />
				<Print file={`${M}/raw/wm/G002_54_ratantata-jpg.jpg`} at={f.quiet - f.hands} width={420} x={320} rotate={2} grade="modern" seed="rt-h" />
			</Shot>
			<Shot a={f.ratan} b={f.look} name="ratan">
				<DeskPrint file="raw/wm/G002_55_shri-ratan-naval-tata-jpg.jpg" at={4} width={560} rotate={-1.5} grade="modern" seed="ratan" />
				<LowerThird name="RATAN NAVAL TATA" role="CHAIRMAN OF THE TATA GROUP, 1991 TO 2012" at={10} until={f.look - f.ratan} />
			</Shot>
			{/* a boy raised by his grandmother: an empty room, a curtain in the wind */}
			<Shot a={f.look} b={f.arch} name="room" tag="ILLUSTRATIVE FOOTAGE">
				<Camera seed="room" keys={[{f: 0, scale: 1.02}, {f: f.arch - f.look, scale: 1.12, x: 30}]}>
					<Footage file={`${M}/pix/pixabay_90447.mp4`} startFrom={3 * 60} grade="modern" />
				</Camera>
			</Shot>
			<Shot a={f.arch} b={f.home} name="architecture" atmos={false}>
				<Drafting />
				<Kinetic text="ARCHITECTURE · CORNELL, AMERICA" at={30} until={f.home - f.arch} size={40} y={430} />
			</Shot>
			<Shot a={f.home} b={f.first} name="home" tag="ILLUSTRATIVE FOOTAGE">
				<Camera seed="wing" keys={[{f: 0, scale: 1.0}, {f: f.first - f.home, scale: 1.08}]}>
					<Footage file={`${M}/pix/pixabay_22245.mp4`} startFrom={4 * 60} grade="modern" />
				</Camera>
				<Kinetic text="HOME TO INDIA" at={W('Then his grandmother fell ill', 'home') - f.home} until={f.first - f.home} display size={70} y={360} />
			</Shot>
			{/* two years at the furnace */}
			<Shot a={f.first} b={f.steel} name="shop-floor">
				<TapeFrame file={`${M}/footage/Y05_steelmaking.mp4`} startFrom={92 * 60} label="JAMSHEDPUR · FROM AN OLD TATA STEEL FILM" />
			</Shot>
			<Shot a={f.steel} b={f.man} name="furnace" atmos={false} tag="ILLUSTRATION">
				<Furnace tl={tl} />
				<Stamp text="JAMSHEDPUR" sub="TWO YEARS AT THE BLAST FURNACE" at={20} until={f.lime - f.steel} />
			</Shot>
			<Shot a={f.man} b={f.bet} name="workers">
				<CaptionCrop file={`${M}/footage/Y04_jamshedpur_100.mp4`} startFrom={49.5 * 60} rate={0.55} />
				<Stamp text="JAMSHEDPUR'S STEELWORKERS" sub="FROM A JAMSHEDPUR CENTENARY FILM" at={30} until={f.picture - f.man} />
			</Shot>
			{/* the architect's lines become a car */}
			<Shot a={f.bet} b={f.indica} name="drawing-a-car" atmos={false} tag="ILLUSTRATION">
				<Drafting buildingFrom={-200} carAt={f.car - f.bet - 30} />
				<Kinetic text="DESIGNED IN INDIA" at={f.car - f.bet + 60} until={f.indica - f.bet} size={44} y={-400} />
			</Shot>
			<Shot a={f.indica} b={f.book} name="indica">
				<TapeFrame file={`${M}/footage/Y17_indica.mp4`} startFrom={2 * 60} label="THE TATA INDICA · A TELEVISION ADVERT" />
				<Kinetic text="1998" at={W('The Indica, unveiled', 'nineteen') - f.indica} until={f.book - f.indica} display size={90} y={-470} />
			</Shot>
			<Shot a={f.book} b={f.complaints} name="bookings">
				<DeskPrint file="raw/wm/G003_09_2007-10-09-india-rhotang-pass-tourist-re.jpg" at={-30} width={1000} rotate={-1.5} grade="modern" seed="indica-in" />
				<CounterAt to={115000} start={10} land={f.complaints - f.book - 40} size={140} label="BOOKINGS · ABOUT" />
			</Shot>
			<Shot a={f.complaints} b={f.detroit} name="complaints" atmos={false}>
				<SteelWords words={[{text: 'QUALITY', at: f.quality - f.complaints}, {text: 'POWER', at: f.power - f.complaints}]} />
			</Shot>
			{/* Detroit, 1999 */}
			<Shot a={f.detroit} b={f.kadle} name="ford">
				<Photo file="G004a.jpg" dur={f.kadle - f.detroit} move={[0.0, 0.2, 0.02, -0.02]} grade="modern" depth={0.12} />
				<Kinetic text="1999" at={10} until={f.ford - f.detroit} display size={150} scrim={0.6} />
				<Stamp text="FORD MOTOR COMPANY" sub="HEADQUARTERS · DEARBORN, NEAR DETROIT" at={f.ford - f.detroit} until={f.sell - f.detroit} />
				<Kinetic text="TO SELL THE CAR BUSINESS" at={f.sell - f.detroit + 6} until={f.kadle - f.detroit} display size={64} y={360} />
			</Shot>
			<Shot a={f.kadle} b={f.asked} name="the-room" atmos={false} tag="ILLUSTRATION">
				<GlassTable />
				<LowerThird name="PRAVIN KADLE" role="TATA VETERAN · IN THE ROOM IN 1999" at={20} until={f.asked - f.kadle} />
			</Shot>
			<Shot a={f.asked} b={f.favourS} name="why">
				<QuoteCard
					lines={['You do not know anything,', 'why did you start the', 'passenger car division at all.']}
					attribution="FORD'S SIDE, 1999 · AS PRAVIN KADLE RECALLED IT IN 2015"
					at={6}
					mark={1}
					markFrom={f.why - f.asked}
					markTo={f.favourS - f.asked - 20}
					tone="card"
					seed="q-why"
				/>
			</Shot>
			<Shot a={f.favourS} b={f.off} name="favour">
				<QuoteCard
					lines={['They said they will do us a favour', 'by buying our car division.']}
					attribution="PRAVIN KADLE · 2015"
					at={6}
					mark={0}
					markFrom={f.favour - f.favourS - 10}
					markTo={f.off - f.favourS - 20}
					tone="card"
					seed="q-favour"
				/>
			</Shot>
			<Shot a={f.off} b={f.back} name="deal-off" atmos={false} tag="ILLUSTRATION">
				<GlassTable darkAt={6} />
			</Shot>
			{/* signature 6: the silence */}
			<Shot a={f.back} b={f.what} name="silence" atmos={false} tag="ILLUSTRATION">
				<Porthole
					file={`${M}/pix/pixabay_255761.mp4`}
					startFrom={0}
					countFrom={f.spoke - f.back + 60}
					countTo={f.know - f.back}
					minutes={90}
					fadeAt={f.hold - f.back}
				/>
			</Shot>
			<Shot a={f.what} b={f.notSell} name="what-now">
				<DeskPrint file="raw/wm/G002_51_ratan-naval-tata-in-2011-jpg.jpg" at={-40} width={600} rotate={1.5} grade="modern" seed="ratan-what" />
			</Shot>
			{/* three verbs, three cuts */}
			<Shot a={f.notSell} b={f.fixes} name="does-not-sell">
				<DeskPrint file="raw/wm/G003_06_1999-indica-jpg.jpg" at={-20} width={900} rotate={1.5} grade="modern" seed="indica-keep" />
			</Shot>
			<Shot a={f.fixes} b={f.buying} name="fixes">
				<TapeFrame file={`${M}/footage/Y17_indica.mp4`} startFrom={53 * 60} label="THE TATA INDICA · A TELEVISION ADVERT" />
			</Shot>
			<Shot a={f.buying} b={f.y2007} name="tetley">
				<Photo file="G005a.jpg" dur={f.y2007 - f.buying} move={[0.0, 0.18]} grade="modern" depth={0.08} />
				<Stamp text="TETLEY" sub="BOUGHT BY TATA IN 2000" at={14} until={f.y2007 - f.buying} />
			</Shot>
			{/* Corus, 2007 */}
			<Shot a={f.y2007} b={f.corus} name="ijmuiden">
				<Photo file="G009a.jpg" dur={f.corus - f.y2007} move={[0.0, 0.18, 0.02, -0.02]} grade="modern" depth={0.12} />
				<Kinetic text="2007" at={W('Then, in two thousand seven', 'two') - f.y2007} until={f.corus - f.y2007} display size={150} scrim={0.6} />
				<Stamp text="CORUS · IJMUIDEN" sub="THE NETHERLANDS" at={W('Then, in two thousand seven', 'biggest') - f.y2007} until={f.corus - f.y2007} />
			</Shot>
			<Shot a={f.corus} b={f.upcott} name="port-talbot">
				<Photo file="G006a.jpg" dur={f.upcott - f.corus} move={[0.0, 0.22, 0.02, -0.02]} grade="modern" depth={0.14} />
				<Stamp text="PORT TALBOT, WALES" sub="ONE OF CORUS'S STEELWORKS" at={20} until={f.twelve - f.corus - 20} />
				<CounterAt to={12} start={f.twelve - f.corus - 30} land={f.twelve - f.corus + 20} prefix="$" suffix=" BILLION" size={130} label="ABOUT" />
			</Shot>
			<Shot a={f.upcott} b={f.hundred} name="upcott-returns">
				<QuoteCard lines={UPCOTT} attribution="SIR FREDERICK UPCOTT · AS TOLD IN TATA'S HISTORIES" at={-60} mark={1} markFrom={f.eat - f.upcott} markTo={f.hundred - f.upcott - 10} tone="newsprint" seed="q-upcott" />
			</Shot>
			<Shot a={f.hundred} b={f.next} name="hundred-years">
				<AbsoluteFill style={{filter: 'brightness(0.5)'}}>
					<Footage file={`${M}/footage/Y11_port_talbot_close.mp4`} startFrom={900 * 60} grade="modern" />
				</AbsoluteFill>
				<AbsoluteFill style={{background: 'radial-gradient(ellipse 38% 32% at 50% 52%, rgba(8,8,10,0.78) 0%, transparent 100%)'}} />
				<YearRoller from={1907} to={2007} start={20} land={f.next - f.hundred - 90} label="BRITISH STEEL · NOW TATA'S" />
			</Shot>
			<Shot a={f.next} b={f.proudest} name="tested">
				<DeskPrint file="raw/wm/G002_55_shri-ratan-naval-tata-jpg.jpg" at={-60} width={540} rotate={-1} grade="archive" seed="ratan-tested" />
			</Shot>
			{/* four pages of 2008 */}
			<Shot a={f.proudest} b={f.end} name="calendar-2008" atmos={false}>
				<Desk light="rgba(255,190,120,0.16)" />
				<Camera seed="cal" keys={[{f: 0, scale: 1.0}, {f: f.end - f.proudest, scale: 1.1, y: -10}]}>
					<DeskCalendar tears={[f.biggest - f.proudest - 6, f.hardest - f.proudest - 6, f.darkest - f.proudest - 6]} scale={1.05} />
				</Camera>
				<Kinetic text="2008" at={6} until={f.end - f.proudest} display size={60} y={-470} color={colors.gold} />
			</Shot>
		</AbsoluteFill>
	);
};

export const humiliationFrames = f;
