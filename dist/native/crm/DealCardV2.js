"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealCardV2 = DealCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const money_1 = require("../commerce/money");
const internal_1 = require("./internal");
/**
 * DealCard **design V2** — an *elevated* deal card led by a big money figure,
 * with a full-width stage progress bar and an owner avatar footer. Where the
 * original DealCard is a flat outlined summary, V2 floats on a shadow, promotes
 * the value to a hero number, and turns win-probability into the card's primary
 * visual. Same props, same integer-cents money, same glyph+word outcome so it
 * never leans on color. Token-pure; won reads `successText`, lost `dangerText`.
 */
function DealCardV2({ name, company, valueCents, currency = 'USD', stage, probability, owner, closeDate, outcome = 'open', variant = 'default', loading = false, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const compact = variant === 'compact';
    const pct = (0, internal_1.clampPct)(probability);
    const showMeter = probability != null;
    const outcomeGlyph = outcome === 'won' ? '✓' : outcome === 'lost' ? '✕' : outcome === 'pending' ? '⋯' : '◔';
    const outcomeLabel = outcome === 'won' ? 'Won' : outcome === 'lost' ? 'Lost' : outcome === 'pending' ? 'Pending' : 'Open';
    const valueColor = outcome === 'won' ? colors.successText : outcome === 'lost' ? colors.dangerText : colors.onSurface;
    const meterColor = outcome === 'won' ? colors.success : outcome === 'lost' ? colors.danger : colors.primary;
    const surface = ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [
            {
                borderRadius: tokens.radius.lg,
                backgroundColor: colors.surface,
                padding: compact ? tokens.spacing.md : tokens.spacing.lg,
                gap: tokens.spacing.md,
                transform: [{ scale: press.scale }],
                opacity: enter.opacity,
            },
            (0, elevation_1.shadow)('md', tokens),
            style,
        ], children: loading ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading deal", style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.sm, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale['2xl'] ?? tokens.typography.scale.xl, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 8, width: '100%', borderRadius: tokens.radius.full, backgroundColor: colors.border } })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), company ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: company })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: tokens.spacing.xs / 2,
                                paddingHorizontal: tokens.spacing.sm,
                                paddingVertical: 2,
                                borderRadius: tokens.radius.full,
                                backgroundColor: (0, color_1.withAlpha)(meterColor, 0.12),
                            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: valueColor, fontSize: tokens.typography.scale.xs }, children: outcomeGlyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: valueColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: outcomeLabel })] })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: valueColor, fontSize: tokens.typography.scale['2xl'] ?? tokens.typography.scale.xl, fontWeight: '800' }, children: (0, money_1.formatMoney)(valueCents, currency) }), showMeter ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: stage ?? 'Progress' }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: [pct, "%"] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: 100, now: pct }, style: { height: 8, borderRadius: tokens.radius.full, backgroundColor: colors.border, overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${pct}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: meterColor } }) })] })) : stage ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: stage })) : null, owner || closeDate ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [owner ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", name: owner.name, src: owner.avatarUrl }), owner.name ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: owner.name })) : null] })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), closeDate ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: closeDate })) : null] })) : null] })) }));
    if (onPress && !loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Deal ${name}${company ? `, ${company}` : ''}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, testID: testID, children: surface }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: surface });
}
//# sourceMappingURL=DealCardV2.js.map