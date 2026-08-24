"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DISC_TINT = exports.formatMoney = void 0;
exports.clampPct = clampPct;
exports.formatPct = formatPct;
exports.formatDuration = formatDuration;
/**
 * Shared internals for the web field-service module. Money re-uses the single
 * kit-wide `formatMoney` home (integer **cents** → localized string, no float
 * drift). Status tints are expressed as Tailwind `--xen-*` token classes (e.g.
 * `bg-success/10`) — never a literal color — so the token-purity invariant
 * holds. `formatDuration` renders elapsed minutes as a compact `2h 15m` string.
 */
const commerce_1 = require("../../commerce");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return commerce_1.formatMoney; } });
/**
 * Token-bound translucent disc backgrounds. Each entry is a Tailwind class
 * bound to a `--xen-*` variable (opacity modifier for the semantic slots, the
 * neutral ramp for `muted`) — no literal colors.
 */
exports.DISC_TINT = {
    primary: 'bg-primary/10',
    success: 'bg-success/10',
    warn: 'bg-warn/10',
    danger: 'bg-danger/10',
    accent: 'bg-accent/10',
    muted: 'bg-neutral-100',
};
/** Clamp a whole percentage into [0, 100]; guards non-finite input. */
function clampPct(value) {
    if (!Number.isFinite(value))
        return 0;
    return Math.max(0, Math.min(100, Math.round(value)));
}
/** Format a whole percentage (0–100) with no decimals. */
function formatPct(value) {
    return `${clampPct(value)}%`;
}
/** Render a duration in minutes as a compact `2h 15m` / `45m` string. */
function formatDuration(totalMinutes) {
    const mins = Number.isFinite(totalMinutes) ? Math.max(0, Math.trunc(totalMinutes)) : 0;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0)
        return `${m}m`;
    if (m === 0)
        return `${h}h`;
    return `${h}h ${m}m`;
}
//# sourceMappingURL=format.js.map