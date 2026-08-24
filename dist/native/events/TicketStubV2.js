"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketStubV2 = TicketStubV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
function TicketStubV2({ eventTitle, holderName, dateLabel, fields = [], code, tier, variant = 'default', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const chars = code.length > 0 ? code.split('') : ['0'];
    const bars = Array.from({ length: 34 }, (_, i) => {
        const ch = chars[i % chars.length] ?? '0';
        const magnitude = (ch.charCodeAt(0) % 4) + 1; // 1..4
        const dark = ch.charCodeAt(0) % 2 === 0;
        return { width: magnitude, dark };
    });
    const perforationDots = Array.from({ length: 22 }, (_, i) => i);
    const containerStyle = [
        {
            overflow: 'hidden',
            borderRadius: tokens.radius.lg,
            backgroundColor: colors.surface,
            ...(0, elevation_1.shadow)('lg', tokens),
        },
        style,
    ];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityRole: "summary", accessibilityLabel: `Ticket for ${eventTitle}, code ${code}`, style: [containerStyle, { opacity: enter.opacity, transform: enter.transform }], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.08), padding: tokens.spacing.lg, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: eventTitle }), tier ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: tier }) : null] }), holderName ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: holderName })) : null, dateLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: dateLabel })) : null] }), variant !== 'compact' && fields.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.lg, paddingHorizontal: tokens.spacing.lg, paddingBottom: tokens.spacing.md }, children: fields.map((f, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 1 }, children: f.label.toUpperCase() }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: f.value })] }, `${f.label}-${i}`))) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', height: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: tokens.spacing.md, height: tokens.spacing.md, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[100], marginLeft: -tokens.spacing.sm } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: tokens.spacing.sm }, children: perforationDots.map((d) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.border } }, d))) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: tokens.spacing.md, height: tokens.spacing.md, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[100], marginRight: -tokens.spacing.sm } })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    gap: 2,
                    height: tokens.spacing['2xl'] + tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.lg,
                    paddingTop: tokens.spacing.sm,
                }, children: bars.map((b, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: b.width, height: '100%', backgroundColor: b.dark ? colors.onSurface : (0, color_1.withAlpha)(colors.onSurface, 0.35) } }, i))) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { textAlign: 'center', color: colors.muted, fontSize: tokens.typography.scale.sm, letterSpacing: 3, fontWeight: '700', paddingVertical: tokens.spacing.md }, children: code })] }));
}
//# sourceMappingURL=TicketStubV2.js.map