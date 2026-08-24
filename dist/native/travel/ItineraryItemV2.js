"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItineraryItemV2 = ItineraryItemV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
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
const STATUS_TEXT_SLOT = {
    upcoming: 'muted',
    active: 'primaryText',
    done: 'successText',
};
const STATUS_TONE = {
    upcoming: 'neutral',
    active: 'primary',
    done: 'success',
};
function ItineraryItemV2({ kind = 'activity', glyph, time, title, subtitle, status = 'upcoming', showConnector = true, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const palette = colors;
    const nodeColor = palette[STATUS_SLOT[status]];
    const markColor = palette[STATUS_TEXT_SLOT[status]];
    const mark = glyph ?? KIND_GLYPH[kind];
    const enter = (0, motion_1.useEnter)();
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [
            { opacity: enter.opacity, transform: enter.transform },
            { flexDirection: 'row', gap: tokens.spacing.md },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', width: 36 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 36,
                            height: 36,
                            borderRadius: tokens.radius.full,
                            borderWidth: 2,
                            borderColor: nodeColor,
                            backgroundColor: colors.surface,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base, color: markColor }, children: mark }) }), showConnector ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, width: 2, marginTop: 4, backgroundColor: colors.border } })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
                    (0, appearance_1.appearanceStyle)('elevated', colors, tokens),
                    {
                        flex: 1,
                        marginBottom: showConnector ? tokens.spacing.lg : 0,
                        borderRadius: tokens.radius.lg,
                        padding: tokens.spacing.md,
                        gap: 4,
                    },
                ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [time ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: time })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: STATUS_TONE[status], children: status })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: subtitle })) : null] })] }));
    const a11yLabel = `${title}${time ? `, ${time}` : ''}, ${status}`;
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11yLabel, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11yLabel, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }));
}
//# sourceMappingURL=ItineraryItemV2.js.map