"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthSwitchFooterV4 = AuthSwitchFooterV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("./TextV4");
const chrome_v4_1 = require("./internal/chrome-v4");
const nav_v4_1 = require("./internal/nav-v4");
const state_v4_1 = require("./internal/state-v4");
const TONE = {
    primary: { ink: 'primaryText', weight: 'semibold' },
    muted: { ink: 'mutedText', weight: 'medium' },
};
/**
 * **V4 auth switch footer** — the native twin of the web `AuthSwitchFooterV4`,
 * the base's props plus {@link AuthSwitchTone}, a different design line.
 *
 * §9's centred footer line carrying the opposite action. One line, one
 * emphasis: the prompt is muted, the action is the only thing with weight.
 *
 * ## What V4 changes
 *
 * **The link is a real tap target.** The base put `minHeight: 44` on the *row*
 * and gave the `Pressable` a `hitSlop`, which extends the touchable area but
 * leaves the *visible* target the size of the word — so the press feedback and
 * the thing the user aimed at were different shapes. The minimum moves onto the
 * pressable itself, composed as `2xl - xs` off the spacing scale rather than
 * remembered as `44`: the same expression `ButtonV4` and the V4 nav line
 * compose, so a footer link, a nav row and a button land on one size.
 *
 * **It answers the press with a layer, not a dim.** The base auth family fades
 * a pressed control to `opacity: 0.6`, which lightens the control's own
 * *content* — the signal M3 spends 0.38 on to mean **disabled**. So a pressed
 * link and a dead link looked alike. V4 tints the container instead:
 * `pressFill`, the M3 pressed layer flattened opaquely against `surface`,
 * because this label carries a measured contrast promise against the surface it
 * is drawn on and a translucent layer would make that promise depend on
 * whatever the caller put behind the footer.
 *
 * **The prompt reads.** `muted` is `neutral[600]` and carries no contrast
 * promise; `mutedText` is that slot corrected to AA on `surface`, once, by the
 * compiler. A footer line is small type, which is the last place that can
 * afford ink nobody measured.
 *
 * **Nothing renders without a label** (§10.6/§12).
 */
function AuthSwitchFooterV4({ prompt, label, onPress, disabled = false, tone = 'primary', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!label)
        return null;
    const t = TONE[tone];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: tokens.spacing.xs,
            },
            style,
        ], children: [prompt ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: prompt })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, accessibilityState: { disabled }, onPress: onPress, disabled: disabled, style: ({ pressed }) => ({
                    minHeight: (0, nav_v4_1.minTap)(tokens.spacing),
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: tokens.spacing.sm,
                    borderRadius: tokens.radius.md,
                    backgroundColor: pressed && !disabled ? (0, state_v4_1.pressFill)(theme) : 'transparent',
                    opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, disabled),
                }), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: t.weight, tone: t.ink, children: label }) })] }));
}
//# sourceMappingURL=AuthSwitchFooterV4.js.map