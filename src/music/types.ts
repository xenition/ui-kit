/**
 * Shared data shapes + helpers for `@xenition/ui/music` — the web (React DOM)
 * parity of `native/music`. Plain data records (no colors, no styling) that the
 * music components accept as props, plus a few pure formatting / token helpers
 * reused across the module.
 *
 * Every component in this module is a **UI shell with no audio engine**: it
 * owns no playback, no Web Audio, no sample buffers. Playback / record / mute
 * state comes in as props and intents (hit a pad, drag a fader, toggle record,
 * press a key) go out via callbacks, so an app wires its real audio backend
 * behind them. All accents resolve to `--xen-*` token utility classes — never a
 * literal color.
 */

/** The twelve chromatic pitch classes, `C` … `B` (sharps spelled). */
export const NOTE_NAMES = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
] as const;

/** A pitch class name, e.g. `'C'`, `'F#'`. */
export type NoteName = (typeof NOTE_NAMES)[number];

/** Chord quality — drives the chip suffix label (`m`, `maj7`, …). */
export type ChordQuality =
  | 'maj'
  | 'min'
  | 'dim'
  | 'aug'
  | 'sus2'
  | 'sus4'
  | 'maj7'
  | 'min7'
  | 'dom7';

/**
 * A semantic color slot a pad / strip accent maps to. Mirrors the subset of the
 * theme's semantic keys the music module uses; each resolves to a `--xen-*`
 * token utility class (never a literal color).
 */
export type AccentSlot = 'primary' | 'accent' | 'success' | 'warn' | 'danger';

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
  color?: AccentSlot;
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

/** Suffix appended after a chord root for each quality. */
const CHORD_SUFFIX: Record<ChordQuality, string> = {
  maj: '',
  min: 'm',
  dim: 'dim',
  aug: 'aug',
  sus2: 'sus2',
  sus4: 'sus4',
  maj7: 'maj7',
  min7: 'm7',
  dom7: '7',
};

/** Build a chord's display label, e.g. `{root:'C',quality:'min7'}` → `'Cm7'`. */
export function chordLabel(chord: Chord): string {
  if (chord.label) return chord.label;
  return `${chord.root}${CHORD_SUFFIX[chord.quality ?? 'maj']}`;
}

/**
 * Cycle pad / strip accents through **semantic color slots** so every accent
 * traces to a token (never a literal). Guarded: any index maps into range.
 */
export function padAccentKey(index: number): AccentSlot {
  const slots: AccentSlot[] = ['primary', 'accent', 'success', 'warn', 'danger'];
  const i = Number.isFinite(index) ? Math.abs(Math.trunc(index)) % slots.length : 0;
  return slots[i] ?? 'primary';
}

/** True when the chromatic pitch at `index` (0 = C) is a black key. */
export function isBlackKey(index: number): boolean {
  const black = new Set([1, 3, 6, 8, 10]);
  const i = ((Math.trunc(index) % 12) + 12) % 12;
  return black.has(i);
}

/**
 * Build the note labels for one or more octaves starting at `startOctave`,
 * e.g. `octaveNotes(4, 1)` → `['C4','C#4', … 'B4']`. Guards bad counts.
 */
export function octaveNotes(startOctave: number, octaves = 1): string[] {
  const count = Number.isFinite(octaves) && octaves > 0 ? Math.trunc(octaves) : 1;
  const base = Number.isFinite(startOctave) ? Math.trunc(startOctave) : 4;
  const out: string[] = [];
  for (let o = 0; o < count; o += 1) {
    for (let n = 0; n < NOTE_NAMES.length; n += 1) {
      out.push(`${NOTE_NAMES[n]}${base + o}`);
    }
  }
  return out;
}

/** Clamp `n` into `[min, max]`; non-finite input collapses to `min`. */
export function clamp(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, n));
}

/** Normalize a tempo into a sane BPM integer string; guards junk → `'120'`. */
export function formatBpm(bpm?: number): string {
  if (bpm == null || !Number.isFinite(bpm) || bpm <= 0) return '120';
  return String(Math.round(clamp(bpm, 20, 999)));
}

/** Format `m:ss` from whole seconds; guards nullish / negative / non-finite. */
export function formatDuration(totalSeconds?: number): string {
  if (totalSeconds == null || !Number.isFinite(totalSeconds) || totalSeconds < 0) {
    return '0:00';
  }
  const whole = Math.floor(totalSeconds);
  const s = whole % 60;
  const m = Math.floor(whole / 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

/** Token `text-*` utility class for an accent slot (no literal colors). */
export const ACCENT_TEXT_CLASS: Record<AccentSlot, string> = {
  primary: 'text-primary',
  accent: 'text-accent',
  success: 'text-success',
  warn: 'text-warn',
  danger: 'text-danger',
};

/** Token `border-*` utility class for an accent slot (no literal colors). */
export const ACCENT_BORDER_CLASS: Record<AccentSlot, string> = {
  primary: 'border-primary',
  accent: 'border-accent',
  success: 'border-success',
  warn: 'border-warn',
  danger: 'border-danger',
};

/** Token solid-fill `bg-*` utility class for an accent slot (dots / meters). */
export const ACCENT_BG_CLASS: Record<AccentSlot, string> = {
  primary: 'bg-primary',
  accent: 'bg-accent',
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
};

/**
 * `Icon` color slot for an accent — the web `Icon` has no `accent` slot, so it
 * folds down to `primary` (mirrors the "accent → primary" web gotcha); the rest
 * pass through unchanged.
 */
export const ACCENT_ICON_COLOR: Record<AccentSlot, 'primary' | 'success' | 'warn' | 'danger'> = {
  primary: 'primary',
  accent: 'primary',
  success: 'success',
  warn: 'warn',
  danger: 'danger',
};

/** Token contrast `text-*` (`on-*`) class for text/marks on a solid accent fill. */
export const ACCENT_ON_TEXT_CLASS: Record<AccentSlot, string> = {
  primary: 'text-on-primary',
  accent: 'text-on-accent',
  success: 'text-on-success',
  warn: 'text-on-warn',
  danger: 'text-on-danger',
};

/** Soft (~10%) token tint fill for an accent slot — an idle pad / chip. */
export const ACCENT_SOFT_BG_CLASS: Record<AccentSlot, string> = {
  primary: 'bg-primary/10',
  accent: 'bg-accent/10',
  success: 'bg-success/10',
  warn: 'bg-warn/10',
  danger: 'bg-danger/10',
};

/** Stronger (~20%) token tint fill for an accent slot — an active / lit pad. */
export const ACCENT_STRONG_BG_CLASS: Record<AccentSlot, string> = {
  primary: 'bg-primary/20',
  accent: 'bg-accent/20',
  success: 'bg-success/20',
  warn: 'bg-warn/20',
  danger: 'bg-danger/20',
};
