import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Embers, Grain, HonestyTag, LightLeak, Vignette} from '../../../../../../lib/remotion';
import {BlastFurnace, camAt, furnaceCamKeys, furnaceDefaults} from '../../../../../../lib/remotion/furnace/BlastFurnace';
import {InkPaper} from '../../../../../../lib/remotion/ink';

// Chapter 3: the furnace cutaway, on the default timeline (the chapter passes frames from the VO words).
export const FurnaceScene: React.FC = () => {
	const frame = useCurrentFrame();
	const cam = camAt(furnaceCamKeys(furnaceDefaults), frame);
	return (
		<AbsoluteFill style={{background: '#0D0E11'}}>
			<InkPaper grid={0.09} />
			<BlastFurnace cam={cam} />
			<Embers count={30} seed="bf-emb" intensity={0.5} />
			<LightLeak side="right" strength={0.14} seed="bf-leak" />
			<Vignette strength={0.58} />
			<Grain opacity={0.12} id="bf-g" />
			<HonestyTag text="ILLUSTRATION" />
		</AbsoluteFill>
	);
};
