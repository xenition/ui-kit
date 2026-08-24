"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCardV2 = ServiceCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const format_1 = require("./internal/format");
const CATEGORY = {
    license: { label: 'Licensing', glyph: '🪪' },
    permit: { label: 'Permits', glyph: '📋' },
    tax: { label: 'Tax', glyph: '🧾' },
    records: { label: 'Records', glyph: '🗂️' },
    benefit: { label: 'Benefits', glyph: '🤝' },
    health: { label: 'Public health', glyph: '⚕️' },
    utility: { label: 'Utilities', glyph: '💧' },
    other: { label: 'Service', glyph: '🏛️' },
};
const CHANNEL = {
    online: { label: 'Online', glyph: '🌐', tone: 'success' },
    'in-person': { label: 'In person', glyph: '🏢', tone: 'warn' },
    phone: { label: 'By phone', glyph: '☎️', tone: 'neutral' },
    unavailable: { label: 'Unavailable', glyph: '⛔', tone: 'danger' },
};
/**
 * ServiceCard, alternate design **V2** — an elevated tile. A large tinted
 * category glyph tile anchors the header beside the title; the delivery channel
 * reads as a prominent text + glyph availability badge (never color alone); a
 * quiet turnaround footer sits above a **full-width primary Start CTA**. Same
 * `ServiceCardProps`; drops in for `ServiceCard`. Token-pure.
 */
function ServiceCardV2({ category, title, description, channel, estimatedTime, actionLabel = 'Start', onStart, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const cat = CATEGORY[category] ?? CATEGORY.other;
    const ch = channel ? CHANNEL[channel] : undefined;
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const press = (0, motion_1.usePressScale)();
    const body = ((0, jsx_runtime_1.jsx)(primitives_2.Card, { variant: "elevated", padding: "none", radius: "lg", style: [{ overflow: 'hidden' }, style], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.lg, gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: 60,
                                height: 60,
                                borderRadius: tokens.radius.lg,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: (0, format_1.withAlpha)(colors.primary, 0.12),
                                ...(0, elevation_1.shadow)('sm', tokens),
                            }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: cat.glyph, size: "3xl", accessibilityLabel: cat.label }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: cat.label })] })] }), ch != null || estimatedTime != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [ch != null ? ((0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: ch.tone, variant: "soft", size: "md", children: `${ch.glyph} ${ch.label}` })) : null, estimatedTime != null ? ((0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: "neutral", variant: "outline", size: "md", children: `⏱ ${estimatedTime}` })) : null] })) : null, description != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: description })) : null, onStart != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: actionLabel, onPress: onStart, style: ({ pressed }) => ({
                        borderRadius: tokens.radius.md,
                        backgroundColor: colors.primary,
                        paddingVertical: tokens.spacing.sm,
                        alignItems: 'center',
                        opacity: pressed ? 0.85 : 1,
                    }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: actionLabel }) })) : null] }) }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: body });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${title}, ${cat.label}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: body }) }));
}
//# sourceMappingURL=ServiceCardV2.js.map