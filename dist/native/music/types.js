"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTE_NAMES = void 0;
exports.chordLabel = chordLabel;
exports.padAccentKey = padAccentKey;
exports.isBlackKey = isBlackKey;
exports.octaveNotes = octaveNotes;
exports.clamp = clamp;
exports.formatBpm = formatBpm;
exports.formatDuration = formatDuration;
exports.withAlpha = withAlpha;
/** The twelve chromatic pitch classes, `C` … `B` (sharps spelled). */
exports.NOTE_NAMES = [
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
];
/** Suffix appended after a chord root for each quality. */
const CHORD_SUFFIX = {
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
function chordLabel(chord) {
    if (chord.label)
        return chord.label;
    return `${chord.root}${CHORD_SUFFIX[chord.quality ?? 'maj']}`;
}
/**
 * Cycle pad / strip accents through **semantic color slots** so every accent
 * traces to a token (never a literal). Guarded: any index maps into range.
 */
function padAccentKey(index) {
    const slots = ['primary', 'accent', 'success', 'warn', 'danger'];
    const i = Number.isFinite(index) ? Math.abs(Math.trunc(index)) % slots.length : 0;
    return slots[i] ?? 'primary';
}
/** True when the chromatic pitch at `index` (0 = C) is a black key. */
function isBlackKey(index) {
    const black = new Set([1, 3, 6, 8, 10]);
    const i = ((Math.trunc(index) % 12) + 12) % 12;
    return black.has(i);
}
/**
 * Build the note labels for one or more octaves starting at `startOctave`,
 * e.g. `octaveNotes(4, 1)` → `['C4','C#4', … 'B4']`. Guards bad counts.
 */
function octaveNotes(startOctave, octaves = 1) {
    const count = Number.isFinite(octaves) && octaves > 0 ? Math.trunc(octaves) : 1;
    const base = Number.isFinite(startOctave) ? Math.trunc(startOctave) : 4;
    const out = [];
    for (let o = 0; o < count; o += 1) {
        for (let n = 0; n < exports.NOTE_NAMES.length; n += 1) {
            out.push(`${exports.NOTE_NAMES[n]}${base + o}`);
        }
    }
    return out;
}
/** Clamp `n` into `[min, max]`; non-finite input collapses to `min`. */
function clamp(n, min, max) {
    if (!Number.isFinite(n))
        return min;
    return Math.max(min, Math.min(max, n));
}
/** Normalize a tempo into a sane BPM integer string; guards junk → `'120'`. */
function formatBpm(bpm) {
    if (bpm == null || !Number.isFinite(bpm) || bpm <= 0)
        return '120';
    return String(Math.round(clamp(bpm, 20, 999)));
}
/** Format `m:ss` from whole seconds; guards nullish / negative / non-finite. */
function formatDuration(totalSeconds) {
    if (totalSeconds == null || !Number.isFinite(totalSeconds) || totalSeconds < 0) {
        return '0:00';
    }
    const whole = Math.floor(totalSeconds);
    const s = whole % 60;
    const m = Math.floor(whole / 60);
    return `${m}:${String(s).padStart(2, '0')}`;
}
/**
 * Token-derived translucent tint from a resolved hex (no literal hex; mirrors
 * the primitives' `withAlpha`). Returns an `rgba(...)` string so soft fills
 * still trace to a token color rather than a hardcoded literal.
 */
function withAlpha(hex, alpha) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
//# sourceMappingURL=types.js.map