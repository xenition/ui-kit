"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceStatusV3 = ServiceStatusV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const status_1 = require("./internal/status");
/**
 * ServiceStatus, redesigned (v3): a **compact inline chip line**. A state dot +
 * utility glyph lead, the line label and a soft state badge sit together, and the
 * location / "updated" caption trails muted on the right — a single scannable row
 * with no card. Distinct at a glance from v1's rail card and v2's banner. Same
 * props; state is dot + glyph + label (never color alone); token-pure.
 */
function ServiceStatusV3({ kind, state, location, updated, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const kd = (0, status_1.utilityKind)(kind);
    const sd = (0, status_1.serviceState)(state);
    const tint = sd.tone === 'neutral' ? colors.muted : colors[sd.tone];
    const trailing = [location, updated != null ? `Updated ${updated}` : undefined]
        .filter((s) => s != null)
        .join(' · ');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: tint } }), (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: kd.glyph, size: "sm", accessibilityLabel: `${kd.label} service` }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: kd.label }), (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` }), trailing !== '' ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, flexShrink: 1 }, children: trailing })] })) : null] }));
}
//# sourceMappingURL=ServiceStatusV3.js.map