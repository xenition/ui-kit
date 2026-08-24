"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingTimelineV2 = TrackingTimelineV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const internal_1 = require("./internal");
/**
 * TrackingTimeline, alternate design **V2** — a *big vertical rail*. Larger
 * (32px) tone-filled nodes over a thick connector, with each stage's event
 * (time + detail) rendered inside its own tinted card beside the node so the
 * lifecycle **picked → in-transit → out-for-delivery → delivered** reads like a
 * courier tracking screen. Reached stages fill and carry a `✓`/glyph, current
 * is ringed and bold, upcoming are muted — always glyph + word, never color
 * alone (each node carries a redundant a11y label). An `exception` current
 * stage surfaces a danger head card. Empty/loading supported. No literal colors.
 */
function TrackingTimelineV2({ current, events, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading tracking", style: [{ gap: tokens.spacing.lg }, style], children: [0, 1, 2, 3].map((i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 32, height: 32, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 40, flex: 1, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] } })] }, i))) }));
    }
    const isException = current === 'exception';
    const currentIdx = isException ? -1 : (0, internal_1.trackingIndex)(current);
    const eventFor = (stage) => Array.isArray(events) ? events.find((e) => e.stage === stage) : undefined;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flexDirection: 'column' }, style], children: [isException ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `${internal_1.TRACKING_META.exception.label}: needs attention`, style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    padding: tokens.spacing.md,
                    marginBottom: tokens.spacing.md,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, color_1.withAlpha)(colors.danger, 0.12),
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 32,
                            height: 32,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.danger,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm, color: colors.onDanger }, children: internal_1.TRACKING_META.exception.glyph }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base, fontWeight: '700', color: colors.danger }, children: internal_1.TRACKING_META.exception.label })] })) : null, internal_1.TRACKING_ORDER.map((stage, i) => {
                const meta = internal_1.TRACKING_META[stage];
                const tone = (0, internal_1.toneColor)(colors, meta.tone);
                const reached = currentIdx >= 0 && i <= currentIdx;
                const isCurrent = i === currentIdx;
                const last = i === internal_1.TRACKING_ORDER.length - 1;
                const ev = eventFor(stage);
                const connectorFilled = currentIdx >= 0 && i < currentIdx;
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `${meta.label}: ${reached ? (isCurrent ? 'current' : 'done') : 'upcoming'}`, style: { flexDirection: 'row', gap: tokens.spacing.md, paddingBottom: last ? 0 : tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        width: 32,
                                        height: 32,
                                        borderRadius: tokens.radius.full,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: reached ? tone : 'transparent',
                                        borderWidth: reached ? 0 : 2,
                                        borderColor: isCurrent ? colors.primary : colors.border,
                                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm, color: reached ? colors.surface : colors.muted }, children: reached ? (last ? '✓' : meta.glyph) : i + 1 }) }), !last ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        width: 3,
                                        flex: 1,
                                        marginTop: 2,
                                        minHeight: tokens.spacing.lg,
                                        borderRadius: tokens.radius.full,
                                        backgroundColor: connectorFilled ? tone : colors.border,
                                    } })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                flex: 1,
                                minWidth: 0,
                                marginBottom: tokens.spacing.xs,
                                padding: tokens.spacing.sm,
                                borderRadius: tokens.radius.md,
                                backgroundColor: reached ? (0, color_1.withAlpha)(tone, 0.08) : tokens.ramps.neutral[100],
                            }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                fontSize: tokens.typography.scale.sm,
                                                fontWeight: isCurrent ? '700' : '600',
                                                color: reached ? colors.onSurface : colors.muted,
                                            }, children: meta.label }), ev?.time ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: ev.time })) : null] }), ev?.detail ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { fontSize: tokens.typography.scale.xs, color: colors.muted, marginTop: 2 }, children: ev.detail })) : null] })] }, stage));
            })] }));
}
//# sourceMappingURL=TrackingTimelineV2.js.map