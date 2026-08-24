"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseCardV2 = CaseCardV2;
exports.CaseCardV3 = CaseCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * CaseCard, design v2 — an **elevated** card led by a practice-area glyph tile,
 * with the status pill and priority pinned to the header. Same Props as
 * {@link CaseCard}; visually a floating, tile-anchored card rather than the flat
 * bordered original. Token-pure; status stays a glyph + word, never color alone.
 */
function CaseCardV2({ caseNumber, title, client, practiceArea = 'other', status, priority, leadAttorney, nextEvent, variant = 'default', loading = false, onPress, onOpen, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const press = (0, motion_1.usePressScale)();
    const compact = variant === 'compact';
    const detailed = variant === 'detailed';
    const closed = status === 'closed';
    const areaMeta = internal_1.PRACTICE_AREA_META[practiceArea];
    const areaTint = (0, internal_1.toneColor)(colors, areaMeta.tone);
    const body = ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "elevated", padding: compact ? 'sm' : 'md', radius: "lg", style: [{ gap: tokens.spacing.sm, opacity: closed ? 0.7 : 1 }, style], children: loading ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading case", style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 44, height: 44, borderRadius: tokens.radius.md, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs, justifyContent: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.xs, width: '35%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.base, width: '75%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: 44,
                                height: 44,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: tokens.radius.md,
                                backgroundColor: (0, color_1.withAlpha)(areaTint, 0.14),
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: { fontSize: tokens.typography.scale.lg }, children: areaMeta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600', letterSpacing: 0.4 }, children: caseNumber }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: compact ? 1 : 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), client ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: client })) : null] }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.CASE_STATUS_META[status], size: "sm" }) : null] }), !compact && priority ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.CASE_PRIORITY_META[priority], variant: "soft", size: "sm" }) })) : null, detailed && (leadAttorney || nextEvent) ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2, paddingTop: tokens.spacing.xs, borderTopWidth: 1, borderTopColor: colors.border }, children: [leadAttorney ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Lead: ", leadAttorney] })) : null, nextEvent ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: ["\u23ED ", nextEvent] })) : null] })) : null, onOpen ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Open case ${caseNumber}`, onPress: onOpen, style: ({ pressed }) => ({
                        alignSelf: 'flex-start',
                        paddingVertical: tokens.spacing.xs,
                        paddingHorizontal: tokens.spacing.md,
                        borderRadius: tokens.radius.full,
                        backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.12),
                        opacity: pressed ? 0.7 : 1,
                    }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "Open case" }) })) : null] })) }));
    const animated = ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: body }));
    if (onPress && !loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Case ${caseNumber}: ${title}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, testID: testID, children: animated }) }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: animated });
}
/**
 * CaseCard, design v3 — a **minimal single line** anchored by a status dot, for
 * the densest lists. Same Props as {@link CaseCard}; no card chrome, just a
 * pressable row with a hairline divider. The dot is decorative — the status is
 * still carried by the trailing glyph + word pill, never color alone.
 */
function CaseCardV3({ caseNumber, title, client, status, priority, loading = false, onPress, onOpen, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 4 });
    const closed = status === 'closed';
    const dotColor = status ? (0, internal_1.toneColor)(colors, internal_1.CASE_STATUS_META[status].tone) : colors.border;
    const row = ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [
            {
                opacity: enter.opacity,
                transform: enter.transform,
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.xs,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
            },
            style,
        ], children: loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading case", style: { flex: 1, height: tokens.typography.scale.sm, borderRadius: tokens.radius.sm, backgroundColor: colors.border } })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: { width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: dotColor, opacity: closed ? 0.6 : 1 } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: caseNumber }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: title })] }), priority ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.CASE_PRIORITY_META[priority], variant: "inline", size: "sm" }) : null, status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.CASE_STATUS_META[status], variant: "inline", size: "sm" }) : null, client ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: client })) : null] })) }));
    if ((onPress || onOpen) && !loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Case ${caseNumber}: ${title}`, onPress: onPress ?? onOpen, testID: testID, children: row }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: row });
}
//# sourceMappingURL=CaseCardVariants.js.map