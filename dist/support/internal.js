"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDuration = formatDuration;
exports.clamp = clamp;
exports.activateOnKey = activateOnKey;
/**
 * Format a signed second count as a compact `h m` / `m s` duration string, e.g.
 * `"2h 05m"`, `"12m 30s"`, `"0s"`. Always non-negative input expected; callers
 * decide sign/prefix. Guarded against NaN/negative.
 */
function formatDuration(totalSeconds) {
    const s = Math.max(0, Math.floor(Number.isFinite(totalSeconds) ? totalSeconds : 0));
    const hours = Math.floor(s / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;
    if (hours > 0)
        return `${hours}h ${String(minutes).padStart(2, '0')}m`;
    if (minutes > 0)
        return `${minutes}m ${String(seconds).padStart(2, '0')}s`;
    return `${seconds}s`;
}
/** Clamp a number into `[min, max]`, guarding NaN to `min`. */
function clamp(value, min, max) {
    if (!Number.isFinite(value))
        return min;
    return Math.min(max, Math.max(min, value));
}
/** Enter/Space activation handler for a `role="button"`/`role="menuitem"` div. */
function activateOnKey(handler) {
    return (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handler();
        }
    };
}
//# sourceMappingURL=internal.js.map