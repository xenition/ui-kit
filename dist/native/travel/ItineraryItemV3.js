"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItineraryItemV3 = ItineraryItemV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
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
function ItineraryItemV3({ kind = 'activity', glyph, time, title, subtitle, status = 'upcoming', showConnector = true, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const palette = colors;
    const dotColor = palette[STATUS_SLOT[status]];
    const mark = glyph ?? KIND_GLYPH[kind];
    const enter = (0, motion_1.useEnter)();
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [
            { opacity: enter.opacity, transform: enter.transform },
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
                borderBottomWidth: showConnector ? 1 : 0,
                borderBottomColor: colors.border,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { width: 52, color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: time ?? '' }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 8,
                    height: 8,
                    borderRadius: tokens.radius.full,
                    backgroundColor: dotColor,
                } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, color: colors.muted }, children: mark }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: subtitle })) : null] })] }));
    const a11yLabel = `${title}${time ? `, ${time}` : ''}, ${status}`;
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11yLabel, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11yLabel, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }));
}
//# sourceMappingURL=ItineraryItemV3.js.map