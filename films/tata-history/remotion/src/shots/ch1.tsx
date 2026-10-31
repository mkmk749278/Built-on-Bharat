import React from 'react';
import {AbsoluteFill, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {Camera, colors, Desk, Dust, ease, fontStacks, Grain, LightLeak, pop, tween, Vignette} from '../../../../../lib/remotion';
import {DuskSky, InkFigure, InkLine, InkPaper, InkStage, TreeLine, V2} from '../../../../../lib/remotion/ink';
import {IndiaMap, LonLat, MapPin, PLACES, camFit, mapCam} from '../../../../../lib/remotion/map';

// Chapter 1 (The dreamer) shots that are not archive photos. plan_v6 §4 ch 1. All ILLUSTRATION where drawn.

const MapBase: React.FC<{children: React.ReactNode}> = ({children}) => (
	<AbsoluteFill style={{background: 'radial-gradient(ellipse 80% 70% at 50% 45%, #15161A 0%, #0D0E11 70%)'}}>
		<InkPaper grid={0.06} />
		{/* v9: the satellite ground a third brighter (v8 read as underexposed on a phone) */}
		<AbsoluteFill style={{filter: 'brightness(1.32) contrast(1.04)'}}>{children}</AbsoluteFill>
		<LightLeak color={colors.ember} side="left" strength={0.1} seed="ch1-map-leak" />
		<Vignette strength={0.45} />
		<Grain opacity={0.12} id="ch1-map-g" />
	</AbsoluteFill>
);

/** From all of India down onto one place ("Navsari. Eighteen thirty nine."; "In Nagpur, right where the cotton grows."). */
export const PlaceMap: React.FC<{pinAt: number; place?: LonLat; label?: string; sub?: string; dim?: {at: LonLat; label: string}}> = ({
	pinAt,
	place = PLACES.navsari,
	label = 'NAVSARI',
	sub = 'GUJARAT',
	dim,
}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const all = {x: 80, y: 0, zoom: 0.92};
	const nav = camFit([place], 0);
	const cam = mapCam(
		[
			{f: 0, ...all},
			{f: pinAt + 20, x: nav.x + 40, y: nav.y, zoom: 2.4},
			{f: durationInFrames, x: nav.x + 30, y: nav.y - 6, zoom: 3.1},
		],
		frame,
	);
	return (
		<MapBase>
			<IndiaMap cam={cam} style="faint" reveal={tween(frame, 0, 30, 0.3, 1, ease.arrive)} id="ch1-nav">
				{dim ? <MapPin at={dim.at} from={4} cam={cam} label={dim.label} side="left" color={colors.muted} /> : null}
				<MapPin at={place} from={pinAt} cam={cam} label={label} sub={sub} side="right" />
			</IndiaMap>
		</MapBase>
	);
};

/** A small coastal town before sunrise: tiled roofs, a lane, a temple doorway glowing (ILLUSTRATION, no people named). */
export const TownDawn: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const H = 640;
	const roofs: [number, number, number][] = [
		[80, 260, 200], [330, 230, 170], [560, 300, 220], [1240, 280, 210], [1500, 250, 190], [1720, 300, 200],
	];
	const glow = 0.6 + 0.4 * Math.sin(frame / 37);
	return (
		<AbsoluteFill style={{background: '#0D0E11'}}>
			<Camera seed="town" drift={2} keys={[{f: 0, scale: 1.04, y: 10}, {f: durationInFrames, scale: 1.12, y: -14}]}>
				<InkStage grid={0.04}>
					<DuskSky horizon={H} glowX={0.5} id="town-sky" strength={0.8} />
					<TreeLine x0={-40} x1={1960} ground={H - 120} seed="town-palms" height={150} />
					{roofs.map(([x, w, h], i) => (
						<g key={i}>
							<InkLine seed={`tr${i}`} closed fill="#141110" w={2} pts={[[x, H], [x, H - h + 50], [x + w / 2, H - h], [x + w, H - h + 50], [x + w, H]]} />
							<rect x={x + w * 0.42} y={H - 70} width={w * 0.16} height={70} fill="#0C0A09" />
							{random(`win${i}`) > 0.5 ? <rect x={x + w * 0.2} y={H - h + 80} width={22} height={28} fill={`rgba(255,190,110,${0.5 + 0.3 * random(`wl${i}`)})`} /> : null}
						</g>
					))}
					{/* the temple door at the end of the lane: a warm light within */}
					<InkLine seed="tdoor" closed fill="#1A1410" w={2.4} pts={[[860, H], [860, H - 230], [960, H - 300], [1060, H - 230], [1060, H]]} />
					<path d={`M905 ${H} L905 ${H - 150} Q960 ${H - 200} 1015 ${H - 150} L1015 ${H} Z`} fill={`rgba(255,170,80,${0.55 * glow})`} />
					<ellipse cx={960} cy={H - 60} rx={260} ry={120} fill={`rgba(255,160,70,${0.12 * glow})`} />
					{/* the lane */}
					<rect x={0} y={H} width={1920} height={1080 - H} fill="#0F0D0C" />
					<InkLine seed="lane1" w={1.4} opacity={0.6} pts={[[700, 1080], [900, H + 6]]} />
					<InkLine seed="lane2" w={1.4} opacity={0.6} pts={[[1220, 1080], [1020, H + 6]]} />
				</InkStage>
			</Camera>
			<Dust count={36} seed="town-dust" opacity={0.25} color="#FFD7A0" />
			<Vignette strength={0.62} />
			<Grain opacity={0.13} id="town-g" />
		</AbsoluteFill>
	);
};

/** "The safe path is the respected path. His father chose the risky one.": a fork at dusk. The paved road climbs to a
 *  lit temple; the rough road runs down to the dark harbour and its masts (trade, the sea). A lantern takes the second. */
export const Crossroads: React.FC<{chooseAt: number}> = ({chooseAt}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const go = tween(frame, chooseAt - 10, chooseAt + 100, 0, 1, ease.camera);
	const approach = tween(frame, 0, chooseAt, 0, 1, ease.camera);
	const H = 560;
	const lantern: V2 = go > 0 ? [960 + 380 * go, 760 - 190 * go] : [960, 1010 - 250 * approach];
	const glow = 0.85 + 0.15 * Math.sin(frame / 7);
	return (
		<AbsoluteFill style={{background: '#0D0E11'}}>
			<Camera seed="cross" drift={2} keys={[{f: 0, scale: 1.0}, {f: durationInFrames, scale: 1.1, x: -60 * go, y: 20 * go}]}>
				<InkStage grid={0.04}>
					<DuskSky horizon={H} glowX={0.28} id="cross-sky" strength={0.7} />
					{/* left: the temple on its rise, lit */}
					<InkLine seed="cr-hill" closed fill="#141110" w={1.8} pts={[[0, H + 10], [240, H - 70], [520, H - 90], [760, H + 10]]} />
					<InkLine seed="cr-temple" closed fill="#1A1410" w={2.2} pts={[[300, H - 80], [300, H - 190], [380, H - 250], [460, H - 190], [460, H - 80]]} />
					<path d={`M355 ${H - 80} L355 ${H - 150} Q380 ${H - 172} 405 ${H - 150} L405 ${H - 80} Z`} fill="rgba(255,180,90,0.7)" />
					<ellipse cx={380} cy={H - 110} rx={240} ry={120} fill="rgba(255,170,80,0.14)" />
					{/* right: the harbour in the dark, ships' masts */}
					<rect x={1180} y={H - 6} width={740} height={40} fill="#0E1418" />
					{[1260, 1390, 1540, 1700, 1820].map((x, i) => (
						<g key={x} opacity={0.75}>
							<InkLine seed={`mast${i}`} w={1.4} pts={[[x, H - 4], [x + 2, H - 150 - (i % 2) * 40]]} />
							<InkLine seed={`yard${i}`} w={1.1} pts={[[x - 40, H - 110], [x + 44, H - 112]]} />
						</g>
					))}
					{/* the ground and the two roads in perspective */}
					<rect x={0} y={H + 10} width={1920} height={1080 - H} fill="#0F0D0C" />
					<path d={`M780 1080 L950 760 L640 ${H + 30} L560 ${H + 30} L860 760 L640 1080 Z`} fill="#1C1713" opacity={0.9} />
					{[0.25, 0.45, 0.65, 0.85].map((t, i) => (
						<InkLine key={i} seed={`pave${i}`} w={1} opacity={0.5} pts={[[640 + 140 * t + (860 - 640) * 0, 1080 - 520 * t], [780 - 40 * t, 1080 - 520 * t]]} />
					))}
					<InkLine seed="cr-r1" w={1.5} opacity={0.65} pts={[[1080, 1080], [1000, 770], [1240, H + 20]]} />
					<InkLine seed="cr-r2" w={1.5} opacity={0.5} pts={[[1300, 1080], [1060, 770], [1330, H + 20]]} />
					{/* the lantern */}
					<circle cx={lantern[0]} cy={lantern[1]} r={11} fill="#FFE3B5" opacity={glow} />
					<circle cx={lantern[0]} cy={lantern[1]} r={110} fill={`rgba(255,190,110,${0.16 * glow})`} />
				</InkStage>
			</Camera>
			<Dust count={30} seed="cross-dust" opacity={0.25} color="#FFD7A0" />
			<Vignette strength={0.66} />
			<Grain opacity={0.13} id="cross-g" />
		</AbsoluteFill>
	);
};

/** "A sharp head for numbers.": a page of figures that add themselves up, the total landing on the voice. */
export const Sums: React.FC<{landAt: number}> = ({landAt}) => {
	const frame = useCurrentFrame();
	const rows = [3245, 1180, 760, 12905, 418, 2236, 990];
	const total = rows.reduce((a, b) => a + b, 0);
	return (
		<AbsoluteFill style={{background: '#0E0F12', alignItems: 'center', justifyContent: 'center'}}>
			<Desk />
			<Camera seed="sums" drift={2} keys={[{f: 0, scale: 1.0, tiltX: 10}, {f: landAt + 80, scale: 1.18, tiltX: 6, y: -40}]}>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
					<div style={{width: 760, padding: '60px 80px', background: 'linear-gradient(170deg, #ECE2CB 0%, #D9CBAA 100%)', boxShadow: '0 40px 90px rgba(0,0,0,0.6)'}}>
						{rows.map((n, i) => {
							const appear = tween(frame, i * 14, i * 14 + 18, 0, 1, ease.arrive);
							return (
								<div key={i} style={{fontFamily: fontStacks.numbers, fontSize: 52, textAlign: 'right', color: '#3A2C1A', opacity: appear, transform: `translateX(${(1 - appear) * 30}px)`}}>
									{n.toLocaleString('en-IN')}
								</div>
							);
						})}
						<div style={{height: 3, background: '#3A2C1A', margin: '14px 0 10px', width: `${tween(frame, landAt - 30, landAt - 10, 0, 100)}%`, marginLeft: 'auto'}} />
						<div style={{fontFamily: fontStacks.numbers, fontSize: 62, fontWeight: 700, textAlign: 'right', color: colors.bronze, opacity: tween(frame, landAt - 6, landAt + 6, 0, 1)}}>
							{Math.round(total * tween(frame, landAt - 6, landAt + 4, 0.2, 1)).toLocaleString('en-IN')}
						</div>
					</div>
				</AbsoluteFill>
			</Camera>
			<Vignette strength={0.6} />
			<Grain opacity={0.12} id="sums-g" />
		</AbsoluteFill>
	);
};

/** "Face every debt": a ledger of blank debt lines (no names, no figures), struck through one by one. */
export const DebtLedger: React.FC<{strikeFrom: number; strikeTo: number}> = ({strikeFrom, strikeTo}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const n = 12;
	return (
		<AbsoluteFill style={{background: '#0E0F12'}}>
			<Desk />
			<Camera seed="debt" drift={2} keys={[{f: 0, scale: 1.02, tiltX: 12, y: 40}, {f: durationInFrames, scale: 1.16, tiltX: 8, y: -60}]}>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
					<div style={{position: 'relative', width: 1100, height: 900, background: 'linear-gradient(170deg, #E6DBC2 0%, #D2C29F 100%)', boxShadow: '0 40px 90px rgba(0,0,0,0.6)'}}>
						{Array.from({length: n}, (_, i) => {
							const y = 90 + i * 64;
							const t0 = strikeFrom + ((strikeTo - strikeFrom) * i) / n;
							const s = tween(frame, t0, t0 + 22, 0, 1, ease.sweep);
							const w = 420 + random(`dl${i}`) * 300;
							return (
								<div key={i} style={{position: 'absolute', left: 80, top: y, width: 940, height: 50}}>
									{/* ink entries, out of focus: v8, strokes with no letterforms (invented script reads as fake on pause) */}
									<div style={{position: 'absolute', left: 0, top: 16, display: 'flex', gap: 16, filter: `blur(${2.4 + (i % 3) * 0.5}px)`}}>
										{Array.from({length: 3}, (_, k) => (
											<div key={k} style={{height: 12, width: (w / 3) * (0.55 + random(`dw${i}${k}`) * 0.6), borderRadius: 6, background: '#3A2A18', opacity: 0.55}} />
										))}
									</div>
									<div style={{position: 'absolute', right: 0, top: 16, height: 12, width: 70 + random(`dn${i}`) * 60, borderRadius: 6, background: '#3A2A18', opacity: 0.5, filter: 'blur(2.4px)'}} />
									<div style={{position: 'absolute', left: -10, top: 28, height: 4, width: `${s * 960}px`, background: '#8B2E1C', opacity: 0.85, borderRadius: 2}} />
									<div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 1, background: '#8A6A3A', opacity: 0.35}} />
								</div>
							);
						})}
					</div>
				</AbsoluteFill>
			</Camera>
			<Vignette strength={0.62} />
			<Grain opacity={0.13} id="debt-g" />
		</AbsoluteFill>
	);
};

/** "The fees come first.": a mother of today hands her son an envelope at the door before school (ILLUSTRATION). */
export const FeeEnvelope: React.FC<{giveAt: number}> = ({giveAt}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const given = frame >= giveAt;
	const light: V2 = [1500, 220];
	const env: V2 = given ? [1040, 700] : [940, 650];
	return (
		<AbsoluteFill style={{background: '#0D0E11'}}>
			<Camera seed="fees" drift={1.5} keys={[{f: 0, scale: 2.5, x: 0, y: -450}, {f: durationInFrames, scale: 2.65, x: -10, y: -480}]}>
				<InkStage grid={0.04}>
					<rect x={0} y={0} width={1920} height={900} fill="#100E0D" />
					{/* the doorway with morning light */}
					<InkLine seed="fe-door" closed fill="#2A2018" w={2.4} pts={[[1300, 900], [1300, 330], [1620, 330], [1620, 900]]} />
					<rect x={1316} y={346} width={288} height={554} fill="rgba(255,214,150,0.45)" />
					<ellipse cx={1250} cy={880} rx={520} ry={120} fill="rgba(255,200,130,0.12)" />
					<rect x={0} y={900} width={1920} height={180} fill="#0C0B0B" />
					<InkFigure costume="mother2008" x={860} y={900} scale={1.0} facing={1} seed="fe-mother" light={light} rim={0.8} detail
						action={{type: 'stand', hands: given ? 'hang' : 'offer', mood: 'warm'}} look={[1060, 640]} />
					<InkFigure costume="boy2008" x={1060} y={900} scale={0.66} facing={-1} seed="fe-boy" light={light} rim={0.8}
						action={{type: 'stand', hands: given ? 'chest' : 'hang', mood: 'hopeful'}} look={[900, 560]} />
					{/* the envelope */}
					<g transform={`translate(${env[0]} ${env[1]}) rotate(${given ? -10 : 6})`} opacity={tween(frame, 6, 20, 0, 1)}>
						<rect x={-26} y={-16} width={52} height={32} rx={2} fill="#E8DDC4" stroke="#5A4426" strokeWidth={1.5} />
						<path d="M-26 -16 L0 4 L26 -16" fill="none" stroke="#5A4426" strokeWidth={1.4} />
					</g>
				</InkStage>
			</Camera>
			<Dust count={30} seed="fe-dust" opacity={0.3} color="#FFE0B0" />
			<Vignette strength={0.62} />
			<Grain opacity={0.13} id="fe-g" />
		</AbsoluteFill>
	);
};

/** "A pension fund for his workers": mill hands in a line at a small office window under the mill chimney (ILLUSTRATION). */
export const MillGate: React.FC<{handAt: number}> = ({handAt}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const H = 820;
	const light: V2 = [1460, 560];
	const cast = ['workerCap', 'workerCloth', 'workerKurta', 'workerWoman', 'elder', 'workerCap', 'workerCloth'] as const;
	return (
		<AbsoluteFill style={{background: '#0D0E11'}}>
			<Camera seed="mill" drift={2} keys={[{f: 0, scale: 1.4, x: -300, y: -180}, {f: durationInFrames, scale: 1.5, x: -360, y: -200}]}>
				<InkStage grid={0.05}>
					<DuskSky horizon={H} glowX={0.7} id="mill-sky" strength={0.7} />
					{/* the mill: a long sawtooth roof and a tall chimney */}
					{Array.from({length: 9}, (_, i) => (
						<InkLine key={i} seed={`saw${i}`} closed fill="#141110" w={1.8} pts={[[120 + i * 120, H - 200], [180 + i * 120, H - 280], [240 + i * 120, H - 200]]} />
					))}
					<InkLine seed="mill-body" closed fill="#141110" w={2} pts={[[120, H - 200], [1200, H - 200], [1200, H], [120, H]]} />
					<InkLine seed="mill-chim" closed fill="#141110" w={2} pts={[[1000, H - 200], [1018, H - 560], [1058, H - 560], [1076, H - 200]]} />
					{/* the office with its window */}
					<InkLine seed="mill-off" closed fill="#1A1512" w={2.2} pts={[[1380, H], [1380, H - 300], [1700, H - 300], [1700, H]]} />
					<rect x={1420} y={H - 220} width={110} height={80} fill="rgba(255,200,120,0.7)" />
					<rect x={0} y={H} width={1920} height={1080 - H} fill="#0F0D0C" />
					{cast.map((c, i) => (
						<InkFigure key={i} costume={c} x={1330 - i * 120} y={H + (i % 2) * 6} scale={0.82 - i * 0.03} facing={1} seed={`mg${i}`} light={light} rim={0.6}
							action={i === 0 && frame >= handAt ? {type: 'stand', hands: 'offer', mood: 'warm'} : {type: 'wait', hands: i % 3 === 0 ? 'clasp' : 'behind', mood: i === 0 ? 'hopeful' : 'tired'}}
							t0={i * 0.7} age={i === 0 ? 'old' : undefined} />
					))}
				</InkStage>
			</Camera>
			<Dust count={40} seed="mill-dust" opacity={0.28} color="#FFD7A0" />
			<Vignette strength={0.62} />
			<Grain opacity={0.13} id="mill-g" />
		</AbsoluteFill>
	);
};

/** "Three bigger dreams": three blueprints unroll on the dark desk, each drawing itself (ILLUSTRATION). */
export const Blueprints: React.FC<{at: [number, number, number]; rollUpAt?: number}> = ({at, rollUpAt = 1e9}) => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();
	const sheets: {title: string; draw: (p: number) => React.ReactNode}[] = [
		{
			title: 'STEEL',
			draw: (p) => (
				<g stroke="#CFE3F5" strokeWidth={2.4} fill="none" strokeDasharray={1400} strokeDashoffset={1400 * (1 - p)}>
					<path d="M110 330 L130 120 L170 70 L230 70 L270 120 L290 330 Z" />
					<path d="M150 330 L150 380 M250 330 L250 380 M90 380 L310 380" />
					<path d="M300 200 L360 200 L360 330" />
					<circle cx={200} cy={300} r={18} />
				</g>
			),
		},
		{
			title: 'POWER',
			draw: (p) => (
				<g stroke="#CFE3F5" strokeWidth={2.4} fill="none" strokeDasharray={1400} strokeDashoffset={1400 * (1 - p)}>
					<path d="M60 150 Q200 110 340 150" />
					<path d="M80 160 L120 330 L280 330 L320 160" />
					<path d="M120 260 L280 260 M140 300 L260 300" />
					<path d="M200 330 L200 380 M170 380 L230 380" />
					<path d="M60 120 Q90 90 120 120 Q150 150 180 120" />
				</g>
			),
		},
		{
			title: 'SCIENCE',
			draw: (p) => (
				<g stroke="#CFE3F5" strokeWidth={2.4} fill="none" strokeDasharray={1600} strokeDashoffset={1600 * (1 - p)}>
					<path d="M60 360 L60 200 L340 200 L340 360" />
					<path d="M180 200 L180 110 L220 80 L260 110 L260 200" />
					{[90, 130, 270, 310].map((x) => (
						<path key={x} d={`M${x} 360 L${x} 250 Q${x + 12} 236 ${x + 24} 250 L${x + 24} 360`} />
					))}
					<path d="M40 360 L360 360" />
				</g>
			),
		},
	];
	return (
		<AbsoluteFill style={{background: '#0E0F12'}}>
			<Camera seed="bp" drift={2} keys={[{f: 0, scale: 1.0, tiltX: 14}, {f: durationInFrames, scale: 1.08, tiltX: 10}]}>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 40}}>
					{sheets.map((s, i) => {
						const unroll = pop(frame, fps, at[i], 90, 16) * (1 - tween(frame, rollUpAt + i * 20, rollUpAt + i * 20 + 30, 0, 1, ease.leave));
						const drawP = tween(frame, at[i] + 10, at[i] + 70, 0, 1, ease.sweep);
						return (
							<div key={s.title} style={{width: 520, height: 600, transformOrigin: '50% 0%', transform: `scaleY(${Math.max(0.02, unroll)})`, opacity: Math.min(1, unroll * 3)}}>
								<div style={{position: 'relative', width: '100%', height: '100%', background: 'linear-gradient(170deg, #1C4A73 0%, #143757 100%)', boxShadow: '0 30px 70px rgba(0,0,0,0.6)', overflow: 'hidden'}}>
									<div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(207,227,245,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(207,227,245,0.12) 1px, transparent 1px)', backgroundSize: '26px 26px'}} />
									<svg viewBox="0 0 400 420" style={{position: 'absolute', left: 60, top: 40, width: 400, height: 420}}>
										{s.draw(drawP)}
									</svg>
									<div style={{position: 'absolute', bottom: 46, width: '100%', textAlign: 'center', fontFamily: fontStacks.display, fontWeight: 700, fontSize: 40, letterSpacing: '0.3em', color: '#E8F1FA', opacity: drawP}}>
										{s.title}
									</div>
								</div>
							</div>
						);
					})}
				</AbsoluteFill>
			</Camera>
			<Vignette strength={0.55} />
			<Grain opacity={0.12} id="bp-g" />
		</AbsoluteFill>
	);
};

/** "Iron ore, the right coal and water, all in one place. Every place he tries is wrong.": three pins that never land
 *  together; each attempt, one drifts away and dims. Positions are illustrative, not real deposits. */
/**
 * The search for a steel site (ILLUSTRATION). v8: every trial site is its own fixed marker that stays where it is and
 * says what it lacked (the narration's words), dimming when the next one appears; no pins jump or swap. The sites are
 * unnamed points on the plateau, never claimed as real places. `landAt` (Sakchi): iron ore, coal and water land
 * together, close around the real confluence.
 */
export const TrioPins: React.FC<{tries: number[]; notes?: [string, string][]; landAt?: [number, number, number]}> = ({tries, notes, landAt}) => {
	const frame = useCurrentFrame();
	const SITES: LonLat[] = [
		[80.6, 20.3],
		[82.2, 21.4],
		[81.2, 22.6],
		[83.4, 20.6],
	];
	const sakchi = PLACES.jamshedpur;
	const near: LonLat[] = [
		[sakchi[0] - 0.12, sakchi[1] + 0.1],
		[sakchi[0] + 0.14, sakchi[1] + 0.06],
		[sakchi[0], sakchi[1] - 0.12],
	];
	const labels = ['IRON ORE', 'COAL', 'WATER'];
	const wide = camFit([[79, 18.5], [90, 26]], 140);
	const close = camFit(near, 380);
	// the ground never sits still while the search goes on: a slow aerial drift east across the plateau
	const drift = mapCam([{...wide, f: 0, zoom: wide.zoom * 0.97, x: wide.x - 14}, {...wide, f: 1200, zoom: wide.zoom * 1.1, x: wide.x + 18, y: wide.y - 6}], frame);
	const cam = landAt ? mapCam([{...wide, f: landAt[0] - 70}, {...close, f: landAt[0] + 10}], frame) : drift;
	const note = (i: number): [string, string] => notes?.[i] ?? ['TRIED · WRONG', 'NEVER ALL THREE IN ONE PLACE'];
	return (
		<MapBase>
			<IndiaMap cam={cam} style="faint" reveal={1} id="ch1-trio">
				{landAt
					? labels.map((l, i) => <MapPin key={`${l}-land`} at={near[i]} from={landAt[i] - 20} cam={cam} label={l} side={i === 1 ? 'right' : 'left'} />)
					: tries.map((t, i) => (
							<MapPin
								key={`site${i}`}
								at={SITES[i % SITES.length]}
								from={t}
								cam={cam}
								label={note(i)[0]}
								sub={note(i)[1]}
								side={i % 2 ? 'left' : 'right'}
								color={i < tries.length - 1 && frame >= tries[i + 1] ? colors.muted : colors.gold}
							/>
						))}
			</IndiaMap>
		</MapBase>
	);
};

/** "Papers that say he will be paid for a big load of cotton … cotton prices have crashed. The papers are worthless.":
 *  a bill on period paper (typeset, plainly an illustration, no figures), a price line that falls, then the paper
 *  crumples and drops. ILLUSTRATION. */
export const CottonCrash: React.FC<{crashAt: number; worthlessAt: number}> = ({crashAt, worthlessAt}) => {
	const frame = useCurrentFrame();
	const fall = tween(frame, crashAt, crashAt + 70, 0, 1, ease.sweep);
	const crumple = tween(frame, worthlessAt, worthlessAt + 40, 0, 1, ease.camera);
	const pts = Array.from({length: 40}, (_, i) => {
		const x = (i / 39) * 900;
		const t = i / 39;
		const y = t < 0.55 ? 120 - 30 * Math.sin(t * 9) : 120 + (t - 0.55) * 900 * fall;
		return `${x},${Math.min(470, y)}`;
	});
	return (
		<AbsoluteFill style={{background: '#0E0F12', alignItems: 'center', justifyContent: 'center'}}>
			<Desk />
			<Camera seed="crash" drift={2} keys={[{f: 0, scale: 1.0, tiltX: 10}, {f: worthlessAt + 60, scale: 1.12, tiltX: 6}]}>
				<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
					<div
						style={{
							width: 1100,
							height: 700,
							padding: '60px 90px',
							background: 'linear-gradient(170deg, #ECE2CB 0%, #D5C6A3 100%)',
							boxShadow: '0 40px 90px rgba(0,0,0,0.6)',
							transform: `perspective(1200px) rotateX(${crumple * 28}deg) rotateZ(${crumple * -9}deg) scale(${1 - 0.25 * crumple}) translateY(${crumple * 300}px)`,
							filter: `brightness(${1 - 0.55 * crumple}) contrast(${1 + 0.4 * crumple})`,
							opacity: 1 - 0.6 * crumple,
						}}
					>
						<div style={{fontFamily: fontStacks.display, fontSize: 40, letterSpacing: '0.24em', color: '#3A2C1A'}}>COTTON PRICES · 1865</div>
						<div style={{height: 2, background: '#8A6A3A', margin: '18px 0 30px', opacity: 0.6}} />
						<svg width={900} height={480}>
							<polyline points={pts.join(' ')} fill="none" stroke="#8B2E1C" strokeWidth={5} strokeLinejoin="round" />
							<line x1={0} y1={478} x2={900} y2={478} stroke="#5A4426" strokeWidth={2} />
						</svg>
					</div>
				</AbsoluteFill>
			</Camera>
			<Vignette strength={0.6} />
			<Grain opacity={0.13} id="crash-g" />
		</AbsoluteFill>
	);
};
