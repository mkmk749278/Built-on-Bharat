import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {Camera, Dust, Grain, LightLeak, Vignette} from '../../../../../../lib/remotion';
import {InkPaper} from '../../../../../../lib/remotion/ink';
import {OwnershipMachine} from '../../../../../../lib/remotion/ownership/OwnershipMachine';

// The answer: who owns Tata Sons, on the default timeline (the chapter passes frames from the VO words).
export const OwnershipScene: React.FC = () => {
	const {durationInFrames} = useVideoConfig();
	return (
		<AbsoluteFill style={{background: '#0D0E11'}}>
			<InkPaper grid={0.08} />
			<Camera seed="om-cam" drift={2} keys={[{f: 0, scale: 1.0, y: 10}, {f: durationInFrames, scale: 1.06, y: -10}]}>
				<OwnershipMachine />
			</Camera>
			<Dust count={40} seed="om-dust" opacity={0.3} color="#FFD7A8" />
			<LightLeak side="left" strength={0.14} seed="om-leak" />
			<Vignette strength={0.58} />
			<Grain opacity={0.12} id="om-g" />
		</AbsoluteFill>
	);
};
