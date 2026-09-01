"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeOfUseSchedule = TimeOfUseSchedule;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const PERIOD_LABEL = {
    'off-peak': 'Off-peak',
    'mid-peak': 'Mid-peak',
    'on-peak': 'On-peak',
};
const PERIOD_ORDER = ['off-peak', 'mid-peak', 'on-peak'];
const TICKS = [0, 6, 12, 18, 24];
/**
 * A clean-card time-of-use day bar. A 24-hour horizontal track is split into
 * rate blocks, each segment sized by its share of the day and colored by rate
 * period — off-peak → `success`, mid-peak → `warn`, on-peak → `danger` — so the
 * color is meaningful, not decorative. A thin `onSurface` "now" marker locates
 * the current hour, hour ticks anchor the axis, and a legend names each period
 * present with its dot + tone. Purely presentational; every color traces to a
 * token.
 */
function TimeOfUseSchedule({ title = 'Time of use', blocks, nowHour, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const periodColor = (p) => {
        const base = p === 'off-peak' ? colors.success : p === 'mid-peak' ? colors.warn : colors.danger;
        return (0, format_1.withAlpha)(base, 0.85);
    };
    const card = {
        backgroundColor: colors.card,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.1,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
    };
    const present = PERIOD_ORDER.filter((p) => blocks.some((b) => b.period === p));
    const nowPct = nowHour != null ? (0, format_1.clamp)(nowHour, 0, 24) / 24 : null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: title, style: [card, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                            flexDirection: 'row',
                            height: 16,
                            borderRadius: tokens.radius.full,
                            overflow: 'hidden',
                            backgroundColor: colors.muted,
                        }, children: blocks.map((b, i) => {
                            const span = (0, format_1.clamp)(b.endHour - b.startHour, 0, 24);
                            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: span, backgroundColor: periodColor(b.period) } }, `${b.period}-${b.startHour}-${i}`));
                        }) }), nowPct != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                            position: 'absolute',
                            left: `${nowPct * 100}%`,
                            top: 0,
                            width: 2,
                            height: 16,
                            backgroundColor: colors.onSurface,
                        } })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', marginTop: tokens.spacing.xs }, children: TICKS.map((t) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: t }, t))) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md, marginTop: tokens.spacing.md }, children: present.map((p) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: 10,
                                height: 10,
                                borderRadius: tokens.radius.full,
                                backgroundColor: periodColor(p),
                            } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: PERIOD_LABEL[p] })] }, p))) })] }));
}
//# sourceMappingURL=TimeOfUseSchedule.js.map