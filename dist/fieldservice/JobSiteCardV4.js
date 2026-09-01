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
exports.JobSiteCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const job_v4_1 = require("./internal/job-v4");
const SITE_STATUS_V4 = {
    active: { label: 'On site', glyph: '▶', tone: 'primary' },
    scheduled: { label: 'Scheduled', glyph: '📅', tone: 'neutral' },
    completed: { label: 'Completed', glyph: '✓', tone: 'success' },
    blocked: { label: 'Blocked', glyph: '⚠', tone: 'danger' },
};
/**
 * **V4 job-site card** — the web twin of the native `JobSiteCardV4`, same
 * props as {@link JobSiteCard} plus `directionsLabel`.
 *
 * ## Four changes
 *
 * 1. **Enter on "Directions" gets directions.** The card's `onKeyDown` caught
 *    the keydown bubbling out of the nested Directions `<button>` and ran
 *    `e.preventDefault()` followed by a synthesised `currentTarget.click()` —
 *    and Enter's default action on a button *is* the click it had just
 *    cancelled, so a keyboard user pressed Enter on Directions and opened the
 *    site card instead. The `stopPropagation` on the click handler covered
 *    only the pointer path. Directions is now a **sibling** of the card's
 *    activation rather than a descendant of it, which is the shape that cannot
 *    have the bug: there is nothing left to bubble, nothing to stop, and no
 *    synthesised click.
 * 2. **The activation is a real `<button>`.** A `div` with `role="button"`, a
 *    `tabIndex` and a hand-written Enter/Space handler is three approximations
 *    of what a button already does — including the one it got wrong above.
 * 3. **The card's name carries the site's payload** — the crew count, the open
 *    orders and the distance, all of which the short label replaced.
 * 4. **`scheduled` and `active` stop wearing status colours** (a stage is not
 *    an outcome), the disc is decorative rather than a second reader stop, and
 *    Directions clears 44.
 */
exports.JobSiteCardV4 = React.forwardRef(function JobSiteCardV4({ name, address, status, crewCount, openOrders, distance, glyph = '🏗', onNavigate, onClick, directionsLabel = 'Directions', className, style, }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const sd = SITE_STATUS_V4[status] ?? SITE_STATUS_V4.scheduled;
    const crew = crewCount != null ? `${Math.max(0, Math.trunc(crewCount))} crew` : null;
    const open = openOrders != null ? `${Math.max(0, Math.trunc(openOrders))} open` : null;
    const header = ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "flex h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]", style: { background: (0, job_v4_1.discGround)('accent') }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, size: "xl" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate font-heading text-lg font-bold text-on-card", children: name }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted-text", children: address })] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: sd.tone, ...job_v4_1.BADGE_V4, children: `${sd.glyph} ${sd.label}` })] }));
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, padding: "none", className: className, style: style, children: [onClick == null ? ((0, jsx_runtime_1.jsx)("div", { className: "p-lg pb-md", children: header })) : ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, "aria-label": (0, job_v4_1.spokenLine)([name, address, sd.label, crew, open, distance]), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)'), className: "flex w-full flex-col rounded-t-[var(--xen-radius-lg)] p-lg pb-md text-left", children: header })), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-md border-t border-border px-lg pb-lg pt-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-md", children: [crew != null ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted-text", children: ["\uD83D\uDC77 ", crew] }) : null, open != null ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted-text", children: ["\uD83D\uDDD2 ", open] }) : null, distance != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted-text", children: ["\uD83D\uDCCD ", distance] })) : null] }), onNavigate ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "outline", size: "md", onClick: onNavigate, children: directionsLabel })) : null] })] }));
});
//# sourceMappingURL=JobSiteCardV4.js.map