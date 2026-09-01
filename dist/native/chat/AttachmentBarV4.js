"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentBarV4 = AttachmentBarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const appearance_1 = require("../primitives/internal/appearance");
/** Kind → glyph and default word. */
const KIND_META = {
    image: { glyph: '🖼', label: 'Image' },
    video: { glyph: '🎬', label: 'Video' },
    file: { glyph: '📄', label: 'File' },
    audio: { glyph: '🎵', label: 'Audio' },
};
/**
 * **V4 attachment bar** — same props as {@link AttachmentBar} plus
 * `formatRemoveLabel` and `kindLabels`.
 *
 * ## Four changes
 *
 * 1. **The remove control clears 44 and is named per attachment.** It was an
 *    unlabelled `✕` at glyph size, so a reader heard "button" four times and a
 *    thumb missed it.
 * 2. **The thumbnail ground is `colors.muted`** at a fixed square, so a bar of
 *    staged files does not reflow as thumbnails decode.
 * 3. **The kind is named**, not only glyphed — the glyph is emoji and is read
 *    aloud as its own name.
 * 4. **Nothing renders for an empty list** (§4.5) — the base drew an empty
 *    strip above the composer.
 */
function AttachmentBarV4({ attachments, onRemove, appearance = 'classic', formatRemoveLabel, kindLabels, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const list = attachments?.filter(Boolean) ?? [];
    if (list.length === 0)
        return null;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const thumb = tokens.spacing['2xl'] + tokens.spacing.sm;
    const removeLabel = formatRemoveLabel ?? ((n) => `Remove ${n}`);
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.sm, padding: tokens.spacing.sm }, style: [{ ...(0, appearance_1.appearanceStyle)(appearance, colors, tokens) }, style], children: list.map((item) => {
            const kind = item.kind ?? 'file';
            const meta = KIND_META[kind];
            const word = kindLabels?.[kind] ?? meta.label;
            const name = item.name ?? word;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: thumb }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${word}, ${name}`, style: {
                            width: thumb,
                            height: thumb,
                            borderRadius: tokens.radius.md,
                            overflow: 'hidden',
                            backgroundColor: colors.muted,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: [item.thumbnailUri ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: item.thumbnailUri }, accessible: false, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: meta.glyph, size: "xl" })), onRemove ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: removeLabel(name), onPress: () => onRemove(item.id), hitSlop: tokens.spacing.sm, style: ({ pressed }) => ({
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    width: tap / 2,
                                    height: tap / 2,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: pressed ? (0, state_v4_1.pressFill)(theme) : colors.surface,
                                }), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "close", size: "xs", color: "onSurface" }) })) : null] }), item.name ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: item.name })) : null] }, item.id));
        }) }));
}
//# sourceMappingURL=AttachmentBarV4.js.map