import {makeTiming, TimingJson} from '../../../../lib/remotion';
import json from '../../vo/timing.json';

// The film's VO timing (scripts/vo_timing.py). Every Sequence in this film is placed from it (PLAYBOOK §10.4).
export const T = makeTiming(json as unknown as TimingJson);
export const FPS = 60;
export const VO_FILE = 'assets/vo/vo_full.wav';
