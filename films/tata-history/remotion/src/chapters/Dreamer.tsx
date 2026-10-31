import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {Img, staticFile} from 'remotion';
import {colors, Desk, Footage, Kinetic, LowerThird, PortraitPlate, Print, QuoteCard, Stamp, TableDoc, tween} from '../../../../../lib/remotion';
import {DepthPhoto} from '../../../../../lib/remotion/three/DepthPhoto';
import {Table, TablePhoto} from '../v7';
import {PLACES} from '../../../../../lib/remotion/map';
import {chapterClock, CounterAt, DeskPrint, FadeIn, Photo, Shot} from '../kit';
import {CottonCrash, PlaceMap, Sums, TrioPins} from '../shots/ch1';

// Chapter 1, The dreamer (plan_v6 §4 ch 1): Navsari → the fall and the restart → cotton out, cloth back → Empress
// Mills and the workers → the Taj myth and the real hotel → three dreams, and steel the hardest. 4 min 36 s.
const C = chapterClock('The dreamer');
const {S, W, id} = C;

const f = {
	nav: S('Navsari.'),
	y1839: S('Eighteen thirty nine'),
	boy: S('A boy is born'),
	know: S('You already know his name'),
	jamsetji: S('Jamsetji Tata.'),
	gen: S('For generations'),
	grand: S('His grandfather moved'),
	father: S('And his father does something'),
	think: S('Think about that for a second'),
	risky: S('His father chose the risky one'),
	what: S('So what does the boy have'),
	mind: W('He can do big sums', 'mind'),
	youknow: S('You know what that means'),
	fees: S('The fees come first'),
	fourteen: S('At fourteen'),
	soon: S('Soon after'),
	learning: S('Learning on the job'),
	shanghai: W('Learning on the job', 'shanghai'),
	falls: S('And then, almost everything'),
	y1864: S('Eighteen sixty four'),
	crashed: S('But by the time his ship'),
	worthless: S('The papers are worthless'),
	firm: S("His father's firm cannot go on"),
	still: S('Still in his twenties'),
	debt: W('Still in his twenties', 'debt'),
	failure: S("Isn't that the kind of failure"),
	home: S('He comes home'),
	banks: S('Banks failing'),
	merch: S('Merchants ruined'),
	vanish: S('The Tatas could have vanished'),
	give: S('Do they give up'),
	no: S('No.', id('Do they give up')),
	contract: S('His father wins a big contract'),
	y1868: S('And in eighteen sixty eight'),
	rupees: W('Twenty one thousand rupees', 'rupees'),
	ever: S("If you've ever failed"),
	begins: S('It begins with a priest'),
	lookB: S('Now look at Bombay in those years'),
	out: S('Out.'),
	sails: S('Indian cotton sails to the mills'),
	cloth: S('The cloth comes back'),
	seen: S('Jamsetji has seen those English mills'),
	why: S('Why send our cotton away'),
	opium: S('Like many traders'),
	mill: S('Then he builds a mill'),
	nagpur: S('In Nagpur'),
	opens: S('It opens on the very day'),
	names: S('So he names it Empress Mills'),
	strange: S('And then he does something strange'),
	hurt: S('Later, he pays them'),
	firstJob: S('Think about your own first job'),
	pension: S('Did anyone promise you a pension'),
	kind: S('Was it pure kindness'),
	healthy: S('But healthy workers'),
	famous: S("Now, you've probably heard"),
	historians: S('But historians have found'),
	record: S('What is on record'),
	opens1903: S('It opens in December'),
	designed: S('Designed by an Indian architect'),
	hold: S('Hold on to this hotel'),
	never: S('But a hotel was never'),
	three: S('Jamsetji had three bigger ones'),
	steelD: S('A steel plant, so India'),
	power: S('Power from the monsoon'),
	inst: S('And a world class institute'),
	lakh: S('For the institute alone'),
	lakhWord: W('For the institute alone', 'lakh'),
	hardest: S('The hardest of the three'),
	because: S('Because to make steel'),
	years: S('And for years, every place'),
	end: C.end,
};

/** Darken the last part of a shot (for "falls apart", "vanished right there"). */
const Dim: React.FC<{from: number; to: number; amount?: number}> = ({from, to, amount = 0.85}) => {
	const frame = useCurrentFrame();
	return <AbsoluteFill style={{background: `rgba(6,6,7,${amount * tween(frame, from, to, 0, 1)})`, pointerEvents: 'none'}} />;
};

export const Dreamer: React.FC = () => (
	<AbsoluteFill style={{background: '#0B0B0C'}}>
		{/* Navsari, 1839: the map dives onto a small coastal town; then the town before sunrise */}
		<Shot a={0} b={f.boy} name="navsari-map" atmos={false}>
			<PlaceMap pinAt={4} />
			<Stamp text="NAVSARI · 1839" at={f.y1839 - 4} until={f.boy} />
		</Shot>
		<Shot a={f.boy} b={f.know} name="parsis-prayer" fadeIn={14}>
			<Photo file="B019a.jpg" dur={f.know - f.boy} move={[0.0, 0.16, 0.01, -0.01]} depth={0.2} />
			<Stamp text="THE PARSI FAITH" sub="PRAYER AT SUNSET · PHOTOGRAPHED IN BOMBAY, 1903" at={30} until={f.know - f.boy} />
		</Shot>
		{/* Jamsetji Tata (real photograph) */}
		<Shot a={f.know} b={f.gen} name="jamsetji">
			<PortraitPlate file="assets/media/B003a.jpg" place="assets/media/B017f.jpg" side="right" share={0.5} focus="50% 20%" />
			<LowerThird name="JAMSETJI TATA" role="1839 – 1904" at={f.jamsetji - f.know + 8} until={f.gen - f.know} />
		</Shot>
		{/* generations of priests → a small shop in Bombay → business */}
		<Shot a={f.gen} b={f.grand} name="new-moon">
			<Photo file="B019b.jpg" dur={f.grand - f.gen} move={[0.02, 0.18, -0.01, 0.01]} depth={0.2} />
		</Shot>
		<Shot a={f.grand} b={f.father} name="bombay-1860s">
			<Photo file="B017f.jpg" dur={f.father - f.grand} move={[0.02, 0.16, 0.01, -0.01]} />
			<Stamp text="BOMBAY" at={10} until={f.father - f.grand} />
		</Shot>
		<Shot a={f.father} b={f.think} name="cotton-weighers">
			<Photo file="B018c.jpg" dur={f.think - f.father} move={[0.0, 0.18, 0, 0, 0.04, -0.02]} depth={0.22} />
		</Shot>
		{/* the safe path and the risky one */}
		<Shot a={f.think} b={f.risky} name="safe-path">
			<Photo file="B019b.jpg" dur={f.risky - f.think} move={[0.16, 0.26, 0.02, -0.01]} depth={0.2} />
		</Shot>
		<Shot a={f.risky} b={f.what} name="harbour-risk">
			<Photo file="B001a.jpg" dur={f.what - f.risky} move={[0.0, 0.2, 0.02, -0.02]} depth={0.2} />
			<Stamp text="BOMBAY HARBOUR" sub="TRADE: THE RISKY PATH" at={14} until={f.what - f.risky} />
		</Shot>
		{/* a head for numbers; the fees come first */}
		<Shot a={f.what} b={f.youknow} name="sums" tag="ILLUSTRATION">
			<Sums landAt={f.mind - f.what} />
		</Shot>
		<Shot a={f.youknow} b={f.fourteen} name="fees">
			<DepthPhoto file="assets/media/cm/cm_parayar-school-children-jpg.jpg" keys={[{f: 0, dolly: 0.02, x: -0.01}, {f: f.fourteen - f.youknow, dolly: 0.18, x: 0.01}]} depth={0.18} grade="modern" />
			<Stamp text="TODAY" sub="SCHOOLCHILDREN IN INDIA" at={20} until={f.fourteen - f.youknow} />
		</Shot>
		{/* Elphinstone College; the trading business; Shanghai */}
		<Shot a={f.fourteen} b={f.soon} name="elphinstone">
			<Photo file="B015a.jpg" dur={f.soon - f.fourteen} move={[0.0, 0.12, -0.01, 0.01]} />
			<Stamp text="ELPHINSTONE COLLEGE" sub="BOMBAY · ITS LATER BUILDING, PHOTOGRAPHED IN 1905" at={20} until={f.soon - f.fourteen} />
		</Shot>
		<Shot a={f.soon} b={f.learning} name="bales">
			<Photo file="B018a.jpg" dur={f.learning - f.soon} move={[0.02, 0.15, 0.015, -0.015]} />
		</Shot>
		<Shot a={f.learning} b={f.y1864} name="shanghai">
			<Photo file="B016a.jpg" dur={f.y1864 - f.learning} move={[0.0, 0.14, -0.02, 0.02]} grade="modern" depth={0.16} />
			<Stamp text="SHANGHAI · THE BUND" sub="WESTERN WAREHOUSES, ABOUT 1850" at={f.shanghai - f.learning} until={f.falls - f.learning} />
			<Dim from={f.falls - f.learning} to={f.y1864 - f.learning} amount={0.35} />
		</Shot>
		{/* 1864: the voyage and the crash */}
		<Shot a={f.y1864} b={f.crashed} name="voyage">
			<Photo file="B004b.jpg" dur={f.crashed - f.y1864} move={[0.0, 0.12, 0.02, -0.02]} depth={0.15} />
			<Stamp text="TO ENGLAND · 1864" at={6} until={f.crashed - f.y1864} />
		</Shot>
		<Shot a={f.crashed} b={f.firm} name="crash" tag="ILLUSTRATION">
			<CottonCrash crashAt={20} worthlessAt={f.worthless - f.crashed} />
		</Shot>
		{/* v9: the firm closes on real cotton, not a blank ledger (v8's grey lines read as unfinished) */}
		<Shot a={f.firm} b={f.failure} name="debts">
			<Photo file="B018b.jpg" dur={f.failure - f.firm} move={[0.02, 0.22, 0.02, -0.03, 0.01, -0.01]} depth={0.2} />
			<Stamp text="COTTON BALES · BOMBAY" sub="AT THE RAILWAY TERMINUS" at={14} until={f.debt - f.firm} />
			<Kinetic text="EVERY DEBT" at={f.debt - f.firm} until={f.failure - f.firm} display size={110} y={-40} />
			<Dim from={f.debt - f.firm} to={f.failure - f.firm} amount={0.3} />
		</Shot>
		{/* the kind of failure people talk about for years: the street */}
		<Shot a={f.failure} b={f.home} name="talk" fadeIn={10}>
			<Photo file="A001b.jpg" dur={f.home - f.failure} move={[0.04, 0.2, 0.0, 0.02, 0.02, -0.01]} depth={0.24} />
		</Shot>
		{/* Bombay in trouble; nearly vanished */}
		<Shot a={f.home} b={f.no} name="bombay-green">
			<Photo file="B017g.jpg" dur={f.no - f.home} move={[0.02, 0.2, 0, 0]} />
			<Stamp text="BOMBAY · 1865" at={10} until={f.banks - f.home + 10} />
			<Kinetic text="BANKS FAILING" at={f.banks - f.home} until={f.vanish - f.home} display y={-60} />
			<Kinetic text="MERCHANTS RUINED" at={f.merch - f.home} until={f.vanish - f.home} display y={40} />
			<Dim from={f.vanish - f.home} to={f.give - f.home} amount={0.38} />
		</Shot>
		{/* No. The army contract, 1868 */}
		<Shot a={f.no} b={f.y1868} name="abyssinia">
			<Photo file="B014a.jpg" dur={f.y1868 - f.no} move={[0.04, 0.2, 0, 0, 0.02, -0.02]} depth={0.22} />
			<Stamp text="ABYSSINIA · 1868" sub="THE BRITISH ARMY'S EXPEDITION" at={f.contract - f.no} until={f.y1868 - f.no} />
		</Shot>
		{/* starting again: twenty one thousand rupees */}
		<Shot a={f.y1868} b={f.ever} name="restart">
			<Desk />
			<Print file="assets/media/B003b.jpg" at={6} width={430} x={-470} rotate={-3} seed="oval" />
			{/* the year stands apart from the portrait (a later photograph), so it never reads as the photo's date */}
			<Kinetic text="1868" at={6} until={f.rupees - f.y1868 - 44} display size={130} x={300} />
			<CounterAt to={21000} start={f.rupees - f.y1868 - 40} land={f.rupees - f.y1868} prefix="Rs. " size={150} x={300} />
		</Shot>
		<Shot a={f.ever} b={f.begins} name="ordinary-faces" leak={colors.ember}>
			<DepthPhoto file="assets/media/loc7/L03c.jpg" keys={[{f: 0, dolly: 0.12, y: 0.05}, {f: f.begins - f.ever, dolly: 0.3, y: 0.07}]} depth={0.22} grade="archive" />
		</Shot>
		<Shot a={f.begins} b={f.lookB} name="priests-son" leak={colors.ember}>
			<PortraitPlate file="assets/media/B003a.jpg" place="assets/media/B019a.jpg" side="left" share={0.46} focus="50% 22%" grade="furnace" />
		</Shot>
		{/* ships and cotton: money flows out */}
		<Shot a={f.lookB} b={f.out} name="harbour">
			<Photo file="B001b.jpg" dur={f.out - f.lookB} move={[0.0, 0.12, 0.02, -0.02]} grade="modern" />
			<Stamp text="BOMBAY HARBOUR" sub="A LATER VIEW, THE 1890s" at={14} until={f.out - f.lookB} />
		</Shot>
		<Shot a={f.out} b={f.sails} name="bales-terminus">
			<Photo file="B018b.jpg" dur={f.sails - f.out} move={[0.04, 0.16, 0.02, -0.02]} />
		</Shot>
		<Shot a={f.sails} b={f.cloth} name="mills-england">
			<DeskPrint file="B002a.jpg" at={-10} width={1300} rotate={-1} seed="loom" />
			<Stamp text="A LANCASHIRE WEAVING SHED" sub="ENGRAVING, 1835" at={10} until={f.cloth - f.sails} />
		</Shot>
		<Shot a={f.cloth} b={f.seen} name="girgaum">
			<Photo file="B017d.jpg" dur={f.seen - f.cloth} move={[0.02, 0.14, -0.01, 0.01]} grade="modern" />
		</Shot>
		<Shot a={f.seen} b={f.why} name="mills-2">
			<DeskPrint file="B002a.jpg" at={-40} width={1500} rotate={1} seed="loom2" />
		</Shot>
		<Shot a={f.why} b={f.opium} name="cotton-here">
			<Photo file="B018a.jpg" dur={f.opium - f.why} move={[0.1, 0.22, -0.02, 0]} />
		</Shot>
		{/* the opium trade, said plainly */}
		<Shot a={f.opium} b={f.mill} name="opium">
			<Photo file="B004a.jpg" dur={f.mill - f.opium} move={[0.0, 0.1, 0.01, -0.01]} depth={0.12} />
			<Sequence from={Math.round((f.mill - f.opium) / 2)}>
				<FadeIn frames={14}>
					<Photo file="B004b.jpg" dur={Math.round((f.mill - f.opium) / 2)} move={[0.04, 0.14, -0.01, 0.01]} depth={0.12} />
				</FadeIn>
			</Sequence>
			<Stamp text="OPIUM CLIPPERS · 1830s–1850s" sub="PAINTINGS OF THE TRADE" at={30} until={f.mill - f.opium} />
		</Shot>
		{/* Empress Mills, Nagpur, 1 January 1877 */}
		<Shot a={f.mill} b={f.opens} name="nagpur" atmos={false}>
			<PlaceMap pinAt={f.nagpur - f.mill} place={PLACES.nagpur} label="NAGPUR" sub="WHERE THE COTTON GROWS" dim={{at: PLACES.bombay, label: 'BOMBAY'}} />
		</Shot>
		<Shot a={f.opens} b={f.names} name="proclamation">
			<Photo file="B006a.jpg" dur={f.names - f.opens} move={[0.0, 0.12, 0.02, -0.01]} depth={0.2} />
			<Stamp text="1 JANUARY 1877" sub="VICTORIA PROCLAIMED EMPRESS OF INDIA" at={10} until={f.names - f.opens} />
		</Shot>
		{/* v8: the real mill, from the period photographs in a Tata film (replaces modern stock of a mill today) */}
		<Shot a={f.names} b={f.strange} name="empress-gate">
			<TablePhoto file="v8/V8_empress_gate.jpg" dur={f.strange - f.names} aspect={960 / 640} seed="empress-gate" />
			<Kinetic text="EMPRESS MILLS" at={6} until={f.strange - f.names} display size={96} color={colors.gold} y={-330} />
			<Stamp text="NAGPUR" sub="FROM A TATA MOTORS FILM" at={30} until={f.strange - f.names} />
		</Shot>
		{/* a pension fund; paid when hurt; the viewer's own first job */}
		<Shot a={f.strange} b={f.hurt} name="empress-floor">
			<TablePhoto file="v8/V8_empress_spindles.jpg" dur={f.hurt - f.strange} aspect={960 / 648} seed="empress-floor" />
			<Stamp text="THE SPINNING FLOOR" sub="EMPRESS MILLS · FROM A TATA MOTORS FILM" at={20} until={f.hurt - f.strange} />
		</Shot>
		<Shot a={f.hurt} b={f.firstJob} name="empress-dispensary">
			<TablePhoto file="v8/V8_empress_dispensary.jpg" dur={f.firstJob - f.hurt} aspect={960 / 648} rot={-0.8} seed="empress-disp" />
			<Stamp text="THE MILL DISPENSARY" sub="EMPRESS MILLS" at={14} until={f.firstJob - f.hurt} />
		</Shot>
		{/* v9: "your own first job" is the viewer's: a mill worker today, in colour and labelled so */}
		<Shot a={f.firstJob} b={f.kind} name="first-job">
			<AbsoluteFill style={{transform: `scale(1.06)`}}>
				<Footage file="assets/media/pix/pixabay_262484.mp4" startFrom={30} grade="modern" />
			</AbsoluteFill>
			<Stamp text="TODAY" sub="A TEXTILE MILL" at={14} until={f.kind - f.firstJob} />
		</Shot>
		<Shot a={f.kind} b={f.famous} name="quote-1895">
			<QuoteCard
				lines={['We do not claim to be more unselfish,', 'more generous, or more philanthropic', 'than other people … the health and welfare', 'of our employees the sure foundation', 'of our prosperity.']}
				attribution="JAMSETJI TATA · 1895"
				at={-24}
				mark={3}
				markFrom={f.healthy - f.kind}
				markTo={f.famous - f.kind - 20}
				seed="q1895"
			/>
		</Shot>
		{/* the Taj: the myth, then the record */}
		<Shot a={f.famous} b={f.record} name="taj-card">
			<DeskPrint file="raw/wm/B009_91_taj-mahal-hotel-bombay-postcard-1908-jpg.jpg" at={8} width={1100} rotate={-1.5} seed="tajcard" />
			<Dim from={f.historians - f.famous} to={f.record - f.famous} amount={0.5} />
			<Kinetic text="NO RECORD" at={f.historians - f.famous + 50} until={f.record - f.famous} display size={84} />
		</Shot>
		<Shot a={f.record} b={f.designed} name="taj-record">
			{/* v8: a Clifton & Co. view of about 1905 (KITLV 90282). The c.1930 view (B009b) showed the Gateway, finished 1924 */}
			<DeskPrint file="v8/V8_taj_c1905.jpg" at={-10} width={1250} rotate={-1} seed="tajcard2" />
			<Stamp text="BOMBAY · DECEMBER 1903" sub="THE TAJ MAHAL HOTEL · PHOTOGRAPHED ABOUT 1905" at={f.opens1903 - f.record} until={f.designed - f.record} />
		</Shot>
		{/* the same building today (the 1903 wing): the architect's dome, then the waterfront crowd */}
		<Shot a={f.designed} b={f.hold} name="taj-dome" fadeIn={8}>
			<Photo file="B009c.jpg" dur={f.hold - f.designed} move={[0.02, 0.2, 0.03, 0.06, 0.02, 0.05]} grade="modern" depth={0.16} />
			<LowerThird name="THE TAJ MAHAL PALACE" role="THE 1903 BUILDING, TODAY" at={12} until={f.hold - f.designed} />
		</Shot>
		<Shot a={f.hold} b={f.steelD} name="taj-today">
			<Photo file="B009d.jpg" dur={f.three - f.hold} move={[0.0, 0.16, -0.01, 0.01]} grade="modern" depth={0.18} />
			<Dim from={f.never - f.hold - 30} to={f.three - f.hold} amount={0.4} />
		</Shot>
		{/* v9: "three bigger ones": three prints dealt onto the table, one per dream, before each gets its own shot */}
		<Shot a={f.three} b={f.steelD} name="three-dreams">
			<Table seed="three" keys={[{f: 0, scale: 1.42, x: 0, y: 20}, {f: f.steelD - f.three, scale: 1.55, x: 0, y: 26}]}>
				{[
					{file: 'v8/V8_tisco_water.jpg', w: 15, h: 7.5, x: -15, rot: -3},
					{file: 'D006a.jpg', w: 13, h: 8.8, x: 0, rot: 1.5},
					{file: 'B011a.jpg', w: 13, h: 8.8, x: 14.5, rot: -1},
				].map((d, i) => (
					<TableDoc key={d.file} w={d.w} h={d.h} x={d.x} y={0} rot={d.rot} at={8 + i * 16} paper="#EFE7D6" seed={`three-${i}`}>
						<Img src={staticFile(`assets/media/${d.file}`)} style={{position: 'absolute', inset: 14, width: 'calc(100% - 28px)', height: 'calc(100% - 28px)', objectFit: 'cover', filter: 'sepia(0.3) contrast(1.05)'}} />
					</TableDoc>
				))}
			</Table>
		</Shot>
		{/* three bigger dreams: rails and bridges, monsoon power, science */}
		<Shot a={f.steelD} b={f.power} name="bridge-1901" fadeIn={8}>
			<Photo file="B020a.jpg" dur={f.power - f.steelD} move={[0.0, 0.2, 0, 0, 0.03, -0.01]} depth={0.26} />
			<Stamp text="AHMEDABAD · 1901" sub="AN IRON BRIDGE" at={20} until={f.power - f.steelD} />
		</Shot>
		<Shot a={f.power} b={f.inst} name="ghats-monsoon" fadeIn={8}>
			<Photo file="D006a.jpg" dur={f.inst - f.power} move={[0.0, 0.14, 0.02, -0.02]} grade="modern" depth={0.2} />
			<Stamp text="THE WESTERN GHATS" sub="MONSOON" at={16} until={f.inst - f.power} />
		</Shot>
		<Shot a={f.inst} b={f.hardest} name="iisc" fadeIn={8}>
			<Photo file="B011a.jpg" dur={f.hardest - f.inst} move={[0.0, 0.18, 0.02, -0.02]} grade="modern" depth={0.07} />
			<CounterAt to={3000000} start={f.lakhWord - f.inst - 40} land={f.lakhWord - f.inst} prefix="Rs. " size={120} y={-60} />
			<Sequence from={f.lakhWord - f.inst + 50}>
				<FadeIn frames={16}>
					<Photo file="raw/wm/B011_17_iisc-campus-jpg.jpg" dur={f.hardest - f.lakhWord - 50} move={[0.02, 0.14, -0.02, 0.02]} grade="modern" depth={0} />
				</FadeIn>
			</Sequence>
			<Stamp text="BANGALORE" sub="INDIAN INSTITUTE OF SCIENCE, TODAY" at={20} until={f.hardest - f.inst} />
		</Shot>
		{/* steel: ore, coal and water never in one place */}
		{/* v9: "the hardest of the three is steel": the works it became, before the search map */}
		<Shot a={f.hardest} b={f.because} name="steel-hardest">
			<Photo file="v8/V8_tisco_aerial.jpg" dur={f.because - f.hardest} move={[0.02, 0.14, 0.02, -0.02, 0, 0]} depth={0} />
			<Stamp text="STEEL" sub="THE WORKS IT BECAME · AN EARLY VIEW" at={10} until={f.because - f.hardest} />
		</Shot>
		<Shot a={f.because} b={f.end} name="trio" atmos={false} tag="ILLUSTRATION">
			<TrioPins tries={[f.because - f.because + 160, f.years - f.because, f.years - f.because + 80]} />
		</Shot>
	</AbsoluteFill>
);

export const dreamerFrames = f;
