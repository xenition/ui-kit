"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeightTrackerV4 = WeightTrackerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const charts_1 = require("../charts");
const color_1 = require("../primitives/internal/color");
/** Per-status label / glyph / token color — a labelled chip, never color alone. */
const STATUS_META = {
    ideal: { label: 'Ideal weight', glyph: '✓', tone: 'success' },
    under: { label: 'Underweight', glyph: '▼', tone: 'warn' },
    over: { label: 'Overweight', glyph: '▲', tone: 'danger' },
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
 * WeightTracker — **V4** "companion" design (native parity of the web V4). The
 * warm, friendly take on a pet weight tracker: an elevated rounded card with a
 * soft shadow, a big legible current reading with its unit, a change delta (tone
 * follows the ideal range, not the sign — vets track both directions), a status
 * carried in a soft-tinted labelled chip with a glyph (never color alone), and the
 * charts {@link Sparkline} of recent history (kept token-fed and unchanged from
 * the base). Same props/behavior as {@link WeightTrackerProps}: `status` (ideal /
 * under / over) resolves from `idealRange` when omitted; renders an empty state
 * when there is no reading. Token-only colors via `useXenitionTheme()`.
 */
function WeightTrackerV4({ current, unit = 'kg', delta, history, idealRange, status, emptyLabel = 'No weight logged yet', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const safeHistory = history ?? [];
    const container = [
        {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            gap: tokens.spacing.md,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
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
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Weight ${current} ${unit}${statusMeta ? `, ${statusMeta.label}` : ''}`, style: container, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }, children: current }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base, marginBottom: tokens.spacing.xs }, children: unit })] }), statusMeta ? (
                    // Status as a soft-tinted labelled chip + glyph (never color alone).
                    (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            alignSelf: 'flex-start',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                            borderRadius: tokens.radius.full,
                            paddingVertical: 2,
                            paddingHorizontal: tokens.spacing.sm,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors[statusMeta.tone], fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: statusMeta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[statusMeta.tone], fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: statusMeta.label })] })) : null] }), delta != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: deltaColor, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [delta > 0 ? '▲ ' : delta < 0 ? '▼ ' : '', Math.abs(delta), " ", unit, " since last"] })) : null, idealRange ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Ideal range ", idealRange[0] ?? 0, "\u2013", idealRange[1] ?? 0, " ", unit] })) : null, safeHistory.length > 0 ? ((0, jsx_runtime_1.jsx)(charts_1.Sparkline, { data: safeHistory, color: trendColor, accessibilityLabel: `Weight trend over ${safeHistory.length} readings` })) : null] }));
}
//# sourceMappingURL=WeightTrackerV4.js.map