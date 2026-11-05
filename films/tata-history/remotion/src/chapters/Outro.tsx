import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {colors, Desk, ease, fontStacks, Print, tween} from '../../../../../lib/remotion';
import {chapterClock, Shot} from '../kit';
import {BpkSting} from '../bpk';

// Outro (v10, 2026-11-05): the film goes out on Be Practical with Kishore, where Built on Bharat is a playlist. The
// channel's logo sting (Creator's, ported in ../bpk) under "This is Be Practical with Kishore", then the next film of
// the series on the desk, its left half only: the right half stays calm for YouTube's end-screen elements (the next
// video and subscribe), which need the last 5 to 20 seconds; the film runs ~4 s past the last word for them.
const C = chapterClock('Outro');
const A = C.id('This is Be Practical with Kishore') - 1;
const S = (text: string): number => C.S(text, A);
const M = 'assets/media';

const f = {
	sting: 0,
	next: S('Next in our Built on Bharat series'),
	how: S('How did a group of farmers'),
	amul: C.W('How did a group of farmers', 'Amul', A),
	end: C.end,
};

const Tease: React.FC = () => {
	const frame = useCurrentFrame();
	const o = (at: number) => tween(frame, at, at + 24, 0, 1, ease.arrive);
	return (
		<AbsoluteFill>
			<Desk light="rgba(255,205,140,0.18)" />
			<Print file={`${M}/raw/wm/K001_06_milk-vender-with-typical-traditional-bra.jpg`} at={8} width={440} x={-470} y={-40} rotate={-2} grade="modern" seed="amul-tease" />
			<div style={{position: 'absolute', left: 40, width: 960, top: 880, textAlign: 'center'}}>
				<div style={{fontFamily: fontStacks.text, fontSize: 32, letterSpacing: '0.16em', whiteSpace: 'nowrap', color: 'rgba(240,232,214,0.92)', opacity: o(10)}}>NEXT IN THE BUILT ON BHARAT SERIES</div>
				<div style={{fontFamily: fontStacks.display, fontSize: 92, letterSpacing: '0.16em', color: colors.gold, marginTop: 2, opacity: o(f.amul - f.how - 10)}}>AMUL</div>
			</div>
			<Img src={staticFile('brand/bpk_logo_512.png')} style={{position: 'absolute', left: 130, top: 48, width: 104, height: 104, borderRadius: 14, opacity: o(4), boxShadow: '0 6px 22px rgba(0,0,0,0.55)'}} />
			{/* the end-screen side: a quiet dark field */}
			<AbsoluteFill style={{background: 'linear-gradient(90deg, transparent 0%, transparent 46%, rgba(8,9,11,0.55) 62%, rgba(8,9,11,0.7) 100%)'}} />
		</AbsoluteFill>
	);
};

export const Outro: React.FC = () => (
	<AbsoluteFill style={{background: '#0B0B0C'}}>
		<Shot a={0} b={f.how} name="sting" atmos={false}>
			<BpkSting />
		</Shot>
		<Shot a={f.how} b={f.end} name="next-film" fadeIn={20}>
			<Tease />
		</Shot>
	</AbsoluteFill>
);

export const outroFrames = f;
