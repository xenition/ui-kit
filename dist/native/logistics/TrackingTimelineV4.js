"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingTimelineV4 = TrackingTimelineV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const GradientSurface_1 = require("./internal/GradientSurface");
const dispatch_1 = require("./internal/dispatch");
const internal_1 = require("./internal");
/**
 * TrackingTimeline — **V4** "dispatch" design (native twin of the web V4), and
 * the ONE reserved gradient moment of the logistics V4 "dispatch" line: the
 * header (current stage glyph + word, and a frosted "N of 4" progress chip) rides
 * a rounded, overflow-hidden `GradientSurface` on the brand gradient
 * (`dispatchGradient`) in near-white ink (`dispatchInk` / `dispatchInkSoft`). The
 * body — the canonical **picked → in-transit → out-for-delivery → delivered**
 * rail — stays on the plain surface: reached stages fill with their tone token +
 * a glyph, the current stage is ringed, upcoming stages are muted. Status is
 * carried by glyph + stage word (+ a redundant per-node `accessibilityLabel`),
 * never color alone; an `exception` current stage flags the hero with a danger
 * word. Empty/loading states supported. Token-only colors via
 * `useXenitionTheme()` + the dispatch ramp helpers, dark-mode safe.
 */
function TrackingTimelineV4({ current, events, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, dispatch_1.dispatchInk)(r);
    const inkSoft = (0, dispatch_1.dispatchInkSoft)(r);
    const shell = {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        overflow: 'hidden',
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading tracking", style: [shell, style], children: [(0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, dispatch_1.dispatchGradient)(r), style: { padding: tokens.spacing.lg, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 16, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: (0, dispatch_1.dispatchTile)(r, 0.28) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '33%', borderRadius: tokens.radius.sm, backgroundColor: (0, dispatch_1.dispatchTile)(r, 0.22) } })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: tokens.spacing.lg, gap: tokens.spacing.md }, children: [0, 1, 2, 3].map((i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 22, height: 22, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[100] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, flex: 1, borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] }, i))) })] }));
    }
    const isException = current === 'exception';
    const currentIdx = isException ? -1 : (0, internal_1.trackingIndex)(current);
    const headMeta = internal_1.TRACKING_META[current] ?? internal_1.TRACKING_META.picked;
    const reachedCount = isException ? 0 : currentIdx + 1;
    const eventFor = (stage) => Array.isArray(events) ? events.find((e) => e.stage === stage) : undefined;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Tracking: ${headMeta.label}`, style: [shell, style], children: [(0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, dispatch_1.dispatchGradient)(r), style: { padding: tokens.spacing.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 }, children: "Tracking" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: ink, fontSize: tokens.typography.scale.xl }, children: headMeta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: headMeta.label })] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingHorizontal: tokens.spacing.md, paddingVertical: tokens.spacing.xs, borderRadius: tokens.radius.full, backgroundColor: (0, dispatch_1.dispatchTile)(r), borderWidth: 1, borderColor: (0, dispatch_1.dispatchBorder)(r) }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700', fontVariant: ['tabular-nums'] }, children: isException ? '⚠ Exception' : `${reachedCount} of ${internal_1.TRACKING_ORDER.length}` }) })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: tokens.spacing.lg }, children: internal_1.TRACKING_ORDER.map((stage, i) => {
                    const meta = internal_1.TRACKING_META[stage];
                    const reached = currentIdx >= 0 && i <= currentIdx;
                    const isCurrent = i === currentIdx;
                    const last = i === internal_1.TRACKING_ORDER.length - 1;
                    const dotColor = reached ? (0, internal_1.toneColor)(colors, meta.tone) : colors.border;
                    const ev = eventFor(stage);
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `${meta.label}: ${reached ? (isCurrent ? 'current' : 'done') : 'upcoming'}`, style: { flexDirection: 'row', gap: tokens.spacing.md, paddingBottom: last ? 0 : tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 22, height: 22, borderRadius: tokens.radius.full, alignItems: 'center', justifyContent: 'center', backgroundColor: reached ? dotColor : 'transparent', borderWidth: reached ? 0 : 2, borderColor: isCurrent ? colors.primary : colors.border }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xs, color: reached ? colors.surface : colors.muted }, children: reached ? (last ? '✓' : meta.glyph) : i + 1 }) }), !last ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 2, flex: 1, marginTop: 2, backgroundColor: currentIdx >= 0 && i < currentIdx ? (0, internal_1.toneColor)(colors, meta.tone) : colors.border } })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, paddingBottom: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, fontWeight: isCurrent ? '700' : '600', color: reached ? colors.onSurface : colors.muted }, children: meta.label }), ev?.time ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xs, color: colors.muted, fontVariant: ['tabular-nums'] }, children: ev.time }) : null] }), ev?.detail ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { fontSize: tokens.typography.scale.xs, color: colors.muted }, children: ev.detail }) : null] })] }, stage));
                }) })] }));
}
//# sourceMappingURL=TrackingTimelineV4.js.map