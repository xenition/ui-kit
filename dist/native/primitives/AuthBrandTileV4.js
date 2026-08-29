"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthBrandTileV4 = AuthBrandTileV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("./IconV4");
/**
 * The type step the mark takes inside each square.
 *
 * Both land at roughly 43% of the square, which is where a mark reads as
 * centred in its tile rather than as a glyph that happens to be inside a box.
 * `md`/`2xl` is exactly what the base draws, so the §9 tile is unchanged.
 */
const GLYPH_STEP = { md: '2xl', lg: '3xl' };
function AuthBrandTileV4({ glyph, name, align = 'left', size = 'md', shape = 'rounded', accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // §12 / §10.6 — no mark, no box. Not an empty square, not a placeholder.
    if (!glyph && !name)
        return null;
    /*
      The same sums the web twin spells out as Tailwind classes: 56 and 72 at the
      default scale, derived from the seed's spacing rather than typed, so a
      re-scaled seed re-scales the tile with everything else on the screen.
    */
    const box = size === 'lg'
        ? tokens.spacing['2xl'] + tokens.spacing.lg
        : tokens.spacing['2xl'] + tokens.spacing.sm;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                width: box,
                height: box,
                borderRadius: shape === 'circle' ? box / 2 : tokens.radius.lg,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.primary,
                alignSelf: align === 'center' ? 'center' : 'flex-start',
            },
            style,
        ], children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, name: name, size: GLYPH_STEP[size], color: "onPrimary", accessibilityLabel: accessibilityLabel }) }));
}
//# sourceMappingURL=AuthBrandTileV4.js.map