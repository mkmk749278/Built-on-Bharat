import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Atmosphere, Desk} from '../../../../../lib/remotion';
import {Diamond} from '../../../../../lib/remotion/three/Diamond';

export const ColdOpen: React.FC = () => (
	<AbsoluteFill>
		<Desk />
		<Diamond />
		<Atmosphere />
	</AbsoluteFill>
);
