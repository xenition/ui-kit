import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { IconName } from '../../primitives/icon-names';
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
    style?: StyleProp<ViewStyle>;
}
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
 *    accent ring plus a tinted surface plus the a11y selected state — two
 *    colour channels and one channel a sighted reader cannot see. V4 adds a
 *    **checkmark**, which is M3's filter-chip behaviour and HIG's option-list
 *    rule: a selected option shows a mark, not just a shade.
 * 4. **The selected ground is the `selected` token**, not a hand-mixed tint.
 *    The base composed `withAlpha(colors.primary, 0.1)`; `selected` /
 *    `onSelected` is the pair the shadcn pass added for "the selected-row
 *    container", and it is a *pair*, so the label on it carries a measured
 *    contrast promise that a 10% wash of the brand does not.
 * 5. **The tile clears the tap floor.** `minTap()` (44) on the chip, and the
 *    tile keeps its taller block. The base's chip was `spacing.sm` around a
 *    `sm` label, which lands around 32.
 * 6. **Press feedback is the state layer** (§4.3). `opacity: pressed ? 0.85`
 *    is deleted rather than translated: dimming fades the tile's own content,
 *    which is the signal M3 spends `0.38` on to mean *disabled*. `pressOver`
 *    is given the opaque pair the tile actually wears.
 *
 * Composes `CardV4`, `IconV4` and `TextV4` (rule 7). Renders **nothing** when
 * it has neither a label nor a mark (§4.5) — never a blank bordered box.
 */
export declare function CategoryTileV4({ label, glyph, iconName, count, selected, onPress, variant, style, }: CategoryTileV4Props): React.ReactElement | null;
//# sourceMappingURL=CategoryTileV4.d.ts.map