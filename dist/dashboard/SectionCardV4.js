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
exports.SectionCardV4 = exports.DASHBOARD_CARD_V4_CSS = exports.DASHBOARD_CARD_V4_GROUND_ATTR = exports.DASHBOARD_CARD_V4_STYLE_ID = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const ListSeparatorV4_1 = require("../layout/ListSeparatorV4");
const inject_1 = require("../motion/internal/inject");
const CardV4_1 = require("../primitives/CardV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const TextV4_1 = require("../primitives/TextV4");
const cn_1 = require("../primitives/cn");
/**
 * The id of the one sheet the V4 dashboard containers inject.
 *
 * Exported so `SettingsSectionV4` can inject the same sheet rather than declare
 * a second copy of the card ground, and so both specs can read it back.
 */
exports.DASHBOARD_CARD_V4_STYLE_ID = 'xen-v4-dashboard-card-styles';
/**
 * The attribute that marks a `CardV4` as painting the **card** ground rather
 * than the page ground.
 *
 * Brief §4.2: "the most visible bug in the dashboard module today is that every
 * card paints `bg-surface` — the same colour as the page." `colors.card` was
 * split out in the shadcn pass so a raised card reads as raised in *both*
 * schemes (it lightens in dark, where a shadow alone does nothing), and this
 * module never adopted it.
 *
 * It is an attribute and a sheet rather than a `bg-card` class because
 * {@link CardV4} writes `bg-surface` into its own `className`, and two utility
 * classes setting the same property are resolved by the order Tailwind emitted
 * them in — not by the order this component joined them in. The selector below
 * carries **two** attributes, so its specificity (0-2-0) beats a single utility
 * class (0-1-0) whichever way round the stylesheet happens to be built. That is
 * the same argument `internal/row-v4.ts` makes for its own state-ground rule,
 * and it is also why the ground is not an inline `style`: an inline `var()`
 * colour is dropped by every CSS parser that cannot resolve it, so the one rule
 * that matters most in this pass would be the one rule nothing could assert.
 */
exports.DASHBOARD_CARD_V4_GROUND_ATTR = 'data-xen-v4-card-ground';
/**
 * The card ground and its ink, and nothing else.
 *
 * No border and no shadow live here: {@link CardV4} already owns both, and §4.2
 * is explicit that the house look is a **hairline plus a soft shadow** — never
 * a heavy border *and* a heavy shadow. Adding a weight here would be exactly
 * that mistake.
 */
exports.DASHBOARD_CARD_V4_CSS = `
[data-xen-v4-card][${exports.DASHBOARD_CARD_V4_GROUND_ATTR}="card"] {
  background-color: var(--xen-card);
  color: var(--xen-on-card);
}
`;
/**
 * The single card-spacing variable — shadcn/ui's `--card-spacing` idea (§4.2).
 *
 * Declared **once** on the card and read by every slot below it, so a padded
 * body and a `padding="none"` row list cannot drift apart, and so a caller that
 * changes `padding` moves the header, the body and the empty state together.
 * The alternative — a padding prop translated separately at three call sites —
 * is how the current sources ended up with three different gutters.
 */
const CARD_PAD_VAR = '--xen-v4-card-pad';
/**
 * Each `CardPadding` as the expression the variable is set to. `none` is `0px`:
 * zero is zero on every scale, and it is the one bare number in this file.
 */
const CARD_PAD_VALUE = {
    none: '0px',
    sm: 'var(--xen-space-sm)',
    md: 'var(--xen-space-md)',
    lg: 'var(--xen-space-lg)',
};
/*
  The slot classes, written out in full rather than interpolated, because
  Tailwind's scanner reads source text and never sees a template literal. Every
  one of them reads CARD_PAD_VAR — that is the whole point of the variable.
*/
const PAD_X = 'px-[var(--xen-v4-card-pad)]';
const PAD_T = 'pt-[var(--xen-v4-card-pad)]';
const PAD_B = 'pb-[var(--xen-v4-card-pad)]';
/** Header to body, and header to rule to body. §4.1's 16. */
const SLOT_GAP = 'gap-[var(--xen-space-md)]';
/** Title to supporting line. §4.1's 4 — the `gap-0.5` §1 bans. */
const TEXT_GAP = 'gap-[var(--xen-space-xs)]';
/**
 * **V4 section card** — the canonical card, and where §4.2 lands.
 *
 * ## What V4 changes
 *
 * 1. **The ground is `card`, not `surface`.** The base paints `bg-surface`,
 *    which is the colour of the page it is sitting on, so the card is a
 *    rectangle of border with no card inside it. See
 *    {@link DASHBOARD_CARD_V4_GROUND_ATTR} for why that is a sheet rather than
 *    a class. The ink moves with it: `onCard`, not `onSurface`.
 * 2. **One padding variable.** shadcn/ui declares `--card-spacing` once on the
 *    card and has every slot read it; §4.2 asks for the same here, and it is
 *    what makes `grouped` safe — the header keeps the gutter at exactly the
 *    value the body gave up, because both are the same expression.
 * 3. **`grouped` and `overflow: hidden`.** A list of rows runs flush to the
 *    card edge and clips to `radius.lg`, with `ListSeparatorV4` between the
 *    rows. This is §4.3's container half: the rows are transparent and the card
 *    is the only ground, so a list reads as one object rather than a stack of
 *    little cards.
 * 4. **The header is on the type ramp, and it is `Section`'s anatomy.** Title
 *    `size="lg" weight="bold"`, subtitle `size="sm" tone="mutedText"`, trailing
 *    `action` — the same three slots `SectionV4` has, which is what makes a
 *    section and a section card look related instead of unrelated. `mutedText`,
 *    never the `muted` **fill**: the base subtitle uses the fill, which carries
 *    no contrast promise.
 * 5. **`gap-0.5` is gone.** §1 lists it as a violation; the title-to-supporting
 *    step is `spacing.xs` (§4.1).
 * 6. **It survives its empty case.** No children renders the `empty` state, or
 *    nothing at all — never a bordered box with a hole in it (§4.5).
 *
 * The header **collapses entirely** when there is no title, no subtitle and no
 * action: a padded empty row above the body is worse than no header, and the
 * `gap` it would leave behind is visible even when the row is not.
 *
 * ### Platform divergence
 *
 * None. The `<h3>` is the web's semantics for a section heading; the native
 * twin reaches the same place with `accessibilityRole="header"`. Same props,
 * same names, same defaults.
 */
exports.SectionCardV4 = React.forwardRef(function SectionCardV4({ title, subtitle, action, divided = false, grouped = false, insetSeparators = false, padding = 'lg', variant = 'elevated', empty, children, className, style, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(exports.DASHBOARD_CARD_V4_STYLE_ID, exports.DASHBOARD_CARD_V4_CSS);
    const rows = React.Children.toArray(children).filter(Boolean);
    const hasText = Boolean(title || subtitle);
    const hasHeader = hasText || Boolean(action);
    const hasBody = rows.length > 0 || empty !== undefined;
    // §4.5: a component with nothing to show renders nothing. Not an empty
    // padded card, not a bordered box with a hole in it.
    if (!hasHeader && !hasBody)
        return null;
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, variant: variant, radius: "lg", 
        // The card itself never pays the padding — the slots do, from the one
        // variable below. That is what lets a grouped body run flush without a
        // negative margin fighting the card's own inset.
        padding: "none", "data-xen-v4-section-card": "", "data-xen-v4-card-ground": "card", "data-grouped": grouped ? 'true' : 'false', 
        // `overflow-hidden` so a flush row list clips to `radius.lg` instead of
        // squaring off the card's corners.
        className: (0, cn_1.cn)('flex flex-col overflow-hidden', SLOT_GAP, className), style: { [CARD_PAD_VAR]: CARD_PAD_VALUE[padding], ...style }, ...rest, children: [hasHeader ? ((0, jsx_runtime_1.jsxs)("div", { "data-xen-v4-section-card-header": "", className: (0, cn_1.cn)('flex flex-row items-start justify-between', SLOT_GAP, PAD_X, PAD_T), children: [hasText ? (
                    // `flex-1` and `min-w-0` are geometric: the text column takes the
                    // free space and is allowed to shrink, so a long title truncates
                    // rather than shoving the action off the end.
                    (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex min-w-0 flex-1 flex-col', TEXT_GAP), children: [title ? (
                            // `m-0` kills the user-agent heading margin, which would
                            // otherwise sit inside the gap and widen it.
                            (0, jsx_runtime_1.jsx)("h3", { className: "m-0", children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onCard", children: title }) })) : null, subtitle ? ((0, jsx_runtime_1.jsx)("p", { className: "m-0", children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: subtitle }) })) : null] })) : null, action ? (
                    // `shrink-0` so a "See all" never compresses to fit a long title.
                    (0, jsx_runtime_1.jsx)("div", { "data-xen-v4-section-card-action": "", className: "shrink-0", children: action })) : null] })) : null, divided && hasHeader && hasBody ? ((0, jsx_runtime_1.jsx)(ListSeparatorV4_1.ListSeparatorV4, { "data-xen-v4-section-card-rule": "" })) : null, (0, jsx_runtime_1.jsx)("div", { "data-xen-v4-section-card-body": "", className: grouped ? undefined : (0, cn_1.cn)(PAD_X, PAD_B, hasHeader ? undefined : PAD_T), children: rows.length > 0 ? (grouped ? (rows.map((row, i) => ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [i > 0 ? ((0, jsx_runtime_1.jsx)(ListSeparatorV4_1.ListSeparatorV4, { inset: insetSeparators ? 'leading' : undefined })) : null, row] }, i)))) : (rows)) : empty !== undefined ? ((0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { ...empty })) : null })] }));
});
//# sourceMappingURL=SectionCardV4.js.map