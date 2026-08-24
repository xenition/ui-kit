"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrecipBar = PrecipBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
/**
 * Precipitation-probability bars: one token-filled column per period, its height
 * proportional to the chance (0–100). The fill uses a `primary` token tint plus
 * a droplet glyph header, so the metric reads without color alone. Values are
 * guarded/clamped to 0–100. Renders a muted empty state when `slots` is empty.
 * All colors/sizes come from the compiled theme tokens via `useXenitionTheme()`
 * — no literal colors, no chart deps.
 */
function PrecipBar({ slots, height = 96, showValues = false, emptyLabel = 'No precipitation data', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (slots.length === 0) {
        return ((0, jsx_runtime_1.jsx)(Card_1.Card, { variant: "outlined", style: style, accessibilityRole: "summary", children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel }) }));
    }
    const track = (0, weather_utils_1.clamp)(height, 32, 320);
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { variant: "outlined", padding: "sm", style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCA7", size: "sm", accessibilityLabel: "Precipitation" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Precipitation" })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.xs,
                    marginTop: tokens.spacing.sm,
                }, children: slots.map((slot, index) => {
                    const pct = (0, weather_utils_1.clamp)(slot.chance, 0, 100);
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `${slot.label}, ${pct} percent chance${slot.amount ? `, ${slot.amount}` : ''}`, style: { flex: 1, alignItems: 'center', gap: tokens.spacing.xs }, children: [showValues ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [pct, "%"] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: '70%',
                                    height: track,
                                    borderRadius: tokens.radius.sm,
                                    backgroundColor: (0, weather_utils_1.withAlpha)(colors.primary, 0.12),
                                    justifyContent: 'flex-end',
                                    overflow: 'hidden',
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        height: `${pct}%`,
                                        borderRadius: tokens.radius.sm,
                                        backgroundColor: colors.primary,
                                    } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: slot.label })] }, `${slot.label}-${index}`));
                }) })] }));
}
//# sourceMappingURL=PrecipBar.js.map