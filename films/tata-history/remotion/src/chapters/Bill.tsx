import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Camera, colors, Desk, ease, Footage, Grain, Kinetic, LowerThird, PortraitPlate, Print, Stamp, tween, Vignette} from '../../../../../lib/remotion';
import {chapterClock, DeskPrint, Photo, Shot} from '../kit';
import {ArchiveClip} from '../v7';
import {Fading} from '../shots/ch2';
import {OnBlack} from '../shots/ch7';
import {ProfitBar, SplitPair} from '../shots/ch8';

// Chapter 8, The bill (plan_v6 §4 ch 8): Port Talbot's furnaces go out → was Corus worth it, unresolved → the Nano
// in a museum → "No." → 2016, the boardroom fight and the Supreme Court → Chandrasekaran → T.C.S., the engine, 87% →
// 2022, Air India comes home → J.R.D. → AI171: black, a candle, no aircraft, no crash imagery. 1 min 39 s.
const C = chapterClock('The bill');
const A = C.id('Big bets come with big bills');
const S = (text: string): number => C.S(text, A);
const W = (sentence: string, phrase: string): number => C.W(sentence, phrase, A);
const M = 'assets/media';

const f = {
	bets: 0,
	crash: S('A year after the Corus deal'),
	losses: S('Years of losses follow'),
	y2024: S('And in twenty twenty four'),
	shut: W('And in twenty twenty four', 'shut'),
	worth: S('Was Corus worth it'),
	nano: S('And the Nano'),
	seen: S('People did not want to be seen'),
	admitted: S('Tata itself admitted'),
	ended: S('Production ended'),
	right: S('So does Tata always get it right'),
	no: S('No.'),
	wrong: S('More than once'),
	y2016: S('In twenty sixteen'),
	mistry: W('In twenty sixteen', 'Cyrus'),
	court: S('It goes all the way to the Supreme Court'),
	chandra: S('The new chairman is'),
	joined: S('He joined T.C.S.'),
	tcs: S('And T.C.S.?'),
	engine: S("It's now the engine"),
	last: S('Last year, of all the profit'),
	eighty: W('Last year, of all the profit', 'eighty'),
	y2022: S('Then, in twenty twenty two'),
	returns: S('Air India returns to Tata'),
	jrd: S('J.R.D. did not live to see it'),
	stop: S("But there's one more moment"),
	june: S('June, twenty twenty five'),
	ai171: S('Air India flight one seven one'),
	killed: S('Two hundred and sixty people'),
	report: S('The final report is not out yet'),
	remember: S('We remember every life'),
	end: C.end,
};

export const Bill: React.FC = () => (
	<AbsoluteFill style={{background: '#0B0B0C'}}>
		{/* Port Talbot: the bill for Corus */}
		<Shot a={0} b={f.crash} name="port-talbot-furnace">
			<Photo file="G006b.jpg" dur={f.crash} move={[0.0, 0.18, 0.02, -0.02]} grade="steel" depth={0.12} />
		</Shot>
		<Shot a={f.crash} b={f.losses} name="crash-2008">
			<Camera seed="pt-crash" keys={[{f: 0, scale: 1.04}, {f: f.losses - f.crash, scale: 1.1}]}>
				<Footage file={`${M}/footage/Y11_port_talbot_close.mp4`} startFrom={250 * 60} rate={0.8} grade="steel" />
			</Camera>
			<Stamp text="2008" sub="THE WORLD ECONOMY CRASHES" at={20} until={f.losses - f.crash} />
		</Shot>
		<Shot a={f.losses} b={f.y2024} name="losses">
			<Photo file="G006c.jpg" dur={f.y2024 - f.losses} move={[0.0, 0.16, 0.02, -0.02]} grade="night" depth={0.1} />
			<Stamp text="PORT TALBOT, WALES" sub="YEARS OF LOSSES" at={14} until={f.y2024 - f.losses} />
		</Shot>
		<Shot a={f.y2024} b={f.worth} name="furnace-out">
			<Fading from={f.shut - f.y2024}>
				<Camera seed="pt-out" keys={[{f: 0, scale: 1.02}, {f: f.worth - f.y2024, scale: 1.1}]}>
					<Footage file={`${M}/footage/Y11_port_talbot_close.mp4`} startFrom={1130 * 60} grade="steel" />
				</Camera>
			</Fading>
			<Stamp text="30 SEPTEMBER 2024" sub="PORT TALBOT'S LAST BLAST FURNACE IS SHUT" at={f.shut - f.y2024} until={f.worth - f.y2024} />
		</Shot>
		<Shot a={f.worth} b={f.nano} name="worth-it">
			<SplitPair left="G006b.jpg" right="G009a.jpg" leftLabel="PORT TALBOT" rightLabel="IJMUIDEN" grade="steel" />
			<Kinetic text="WAS CORUS WORTH IT?" at={10} until={f.nano - f.worth} display size={70} scrim={0.7} />
		</Shot>
		{/* the Nano */}
		<Shot a={f.nano} b={f.admitted} name="nano-village">
			<Photo file="H001a.jpg" dur={f.admitted - f.nano} move={[0.0, 0.2, 0.02, -0.02]} grade="modern" depth={0.14} />
		</Shot>
		<Shot a={f.admitted} b={f.right} name="nano-museum">
			<Photo file="H001c.jpg" dur={f.right - f.admitted} move={[0.1, 0.24, -0.02, 0.02]} grade="steel" depth={0.12} />
			<Stamp text="PRODUCTION ENDED · 2018" sub="A NANO IN A CAR MUSEUM, COIMBATORE" at={f.ended - f.admitted} until={f.right - f.admitted} />
		</Shot>
		{/* "No." */}
		<Shot a={f.right} b={f.y2016} name="bombay-house">
			<Footage file={`${M}/footage/Y11_port_talbot_close.mp4`} startFrom={1096 * 60} rate={0.55} grade="steel" />
			<Kinetic text="NO." at={f.no - f.right} until={f.wrong - f.right + 40} display size={160} scrim={0.6} />
		</Shot>
		<Shot a={f.y2016} b={f.court} name="mistry">
			<PortraitPlate file="assets/media/raw/wm/I010_02_cyrus-mistry-jpg.jpg" place="assets/media/I011a.jpg" side="right" share={0.46} focus="50% 25%" grade="modern" />
			<Kinetic text="2016" at={10} until={f.mistry - f.y2016 - 10} display size={150} />
			<LowerThird name="CYRUS MISTRY" role="CHAIRMAN OF TATA SONS, 2012 TO 2016" at={f.mistry - f.y2016 + 30} until={f.court - f.y2016} />
		</Shot>
		<Shot a={f.court} b={f.chandra} name="supreme-court">
			<Photo file="I011a.jpg" dur={f.chandra - f.court} move={[0.0, 0.18]} grade="modern" depth={0.12} />
			<Stamp text="SUPREME COURT OF INDIA" sub="2021 · IT SIDES WITH TATA SONS" at={20} until={f.chandra - f.court} />
		</Shot>
		<Shot a={f.chandra} b={f.tcs} name="chandrasekaran">
			<PortraitPlate file="assets/media/raw/wm/I003_75_natarajan-chandrasekaran-at-wef-2011-jpg.jpg" place="assets/media/I012a.jpg" side="left" share={0.46} focus="50% 25%" grade="modern" />
			<LowerThird name="N. CHANDRASEKARAN" role="CHAIRMAN OF TATA SONS FROM 2017 · JOINED T.C.S. IN 1987" at={30} until={f.tcs - f.chandra} />
		</Shot>
		{/* T.C.S., the engine */}
		<Shot a={f.tcs} b={f.engine} name="punched-card-again">
			<DeskPrint file="raw/wm/J_10_ibm-1130-dup-control-card-png.jpg" at={-30} width={1300} rotate={-1} grade="modern" seed="card-2" />
		</Shot>
		<Shot a={f.engine} b={f.last} name="tcs-campus" fadeIn={10}>
			<Photo file="I012a.jpg" dur={f.last - f.engine} move={[0.0, 0.18, 0.02, -0.02]} grade="cyan" depth={0.12} />
			<Stamp text="T.C.S. · BENGALURU" sub="TODAY" at={14} until={f.last - f.engine} />
		</Shot>
		<Shot a={f.last} b={f.y2022} name="eighty-seven" atmos={false}>
			<ProfitBar fillAt={f.eighty - f.last - 40} share={0.87} />
		</Shot>
		{/* 2022: the favourite child comes home */}
		<Shot a={f.y2022} b={f.returns} name="constellation-returns">
			{/* v8: January 2022 itself (The Quint, the first day after the takeover), not a 1950s Constellation; its logo cropped */}
			<ArchiveClip file={`${M}/footage/N09_quint_ai_2022.mp4`} startFrom={0.5 * 60} rate={0.7} clear={0.12} anchor="100% 100%" grade="steel" />
			<Kinetic text="2022" at={20} until={f.returns - f.y2022} display size={150} color={colors.gold} scrim={0.5} />
		</Shot>
		<Shot a={f.returns} b={f.jrd} name="air-india-today">
			{/* v8: Air India's own footage of its new livery, its corner logo cropped (the A350 photo carried a Boeing 777X tail) */}
			<ArchiveClip file={`${M}/footage/Y10_air_india_new.mp4`} startFrom={15.4 * 60} rate={0.28} clear={0.12} anchor="50% 100%" grade="modern" />
			<Stamp text="AIR INDIA · BACK WITH TATA" sub="SIXTY NINE YEARS AFTER 1953" at={30} until={f.jrd - f.returns} />
		</Shot>
		<Shot a={f.jrd} b={f.stop} name="jrd-held">
			<PortraitPlate file="assets/media/jrd/jrd_late.jpg" place="assets/media/J005a.jpg" side="left" share={0.5} focus="50% 30%" grade="archive" />
			<LowerThird name="J.R.D. TATA" role="CHAIRMAN 1938 TO 1991 · DIED 1993" at={20} until={f.stop - f.jrd} />
		</Shot>
		{/* AI171 (v8, owner's choice): its own quiet card, not the 26/11 candle. No aircraft, no crash imagery: a dark
		    frame that breathes, the name and the date, and room tone under the voice */}
		<Shot a={f.stop} b={f.end} name="ai171" atmos={false}>
			<QuietCard />
			<OnBlack
				bg="transparent"
				x={0}
				y={0}
				lines={[
					{text: 'AIR INDIA FLIGHT 171', at: f.june - f.stop + 20, serif: true, size: 56, until: f.report - f.stop - 30},
					{text: 'JUNE 2025 · AHMEDABAD', at: f.ai171 - f.stop + 30, size: 30, until: f.report - f.stop - 30},
					{text: '260 LIVES', at: f.killed - f.stop, size: 32, until: f.report - f.stop - 30},
				]}
			/>
		</Shot>
	</AbsoluteFill>
);

export const billFrames = f;

/** A near-black ground with a faint pool of warm light that breathes slowly, and film grain: dark, never frozen. */
const QuietCard: React.FC = () => {
	const frame = useCurrentFrame();
	const breath = 0.5 + 0.5 * Math.sin(frame / 95);
	return (
		<AbsoluteFill style={{background: '#050506'}}>
			<AbsoluteFill
				style={{
					background: `radial-gradient(ellipse 46% 40% at 50% 52%, rgba(120,92,60,${0.1 + 0.05 * breath}) 0%, rgba(40,30,22,0.05) 55%, rgba(0,0,0,0) 80%)`,
					opacity: tween(frame, 0, 90, 0, 1, ease.arrive),
				}}
			/>
			<Grain opacity={0.1} id="ai171-g" />
			<Vignette strength={0.7} />
		</AbsoluteFill>
	);
};
