"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitSummaryV4 = VisitSummaryV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const GradientSurface_1 = require("./internal/GradientSurface");
const clinic_1 = require("./internal/clinic");
/**
 * VisitSummary — **V4** "clinic" design (native twin of the web V4). The calm,
 * clinical take on a visit / encounter summary, and the ONE reserved gradient
 * moment of the medical V4 "clinic" line: the header (visit title, provider,
 * visit date) rides a rounded, overflow-hidden `GradientSurface` on the brand
 * gradient (`clinicGradient`) in near-white ink (`clinicInk`/`clinicInkSoft`),
 * with the diagnosis carried as a frosted glass chip (`clinicTile` +
 * `clinicBorder`). The body — the structured note sections — stays on the plain
 * surface with clear labelled rows. Renders loading and empty states. Identical
 * props/behavior to {@link VisitSummaryProps}. Token-only colors via
 * `useXenitionTheme()` + the clinic ramp helpers, dark-mode safe. Informational
 * UI only — not a medical device.
 */
function VisitSummaryV4({ title, provider, date, diagnosis, sections, loading = false, emptyLabel = 'No visit notes available', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, clinic_1.clinicInk)(r);
    const inkSoft = (0, clinic_1.clinicInkSoft)(r);
    const list = sections ?? [];
    const meta = [provider, date].filter(Boolean);
    const shell = (children, label) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: label, style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
            },
            style,
        ], children: children }));
    // Reserved gradient moment: the visit-summary hero header.
    const header = (children) => ((0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, clinic_1.clinicGradient)(r), style: { padding: tokens.spacing.lg, gap: tokens.spacing.sm }, children: children }));
    if (loading) {
        return shell((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [header((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 16, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: (0, clinic_1.clinicTile)(r, 0.28) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: (0, clinic_1.clinicTile)(r, 0.22) } })] })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.lg, gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '80%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '65%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] })] }), 'Loading visit summary');
    }
    return shell((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [header((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 3 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: title }), meta.length ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm }, children: meta.join('  ·  ') })) : null] }), diagnosis ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs,
                            alignSelf: 'flex-start',
                            paddingVertical: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.md,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, clinic_1.clinicTile)(r),
                            borderWidth: 1,
                            borderColor: (0, clinic_1.clinicBorder)(r),
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: "\uD83E\uDE7A" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: diagnosis })] })) : null] })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: tokens.spacing.lg, gap: tokens.spacing.md }, children: list.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })) : (list.map((s, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }, children: s.heading }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: s.body })] }, `${s.heading}-${i}`)))) })] }), `Visit summary: ${title}`);
}
//# sourceMappingURL=VisitSummaryV4.js.map