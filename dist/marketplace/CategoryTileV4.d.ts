import * as React from 'react';
import type { IconName } from '../primitives/icon-names';
import type { CategoryTileProps, CategoryTileVariant } from './CategoryTile';
export type { CategoryTileVariant };
export interface CategoryTileV4Props extends CategoryTileProps {
    /**
     * A name from the kit's icon set, drawn in the **tinted circular badge**
     * (brief §4.7 — "use one when the tile is categorical… when the leading slot
     * names *a kind of thing*"). A category tile is the textbook case for that
     * rule, which is why the badge is the tile's default treatment rather than
     * an option.
     *
     * {@link CategoryTileProps.glyph} stays as the escape hatch for a one-off
     * mark the named set has no name for, and takes the same badge. Passing
     * both, `glyph` wins — the same precedence `IconV4` itself applies.
     */
    iconName?: IconName;
}
/** The one `<style>` id this component injects its own sheet from. Idempotent. */
export declare const CATEGORY_TILE_V4_STYLE_ID = "xen-v4-category-tile-styles";
/**
 * Two rules, saying two things a class bound to a token cannot say.
 *
 * **The ground** (§4.2). The tile paints `--xen-card`, not `--xen-surface`.
 * `CardV4` hard-codes `bg-surface text-on-surface` in its own class list and
 * `cn()` is a plain string join with no `tailwind-merge` behind it, so passing
 * `bg-card` in `className` would put both utilities on the element and let the
 * generated stylesheet's ordering pick the winner. Two attributes (0-2-0) beat
 * one class (0-1-0) wherever the sheets land.
 *
 * **The selected container.** `--xen-selected` / `--xen-on-selected` is the
 * token the shadcn pass added for exactly this — "the selected-row container"
 * — and the base was hand-mixing `bg-primary-50` instead, which is a *ramp
 * step*: on a dark page `primary[50]` is a near-white, so a selected tile in
 * dark mode was a bright slab with brand-coloured text on it. The border
 * follows, because a selected tile is a container that has changed state and
 * §4.3's transition list moves fill and edge together.
 */
export declare const CATEGORY_TILE_V4_CSS = "\n[data-xen-v4-card][data-xen-v4-category-tile] {\n  background-color: var(--xen-card);\n  color: var(--xen-on-card);\n}\n[data-xen-v4-card][data-xen-v4-category-tile][data-selected=\"true\"] {\n  background-color: var(--xen-selected);\n  color: var(--xen-on-selected);\n  border-color: var(--xen-primary);\n}\n";
/**
 * **V4 category tile** — the browse-grid entry, as a card with a badge.
 *
 * Six changes, each one a rule this module was breaking:
 *
 * 1. **The ground is `card`** (§4.2). Every card in `marketplace` painted the
 *    colour of the page and leaned on a border to be visible at all, which is
 *    why a browse grid in dark mode read as a flat sheet of rectangles.
 * 2. **The glyph became the tinted circular badge** (§4.7). A category names a
 *    kind of thing, which is the exact case the badge exists for, and the
 *    badge is the same 44 circle the row family's leading slot uses — so a
 *    category in a grid and a category in a list are recognisably one object.
 * 3. **Selection is not colour alone** (rule 6). The base carried it as an
 *    accent ring plus a tinted surface plus `aria-pressed` — two colour
 *    channels and one channel a sighted reader cannot see. V4 adds a
 *    **checkmark**, which is M3's filter-chip behaviour and HIG's option-list
 *    rule: a selected option shows a mark, not just a shade.
 * 4. **The selected ground is the `selected` token**, not a ramp step. See
 *    {@link CATEGORY_TILE_V4_CSS}.
 * 5. **The tile clears the tap floor.** `MIN_TAP_CLASS` (44) on the chip, and
 *    the tile keeps its taller block. The base's chip was `py-sm` around a
 *    `text-sm` label, which lands around 32.
 * 6. **Press feedback is the state layer** (§4.3), given the opaque
 *    `card`/`onCard` (or `selected`/`onSelected`) pair, because the label's
 *    contrast promise is made against the fill the tile actually wears.
 *
 * Composes `CardV4`, `IconV4` and `TextV4` (rule 7). Renders **nothing** when
 * it has neither a label nor a mark (§4.5) — never a blank bordered box.
 */
export declare const CategoryTileV4: React.ForwardRefExoticComponent<CategoryTileV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CategoryTileV4.d.ts.map