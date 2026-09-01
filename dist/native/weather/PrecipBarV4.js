"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrecipBarV4 = PrecipBarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const weather_utils_1 = require("./weather-utils");
/**
 * PrecipBar — **elevated white card** design (v4). Precipitation-probability
 * bars: one token-filled column per period, its height proportional to the
 * chance (0–100). The fill uses a `primary` token on a soft `onSurface` track,
 * with a droplet glyph header, so the metric reads without color alone. Values
 * are guarded/clamped to 0–100 and optionally shown via `showValues`. Renders a
 * muted empty state when `slots` is empty. All colors/sizes come from the
 * compiled theme tokens via `useXenitionTheme()` — no literal colors, no chart
 * deps. Same props as {@link PrecipBarProps}.
 */
function PrecipBarV4({ slots, height = 96, showValues = false, emptyLabel = 'No precipitation data', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const card = {
        backgroundColor: colors.card,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.12,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
    };
    if (slots.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [card, style], accessibilityRole: "summary", children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.base }, children: emptyLabel }) }));
    }
    const track = (0, weather_utils_1.clamp)(height, 32, 320);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [card, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCA7", size: "base", accessibilityLabel: "Precipitation" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.lg,
                            fontWeight: '700',
                        }, children: "Precipitation" })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                    marginTop: tokens.spacing.md,
                }, children: slots.map((slot, index) => {
                    const pct = (0, weather_utils_1.clamp)(slot.chance, 0, 100);
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `${slot.label}, ${pct} percent chance${slot.amount ? `, ${slot.amount}` : ''}`, style: { flex: 1, alignItems: 'center', gap: tokens.spacing.xs }, children: [showValues ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale.xs,
                                    fontWeight: '600',
                                }, children: [pct, "%"] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: '70%',
                                    height: track,
                                    borderRadius: tokens.radius.md,
                                    backgroundColor: (0, weather_utils_1.withAlpha)(colors.onSurface, 0.08),
                                    justifyContent: 'flex-end',
                                    overflow: 'hidden',
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        height: `${pct}%`,
                                        borderRadius: tokens.radius.md,
                                        backgroundColor: colors.primary,
                                    } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm }, children: slot.label })] }, `${slot.label}-${index}`));
                }) })] }));
}
//# sourceMappingURL=PrecipBarV4.js.map