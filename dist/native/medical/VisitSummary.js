"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitSummary = VisitSummary;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A visit / encounter summary card: title, provider + date, a highlighted
 * diagnosis chip, and any number of structured note sections (assessment, plan,
 * instructions). Renders loading and empty states. Informational UI only — not
 * a medical device. Token-only colors.
 */
function VisitSummary({ title, provider, date, diagnosis, sections, loading = false, emptyLabel = 'No visit notes available', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const list = sections ?? [];
    const meta = [provider, date].filter(Boolean);
    const shell = (children, label) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: label, style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
            },
            style,
        ], children: children }));
    if (loading) {
        return shell((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 16, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '80%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '70%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] }), 'Loading visit summary');
    }
    return shell((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 3 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: title }), meta.length ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: meta.join('  ·  ') })) : null] }), diagnosis ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    alignSelf: 'flex-start',
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.md,
                    borderRadius: tokens.radius.full,
                    backgroundColor: tokens.ramps.primary[100],
                }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: ["\uD83E\uDE7A ", diagnosis] }) })) : null, list.length === 0 && !diagnosis ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })) : (list.map((s, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }, children: s.heading }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: s.body })] }, `${s.heading}-${i}`))))] }), `Visit summary: ${title}`);
}
//# sourceMappingURL=VisitSummary.js.map