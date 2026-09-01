"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarButtonV4 = StarButtonV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
/**
 * **V4 star button** — same props as {@link StarButton} plus `starLabel` and
 * `unstarLabel`.
 *
 * ## Four changes
 *
 * 1. **It is a real target.** The base was a `spacing.xs` box around an `lg`
 *    glyph — about 26 points — propped up by `hitSlop`. A hit slop is an
 *    invisible promise: it does not move with the row it overlaps, it does not
 *    show up in a switch-control's target list, and two of these side by side
 *    overlap each other's slop. The button is now `minTap` square.
 * 2. **It announces the action, not an adjective.** "Starred" describes the
 *    world; "Remove star" says what the button will do, which is what a button
 *    label is for. The current state stays in `accessibilityState.selected` —
 *    the same split the web twin spells as `aria-pressed`, so the two twins
 *    finally say the same thing in the same order.
 * 3. **Press is a state layer.** `opacity: pressed ? 0.6` sat inside M3's
 *    *disabled* band, so a pressed star read as an unavailable one.
 *    `pressLayer` tints the container and leaves the glyph at full strength,
 *    and disabled is 0.38 rather than an invented 0.5.
 * 4. **A star is a flag, not a warning.** The base inked it with `warn` — a
 *    status slot — so a starred message and a failed one wore the same colour
 *    in one list. Starred takes `accentText`, unstarred `mutedText`, and the
 *    filled-vs-hollow glyph carries the state without any colour at all.
 */
function StarButtonV4({ starred = false, onToggle, size = 'lg', disabled = false, starLabel = 'Star', unstarLabel = 'Remove star', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: starred ? unstarLabel : starLabel, accessibilityState: { selected: starred, disabled }, disabled: disabled, onPress: () => onToggle?.(!starred), style: ({ pressed }) => [
            {
                width: tap,
                height: tap,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: tokens.radius.full,
                // The star sits on a row, a card or a header and owns none of them,
                // so the layer is the translucent flavour.
                backgroundColor: pressed ? (0, state_v4_1.pressLayer)(theme) : 'transparent',
                opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, disabled),
            },
            style,
        ], children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: starred ? '★' : '☆', size: size, color: starred ? 'accentText' : 'mutedText' }) }));
}
//# sourceMappingURL=StarButtonV4.js.map