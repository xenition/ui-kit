"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachmentChipV4 = AttachmentChipV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const mail_v4_1 = require("./internal/mail-v4");
/**
 * The file-kind glyphs, exactly the base's map. It is module-private there and
 * a base file is never edited, so it is spelled again rather than reached for.
 */
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
 * **V4 attachment chip** — same props as {@link AttachmentChip} plus
 * `onCancel`, `cancelLabel`, `downloadLabel` and `removeLabel`.
 *
 * ## Five changes
 *
 * 1. **An upload in flight can be abandoned.** The base hid remove for the
 *    whole of `uploadProgress` — which is exactly the interval in which a user
 *    notices they attached the wrong file, and the only interval in which
 *    stopping it saves them anything. `onCancel` fills it.
 * 2. **Progress is a progressbar with a value**, not the sentence
 *    "Uploading… 40%" and nothing else. A reader can now poll it; before, the
 *    number only changed if you happened to be looking.
 * 3. **Download and remove are siblings of the chip's button**, not children
 *    of it. Nesting them inside an `accessible` Pressable made them
 *    presentational: on VoiceOver the only thing you could do to an attachment
 *    was open it.
 * 4. **A chip with no `onPress` is not announced as a button.** The base
 *    always claimed the role and then set `disabled` — a reader was told there
 *    was a button and then that it did not work.
 * 5. **The glyph well is gone and press is a state layer.** The well was
 *    `withAlpha(colors.primary, 0.12)` carrying a `primary` glyph — a fill
 *    slot used as ink on a tint nobody measured it against — and a file kind
 *    is identity, so the glyph carries it in neutral ink. `opacity: 0.85`
 *    becomes M3's layer.
 */
function AttachmentChipV4({ name, kind = 'file', size, uploadProgress, onPress, onDownload, onRemove, onCancel, cancelLabel = 'Cancel upload', downloadLabel = 'Download', removeLabel = 'Remove', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const glyph = KIND_GLYPH[kind] ?? KIND_GLYPH.file;
    const uploading = uploadProgress != null && uploadProgress >= 0 && uploadProgress < 1;
    const pct = uploading ? Math.round((uploadProgress ?? 0) * 100) : null;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const spoken = (0, mail_v4_1.spokenLine)([
        `Attachment ${name}`,
        size,
        uploading ? `Uploading, ${pct} percent` : null,
    ]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, size: "lg", color: "mutedText" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", numberOfLines: 1, children: name }), uploading ? ((0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: pct ?? 0, size: "sm" })) : size ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: size })) : null] })] }));
    const rowStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.sm,
        flex: 1,
        minWidth: 0,
        minHeight: tap,
        paddingVertical: tokens.spacing.xs,
        paddingLeft: tokens.spacing.sm,
        borderRadius: tokens.radius.md,
    };
    const action = (label, actionGlyph, onActionPress) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: onActionPress, style: ({ pressed }) => ({
            width: tap,
            height: tap,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: tokens.radius.md,
            backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
        }), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: actionGlyph, size: "base", color: "mutedText" }) }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
                // Wide enough for a file name and two 44 targets without the name
                // collapsing to an ellipsis on the first character.
                maxWidth: tap * 6,
                paddingRight: tokens.spacing.xs,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, accessibilityState: { busy: uploading }, onPress: onPress, style: ({ pressed }) => [
                    rowStyle,
                    {
                        backgroundColor: pressed
                            ? (0, state_v4_1.pressOver)(theme, colors.surface, colors.onSurface)
                            : 'transparent',
                    },
                ], children: body })) : (
            // No `onPress` means no button — the base claimed the role anyway and
            // then disabled it.
            (0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: rowStyle, children: body })), uploading && onCancel ? action(cancelLabel, '×', onCancel) : null, !uploading && onDownload ? action(downloadLabel, '⤓', onDownload) : null, !uploading && onRemove ? action(removeLabel, '×', onRemove) : null] }));
}
//# sourceMappingURL=AttachmentChipV4.js.map