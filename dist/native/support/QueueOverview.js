"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueOverview = QueueOverview;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
// Tone → SemanticColors slot for the big value numeral. Token-only (no hex).
const VALUE_SLOT = {
    primary: 'primaryText',
    success: 'successText',
    warn: 'warnText',
    danger: 'dangerText',
    muted: 'onSurface',
};
/**
 * QueueOverview — **V4** "calm console" dashboard strip. A responsive
 * row of elevated stat tiles giving a helpdesk queue its at-a-glance vitals
 * ("Open", "Waiting", "Breached SLA", "CSAT"). Each tile is a big value numeral
 * with a muted caption and an optional signed delta colored by sign (▲ up /
 * ▼ down). One accent = primary; other tones swap in a semantic accent. Tiles
 * wrap onto new rows on narrow widths. Presentational only — shaped data in, no
 * fetching. Token-only colors via `useXenitionTheme()`; NO gradients.
 * Dark-mode safe.
 */
function QueueOverview({ stats, title, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: title ?? 'Queue overview', style: [{ gap: tokens.spacing.md }, style], children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                }, children: title })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md }, children: stats.map((stat, i) => {
                    const tone = stat.tone ?? 'primary';
                    const valueColor = colors[VALUE_SLOT[tone] ?? 'primaryText'];
                    const hasDelta = typeof stat.delta === 'number' && Number.isFinite(stat.delta);
                    const up = hasDelta && stat.delta > 0;
                    const down = hasDelta && stat.delta < 0;
                    const deltaText = hasDelta
                        ? `${up ? '▲' : down ? '▼' : ''} ${Math.abs(stat.delta)}`.trim()
                        : null;
                    const deltaColor = up ? colors.successText : down ? colors.dangerText : colors.muted;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${stat.label}: ${String(stat.value)}${deltaText ? `, change ${up ? 'up' : 'down'} ${Math.abs(stat.delta)}` : ''}`, style: {
                            flexGrow: 1,
                            flexBasis: 140,
                            minWidth: 140,
                            gap: 4,
                            padding: tokens.spacing.md,
                            borderRadius: tokens.radius.lg,
                            borderWidth: 1,
                            borderColor: colors.border,
                            backgroundColor: tone === 'primary' ? (0, internal_1.withAlpha)(colors.primary, 0.12) : colors.card,
                            shadowColor: colors.onSurface,
                            shadowOpacity: 0.06,
                            shadowRadius: 8,
                            shadowOffset: { width: 0, height: 3 },
                            elevation: 2,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: valueColor, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: String(stat.value) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500' }, children: stat.label }), deltaText ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: deltaColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: deltaText })) : null] }, `${stat.label}-${i}`));
                }) })] }));
}
//# sourceMappingURL=QueueOverview.js.map