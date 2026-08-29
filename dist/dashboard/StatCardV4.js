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
exports.StatCardV4 = exports.STAT_CARD_V4_CSS = exports.STAT_CARD_V4_STYLE_ID = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
/**
 * The kit has no `arrow-up` / `arrow-down` name — brief §6's open question 6
 * asked that the names be confirmed before agents started guessing, and the
 * confirmed set (`primitives/icon-names.ts`) has `chevron-up`, `chevron-down`
 * and `forward` and no arrows. So the direction mark is a chevron, from the
 * named set, rather than a `▲` typed into this file: brief §1 rule 2 retires
 * the literal `▲` / `▼` characters the base shipped, and inventing an icon
 * name that does not resolve is how those characters got there the first time.
 */
const TREND_ICON = {
    up: 'chevron-up',
    down: 'chevron-down',
    flat: 'forward',
};
/**
 * Trend → ink.
 *
 * The contrast-corrected `*Text` slots, never the fills. `success` is what a
 * filled chip is painted with and the compiler makes no promise about it as
 * ink on a card; `successText` is exactly that promise. Identical to the
 * mapping `StatisticV4` already uses, because there must not be two numeric
 * treatments in one kit.
 */
const TREND_TONE = {
    up: 'successText',
    down: 'dangerText',
    flat: 'mutedText',
};
/** The one `<style>` id this component injects from. Idempotent. */
exports.STAT_CARD_V4_STYLE_ID = 'xen-v4-stat-card-styles';
/**
 * Two rules, and each needs something a utility class bound to a token cannot
 * say.
 *
 * 1. **The card ground.** Brief §4.2's headline fix: this card paints
 *    `--xen-card`, not `--xen-surface`, so a white card reads as raised on the
 *    warm page. `CardV4` hard-codes `bg-surface text-on-surface` in its own
 *    class list, and `cn()` is a plain string join with no `tailwind-merge`
 *    behind it — so passing `bg-card` in `className` would put **both**
 *    utilities on the element and let the generated stylesheet's ordering pick
 *    the winner. Tailwind sorts background utilities alphabetically inside the
 *    plugin, which puts `.bg-card` *before* `.bg-surface`: the override would
 *    lose, silently, and the module's most visible bug would survive the pass
 *    that exists to fix it.
 *
 *    So the override is made by **specificity** instead of by order. The
 *    selector is two attributes (0-2-0) against a single class (0-1-0), which
 *    wins wherever the sheets happen to land — the same trick
 *    `internal/row-v4.ts` uses to beat `V4_STATE_CSS` without the two agreeing
 *    on injection order.
 *
 * 2. **The trend glyph's ink.** `IconV4`'s `color` takes the ten `IconColor`
 *    slots and none of them is `successText` — the contrast-corrected text
 *    forms are a `TextTone` idea. Rather than tint the glyph with the *fill*
 *    (the exact bug §5 records against the web `MetricTile`), the glyph
 *    inherits from the delta line, which is already the right `*Text` colour.
 *    A descendant selector is 0-2-0, so it beats the `text-on-surface` class
 *    `IconV4` writes for its default slot.
 */
exports.STAT_CARD_V4_CSS = `
[data-xen-v4-card][data-xen-v4-stat-card] {
  background-color: var(--xen-card);
  color: var(--xen-on-card);
}
[data-xen-v4-stat-delta] [data-xen-v4-icon] {
  color: inherit;
}
`;
/**
 * **V4 stat card** — the on-page KPI card, and where brief §3's decision lands.
 *
 * The base is a bordered box the same colour as the page with a `2xl` number in
 * it. §3 names that for what it is — a spreadsheet cell — and describes what
 * this product's stat actually is: a white card floating on the warm ground,
 * generous, one loud thing in it. Five changes, in the order they matter.
 *
 * 1. **The ground is `card`, not `surface`.** This is the single most visible
 *    change in the whole dashboard pass. `colors.card` was split out in the
 *    shadcn pass precisely so a raised surface reads as raised in *both*
 *    schemes, and this module never adopted it — every card in it paints the
 *    same colour as the page it sits on, which is why the border was doing all
 *    the work. See {@link STAT_CARD_V4_CSS} for why the override is a sheet.
 * 2. **The value is the loudest thing on the block.** `3xl`, bold, on the
 *    display face, in tabular figures — the treatment `StatisticV4` already
 *    typesets a hero number with, reused rather than re-invented. `2xl` ties
 *    the page title, and a KPI that ties the page title has no hierarchy.
 *    Tabular figures are what stop a ticking value from reflowing and a column
 *    of cards from failing to line up.
 * 3. **The label is above the value, small and calm.** `sm` / `mutedText` —
 *    `mutedText`, never the `muted` *fill*, which carries no contrast promise
 *    as ink. HIG's charting guidance is the argument for the order: a short
 *    descriptive headline first, so the number underneath is graspable at a
 *    glance.
 * 4. **The delta is not colour alone.** Green and red are the whole signal in
 *    the base, which fails for the ~8% of men who cannot separate them. V4
 *    pairs the `successText` / `dangerText` ink with a real direction glyph
 *    from the named icon set. The sign is already in the delta *string*
 *    ("+12%"), so the announcement carries the direction without this file
 *    inventing an English word for a screen reader to read.
 * 5. **The icon became a badge.** It floated at the top-right of the base,
 *    competing with the label; §3 and §4.7 put a categorical glyph in a soft
 *    tinted 44 circle at the top of the block, naming what the number is
 *    about. `iconName` gets that treatment for free from `IconV4`.
 *
 * Composes `CardV4`, `TextV4` and `IconV4` (§10.5 — a V4 composite composes V4
 * children). It renders **nothing** when it has neither a label nor a value:
 * brief §4.5, a component with nothing to show is never a blank bordered box.
 */
exports.StatCardV4 = React.forwardRef(function StatCardV4({ label, value, delta, trend, icon, iconName, tone = 'primary', caption, raised = true, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(exports.STAT_CARD_V4_STYLE_ID, exports.STAT_CARD_V4_CSS);
    // Only a string or a number has a reading; a caller's node stringifies to
    // "[object Object]", which is what the base put in its `aria-label`.
    const valueText = typeof value === 'string' || typeof value === 'number' ? String(value) : '';
    const hasValue = value !== undefined && value !== null && value !== '';
    const hasLabel = label !== undefined && label !== null && label !== '';
    // Nothing to say, so nothing is drawn (§4.5). A stat card with no label and
    // no value is a blank bordered box, which is the one outcome that section
    // rules out.
    if (!hasLabel && !hasValue)
        return null;
    const resolvedTrend = trend ?? 'flat';
    const badge = iconName !== undefined ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: iconName, badge: "soft", color: tone })) : icon != null ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-flex shrink-0 items-center justify-center', nav_v4_1.MIN_TAP_SQUARE_CLASS), children: icon })) : null;
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, "data-xen-v4-stat-card": "", variant: raised ? 'elevated' : 'outlined', radius: "lg", padding: "lg", "aria-label": `${String(label ?? '')}${valueText ? `: ${valueText}` : ''}${delta ? `, ${delta}` : ''}`, className: (0, cn_1.cn)('flex flex-col gap-md', className), ...rest, children: [badge, (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-col gap-xs", children: [hasLabel ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: label })) : null, hasValue ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "3xl", weight: "bold", tone: "onCard", numeric: "tabular", children: value })) : null, delta ? ((0, jsx_runtime_1.jsxs)(TextV4_1.TextV4, { "data-xen-v4-stat-delta": "", size: "sm", weight: "semibold", tone: TREND_TONE[resolvedTrend], numeric: "tabular", className: "inline-flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: TREND_ICON[resolvedTrend], size: "xs" }), delta] })) : null, caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: caption })) : null] })] }));
});
//# sourceMappingURL=StatCardV4.js.map