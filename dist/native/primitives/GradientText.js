"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradientText = GradientText;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const color_1 = require("../../theme/color");
const compile_1 = require("../../theme/compile");
/**
 * Ramp-driven emphasis text — the native mirror of the web `GradientText`.
 *
 * React Native has no `background-clip: text`, so true clipped-gradient text
 * requires a `MaskedView` + `expo-linear-gradient` composition. The kit does
 * **not** pull in `@react-native-masked-view/masked-view`, so native paints a
 * solid instead — but a solid taken **from the brand gradient**, not from a
 * ramp step chosen by hand.
 *
 * This component predates `gradient.brand`. It used to paint
 * `tokens.ramps.primary[500]`, which is wrong twice over: `ramps` carries the
 * LIGHT orientation in both schemes, so the "energy word" on a dark page was
 * lit by a light-mode colour; and step 500 is a fill step whose contrast
 * against the page nobody had measured, on text whose entire job is to be read.
 *
 * Now the colour comes from `gradient.brand` — the compiler's own
 * primary→accent sweep, already resolved for the active scheme — run through
 * {@link gradientInk} against the page. The usual call asks "what ink reads on
 * this gradient"; here the gradient IS the ink and the page is what it has to
 * clear, so both extremes are the surface: step 2 collapses, and step 3 walks
 * each stop in lightness until it clears AA on the ground it is actually
 * printed on. Under `depth: 'flat'` the two stops are already the same colour,
 * so a flat seed lands on a flat brand colour with no branch here.
 *
 * `angle` is accepted for parity and has no visual effect; there is no sweep to
 * angle. (`expo-linear-gradient` is used for real gradient *surfaces* — e.g.
 * the commerce cover placeholder.)
 */
function GradientText({ ramp = 'primary-accent', angle: _angle, style, children, }) {
    const { colors, gradient } = (0, theme_1.useXenitionTheme)();
    // The ink cannot move — it is the page — so both extremes are the ground and
    // the stops are what gets walked.
    const brand = (0, v4_depth_1.gradientInk)(gradient.brand, colors.surface, {
        darkest: colors.surface,
        lightest: colors.surface,
    });
    // A ramp name picks WHERE on the legible sweep the solid is taken from.
    const picked = ramp === 'primary'
        ? brand.from
        : ramp === 'accent'
            ? brand.to
            : (0, v4_depth_1.mixToken)(brand.from, brand.to, 0.5);
    // Two colours that each clear AA can still average into one that does not.
    const color = (0, color_1.ensureContrast)(picked, colors.surface, compile_1.MIN_CONTRAST);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "text", style: [{ color, fontWeight: '700' }, style], children: children }));
}
//# sourceMappingURL=GradientText.js.map