"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchmakingStatus = MatchmakingStatus;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Spinner_1 = require("../primitives/Spinner");
const types_1 = require("./types");
const PHASE_COPY = {
    idle: { title: 'Ready to queue', glyph: '🎯' },
    searching: { title: 'Finding a match…', glyph: '🔎' },
    found: { title: 'Match found!', glyph: '✅' },
    failed: { title: 'Matchmaking failed', glyph: '⚠️' },
};
const RING = {
    idle: 'border-primary',
    searching: 'border-primary',
    found: 'border-success',
    failed: 'border-danger',
};
/**
 * A matchmaking status panel — reflects the queue `phase` with an icon,
 * headline, a live elapsed timer + player-slot readout, and phase-appropriate
 * actions (Cancel while searching, Accept when found, Retry on failure). While
 * `searching` it shows a spinner; the phase is announced via the accessible
 * label (never conveyed by color alone). Composes `Card`, `Button`, `Spinner`,
 * `Icon`. Token-only.
 */
function MatchmakingStatus({ phase, elapsedSeconds, found, needed, queueLabel, onCancel, onAccept, onRetry, className, }) {
    const copy = PHASE_COPY[phase];
    const searching = phase === 'searching';
    const slots = needed != null && needed > 0 ? `${(0, types_1.clamp)(found ?? 0, 0, needed)} / ${needed} players` : undefined;
    const a11y = `${copy.title}${slots ? `, ${slots}` : ''}${searching && elapsedSeconds != null ? `, ${(0, types_1.formatElapsed)(elapsedSeconds)} elapsed` : ''}`;
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { className: (0, cn_1.cn)('flex flex-col items-center gap-[var(--xen-space-md)]', className), "aria-label": a11y, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex h-16 w-16 items-center justify-center rounded-full border-2', RING[phase]), children: searching ? (0, jsx_runtime_1.jsx)(Spinner_1.Spinner, { size: "md" }) : (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: copy.glyph, size: "2xl", color: "onSurface" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-0.5", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-on-surface", children: copy.title }), queueLabel ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: queueLabel }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "mt-0.5 flex gap-[var(--xen-space-md)]", children: [searching && elapsedSeconds != null ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-muted", children: (0, types_1.formatElapsed)(elapsedSeconds) })) : null, slots ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-muted", children: slots }) : null] })] }), phase === 'found' && onAccept ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", onClick: onAccept, className: "w-full", "aria-label": "Accept match", children: "Accept" })) : null, phase === 'failed' && onRetry ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", onClick: onRetry, className: "w-full", "aria-label": "Retry matchmaking", children: "Retry" })) : null, searching && onCancel ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "danger", onClick: onCancel, className: "w-full", "aria-label": "Cancel search", children: "Cancel" })) : null] }));
}
//# sourceMappingURL=MatchmakingStatus.js.map