"use strict";
/**
 * Shared data shapes for the `@xenition/ui/streaming` module — the web
 * (React DOM) parity of `native/streaming`. These are plain data records (no
 * colors, no styling, no DOM) that the streaming components accept as props.
 * Modelling a track, episode, show, or channel once lets an app hand the same
 * objects to `NowPlaying`, `MiniPlayer`, `QueueList`, `EpisodeRow`, etc.
 *
 * NB: like their native counterparts these components are **UI shells only** —
 * none of them import a playback engine. Position/duration are passed in and
 * seek/toggle intents come back out via callbacks, so an app can wire an
 * `<audio>`/`<video>` element (or any player) behind them.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTime = formatTime;
exports.formatCount = formatCount;
exports.clamp01 = clamp01;
/**
 * Format a duration in seconds as `m:ss` (or `h:mm:ss` past an hour). Guards
 * against nullish / non-finite / negative input so a shell never renders `NaN`.
 */
function formatTime(totalSeconds) {
    if (totalSeconds == null || !Number.isFinite(totalSeconds) || totalSeconds < 0) {
        return '0:00';
    }
    const whole = Math.floor(totalSeconds);
    const s = whole % 60;
    const m = Math.floor(whole / 60) % 60;
    const h = Math.floor(whole / 3600);
    const ss = String(s).padStart(2, '0');
    if (h > 0)
        return `${h}:${String(m).padStart(2, '0')}:${ss}`;
    return `${m}:${ss}`;
}
/** Compact viewer/listener count, e.g. `1234` → `'1.2K'`, `2_000_000` → `'2M'`. */
function formatCount(n) {
    if (n == null || !Number.isFinite(n) || n < 0)
        return '0';
    if (n < 1000)
        return String(n);
    if (n < 1000000)
        return `${(n / 1000).toFixed(n < 10000 ? 1 : 0)}K`;
    return `${(n / 1000000).toFixed(n < 10000000 ? 1 : 0)}M`;
}
/** Clamp a number into `[0, 1]`. Shared by the scrubber / progress shells. */
function clamp01(n) {
    return n < 0 ? 0 : n > 1 ? 1 : n;
}
//# sourceMappingURL=types.js.map