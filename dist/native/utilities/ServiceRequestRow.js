"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRequestRow = ServiceRequestRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
const KIND_GLYPH = {
    repair: '🔧',
    connect: '🔌',
    disconnect: '⛔',
    transfer: '📦',
    inspection: '🔍',
    meter: '📟',
    other: '📋',
};
/**
 * One line in a service-request / work-order list: a tinted kind glyph disc, a
 * title/number stack, an optional date, and a status pill. The state is conveyed
 * redundantly (glyph + label + a color that traces to a `SemanticColors` slot:
 * completed → success, cancelled → neutral) so it is never color-alone; a `high`
 * priority adds an explicit "Urgent" tag rather than relying on color. Becomes a
 * button only when `onPress` is supplied.
 */
function ServiceRequestRow({ requestNumber, title, status, kind = 'other', date, priority = 'normal', onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sd = (0, status_1.requestState)(status);
    const tint = sd.tone === 'neutral' ? colors.muted : colors[sd.tone];
    const glyph = KIND_GLYPH[kind] ?? KIND_GLYPH.other;
    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 40,
                    height: 40,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, format_1.withAlpha)(tint, 0.14),
                }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: glyph, accessibilityLabel: `${kind} request` }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: requestNumber }), date != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u00B7 ", date] })) : null, priority === 'high' ? ((0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: "danger", variant: "soft", size: "sm", children: '! Urgent' })) : null] })] }), (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` })] }));
    if (!onPress)
        return row;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Request ${requestNumber}, ${title}, ${sd.label}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: row }));
}
//# sourceMappingURL=ServiceRequestRow.js.map