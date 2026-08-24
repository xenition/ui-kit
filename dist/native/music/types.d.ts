/**
 * Shared data shapes + helpers for `@xenition/ui/native/music` — the
 * music-making / DAW / production building blocks. These are plain data
 * records (no colors, no styling) that the music components accept as props,
 * plus a few pure formatting / token helpers reused across the module.
 *
 * Every component in this module is a **UI shell with no audio engine**: it
 * owns no playback, no Web Audio, no sample buffers. Playback / record / mute
 * state comes in as props and intents (hit a pad, drag a fader, toggle record,
 * press a key) go out via callbacks, so an app wires its real audio backend
 * behind them.
 */
import type { SemanticColors } from '../theme';
/** The twelve chromatic pitch classes, `C` … `B` (sharps spelled). */
export declare const NOTE_NAMES: readonly ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
/** A pitch class name, e.g. `'C'`, `'F#'`. */
export type NoteName = (typeof NOTE_NAMES)[number];
/** Chord quality — drives the chip suffix label (`m`, `maj7`, …). */
export type ChordQuality = 'maj' | 'min' | 'dim' | 'aug' | 'sus2' | 'sus4' | 'maj7' | 'min7' | 'dom7';
/** One triggerable cell in a `TrackPad` drum / sample grid. */
export interface PadCell {
    /** Stable unique id (used as a React list key + callback identity). */
    id: string;
    /** Short display label, e.g. `'Kick'`, `'Snare'`. */
    label?: string;
    /** Note / sample name this pad triggers, announced to a11y. */
    note?: string;
    /** Icon glyph / emoji drawn on the pad. */
    glyph?: string;
    /** Override accent slot; otherwise derived from the pad's position. */
    color?: keyof SemanticColors;
    /** When true the pad is an unassigned slot (dimmed, non-triggering). */
    empty?: boolean;
}
/** One channel strip in a `Mixer`. */
export interface MixerChannel {
    /** Stable unique id. */
    id: string;
    /** Channel name, e.g. `'Drums'`, `'Bass'`. */
    name: string;
    /** Fader position in `[0, 100]`. */
    volume: number;
    /** Pan in `[-100, 100]` (L↔R); `0` is center. */
    pan?: number;
    /** Whether the channel is muted. */
    muted?: boolean;
    /** Whether the channel is soloed. */
    soloed?: boolean;
    /** Whether the channel is record-armed. */
    armed?: boolean;
    /** Live output meter level in `[0, 1]` (a UI hint only; no real metering). */
    level?: number;
}
/** A chord for a `ChordChip` — root pitch + quality (+ optional label override). */
export interface Chord {
    /** Root pitch class. */
    root: NoteName;
    /** Chord quality (default `maj`). */
    quality?: ChordQuality;
    /** Pre-formatted label override; otherwise built from root + quality. */
    label?: string;
}
/** One song / track in a `SetlistRow` list. */
export interface SetlistSong {
    /** Stable unique id. */
    id: string;
    /** Song title. */
    title: string;
    /** Artist / writer. */
    artist?: string;
    /** Musical key label, e.g. `'A minor'`. */
    key?: string;
    /** Tempo in BPM. */
    bpm?: number;
    /** Duration in whole seconds. */
    durationSec?: number;
}
/** Build a chord's display label, e.g. `{root:'C',quality:'min7'}` → `'Cm7'`. */
export declare function chordLabel(chord: Chord): string;
/**
 * Cycle pad / strip accents through **semantic color slots** so every accent
 * traces to a token (never a literal). Guarded: any index maps into range.
 */
export declare function padAccentKey(index: number): keyof SemanticColors;
/** True when the chromatic pitch at `index` (0 = C) is a black key. */
export declare function isBlackKey(index: number): boolean;
/**
 * Build the note labels for one or more octaves starting at `startOctave`,
 * e.g. `octaveNotes(4, 1)` → `['C4','C#4', … 'B4']`. Guards bad counts.
 */
export declare function octaveNotes(startOctave: number, octaves?: number): string[];
/** Clamp `n` into `[min, max]`; non-finite input collapses to `min`. */
export declare function clamp(n: number, min: number, max: number): number;
/** Normalize a tempo into a sane BPM integer string; guards junk → `'120'`. */
export declare function formatBpm(bpm?: number): string;
/** Format `m:ss` from whole seconds; guards nullish / negative / non-finite. */
export declare function formatDuration(totalSeconds?: number): string;
/**
 * Token-derived translucent tint from a resolved hex (no literal hex; mirrors
 * the primitives' `withAlpha`). Returns an `rgba(...)` string so soft fills
 * still trace to a token color rather than a hardcoded literal.
 */
export declare function withAlpha(hex: string, alpha: number): string;
//# sourceMappingURL=types.d.ts.map