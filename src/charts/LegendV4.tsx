import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { TextV4 } from '../primitives/TextV4';
import { MIN_TAP_CLASS } from '../primitives/internal/nav-v4';
import {
  CHART_MARK,
  type ChartIndicatorV4,
  type ChartToneV4,
} from '../primitives/internal/v4-chart';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import { CHART_GRID_VAR, ChartEmptyV4, chartVar, useChartV4 } from './internal-v4';

/**
 * The status families a legend entry may opt into.
 *
 * §4.3: `tone` is the **only** way a component in this module paints a status
 * hue, and rule 3 is the reason the list is these three and not the ten colour
 * slots. An entry with no `tone` wears its slot, which is what "fourth" looks
 * like; an entry with a `tone` means good or bad and says so in its label too.
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
   * React key and stable identity. Falls back to the label, then the index.
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
   * recount from zero. Passing it never cycles: it goes through `chartVar`,
   * which still throws past the fifth slot.
   */
  slot?: number;
  /**
   * Opt this entry into a status hue instead of its categorical slot.
   * Use only where the series genuinely *means* good or bad (rule 3).
   */
  tone?: LegendV4Tone;
  /**
   * An optional readout beside the label — a total, a share, a last value.
   * Drawn `mutedText` and in tabular figures so a column of them lines up.
   */
  value?: string;
}

export interface LegendV4Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onToggle' | 'onSelect' | 'hidden'> {
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
   * stroke is a key for a different chart — and a dashed rule is how a
   * projection or a comparison baseline says it is not measured data.
   */
  indicator?: ChartIndicatorV4;
  /**
   * Make each entry a control that toggles its series.
   *
   * **Default `false`** — brief §7 open question 1 proposed exactly that ("yes,
   * behind `interactive`, default `false`, so nothing existing moves") and this
   * component implements the proposal. An interactive legend is also a
   * different *kind* of element for assistive technology, so the default has to
   * be the quiet one: see the component doc.
   */
  interactive?: boolean;
  /**
   * Controlled set of hidden series indices. Omit for uncontrolled.
   *
   * The DOM's own `hidden` attribute is omitted from this interface to make
   * room for it. That is a deliberate trade rather than an oversight: a legend
   * carries the prop name its native twin carries (rule 7 — twins keep prop
   * parity), and `hidden` on a `<div>` — "do not render this at all" — is not
   * something any caller of a legend wants, whereas "which series are toggled
   * off" is the whole reason `interactive` exists.
   */
  hidden?: readonly number[];
  /** Initially hidden series indices, when uncontrolled. */
  defaultHidden?: readonly number[];
  /** Called with the entry's index and its **new** hidden state. */
  onToggle?: (index: number, hidden: boolean) => void;
  /** What the empty state says. */
  emptyLabel?: string;
  /** Override the derived accessible sentence (rule 6). */
  'aria-label'?: string;
}

/** The status hue for a `tone`, as the theme's own fill slot. */
const toneVar = (tone: LegendV4Tone): string => `var(--xen-${tone})`;

/** The one `<style>` id this component injects from. Idempotent. */
export const LEGEND_V4_STYLE_ID = 'xen-v4-legend-styles';

/**
 * The swatch's fill, as a sheet reading an element-scoped custom property.
 *
 * The obvious spelling — `style={{ backgroundColor: chartVar(i) }}` — is wrong
 * for the same reason `internal/nav-v4.ts`, `internal/row-v4.ts` and the V4
 * surfaces all use sheets: **a CSSOM that does not parse `var()` drops the
 * declaration from an inline `style` outright.** jsdom is one such CSSOM, and
 * so is every SSR style extractor built on one, so the swatch would render
 * colourless in a snapshot test and — worse — in server-rendered HTML before
 * hydration. The shared chart adapter documents the same trap for
 * `color-mix()`, which is why it emits its palette as plain hexes.
 *
 * A *custom* property survives, because React sets it with `setProperty` and a
 * custom property has no value grammar to fail. So the element carries the
 * choice (`--xen-legend-swatch: var(--xen-chart-2)`) and this one static rule
 * paints it. The choice still goes through `chartVar`, so the five-slot throw
 * is intact — which a sheet keyed by slot number would have quietly lost.
 */
export const LEGEND_V4_CSS = `
[data-xen-v4-legend-swatch] {
  background-color: var(--xen-legend-swatch);
}
`;

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
 * the only one that is available to *every* form.
 *
 * Which is to say: a chart in this line that drops its legend is not a tidier
 * chart, it is a chart that has moved out of the band its palette was validated
 * in. That is why §4.2 defaults `legend` to `true` at two or more series
 * everywhere, and why this component is worth more than its 40 lines suggest.
 *
 * ## Four things the base got wrong
 *
 * 1. **The swatch was `h-2.5 w-2.5`** — 10px, a literal, named in brief §1 rule
 *    1 as a violation. It is now `CHART_MARK.dotSize` (8), *imported*, which is
 *    the same size a scatter or line dot is painted at. A key whose swatch is a
 *    different size from the mark it stands for is a key for a different chart.
 * 2. **The colour came from `seriesColor(i)`**, the cycling five-semantic
 *    vocabulary: a fourth series painted `warn`, a fifth painted `danger`, and a
 *    sixth silently painted the same colour as the first with the legend
 *    repeating the swatch as though that were fine. It is now `chartVar(i)`,
 *    which **throws** past the fifth slot. A legend is the last place a wrap
 *    should be tolerated, because the legend is the thing a reader consults to
 *    resolve exactly the ambiguity a wrap creates.
 * 3. **`opacity` was a prop.** It existed so a caller could distinguish series
 *    within one hue — the same trick `StackedBar` and `ComparisonBars` used —
 *    and it is retired everywhere in this pass. A drained swatch does not read
 *    as "another series"; it reads as disabled, because 0.38 alpha is precisely
 *    what disabled content is drawn at in this kit.
 * 4. **`role="img"` on an interactive element.** Not a base bug, but the trap
 *    waiting for anyone who added toggling to it: `role="img"` makes the
 *    subtree a single opaque graphic, so buttons inside it are unreachable. See
 *    below.
 *
 * ## Labels are never truncated
 *
 * There is no `truncate`, no `numberOfLines` and no `maxWidth` in this
 * component, and that is a decision rather than an omission. A clipped legend
 * label — "Organic sear…" — is an unreadable identity, and an unreadable
 * identity is worse than no legend at all, because the reader believes the
 * chart has told them something. Long labels **wrap**; a legend that needs two
 * lines takes two lines. The caller's fix for a legend that is too tall is a
 * shorter series name or `vertical`, not a narrower one.
 *
 * ## Interaction, and the two shapes this component has
 *
 * With `interactive` off (the default) the legend is a **picture**: `role="img"`
 * with one derived sentence naming every series, which is rule 6's textual
 * representation and reads far better than five separate swatch/label pairs.
 *
 * With `interactive` on it is a **group of toggles**: `role="group"`, and each
 * entry is a real `<button>` with `aria-pressed`. Three details follow from
 * that, and each is a requirement rather than a nicety:
 *
 * - **44 of hit area** (rule 10), via the nav line's `MIN_TAP_CLASS` — the same
 *   `calc(2xl - xs)` expression a tab, a page number and a button already land
 *   on, so a legend toggle is not a fifth nearly-44 size. The painted swatch
 *   stays 8.
 * - **The hidden state is announced, not just drawn.** `aria-pressed` carries
 *   it; the drained swatch and the `mutedText` label are the visual half. A
 *   toggle whose only signal is that a colour got quieter fails the same
 *   readers the legend exists for.
 * - **Toggling is the caller's data change.** This component reports; it does
 *   not filter anyone's series. `hidden` may be controlled, and when it is,
 *   nothing moves until the caller says so.
 */
export const LegendV4 = React.forwardRef<HTMLDivElement, LegendV4Props>(function LegendV4(
  {
    items,
    vertical = false,
    indicator = 'dot',
    interactive = false,
    hidden,
    defaultHidden,
    onToggle,
    emptyLabel = 'No series',
    className,
    'aria-label': ariaLabel,
    ...rest
  },
  ref
) {
  const chart = useChartV4(false);
  injectStyleOnce(LEGEND_V4_STYLE_ID, LEGEND_V4_CSS);
  // The toggle's hover/press feedback IS the shared state layer — a legend
  // entry must not grow an effect of its own (rule 9).
  injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
  const [internal, setInternal] = React.useState<readonly number[]>(defaultHidden ?? []);
  const active = hidden ?? internal;

  if (items.length === 0) return <ChartEmptyV4 label={emptyLabel} />;

  const label = ariaLabel ?? `Legend: ${items.map((item) => item.label).join(', ')}.`;

  const toggle = (index: number): void => {
    const next = !active.includes(index);
    if (hidden === undefined) {
      setInternal(next ? [...active, index] : active.filter((i) => i !== index));
    }
    onToggle?.(index, next);
  };

  const rowClass = cn(
    'inline-flex min-w-0 items-center gap-sm text-left',
    // No `truncate`, and `whitespace-normal` in case a container set otherwise:
    // a clipped legend label is an unreadable identity.
    'whitespace-normal break-words'
  );

  return (
    <div
      ref={ref}
      data-xen-v4-legend=""
      /*
        The module-wide "this is a chart's legend" hook, carried in addition to
        this component's own. Every chart in the line used to draw its own
        legend and every one of them marked it with this attribute; the
        consolidation pass folded those onto `LegendV4`, and the attribute came
        with them so one selector still finds the legend of any chart in the
        module rather than one per form.
      */
      data-xen-v4-chart-legend=""
      {...chart.rootProps}
      role={interactive ? 'group' : 'img'}
      aria-label={label}
      className={cn(
        'flex gap-md',
        vertical ? 'flex-col flex-nowrap' : 'flex-row flex-wrap items-center',
        className
      )}
      {...rest}
    >
      {items.map((item, i) => {
        const off = active.includes(i);
        // Resolved before the hidden check on purpose: a sixth untoned series
        // must throw whether or not it happens to be toggled off right now.
        const fill = item.tone !== undefined ? toneVar(item.tone) : chartVar(item.slot ?? i);
        const ink = off ? CHART_GRID_VAR : fill;
        const swatch =
          indicator === 'dot' ? (
            <span
              data-xen-v4-legend-swatch=""
              data-xen-v4-chart-swatch="dot"
              className="block shrink-0 rounded-full"
              style={
                {
                  width: CHART_MARK.dotSize,
                  height: CHART_MARK.dotSize,
                  // A hidden series drains to the grid colour — the chrome
                  // vocabulary, which is what "not part of the data right now"
                  // already means everywhere else in this module.
                  '--xen-legend-swatch': ink,
                } as React.CSSProperties
              }
            />
          ) : (
            // A rule rather than a dot, for the line family. The colour goes on
            // as an SVG `stroke` **attribute**, not a style: a `var()` in an
            // inline style is dropped outright by a CSSOM that cannot parse it
            // (jsdom, and every SSR extractor built on one), which is the same
            // trap the swatch sheet above exists to dodge. An attribute is not
            // parsed as a declaration, so it survives.
            <svg
              data-xen-v4-chart-swatch={indicator}
              aria-hidden="true"
              focusable="false"
              width={CHART_MARK.dotSize}
              height={CHART_MARK.stroke}
              viewBox={`0 0 ${CHART_MARK.dotSize} ${CHART_MARK.stroke}`}
              className="shrink-0"
            >
              <line
                x1={0}
                y1={CHART_MARK.stroke / 2}
                x2={CHART_MARK.dotSize}
                y2={CHART_MARK.stroke / 2}
                stroke={ink}
                strokeWidth={CHART_MARK.stroke}
                strokeLinecap="round"
                strokeDasharray={
                  indicator === 'dashed'
                    ? `${CHART_MARK.stroke} ${CHART_MARK.stroke}`
                    : undefined
                }
              />
            </svg>
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
              <TextV4 data-xen-v4-chart-value="" size="xs" tone="mutedText" numeric="tabular">
                {item.value}
              </TextV4>
            ) : null}
          </>
        );

        if (!interactive) {
          return (
            <span key={item.key ?? i} data-xen-v4-legend-item="" className={rowClass}>
              {swatch}
              {text}
            </span>
          );
        }

        return (
          <button
            key={item.key ?? i}
            type="button"
            data-xen-v4-legend-item=""
            data-xen-v4-state=""
            aria-pressed={!off}
            onClick={() => toggle(i)}
            className={cn(rowClass, MIN_TAP_CLASS, 'rounded-md px-sm')}
          >
            {swatch}
            {text}
          </button>
        );
      })}
    </div>
  );
});
