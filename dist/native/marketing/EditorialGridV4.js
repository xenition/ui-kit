"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorialItemV4 = EditorialItemV4;
exports.EditorialGridV4 = EditorialGridV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * EditorialItem — **V4** "showcase" design (native mirror of the web V4). One
 * editorial cell as an elevated image-forward showcase card: the media floats in
 * a soft-primary media well, with the `caption` slotted below on the card
 * surface. NOT a gradient surface — a clean elevated card (`colors.card` +
 * border + soft shadow). The base's `span`/`start`/`offset`/`z` geometry props
 * are accepted for parity but are inert on native (phones are single-column, so
 * there is no overlap grid), exactly as the base native `EditorialItem`. Same
 * props/behavior as {@link EditorialItemProps}; token-only colors, no literals.
 */
function EditorialItemV4({ media, caption, children, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const content = media !== undefined ? media : children;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-editorial-item", style: [
            {
                minWidth: 0,
                overflow: 'hidden',
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.card,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.06,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                elevation: 2,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    minHeight: 144,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.08),
                }, children: content !== undefined ? (content) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 32, width: 32, borderRadius: 8, borderWidth: 2, borderColor: colors.primary } })) }), caption !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    backgroundColor: colors.card,
                    paddingHorizontal: tokens.spacing.lg,
                    paddingVertical: tokens.spacing.md,
                }, children: caption })) : null] }));
}
/**
 * EditorialGrid — **V4** "showcase" design (native mirror of the web V4). A
 * clean vertical stack of elevated `EditorialItemV4` showcase cards. As with the
 * base native `EditorialGrid`, the web's 12-column overlap geometry has no phone
 * analogue and the `columns`/`span`/`start`/`offset`/`z` props are inert on
 * native. Accepts the base's `items` data array or `EditorialItemV4` children
 * (array wins). Same props/behavior as {@link EditorialGridProps}; token-only
 * colors, no literals.
 */
function EditorialGridV4({ items, children, style }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-editorial-grid", style: [{ gap: tokens.spacing.lg }, style], children: items !== undefined
            ? items.map((it, i) => ((0, jsx_runtime_1.jsx)(EditorialItemV4, { media: it.media, caption: it.caption }, i)))
            : children }));
}
//# sourceMappingURL=EditorialGridV4.js.map