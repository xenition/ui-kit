"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareRowV4 = ShareRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const ShareRow_1 = require("./ShareRow");
/**
 * **V4 share row** — same props as {@link ShareRow} plus `formatTargetLabel`.
 *
 * ## Three changes
 *
 * 1. **Every share control clears 44.** They were exactly 40 square — on this
 *    twin with hit slop over them, on the web twin with no recourse at all —
 *    which is a miss on the one row of the article whose only purpose is to be
 *    tapped.
 * 2. **Press is a state layer.** `opacity: 0.6` is *below* M3's 0.38 disabled
 *    band by the time it reaches the glyph, so a pressed share button read as
 *    an unavailable one.
 * 3. **The destination copy is overridable.** The four defaults ship
 *    unchanged — they are good defaults — but `formatTargetLabel` lets an app
 *    localise "Copy link" without rebuilding the whole `targets` array, and
 *    the heading takes `mutedText` rather than the `muted` fill.
 */
function ShareRowV4({ onShare, targets = ShareRow_1.DEFAULT_SHARE_TARGETS, variant = 'icons', heading = 'Share', formatTargetLabel, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const labeled = variant === 'labeled';
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const label = (value) => (formatTargetLabel ? formatTargetLabel(value) : value);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [heading != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", tone: "mutedText", style: { textTransform: 'uppercase' }, children: heading })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: targets.map((target) => ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label(target.label), onPress: () => onShare(target.id), style: ({ pressed }) => ({
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: tokens.spacing.xs,
                        width: labeled ? undefined : tap,
                        minWidth: tap,
                        height: tap,
                        paddingHorizontal: labeled ? tokens.spacing.md : 0,
                        borderRadius: labeled ? tokens.radius.md : tokens.radius.full,
                        borderWidth: 1,
                        borderColor: colors.border,
                        // The button tints; the glyph inside it keeps full strength.
                        backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : colors.surface,
                    }), children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: target.glyph, size: "base", color: "onSurface" }), labeled ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", children: label(target.label) })) : null] }, target.id))) })] }));
}
//# sourceMappingURL=ShareRowV4.js.map