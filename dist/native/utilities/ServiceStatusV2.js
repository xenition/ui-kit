"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceStatusV2 = ServiceStatusV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * ServiceStatus, redesigned (v2): a **big status banner card**. A state-tinted
 * banner fills the top with a large service-glyph tile and an oversized state
 * headline (glyph + label) beside the utility line and location; the detail and
 * "updated" caption sit in a plain body below. Lifted with a shadow. Distinct at
 * a glance from v1's slim left-rail card and v3's inline chip. Same props; state
 * is glyph + label + a tint that traces to a `SemanticColors` slot (never color
 * alone); token-pure.
 */
function ServiceStatusV2({ kind, state, location, updated, detail, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const kd = (0, status_1.utilityKind)(kind);
    const sd = (0, status_1.serviceState)(state);
    const tint = sd.tone === 'neutral' ? colors.muted : colors[sd.tone];
    const hasBody = detail != null || updated != null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                borderRadius: tokens.radius.lg,
                backgroundColor: colors.surface,
                overflow: 'hidden',
                ...(0, elevation_1.shadow)('lg', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    padding: tokens.spacing.lg,
                    backgroundColor: (0, format_1.withAlpha)(tint, 0.12),
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 56,
                            height: 56,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, format_1.withAlpha)(tint, 0.18),
                        }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: kd.glyph, size: "2xl", accessibilityLabel: `${kd.label} service` }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: tint, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: `${sd.glyph} ${sd.label}` }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [kd.label, location != null ? ` · ${location}` : ''] })] })] }), hasBody ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.lg, gap: tokens.spacing.xs }, children: [detail != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: detail })) : null, updated != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Updated ", updated] })) : null] })) : null] }));
}
//# sourceMappingURL=ServiceStatusV2.js.map