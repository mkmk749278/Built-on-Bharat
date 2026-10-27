import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Atmosphere} from '../../../../../../lib/remotion';
import {DepthPhoto} from '../../../../../../lib/remotion/three/DepthPhoto';

// Dev: DepthPhoto on the 1922 Bombay street (A001a) and the Girgaum Road Photochrom (B017d).
export const DepthStreet: React.FC = () => (
	<AbsoluteFill>
		<DepthPhoto file="assets/media/A001a.jpg" keys={[{f: 0, dolly: 0, x: -0.02}, {f: 300, dolly: 0.22, x: 0.02}]} depth={0.25} grade="archive" />
		<Atmosphere />
	</AbsoluteFill>
);
export const DepthGirgaum: React.FC = () => (
	<AbsoluteFill>
		<DepthPhoto file="assets/media/B017d.jpg" keys={[{f: 0, dolly: 0.05, x: 0.03, y: 0.01}, {f: 300, dolly: 0.18, x: -0.03, y: -0.01}]} depth={0.3} grade="modern" />
		<Atmosphere />
	</AbsoluteFill>
);
