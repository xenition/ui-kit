"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadUnreadToggleV4 = ReadUnreadToggleV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
/**
 * How much brand the labelled chip carries — the same 14% `BadgeV4` mixes, so
 * a toggle and a badge sitting in one toolbar are the same family rather than
 * two nearly-equal tints.
 */
const SOFT_MIX = 0.14;
/**
 * **V4 read / unread toggle** — same props as {@link ReadUnreadToggle} plus
 * `readLabel` and `unreadLabel`.
 *
 * ## Four changes
 *
 * 1. **The zero-size `View` is gone.** The base shipped a `0 × 0` element
 *    carrying the comment "current state exposed as plain text for AT" — with
 *    no text in it, `accessibilityElementsHidden`, and
 *    `importantForAccessibility="no"`. It provided exactly nothing, and the
 *    comment is worse than the omission because it stops anyone looking again.
 * 2. **The state is actually announced.** `accessibilityState.selected` says
 *    whether the message is read; the label stays the *action*. That is the
 *    same pair the web twin spells as `aria-pressed` plus the action label, so
 *    the two twins say the same thing.
 * 3. **It clears 44.** The base was two `spacing.xs` paddings around a `base`
 *    glyph — roughly 24 points — with a `hitSlop` of 6 standing in for the
 *    rest.
 * 4. **The chip ground is opaque and press is a state layer.**
 *    `withAlpha(colors.primary, 0.1)` borrowed whatever was behind it, so the
 *    same toggle was a different colour on a card and on the page; and
 *    `opacity: pressed ? 0.7` dimmed the content instead of tinting the
 *    container. Disabled is 0.38, not 0.5.
 */
function ReadUnreadToggleV4({ read = false, onToggle, iconOnly = false, disabled = false, readLabel = 'Mark as read', unreadLabel = 'Mark as unread', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    // Tapping toggles: if currently read → mark unread, and vice-versa.
    const nextRead = !read;
    const actionLabel = nextRead ? readLabel : unreadLabel;
    // Opaque, so the chip decides its own colour instead of inheriting one from
    // whatever it happens to be sitting on. Icon-only keeps the base's bare
    // ground and therefore takes the translucent layer instead.
    const ground = iconOnly ? 'transparent' : (0, v4_depth_1.mixToken)(colors.surface, colors.primary, SOFT_MIX);
    const ink = read ? 'mutedText' : 'primaryText';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: actionLabel, accessibilityState: { selected: read, disabled }, disabled: disabled, onPress: () => onToggle?.(nextRead), style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.spacing.xs,
                minHeight: (0, chrome_v4_1.minTap)(tokens.spacing),
                minWidth: iconOnly ? (0, chrome_v4_1.minTap)(tokens.spacing) : undefined,
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: iconOnly ? tokens.spacing.xs : tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                // The labelled chip owns its ground, so the layer is composited into
                // it; the icon-only one owns nothing and floats the layer instead.
                backgroundColor: pressed
                    ? iconOnly
                        ? (0, state_v4_1.pressLayer)(theme)
                        : (0, state_v4_1.pressOver)(theme, ground, colors.onSurface)
                    : ground,
                opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, disabled),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: read ? '✉️' : '📩', size: "base", color: ink }), iconOnly ? null : ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: ink, children: actionLabel }))] }));
}
//# sourceMappingURL=ReadUnreadToggleV4.js.map