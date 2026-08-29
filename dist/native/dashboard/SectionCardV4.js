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
exports.SectionCardV4 = SectionCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const ListSeparatorV4_1 = require("../layout/ListSeparatorV4");
const CardV4_1 = require("../primitives/CardV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const TextV4_1 = require("../primitives/TextV4");
const theme_1 = require("../theme");
/**
 * **V4 section card** — the canonical card, and where §4.2 lands.
 *
 * ## What V4 changes
 *
 * 1. **The ground is `colors.card`, not `colors.surface`.** The base paints the
 *    colour of the page it is sitting on, so the card is a rectangle of border
 *    with no card inside it. `card` was split out in the shadcn pass precisely
 *    so a raised surface reads as raised in **both** schemes — it lightens in
 *    dark, where a shadow alone does nothing — and this module never adopted
 *    it. The ink moves with it: `onCard`, not `onSurface`.
 * 2. **One padding variable.** shadcn/ui declares `--card-spacing` once on the
 *    card and has every slot read it; §4.2 asks for the same, and here that is
 *    one local `pad` every slot below reads. It is what makes `grouped` safe —
 *    the header keeps the gutter at exactly the value the body gave up.
 * 3. **`grouped` and `overflow: 'hidden'`.** A list of rows runs flush to the
 *    card edge and clips to `radius.lg`, with `ListSeparatorV4` between the
 *    rows. §4.3's container half: the rows are transparent and the card is the
 *    only ground, so a list reads as one object rather than a stack of little
 *    cards.
 * 4. **The header is on the type ramp, and it is `Section`'s anatomy.** Title
 *    `size="lg" weight="bold"`, subtitle `size="sm" tone="mutedText"`, trailing
 *    `action`. The base hand-rolls `<Text style={{ fontSize, fontWeight }}>`
 *    here and writes Tailwind classes on web — the same intent, expressed
 *    twice, free to drift. And `mutedText`, never the `muted` **fill**: the
 *    base subtitle paints `colors.muted`, which carries no contrast promise.
 * 5. **`gap: 2` is gone.** §1 lists it as a violation; the title-to-supporting
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
 * None. The web twin's `<h3>` is that platform's semantics for a section
 * heading; here the same thing is said with `accessibilityRole="header"`. Same
 * props, same names, same defaults.
 */
function SectionCardV4({ title, subtitle, action, divided = false, grouped = false, insetSeparators = false, padding = 'lg', variant = 'elevated', empty, style, children, ...rest }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const rows = React.Children.toArray(children).filter(Boolean);
    const hasText = Boolean(title || subtitle);
    const hasHeader = hasText || Boolean(action);
    const hasBody = rows.length > 0 || empty !== undefined;
    // §4.5: a component with nothing to show renders nothing. Not an empty padded
    // card, not a bordered box with a hole in it.
    if (!hasHeader && !hasBody)
        return null;
    /*
      The single card-spacing value — shadcn/ui's `--card-spacing` idea (§4.2),
      resolved once and read by every slot below, so a padded body and a
      `padding="none"` row list cannot drift apart and a caller that changes
      `padding` moves the header, the body and the empty state together.
    */
    const pad = padding === 'none' ? 0 : tokens.spacing[padding];
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { variant: variant, radius: "lg", 
        // The card itself never pays the padding — the slots do, from `pad`. That
        // is what lets a grouped body run flush without a negative margin
        // fighting the card's own inset.
        padding: "none", style: [
            {
                // §4.2's headline fix. `CardV4` paints `colors.surface`, which is the
                // page; a card has its own ground and this is it.
                backgroundColor: colors.card,
                gap: tokens.spacing.md,
                // So a flush row list clips to `radius.lg` instead of squaring off
                // the card's corners.
                overflow: 'hidden',
            },
            style,
        ], ...rest, children: [hasHeader ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-v4-section-card-header", style: {
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.md,
                    paddingHorizontal: pad,
                    paddingTop: pad,
                }, children: [hasText ? (
                    // `flex: 1` is geometric: the text column takes the free space so a
                    // long title wraps rather than shoving the action off the end.
                    (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [title ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", size: "lg", weight: "bold", tone: "onCard", children: title })) : null, subtitle ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: subtitle })) : null] })) : null, action ? (
                    // `flexShrink: 0` so a "See all" never compresses to fit a long
                    // title.
                    (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexShrink: 0 }, children: action })) : null] })) : null, divided && hasHeader && hasBody ? ((0, jsx_runtime_1.jsx)(ListSeparatorV4_1.ListSeparatorV4, { testID: "xen-v4-section-card-rule" })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-v4-section-card-body", style: grouped
                    ? null
                    : {
                        paddingHorizontal: pad,
                        paddingBottom: pad,
                        // With a header above, the gap already paid for the space; with
                        // none, the body is the top of the card and pays it itself.
                        paddingTop: hasHeader ? 0 : pad,
                    }, children: rows.length > 0
                    ? grouped
                        ? rows.map((row, i) => ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [i > 0 ? ((0, jsx_runtime_1.jsx)(ListSeparatorV4_1.ListSeparatorV4, { inset: insetSeparators ? 'leading' : undefined })) : null, row] }, i)))
                        : rows
                    : empty !== undefined
                        ? (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { ...empty })
                        : null })] }));
}
//# sourceMappingURL=SectionCardV4.js.map