"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardV4 = CardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/** RN shadow style from the theme's card elevation. Inert when depth is flat. */
function elevationStyle(token) {
    return {
        shadowColor: token.color,
        shadowOpacity: token.opacity,
        shadowRadius: token.radius,
        shadowOffset: { width: 0, height: token.offsetY },
        elevation: token.android,
    };
}
/**
 * **V4 card** — same props as {@link Card}, a different design line.
 *
 * Three deliberate changes, and nothing else:
 *
 * 1. **A real shadow.** `elevation.card` replaces the hand-picked
 *    `shadowOpacity: 0.14` the base card carried, so depth is a seed decision
 *    made once instead of a number chosen per component — and a shadow on a
 *    dark page gets MORE opacity, not less, which the base card had no way to
 *    know.
 * 2. **A hairline that survives.** A raised surface keeps its border in V4.
 *    The base `elevated` card dropped it, which reads fine on a tinted page
 *    and dissolves entirely on a same-colour one. The edge comes from
 *    `colors.border`, which the provider has already resolved for the active
 *    scheme — unlike `tokens.ramps`, which carries the light orientation in
 *    both and would draw a near-white line on a dark page.
 * 3. **Glass, when the seed asked for it.** `depth: 'glass'` swaps the fill
 *    and the edge for the translucent pair. This is the one place a V4
 *    component reads `depth` directly: the compiler neutralises gradients and
 *    shadows for a flat seed, so those need no check, but it always builds the
 *    glass pair — a component that consumed it unconditionally would put
 *    frosted panels in an app that asked for a flat utility, which is exactly
 *    the "glassmorphism without purpose" `design.md` §8 bans.
 *
 * No card gains a gradient. §35.11 keeps that for the hero and the one primary
 * action, and a kit that tints every card is the kit §8 is describing.
 */
function CardV4({ variant = 'outlined', padding, radius, style, children, ...rest }) {
    const { colors, tokens, glass, elevation, depth } = (0, theme_1.useXenitionTheme)();
    const paddingValue = padding === undefined ? tokens.spacing.lg : padding === 'none' ? 0 : tokens.spacing[padding];
    const radiusValue = radius === undefined ? tokens.radius.lg : tokens.radius[radius];
    // The seed's one depth decision, applied once. Everything below reads these.
    const glassy = depth === 'glass';
    const fill = glassy ? glass.tint : colors.surface;
    const hairline = glassy ? glass.border : colors.border;
    // `flat` is the only variant that gives up its edge; a surface the user is
    // meant to read as a container keeps one (§11 — containers must earn their
    // existence, and an edge is how one says so).
    const bordered = variant !== 'flat';
    const raised = variant === 'elevated' || variant === 'interactive';
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                backgroundColor: fill,
                borderColor: hairline,
                borderWidth: bordered ? 1 : 0,
                borderRadius: radiusValue,
                padding: paddingValue,
            },
            raised ? elevationStyle(elevation.card) : null,
            style,
        ], ...rest, children: children }));
}
//# sourceMappingURL=CardV4.js.map