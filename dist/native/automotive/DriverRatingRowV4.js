"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverRatingRowV4 = DriverRatingRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const RatingV4_1 = require("../primitives/RatingV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const fleet_v4_1 = require("./internal/fleet-v4");
/**
 * **V4 driver rating row** — same props as {@link DriverRatingRow} plus three
 * copy hooks.
 *
 * ## Four changes
 *
 * 1. **The read-only form is `RatingV4` with its value showing.** The base
 *    hand-drew five glyphs; the primitive already draws them, and `showValue`
 *    puts the numeral beside them — which is the half a low-vision user reads.
 * 2. **Each interactive star is a real 44pt target.** The base's stars were
 *    laid out at glyph size, so rating a driver on a phone meant hitting a
 *    16pt box. The stars stay visually the same size; the *target* grows.
 * 3. **The skeleton is opaque**, not a translucent wash of `muted` that
 *    borrows whatever is behind it.
 * 4. **The whole group has one accessible name.** The base announced the
 *    read-only form and left the interactive one as five unlabelled presses.
 *
 * **Renders nothing without a `driverName`** (§4.5).
 */
function DriverRatingRowV4({ driverName, avatarUrl, subtitle, value = 0, max = 5, onRate, variant = 'interactive', loading = false, formatRating, formatStarLabel, unratedLabel = 'Not rated', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: tokens.spacing['2xl'],
                        height: tokens.spacing['2xl'],
                        borderRadius: tokens.radius.full,
                        backgroundColor: (0, fleet_v4_1.skeletonFill)(theme),
                    } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                height: tokens.typography.scale.base,
                                width: '50%',
                                borderRadius: tokens.radius.sm,
                                backgroundColor: (0, fleet_v4_1.skeletonFill)(theme),
                            } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                height: tokens.typography.scale.sm,
                                width: '70%',
                                borderRadius: tokens.radius.sm,
                                backgroundColor: (0, fleet_v4_1.skeletonFill)(theme),
                            } })] })] }));
    }
    if (!driverName)
        return null;
    const parts = (0, fleet_v4_1.ratingParts)({ value, max, format: formatRating });
    const interactive = variant === 'interactive' && Boolean(onRate);
    const starLabel = formatStarLabel ?? ((star, total) => `Rate ${star} of ${total} stars`);
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { accessible: !interactive, accessibilityLabel: interactive ? undefined : `${driverName}, ${parts.text ? parts.label : unratedLabel}`, style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUrl, name: driverName, size: "md" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, children: driverName }), subtitle ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: subtitle })) : null] }), interactive ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: parts.label, style: { flexDirection: 'row' }, children: Array.from({ length: parts.total }, (_, i) => {
                    const star = i + 1;
                    const on = star <= parts.filled;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityLabel: starLabel(star, parts.total), accessibilityState: { selected: on }, onPress: () => onRate?.(star), 
                        /*
                          The target is 44; the glyph stays small. The base laid the
                          stars out at glyph size, so rating a driver meant hitting a
                          16pt box with a thumb.
                        */
                        style: ({ pressed }) => ({
                            width: tap,
                            height: tap,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.full,
                            backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : 'transparent',
                        }), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: on ? 'star' : 'star-outline', size: "lg", style: { color: on ? colors.warnText : colors.mutedText } }) }, star));
                }) })) : parts.text ? ((0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: value, max: max, size: "sm", showValue: true })) : ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: unratedLabel }))] }));
}
//# sourceMappingURL=DriverRatingRowV4.js.map