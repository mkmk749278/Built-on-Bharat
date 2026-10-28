import React from 'react';
import {OwnershipFlow} from '../../../../../../lib/remotion/ownership/OwnershipFlow';
import {Grain, Vignette} from '../../../../../../lib/remotion';

// Dev: the ownership flow on the VO's beats (frames as in The Answer, from "Tata Sons sits at the top").
export const FlowScene: React.FC = () => (
	<>
		<OwnershipFlow t={{sons: 10, trusts: 155, dorabji: 363, shapoorji: 1002, companies: 1290, up: 1520, out: 1740}} background="assets/media/raw/wm/A005_02_bombay-house-mast-jpg.jpg" />
		<Vignette strength={0.4} />
		<Grain opacity={0.07} id="fl-g" />
	</>
);
