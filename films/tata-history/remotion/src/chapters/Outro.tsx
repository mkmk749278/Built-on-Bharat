import React from 'react';
import {AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame} from 'remotion';
import {colors, Desk, ease, fontStacks, Print, tween} from '../../../../../lib/remotion';
import {chapterClock, Shot} from '../kit';

// Outro (plan_v6 §4): the brand sting "Forged" (rendered once from brand/remotion, Drive _Channel) under "This is
// Built on Bharat…", then a tease of the next film on the desk, its left half only: the right half stays calm for
// YouTube's end-screen elements (the next video and subscribe), which need the last 5 to 20 seconds.
const C = chapterClock('Outro');
const A = C.id('This is Built on Bharat') - 1;
const S = (text: string): number => C.S(text, A);
const M = 'assets/media';

const f = {
	sting: 0,
	next: S('Next in Empires of India'),
	how: S('How did a group of farmers'),
	end: C.end,
};

const Tease: React.FC = () => {
	const frame = useCurrentFrame();
	const o = (at: number) => tween(frame, at, at + 24, 0, 1, ease.arrive);
	return (
		<AbsoluteFill>
			<Desk light="rgba(255,205,140,0.18)" />
			<Print file={`${M}/raw/wm/K001_06_milk-vender-with-typical-traditional-bra.jpg`} at={8} width={440} x={-470} y={-40} rotate={-2} grade="modern" seed="amul-tease" />
			<div style={{position: 'absolute', left: 140, width: 700, top: 820, textAlign: 'center'}}>
				<div style={{fontFamily: fontStacks.text, fontSize: 22, letterSpacing: '0.42em', color: 'rgba(236,226,206,0.75)', opacity: o(10)}}>NEXT IN EMPIRES OF INDIA</div>
				<div style={{fontFamily: fontStacks.display, fontSize: 92, letterSpacing: '0.16em', color: colors.gold, marginTop: 10, opacity: o(f.how - f.next)}}>AMUL</div>
			</div>
			{/* the end-screen side: a quiet dark field */}
			<AbsoluteFill style={{background: 'linear-gradient(90deg, transparent 0%, transparent 46%, rgba(8,9,11,0.55) 62%, rgba(8,9,11,0.7) 100%)'}} />
		</AbsoluteFill>
	);
};

export const Outro: React.FC = () => (
	<AbsoluteFill style={{background: '#0B0B0C'}}>
		<Shot a={0} b={f.next} name="sting" atmos={false}>
			<OffthreadVideo src={staticFile(`${M}/brand/bob_sting_4k60.mp4`)} style={{width: '100%', height: '100%'}} />
		</Shot>
		<Shot a={f.next} b={f.end} name="next-film" fadeIn={16}>
			<Tease />
		</Shot>
	</AbsoluteFill>
);

export const outroFrames = f;
