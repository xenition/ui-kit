import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { GridV4 } from '../layout/GridV4';
import { StatCardV4, type StatCardV4Props } from './StatCardV4';

/**
 * How many KPIs sit across one row.
 *
 * **Capped at 3, in the type.** Brief §3 and §5 are explicit: two per row on a
 * phone, never four, never a bordered six-cell grid — four KPIs across a phone
 * is the admin-panel look this pass exists to remove. A cap enforced by the
 * compiler is a cap that holds; a cap enforced by a comment is a suggestion.
 */
export type KpiRowV4Columns = 2 | 3;

export interface KpiRowV4Props {
  /** The stat cards to lay out. Renders nothing when empty. */
  items: StatCardV4Props[];
  /**
   * Cards per row. Default `2` — §3's "two per row on a phone". `3` is the
   * ceiling; see {@link KpiRowV4Columns}.
   */
  columns?: KpiRowV4Columns;
  /**
   * Minimum width a card may shrink to, in px.
   *
   * **Accepted for parity with the web twin and deliberately inert here.**
   * React Native has no CSS grid and no container queries, so `GridV4` on this
   * platform degrades the prop to its `columns` behaviour — the divergence is
   * documented on `GridV4` itself. Passing it from shared code is therefore
   * always safe and never changes this layout.
   */
  minItemWidth?: number;
  /**
   * Whether the cards carry `elevation.card`. Default `true` — a KPI strip
   * sits on the page (brief §5's dashboard order: summary metrics first, above
   * the section cards).
   *
   * Pass `false` when the strip is **inside** a card: §4.6 forbids nesting a
   * shadow in a shadow, and a `StatCard` inside a `SectionCard` is flat. An
   * item's own `raised` still wins, so one card in the strip can differ.
   */
  raised?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * **V4 KPI row** — the summary strip at the top of a dashboard.
 *
 * shadcn's dashboard blocks confirm the composition order this component sits
 * in — navigation, then summary metric cards, then a chart, then a table — so
 * a `KpiRowV4` belongs above the section cards, not among them.
 *
 * Three changes, and the first is the reason the file exists.
 *
 * 1. **`flexBasis: '44%'` is gone.** Brief §1 names it a literal to remove,
 *    and it was doing the job of a column count by arithmetic: "44% plus a
 *    gap, so two fit and a third cannot" is a magic number that quietly
 *    becomes three-up the moment the gutter changes. V4 states the intent
 *    instead — `GridV4` with `columns`, on §4.1's `md` grid gutter.
 * 2. **`columns` is capped at 3** (§3, §5). See {@link KpiRowV4Columns}.
 * 3. **An empty strip renders `null`, not an empty flex box** (§4.5, and §5
 *    names it for this component specifically). The base returned a `View`
 *    with a gap on it, which on a screen laid out with `Column gap="xl"`
 *    leaves a 32px hole where nothing is — an empty component denting the
 *    page.
 *
 * The cards themselves are `StatCardV4`, so everything §3 decided about a stat
 * — the `card` ground, the `3xl` value, the trend glyph — arrives here by
 * composition rather than by being restated (§10.5).
 */
export function KpiRowV4({
  items,
  columns = 2,
  minItemWidth,
  raised = true,
  style,
}: KpiRowV4Props): React.ReactElement | null {
  // Nothing to show, so nothing is drawn — not an empty box with a gutter
  // (§4.5). The guard is before the grid so the screen's own rhythm closes up.
  if (items.length === 0) return null;

  // Belt and braces for a JavaScript caller the `2 | 3` type cannot reach.
  const tracks: KpiRowV4Columns = columns === 3 ? 3 : 2;

  return (
    <GridV4 columns={tracks} gap="md" minItemWidth={minItemWidth} style={style}>
      {items.map((item, i) => (
        <StatCardV4 key={`${item.label}-${i}`} raised={raised} {...item} />
      ))}
    </GridV4>
  );
}
