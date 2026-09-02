"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseCardV4 = CaseCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * CaseCard — **V4** "chambers" design (native twin of the web V4). The
 * distinguished, chambers take on a matter file: an elevated rounded card with a
 * soft shadow, a docket-number eyebrow over a strong caption, the client, a
 * labelled glyph + word status pill (never color alone), and a soft-primary chip
 * strip carrying practice area + priority. `compact` trims to the header row;
 * `detailed` adds lead attorney + next event. An optional `onOpen` renders an
 * "Open case" affordance. Reuses the base `variant`
 * (`default` / `compact` / `detailed`). Token-only colors via `useXenitionTheme()`.
 */
function CaseCardV4({ caseNumber, title, client, practiceArea, status, priority, leadAttorney, nextEvent, variant = 'default', loading = false, onPress, onOpen, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const detailed = variant === 'detailed';
    const closed = status === 'closed';
    const shell = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: compact ? tokens.spacing.md : tokens.spacing.lg,
        gap: tokens.spacing.md,
        opacity: closed ? 0.7 : 1,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading case", testID: testID, style: [shell, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.xs, width: '35%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.base, width: '75%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.sm, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] }));
    }
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600', letterSpacing: 0.4, fontVariant: ['tabular-nums'] }, children: caseNumber }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: compact ? 1 : 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: title }), client ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: client }) : null] }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.CASE_STATUS_META[status], size: "sm" }) : null] }), !compact && (practiceArea || priority) ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.xs, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.05), borderRadius: tokens.radius.md, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }, children: [practiceArea ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.PRACTICE_AREA_META[practiceArea], variant: "soft", size: "sm" }) : null, priority ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.CASE_PRIORITY_META[priority], variant: "soft", size: "sm" }) : null] })) : null, detailed && (leadAttorney || nextEvent) ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [leadAttorney ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Lead: ", leadAttorney] }) : null, nextEvent ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: ["\u23ED ", nextEvent] }) : null] })) : null, onOpen ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Open case ${caseNumber}`, onPress: onOpen, style: ({ pressed }) => ({ alignSelf: 'flex-start', paddingVertical: tokens.spacing.xs, paddingHorizontal: tokens.spacing.md, borderRadius: tokens.radius.md, borderWidth: 1, borderColor: colors.border, opacity: pressed ? 0.7 : 1 }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "Open case" }) })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Case ${caseNumber}: ${title}`, onPress: onPress, testID: testID, style: ({ pressed }) => [shell, { opacity: pressed ? 0.9 : closed ? 0.7 : 1 }, style], children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, style: [shell, style], children: content });
}
//# sourceMappingURL=CaseCardV4.js.map