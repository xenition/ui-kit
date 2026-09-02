"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvidenceRowV4 = EvidenceRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * EvidenceRow — **V4** "chambers" design (native twin of the web V4). An elevated
 * rounded row with a soft shadow, the kind glyph in a soft-primary well, an
 * exhibit eyebrow over the description, a chain-of-custody meta line, an optional
 * "Chain verified" marker (glyph + word, not bare color), and a labelled glyph +
 * word admissibility pill (never color alone). `compact` truncates and hides the
 * meta line. Tappable when `onPress` is set. Reuses the base `variant`
 * (`default` / `compact`). Token-only colors via `useXenitionTheme()`.
 */
function EvidenceRowV4({ exhibit, title, kind = 'document', status, source, date, custodyVerified, variant = 'default', onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const kindMeta = internal_1.EVIDENCE_KIND_META[kind];
    const meta = [source, date].filter(Boolean).join(' · ');
    const shell = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        minHeight: compact ? 44 : 56,
        paddingVertical: tokens.spacing.sm,
        paddingHorizontal: tokens.spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 40, height: 40, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: kindMeta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [exhibit ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 0.4 }, children: exhibit }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: compact ? 1 : undefined, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: title }), !compact && meta ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta }) : null, custodyVerified ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "\uD83D\uDD17 Chain verified" }) : null] }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.EVIDENCE_STATUS_META[status], variant: "soft", size: "sm" }) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Evidence ${exhibit ? `${exhibit}, ` : ''}${title}`, onPress: onPress, testID: testID, style: ({ pressed }) => [shell, { opacity: pressed ? 0.8 : 1 }, style], children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, style: [shell, style], children: content });
}
//# sourceMappingURL=EvidenceRowV4.js.map