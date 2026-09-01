import * as React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { minTap } from '../primitives/internal/nav-v4';
import {
  CHART_MARK,
  type ChartIndicatorV4,
  type ChartToneV4,
} from '../../primitives/internal/v4-chart';
import { ChartEmptyV4, chartSlotColor, useChartPaletteV4 } from './internal-v4';

/**
 * The status families a legend entry may opt into.
 *
 * §4.3: `tone` is the **only** way a component in this module paints a status
 * hue, and rule 3 is the reason the list is these three and not the whole
 * `SemanticColors` keyset the base took. An entry with no `tone` wears its
 * slot, which is what "fourth" looks like; an entry with a `tone` means good or
 * bad and says so in its label too.
 *
 * An **alias for the shared `ChartToneV4`**, not a second declaration. Each of
 * the bar-family files declared this list independently while
 * `primitives/internal/v4-chart.ts` was closed to the build groups; the name
 * stays exported so no call site or barrel entry moves, but there is one type
 * behind all of them now, and a member added to the canonical list reaches
 * every component at once.
 */
export type LegendV4Tone = ChartToneV4;

export interface LegendV4Item {
  /** The series name. Never truncated — see the component doc. */
  label: string;
  /**
   * React key and stable identity. Falls back to the index.
   *
   * Arrived with the consolidation pass: the line family's stand-in legend
   * keyed on it, and keying a legend on its array index makes a filtered
   * dashboard re-mount every row it kept.
   */
  key?: string;
  /**
   * The categorical slot to draw the swatch from. **Defaults to the row's
   * index**, which is the normal case and the one §4.3 describes.
   *
   * It is a prop at all because a chart that has already resolved its own
   * slots — a pie that sorted and folded, a radar whose rows came from a
   * `series` array — needs the legend to agree with the plot rather than
   * recount from zero. Passing it never cycles: it goes through
   * `chartSlotColor`, which still throws past the fifth slot.
   */
  slot?: number;
  /**
   * Opt this entry into a status hue instead of its categorical slot.
   * Use only where the series genuinely *means* good or bad (rule 3).
   */
  tone?: LegendV4Tone;
  /**
   * An optional readout beside the label — a total, a share, a last value.
   * Drawn `mutedText`.
   */
  value?: string;
}

export interface LegendV4Props {
  /** The series, in slot order. Position is the slot; the array is not re-sorted. */
  items: LegendV4Item[];
  /** Stack vertically instead of wrapping in a row. */
  vertical?: boolean;
  /**
   * The swatch's shape — shadcn's tooltip vocabulary (§4.6), reused here.
   *
   * `'dot'` (the default) is the right answer for every form whose mark is a
   * fill: a bar, a stack, a slice, a cell. `'line'` and `'dashed'` exist for
   * the line family, where a key that draws a dot for a series painted as a
   * stroke is a key for a different chart.
   */
  indicator?: ChartIndicatorV4;
  /**
   * Make each entry a control that toggles its series.
   *
   * **Default `false`** — brief §7 open question 1 proposed exactly that ("yes,
   * behind `interactive`, default `false`, so nothing existing moves") and this
   * component implements the proposal.
   */
  interactive?: boolean;
  /** Controlled set of hidden series indices. Omit for uncontrolled. */
  hidden?: readonly number[];
  /** Initially hidden series indices, when uncontrolled. */
  defaultHidden?: readonly number[];
  /** Called with the entry's index and its **new** hidden state. */
  onToggle?: (index: number, hidden: boolean) => void;
  /** What the empty state says. */
  emptyLabel?: string;
  /** Override the derived accessible sentence (rule 6). */
  accessibilityLabel?: string;
  /**
   * The root's test id. Defaults to `'legend'`.
   *
   * A prop because native has one `testID` per view where the web twin can
   * carry two attributes, and the charts that used to draw their own legend
   * marked it `'xen-v4-chart-legend'` — the module-wide hook. Rather than
   * rename either spelling, a host that wants the module hook asks for it.
   */
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * **V4 legend** — the identity channel's redundancy, and on that argument the
 * most important component in the module.
 *
 * ## Why a legend is not decoration here
 *
 * `v4-chart.ts` records the measurement that decides this: the palette's worst
 * adjacent CVD ΔE is **6.5**, which lands inside the `dataviz` validator's 6–8
 * floor band rather than above the 8 target. That band is legal **only with
 * secondary encoding**. Eight slots clearing ΔE 8 for every possible brand hue
 * is not reachable by rotation from a single hue — that was measured, not
 * assumed — so the palette takes the band and the module pays for it in
 * redundancy. A legend is one of the four channels named in rule 5, and it is
 * the only one available to *every* form.
 *
 * Which is to say: a chart in this line that drops its legend is not a tidier
 * chart, it is a chart that has moved out of the band its palette was validated
 * in.
 *
 * ## Three things the base got wrong
 *
 * 1. **The swatch was `width: 10, height: 10`** — a literal, named in brief §1
 *    rule 1 as a violation. It is now `CHART_MARK.dotSize` (8), *imported*,
 *    which is the size a scatter or line dot is painted at. A key whose swatch
 *    is a different size from the mark it stands for is a key for a different
 *    chart.
 * 2. **The colour came from `colors[item.color ?? 'primary']`** — any semantic
 *    slot, so a caller distinguished series by reaching for `warn` and `danger`
 *    as identities, which is exactly what rule 3 reserves them against. It is
 *    now `chartSlotColor`, which **throws** past the fifth slot rather than
 *    wrapping. A legend is the last place a wrap should be tolerated, because
 *    the legend is the thing a reader consults to resolve exactly the ambiguity
 *    a wrap creates.
 * 3. **`opacity` was a prop.** It existed so a caller could distinguish series
 *    within one hue, and it is retired everywhere in this pass. A drained
 *    swatch does not read as "another series"; it reads as disabled, because
 *    0.38 alpha is precisely what disabled content is drawn at in this kit.
 *
 * ## Labels are never truncated
 *
 * There is no `numberOfLines` and no `maxWidth` in this component, and that is
 * a decision rather than an omission. A clipped legend label — "Organic sear…"
 * — is an unreadable identity, and an unreadable identity is worse than no
 * legend at all, because the reader believes the chart has told them something.
 * Long labels **wrap**; a legend that needs two lines takes two lines. The fix
 * for a legend that is too tall is a shorter series name or `vertical`, not a
 * narrower one.
 *
 * ## Interaction
 *
 * With `interactive` off (the default) the legend is a single image with one
 * derived sentence naming every series — rule 6's textual representation, which
 * reads far better than five separate swatch/label pairs.
 *
 * With `interactive` on each entry is a `Pressable` with
 * `accessibilityRole="button"` and an `accessibilityState.selected` that
 * carries the hidden state, so the toggle is *announced* and not only drawn.
 * The row's minimum height is `minTap(spacing)` — the same `2xl - xs` = 44 a
 * tab, a page number and a `ButtonV4` land on (rule 10), imported rather than
 * retyped so the kit still has exactly one 44. The painted swatch stays 8.
 *
 * Toggling is the caller's data change: this component reports, it does not
 * filter anyone's series, and `hidden` may be controlled.
 */
export function LegendV4({
  items,
  vertical = false,
  indicator = 'dot',
  interactive = false,
  hidden,
  defaultHidden,
  onToggle,
  emptyLabel = 'No series',
  accessibilityLabel,
  testID = 'legend',
  style,
}: LegendV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const palette = useChartPaletteV4();
  const [internal, setInternal] = React.useState<readonly number[]>(defaultHidden ?? []);
  const active = hidden ?? internal;

  if (items.length === 0) {
    // §4.5: never a bare string and never `null`. The shared `ChartEmptyV4` in
    // `internal-v4.tsx` is the one implementation of that rule; this was a
    // local copy, written while that module was closed to the build groups.
    //
    // No footprint to keep — a legend has no plot height — and the centring
    // the shared component defaults to is overridden back to `stretch`,
    // because a legend's rows are left-aligned and a centred "No series" would
    // be the only line in the component that is not.
    return (
      <ChartEmptyV4
        label={emptyLabel}
        style={[{ alignItems: 'stretch' }, style]}
      />
    );
  }

  const label = accessibilityLabel ?? `Legend: ${items.map((item) => item.label).join(', ')}.`;

  const toggle = (index: number): void => {
    const next = !active.includes(index);
    if (hidden === undefined) {
      setInternal(next ? [...active, index] : active.filter((i) => i !== index));
    }
    onToggle?.(index, next);
  };

  const row: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.sm,
  };

  return (
    <View
      testID={testID}
      accessibilityRole={interactive ? undefined : 'image'}
      accessibilityLabel={interactive ? undefined : label}
      style={[
        {
          flexDirection: vertical ? 'column' : 'row',
          flexWrap: vertical ? 'nowrap' : 'wrap',
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      {items.map((item, i) => {
        const off = active.includes(i);
        // Resolved before the hidden check on purpose: a sixth untoned series
        // must throw whether or not it happens to be toggled off right now.
        const ink = off
          ? palette.grid
          : item.tone !== undefined
            ? colors[item.tone]
            : chartSlotColor(palette, item.slot ?? i);
        const swatch = (
          <View
            testID="legend-swatch"
            style={
              indicator === 'dot'
                ? {
                    width: CHART_MARK.dotSize,
                    height: CHART_MARK.dotSize,
                    borderRadius: tokens.radius.full,
                    // A hidden series drains to the grid colour — the chrome
                    // vocabulary, which is what "not part of the data right
                    // now" already means everywhere else in this module.
                    backgroundColor: ink,
                  }
                : {
                    // A rule rather than a dot, for the line family. React
                    // Native has no `strokeDasharray` on a `View`, so `dashed`
                    // is drawn by the swatch's two children below.
                    width: CHART_MARK.dotSize,
                    height: CHART_MARK.stroke,
                    flexDirection: 'row',
                    gap: CHART_MARK.gap,
                    backgroundColor: indicator === 'dashed' ? undefined : ink,
                  }
            }
          >
            {indicator === 'dashed'
              ? [0, 1].map((d) => (
                  <View
                    key={d}
                    style={{
                      width: (CHART_MARK.dotSize - CHART_MARK.gap) / 2,
                      height: CHART_MARK.stroke,
                      backgroundColor: ink,
                    }}
                  />
                ))
              : null}
          </View>
        );
        const text = (
          <>
            <TextV4 size="xs" tone={off ? 'mutedText' : 'onSurface'}>
              {item.label}
            </TextV4>
            {item.value !== undefined ? (
              // The module's direct-value marker, the same one a bar's or a
              // range's own label carries: a legend readout IS a direct label
              // for a form whose marks are too small to carry one.
              <TextV4 testID="xen-v4-chart-value" size="xs" tone="mutedText" numeric="tabular">
                {item.value}
              </TextV4>
            ) : null}
          </>
        );

        if (!interactive) {
          return (
            <View key={item.key ?? i} testID="legend-item" style={row}>
              {swatch}
              {text}
            </View>
          );
        }

        return (
          <Pressable
            key={item.key ?? i}
            testID="legend-item"
            accessibilityRole="button"
            accessibilityState={{ selected: !off }}
            accessibilityLabel={item.label}
            onPress={() => toggle(i)}
            style={[
              row,
              {
                // Rule 10's 44, composed once in the nav line and imported here.
                minHeight: minTap(tokens.spacing),
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
              },
            ]}
          >
            {swatch}
            {text}
          </Pressable>
        );
      })}
    </View>
  );
}
