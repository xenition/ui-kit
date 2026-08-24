"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedSearchRow = SavedSearchRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * A row in a saved-searches list — name, filter summary, a "new matches" count
 * badge, and an optional alerts toggle. Data + callbacks only; nothing fetches.
 * The alert switch renders only when `onToggleAlerts` is provided and is kept
 * out of the row's press target so toggling never runs the search. Reuses the
 * shared `Badge`, `Switch`, and `Icon`; token-only colors; a11y-labelled.
 */
function SavedSearchRow({ name, summary, newCount = 0, alertsOn = false, onToggleAlerts, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), newCount > 0 ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: `${newCount} new` }) : null] }), summary ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: summary })) : null] }));
    const alertsControl = onToggleAlerts ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignItems: 'center', gap: 2 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: alertsOn, onCheckedChange: onToggleAlerts, accessibilityLabel: `Alerts for ${name}, ${alertsOn ? 'on' : 'off'}` }) })) : null;
    const rowStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            paddingVertical: tokens.spacing.md,
            paddingHorizontal: tokens.spacing.lg,
        },
        style,
    ];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: rowStyle, children: [onPress ? ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}${newCount > 0 ? `, ${newCount} new matches` : ''}`, onPress: onPress, style: ({ pressed }) => ({ flex: 1, opacity: pressed ? 0.85 : 1, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }), children: [content, (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u203A", size: "lg", color: "muted" })] })) : (content), alertsControl] }));
}
//# sourceMappingURL=SavedSearchRow.js.map