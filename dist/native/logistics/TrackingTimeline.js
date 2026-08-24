"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingTimeline = TrackingTimeline;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
/**
 * Vertical delivery tracking rail over the canonical stages
 * **picked → in-transit → out-for-delivery → delivered**. Reached stages fill
 * with their tone token and are marked with a `✓`/glyph; the current stage is
 * ringed; upcoming stages are muted. Status is carried by glyph + stage word
 * (and a redundant `accessibilityLabel` per node), never color alone. An
 * `exception` current stage recolors the reached head to danger. Empty/loading
 * states supported. No literal colors.
 */
function TrackingTimeline({ current, events, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading tracking", style: [{ gap: tokens.spacing.md }, style], children: [0, 1, 2, 3].map((i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 14, height: 14, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, flex: 1, borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] }, i))) }));
    }
    const isException = current === 'exception';
    const currentIdx = isException ? -1 : (0, internal_1.trackingIndex)(current);
    const eventFor = (stage) => Array.isArray(events) ? events.find((e) => e.stage === stage) : undefined;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flexDirection: 'column' }, style], children: [isException ? ((0, jsx_runtime_1.jsx)(ExceptionHead, {})) : null, internal_1.TRACKING_ORDER.map((stage, i) => {
                const meta = internal_1.TRACKING_META[stage];
                const reached = currentIdx >= 0 && i <= currentIdx;
                const isCurrent = i === currentIdx;
                const last = i === internal_1.TRACKING_ORDER.length - 1;
                const dotColor = reached ? (0, internal_1.toneColor)(colors, meta.tone) : colors.border;
                const ev = eventFor(stage);
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `${meta.label}: ${reached ? (isCurrent ? 'current' : 'done') : 'upcoming'}`, style: { flexDirection: 'row', gap: tokens.spacing.md, paddingBottom: last ? 0 : tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        width: 22,
                                        height: 22,
                                        borderRadius: tokens.radius.full,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: reached ? dotColor : 'transparent',
                                        borderWidth: reached ? 0 : 2,
                                        borderColor: isCurrent ? colors.primary : colors.border,
                                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, color: reached ? colors.surface : colors.muted }, children: reached ? (last ? '✓' : meta.glyph) : i + 1 }) }), !last ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        width: 2,
                                        flex: 1,
                                        marginTop: 2,
                                        backgroundColor: currentIdx >= 0 && i < currentIdx ? (0, internal_1.toneColor)(colors, meta.tone) : colors.border,
                                    } })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, paddingBottom: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                fontSize: tokens.typography.scale.sm,
                                                fontWeight: isCurrent ? '700' : '600',
                                                color: reached ? colors.onSurface : colors.muted,
                                            }, children: meta.label }), ev?.time ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: ev.time })) : null] }), ev?.detail ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: ev.detail })) : null] })] }, stage));
            })] }));
    function ExceptionHead() {
        const meta = internal_1.TRACKING_META.exception;
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `${meta.label}: needs attention`, style: { flexDirection: 'row', gap: tokens.spacing.md, paddingBottom: tokens.spacing.lg, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 22,
                        height: 22,
                        borderRadius: tokens.radius.full,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.danger,
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, color: colors.onDanger }, children: meta.glyph }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, fontWeight: '700', color: colors.danger }, children: meta.label })] }));
    }
}
//# sourceMappingURL=TrackingTimeline.js.map