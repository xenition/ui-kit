"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCENT_STRONG_BG_CLASS = exports.ACCENT_SOFT_BG_CLASS = exports.ACCENT_ON_TEXT_CLASS = exports.ACCENT_ICON_COLOR = exports.ACCENT_BG_CLASS = exports.ACCENT_BORDER_CLASS = exports.ACCENT_TEXT_CLASS = exports.NOTE_NAMES = void 0;
exports.chordLabel = chordLabel;
exports.padAccentKey = padAccentKey;
exports.isBlackKey = isBlackKey;
exports.octaveNotes = octaveNotes;
exports.clamp = clamp;
exports.formatBpm = formatBpm;
exports.formatDuration = formatDuration;
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
/** Token `text-*` utility class for an accent slot (no literal colors). */
exports.ACCENT_TEXT_CLASS = {
    primary: 'text-primary',
    accent: 'text-accent',
    success: 'text-success',
    warn: 'text-warn',
    danger: 'text-danger',
};
/** Token `border-*` utility class for an accent slot (no literal colors). */
exports.ACCENT_BORDER_CLASS = {
    primary: 'border-primary',
    accent: 'border-accent',
    success: 'border-success',
    warn: 'border-warn',
    danger: 'border-danger',
};
/** Token solid-fill `bg-*` utility class for an accent slot (dots / meters). */
exports.ACCENT_BG_CLASS = {
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
exports.ACCENT_ICON_COLOR = {
    primary: 'primary',
    accent: 'primary',
    success: 'success',
    warn: 'warn',
    danger: 'danger',
};
/** Token contrast `text-*` (`on-*`) class for text/marks on a solid accent fill. */
exports.ACCENT_ON_TEXT_CLASS = {
    primary: 'text-on-primary',
    accent: 'text-on-accent',
    success: 'text-on-success',
    warn: 'text-on-warn',
    danger: 'text-on-danger',
};
/** Soft (~10%) token tint fill for an accent slot — an idle pad / chip. */
exports.ACCENT_SOFT_BG_CLASS = {
    primary: 'bg-primary/10',
    accent: 'bg-accent/10',
    success: 'bg-success/10',
    warn: 'bg-warn/10',
    danger: 'bg-danger/10',
};
/** Stronger (~20%) token tint fill for an accent slot — an active / lit pad. */
exports.ACCENT_STRONG_BG_CLASS = {
    primary: 'bg-primary/20',
    accent: 'bg-accent/20',
    success: 'bg-success/20',
    warn: 'bg-warn/20',
    danger: 'bg-danger/20',
};
//# sourceMappingURL=types.js.map