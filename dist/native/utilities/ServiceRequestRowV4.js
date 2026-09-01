"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRequestRowV4 = ServiceRequestRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const status_1 = require("./internal/status");
const GradientSurface_1 = require("./internal/GradientSurface");
const brand_1 = require("./internal/brand");
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
 * ServiceRequestRow — **V4** design. An elevated row: the kind glyph in the
 * signature brand-gradient disc, a title/number stack, an optional date, and a
 * status `Badge`. The lifecycle state stays conveyed redundantly by glyph +
 * label + a color that traces to a semantic slot (completed → success,
 * cancelled → neutral) via `requestState` — never color-alone; a `high` priority
 * adds an explicit "Urgent" tag. Becomes a button only when `onPress` is
 * supplied. Same props as {@link ServiceRequestRowProps}; token-only colors.
 */
function ServiceRequestRowV4({ requestNumber, title, status, kind = 'other', date, priority = 'normal', onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const sd = (0, status_1.requestState)(status);
    const glyph = KIND_GLYPH[kind] ?? KIND_GLYPH.other;
    const card = {
        backgroundColor: colors.card,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.1,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
    };
    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            card,
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, brand_1.brandDisc)(r), style: { width: 44, height: 44, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: glyph, accessibilityLabel: `${kind} request`, style: { color: (0, brand_1.brandInk)(r) } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: requestNumber }), date != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: ["\u00B7 ", date] })) : null, priority === 'high' ? ((0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: "danger", variant: "soft", size: "sm", children: '! Urgent' })) : null] })] }), (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` })] }));
    if (!onPress)
        return row;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Request ${requestNumber}, ${title}, ${sd.label}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: row }));
}
//# sourceMappingURL=ServiceRequestRowV4.js.map