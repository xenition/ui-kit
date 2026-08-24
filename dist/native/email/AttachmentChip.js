"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentChip = AttachmentChip;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const tint_1 = require("./tint");
const KIND_GLYPH = {
    image: '🖼️',
    pdf: '📕',
    doc: '📄',
    sheet: '📊',
    audio: '🎵',
    video: '🎬',
    zip: '🗜️',
    file: '📎',
};
/**
 * A single mail attachment as a compact chip — kind glyph, file name, optional
 * size, and optional download / remove affordances. While `uploadProgress` is
 * between 0 and 1 it reads as loading and suppresses the trailing actions.
 * Surface, border, and the soft icon well all resolve from theme tokens. No
 * literal colors.
 */
function AttachmentChip({ name, kind = 'file', size, uploadProgress, onPress, onDownload, onRemove, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const glyph = KIND_GLYPH[kind] ?? KIND_GLYPH.file;
    const uploading = uploadProgress != null && uploadProgress >= 0 && uploadProgress < 1;
    const pct = uploading ? Math.round((uploadProgress ?? 0) * 100) : null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Attachment ${name}${size ? `, ${size}` : ''}${uploading ? ', uploading' : ''}`, accessibilityState: { busy: uploading }, onPress: onPress, disabled: !onPress, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                alignSelf: 'flex-start',
                maxWidth: 260,
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                opacity: pressed && onPress ? 0.85 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 32,
                    height: 32,
                    borderRadius: tokens.radius.sm,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, tint_1.withAlpha)(colors.primary, 0.12),
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "base", color: "primary" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: name }), uploading ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `Uploading… ${pct}%` })) : size ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: size })) : null] }), !uploading && onDownload ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Download ${name}`, onPress: onDownload, hitSlop: 6, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2913", size: "base", color: "muted" }) })) : null, !uploading && onRemove ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Remove ${name}`, onPress: onRemove, hitSlop: 6, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u00D7", size: "base", color: "muted" }) })) : null] }));
}
//# sourceMappingURL=AttachmentChip.js.map