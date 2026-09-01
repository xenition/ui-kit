"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthBrandTileV4 = AuthBrandTileV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("./cn");
const IconV4_1 = require("./IconV4");
/*
  §10.1 permits geometric literals, but a *composed* size is better than a
  permitted one: these are the same 56 and 72 at the default scale, derived
  from the seed's spacing so they move when it moves.

  Spelled out as whole Tailwind classes rather than assembled from parts,
  because Tailwind's content scanner reads source text — an interpolated class
  never reaches the generated CSS. The native twin composes the identical sums
  from `tokens.spacing`, and both twins' specs assert the arithmetic.
*/
const TILE_BOX = {
    md: 'h-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))] w-[calc(var(--xen-space-2xl)_+_var(--xen-space-sm))]',
    lg: 'h-[calc(var(--xen-space-2xl)_+_var(--xen-space-lg))] w-[calc(var(--xen-space-2xl)_+_var(--xen-space-lg))]',
};
/**
 * The type step the mark takes inside each square.
 *
 * Both land at roughly 43% of the square, which is where a mark reads as
 * centred in its tile rather than as a glyph that happens to be inside a box.
 * `md`/`2xl` is exactly what the base draws, so the §9 tile is unchanged.
 */
const GLYPH_STEP = { md: '2xl', lg: '3xl' };
/**
 * Silhouette per shape.
 *
 * `50%` rather than `rounded-full`, because the preset's `full` resolves to
 * `var(--xen-radius-full)` and a `sharp` seed compiles that to `0` — the disc
 * would silently become a square on exactly the seed least likely to want one.
 * A ratio is geometry, which §10.1 allows.
 */
const SHAPE_CLASS = {
    rounded: 'rounded-[var(--xen-radius-lg)]',
    circle: 'rounded-[50%]',
};
function AuthBrandTileV4({ glyph, name, align = 'left', size = 'md', shape = 'rounded', 'aria-label': ariaLabel, className, }) {
    // §12 / §10.6 — no mark, no box. Not an empty square, not a placeholder.
    if (!glyph && !name)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { "data-xen-v4-brand-tile": "", "data-shape": shape, "data-size": size, className: (0, cn_1.cn)('flex shrink-0 items-center justify-center bg-primary', SHAPE_CLASS[shape], TILE_BOX[size], 
        /*
          `self-*` only does anything when the parent happens to be a flex
          container, which is how the base drew it — so a tile dropped into a
          plain block never centred at all. The auto margins work in both, and
          the pair together means the tile lands where `align` says it does
          regardless of what it was placed inside.
        */
        align === 'center' ? 'mx-auto self-center' : 'mr-auto self-start', className), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, name: name, size: GLYPH_STEP[size], color: "onPrimary", "aria-label": ariaLabel }) }));
}
//# sourceMappingURL=AuthBrandTileV4.js.map