import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { IconName } from '../../primitives/icon-names';
import type { MetricTileProps, MetricTileTone } from './MetricTile';
export type { MetricTileTone };
export interface MetricTileV4Props extends MetricTileProps {
    /**
     * A name from the kit's icon set, drawn in the **tinted circular badge**
     * above the label (brief §4.7 — the leading slot names a kind of thing).
     * Rendered through `IconV4 badge="soft"`, so the wash, the 44 circle and the
     * glyph's measured contrast against that wash all come from the primitive
     * that owns them, tinted from this tile's own {@link MetricTileProps.tone}.
     *
     * {@link MetricTileProps.icon} stays for parity and for callers with their
     * own artwork; it takes the same 44 slot, drawn untinted.
     */
    iconName?: IconName;
    /**
     * Whether the tile carries `elevation.card`. Default `false`, because this
     * is the **in-card** tile: brief §5 gives it `elevation.card` "only when the
     * tile is not inside another card", and §4.6 forbids nesting a shadow in a
     * shadow. Pass `true` for a tile sitting directly on the page — though a
     * stat on the page is what `StatCardV4` is for.
     */
    raised?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 metric tile** — the tile that lives *inside* a card, beside the
 * `StatCardV4` that lives on the page.
 *
 * Brief §5 keeps the pair and gives each a job: "`StatCard` is the on-page
 * card; `MetricTile` is the tile inside a card". Everything below follows from
 * that one sentence.
 *
 * 1. **The ground is `colors.card`, not `colors.surface`** (§4.2) — the most
 *    visible bug in the module was that every card in it painted the colour of
 *    the page.
 * 2. **`radius.lg` (was `md`), `spacing.md` padding, no border** (§5). A
 *    hairline box inside a hairline box is the dense admin look §3 rules out;
 *    the container owns the edge.
 * 3. **The label is above the value, `sm` and `mutedText`** — `mutedText`, not
 *    the `muted` *fill*, which the base used as a text colour and which is the
 *    exact bug the shadcn pass closed elsewhere. The base put the label at
 *    `xs` beside the icon, which made the tile read as a legend rather than as
 *    a number with a name.
 * 4. **Press feedback is the state layer** (§4.3, §1 rule 7).
 *    `opacity: pressed ? 0.8 : 1` is deleted, not translated: dimming fades the
 *    tile's own *content*, which is the signal M3 spends `0.38` on to mean
 *    disabled, so a pressed tile and a dead one looked alike. `pressOver`
 *    tints the container instead and leaves the content at full strength, and
 *    it is given the **opaque** `card` / `onCard` pair because the value's
 *    contrast is a promise about that fill — a translucent layer would make
 *    the promise depend on whatever happened to be behind the tile.
 * 5. **The glyph became a badge** (§4.7), and no shadow by default (§4.6).
 *
 * Composes `CardV4`, `TextV4` and `IconV4` (§10.5). Renders **nothing** when it
 * has neither a label nor a value (§4.5) — never a blank bordered box.
 */
export declare function MetricTileV4({ label, value, icon, iconName, tone, onPress, raised, style, }: MetricTileV4Props): React.ReactElement | null;
//# sourceMappingURL=MetricTileV4.d.ts.map