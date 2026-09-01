"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedSearchRowV4 = SavedSearchRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * SavedSearchRow — **V4** "listing" design. The editorial take on a
 * saved-searches row: an elevated, rounded card with the query name, a one-line
 * filter summary, a soft-primary "new matches" count pill, and an alerts toggle.
 * Same props/behavior as {@link SavedSearchRowProps}; the alert switch renders
 * only when `onToggleAlerts` is provided and is kept out of the row's press
 * target so toggling never runs the search. Token-only colors via
 * `useXenitionTheme()` + `withAlpha`; a11y-labelled.
 */
function SavedSearchRowV4({ name, summary, newCount = 0, alertsOn = false, onToggleAlerts, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), newCount > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: 2,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: `${newCount} new` }) })) : null] }), summary ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: summary })) : null] }));
    const alertsControl = onToggleAlerts ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { minHeight: 44, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: alertsOn, onCheckedChange: onToggleAlerts, accessibilityLabel: `Alerts for ${name}, ${alertsOn ? 'on' : 'off'}` }) })) : null;
    const rowStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.lg,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
        },
        style,
    ];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: rowStyle, children: [onPress ? ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}${newCount > 0 ? `, ${newCount} new matches` : ''}`, onPress: onPress, style: ({ pressed }) => ({
                    flex: 1,
                    minHeight: 44,
                    opacity: pressed ? 0.85 : 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                }), children: [content, (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u203A", size: "lg", color: "muted" })] })) : (content), alertsControl] }));
}
//# sourceMappingURL=SavedSearchRowV4.js.map