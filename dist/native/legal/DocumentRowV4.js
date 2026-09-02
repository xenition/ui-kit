"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentRowV4 = DocumentRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * DocumentRow — **V4** "chambers" design (native twin of the web V4). An elevated
 * rounded row with a soft shadow, the kind glyph in a soft-primary well, the
 * title, a version · size · modified meta line, a labelled glyph + word status
 * pill (never color alone), and an optional trailing download control. `compact`
 * collapses the metadata line. Tappable when `onPress` is set. Reuses the base
 * `variant` (`default` / `compact`). Token-only colors via `useXenitionTheme()`.
 */
function DocumentRowV4({ title, kind = 'other', status, modified, version, size, author, variant = 'default', onPress, onDownload, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const kindMeta = internal_1.DOCUMENT_KIND_META[kind];
    const meta = [version, size, modified ? `Modified ${modified}` : undefined, author].filter((s) => Boolean(s)).join(' · ');
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
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 40, height: 40, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: kindMeta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: title }), !compact && meta ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta }) : null] }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.DOCUMENT_STATUS_META[status], variant: "soft", size: "sm" }) : null, onDownload ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Download ${title}`, onPress: onDownload, hitSlop: 8, style: ({ pressed }) => ({ width: 32, height: 32, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1), opacity: pressed ? 0.7 : 1 }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.base }, children: "\u2913" }) })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Document ${title}`, onPress: onPress, testID: testID, style: ({ pressed }) => [shell, { opacity: pressed ? 0.8 : 1 }, style], children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, style: [shell, style], children: content });
}
//# sourceMappingURL=DocumentRowV4.js.map