import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ChartIndicatorV4, type ChartToneV4 } from '../../primitives/internal/v4-chart';
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
export declare function LegendV4({ items, vertical, indicator, interactive, hidden, defaultHidden, onToggle, emptyLabel, accessibilityLabel, testID, style, }: LegendV4Props): React.ReactElement;
//# sourceMappingURL=LegendV4.d.ts.map