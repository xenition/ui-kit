"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItineraryItemV4 = ItineraryItemV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const journey_1 = require("./internal/journey");
const KIND_GLYPH = {
    flight: '✈',
    hotel: '🏨',
    activity: '🎟',
    transfer: '🚕',
    meal: '🍽',
};
/** Status → pill copy, glyph and Badge tone (announced, never color-alone). */
const STATUS_PILL = {
    upcoming: { label: 'Upcoming', glyph: '○', tone: 'neutral' },
    active: { label: 'Now', glyph: '●', tone: 'warn' },
    done: { label: 'Done', glyph: '✓', tone: 'success' },
};
/**
 * ItineraryItem — **V4** "journey" design. One boarding-pass timeline row: the
 * kind glyph rides a small brand-gradient disc (the signature V4 touch) sitting
 * on a token connector rail, with the time, title and detail line beside it and
 * a status pill (`Badge`) — done→success, active→warn, upcoming→neutral. Same
 * props/behavior as {@link ItineraryItemProps}; token-only colors via
 * `useXenitionTheme()`. Set `showConnector={false}` on the final row.
 */
function ItineraryItemV4({ kind = 'activity', glyph, time, title, subtitle, status = 'upcoming', showConnector = true, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const mark = glyph ?? KIND_GLYPH[kind];
    const pill = STATUS_PILL[status];
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flexDirection: 'row', gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', width: 32 }, children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, journey_1.journeyDisc)(r), style: {
                            width: 32,
                            height: 32,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, color: (0, journey_1.journeyInk)(r) }, children: mark }) }), showConnector ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, width: 2, marginTop: 2, backgroundColor: colors.border } })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, paddingBottom: showConnector ? tokens.spacing.lg : 0, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: tokens.spacing.sm }, children: [time ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: time })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: pill.tone, variant: "soft", size: "sm", children: `${pill.glyph} ${pill.label}` })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: subtitle })) : null] })] }));
    const a11yLabel = `${title}${time ? `, ${time}` : ''}, ${status}`;
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11yLabel, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11yLabel, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }));
}
//# sourceMappingURL=ItineraryItemV4.js.map