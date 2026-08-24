"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingTimelineV3 = TrackingTimelineV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const internal_1 = require("./internal");
/**
 * TrackingTimeline, alternate design **V3** — a *compact horizontal step bar*.
 * The four lifecycle stages **picked → in-transit → out-for-delivery →
 * delivered** sit left-to-right as small nodes joined by connector segments
 * that fill with tone once passed; each stage's glyph sits in the node and its
 * word sits below, with the current stage bolded — glyph + word, never color
 * alone (each node carries a redundant a11y label). The current stage's event
 * time/detail is summarised in a caption underneath. An `exception` current
 * stage collapses to a danger strip. Empty/loading supported. No literal colors.
 */
function TrackingTimelineV3({ current, events, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading tracking", style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 24, width: '100%', borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[100] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] }));
    }
    const isException = current === 'exception';
    if (isException) {
        const meta = internal_1.TRACKING_META.exception;
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `${meta.label}: needs attention`, style: [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.sm,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, color_1.withAlpha)(colors.danger, 0.12),
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm, color: colors.danger }, children: meta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, fontWeight: '700', color: colors.danger }, children: meta.label })] }));
    }
    const currentIdx = (0, internal_1.trackingIndex)(current);
    const currentEvent = Array.isArray(events) ? events.find((e) => e.stage === current) : undefined;
    const caption = [currentEvent?.time, currentEvent?.detail].filter(Boolean).join(' · ');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start' }, children: internal_1.TRACKING_ORDER.map((stage, i) => {
                    const meta = internal_1.TRACKING_META[stage];
                    const tone = (0, internal_1.toneColor)(colors, meta.tone);
                    const reached = currentIdx >= 0 && i <= currentIdx;
                    const isCurrent = i === currentIdx;
                    const last = i === internal_1.TRACKING_ORDER.length - 1;
                    const connectorFilled = currentIdx >= 0 && i < currentIdx;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', width: '100%' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            flex: 1,
                                            height: 3,
                                            borderRadius: tokens.radius.full,
                                            backgroundColor: i === 0 ? 'transparent' : reached ? tone : colors.border,
                                        } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `${meta.label}: ${reached ? (isCurrent ? 'current' : 'done') : 'upcoming'}`, style: {
                                            width: 26,
                                            height: 26,
                                            borderRadius: tokens.radius.full,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: reached ? tone : 'transparent',
                                            borderWidth: reached ? 0 : 2,
                                            borderColor: isCurrent ? colors.primary : colors.border,
                                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, color: reached ? colors.surface : colors.muted }, children: reached ? (last ? '✓' : meta.glyph) : i + 1 }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            flex: 1,
                                            height: 3,
                                            borderRadius: tokens.radius.full,
                                            backgroundColor: last ? 'transparent' : connectorFilled ? tone : colors.border,
                                        } })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: {
                                    marginTop: tokens.spacing.xs,
                                    textAlign: 'center',
                                    fontSize: tokens.typography.scale.xs,
                                    fontWeight: isCurrent ? '700' : '500',
                                    color: reached ? colors.onSurface : colors.muted,
                                }, children: meta.label })] }, stage));
                }) }), caption ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: caption })) : null] }));
}
//# sourceMappingURL=TrackingTimelineV3.js.map