"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerHintV4 = ControllerHintV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const arcade_v4_1 = require("./internal/arcade-v4");
/**
 * The key cap's floor, off the spacing scale, plus the type step the glyph is
 * set in. A *floor*, not a fixed box: the glyph scales with Dynamic Type and
 * the cap grows with it.
 */
const CAP = {
    sm: { min: 'lg', text: 'xs' },
    md: { min: 'xl', text: 'sm' },
};
/**
 * **V4 controller hint** — the same props as {@link ControllerHint}.
 *
 * ## Three changes
 *
 * 1. **The spoken order matches the drawn order.** The name was
 *    `` `${action}: ${button}` `` — so a sighted player read "Ⓐ Jump" and a
 *    blind one heard "Jump: A". In a HUD strip of six hints those are two
 *    different mappings to memorise, and the strip is exactly the surface
 *    where a player is reading fast. The parts are joined the module's way now
 *    — a comma, which a reader pauses on, rather than a colon it either reads
 *    out loud or swallows.
 * 2. **The key cap scales with Dynamic Type.** It was `allowFontScaling={false}`
 *    inside a 20 or 26 pixel box, so a player who had turned text size up got
 *    every label in the app bigger except the one telling them which button to
 *    press. The glyph scales, and the cap is a minimum with padding rather
 *    than a fixed square, so it grows instead of clipping.
 * 3. **The cap's geometry comes off the scale** rather than being typed as 20
 *    and 26, which are not steps on anything.
 *
 * `inline` is documented as a HUD strip that sits in a caller's own layout, so
 * this component deliberately pays **no safe-area inset** — the inset belongs
 * to whatever pins the strip to the bottom of the screen, and paying it twice
 * floats a HUD off its own edge.
 *
 * **Renders nothing without at least one hint.**
 */
function ControllerHintV4({ button, action, hints, variant = 'pill', size = 'md', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const sz = CAP[size];
    const cap = tokens.spacing[sz.min];
    const list = hints && hints.length > 0 ? hints : button != null ? [{ button, action: action ?? '' }] : [];
    if (list.length === 0)
        return null;
    const renderHint = (hint, key) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "text", 
        // Change 1: cap first, then what it does — the order it is drawn in.
        accessibilityLabel: (0, arcade_v4_1.spokenLine)([hint.button, hint.action]), style: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            ...(variant === 'pill'
                ? {
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                    borderRadius: tokens.radius.full,
                    paddingVertical: tokens.spacing.xs / 2,
                    paddingHorizontal: tokens.spacing.sm,
                }
                : null),
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    minWidth: cap,
                    minHeight: cap,
                    paddingHorizontal: tokens.spacing.xs,
                    paddingVertical: tokens.spacing.xs / 2,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: sz.text, weight: "bold", tone: "onPrimary", align: "center", children: hint.button }) }), hint.action ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: sz.text, tone: "onSurface", children: hint.action })) : null] }, key));
    if (list.length === 1) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: renderHint(list[0], 'h0') });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm },
            style,
        ], children: list.map((h, i) => renderHint(h, `h${i}`)) }));
}
//# sourceMappingURL=ControllerHintV4.js.map