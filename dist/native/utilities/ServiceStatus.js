"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceStatus = ServiceStatus;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * A status card for one service connection. The `state` (active/outage/
 * maintenance/degraded) is conveyed by **glyph + label + a tint that traces to a
 * `SemanticColors` slot** (active → success, outage → danger) — never color
 * alone. A left rail tinted to the state's tone reinforces it without carrying
 * the signal by itself. Purely presentational; every color traces to a token.
 */
function ServiceStatus({ kind, state, location, updated, detail, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const kd = (0, status_1.utilityKind)(kind);
    const sd = (0, status_1.serviceState)(state);
    const tint = sd.tone === 'neutral' ? colors.muted : colors[sd.tone];
    return ((0, jsx_runtime_1.jsxs)(primitives_2.Card, { variant: "outlined", style: [{ flexDirection: 'row', alignItems: 'stretch', gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 4,
                    borderRadius: tokens.radius.full,
                    backgroundColor: tint,
                } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: 40,
                                    height: 40,
                                    borderRadius: tokens.radius.md,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: (0, format_1.withAlpha)(tint, 0.14),
                                }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: kd.glyph, size: "lg", accessibilityLabel: `${kd.label} service` }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: kd.label }), location != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: location })) : null] }), (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: sd.tone, variant: "soft", children: `${sd.glyph} ${sd.label}` })] }), detail != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { marginTop: tokens.spacing.sm, color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: detail })) : null, updated != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { marginTop: tokens.spacing.xs, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Updated ", updated] })) : null] })] }));
}
//# sourceMappingURL=ServiceStatus.js.map