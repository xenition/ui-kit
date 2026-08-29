"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BleedV4 = BleedV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * **V4 bleed** — the inverse of `Inset`: token-bound *negative* margins that
 * let content break out of a padded parent (a full-bleed image, an
 * edge-to-edge row) without the parent having to drop its gutter.
 *
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §5 calls the base *"already the cleanest file
 * in the module"* and asks for exactly one addition, which is the whole of the
 * change here: **`edge`**. A horizontally scrolling strip — `FilterChips`, a
 * card carousel — has to bleed only its trailing side. Bleeding both, which is
 * all the base can do, pulls the *first* chip under the screen edge as well,
 * so the strip opens already looking scrolled and its first item is clipped.
 * Bleeding one side keeps the strip's leading edge on the page gutter (§4.1,
 * `spacing.lg`) while the last item can still be scrolled fully into reach.
 *
 * Everything else is unchanged and deliberately so: the default `edge="both"`
 * renders exactly what `Bleed` renders today, so upgrading an import cannot
 * move a pixel. No colour, no radius, no type — every margin is a value from
 * the compiled spacing scale, negated. The leading `-` is a sign, not a
 * measurement; the measurement is the token.
 */
function BleedV4({ space = 'md', horizontal, vertical, edge = 'both', style, children, ...rest }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const inline = tokens.spacing[horizontal ?? space];
    const inlineStyle = edge === 'both'
        ? { marginHorizontal: -inline }
        : edge === 'start'
            ? { marginStart: -inline }
            : { marginEnd: -inline };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            { ...inlineStyle, marginVertical: -tokens.spacing[vertical ?? space] },
            style,
        ], ...rest, children: children }));
}
//# sourceMappingURL=BleedV4.js.map