"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EyebrowV4 = EyebrowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const identity_v4_1 = require("./internal/identity-v4");
const color_1 = require("../../theme/color");
const compile_1 = require("../../theme/compile");
/**
 * The **text** form of each tone, not the fill.
 *
 * `primary` and `accent` are the colours you paint a button with; the compiler
 * guarantees `onPrimary` reads on `primary`, and guarantees nothing at all
 * about `primary` reading on `surface`. `primaryText` is the same hue walked in
 * lightness until it clears AA there, which is exactly what an eyebrow needs.
 */
const TONE = {
    primary: 'primaryText',
    accent: 'accentText',
    muted: 'muted',
};
/**
 * **V4 eyebrow** — same props as {@link Eyebrow}, a different design line.
 *
 * The eyebrow is the smallest type in the kit — 12px, bold, uppercase — which
 * makes it the last place that can afford a colour nobody measured. The base
 * one used `colors.primary` and `colors.accent` **as ink**. Those are fill
 * slots: the compiler promises `onPrimary` reads on `primary`, and promises
 * nothing about `primary` reading on `surface`. `muted` is `neutral[600]` with
 * no promise either. V4 takes the contrast-safe text forms the compiler already
 * builds for this exact case, and walks `muted` to AA as well.
 *
 * Two more things:
 *
 * - **The twins agree on tracking.** Native tracked at `2px` (0.167em at the
 *   `xs` step) and the web at `0.22em`, so the same eyebrow was a different
 *   width on a phone and on a laptop. Both now derive from one ratio.
 * - **The flanking rule stops competing.** Drawn in the label's own colour and
 *   weight, a tick either side reads as part of the word. In V4 it drops to the
 *   `border` hairline: it frames the label instead of shouting alongside it
 *   (§6 — hierarchy before styling; §7 — subtraction before addition).
 *
 * There is no gradient and no container. An eyebrow is typography doing the
 * work a card would otherwise be asked to do (§10), and §35.11 keeps the brand
 * sweep for the hero and the one primary action.
 */
function EyebrowV4({ tone = 'accent', rule = false, align = 'start', style, children, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // `muted` is `neutral[600]`; the compiler guarantees the on-pairs, not this.
    const color = (0, color_1.ensureContrast)(colors[TONE[tone]], colors.surface, compile_1.MIN_CONTRAST);
    const size = tokens.typography.scale.xs;
    const tick = ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: {
            width: tokens.spacing.lg,
            height: 1,
            // A frame, not a second voice.
            backgroundColor: colors.border,
        } }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: align === 'center' ? 'center' : 'flex-start',
            gap: tokens.spacing.xs,
        }, children: [rule ? tick : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [
                    {
                        color,
                        fontSize: size,
                        fontFamily: tokens.typography.fontHeading,
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        // Caps at 12px lose the word-shape a reader scans by; tracking is
                        // the repair, and it is the same ratio the web twin uses.
                        letterSpacing: size * identity_v4_1.EYEBROW_TRACKING,
                    },
                    style,
                ], children: children }), rule ? tick : null] }));
}
//# sourceMappingURL=EyebrowV4.js.map