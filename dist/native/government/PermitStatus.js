"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermitStatus = PermitStatus;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * A permit / license application status tracker. Renders the ordered happy-path
 * stages (submitted → review → approved → issued) via the `Steps` primitive; a
 * `denied` permit branches into a danger banner conveyed by **glyph + text +
 * color** (never color alone). Guarded against unknown statuses. Every color
 * traces to a `SemanticColors` slot or a token-derived tint — no literals.
 */
function PermitStatus({ status, permitNumber, title, updatedDate, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sd = (0, status_1.permitStatus)(status);
    const denied = status === 'denied';
    const steps = status_1.PERMIT_STAGES.map((stage) => ({ title: status_1.PERMIT_STATUS[stage].label }));
    // Clamp the active index into the stage list; `issued` (step 3) is the last.
    const current = denied ? 1 : Math.min(sd.step, steps.length - 1);
    return ((0, jsx_runtime_1.jsxs)(primitives_2.Card, { variant: "elevated", style: style, children: [title != null || permitNumber != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginBottom: tokens.spacing.md, gap: 2 }, children: [title != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title })) : null, permitNumber != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: permitNumber })) : null] })) : null, loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: "Loading permit status", style: {
                    height: 48,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, format_1.withAlpha)(colors.muted, 0.14),
                } })) : denied ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "alert", style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    padding: tokens.spacing.md,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, format_1.withAlpha)(colors.danger, 0.12),
                    borderWidth: 1,
                    borderColor: colors.danger,
                }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: sd.glyph, color: "danger", accessibilityLabel: "Denied" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: "Permit denied" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs }, children: "Review the notice and re-apply or appeal." })] })] })) : ((0, jsx_runtime_1.jsx)(primitives_2.Steps, { steps: steps, current: current })), updatedDate != null && !loading ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { marginTop: tokens.spacing.md, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `${sd.glyph} ${sd.label} · updated ${updatedDate}` })) : null] }));
}
//# sourceMappingURL=PermitStatus.js.map