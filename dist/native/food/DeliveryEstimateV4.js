"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryEstimateV4 = DeliveryEstimateV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const menu_v4_1 = require("./internal/menu-v4");
const MODE_GLYPH = { delivery: '🛵', pickup: '🛍️' };
const MODE_CAPTION = {
    delivery: 'Estimated delivery',
    pickup: 'Ready for pickup',
};
/**
 * **V4 delivery estimate** — same props as {@link DeliveryEstimate} plus
 * `estimatingLabel` and `unit`.
 *
 * ## Four changes
 *
 * 1. **A transposed window is no longer swallowed.** The base tested
 *    `maxMinutes > minMinutes` and dropped the max otherwise, so
 *    `min={35} max={20}` rendered a confident "35 min" and the 20 vanished
 *    without a word. `deliveryWindow()` reads the pair the way round a human
 *    would and renders "20–35 min".
 * 2. **The name it computes lands on an element that has a role.** It built a
 *    careful `"Estimated delivery: 25–35 min"` and hung it on a bare `View`,
 *    which has no role for a reader to stop on, so in the `badge` and `inline`
 *    variants it was announced inconsistently or not at all.
 * 3. **The badge stops being a ramp step.** `tokens.ramps.neutral[100]` is
 *    copied to native without inverting, so the pill was a near-white lozenge
 *    on a dark page. It is the module's one badge shape now.
 * 4. **The figure is tabular and the unit is a prop**, so an ETA that ticks
 *    down does not shuffle sideways and a non-English caller is not stuck with
 *    "min".
 */
function DeliveryEstimateV4({ minMinutes, maxMinutes, mode = 'delivery', variant = 'inline', caption, loading = false, estimatingLabel = 'Estimating', unit = 'min', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const window = (0, menu_v4_1.deliveryWindow)(minMinutes, maxMinutes, unit);
    const timeText = loading ? '—' : window;
    const captionText = caption ?? MODE_CAPTION[mode];
    // Change 2: one name, and it goes on the element that carries the role.
    const name = (0, menu_v4_1.spokenLine)([captionText, loading ? estimatingLabel : window]);
    if (variant === 'badge') {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: name, style: [{ alignSelf: 'flex-start' }, style], children: (0, jsx_runtime_1.jsxs)(BadgeV4_1.BadgeV4, { tone: "neutral", variant: menu_v4_1.BADGE_V4.variant, size: menu_v4_1.BADGE_V4.size, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: MODE_GLYPH[mode], size: "xs" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "onSurface", style: menu_v4_1.TABULAR, children: timeText })] }) }));
    }
    if (variant === 'card') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: name, style: [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    borderRadius: tokens.radius.lg,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.card,
                    padding: tokens.spacing.md,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: MODE_GLYPH[mode], size: "xl" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", tone: "onCard", style: menu_v4_1.TABULAR, children: timeText }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: captionText })] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: name, style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: MODE_GLYPH[mode], size: "sm" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", style: menu_v4_1.TABULAR, children: timeText }), (0, jsx_runtime_1.jsxs)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: ["\u00B7 ", captionText] })] }));
}
//# sourceMappingURL=DeliveryEstimateV4.js.map