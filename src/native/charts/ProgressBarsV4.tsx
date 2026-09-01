import * as React from 'react';
import { Animated, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { rowMetrics } from '../dashboard/internal/row-v4';
import { CHART_MARK } from '../../primitives/internal/v4-chart';
import { ChartEmptyV4, chartSlotColor, useChartPaletteV4, useChartValueV4 } from './internal-v4';
import type { LegendV4Tone } from './LegendV4';

export interface ProgressBarsV4Item {
  /** The row's name. Truncates to one line, as every row title in the kit does. */
  label: string;
  /** The row's value, measured against `max`. */
  value: number;
  /**
   * Opt this row into a status hue instead of slot 1.
   * Use only where the row genuinely *means* good or bad (rule 3).
   */
  tone?: LegendV4Tone;
  /** The row's supporting line — "3 of 12 done", "up 4 this week". */
  caption?: string;
}

export interface ProgressBarsV4Props {
  /** The rows, in the order they should be read. This component never re-sorts. */
  items: ProgressBarsV4Item[];
  /** The value mapped to a full bar. Defaults to the largest item. */
  max?: number;
  /** Show the numeric value at the trailing end of each row. Default `true`. */
  showValues?: boolean;
  /** The descriptive headline (§4.2). */
  title?: string;
  /** The quiet line under the list. */
  caption?: string;
  /** Format a value for its trailing readout. Default `String`. */
  valueFormat?: (value: number) => string;
  /** Called when a row is pressed. Rows are already at the 44 floor (§4.3). */
  onItemSelect?: (item: ProgressBarsV4Item, index: number) => void;
  /** Show the loading placeholder at the list's footprint instead of the rows. */
  loading?: boolean;
  /** What the empty state says. */
  emptyLabel?: string;
  /** Play the entrance reveal. Default `true` (§4.7). */
  animate?: boolean;
  /** Override the derived accessible sentence (rule 6). */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * One row's bar, as its own component so the width can be an animated value.
 *
 * A hook cannot live inside the `items.map()` callback — the number of rows
 * changes with the data, and so would the number of hooks — so the row's mark
 * becomes a component and takes the hook with it.
 *
 * The width is a percentage, which is the one thing that made this fix
 * non-obvious: `Animated` cannot drive a percentage directly, so the driven
 * value is the **ratio** and `interpolate` spells it back out as `0%` to
 * `100%`. See {@link useChartValueV4} for why this is JS-driven and why that
 * costs nothing here.
 */
function ProgressFillV4({ ratio, color }: { ratio: number; color: string }): React.ReactElement {
  const progress = useChartValueV4(ratio);

  return (
    <Animated.View
      testID="progress-fill"
      style={{
        width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
        height: '100%',
        backgroundColor: color,
        borderTopRightRadius: CHART_MARK.endRadius,
        borderBottomRightRadius: CHART_MARK.endRadius,
      }}
    />
  );
}

/**
 * **V4 progress bars** — a labelled row list with a bar per row.
 *
 * ## This is a list, not a plot, and that decides almost everything
 *
 * Brief §5 Group D says it in one line — "the one chart-shaped thing that is
 * really a *list*, so it takes the row metric from
 * `LAYOUT-DASHBOARD-V4-BRIEF.md` §4.3, not a chart metric" — and the
 * consequences are worth spelling out, because every one of them is a place the
 * naive reading would have gone wrong.
 *
 * - **The row height is the row family's.** `rowMetrics(theme).twoLine` — 72,
 *   composed as `2xl + lg`, M3's two-line list container — *imported* from
 *   `dashboard/internal/row-v4.ts` rather than restated. A row carrying a title
 *   and a bar is a two-line row: the bar sits where a supporting line sits. The
 *   point of importing is that a "top channels" list inside a dashboard card
 *   and the `SettingsRow` list on the next screen must be indistinguishable as
 *   a family, and they cannot be if one of them measured its own height. The
 *   base used a bare `spacing.sm` between rows and no height at all, so its
 *   rows were shorter than every other row in the product.
 * - **The horizontal padding is `spacing.md`,** the row gutter. The list lives
 *   inside a card that is already inset by `lg`; paying the page gutter twice
 *   pushes every row's text into a narrow channel down the middle.
 * - **The accessible shape is a list.** Not `accessibilityRole="image"`, which
 *   is what the base used. Rule 6 asks every *chart* to state its value in
 *   words because a rendered plot has no text a screen reader can reach — but
 *   this component's values already *are* text, in reading order, one per row.
 *   Collapsing them into a single image with a derived sentence takes working
 *   content away and gives back a summary. So the container is a `list` with
 *   the derived sentence as its label, and each row names itself and its value.
 *   This is a decision the brief did not settle; it is the one that loses
 *   nothing.
 * - **The bar is not coloured by its own value.** §4.1: bar length already
 *   shows magnitude, and spending the identity channel on it says nothing new.
 *   Every row is slot 1 unless it carries a `tone`, which is the *only* way a
 *   status hue is painted here (rule 3, §4.3). The base's per-item `color` took
 *   any semantic slot, which is how a list of five rows ended up green, amber
 *   and red for no reason other than being third, fourth and fifth.
 *
 * ## What the bar itself is made of
 *
 * A track at `palette.grid` — chart *chrome*, the same recessive neutral the
 * grid lines take — under a fill at slot 1. The track matters: without it a
 * reader cannot see how much of the row is unfilled, and rows stop being
 * comparable, which is the entire reason the form exists.
 *
 * `CHART_MARK.endRadius` at the **data end only** (§4.4). For a horizontal bar
 * the data end is the trailing edge and the baseline is the leading edge, so
 * the corners are rounded on the right and square on the left. A fill rounded
 * at both ends floats off its own zero.
 *
 * The bar's thickness is `CHART_MARK.dotSize` — the module's smallest painted
 * mark, reused rather than a new number, which is also why it is not a prop: a
 * list whose rows have different bar weights is not one list.
 *
 * ## Why it does not compose `MiniBarV4`
 *
 * The base builds each row on `MiniBar`, and rule 8's "a V4 composite composes
 * V4 children" would point at `MiniBarV4`. It deliberately does not, for a
 * reason about the form rather than about build order: a `MiniBar` is a
 * **mark** — a fill with no track — and this row needs a track, because the
 * unfilled remainder is half of what a reader is comparing. Composing the mark
 * and then drawing a track behind it would leave the two halves of one bar
 * owned by two components.
 */
export function ProgressBarsV4({
  items,
  max,
  showValues = true,
  title,
  caption,
  valueFormat = String,
  onItemSelect,
  loading = false,
  emptyLabel = 'No data',
  animate: _animate = true,
  accessibilityLabel,
  style,
}: ProgressBarsV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const palette = useChartPaletteV4();
  const metrics = rowMetrics(theme);

  const frame: ViewStyle = { gap: tokens.spacing.md };

  const header =
    title !== undefined ? (
      <TextV4 size="base" weight="semibold">
        {title}
      </TextV4>
    ) : null;

  const footer =
    caption !== undefined ? (
      <TextV4 size="sm" tone="mutedText">
        {caption}
      </TextV4>
    ) : null;

  if (loading) {
    return (
      <View style={[frame, style]}>
        {header}
        <SkeletonV4 variant="text" lines={Math.max(items.length, 1)} />
        {footer}
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={[frame, style]}>
        {header}
        {/*
          §4.5: never a bare string, never `null`. The shared `ChartEmptyV4` in
          `internal-v4.tsx` is the one implementation of that rule; this was a
          local copy, written while that module was closed to the build groups.

          A `minHeight` rather than a `height`, because this is the one member
          of the module that is really a list (§5 Group D): it has no plot with
          a height of its own, so the placeholder reserves one row instead of a
          plot.
        */}
        <ChartEmptyV4 label={emptyLabel} minHeight={metrics.twoLine} />
        {footer}
      </View>
    );
  }

  const finite = items.map((i) => i.value).filter(Number.isFinite);
  const ceiling = max ?? (finite.length > 0 ? Math.max(...finite) : 0);

  const label =
    accessibilityLabel ??
    `${title ?? 'Progress'}, ${items.length} ${items.length === 1 ? 'row' : 'rows'}, ` +
      `${items.map((i) => `${i.label} ${valueFormat(i.value)}`).join(', ')}.`;

  const rowStyle: ViewStyle = {
    // The row metric (§4.3), imported rather than restated.
    minHeight: metrics.twoLine,
    paddingHorizontal: metrics.padX,
    paddingVertical: tokens.spacing.sm,
    justifyContent: 'center',
    gap: metrics.textGap,
  };

  return (
    <View style={[frame, style]}>
      {header}
      <View accessibilityRole="list" accessibilityLabel={label}>
        {items.map((item, i) => {
          // A zero ceiling has no scale to map onto; every fill is then the
          // hairline that says "nothing yet", not a divide-by-zero.
          const ratio =
            ceiling === 0 || !Number.isFinite(item.value)
              ? 0
              : Math.min(Math.max(item.value / ceiling, 0), 1);
          const body = (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: metrics.gap }}>
                <TextV4 size="base" weight="semibold" numberOfLines={1} style={{ flex: 1 }}>
                  {item.label}
                </TextV4>
                {showValues ? (
                  <TextV4 size="sm" tone="mutedText">
                    {valueFormat(item.value)}
                  </TextV4>
                ) : null}
              </View>
              <View
                testID="progress-track"
                style={{
                  height: CHART_MARK.dotSize,
                  backgroundColor: palette.grid,
                  overflow: 'hidden',
                  // §4.4: the rounded end is the DATA end — the trailing edge
                  // for a horizontal bar. The leading edge is the baseline and
                  // stays square.
                  borderTopRightRadius: CHART_MARK.endRadius,
                  borderBottomRightRadius: CHART_MARK.endRadius,
                }}
              >
                <ProgressFillV4
                  ratio={ratio}
                  color={item.tone !== undefined ? colors[item.tone] : chartSlotColor(palette, 0)}
                />
              </View>
              {item.caption !== undefined ? (
                <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
                  {item.caption}
                </TextV4>
              ) : null}
            </>
          );

          if (onItemSelect === undefined) {
            return (
              <View key={i} testID="progress-row" style={rowStyle}>
                {body}
              </View>
            );
          }
          return (
            <Pressable
              key={i}
              testID="progress-row"
              accessibilityRole="button"
              accessibilityLabel={`${item.label}: ${valueFormat(item.value)}`}
              onPress={() => onItemSelect(item, i)}
              style={rowStyle}
            >
              {body}
            </Pressable>
          );
        })}
      </View>
      {footer}
    </View>
  );
}
