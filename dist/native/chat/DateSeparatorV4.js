"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateSeparatorV4 = DateSeparatorV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const appearance_1 = require("../primitives/internal/appearance");
/**
 * **V4 date separator** — same props as {@link DateSeparator}.
 *
 * ## Two changes
 *
 * 1. **It is a heading, not a caption.** A date separator is the only
 *    landmark in a long thread; marking it `header` is what lets a screen
 *    reader jump between days instead of scrolling through every message.
 * 2. **The pill takes the card ground and `mutedText`**, where the base used
 *    `surface` — the same colour as the page behind it — so the chip read as
 *    floating text rather than a marker.
 */
function DateSeparatorV4({ label, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (!label)
        return null;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ alignItems: 'center', paddingVertical: tokens.spacing.sm }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                ...(0, appearance_1.appearanceStyle)(appearance, colors, tokens),
                backgroundColor: colors.card,
                borderRadius: tokens.radius.full,
                paddingHorizontal: tokens.spacing.md,
                paddingVertical: tokens.spacing.xs,
            }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", size: "xs", weight: "semibold", tone: "mutedText", children: label }) }) }));
}
//# sourceMappingURL=DateSeparatorV4.js.map