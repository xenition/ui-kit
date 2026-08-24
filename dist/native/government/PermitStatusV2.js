"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermitStatusV2 = PermitStatusV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * PermitStatus, alternate design **V2** — a big **vertical timeline**. Each
 * happy-path stage (submitted → review → approved → issued) is its own row with
 * a numbered/checked marker joined by a connecting rail; done stages fill with
 * primary, the active stage rings, and upcoming stages stay muted. A `denied`
 * permit branches into a danger banner (`role="alert"`, glyph + text + color,
 * never color alone) above the rail. Same `PermitStatusProps`; drops in for
 * `PermitStatus`. Token-pure.
 */
function PermitStatusV2({ status, permitNumber, title, updatedDate, loading = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sd = (0, status_1.permitStatus)(status);
    const denied = status === 'denied';
    const stages = status_1.PERMIT_STAGES;
    const current = denied ? 1 : Math.min(sd.step, stages.length - 1);
    return ((0, jsx_runtime_1.jsxs)(primitives_2.Card, { variant: "elevated", style: style, children: [title != null || permitNumber != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginBottom: tokens.spacing.md, gap: 2 }, children: [title != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: title })) : null, permitNumber != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: permitNumber })) : null] })) : null, loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: "Loading permit status", style: { height: 120, borderRadius: tokens.radius.md, backgroundColor: (0, format_1.withAlpha)(colors.muted, 0.14) } })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [denied ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "alert", style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.sm,
                            padding: tokens.spacing.md,
                            marginBottom: tokens.spacing.md,
                            borderRadius: tokens.radius.md,
                            backgroundColor: (0, format_1.withAlpha)(colors.danger, 0.12),
                            borderWidth: 1,
                            borderColor: colors.danger,
                        }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: sd.glyph, color: "danger", accessibilityLabel: "Denied" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.danger, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: "Permit denied" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs }, children: "Review the notice and re-apply or appeal." })] })] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { children: stages.map((stage, i) => {
                            const desc = status_1.PERMIT_STATUS[stage] ?? status_1.PERMIT_STATUS.submitted;
                            const done = i < current;
                            const active = i === current && !denied;
                            const last = i === stages.length - 1;
                            const markerBg = done ? colors.primary : active ? (0, format_1.withAlpha)(colors.primary, 0.16) : (0, format_1.withAlpha)(colors.muted, 0.12);
                            const markerBorder = done || active ? colors.primary : (0, format_1.withAlpha)(colors.muted, 0.3);
                            const labelColor = done || active ? colors.onSurface : colors.muted;
                            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', width: 32 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: tokens.radius.full,
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: markerBg,
                                                    borderWidth: 2,
                                                    borderColor: markerBorder,
                                                }, children: done ? ((0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: "\u2713", size: "sm", color: "onPrimary", accessibilityLabel: "Done" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                        color: active ? colors.primary : colors.muted,
                                                        fontSize: tokens.typography.scale.sm,
                                                        fontWeight: '700',
                                                    }, children: i + 1 })) }), !last ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                                    width: 2,
                                                    flex: 1,
                                                    minHeight: 20,
                                                    backgroundColor: done ? colors.primary : (0, format_1.withAlpha)(colors.muted, 0.25),
                                                } })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, paddingBottom: last ? 0 : tokens.spacing.md, gap: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: labelColor, fontSize: tokens.typography.scale.base, fontWeight: active ? '800' : '600' }, children: [desc.glyph, " ", desc.label] }), active ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Current stage" })) : null] })] }, stage));
                        }) })] })), updatedDate != null && !loading ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { marginTop: tokens.spacing.md, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `${sd.glyph} ${sd.label} · updated ${updatedDate}` })) : null] }));
}
//# sourceMappingURL=PermitStatusV2.js.map