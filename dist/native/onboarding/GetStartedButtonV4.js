"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStartedButtonV4 = GetStartedButtonV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ButtonV4_1 = require("../primitives/ButtonV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const surface_v4_1 = require("../primitives/internal/surface-v4");
/**
 * The §5 CTA bar's height: `2xl` + `sm` on the default scale, which is the 56
 * the design spec names — but **composed from the scale** rather than pinned,
 * so a seed with tighter spacing gets a proportionally tighter CTA instead of
 * a bar that no longer matches the fields above it. The base's literal `56` is
 * exactly the drift the Addendum settled for form controls; this is the same
 * fix on the action side.
 */
function ctaHeight(spacing) {
    return spacing['2xl'] + spacing.sm;
}
/** Which semantic slot the label and trailing mark take, per variant. */
const LABEL_TONE = {
    primary: 'onPrimary',
    secondary: 'primaryText',
    ghost: 'onSurface',
    outline: 'onSurface',
    soft: 'primaryText',
    link: 'primaryText',
    elevated: 'onSurface',
};
/** Label step per control size. */
const LABEL_SIZE = {
    sm: 'sm',
    md: 'base',
    lg: 'base',
};
/**
 * **V4 onboarding CTA** — the shape every screen in the funnel ends on.
 *
 * Same props as {@link GetStartedButton} plus `trailing` and `raised`, and the
 * same job: pin §5's treatment — full width, `radius.full`, semibold label,
 * a trailing mark — into one place so no screen re-specifies it.
 *
 * ## Four changes
 *
 * 1. **The height comes off the scale.** The base pinned `56`. A seed that
 *    tightens `spacing` moved every field on the screen and left the CTA at 56,
 *    so the funnel's control family quietly split in two. `2xl + sm` is the
 *    same 56 on the default scale and stays proportional on any other.
 * 2. **The trailing mark is a slot, not a boolean.** `trailingArrow` could say
 *    "arrow" or "nothing"; the reference paywall ends its CTA in a sparkle,
 *    which is neither. `trailing` takes any node and `trailingArrow` still
 *    decides when it is omitted, so no existing caller moves.
 * 3. **The label takes a contrast-corrected tone.** The base painted the
 *    outlined and quiet variants' labels `primary` — a **fill** slot the
 *    compiler promises nothing about as ink on `surface`, and measurably as
 *    low as 1.3:1 on a pale seed. `primaryText` is that same colour pulled
 *    until it clears AA.
 * 4. **It is raised.** The CTA is pinned over scrolling content and is the one
 *    control on the screen that really is above the page.
 *
 * `disabled` is the same shape at `ButtonV4`'s reduced opacity — never a
 * different shape, or the button appears to move when it enables. The hero
 * treatment applies at `size="lg"` (the default); `sm`/`md` fall back to
 * `ButtonV4`'s own compact geometry for the rare inline use.
 */
function GetStartedButtonV4({ onPress, label = 'Get started', variant = 'primary', size = 'lg', trailingArrow = true, trailing, raised = true, accessibilityLabel, loading = false, disabled = false, fullWidth = true, style, }) {
    const { tokens, elevation } = (0, theme_1.useXenitionTheme)();
    // Only the hero size takes the §5 bar; an `sm`/`md` caller wanted a small
    // button and should keep getting one.
    const hero = size === 'lg';
    const tone = LABEL_TONE[variant];
    const mark = trailing !== undefined ? (trailing) : trailingArrow ? ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "forward", size: LABEL_SIZE[size], color: tone })) : null;
    return ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: variant, size: size, loading: loading, disabled: disabled, onPress: onPress, accessibilityLabel: accessibilityLabel ?? label, style: [
            fullWidth ? { alignSelf: 'stretch' } : null,
            hero
                ? {
                    height: ctaHeight(tokens.spacing),
                    paddingVertical: 0,
                    borderRadius: tokens.radius.full,
                }
                : null,
            // A disabled control that still casts a shadow reads as pressable.
            raised && !disabled ? (0, surface_v4_1.elevationStyle)(elevation.action) : null,
            style,
        ], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.spacing.sm,
            }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: LABEL_SIZE[size], weight: "semibold", tone: tone, children: label }), mark] }) }));
}
//# sourceMappingURL=GetStartedButtonV4.js.map