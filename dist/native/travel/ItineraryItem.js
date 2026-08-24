"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItineraryItem = ItineraryItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const KIND_GLYPH = {
    flight: '✈',
    hotel: '🏨',
    activity: '🎟',
    transfer: '🚕',
    meal: '🍽',
};
const STATUS_SLOT = {
    upcoming: 'muted',
    active: 'primary',
    done: 'success',
};
/**
 * One entry in a day-by-day trip timeline — a leading kind glyph on a token
 * rail, a time, a title, and an optional detail line. `status` tints the node
 * and is also announced (never color-alone). Set `showConnector={false}` on the
 * final row. Token-only colors.
 */
function ItineraryItem({ kind = 'activity', glyph, time, title, subtitle, status = 'upcoming', showConnector = true, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const nodeColor = colors[STATUS_SLOT[status]];
    const mark = glyph ?? KIND_GLYPH[kind];
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flexDirection: 'row', gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', width: 32 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 32,
                            height: 32,
                            borderRadius: tokens.radius.full,
                            borderWidth: 1,
                            borderColor: nodeColor,
                            backgroundColor: colors.surface,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, color: nodeColor }, children: mark }) }), showConnector ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, width: 2, marginTop: 2, backgroundColor: colors.border } })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, paddingBottom: showConnector ? tokens.spacing.lg : 0, gap: 2 }, children: [time ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: time })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: subtitle })) : null] })] }));
    const a11yLabel = `${title}${time ? `, ${time}` : ''}, ${status}`;
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11yLabel, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11yLabel, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }));
}
//# sourceMappingURL=ItineraryItem.js.map