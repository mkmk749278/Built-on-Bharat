import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors, Desk, FrameSeq, Kinetic, LowerThird, PortraitPlate, Print, Stamp} from '../../../../../lib/remotion';
import {DepthPhoto} from '../../../../../lib/remotion/three/DepthPhoto';
import {Glint, YearRoller} from '../../../../../lib/remotion/kinetic';
import {chapterClock, CounterAt, DeskPrint, Photo, Shot} from '../kit';
import {Fading} from '../shots/ch2';
import {CaptionCrop, TrustLedger} from '../shots/ch4';
import {TablePhoto} from '../v7';

// Chapter 4, The diamond (plan_v6 §4 ch 4): the strike and the slump → close to two crore → back in the bank →
// the Jubilee's story and Meherbai → the pledge to the Imperial Bank (today SBI) → the loan, the furnaces, the wages →
// it comes back → two deaths → the trust, the jewels, the hospital → the shares the trust keeps. 2 min 9 s.
const C = chapterClock('The diamond');
const {S, W} = C;
const M = 'assets/media';
const BLENDER = `${M}/blender`;
const Y04 = `${M}/footage/Y04_jamshedpur_100.mp4`;

const f = {
	strike: S('In nineteen twenty two'),
	strikeW: W('In nineteen twenty two', 'strike'),
	good: S('Then the good years end'),
	y1924: S('By nineteen twenty four'),
	crore: W('By nineteen twenty four', 'crore'),
	where: S('Where do you find that kind'),
	banks: S('The banks want a guarantee'),
	back: S("So we're back in that bank"),
	called: S('The diamond on the counter is called'),
	found: S('It was found in South Africa'),
	named: W('It was found in South Africa', 'named'),
	bought: S('Around nineteen hundred'),
	courts: S('She wore it at royal courts'),
	hands: S('Now Dorabji hands it over'),
	imperial: W('Now Dorabji hands it over', 'imperial'),
	sbi: S('Today you know that bank'),
	loan: S('The loan comes through'),
	furnaces: S('The furnaces stay lit'),
	paid: S('The workers get paid'),
	hers: S('It was her diamond'),
	eat: S('And it went into a bank'),
	back2: S('Did they ever get it back'),
	will: S('We know because, eight years later'),
	meher: S('In nineteen thirty one, Meherbai dies'),
	dorabji: S('The next year, Dorabji dies too'),
	children: S('They have no children'),
	turn: S('And here is the turn'),
	trust: S('He leaves everything to a charitable trust'),
	shares: S('His shares in Tata Sons'),
	property: S('His property.'),
	jewels: S('And twenty one pieces'),
	name: S('The Sir Dorabji Tata Trust'),
	sells: S('A few years later, the trust sells'),
	hospital: S('And that money helps build a hospital'),
	tmh: S('The Tata Memorial Hospital, for cancer'),
	helped: S('So the diamond helped build'),
	you: S('If you, or someone you love'),
	keeps: S('But the shares in Tata Sons'),
	keep2: S('Those the trust keeps'),
	planned: S('And that means something no one had planned'),
	mind: S('Keep that in mind'),
	key: S("It's the key to the ending"),
	end: C.end,
};

export const Diamond: React.FC = () => (
	<AbsoluteFill style={{background: '#0B0B0C'}}>
		{/* a steel town is no fairy tale: Jamshedpur's people, from a Tata Steel film */}
		<Shot a={0} b={f.good} name="workers">
			<TablePhoto file="v8/V8_tisco_water.jpg" dur={f.good} aspect={900 / 420} w={30} seed="tisco-water" />
			<Stamp text="JAMSHEDPUR" sub="THE STEEL WORKS · AN EARLY PHOTOGRAPH" at={20} until={f.strike} />
			<Kinetic text="1922 · A STRIKE" at={f.strikeW - 20} until={f.good} display size={76} y={-60} />
		</Shot>
		{/* the good years end: the harbour where cheap steel comes in */}
		<Shot a={f.good} b={f.y1924} name="imports">
			<Photo file="B001b.jpg" dur={f.y1924 - f.good} move={[0.06, 0.2, 0.02, -0.02]} grade="modern" depth={0.18} />
			<Stamp text="BOMBAY HARBOUR" at={20} until={f.y1924 - f.good} />
		</Shot>
		{/* close to two crore */}
		<Shot a={f.y1924} b={f.where} name="two-crore">
			<AbsoluteFill style={{filter: 'brightness(0.42)'}}>
				<TablePhoto file="v8/V8_works_aerial.jpg" dur={f.where - f.y1924} aspect={960 / 600} w={28} seed="works-aerial" />
			</AbsoluteFill>
			<Stamp text="1924" at={10} until={f.where - f.y1924} />
			<CounterAt to={20000000} start={f.crore - f.y1924 - 60} land={f.crore - f.y1924} prefix="Rs. " size={150} label="CLOSE TO" />
		</Shot>
		{/* the banks want a guarantee: an Imperial Bank padlock */}
		<Shot a={f.where} b={f.back} name="padlock">
			<Photo file="F007a.jpg" dur={f.back - f.where} move={[0.0, 0.18, 0, 0, 0.02, -0.02]} grade="modern" depth={0.06} />
			<Stamp text="AN IMPERIAL BANK OF INDIA PADLOCK" at={f.banks - f.where} until={f.back - f.where} />
		</Shot>
		{/* back in that bank: the cold open's counter, the case on the counter */}
		<Shot a={f.back} b={f.called} name="counter-return" tag="RECONSTRUCTION">
			<FrameSeq dir={`${BLENDER}/c1`} prefix="c1_" last={210} from={150} rate={0.5} />
		</Shot>
		<Shot a={f.called} b={f.found} name="jubilee" tag="RECONSTRUCTION">
			<FrameSeq dir={`${BLENDER}/hero`} prefix="hero_" last={298} from={120} rate={0.8} />
			<Stamp text="THE JUBILEE" sub="245 CARATS" at={40} until={f.found - f.called} />
		</Shot>
		{/* South Africa 1895; the Diamond Jubilee */}
		<Shot a={f.found} b={f.named} name="mine">
			<Photo file="E004c.jpg" dur={f.named - f.found} move={[0.0, 0.18, 0.01, -0.01]} depth={0.18} />
			<Stamp text="SOUTH AFRICA · 1890s" sub="A DIAMOND MINE AT KIMBERLEY" at={20} until={f.named - f.found} />
		</Shot>
		<Shot a={f.named} b={f.bought} name="victoria-jubilee">
			<Photo file="F005a.jpg" dur={f.bought - f.named} move={[0.0, 0.16, 0.02, -0.02]} depth={0.16} />
			<Stamp text="LONDON · 1897" sub="QUEEN VICTORIA'S DIAMOND JUBILEE" at={10} until={f.bought - f.named} />
		</Shot>
		{/* Dorabji and Meherbai */}
		{/* each from their own photograph (the 1920s press photo of Lady Meherbai names no one else we can verify) */}
		<Shot a={f.bought} b={f.courts} name="the-couple">
			<Desk />
			<Print file={`${M}/raw/wm/A005_04_dorabji-tata-jpg.jpg`} at={4} width={440} x={-330} rotate={-2.5} seed="dor-c" />
			<Print file={`${M}/E003a.jpg`} at={40} width={360} x={330} rotate={2} seed="meh-c" />
		</Shot>
		<Shot a={f.courts} b={f.hands} name="meherbai" leak={colors.gold}>
			<DeskPrint file="E003a.jpg" at={-20} width={480} rotate={1.5} seed="meher" />
			<LowerThird name="LADY MEHERBAI TATA" role="WHO WORE THE JUBILEE" at={20} until={f.hands - f.courts} />
		</Shot>
		{/* the pledge: the lid opens on the counter; the Imperial Bank of India */}
		<Shot a={f.hands} b={f.sbi} name="pledge" tag="RECONSTRUCTION">
			<FrameSeq dir={`${BLENDER}/c2`} prefix="c2_" last={322} rate={322 / Math.max(1, f.sbi - f.hands)} />
			<Glint x={1128} y={686} at={(292 * (f.sbi - f.hands)) / 322} size={180} />
			<Stamp text="IMPERIAL BANK OF INDIA" sub="BOMBAY · 1924" at={f.imperial - f.hands} until={f.sbi - f.hands} />
		</Shot>
		<Shot a={f.sbi} b={f.loan} name="sbi" fadeIn={8}>
			<Photo file="F010a.jpg" dur={f.loan - f.sbi} move={[0.0, 0.14, 0, 0, 0.02, -0.02]} grade="modern" depth={0.12} />
			<Stamp text="STATE BANK OF INDIA" sub="MUMBAI, TODAY" at={20} until={f.loan - f.sbi} />
		</Shot>
		{/* the loan, the furnaces, the wages */}
		<Shot a={f.loan} b={f.furnaces} name="loan">
			<DeskPrint file="raw/wm/F_06_sbi-imperial-bank-seal-jpg.jpg" at={-10} width={520} rotate={-2} seed="seal" />
		</Shot>
		<Shot a={f.furnaces} b={f.paid} name="furnaces" leak={colors.ember}>
			<CaptionCrop file={Y04} startFrom={44 * 60} />
		</Shot>
		<Shot a={f.paid} b={f.hers} name="paid" leak={colors.ember}>
			<TablePhoto file="v8/V8_workers_crowd.jpg" dur={f.hers - f.paid} aspect={960 / 560} w={28} rot={1} seed="crowd" />
		</Shot>
		{/* her diamond, so that families could eat */}
		<Shot a={f.hers} b={f.eat} name="hers" leak={colors.gold}>
			<DepthPhoto file={`${M}/A005e.jpg`} keys={[{f: 0, dolly: 0.24, x: 0.09, y: 0.02}, {f: f.eat - f.hers, dolly: 0.32, x: 0.085, y: 0.02}]} depth={0.16} grade="archive" />
		</Shot>
		{/* families in a steel town: a Tata steelworker's family at home (United Nations photo, 1957) */}
		<Shot a={f.eat} b={f.back2} name="families">
			<DepthPhoto file={`${M}/raw/wm/A005_07_1957-photo-of-the-family-of-a-tata-iron.jpg`} keys={[{f: 0, dolly: 0.06}, {f: f.back2 - f.eat, dolly: 0.2, y: 0.01}]} depth={0.2} grade="archive" />
			<Stamp text="A STEELWORKER'S FAMILY" sub="JAMSHEDPUR · 1957" at={30} until={f.back2 - f.eat} />
		</Shot>
		{/* did they get it back? yes: in the will, 1932 */}
		<Shot a={f.back2} b={f.will} name="it-came-back">
			<PortraitPlate file={`${M}/E003a.jpg`} place={`${M}/B017a.jpg`} side="right" share={0.42} focus="50% 18%" />
		</Shot>
		<Shot a={f.will} b={f.meher} name="will-year" atmos={false}>
			<Desk />
			<AbsoluteFill style={{background: 'rgba(8,7,6,0.45)'}} />
			<YearRoller from={1924} to={1932} start={10} land={W('We know because, eight years later', 'will') - f.will} label="DORABJI'S WILL" />
		</Shot>
		{/* two deaths, no children */}
		<Shot a={f.meher} b={f.dorabji} name="meher-dies">
			<Fading from={f.dorabji - f.meher - 80}>
				<DeskPrint file="E003a.jpg" at={-80} width={480} rotate={1.5} seed="meher3" />
			</Fading>
			<Stamp text="LADY MEHERBAI TATA · DIED 1931" sub="LEUKAEMIA" at={30} until={f.dorabji - f.meher} />
		</Shot>
		<Shot a={f.dorabji} b={f.children} name="dorabji-dies">
			<Fading from={f.children - f.dorabji - 60}>
				<DeskPrint file="raw/wm/A005_04_dorabji-tata-jpg.jpg" at={-80} width={500} rotate={-2} seed="dor-end" />
			</Fading>
			<Stamp text="SIR DORABJI TATA · DIED 1932" at={20} until={f.children - f.dorabji} />
		</Shot>
		<Shot a={f.children} b={f.trust} name="the-couple-2">
			<Desk />
			<Print file={`${M}/raw/wm/A005_04_dorabji-tata-jpg.jpg`} at={-80} width={400} x={-300} rotate={-2.5} seed="dor-c2" />
			<Print file={`${M}/E003a.jpg`} at={-80} width={330} x={300} rotate={2} seed="meh-c2" />
		</Shot>
		{/* everything to a trust */}
		<Shot a={f.trust} b={f.name} name="trust-ledger" tag="ILLUSTRATION">
			<Desk />
			<TrustLedger at={[f.shares - f.trust, f.property - f.trust, f.jewels - f.trust]} seed="ledger1" />
		</Shot>
		<Shot a={f.name} b={f.sells} name="trust-name" atmos={false}>
			<Desk />
			<AbsoluteFill style={{filter: 'brightness(0.4) blur(3px)'}}>
				<TrustLedger at={[-200, -200, -200]} seed="ledger1b" />
			</AbsoluteFill>
			<Kinetic text="THE SIR DORABJI TATA TRUST" at={8} until={f.sells - f.name} display size={84} color={colors.gold} />
		</Shot>
		{/* the jewels sold; the hospital */}
		<Shot a={f.sells} b={f.tmh} name="jewels-sold" leak={colors.ember}>
			{/* the jewels sold: the ledger's twenty one lights go out (ILLUSTRATION) */}
			<Fading from={f.hospital - f.sells}>
				<Desk />
				<TrustLedger at={[-200, -200, -200]} keepFrom={10} seed="ledger-sold" />
			</Fading>
		</Shot>
		<Shot a={f.tmh} b={f.helped} name="tata-memorial" fadeIn={10}>
			<Photo file="E005a.jpg" dur={f.helped - f.tmh} move={[0.0, 0.14, 0.01, -0.01]} grade="modern" depth={0.04} />
			<Stamp text="TATA MEMORIAL HOSPITAL" sub="OPENED 1941 · MUMBAI, TODAY" at={30} until={f.helped - f.tmh} />
		</Shot>
		<Shot a={f.helped} b={f.you} name="hospital-block" leak={colors.gold}>
			<Photo file="cm/cm_tata-memorial-hospital-jpg.jpg" dur={f.you - f.helped} move={[0.02, 0.16, 0.02, -0.01]} grade="modern" depth={0.16} />
		</Shot>
		<Shot a={f.you} b={f.keeps} name="tata-memorial-2" fadeIn={12}>
			<Photo file="E005a.jpg" dur={f.keeps - f.you} move={[0.16, 0.3, -0.02, 0.0, 0.03, 0.04]} grade="modern" depth={0.04} />
		</Shot>
		{/* the shares the trust keeps: the key to the ending */}
		<Shot a={f.keeps} b={f.end} name="shares-kept" tag="ILLUSTRATION">
			<Desk />
			<TrustLedger at={[-200, -200, -200]} keepFrom={f.keep2 - f.keeps} lockAt={f.key - f.keeps + 20} seed="ledger2" />
		</Shot>
	</AbsoluteFill>
);

export const diamondFrames = f;
