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
exports.ChoreCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const family_v4_1 = require("./family-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** Glyph, default word and chip tone per status. */
const STATUS_META_V4 = {
    todo: { glyph: '⬜', label: 'To do', tone: 'neutral' },
    'in-progress': { glyph: '🔄', label: 'In progress', tone: 'primary' },
    // `done` is the one genuine status here: the task succeeded.
    done: { glyph: '✅', label: 'Done', tone: 'success' },
    // `warn` on the base. A child skipping a chore is not a system warning; it
    // is a fact that wants a reason, which is what `reason` is for.
    skipped: { glyph: '⏭️', label: 'Skipped', tone: 'neutral' },
};
/** Reward points are a category, not a status — the brand's second slot. */
const POINTS_TONE = 'accent';
/**
 * **V4 chore card** — same props as {@link ChoreCard} plus `reason`,
 * `statusLabels` and `completeLabel`.
 *
 * ## Six changes
 *
 * 1. **A keyboard user can finally mark a chore done.** The card was a
 *    `role="button"` `div` with "Mark done" nested inside it. The inner
 *    button's *click* was guarded with `stopPropagation` and its *keydown* was
 *    not, so the card's handler caught the bubbled keydown, ran
 *    `preventDefault()` and cancelled the button's own activation — Enter's
 *    default action **is** that click — then navigated instead. A mouse user
 *    never saw it. The card is now a plain container, the activation wraps only
 *    the icon-and-text region, and the action is its sibling.
 * 2. **`{...rest}` is spread first.** It was spread after `onClick`, so a
 *    caller passing any handler through silently replaced the card's own.
 * 3. **A skipped chore is not a warning.** `skipped → warn` painted a child's
 *    day in the vocabulary the kit reserves for something going wrong. It is a
 *    neutral chip with a glyph and a word, and `reason` gives the explanation
 *    somewhere to live — a status that needs one and has nowhere to put it is
 *    how a chore log turns into a tally of failures.
 * 4. **The four status words are replaceable**, as is the action's label. They
 *    were hard-coded English in a component that ships to every locale.
 * 5. **Badges converge on `soft`.** Every native call passed `variant="soft"`,
 *    no web call passed `variant` at all, and web defaults to `solid` — the
 *    same props drawing two visual weights. The points chip also moves to
 *    `accent`, matching the native twin, which the stale "web Badge has no
 *    accent" comment had been holding back.
 * 6. **Tokens and targets.** `hover:bg-neutral-50` is a light-scheme ramp step
 *    that paints a near-white slab on a dark page, and press is a state layer
 *    rather than a tint; the skeleton is opaque and card-relative; the
 *    activation clears 44.
 */
exports.ChoreCardV4 = React.forwardRef(function ChoreCardV4({ title, assignee, points, due, icon = '🧹', status = 'todo', loading = false, reason, statusLabels, completeLabel = 'Mark done', onComplete, onClick, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const shell = (0, cn_1.cn)('flex flex-col gap-md', tone_v4_1.KIDS_CARD_CLASS, tone_v4_1.KIDS_CARD_GROUND_CLASS, className);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ...rest, ref: ref, "data-xen-chore-card": "", role: "status", "aria-live": "polite", "aria-label": title, className: shell, children: [(0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { className: "h-4 w-3/5" }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { className: "h-3 w-2/5" })] }));
    }
    if (!title)
        return null;
    const meta = STATUS_META_V4[status];
    const statusWord = statusLabels?.[status] ?? meta.label;
    const isDone = status === 'done';
    const caption = (0, tone_v4_1.captionLine)([assignee, due]);
    // A neutral explanation is only offered where the status actually owes one.
    const explanation = (0, family_v4_1.needsExplanation)(status) ? reason : undefined;
    const name = (0, tone_v4_1.spokenLine)([title, assignee, due, statusWord, explanation]);
    // The star is NOT `aria-hidden`: it is the only thing that says what the
    // numeral counts, and inventing the English word "points" here would be a
    // string this component has no prop to let a caller replace.
    const pointsChip = typeof points === 'number' ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: POINTS_TONE, variant: "soft", size: "sm", children: (0, jsx_runtime_1.jsx)("span", { children: `⭐ ${points}` }) })) : null;
    const head = ((0, jsx_runtime_1.jsxs)("span", { className: "flex w-full items-center gap-md", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-2xl leading-none", children: icon }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-base font-semibold text-on-card', isDone && 'line-through'), children: title }), caption ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: caption }) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ...rest, ref: ref, "data-xen-chore-card": "", className: shell, children: [onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": name, onClick: () => onClick(), "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(), className: (0, cn_1.cn)('flex items-center rounded-[var(--xen-radius-md)] bg-transparent text-left', chrome_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: head })) : (head), explanation ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-text", children: explanation }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-sm", children: [(0, jsx_runtime_1.jsxs)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { children: statusWord })] }), pointsChip, !isDone && onComplete ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", variant: "primary", className: "ml-auto", onClick: () => onComplete(), children: completeLabel })) : null] })] }));
});
//# sourceMappingURL=ChoreCardV4.js.map