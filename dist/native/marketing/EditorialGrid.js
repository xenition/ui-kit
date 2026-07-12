"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorialItem = EditorialItem;
exports.EditorialGrid = EditorialGrid;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * One editorial cell — the native mirror of the web `EditorialItem`: the media
 * with a `surface`-backed caption below it. The web `span`/`start`/`offset`/`z`
 * geometry props are accepted for parity but are inert on native (see their
 * doc comments). Token-only.
 */
function EditorialItem({ media, caption, children, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-editorial-item", style: [{ minWidth: 0 }, style], children: [media !== undefined ? media : children, caption !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { backgroundColor: colors.surface, paddingTop: tokens.spacing.sm }, children: caption })) : null] }));
}
/**
 * Editorial layout — the native mirror of the web `EditorialGrid`.
 *
 * The web version is an asymmetric 12-column overlap grid (uneven spans/starts
 * plus negative offsets so covers overlap each other's rows, with z-order
 * keeping captions readable). That overlap has **no phone analogue**, so native
 * renders the items as a clean vertical stack, each item's caption slotted
 * directly below its media/children. The `columns`/`span`/`start`/`offset`/`z`
 * props are preserved for prop parity but are **inert** on native. Token-only.
 */
function EditorialGrid({ items, children, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-editorial-grid", style: [{ gap: tokens.spacing['2xl'] }, style], children: items !== undefined
            ? items.map((it, i) => ((0, jsx_runtime_1.jsx)(EditorialItem, { media: it.media, caption: it.caption }, i)))
            : children }));
}
//# sourceMappingURL=EditorialGrid.js.map