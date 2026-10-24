import React from 'react';
import {Composition} from 'remotion';
import {Sting, STING_FRAMES} from './Sting';

export const Root: React.FC = () => (
	<Composition id="Sting" component={Sting} durationInFrames={STING_FRAMES} fps={60} width={1920} height={1080} />
);
