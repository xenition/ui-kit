"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleRow = ScheduleRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * A schedule / timer row — a clock glyph, the time (emphasized), a label, and a
 * row of weekday chips, closed by an enable {@link Switch}. Disabled schedules
 * dim to `muted`; the enabled state is carried by the switch's `checked` a11y
 * state (not color). `days` is mapped defensively (nothing renders when empty),
 * and a hairline divider separates rows unless `last`. Token-bound throughout.
 */
function ScheduleRow({ label, time, days, icon = '⏰', enabled = false, onToggle, last = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const dayList = Array.isArray(days) ? days.filter((d) => d != null && d !== '') : [];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                borderBottomWidth: last ? 0 : 1,
                borderBottomColor: colors.border,
                opacity: enabled ? 1 : 0.7,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, color: enabled ? 'primary' : 'muted', size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [time != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', fontFamily: tokens.typography.fontHeading }, children: time })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }, children: label })] }), dayList.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 4 }, children: dayList.map((day, i) => ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", variant: "soft", size: "sm", children: day }, `${day}-${i}`))) })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: enabled, onCheckedChange: onToggle, accessibilityLabel: `${label} schedule` })] }));
}
//# sourceMappingURL=ScheduleRow.js.map