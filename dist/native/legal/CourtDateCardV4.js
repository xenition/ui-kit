"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourtDateCardV4 = CourtDateCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * CourtDateCard — **V4** "chambers" design (native twin of the web V4). An
 * elevated rounded card with a soft shadow, a leading soft-primary event-glyph
 * block, the date + time, event-type and urgency pills (each a glyph + word so
 * nothing rests on color alone), an optional toned countdown, and venue / judge /
 * case metadata. A `today` / `soon` urgency tints the countdown for triage.
 * Tappable when `onPress` is set. Reuses the base `variant` (`default` /
 * `compact`). Token-only colors via `useXenitionTheme()`.
 */
function CourtDateCardV4({ type, date, time, court, judge, caseNumber, urgency = 'upcoming', countdown, variant = 'default', onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const typeMeta = internal_1.COURT_EVENT_META[type];
    const urgencyMeta = internal_1.COURT_URGENCY_META[urgency];
    const highlighted = urgency === 'today' || urgency === 'soon';
    const shell = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: compact ? tokens.spacing.md : tokens.spacing.lg,
        gap: tokens.spacing.md,
        opacity: urgency === 'past' ? 0.7 : 1,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { minWidth: 52, height: 48, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: typeMeta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: date }), time ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }, children: time }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.xs, marginTop: 2 }, children: [(0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: typeMeta, variant: "inline", size: "sm" }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: urgencyMeta, variant: "soft", size: "sm" })] })] }), countdown ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: highlighted ? (0, internal_1.toneColor)(colors, urgencyMeta.tone) : colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: countdown })) : null] }), !compact && (court || judge || caseNumber) ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.05), borderRadius: tokens.radius.md, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }, children: [court ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: ["\uD83C\uDFDB ", court] }) : null, judge ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Before ", judge] }) : null, caseNumber ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }, children: caseNumber }) : null] })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${typeMeta.label} on ${date}`, onPress: onPress, testID: testID, style: ({ pressed }) => [shell, { opacity: pressed ? 0.9 : urgency === 'past' ? 0.7 : 1 }, style], children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, style: [shell, style], children: content });
}
//# sourceMappingURL=CourtDateCardV4.js.map