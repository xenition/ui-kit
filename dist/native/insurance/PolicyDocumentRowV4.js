"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyDocumentRowV4 = PolicyDocumentRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ButtonV4_1 = require("../primitives/ButtonV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** Binary-prefixed units, largest first — what a file manager shows. */
const UNITS = ['B', 'KB', 'MB', 'GB', 'TB'];
/** Default `formatSize`: one decimal above a kilobyte, none below. */
function defaultFormatSize(bytes) {
    if (!Number.isFinite(bytes) || bytes < 0)
        return '';
    let value = bytes;
    let unit = 0;
    while (value >= 1024 && unit < UNITS.length - 1) {
        value /= 1024;
        unit += 1;
    }
    return `${unit === 0 ? Math.round(value) : value.toFixed(1)} ${UNITS[unit] ?? 'B'}`;
}
/**
 * **V4 policy document row** — same props as {@link PolicyDocumentRow} plus
 * `sizeBytes` and `formatSize`.
 *
 * ## Five changes
 *
 * 1. **Download is reachable.** This is the module's clearest instance of the
 *    sibling rule and it fails differently on each platform. On native the
 *    whole row — glyph, title, meta line *and the Download `Button`* — was the
 *    subtree of one `Pressable`, and a `Pressable` is `accessible` by default,
 *    so VoiceOver flattened it into a single leaf named "Auto policy
 *    declarations document". The Download button was **not reachable by any
 *    gesture**: not a focus stop, not swipeable to, not activatable. (On the
 *    web twin the same nesting had teeth instead: the row's `onKeyDown` caught
 *    the bubbled Enter, `preventDefault()` cancelled the button's own
 *    activation, and the row *opened the document* instead of downloading it.)
 *    The fix is structural, not a guard: the row container is a plain `View`,
 *    the activation wraps only the glyph-and-text region and carries the row's
 *    spoken name, and the Download button sits beside it.
 * 2. **Two rows no longer offer two buttons called "Download".** The button's
 *    spoken name now carries the document it belongs to, so a list of six
 *    documents is six distinct actions rather than six identical ones.
 * 3. **The kind is a word, not a mangled enum.** The meta line was built from
 *    `kind.replace('-', ' ')`, so the reader was shown `"id card"` — the raw
 *    identifier, lower-cased and untranslatable. It comes from the module's
 *    tone table now, like every other label.
 * 4. **The size can be a number.** `size` was a pre-formatted string, so
 *    `'1.2 MB'`, `'1,2 Mo'` and `'1200 KB'` all appeared in one product.
 * 5. **Press is a state layer and the row joins the shared row family** — the
 *    same height, the same 44 leading slot and the same pressed ground as
 *    `ClaimRowV4` and `BeneficiaryRowV4`, instead of `opacity: 0.7` and a
 *    hand-set 40px disc. The Download button clears 44 too; at `size="sm"` on
 *    a bare `Button` it did not.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
function PolicyDocumentRowV4({ title, kind = 'policy', size, sizeBytes, date, downloadLabel = 'Download', formatSize = defaultFormatSize, onPress, onDownload, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!title)
        return null;
    const meta = tone_v4_1.DOCUMENT_KIND_V4[kind] ?? tone_v4_1.DOCUMENT_KIND_V4.policy;
    // The number wins: a caller who supplies both has moved to the formatted
    // path and the leftover string is the old spelling. `size` alone is
    // untouched, so nothing that works today changes.
    const sizeText = typeof sizeBytes === 'number' && Number.isFinite(sizeBytes)
        ? formatSize(sizeBytes)
        : size != null && size !== ''
            ? size
            : undefined;
    const caption = (0, tone_v4_1.metaLine)([meta.label, sizeText, date]);
    const spoken = (0, tone_v4_1.spokenLine)([title, meta.label, sizeText, date]);
    const identity = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, row_v4_1.rowContainerStyle)(theme),
            {
                flex: 1,
                paddingHorizontal: 0,
                borderRadius: tokens.radius.md,
                backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }),
            },
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { ...tone_v4_1.DECORATIVE, style: [
                    (0, row_v4_1.rowLeadingStyle)(theme),
                    { borderRadius: tokens.radius.md, backgroundColor: (0, tone_v4_1.chipGround)(theme) },
                ], children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", tone: "onCard", children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 1, children: title }), caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: caption })) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
            },
            style,
        ], children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: { flex: 1, borderRadius: tokens.radius.md }, children: ({ pressed }) => identity(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: { flex: 1 }, children: identity(false) })), onDownload ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "soft", size: "sm", onPress: onDownload, accessibilityLabel: `${downloadLabel}, ${title}`, style: { minHeight: (0, chrome_v4_1.minTap)(tokens.spacing) }, children: downloadLabel })) : null] }));
}
//# sourceMappingURL=PolicyDocumentRowV4.js.map