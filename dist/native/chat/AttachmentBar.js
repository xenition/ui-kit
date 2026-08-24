"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentBar = AttachmentBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const KIND_GLYPH = {
    image: '🖼️',
    video: '🎬',
    file: '📄',
    audio: '🎵',
};
/**
 * Horizontal strip of staged attachments shown above the composer before a
 * message is sent. Each tile shows a thumbnail (or a kind glyph) and a remove
 * button. Scrolls horizontally; renders nothing when empty. No literal colors.
 */
function AttachmentBar({ attachments, onRemove, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (attachments.length === 0)
        return null;
    const tile = 56;
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, accessibilityLabel: "Staged attachments", contentContainerStyle: { gap: tokens.spacing.sm, padding: tokens.spacing.sm }, style: style, children: attachments.map((att) => {
            const kind = att.kind ?? 'file';
            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: tile }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            // Appearance FIRST (fill/border/elevation); classic == surface + hairline border.
                            ...(0, appearance_1.appearanceStyle)(appearance, colors, tokens),
                            width: tile,
                            height: tile,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }, children: att.thumbnailUri ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: att.thumbnailUri }, style: { width: tile, height: tile }, resizeMode: "cover", accessibilityLabel: att.name ?? 'Attachment' })) : ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: KIND_GLYPH[kind], accessibilityLabel: att.name ?? kind })) }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Remove ${att.name ?? 'attachment'}`, onPress: () => onRemove?.(att.id), style: {
                            position: 'absolute',
                            top: -tokens.spacing.xs,
                            right: -tokens.spacing.xs,
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            backgroundColor: colors.danger,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u00D7", size: "sm", color: "onDanger" }) }), att.name ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            marginTop: 2,
                            color: colors.muted,
                            fontSize: tokens.typography.scale.xs,
                            textAlign: 'center',
                        }, children: att.name })) : null] }, att.id));
        }) }));
}
//# sourceMappingURL=AttachmentBar.js.map