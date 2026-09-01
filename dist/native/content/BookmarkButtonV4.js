"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookmarkButtonV4 = BookmarkButtonV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
/**
 * **V4 bookmark toggle** — same props as {@link BookmarkButton} plus
 * `saveLabel`, `savedLabel`, `addLabel` and `removeLabel`.
 *
 * ## Five changes
 *
 * 1. **One tone, one control.** The web twin drew the saved star in `primary`
 *    and the word beside it in `accent` — two brand colours inside a single
 *    button — and this twin drew the star in `accent`, so the same saved
 *    article was a different colour on a phone and on a laptop. Both are now
 *    the primary tone, taken as *ink* (`primaryText`) rather than as the fill
 *    slot, which measured as low as 1.32:1 on a pale seed.
 * 2. **It is a real target.** The button was roughly 26px, rescued here by
 *    `hitSlop` and on the web by nothing at all. It now clears 44 outright, so
 *    the thing a user sees is the thing they can hit.
 * 3. **Press is a state layer.** `opacity: 0.7` fades the star itself, which
 *    is close enough to M3's 0.38 disabled band to read as "unavailable"
 *    rather than "heard you".
 * 4. **Disabled is 0.38**, the band that actually means unavailable, not the
 *    invented 0.5.
 * 5. **The `labeled` variant's English is a prop**, and the dead zero-size
 *    `View` the `icon` branch rendered instead of nothing is gone.
 */
function BookmarkButtonV4({ bookmarked, onToggle, variant = 'icon', disabled = false, saveLabel = 'Save', savedLabel = 'Saved', addLabel = 'Bookmark article', removeLabel = 'Remove bookmark', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const labeled = variant === 'labeled';
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: bookmarked ? removeLabel : addLabel, accessibilityState: { selected: bookmarked, disabled }, disabled: disabled, onPress: () => onToggle(!bookmarked), style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.spacing.xs,
                minWidth: tap,
                minHeight: tap,
                paddingHorizontal: labeled ? tokens.spacing.md : tokens.spacing.xs,
                borderRadius: tokens.radius.full,
                borderWidth: labeled ? 1 : 0,
                borderColor: colors.border,
                // The container takes the layer; the star keeps its full strength.
                backgroundColor: pressed && !disabled ? (0, state_v4_1.pressFill)(theme) : 'transparent',
                opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, disabled),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: bookmarked ? '★' : '☆', size: "lg", color: bookmarked ? 'primaryText' : 'mutedText' }), labeled ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: bookmarked ? 'primaryText' : 'onSurface', children: bookmarked ? savedLabel : saveLabel })) : null] }));
}
//# sourceMappingURL=BookmarkButtonV4.js.map