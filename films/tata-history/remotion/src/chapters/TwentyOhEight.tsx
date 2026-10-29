import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors, Desk, ease, Footage, Grain, Kinetic, LightLeak, LowerThird, PortraitPlate, Print, QuoteCard, Stamp, tween, Vignette} from '../../../../../lib/remotion';
import {InkPaper} from '../../../../../lib/remotion/ink';
import {DeskCalendar} from '../../../../../lib/remotion/kinetic';
import {camFit, IndiaMap, MapPin, MapRoute, mapCam, PLACES} from '../../../../../lib/remotion/map';
import {chapterClock, CounterAt, DeskPrint, Photo, Shot} from '../kit';
import {TapeFrame} from '../shots/ch3';
import {Fading} from '../shots/ch2';
import {Porthole} from '../shots/ch6';
import {BanquetHall, Corridor, KitchenDoors, OnBlack, Uniforms} from '../shots/ch7';

// Chapter 7, Twenty oh eight (plan_v6 §4 ch 7): the 2008 calendar, page by page. January: the Nano, a promise, the
// family on the scooter. March: Jaguar Land Rover, and the plane window in daylight (signature 6 paid off). October:
// Singur to Sanand. November: the Taj, told with dignity: real aftermath photos, the 1903 dome (signature 5), and the
// staff as spaces and uniforms, never faces or violence. 2 min 2 s.
const C = chapterClock('Twenty oh eight');
// every lookup searches from this chapter's first sentence ('January.', 'March.' and 'Night.' are short)
const A = C.id('January.');
const S = (text: string): number => C.S(text, A);
const W = (sentence: string, phrase: string): number => C.W(sentence, phrase, A);
const M = 'assets/media';

const f = {
	jan: 0,
	delhi: S('Delhi.'),
	drives: S('Ratan Tata drives a tiny car'),
	nano: S('The Nano.'),
	lakh: S('A car for one lakh rupees'),
	costs: S('Costs have gone up'),
	promise: S('But a promise is a promise'),
	later: S('He said later what moved him'),
	families: S('Indian families riding on scooters'),
	four: S('Four or five people'),
	seen: S("You've seen that family"),
	child: S('Maybe you were the child'),
	roof: S('He wanted to give that family a roof'),
	roofW: W('He wanted to give that family a roof', 'roof'),
	march: S('March.'),
	ford: S('Ford is selling'),
	jlr: S('Jaguar and Land Rover'),
	landRover: W('Jaguar and Land Rover', 'Land'),
	who: S('And who do you think buys them'),
	tata: S('Tata.'),
	bn: S('About two point three billion'),
	kadle: S('And according to Pravin Kadle, Bill Ford'),
	favour: W('And according to Pravin Kadle, Bill Ford', 'you'),
	never: S('Ford has never confirmed'),
	real: S('But the deal is real'),
	oct: S('October.'),
	singur: S('The Nano factory at Singur'),
	pulls: S('Ratan Tata pulls out'),
	gujarat: W('Ratan Tata pulls out', 'Gujarat'),
	nov: S('And then, November'),
	date: S('The twenty sixth of November'),
	night: S('Night.'),
	storm: S('Terrorists storm the Taj'),
	jamsetji: S("Jamsetji's hotel"),
	inside: S('Inside, the staff could run'),
	stay: S('But many of them stay'),
	ordinary: S('These are ordinary people'),
	waiters: S('Waiters.'),
	cooks: S('Cooks.'),
	managers: S('Managers on a salary'),
	likeUs: S('People like us'),
	banquet: S('A banquet manager'),
	locks: W('A banquet manager', 'locks'),
	lights: W('A banquet manager', 'lights'),
	sixty: S('She keeps more than sixty guests'),
	kitchens: S('In the kitchens'),
	killed: S('A number of them are killed'),
	kang: S('The general manager, Karambir Singh Kang'),
	die: S('They die in the fire'),
	rest: S('And when Ratan Tata asks him'),
	thirtyOne: S('At least thirty one people'),
	three: S('The fighting lasts three days'),
	reopens: S('Twenty five days later'),
	wing: S('The old palace wing'),
	end: C.end,
};

/** October: Singur in West Bengal, then the factory's road across India to Sanand in Gujarat. */
const SingurToSanand: React.FC<{routeFrom: number; sanandAt: number}> = ({routeFrom, sanandAt}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const sing = camFit([PLACES.singur], 380);
	const near = {x: sing.x, y: sing.y, zoom: 2.2};
	const both = camFit([PLACES.singur, PLACES.sanand], 300);
	const cam = mapCam(
		[
			{f: 0, x: 80, y: 0, zoom: 0.92},
			{...near, f: 60, zoom: near.zoom * 0.9},
			{...near, f: routeFrom - 10, zoom: near.zoom * 0.95},
			{...both, f: routeFrom + 90},
			{...both, f: durationInFrames, zoom: both.zoom * 1.06},
		],
		frame,
	);
	return (
		<AbsoluteFill style={{background: 'radial-gradient(ellipse 80% 70% at 50% 45%, #15161A 0%, #0D0E11 70%)'}}>
			<InkPaper grid={0.06} />
			<IndiaMap cam={cam} reveal={tween(frame, 0, 30, 0.3, 1, ease.arrive)} id="ch7-singur">
				<MapRoute stops={[PLACES.singur, PLACES.sanand]} from={routeFrom} dur={sanandAt - routeFrom} cam={cam} bend={-0.12} />
				<MapPin at={PLACES.singur} from={30} cam={cam} label="SINGUR" sub="WEST BENGAL" side="right" color={frame > routeFrom ? colors.muted : colors.gold} />
				<MapPin at={PLACES.sanand} from={sanandAt} cam={cam} label="SANAND" sub="GUJARAT" side="left" />
			</IndiaMap>
			<LightLeak color={colors.ember} side="left" strength={0.1} seed="ch7-map-leak" />
			<Vignette strength={0.6} />
			<Grain opacity={0.12} id="ch7-map-g" />
		</AbsoluteFill>
	);
};

/** The November page: it tears in from October, then the light on the desk goes out. */
const Darkening: React.FC<{from: number; children: React.ReactNode}> = ({from, children}) => {
	const frame = useCurrentFrame();
	return <AbsoluteFill style={{filter: `brightness(${1 - 0.8 * tween(frame, from, from + 70, 0, 1, ease.leave)})`}}>{children}</AbsoluteFill>;
};

const Calendar: React.FC<{tears: number[]}> = ({tears}) => (
	<AbsoluteFill>
		<Desk light="rgba(255,190,120,0.16)" />
		<DeskCalendar tears={tears} scale={1.05} />
		<Kinetic text="2008" at={-30} until={1e9} display size={60} y={-470} color={colors.gold} />
	</AbsoluteFill>
);

const GONE = -1000; // a page torn before the shot opens

export const TwentyOhEight: React.FC = () => (
	<AbsoluteFill style={{background: '#0B0B0C'}}>
		{/* JANUARY: Delhi, the Nano */}
		<Shot a={0} b={f.delhi} name="cal-january" atmos={false}>
			<Calendar tears={[]} />
		</Shot>
		<Shot a={f.delhi} b={f.nano} name="expo">
			<TapeFrame file={`${M}/footage/Y02_nano_launch_2.mp4`} startFrom={111.5 * 60} scan={false} label="DELHI AUTO EXPO · 10 JANUARY 2008" />
		</Shot>
		<Shot a={f.nano} b={f.costs} name="nano">
			<Photo file="H001c.jpg" dur={f.costs - f.nano} move={[0.0, 0.2, 0.02, -0.02]} grade="modern" depth={0.12} />
			<Kinetic text="THE NANO" at={6} until={f.lakh - f.nano} display size={110} scrim={0.6} />
			<CounterAt to={100000} start={f.lakh - f.nano} land={f.lakh - f.nano + 70} prefix="Rs. " size={140} label="ONE LAKH RUPEES" />
		</Shot>
		<Shot a={f.costs} b={f.promise} name="costs">
			<TapeFrame file={`${M}/footage/Y02_nano_launch_2.mp4`} startFrom={155 * 60} scan={false} label="DELHI AUTO EXPO · 10 JANUARY 2008" />
		</Shot>
		<Shot a={f.promise} b={f.later} name="promise">
			<QuoteCard lines={['A promise is a promise.']} attribution="RATAN TATA · DELHI, 10 JANUARY 2008" at={-10} mark={0} markFrom={20} markTo={f.later - f.promise - 20} tone="card" seed="q-promise" />
		</Shot>
		<Shot a={f.later} b={f.four} name="his-slide">
			<TapeFrame file={`${M}/footage/Y01_nano_launch_1.mp4`} startFrom={154 * 60} scan={false} label="FROM HIS LAUNCH PRESENTATION, 2008" />
		</Shot>
		<Shot a={f.four} b={f.child} name="scooter">
			<Photo file="cm/cm_chennairanfamily-on-scooter-jpg.jpg" dur={f.child - f.four} move={[0.04, 0.2, 0.03, -0.02]} grade="modern" depth={0.2} />
			<Stamp text="CHENNAI" sub="A FAMILY ON ONE SCOOTER, IN THE RAIN" at={30} until={f.seen - f.four} />
		</Shot>
		<Shot a={f.child} b={f.march} name="scooter-child">
			<Photo file="cm/cm_family-on-scooter-bangalore-india-162883.jpg" dur={f.march - f.child} move={[0.18, 0.3, 0.04, 0.06, 0.0, 0.01]} grade="modern" depth={0.2} />
		</Shot>
		{/* MARCH: Jaguar Land Rover */}
		<Shot a={f.march} b={f.ford} name="cal-march" atmos={false}>
			<Calendar tears={[4]} />
		</Shot>
		<Shot a={f.ford} b={f.jlr} name="ford-2008">
			<Photo file="G004a.jpg" dur={f.jlr - f.ford} move={[0.1, 0.26, -0.02, 0.02]} grade="modern" depth={0.12} />
			<Stamp text="FORD MOTOR COMPANY" sub="2008" at={14} until={f.jlr - f.ford} />
		</Shot>
		<Shot a={f.jlr} b={f.bn} name="jaguar-land-rover">
			<Desk />
			<Print file={`${M}/raw/wm/H008_21_jaguar-xf-2008-front-right-jpg.jpg`} at={2} width={680} x={-380} y={-20} rotate={-2} grade="modern" caption="JAGUAR" seed="jag" />
			<Print file={`${M}/raw/wm/H009_30_2008-land-rover-defender-90-2-4-tdci-cou.jpg`} at={f.landRover - f.jlr} width={600} x={380} y={10} rotate={2} grade="modern" caption="LAND ROVER" seed="lr" />
			<Kinetic text="TATA" at={f.tata - f.jlr} until={f.bn - f.jlr} display size={200} color={colors.gold} scrim={0.7} />
		</Shot>
		<Shot a={f.bn} b={f.kadle} name="two-point-three">
			<Photo file="H009a.jpg" dur={f.kadle - f.bn} move={[0.0, 0.18]} grade="modern" depth={0.12} />
			<CounterAt to={2.3} start={6} land={70} prefix="$" suffix=" BILLION" size={140} label="ABOUT" format={(n) => n.toFixed(1)} />
		</Shot>
		{/* signature 6 paid off: the same window, in daylight */}
		<Shot a={f.kadle} b={f.real} name="favour-window" atmos={false} tag="ILLUSTRATION">
			<Porthole
				file={`${M}/pix/pixabay_22245.mp4`}
				startFrom={8 * 60}
				x={-420}
				brightness={1.0}
				side={
					<>
						<Kinetic text="YOU ARE DOING US" at={f.favour - f.kadle} until={f.never - f.kadle + 10} size={58} x={330} y={-60} />
						<Kinetic text="A BIG FAVOUR" at={f.favour - f.kadle + 40} until={f.never - f.kadle + 10} display size={84} x={330} y={30} color={colors.gold} />
						<Kinetic text="BILL FORD, 2008 · AS PRAVIN KADLE TELLS IT" at={f.favour - f.kadle + 80} until={f.never - f.kadle + 10} size={22} x={330} y={110} />
						<Kinetic text="FORD HAS NEVER CONFIRMED EITHER LINE" at={f.never - f.kadle + 6} until={f.real - f.kadle} size={30} x={330} y={0} />
					</>
				}
			/>
		</Shot>
		<Shot a={f.real} b={f.oct} name="deal-real">
			<Photo file="H008a.jpg" dur={f.oct - f.real} move={[0.0, 0.16, 0.02, -0.02]} grade="modern" depth={0.12} />
			<Stamp text="JAGUAR LAND ROVER" sub="BOUGHT FROM FORD, 2008" at={10} until={f.oct - f.real} />
		</Shot>
		{/* OCTOBER: Singur to Sanand */}
		<Shot a={f.oct} b={f.singur} name="cal-october" atmos={false}>
			<Calendar tears={[GONE, 4]} />
		</Shot>
		<Shot a={f.singur} b={f.nov} name="singur-sanand" atmos={false}>
			<SingurToSanand routeFrom={f.pulls - f.singur + 30} sanandAt={f.gujarat - f.singur} />
		</Shot>
		{/* NOVEMBER: the page tears in, then the light goes out */}
		<Shot a={f.nov} b={f.date} name="cal-november" atmos={false}>
			<Darkening from={f.date - f.nov - 70}>
				<Calendar tears={[GONE, GONE, 6]} />
			</Darkening>
		</Shot>
		<Shot a={f.date} b={f.storm} name="the-date" atmos={false}>
			<AbsoluteFill style={{filter: 'brightness(0.42) contrast(1.1)'}}>
				<Photo file="cm/cm_rain-soaked-taj-mahal-palace-hotel-35980.jpg" dur={f.storm - f.date} move={[0.02, 0.14, 0.0, 0.0, 0.01, -0.01]} grade="night" depth={0.14} />
			</AbsoluteFill>
			<OnBlack
				bg="transparent"
				lines={[
					{text: '26 NOVEMBER 2008', at: 12, serif: true, size: 64},
					{text: 'NIGHT', at: f.night - f.date, size: 26},
				]}
			/>
		</Shot>
		{/* signature 5: the dome, after the attack; then Jamsetji's 1903 hotel in the same framing as chapter 1 */}
		<Shot a={f.storm} b={f.jamsetji} name="burnt-dome">
			<Photo file="H012a.jpg" dur={f.jamsetji - f.storm} move={[0.06, 0.2, 0.02, 0.04]} grade="modern" depth={0.12} />
			<Stamp text="THE TAJ, AFTER THE ATTACK" sub="NOVEMBER 2008" at={20} until={f.jamsetji - f.storm} />
		</Shot>
		<Shot a={f.jamsetji} b={f.inside} name="taj-1903-dome" fadeIn={20}>
			<Photo file="B009c.jpg" dur={f.inside - f.jamsetji} move={[0.02, 0.2, 0.03, 0.06, 0.02, 0.05]} grade="modern" depth={0.16} />
			<LowerThird name="JAMSETJI'S HOTEL" role="OPENED IN 1903" at={30} until={f.inside - f.jamsetji} />
		</Shot>
		{/* the staff: spaces and silhouettes, never faces */}
		<Shot a={f.inside} b={f.ordinary} name="corridor" leak={colors.ember}>
			<AbsoluteFill style={{filter: 'brightness(0.8) saturate(0.75)'}}>
				<Photo file="cm/cm_staircase-taj-hotel-jpg.jpg" dur={f.ordinary - f.inside} move={[0.04, 0.22, 0.0, 0.0, 0.02, -0.03]} grade="night" depth={0.18} />
			</AbsoluteFill>
		</Shot>
		<Shot a={f.ordinary} b={f.banquet} name="uniforms" leak={colors.ember}>
			<AbsoluteFill style={{filter: 'brightness(0.6) saturate(0.7)'}}>
				<Photo file="cm/cm_taj-reception-jpg.jpg" dur={f.banquet - f.ordinary} move={[0.06, 0.2, 0.0, 0.0, 0.02, -0.02]} grade="night" depth={0.16} />
			</AbsoluteFill>
			<Kinetic text="WAITERS" at={f.waiters - f.ordinary} until={f.banquet - f.ordinary} size={46} y={-90} />
			<Kinetic text="COOKS" at={f.cooks - f.ordinary} until={f.banquet - f.ordinary} size={46} y={-10} />
			<Kinetic text="MANAGERS" at={f.managers - f.ordinary} until={f.banquet - f.ordinary} size={46} y={70} />
		</Shot>
		<Shot a={f.banquet} b={f.kitchens} name="banquet-hall" atmos={false}>
			<Darkening from={f.lights - f.banquet}>
				<Photo file="cm/cm_india-mumbai-magnifient-interior-stairca.jpg" dur={f.kitchens - f.banquet} move={[0.02, 0.18, -0.02, 0.02]} grade="night" depth={0.16} />
			</Darkening>
			<Kinetic text="MORE THAN SIXTY GUESTS · SILENT IN THE DARK" at={f.sixty - f.banquet + 30} until={f.kitchens - f.banquet} size={30} y={-400} />
		</Shot>
		<Shot a={f.kitchens} b={f.kang} name="back-entrance" atmos={false}>
			<Fading from={f.killed - f.kitchens}>
				<Photo file="cm/cm_2008-mumbai-terror-attacks-taj-back-entr.jpg" dur={f.kang - f.kitchens} move={[0.2, 0.3, 0.07, 0.08, 0.0, 0.01]} grade="steel" depth={0.16} />
			</Fading>
			<Stamp text="THE TAJ'S BACK ENTRANCE" sub="2008" at={30} until={f.killed - f.kitchens} />
		</Shot>
		{/* no licensed photograph of Karambir Singh Kang: his name, quietly */}
		<Shot a={f.kang} b={f.rest} name="kang" atmos={false}>
			<AbsoluteFill style={{filter: 'brightness(0.32) saturate(0.4)'}}>
				<Photo file="H012c.jpg" dur={f.rest - f.kang} move={[0.04, 0.12]} grade="night" depth={0.1} />
			</AbsoluteFill>
			<OnBlack
				bg="transparent"
				lines={[
					{text: 'KARAMBIR SINGH KANG', at: 20, serif: true, size: 60},
					{text: 'GENERAL MANAGER, THE TAJ', at: 60, size: 26},
				]}
			/>
		</Shot>
		<Shot a={f.rest} b={f.thirtyOne} name="ratan-asks">
			<PortraitPlate file="assets/media/raw/wm/G002_54_ratantata-jpg.jpg" place="assets/media/H012d.jpg" side="left" share={0.46} focus="50% 25%" grade="steel" />
		</Shot>
		<Shot a={f.thirtyOne} b={f.three} name="candle">
			<Footage file={`${M}/pix/pixabay_31440.mp4`} startFrom={2 * 60} grade="modern" />
			<Kinetic text="AT LEAST 31 PEOPLE DIED AT THE TAJ" at={24} until={f.three - f.thirtyOne} size={28} y={400} />
		</Shot>
		<Shot a={f.three} b={f.reopens} name="three-days">
			<Photo file="H012d.jpg" dur={f.reopens - f.three} move={[0.0, 0.16, 0.0, 0.0, 0.03, -0.01]} grade="modern" depth={0.12} />
			<Stamp text="26 – 29 NOVEMBER 2008" sub="THE MAIN DOME, AFTER THE FIRE" at={10} until={f.reopens - f.three} />
		</Shot>
		<Shot a={f.reopens} b={f.wing} name="reopens" fadeIn={20}>
			<Photo file="H006c.jpg" dur={f.wing - f.reopens} move={[0.0, 0.2, 0.0, 0.0, 0.02, -0.02]} grade="modern" depth={0.14} />
			<Stamp text="21 DECEMBER 2008" sub="THE TAJ OPENS AGAIN · THE DOME TODAY" at={W('Twenty five days later', 'opens') - f.reopens} until={f.wing - f.reopens} />
		</Shot>
		<Shot a={f.wing} b={f.end} name="palace-wing">
			<Photo file="H006b.jpg" dur={f.end - f.wing} move={[0.0, 0.16, -0.02, 0.02]} grade="modern" depth={0.14} />
			<Stamp text="THE PALACE WING" sub="REOPENED AUGUST 2010" at={20} until={f.end - f.wing} />
		</Shot>
	</AbsoluteFill>
);

export const twentyOhEightFrames = f;
