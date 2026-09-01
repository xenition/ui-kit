"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchmakingStatusV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const ButtonV4_1 = require("../primitives/ButtonV4");
const IconV4_1 = require("../primitives/IconV4");
const SpinnerV4_1 = require("../primitives/SpinnerV4");
const types_1 = require("./types");
const arcade_v4_1 = require("./internal/arcade-v4");
const PHASE_TITLE = {
    idle: 'Ready to queue',
    searching: 'Finding a match…',
    found: 'Match found!',
    failed: 'Matchmaking failed',
};
const PHASE_GLYPH = {
    idle: '🎯',
    searching: '🔎',
    found: '✅',
    failed: '⚠️',
};
/**
 * The ring around the phase glyph.
 *
 * `found` and `failed` are the two phases that genuinely *are* status, so they
 * are the only two that spend a status colour. `idle` is a hairline and
 * `searching` is the brand — neither is a success or a warning.
 */
const PHASE_RING = {
    idle: 'border-border',
    searching: 'border-primary',
    found: 'border-success',
    failed: 'border-danger',
};
/**
 * **V4 matchmaking status** — same props as {@link MatchmakingStatus} plus
 * `phaseLabels`.
 *
 * ## Four changes
 *
 * 1. **The panel has a name again.** The base hung the combined status string
 *    on `Card`, which renders a bare `<div>` — and ARIA forbids naming a
 *    generic element, so the browser threw the label away and a screen-reader
 *    user in a queue heard nothing at all. The root is a `group` now, a role
 *    that both takes a name and leaves its subtree reachable, so Accept, Retry
 *    and Cancel are still their own stops. (The native twin fails the same
 *    moment from the other side: `accessible` on the root collapses the panel
 *    and takes the only three controls with it.)
 * 2. **A phase change is announced.** Nothing on either twin told anyone the
 *    match had been found; the user had to happen to be re-reading the panel
 *    at the moment it flipped, and the accept window expired while they
 *    swiped. The headline is a live region — **assertive for `found` only**,
 *    because that is the one phase with a window that closes unseen, and
 *    polite for the other three. The elapsed timer stays outside it: a region
 *    that re-announces every second is a region people turn off.
 * 3. **Cancel is the same weight on both twins.** It was a solid `danger`
 *    button here and an outlined one on native, and neither is right:
 *    abandoning a queue is reversible and undoes nothing, so spending the
 *    error colour on it leaves nothing left to say when matchmaking actually
 *    fails. Both twins draw it as the low-emphasis outline.
 * 4. **Press is a state layer and every control clears 44**, both of which
 *    `ButtonV4` now owns, in place of the base's `hover:opacity` dimming —
 *    which is the signal M3 reserves for *disabled*.
 */
exports.MatchmakingStatusV4 = React.forwardRef(function MatchmakingStatusV4({ phase, elapsedSeconds, found, needed, queueLabel, onCancel, onAccept, onRetry, phaseLabels, className, }, ref) {
    const searching = phase === 'searching';
    const title = phaseLabels?.[phase] ?? PHASE_TITLE[phase];
    const slots = needed != null && needed > 0
        ? `${(0, types_1.clamp)(found ?? 0, 0, needed)} / ${needed} players`
        : undefined;
    const elapsed = searching && elapsedSeconds != null ? (0, types_1.formatElapsed)(elapsedSeconds) : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": (0, arcade_v4_1.spokenLine)([title, queueLabel, slots, elapsed && `${elapsed} elapsed`]), className: (0, cn_1.cn)('flex flex-col items-center gap-md rounded-[var(--xen-radius-lg)] border border-border', 'bg-card p-lg text-on-card', className), children: [(0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-2xl w-2xl items-center justify-center rounded-full border-2', PHASE_RING[phase]), children: searching ? (0, jsx_runtime_1.jsx)(SpinnerV4_1.SpinnerV4, { size: "md" }) : (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: PHASE_GLYPH[phase], size: "2xl" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("p", { role: "status", "aria-live": phase === 'found' ? 'assertive' : 'polite', "aria-atomic": "true", className: "font-heading text-lg font-bold text-on-card", children: title }), queueLabel ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-text", children: queueLabel }) : null, elapsed != null || slots != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-md", children: [elapsed != null ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold text-muted-text', arcade_v4_1.TABULAR_CLASS), children: elapsed })) : null, slots != null ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold text-muted-text', arcade_v4_1.TABULAR_CLASS), children: slots })) : null] })) : null] }), phase === 'found' && onAccept ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", onClick: onAccept, className: "w-full", "aria-label": "Accept match", children: "Accept" })) : null, phase === 'failed' && onRetry ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", onClick: onRetry, className: "w-full", "aria-label": "Retry matchmaking", children: "Retry" })) : null, searching && onCancel ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "outline", onClick: onCancel, className: "w-full", "aria-label": "Cancel search", children: "Cancel" })) : null] }));
});
//# sourceMappingURL=MatchmakingStatusV4.js.map