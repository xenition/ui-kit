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
exports.MilestoneCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const family_v4_1 = require("./family-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** Glyph and default word per developmental category. */
const CATEGORY_META_V4 = {
    physical: { glyph: '🏃', label: 'Physical' },
    cognitive: { glyph: '🧠', label: 'Cognitive' },
    social: { glyph: '🤝', label: 'Social' },
    language: { glyph: '💬', label: 'Language' },
    emotional: { glyph: '❤️', label: 'Emotional' },
    other: { glyph: '🌟', label: 'Milestone' },
};
/**
 * Glyph, default word and chip tone per status.
 *
 * `delayed` is **neutral**, and that is the point of the whole component. A
 * child who has not walked yet is not a warning and not an error; the kit's
 * `warn` and `danger` mean something has gone wrong with the system, and a
 * developmental band is a range, not a deadline. The delay is said in a word
 * and explained in `note`.
 */
const STATUS_META_V4 = {
    upcoming: { glyph: '◦', label: 'Upcoming', tone: 'neutral' },
    achieved: { glyph: '✓', label: 'Achieved', tone: 'success' },
    delayed: { glyph: '…', label: 'Taking longer', tone: 'neutral' },
};
/**
 * **V4 milestone card** — same props as {@link MilestoneCard} plus `status`,
 * `note` and `statusLabels`.
 *
 * ## Six changes
 *
 * 1. **A milestone can say it is late without saying it is wrong.** `achieved`
 *    was a boolean, so "still ahead" and "overdue" were the same card. `status`
 *    adds `delayed`, and it is drawn in a **neutral** chip with a word and a
 *    `note` — never `warn`, never `danger`. A developmental band is a range;
 *    the kit's status colours mean the system has failed, and nothing about a
 *    child's pace belongs in that vocabulary.
 * 2. **The card's accessible name reached nobody.** It was an `aria-label` on a
 *    plain `div` for every non-activatable card, which browsers ignore — and it
 *    dropped the date and the age band entirely. The full name now belongs to a
 *    real `<button>`.
 * 3. **The activation is a real `<button>`.** A `div` with `role="button"`,
 *    `tabIndex={0}` and a hand-written Enter/Space handler is three
 *    approximations of what a button already does, and it swallowed the status
 *    chip into one stop.
 * 4. **`{...rest}` is spread first.** It was spread after `onClick`, so a
 *    caller passing any handler through silently replaced the card's own.
 * 5. **Badges converge on `soft`**, matching every native call site; web took
 *    the `solid` default, so one call drew two visual weights.
 * 6. **Tokens.** `hover:bg-neutral-50` is a light-scheme ramp step that paints
 *    a near-white slab on a dark page, press is the M3 state layer, the
 *    skeleton is opaque and card-relative rather than `bg-neutral-200`, and the
 *    card sits on `card`/`on-card` so it still reads as raised in dark mode.
 */
exports.MilestoneCardV4 = React.forwardRef(function MilestoneCardV4({ title, category = 'other', date, ageLabel, description, achieved = false, loading = false, status, note, statusLabels, onClick, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const shell = (0, cn_1.cn)('flex flex-col gap-md', tone_v4_1.KIDS_CARD_CLASS, tone_v4_1.KIDS_CARD_GROUND_CLASS, className);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ...rest, ref: ref, "data-xen-milestone-card": "", role: "status", "aria-live": "polite", "aria-label": title, className: shell, children: [(0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { className: "h-4 w-1/2" }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { className: "h-3 w-2/5" })] }));
    }
    if (!title)
        return null;
    const meta = CATEGORY_META_V4[category];
    // `status` wins; without it the card behaves exactly as it does today.
    const state = status ?? (achieved ? 'achieved' : 'upcoming');
    const stateMeta = STATUS_META_V4[state];
    const stateWord = statusLabels?.[state] ?? stateMeta.label;
    const caption = (0, tone_v4_1.captionLine)([meta.label, ageLabel, date]);
    // A neutral explanation is offered only where the status actually owes one.
    const explanation = (0, family_v4_1.needsExplanation)(state) ? note : undefined;
    const label = (0, tone_v4_1.spokenLine)([title, meta.label, ageLabel, date, stateWord, explanation]);
    const head = ((0, jsx_runtime_1.jsxs)("span", { className: "flex w-full items-center gap-md", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-2xl leading-none", children: meta.glyph }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: "line-clamp-2 text-base font-semibold text-on-card", children: title }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: caption })] })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ...rest, ref: ref, "data-xen-milestone-card": "", className: shell, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, onClick: () => onClick(), "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex min-w-0 flex-1 items-center rounded-[var(--xen-radius-md)] bg-transparent text-left', chrome_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: head })) : ((0, jsx_runtime_1.jsx)("span", { className: "flex min-w-0 flex-1 items-center", children: head })), (0, jsx_runtime_1.jsxs)(BadgeV4_1.BadgeV4, { tone: stateMeta.tone, variant: "soft", size: "sm", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: stateMeta.glyph }), (0, jsx_runtime_1.jsx)("span", { children: stateWord })] })] }), explanation ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-text", children: explanation }) : null, description ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-text", children: description }) : null] }));
});
//# sourceMappingURL=MilestoneCardV4.js.map