import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {Camera, Desk, Dust, Grain, LightLeak, Vignette} from '../../../../../../lib/remotion';
import {InkPaper} from '../../../../../../lib/remotion/ink';
import {DeskCalendar, GemCompare, YearRoller} from '../../../../../../lib/remotion/kinetic';

// Small kinetic systems on their default timings (chapters pass frames from the VO words).
const Frame: React.FC<{children: React.ReactNode; desk?: boolean; leak?: string}> = ({children, desk, leak = '#FF9A45'}) => {
	const {durationInFrames} = useVideoConfig();
	return (
		<AbsoluteFill style={{background: '#0D0E11'}}>
			{desk ? <Desk /> : <InkPaper grid={0.07} />}
			<Camera seed="kin-cam" drift={2} keys={[{f: 0, scale: 1.0}, {f: durationInFrames, scale: 1.06}]}>
				{children}
			</Camera>
			<Dust count={30} seed="kin-dust" opacity={0.25} color="#FFD7A8" />
			<LightLeak color={leak} side="left" strength={0.14} seed="kin-leak" />
			<Vignette strength={0.6} />
			<Grain opacity={0.12} id="kin-g" />
		</AbsoluteFill>
	);
};

/** 1924 → 1932 (chapter 4 → 5). */
export const YearRollerScene: React.FC = () => (
	<Frame leak="#6FA8D6">
		<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
			<YearRoller from={1924} to={1932} start={40} land={130} size={280} />
		</AbsoluteFill>
	</Frame>
);

/** 2008: January, March, October, November. */
export const CalendarScene: React.FC = () => (
	<Frame desk>
		<DeskCalendar tears={[70, 160, 250]} />
	</Frame>
);

/** The Jubilee and the Koh-i-Noor, areas to scale by weight. */
export const GemScene: React.FC = () => (
	<Frame>
		<GemCompare kohinoorAt={20} jubileeAt={80} />
	</Frame>
);
