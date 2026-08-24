"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeightTracker = WeightTracker;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const charts_1 = require("../charts");
const STATUS_META = {
    ideal: { label: 'Ideal weight', tone: 'success' },
    under: { label: 'Underweight', tone: 'warn' },
    over: { label: 'Overweight', tone: 'danger' },
};
function classify(current, range) {
    if (!range)
        return undefined;
    const min = range[0] ?? 0;
    const max = range[1] ?? 0;
    if (current < min)
        return 'under';
    if (current > max)
        return 'over';
    return 'ideal';
}
/**
 * A pet weight tracker: the current reading with unit, a change delta (down is
 * neutral-good here — vets track both directions, so the delta tone follows the
 * ideal range, not the sign), a status chip vs. the ideal band, and a
 * {@link Sparkline} of recent history. Renders an empty state when there is no
 * reading. Status reads via a labelled chip (not color alone). Token-only colors.
 */
function WeightTracker({ current, unit = 'kg', delta, history, idealRange, status, emptyLabel = 'No weight logged yet', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const safeHistory = history ?? [];
    const container = [
        {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            gap: tokens.spacing.md,
        },
        style,
    ];
    if (current == null || Number.isNaN(current)) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: emptyLabel, style: container, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', paddingVertical: tokens.spacing.lg, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: "\u2696\uFE0F" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })] }) }));
    }
    const resolvedStatus = status ?? classify(current, idealRange);
    const statusMeta = resolvedStatus ? STATUS_META[resolvedStatus] : undefined;
    const trendColor = statusMeta?.tone ?? 'primary';
    const deltaColor = delta == null || delta === 0 ? colors.muted : colors.onSurface;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Weight ${current} ${unit}${statusMeta ? `, ${statusMeta.label}` : ''}`, style: container, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }, children: current }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base, marginBottom: tokens.spacing.xs }, children: unit })] }), statusMeta ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            alignSelf: 'flex-start',
                            backgroundColor: 'transparent',
                            borderColor: colors[statusMeta.tone],
                            borderWidth: 1,
                            borderRadius: tokens.radius.full,
                            paddingVertical: 2,
                            paddingHorizontal: tokens.spacing.sm,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[statusMeta.tone], fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: statusMeta.label }) })) : null] }), delta != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: deltaColor, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [delta > 0 ? '▲ ' : delta < 0 ? '▼ ' : '', Math.abs(delta), " ", unit, " since last"] })) : null, idealRange ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Ideal range ", idealRange[0] ?? 0, "\u2013", idealRange[1] ?? 0, " ", unit] })) : null, safeHistory.length > 0 ? ((0, jsx_runtime_1.jsx)(charts_1.Sparkline, { data: safeHistory, color: trendColor, accessibilityLabel: `Weight trend over ${safeHistory.length} readings` })) : null] }));
}
//# sourceMappingURL=WeightTracker.js.map