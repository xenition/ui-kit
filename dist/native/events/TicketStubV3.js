"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketStubV3 = TicketStubV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const motion_1 = require("../primitives/internal/motion");
function TicketStubV3({ eventTitle, holderName, dateLabel, fields = [], code, tier, variant = 'default', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 4 });
    const chars = code.length > 0 ? code.split('') : ['0'];
    const bars = Array.from({ length: 16 }, (_, i) => {
        const ch = chars[i % chars.length] ?? '0';
        const magnitude = (ch.charCodeAt(0) % 3) + 1;
        const dark = ch.charCodeAt(0) % 2 === 0;
        return { width: magnitude, dark };
    });
    const subLine = [holderName, dateLabel].filter(Boolean).join('  ·  ');
    const containerStyle = [
        {
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'stretch',
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
        },
        style,
    ];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityRole: "summary", accessibilityLabel: `Ticket for ${eventTitle}, code ${code}`, style: [containerStyle, { opacity: enter.opacity, transform: enter.transform }], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, padding: tokens.spacing.md, gap: tokens.spacing.xs, justifyContent: 'center' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: eventTitle }), tier ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", size: "sm", children: tier }) : null] }), subLine ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: subLine })) : null, variant !== 'compact' && fields.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md, marginTop: 2 }, children: fields.map((f, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontWeight: '700', letterSpacing: 0.5 }, children: `${f.label.toUpperCase()} ` }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontWeight: '700' }, children: f.value })] }, `${f.label}-${i}`))) })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', paddingVertical: tokens.spacing.xs }, children: Array.from({ length: 8 }, (_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 1, height: 4, backgroundColor: colors.border } }, i))) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs, paddingHorizontal: tokens.spacing.md, backgroundColor: tokens.ramps.neutral[50] }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { flexDirection: 'row', alignItems: 'flex-end', gap: 2, height: tokens.spacing.xl }, children: bars.map((b, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: b.width, height: '100%', backgroundColor: b.dark ? colors.onSurface : colors.muted } }, i))) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, letterSpacing: 1, fontWeight: '600' }, children: code })] })] }));
}
//# sourceMappingURL=TicketStubV3.js.map