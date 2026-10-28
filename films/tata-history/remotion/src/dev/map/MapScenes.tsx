import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {Grain, LightLeak, Vignette, colors, ease, tween} from '../../../../../../lib/remotion';
import {InkPaper} from '../../../../../../lib/remotion/ink';
import {IndiaMap, LonLat, MapPin, MapRoute, PLACES, SatMap, camFit, mapCam, project, routeStopFrames, tiltAt} from '../../../../../../lib/remotion/map';
import {PLATES} from '../../plates';
import {SfxCue} from '../../../../../../lib/remotion/sfx';

// Map systems for the film (PLAYBOOK §6.6, §8.5). Frames are local to the shot; chapters place the shot on the VO.

const Base: React.FC<{children: React.ReactNode; leak?: string}> = ({children, leak = colors.ember}) => (
	<AbsoluteFill style={{background: 'radial-gradient(ellipse 80% 70% at 50% 45%, #15161A 0%, #0D0E11 70%)'}}>
		<InkPaper grid={0.06} />
		{children}
		<LightLeak color={leak} side="left" strength={0.12} seed="map-leak" />
		<Vignette strength={0.6} />
		<Grain opacity={0.12} id="map-g" />
	</AbsoluteFill>
);

/** Cold open: Bombay → Jamshedpur, "more than fourteen hundred kilometres away". */
export const COLD_MAP = {pinA: 18, routeFrom: 46, routeDur: 120, labelAt: 120} as const;

export const coldOpenMapCues = (): SfxCue[] => {
	const [a, b] = routeStopFrames([PLACES.bombay, PLACES.jamshedpur], COLD_MAP.routeFrom, COLD_MAP.routeDur);
	return [
		{frame: COLD_MAP.pinA, sfx: 'map_pin_tick', gainDb: -12},
		{frame: a, sfx: 'whoosh_line_long', gainDb: -14},
		{frame: COLD_MAP.labelAt, sfx: 'tick_soft', gainDb: -16},
		{frame: b, sfx: 'map_pin_tick', gainDb: -10},
	];
};

/**
 * Real ground (plan_v7 §2.4): over Bombay, up and out until India holds both cities while the line runs 1,400 km
 * east, then down through the haze onto Jamshedpur: the plateau's red earth, the two rivers, the works.
 * `dur` = the shot's length; the descent lands as the voice reaches "jungle".
 */
export const MapBombayJamshedpur: React.FC<{dur?: number}> = ({dur = 304}) => {
	const frame = useCurrentFrame();
	const bom = project(PLACES.bombay);
	const works = project([86.195, 22.79]);
	const all = {x: 60, y: -10, zoom: 1.05};
	const land = dur - 60;
	const cam = mapCam(
		[
			{f: 0, x: bom[0] + 4, y: bom[1] - 2, zoom: 9},
			{f: 24, x: bom[0] + 8, y: bom[1] - 4, zoom: 7},
			{f: 130, ...all},
			{f: 165, x: all.x + 10, y: all.y - 4, zoom: all.zoom * 1.06},
			{f: land, x: works[0], y: works[1], zoom: 140},
			{f: dur, x: works[0] + 0.3, y: works[1] + 0.15, zoom: 165},
		],
		frame,
	);
	const tilt = tiltAt(frame, [
		{f: 0, t: 32},
		{f: 120, t: 4},
		{f: 170, t: 6},
		{f: land, t: 42},
	]);
	const [, arrive] = routeStopFrames([PLACES.bombay, PLACES.jamshedpur], COLD_MAP.routeFrom, COLD_MAP.routeDur);
	const route = 1 - tween(frame, land - 50, land - 10, 0, 1, ease.leave);
	return (
		<AbsoluteFill>
			<SatMap cam={cam} tilt={tilt} plates={[PLATES.india_bm, PLATES.chotanagpur, PLATES.sakchi]} dimOutside={0.5} id="m1">
				<g opacity={route}>
					<MapRoute stops={[PLACES.bombay, PLACES.jamshedpur]} from={COLD_MAP.routeFrom} dur={COLD_MAP.routeDur} cam={cam} head="train" label="1,400+ KM" labelAt={COLD_MAP.labelAt} />
					<MapPin at={PLACES.bombay} from={COLD_MAP.pinA} cam={cam} label="BOMBAY" side="left" until={land - 10} />
				</g>
				<MapPin at={[86.195, 22.79]} from={arrive} cam={cam} label="JAMSHEDPUR" sub="TATA STEEL" side="right" />
			</SatMap>
			<Vignette strength={0.45} />
			<Grain opacity={0.1} id="map-g" />
		</AbsoluteFill>
	);
};

/** J.R.D.'s first mail flight, 15 October 1932: Karachi → Ahmedabad → Bombay (Juhu). Today's borders, faint. */
export const FLIGHT_MAP = {pinA: 16, routeFrom: 40, routeDur: 190} as const;
const FLIGHT = [PLACES.karachi, PLACES.ahmedabad, PLACES.juhu];
const AVIATION = '#9CC9E8';

export const flightMapCues = (): SfxCue[] => {
	const [a, b, c] = routeStopFrames(FLIGHT, FLIGHT_MAP.routeFrom, FLIGHT_MAP.routeDur);
	return [
		{frame: FLIGHT_MAP.pinA, sfx: 'map_pin_tick', gainDb: -12},
		{frame: a, sfx: 'propeller_plane_pass', gainDb: -12},
		{frame: b, sfx: 'map_pin_tick', gainDb: -12},
		{frame: c, sfx: 'map_pin_tick', gainDb: -10},
	];
};

export const MapFlight1932: React.FC = () => {
	const frame = useCurrentFrame();
	const fit = camFit(FLIGHT, 300);
	const cam = mapCam(
		[
			{f: 0, x: fit.x - 60, y: fit.y - 30, zoom: fit.zoom * 1.15},
			{...fit, f: 160},
			{f: 300, x: fit.x + 20, y: fit.y + 24, zoom: fit.zoom * 1.06},
		],
		frame,
	);
	const [, b, c] = routeStopFrames(FLIGHT, FLIGHT_MAP.routeFrom, FLIGHT_MAP.routeDur);
	return (
		<Base leak="#6FA8D6">
			<IndiaMap cam={cam} style="faint" land="#211B14" id="m2">
				<MapRoute stops={FLIGHT} from={FLIGHT_MAP.routeFrom} dur={FLIGHT_MAP.routeDur} cam={cam} head="plane" color={AVIATION} bend={0.1} />
				<MapPin at={PLACES.karachi} from={FLIGHT_MAP.pinA} cam={cam} label="KARACHI" sub="6.30 AM" side="left" color={AVIATION} />
				<MapPin at={PLACES.ahmedabad} from={b} cam={cam} label="AHMEDABAD" side="right" color={AVIATION} />
				<MapPin at={PLACES.juhu} from={c} cam={cam} label="BOMBAY" sub="JUHU · 1.50 PM" side="right" color={AVIATION} />
			</IndiaMap>
		</Base>
	);
};

/**
 * A descent onto real ground (plan_v7 §2.4): from all of India, down through the haze onto one place, the ground
 * tilting away as the camera arrives. `target` is where the camera lands; `zoomTo` how close (px per map unit; a
 * Sentinel-2 plate of 24 km is sharp at about 160); pins drop on their frames.
 */
export const SatPlace: React.FC<{
	target: LonLat;
	zoomTo: number;
	landAt: number;
	pins?: {at: LonLat; label: string; sub?: string; from: number; side?: 'left' | 'right'; color?: string}[];
	fromIndia?: boolean;
	tiltTo?: number;
	id: string;
}> = ({target, zoomTo, landAt, pins = [], fromIndia = true, tiltTo = 38, id}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const t = project(target);
	const start = fromIndia ? {x: 60, y: -10, zoom: 1.05} : {x: t[0], y: t[1], zoom: zoomTo * 0.25};
	const cam = mapCam(
		[
			{f: 0, ...start},
			{f: Math.max(1, landAt), x: t[0], y: t[1], zoom: zoomTo},
			{f: durationInFrames, x: t[0] + 0.25, y: t[1] + 0.12, zoom: zoomTo * 1.12},
		],
		frame,
	);
	const tilt = tiltAt(frame, [
		{f: 0, t: fromIndia ? 0 : 20},
		{f: Math.max(2, landAt), t: tiltTo},
	]);
	return (
		<AbsoluteFill>
			<SatMap cam={cam} tilt={tilt} plates={GROUND_PLATES} dimOutside={0.5} id={id}>
				{pins.map((p) => (
					<MapPin key={p.label} at={p.at} from={p.from} cam={cam} label={p.label} sub={p.sub} side={p.side ?? 'right'} color={p.color} />
				))}
			</SatMap>
			<Vignette strength={0.45} />
			<Grain opacity={0.1} id={`${id}-g`} />
		</AbsoluteFill>
	);
};

const GROUND_PLATES = [PLATES.india_bm, PLATES.chotanagpur, PLATES.sakchi, PLATES.mayurbhanj, PLATES.navsari, PLATES.nagpur, PLATES.bombay, PLATES.singur, PLATES.sanand, PLATES.dholera2026];
