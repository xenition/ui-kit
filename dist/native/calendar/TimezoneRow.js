"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimezoneRow = TimezoneRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
function prettifyZone(id) {
    const tail = id.split('/').slice(-1)[0] ?? id;
    return tail.replace(/_/g, ' ');
}
/**
 * A timezone display/select row for an event form. `row` renders a tappable
 * settings line (globe icon, title, current zone, chevron) that hands off to a
 * host-owned picker; `inline` is a static caption. No date math is done here —
 * offset text is passed in. Token colors only.
 */
function TimezoneRow({ timezone, label, offsetLabel, title = 'Time zone', variant = 'row', onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const zoneLabel = label ?? prettifyZone(timezone);
    if (variant === 'inline') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", style: [{ flexDirection: 'row', alignItems: 'center' }, style], children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF10", size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { marginLeft: tokens.spacing.xs, color: colors.muted, fontSize: tokens.typography.scale.sm }, children: offsetLabel ? `${zoneLabel} · ${offsetLabel}` : zoneLabel })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${title}: ${zoneLabel}${offsetLabel ? `, ${offsetLabel}` : ''}`, onPress: onPress, style: ({ pressed }) => [
            { flexDirection: 'row', alignItems: 'center', paddingVertical: tokens.spacing.sm, opacity: pressed ? 0.7 : 1 },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF10", size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { marginLeft: tokens.spacing.sm, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: zoneLabel }), offsetLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: offsetLabel })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { marginLeft: tokens.spacing.xs, color: colors.muted, fontSize: tokens.typography.scale.base }, children: "\u203A" })] }));
}
//# sourceMappingURL=TimezoneRow.js.map