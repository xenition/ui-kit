"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleRowV4 = ScheduleRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * ScheduleRow — **V4** "ambient" design. The control-panel take on a schedule
 * row: an **enabled schedule glows** — when on the row takes a soft
 * `primary`-tinted wash, a primary border, and a glowing clock disc; disabled
 * schedules stay calm and muted. The **time reads big and legible**, active
 * weekday pills carry a soft-`primary` tint, and the scene / action label sits
 * alongside. The enable state is carried by the {@link Switch}'s `checked` a11y
 * state (not color alone). Same props/behavior as {@link ScheduleRowProps};
 * token-only colors via `useXenitionTheme()`.
 */
function ScheduleRowV4({ label, time, days, icon = '⏰', enabled = false, onToggle, last = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const dayList = Array.isArray(days) ? days.filter((d) => d != null && d !== '') : [];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                padding: tokens.spacing.md,
                marginBottom: last ? 0 : tokens.spacing.sm,
                opacity: enabled ? 1 : 0.7,
                backgroundColor: enabled ? (0, color_1.withAlpha)(colors.primary, 0.08) : colors.card,
                borderColor: enabled ? (0, color_1.withAlpha)(colors.primary, 0.5) : colors.border,
                ...(enabled
                    ? { shadowColor: colors.primary, shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 }
                    : {}),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: enabled ? (0, color_1.withAlpha)(colors.primary, 0.16) : (0, color_1.withAlpha)(colors.onSurface, 0.05),
                    borderWidth: 1,
                    borderColor: enabled ? (0, color_1.withAlpha)(colors.primary, 0.4) : colors.border,
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, color: enabled ? 'primary' : 'muted', size: "lg" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [time != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700', fontFamily: tokens.typography.fontHeading }, children: time })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }, children: label })] }), dayList.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: 4 }, children: dayList.map((day, i) => ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: enabled ? 'primary' : 'neutral', variant: "soft", size: "sm", children: day }, `${day}-${i}`))) })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Switch, { checked: enabled, onCheckedChange: onToggle, accessibilityLabel: `${label} schedule` })] }));
}
//# sourceMappingURL=ScheduleRowV4.js.map