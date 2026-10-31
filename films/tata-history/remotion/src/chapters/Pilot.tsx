import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Camera, colors, Footage, Kinetic, LowerThird, PortraitPlate, QuoteCard, Stamp} from '../../../../../lib/remotion';
import {YearRoller} from '../../../../../lib/remotion/kinetic';
import {MapFlight1932} from '../dev/map/MapScenes';
import {chapterClock, DeskPrint, Photo, Shot} from '../kit';
import {Fading} from '../shots/ch2';
import {Postcard, Telegram} from '../shots/ch5';

// Chapter 5, The pilot (plan_v6 §4 ch 5): J.R.D. → the 1932 flight, Karachi to Juhu → Air India and the chairman →
// 1953 and twenty five unpaid years → T.C.S. on punched cards → Sudha Murty's postcard → 1978. 2 min 33 s.
const C = chapterClock('The pilot');
const {S, W} = C;
const M = 'assets/media';

const f = {
	flies: S('And this one flies'),
	name: S('His full name is long'),
	tata: S('He was a Tata too'),
	paris: S('Born in Paris'),
	joined: S('But when he joined Tata'),
	apprentice: S('He started as an apprentice'),
	licence: S('In nineteen twenty nine'),
	oct: S('The fifteenth of October'),
	karachi: S('Karachi.'),
	climbs: S('J.R.D. climbs into'),
	mail: S('Behind him, bags of mail'),
	radio: S('No radio.'),
	lands: S('He lands in Bombay'),
	start: S('That flight is the start'),
	airlines: S('Tata Airlines.'),
	later: S('Later, Air India'),
	six: S('Six years after that flight'),
	builds: S('For twenty years he builds'),
	y1953: S('But in nineteen fifty three'),
	stay: S('So what does he do when they ask'),
	salary: S('And he does it without a salary'),
	y1968: S('Meanwhile, in nineteen sixty eight'),
	cards: S('Its first jobs are punched cards'),
	called: S("It's called Tata Consultancy Services"),
	tcs: S('T.C.S.'),
	remember: S('Remember that name'),
	carry: S('One day it will carry'),
	postcard: S('And in those years, J.R.D. gets a postcard'),
	april: S('April, nineteen seventy four'),
	student: S('A young engineering student'),
	bottom: S('At the bottom, one line'),
	lady: S('Lady candidates need not apply'),
	quiet: S('She could have kept quiet'),
	writes: S('Instead, she writes a postcard'),
	top: S('To the man at the top'),
	how: S('How can a company like Telco'),
	telegram: S('Less than ten days later'),
	come: S('Come for an interview'),
	pune: S('In Pune.'),
	job: S('She gets the job'),
	first: S('She becomes the first woman'),
	know: S('You may know her name'),
	sudha: S('Sudha Murty.'),
	kindly: S('But not every Tata story'),
	feb: S('February, nineteen seventy eight'),
	removes: S('A new government removes'),
	night: S('That night, someone asks'),
	feel: S('He says, I feel'),
	end: C.end,
};

export const Pilot: React.FC = () => (
	<AbsoluteFill style={{background: '#0B0B0C'}}>
		{/* a new captain, and this one flies */}
		<Shot a={0} b={f.name} name="puss-moth-front" fadeIn={10}>
			<Photo file="J003a.jpg" dur={f.name} move={[0.0, 0.22]} grade="modern" depth={0.18} />
		</Shot>
		{/* J.R.D. */}
		<Shot a={f.name} b={f.paris} name="jrd-1955">
			<PortraitPlate file={`${M}/raw/wm/F001_38_j-r-d-tata-1955-jpg.jpg`} place={`${M}/J003a.jpg`} side="right" share={0.46} focus="50% 25%" />
			<LowerThird name="JEHANGIR RATANJI DADABHOY TATA" role="J.R.D. · 1955" at={30} until={f.paris - f.name} />
		</Shot>
		<Shot a={f.paris} b={f.joined} name="paris">
			<Photo file="G001a.jpg" dur={f.joined - f.paris} move={[0.0, 0.16, 0.02, -0.02]} depth={0.2} />
			<Stamp text="PARIS" sub="AROUND 1900" at={20} until={f.joined - f.paris} />
		</Shot>
		<Shot a={f.joined} b={f.licence} name="apprentice">
			{/* v8: a Bombay business street of the period (LoC), not today's Bombay House with its window AC units */}
			<Photo file="B017c.jpg" dur={f.licence - f.joined} move={[0.04, 0.18, 0.01, -0.01]} grade="archive" depth={0.2} />
			<Stamp text="BOMBAY" sub="A BUSINESS STREET OF THE TIME" at={20} until={f.apprentice - f.joined} />
			<Kinetic text="1925 · APPRENTICE · NO PAY" at={f.apprentice - f.joined + 30} until={f.licence - f.joined} display size={72} />
		</Shot>
		<Shot a={f.licence} b={f.oct} name="licence">
			{/* v9: a pilot's licence is an aeroplane, not a stock sunset: the Puss Moth's own type, the year kept clear of it */}
			<Photo file="J001a.jpg" dur={f.oct - f.licence} move={[0.3, 0.42, -0.04, 0.02, 0.02, 0.0]} grade="aviation" depth={0.12} />
			<AbsoluteFill style={{background: 'rgba(6,8,12,0.35)'}} />
			<Kinetic text="1929" at={20} until={f.oct - f.licence} display size={150} y={-60} />
			<Kinetic text="INDIA'S FIRST PILOT LICENCE" at={50} until={f.oct - f.licence} size={40} y={70} />
		</Shot>
		{/* 15 October 1932, Karachi, 6:30 am */}
		<Shot a={f.oct} b={f.climbs} name="dawn">
			<Footage file={`${M}/pix/pixabay_1844.mp4`} startFrom={0} grade="modern" />
			<Stamp text="KARACHI · 15 OCT 1932 · 6:30 AM" at={f.karachi - f.oct - 10} until={f.climbs - f.oct} />
		</Shot>
		<Shot a={f.climbs} b={f.radio} name="puss-moth">
			<Photo file="J001a.jpg" dur={f.radio - f.climbs} move={[0.0, 0.18, 0.02, -0.02]} grade="modern" depth={0.18} />
			<Stamp text="A DE HAVILLAND PUSS MOTH" sub="THE SAME TYPE, PRESERVED TODAY" at={20} until={f.radio - f.climbs} />
		</Shot>
		<Shot a={f.radio} b={f.lands} name="no-radio" leak={false}>
			<Camera seed="sky" keys={[{f: 0, scale: 1.0}, {f: f.lands - f.radio, scale: 1.08}]}>
				<Footage file={`${M}/pix/pixabay_1844.mp4`} startFrom={12 * 60} grade="modern" />
			</Camera>
		</Shot>
		<Shot a={f.lands} b={f.start} name="route" atmos={false} tag="ILLUSTRATION">
			<MapFlight1932 />
		</Shot>
		<Shot a={f.start} b={f.six} name="anniversary">
			{/* v8: the clean print of the 1962 photograph (the video still was soft, and its push cut his face off); the source's
			    corner logo cropped off (…c.jpg); flat, since even shallow depth tore his white shirt's edge; the high-key print
			    taken down a touch */}
			<AbsoluteFill style={{filter: 'brightness(0.86)'}}>
				<Photo file="v8/V8_jrd_1962c.jpg" dur={f.six - f.start} move={[-0.04, 0.0, -0.06, -0.05, 0.065, 0.085]} grade="archive" depth={0} />
			</AbsoluteFill>
			<Stamp text="1962 · THIRTY YEARS ON" sub="J.R.D. FLIES THE SAME ROUTE AGAIN" at={30} until={f.airlines - f.start} />
			<Kinetic text="TATA AIRLINES" at={f.airlines - f.start} until={f.later - f.start + 10} display size={84} y={330} />
			<Kinetic text="AIR INDIA" at={f.later - f.start + 14} until={f.six - f.start} display size={84} y={330} color={colors.gold} />
		</Shot>
		{/* chairman at thirty four */}
		<Shot a={f.six} b={f.builds} name="chairman">
			{/* v8: J.R.D. at the chairman's desk (the old frame was caught mid-dissolve, a street and TATA STEEL ghosted
			    through his jacket); the source's corner logo cropped off */}
			<Photo file="v8/V8_jrd_deskc.jpg" dur={f.builds - f.six} move={[0.02, 0.12, -0.03, -0.02, 0.05, 0.06]} grade="archive" depth={0.08} />
			<LowerThird name="J.R.D. TATA" role="CHAIRMAN OF THE TATA GROUP FROM 1938" at={W('Six years after that flight', 'chairman') - f.six} until={f.builds - f.six} />
		</Shot>
		<Shot a={f.builds} b={f.y1953} name="constellation">
			<Photo file="F048a.jpg" dur={f.y1953 - f.builds} move={[0.0, 0.16, 0.02, -0.02]} grade="archive" depth={0.14} />
			<Stamp text="AIR INDIA" sub="A LOCKHEED CONSTELLATION" at={20} until={f.y1953 - f.builds} />
		</Shot>
		{/* 1953, and twenty five years without a salary */}
		<Shot a={f.y1953} b={f.stay} name="nationalised">
			<DeskPrint file="raw/wm/F004_46_air-india-super-constellation-heathrow-1.jpg" at={4} width={1000} rotate={-1.5} seed="sc" />
			<Kinetic text="1953 · THE GOVERNMENT TAKES OVER" at={20} until={f.stay - f.y1953} display size={60} y={380} />
		</Shot>
		<Shot a={f.stay} b={f.salary} name="stays-on">
			<PortraitPlate file={`${M}/jrd/jrd_pen.jpg`} place={`${M}/F048a.jpg`} side="left" share={0.46} focus="45% 25%" />
		</Shot>
		<Shot a={f.salary} b={f.y1968} name="unpaid" atmos={false}>
			<AbsoluteFill style={{filter: 'brightness(0.38)'}}>
				<Photo file="F046a.jpg" dur={f.y1968 - f.salary} move={[0.04, 0.16, 0.02, -0.02]} grade="aviation" depth={0.14} />
			</AbsoluteFill>
			<YearRoller from={1953} to={1978} start={10} land={f.y1968 - f.salary - 30} label="WITHOUT A SALARY" />
		</Shot>
		{/* 1968: punched cards; T.C.S. */}
		<Shot a={f.y1968} b={f.cards} name="card-reader">
			<DeskPrint file="raw/wm/J_11_ibm-3505-punched-card-reader-1-jpg.jpg" at={4} width={520} rotate={1.5} grade="modern" seed="reader" />
			<Stamp text="1968" sub="AN IBM CARD READER OF THE ERA" at={30} until={f.cards - f.y1968} />
		</Shot>
		<Shot a={f.cards} b={f.called} name="punched-card">
			<DeskPrint file="raw/wm/J_10_ibm-1130-dup-control-card-png.jpg" at={4} width={1300} rotate={-1} grade="modern" seed="card" />
		</Shot>
		<Shot a={f.called} b={f.postcard} name="tcs" atmos={false}>
			{/* the name, over the punched card on the desk (never on a black card) */}
			<DeskPrint file="raw/wm/J_10_ibm-1130-dup-control-card-png.jpg" at={-60} width={1500} rotate={1.5} grade="modern" seed="card2" />
			<AbsoluteFill style={{background: 'rgba(6,6,8,0.62)'}} />
			<Camera seed="tcs" keys={[{f: 0, scale: 1.0}, {f: f.postcard - f.called, scale: 1.12}]}>
				<Kinetic text="TATA CONSULTANCY SERVICES" at={8} until={f.tcs - f.called - 4} display size={64} />
				<Kinetic text="T.C.S." at={f.tcs - f.called} until={f.postcard - f.called} display size={200} color={colors.gold} />
			</Camera>
		</Shot>
		{/* April 1974: the postcard */}
		<Shot a={f.postcard} b={f.student} name="postcard" tag="ILLUSTRATION">
			<Postcard at={8} />
			<Stamp text="APRIL 1974" at={f.april - f.postcard} until={f.student - f.postcard} />
		</Shot>
		<Shot a={f.student} b={f.bottom} name="iisc-1974">
			<Photo file="raw/wm/B011_16_iisc-main-building-jpg.jpg" dur={f.bottom - f.student} move={[0.04, 0.2, 0.0, 0.0, -0.06, -0.02]} grade="modern" depth={0} />
			<Stamp text="BANGALORE" sub="THE INSTITUTE, TODAY" at={20} until={f.bottom - f.student} />
		</Shot>
		<Shot a={f.bottom} b={f.quiet} name="notice">
			<QuoteCard lines={['Lady candidates need not apply.']} attribution="TELCO JOB NOTICE · 1974 · AS SHE TELLS IT" at={6} mark={0} markFrom={f.lady - f.bottom} markTo={f.quiet - f.bottom - 10} tone="newsprint" seed="notice" />
		</Shot>
		<Shot a={f.quiet} b={f.top} name="writes" tag="ILLUSTRATION">
			<Postcard at={-200} flipAt={f.writes - f.quiet} />
		</Shot>
		<Shot a={f.top} b={f.telegram} name="to-jrd">
			<Photo file="jrd/jrd_late.jpg" dur={f.telegram - f.top} move={[0.04, 0.16, 0.0, 0.0, 0.02, 0.0]} grade="archive" depth={0} />
		</Shot>
		<Shot a={f.telegram} b={f.job} name="telegram" tag="RECONSTRUCTION">
			<Telegram at={10} line1At={f.come - f.telegram} line2At={f.pune - f.telegram - 10} />
		</Shot>
		<Shot a={f.job} b={f.know} name="shop-floor">
			<Camera seed="sanand" keys={[{f: 0, scale: 1.02}, {f: f.know - f.job, scale: 1.1}]}>
				<Footage file={`${M}/footage/Y18_sanand_plant.mp4`} startFrom={60 * 60} grade="modern" />
			</Camera>
			<Stamp text="A TATA MOTORS SHOP FLOOR" sub="TODAY" at={30} until={f.know - f.job} />
		</Shot>
		<Shot a={f.know} b={f.kindly} name="sudha">
			<DeskPrint file="raw/wm/J_14_sudha-murty-at-jaipur-literature-festiva.jpg" at={4} width={460} rotate={-1.5} grade="modern" seed="sudha" />
			<LowerThird name="SUDHA MURTY" role="THE FIRST WOMAN ON TELCO'S SHOP FLOOR" at={f.sudha - f.know} until={f.kindly - f.know} />
		</Shot>
		{/* 1978: his favourite child taken away */}
		<Shot a={f.kindly} b={f.night} name="removed">
			<Fading from={f.removes - f.kindly}>
				{/* v8: J.R.D. at Air India in his later years (age-matched), not a 1950s Constellation; the source's corner
				    logo cropped off (…c.jpg), held near full frame and flat (the soft print broke up and tore when pushed in) */}
				<Photo file="v8/V8_jrd_747c.jpg" dur={f.night - f.kindly} move={[0.0, 0.06, 0.03, 0.05, 0.05, 0.06]} grade="archive" depth={0} />
			</Fading>
			<Stamp text="J.R.D. AT AIR INDIA" sub="THE 1970s" at={f.feb - f.kindly} until={f.removes - f.kindly + 40} />
		</Shot>
		<Shot a={f.night} b={f.end} name="favourite-child">
			<PortraitPlate file={`${M}/v8/V8_jrd_older.jpg`} place={`${M}/F046a.jpg`} side="right" share={0.5} focus="60% 30%" push={[1.06, 1.16]} />
		</Shot>
	</AbsoluteFill>
);

export const pilotFrames = f;
