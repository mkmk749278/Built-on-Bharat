import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Camera, Footage, LowerThird, PortraitPlate, Stamp, tween} from '../../../../../lib/remotion';
import {PLACES} from '../../../../../lib/remotion/map';
import {SatPlace} from '../dev/map/MapScenes';
import {chapterClock, DeskPrint, Photo, Shot} from '../kit';
import {PlaceMap, TrioPins} from '../shots/ch1';
import {Envelope, Fading} from '../shots/ch2';

// Chapter 2, The letter (plan_v6 §4 ch 2): the search fails → P.N. Bose's letter, Mayurbhanj → Jamsetji dies in
// Germany, his three dreams go dark → Dorabji in the jungle → Sakchi, where two rivers meet → London says no → they ask
// India. 1 min 13 s.
const C = chapterClock('The letter');
const {S, W} = C;

const f = {
	another: S('Another has coal, but no water'),
	letter: S('Then, in February nineteen oh four'),
	feb: W('Then, in February nineteen oh four', 'february'),
	geologist: S("It's from an Indian geologist"),
	bose: S('Pramatha Nath Bose.'),
	walking: S('He has been walking the hills'),
	found: S('And he has found iron ore'),
	lead: S('This letter will lead them'),
	three: S('But three months later'),
	germany: W('But three months later', 'germany'),
	never: S('He never sees those hills'),
	steel: S('No steel plant.'),
	power: S('No power company.'),
	inst: S('No institute.'),
	who: S('So who carries the dream now'),
	dorabji: S('Dorabji.'),
	office: S('And Dorabji does not run it'),
	back: S('Now they go back'),
	sakchi: S('They find it near a small village'),
	rivers: W('They find it near a small village', 'rivers'),
	ore: S('Ore nearby.'),
	coal: S('Coal nearby.'),
	water: S('Water all year.'),
	money: S('Now they need money'),
	london: S('They try London first'),
	cold: S('The answer is cold'),
	risk: S('So in nineteen oh seven'),
	india: S('They ask India'),
	end: C.end,
};

/** The cold answer: London's light drains to a cold blue. */
const ColdLight: React.FC<{from: number; to: number}> = ({from, to}) => {
	const frame = useCurrentFrame();
	const t = tween(frame, from, to, 0, 1);
	return <AbsoluteFill style={{background: `rgba(40,70,110,${0.38 * t})`, mixBlendMode: 'color', pointerEvents: 'none'}} />;
};

export const Letter: React.FC = () => (
	<AbsoluteFill style={{background: '#0B0B0C'}}>
		{/* the search keeps failing */}
		<Shot a={0} b={f.letter} name="trio-fail" atmos={false} tag="ILLUSTRATION">
			<TrioPins tries={[f.another - 10, f.another + 70]} />
		</Shot>
		{/* February 1904: a letter */}
		<Shot a={f.letter} b={f.geologist} name="envelope" tag="ILLUSTRATION">
			<Envelope at={8} />
			<Stamp text="FEBRUARY · 1904" at={f.feb - f.letter} until={f.geologist - f.letter} />
		</Shot>
		<Shot a={f.geologist} b={f.walking} name="bose">
			<PortraitPlate file="assets/media/raw/wm/C003_25_photograph-of-pramatha-nath-bose-jpg.jpg" place="assets/media/C007a.jpg" side="right" share={0.48} focus="50% 25%" grade="archive" />
			<LowerThird name="PRAMATHA NATH BOSE" role="GEOLOGIST" at={f.bose - f.geologist} until={f.walking - f.geologist} />
		</Shot>
		{/* the hills of Mayurbhanj, and the ore */}
		<Shot a={f.walking} b={f.found} name="mayurbhanj" fadeIn={8}>
			<Photo file="C007a.jpg" dur={f.found - f.walking} move={[0.0, 0.16, 0.02, -0.01, 0.02, -0.02]} grade="modern" depth={0.22} />
			<Stamp text="MAYURBHANJ · ODISHA" sub="THE HILLS TODAY" at={40} until={f.found - f.walking} />
		</Shot>
		<Shot a={f.found} b={f.lead} name="ore">
			<Photo file="C009a.jpg" dur={f.lead - f.found} move={[0.0, 0.24, 0.0, 0.02, 0.0, -0.01]} grade="modern" depth={0.12} />
			<Stamp text="IRON ORE" sub="HEMATITE, A MUSEUM SPECIMEN" at={20} until={f.lead - f.found} />
		</Shot>
		<Shot a={f.lead} b={f.three} name="ore-map" atmos={false}>
			<SatPlace
				id="ore-map"
				target={[86.3, 22.25]}
				zoomTo={140}
				landAt={f.three - f.lead - 70}
				pins={[
					{at: PLACES.jamshedpur, label: 'TATA STEEL', sub: 'JAMSHEDPUR', from: 30, side: 'right'},
					{at: [86.3, 22.25], label: 'MAYURBHANJ', sub: 'THE IRON HILLS', from: 70, side: 'left'},
				]}
			/>
		</Shot>
		{/* three months later: Germany */}
		<Shot a={f.three} b={f.never} name="germany">
			<Photo file="C005a.jpg" dur={f.never - f.three} move={[0.0, 0.14, 0.01, -0.01]} depth={0.06} />
			<Stamp text="GERMANY · MAY 1904" sub="BAD NAUHEIM, ON A PERIOD POSTCARD" at={f.germany - f.three} until={f.never - f.three} />
		</Shot>
		{/* he never sees those hills; the three dreams go dark */}
		<Shot a={f.never} b={f.steel} name="hills-dark">
			<Fading from={10}>
				<Photo file="C007a.jpg" dur={f.steel - f.never} move={[0.22, 0.26, -0.01, -0.01, -0.02, -0.02]} grade="modern" depth={0.22} />
			</Fading>
		</Shot>
		<Shot a={f.steel} b={f.power} name="no-steel">
			<Fading from={16}>
				<Photo file="B020a.jpg" dur={f.power - f.steel} move={[0.1, 0.16]} depth={0.26} />
			</Fading>
		</Shot>
		<Shot a={f.power} b={f.inst} name="no-power">
			<Fading from={16}>
				<Photo file="D006a.jpg" dur={f.inst - f.power} move={[0.1, 0.15]} grade="modern" depth={0.2} />
			</Fading>
		</Shot>
		<Shot a={f.inst} b={f.who} name="no-institute">
			<Fading from={16}>
				<Photo file="B011a.jpg" dur={f.who - f.inst} move={[0.1, 0.15]} grade="modern" depth={0.07} />
			</Fading>
		</Shot>
		{/* his son, Dorabji */}
		<Shot a={f.who} b={f.office} name="dorabji">
			<PortraitPlate file="assets/media/A005d.jpg" place="assets/media/pix/pixabay_301181_still.jpg" side="left" share={0.48} focus="50% 22%" />
			<LowerThird name="DORABJI TATA" role="JAMSETJI'S ELDER SON" at={f.dorabji - f.who} until={f.office - f.who} />
		</Shot>
		{/* not from an office: the jungle */}
		<Shot a={f.office} b={f.back} name="jungle" leak={false}>
			<Camera seed="jungle" drift={3} keys={[{f: 0, scale: 1.04}, {f: f.back - f.office, scale: 1.14, x: -30}]}>
				<Footage file="assets/media/pix/pixabay_301181.mp4" startFrom={30} grade="modern" />
			</Camera>
			<Stamp text="THE FORESTS OF ODISHA" sub="TODAY" at={60} until={f.back - f.office} />
		</Shot>
		{/* the search, once more; then Sakchi, where the two rivers meet */}
		<Shot a={f.back} b={f.sakchi} name="trio-search" atmos={false} tag="ILLUSTRATION">
			<TrioPins tries={[30, 110]} />
		</Shot>
		<Shot a={f.sakchi} b={f.ore} name="domuhani" fadeIn={10}>
			{/* the real confluence from orbit (Copernicus Sentinel-2, 2025): the Subarnarekha and the Kharkai */}
			<SatPlace id="sakchi" target={[86.17, 22.825]} zoomTo={250} landAt={f.rivers - f.sakchi} fromIndia={false} tiltTo={34} />
			<Stamp text="WHERE THE TWO RIVERS MEET" sub="SUBARNAREKHA AND KHARKAI · DOMUHANI, TODAY" at={f.rivers - f.sakchi - 10} until={f.ore - f.sakchi} />
		</Shot>
		<Shot a={f.ore} b={f.money} name="trio-land" atmos={false} tag="ILLUSTRATION">
			<TrioPins tries={[]} landAt={[0, f.coal - f.ore, f.water - f.ore]} />
			<Stamp text="SAKCHI" sub="LATER JAMSHEDPUR" at={f.water - f.ore + 20} until={f.money - f.ore} />
		</Shot>
		{/* money: London, cold */}
		<Shot a={f.money} b={f.london} name="money">
			<Photo file="B017a.jpg" dur={f.london - f.money} move={[0.06, 0.2, 0.01, -0.01]} depth={0.24} />
		</Shot>
		<Shot a={f.london} b={f.risk} name="london">
			<Photo file="C008a.jpg" dur={f.risk - f.london} move={[0.0, 0.14, 0.01, -0.01]} depth={0.2} />
			<Stamp text="LONDON" sub="THE BANK OF ENGLAND, 1905" at={10} until={f.cold - f.london} />
			<ColdLight from={f.cold - f.london} to={f.risk - f.london} />
		</Shot>
		{/* 1907: they ask India */}
		<Shot a={f.risk} b={f.end} name="ask-india" fadeIn={8}>
			<Photo file="A001c.jpg" dur={f.end - f.risk} move={[0.0, 0.18, -0.01, 0.01]} depth={0.22} />
			<Stamp text="BOMBAY · 1907" at={f.india - f.risk - 10} until={f.end - f.risk} />
		</Shot>
	</AbsoluteFill>
);

export const letterFrames = f;
