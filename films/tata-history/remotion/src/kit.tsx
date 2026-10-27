import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {Atmosphere, Counter, Desk, ease, Grade, HonestyTag, Print, tween} from '../../../../lib/remotion';
import {DepthKey, DepthPhoto} from '../../../../lib/remotion/three/DepthPhoto';
import {T} from './timing';

// Chapter kit: VO-frame helpers bound to one chapter, a Shot wrapper (Sequence + atmosphere), and the standard archive
// shots. Every frame a chapter uses comes from the VO through these (PLAYBOOK §10.2).

export const chapterClock = (title: string) => {
	const ch = T.chapter(title);
	const L = (f: number): number => f - ch.start;
	// a lookup that lands outside the chapter matched an earlier sentence (short lines like 'Power.'): fail loud
	const inside = (f: number, what: string): number => {
		if (f < 0 || f > ch.end - ch.start) throw new Error(`chapterClock(${title}): "${what}" matched outside the chapter; pass an \`after\` id`);
		return f;
	};
	const S = (text: string, after = 0): number => inside(L(T.sentence(text, after).startFrame), text);
	const E = (text: string, after = 0): number => L(T.sentence(text, after).endFrame);
	const W = (sentence: string, phrase: string, after = 0): number => inside(L(T.word(sentence, phrase, after).startFrame), `${sentence} / ${phrase}`);
	const id = (text: string): number => T.sentence(text).id;
	return {ch, L, S, E, W, id, end: ch.end - ch.start};
};

export const Shot: React.FC<{
	a: number;
	b: number;
	name: string;
	children: React.ReactNode;
	fadeIn?: number;
	atmos?: boolean;
	leak?: string | false;
	tag?: 'RECONSTRUCTION' | 'ILLUSTRATION' | 'ARCHIVE' | 'ILLUSTRATIVE FOOTAGE';
}> = ({a, b, name, children, fadeIn = 0, atmos = true, leak = false, tag}) => (
	<Sequence from={a} durationInFrames={Math.max(1, b - a)} name={name}>
		<FadeIn frames={fadeIn}>{children}</FadeIn>
		{atmos ? <Atmosphere leak={leak} dust seed={name} /> : null}
		{tag ? <HonestyTag text={tag} /> : null}
	</Sequence>
);

export const FadeIn: React.FC<{frames: number; children: React.ReactNode}> = ({frames, children}) => {
	const frame = useCurrentFrame();
	return <AbsoluteFill style={{opacity: frames ? tween(frame, 0, frames, 0, 1, ease.arrive) : 1}}>{children}</AbsoluteFill>;
};

const M = 'assets/media';

/** An archive photo with a camera move through it. `move`: [dollyFrom, dollyTo, xFrom, xTo, yFrom, yTo]. */
export const Photo: React.FC<{file: string; dur: number; move?: number[]; depth?: number; grade?: Grade}> = ({
	file,
	dur,
	move = [0, 0.14, 0, 0, 0, 0],
	depth = 0.2,
	grade = 'archive',
}) => {
	const [d0, d1, x0 = 0, x1 = 0, y0 = 0, y1 = 0] = move;
	const keys: DepthKey[] = [
		{f: 0, dolly: d0, x: x0, y: y0},
		{f: dur, dolly: d1, x: x1, y: y1},
	];
	return <DepthPhoto file={`${M}/${file}`} keys={keys} depth={depth} grade={grade} />;
};

/** A small archive original shown as a print on the desk (never stretched to full frame). */
export const DeskPrint: React.FC<{file: string; at?: number; width?: number; rotate?: number; caption?: string; grade?: Grade; seed: string}> = ({
	file,
	at = 0,
	width = 820,
	rotate = -2,
	caption,
	grade = 'archive',
	seed,
}) => (
	<AbsoluteFill>
		<Desk />
		<Print file={`${M}/${file}`} at={at} width={width} rotate={rotate} caption={caption} grade={grade} seed={seed} />
	</AbsoluteFill>
);

/** A Counter placed in the frame (it is a plain block): appears with a spring at `start`, lands on `land`. */
export const CounterAt: React.FC<{
	to: number;
	start: number;
	land: number;
	prefix?: string;
	suffix?: string;
	size?: number;
	x?: number;
	y?: number;
	label?: string;
}> = ({to, start, land, prefix, suffix, size = 130, x = 0, y = 0, label}) => {
	const frame = useCurrentFrame();
	const o = tween(frame, start - 4, start + 10, 0, 1, ease.arrive);
	return (
		<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', opacity: o}}>
			<div style={{transform: `translate(${x}px, ${y}px)`}}>
				<Counter to={to} start={start} land={land} prefix={prefix} suffix={suffix} size={size} label={label} />
			</div>
		</AbsoluteFill>
	);
};
