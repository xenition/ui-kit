"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentRowV2 = DocumentRowV2;
exports.DocumentRowV3 = DocumentRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * DocumentRow, design v2 — an **elevated card** with a tinted kind-glyph tile,
 * title + metadata block, a status pill and an explicit round download button.
 * Same Props as {@link DocumentRow}; a richer, card-shaped presentation vs. the
 * flat inline original. Token-pure; status is a glyph + word, never color alone.
 */
function DocumentRowV2({ title, kind = 'other', status, modified, version, size, author, variant = 'default', onPress, onDownload, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 6 });
    const compact = variant === 'compact';
    const kindMeta = internal_1.DOCUMENT_KIND_META[kind];
    const kindTint = (0, internal_1.toneColor)(colors, kindMeta.tone);
    const meta = [version, size, modified ? `Modified ${modified}` : undefined, author]
        .filter((s) => Boolean(s))
        .join(' · ');
    const body = ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "elevated", padding: compact ? 'sm' : 'md', radius: "lg", style: [{ gap: tokens.spacing.sm }, style], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: tokens.radius.md,
                        backgroundColor: (0, color_1.withAlpha)(kindTint, 0.14),
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: { fontSize: tokens.typography.scale.lg }, children: kindMeta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: title }), !compact && meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : null, status ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: 2 }, children: (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.DOCUMENT_STATUS_META[status], variant: "soft", size: "sm" }) })) : null] }), onDownload ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Download ${title}`, onPress: onDownload, hitSlop: 8, style: ({ pressed }) => ({
                        width: 36,
                        height: 36,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: tokens.radius.full,
                        backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.12),
                        opacity: pressed ? 0.6 : 1,
                    }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.base }, children: "\u2913" }) })) : null] }) }));
    const animated = ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: body }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Document ${title}`, onPress: onPress, testID: testID, children: animated }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: animated });
}
/**
 * DocumentRow, design v3 — a **dense single line**: a bare kind glyph, the title,
 * a trailing inline status and a compact download glyph, on a hairline divider.
 * Same Props as {@link DocumentRow}; the tightest list treatment. Token-pure;
 * status remains a glyph + word, never color alone.
 */
function DocumentRowV3({ title, kind = 'other', status, modified, version, onPress, onDownload, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 4 });
    const kindMeta = internal_1.DOCUMENT_KIND_META[kind];
    const trailing = [version, modified].filter((s) => Boolean(s)).join(' · ');
    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [
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
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: { fontSize: tokens.typography.scale.base }, children: kindMeta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: title }), trailing ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: trailing })) : null, status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.DOCUMENT_STATUS_META[status], variant: "inline", size: "sm" }) : null, onDownload ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Download ${title}`, onPress: onDownload, hitSlop: 8, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1, paddingHorizontal: tokens.spacing.xs }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.base }, children: "\u2913" }) })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Document ${title}`, onPress: onPress, testID: testID, children: row }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: row });
}
//# sourceMappingURL=DocumentRowVariants.js.map