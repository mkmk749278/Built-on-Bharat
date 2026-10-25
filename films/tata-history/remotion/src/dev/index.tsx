import React from 'react';
import {Composition} from 'remotion';
import {InkCast} from './InkCast';
import {PayWindowQueue} from './ink/PayWindow';
import {Crowd1907} from './ink/Crowd1907';
import {ScooterFamily} from './ink/ScooterFamily';
import {MapBombayJamshedpur, MapFlight1932} from './map/MapScenes';
import {FurnaceScene} from './systems/FurnaceScene';

const PayWindowDev: React.FC = () => <PayWindowQueue />;
const Crowd1907Dev: React.FC = () => <Crowd1907 />;
const ScooterDev: React.FC = () => <ScooterFamily />;

// Dev compositions for the shared systems (S2): one per system, ids prefixed Dev-.
export const DevCompositions: React.FC = () => (
	<>
		<Composition id="Dev-InkPayWindow" component={PayWindowDev} durationInFrames={300} fps={60} width={1920} height={1080} />
		<Composition id="Dev-InkCrowd1907" component={Crowd1907Dev} durationInFrames={300} fps={60} width={1920} height={1080} />
		<Composition id="Dev-InkScooter" component={ScooterDev} durationInFrames={300} fps={60} width={1920} height={1080} />
		<Composition id="Dev-MapBombayJamshedpur" component={MapBombayJamshedpur} durationInFrames={300} fps={60} width={1920} height={1080} />
		<Composition id="Dev-MapFlight1932" component={MapFlight1932} durationInFrames={300} fps={60} width={1920} height={1080} />
		<Composition id="Dev-BlastFurnace" component={FurnaceScene} durationInFrames={720} fps={60} width={1920} height={1080} />
		<Composition id="Dev-InkCast" component={InkCast} durationInFrames={300} fps={60} width={1920} height={1080} />
	</>
);
