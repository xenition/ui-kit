import * as React from 'react';
import type { IconName } from '../primitives/icon-names';
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
}
/** The one `<style>` id this component injects its own sheet from. Idempotent. */
export declare const METRIC_TILE_V4_STYLE_ID = "xen-v4-metric-tile-styles";
/**
 * One rule, doing two things a class bound to a token cannot do.
 *
 * **The ground.** Brief §4.2's headline fix: the tile paints `--xen-card`, not
 * `--xen-surface`. `CardV4` hard-codes `bg-surface text-on-surface` in its own
 * class list and `cn()` is a plain string join with no `tailwind-merge` behind
 * it, so passing `bg-card` in `className` would put both utilities on the
 * element and let the generated stylesheet's ordering pick — and Tailwind sorts
 * background utilities alphabetically inside the plugin, which puts `.bg-card`
 * *before* `.bg-surface` and makes the override lose. Two attributes (0-2-0)
 * beat one class (0-1-0) wherever the sheets land, which is the same trick
 * `internal/row-v4.ts` uses so that two sheets need not agree on injection
 * order.
 *
 * **The edge.** Brief §5 drops this tile's border — it sits inside a card, and
 * a hairline box inside a hairline box is the ruled, gridded look §3 rules out.
 * The border is made *transparent* rather than removed with `variant="flat"`
 * so that a raised tile and a flat one are the same size to the pixel: the 1px
 * still occupies its space, it simply paints nothing.
 *
 * `V4_STATE_CSS`'s hover/press selectors carry three pseudo-classes on top of
 * their attribute, so the state layer still wins over this ground — which is
 * the intended order: the layer is *meant* to tint the card.
 */
export declare const METRIC_TILE_V4_CSS = "\n[data-xen-v4-card][data-xen-v4-metric-tile] {\n  background-color: var(--xen-card);\n  color: var(--xen-on-card);\n  border-color: transparent;\n}\n";
/**
 * **V4 metric tile** — the tile that lives *inside* a card, beside the
 * `StatCardV4` that lives on the page.
 *
 * Brief §5 keeps the pair and gives each a job: "`StatCard` is the on-page
 * card; `MetricTile` is the tile inside a card". Everything below follows from
 * that one sentence.
 *
 * 1. **The ground is `card`, not `surface`** (§4.2). The most visible bug in
 *    the module was that every card in it painted the colour of the page.
 * 2. **The value's ink is a `*Text` slot** (§5). The web twin coloured it with
 *    the fill and measured 2.32:1; native fixed this and web is only now
 *    catching up. See {@link TONE_TEXT}.
 * 3. **`radius.lg`, `spacing.md` padding, no border** (§5). A hairline box
 *    inside a hairline box is the dense admin look §3 rules out; the container
 *    owns the edge.
 * 4. **The label is above the value, `sm` and `mutedText`** — `mutedText`, not
 *    the `muted` *fill*, which carries no contrast promise as ink. The base put
 *    the label at `xs` beside the icon, which made the tile read as a legend
 *    rather than as a number with a name.
 * 5. **Press feedback is the state layer** (§4.3, §1 rule 7).
 *    `transition-opacity hover:opacity-80` is deleted, not translated: dimming
 *    fades the tile's own *content*, which is the signal M3 spends `0.38` on to
 *    mean disabled, so a hovered tile and a dead one looked alike. The layer
 *    tints the container and leaves the content at full strength, and it is
 *    given the **opaque** `card`/`onCard` pair because the value's contrast was
 *    measured against that fill.
 * 6. **The glyph became a badge** (§4.7), and no shadow by default (§4.6).
 *
 * Composes `CardV4`, `TextV4` and `IconV4` (§10.5). Renders **nothing** when it
 * has neither a label nor a value (§4.5) — never a blank bordered box.
 */
export declare const MetricTileV4: React.ForwardRefExoticComponent<MetricTileV4Props & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=MetricTileV4.d.ts.map