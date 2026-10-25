import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Grain, LightLeak, Vignette, colors, ease, tween} from '../../../../../../lib/remotion';
import {InkPaper} from '../../../../../../lib/remotion/ink';
import {IndiaMap, MapPin, MapRoute, PLACES, camFit, mapCam, routeStopFrames} from '../../../../../../lib/remotion/map';
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

export const MapBombayJamshedpur: React.FC = () => {
	const frame = useCurrentFrame();
	// open close on Bombay, pull out with the line until all of India holds the two cities
	const bom = camFit([PLACES.bombay], 0);
	const all = {x: 80, y: 0, zoom: 0.92};
	const cam = mapCam(
		[
			{f: 0, x: bom.x + 60, y: bom.y - 20, zoom: 2.6},
			{f: 40, x: bom.x + 90, y: bom.y - 30, zoom: 2.3},
			{f: 190, ...all},
			{f: 300, x: all.x + 6, y: all.y - 8, zoom: all.zoom * 1.04},
		],
		frame,
	);
	const [, arrive] = routeStopFrames([PLACES.bombay, PLACES.jamshedpur], COLD_MAP.routeFrom, COLD_MAP.routeDur);
	return (
		<Base>
			<IndiaMap cam={cam} reveal={tween(frame, 0, 40, 0.2, 1, ease.arrive)} id="m1">
				<MapRoute stops={[PLACES.bombay, PLACES.jamshedpur]} from={COLD_MAP.routeFrom} dur={COLD_MAP.routeDur} cam={cam} head="train" label="1,400+ KM" labelAt={COLD_MAP.labelAt} />
				<MapPin at={PLACES.bombay} from={COLD_MAP.pinA} cam={cam} label="BOMBAY" side="left" />
				<MapPin at={PLACES.jamshedpur} from={arrive} cam={cam} label="JAMSHEDPUR" sub="SAKCHI" side="right" />
			</IndiaMap>
		</Base>
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
