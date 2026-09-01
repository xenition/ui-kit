/**
 * Shared plumbing for the **V4 charts line** — every component under
 * `charts/` and `native/charts/`, web and native.
 *
 * A chart is the one place in the kit where colour is not decoration: it is
 * the data. `design.md` §35.6 asks that colour create hierarchy rather than
 * noise, and in a chart the hierarchy IS the encoding — which series is which,
 * how much of it there is, which side of zero it falls on. So this file does
 * for series colour what `v4-state.ts` did for state layers: replaces four
 * competing vocabularies with one derived scale, and cites where the numbers
 * came from.
 *
 * ## What was wrong
 *
 * The base charts cycle five semantic slots:
 *
 * ```ts
 * const SERIES = ['primary', 'accent', 'success', 'warn', 'danger'];
 * const seriesColor = (i) => colorVar(SERIES[i % SERIES.length]);
 * ```
 *
 * Three defects, in order of how badly they mislead a reader:
 *
 * 1. **Status colour is spent on identity.** The fourth region in a donut is
 *    painted `warn` and the fifth `danger`. Nothing is wrong with those
 *    regions; they are simply fourth and fifth. Every design system reviewed
 *    for this pass reserves status hues (Carbon's four-colour alert palette,
 *    HIG's semantic colours, M3's error role) and none of them lets a status
 *    hue stand in for "series 4".
 * 2. **The cycle wraps.** A sixth series is painted the same colour as the
 *    first, silently. Two different things, one colour, no warning — and the
 *    legend repeats the swatch as if that were fine.
 * 3. **Only two of the five are actually far apart in hue.** `success`,
 *    `warn` and `danger` sit in a green-yellow-red arc that protanopia and
 *    deuteranopia collapse almost completely, which is the exact failure mode
 *    a categorical palette exists to avoid.
 *
 * ## What replaces it
 *
 * Five slots, **derived from the seed's own brand hue** by rotation, held at
 * lightnesses that alternate — because protan and deutan collapse *hue* and
 * leave *lightness* intact, so lightness is what keeps two neighbouring series
 * apart for a dichromat reader.
 *
 * Deriving rather than shipping eight fixed hexes is not a stylistic
 * preference. The kit compiles every colour it owns from one seed; a chart
 * palette of literal hexes would be the only thing in the product that does
 * not follow the brand, and it would clash with a seed whose primary happened
 * to land on one of them.
 *
 * ## The numbers, and how they were chosen
 *
 * Not picked by eye. The offsets and lightnesses below were searched against
 * the `dataviz` skill's `validate_palette.js` — the six-check validator
 * (lightness band, chroma floor, CVD separation under Machado-Oliveira-
 * Fernandes 2009 at severity 1.0, a normal-vision floor, contrast vs surface)
 * — evaluated for **24 brand hues at 15° around the wheel**, because the seed
 * is the app's choice and a palette that only works for a blue brand is not a
 * palette. The locked values report, in both schemes:
 *
 * | measure | light | dark | gate |
 * |---|---|---|---|
 * | hard failures over 24 brand hues | 0 | 0 | 0 |
 * | worst adjacent CVD ΔE | 6.5 | 6.5 | ≥ 6 floor · ≥ 8 target |
 * | worst adjacent normal-vision ΔE | 21.5 | 20.2 | ≥ 15 |
 * | first three slots, all-pairs normal ΔE | 18.3 | 17.7 | ≥ 15 |
 *
 * Two consequences are load-bearing and are the reason the rest of the line
 * looks the way it does:
 *
 * - **The CVD figure lands in the 6–8 floor band, not above 8.** That band is
 *   legal *only* with secondary encoding, so secondary encoding is not
 *   optional anywhere in this module: a legend is always present for two or
 *   more series, four or fewer are also direct-labelled, and every fill is
 *   separated from its neighbour by a {@link CHART_MARK.gap} of surface. A
 *   chart in this line never asks colour to carry identity alone. Eight slots
 *   clearing ΔE 8 for every brand hue is not reachable by rotation from a
 *   single hue — that was measured, not assumed.
 * - **Some slots sit below 3:1 against the surface.** The validator calls that
 *   a relief obligation rather than a failure: it is discharged by the visible
 *   labels and the legend the line already ships. A sub-3:1 fill with neither
 *   would be a defect.
 *
 * ## What is NOT here
 *
 * Status. A series that genuinely *means* good or bad — an error rate, a
 * pass/fail split, budget overspend — wears `success` / `warn` / `danger` from
 * the theme and says so with a label. The rule is one or the other, never both
 * in one chart: a palette where slot 4 is red and "failures" is also red has
 * no way to say which red it means.
 */
/** How many categorical slots the line has. */
export declare const CHART_SERIES_COUNT = 5;
/**
 * Hue rotations off the brand hue, in degrees, **in assignment order**.
 *
 * The order is the safety mechanism, exactly as it is in Carbon (whose
 * 14-colour categorical palette is documented as "applied in sequence strictly
 * as described") and in the `dataviz` reference palette. It is not a set to be
 * sorted, shuffled or re-picked per chart: a filter that removes a series must
 * not repaint the survivors, because the reader's memory of "green was
 * Europe" is the only continuity a dashboard has.
 *
 * Slot 1 is the brand hue itself at `+0` — a one-series chart is then simply
 * the brand colour, which is what every reviewed system does for the
 * single-series case and what makes a `Sparkline` in a `TrendCard` match the
 * card it sits in.
 */
export declare const CHART_HUE_OFFSETS: readonly number[];
/**
 * OKLCH lightness per slot, per scheme.
 *
 * The alternation is the point: adjacent slots differ by 0.09–0.16 in light
 * and 0.06–0.09 in dark, which is what carries the pair through a protan or
 * deutan simulation once hue has collapsed. A palette of five equally light
 * hues measures beautifully to a trichromat and turns into one colour to
 * roughly 8% of men.
 *
 * Dark is retuned rather than dimmed — shadcn/ui's `--chart-1..5` change hue
 * *and* chroma between `:root` and `.dark`, and Carbon inverts which end of a
 * sequential ramp means "largest". What does NOT change between schemes is the
 * **hue offsets**: a series must not change identity when the reader flips the
 * theme.
 */
export declare const CHART_LIGHTNESS: Readonly<Record<ChartScheme, readonly number[]>>;
/**
 * Target OKLCH chroma per scheme — the floor is 0.10, below which a hue reads
 * as grey and stops doing identity work at all.
 *
 * Dark runs slightly more saturated because a mark on a near-black ground
 * loses apparent colourfulness; this is the same reason the compiler gives a
 * dark-mode shadow *more* opacity rather than less.
 */
export declare const CHART_CHROMA: Readonly<Record<ChartScheme, number>>;
/**
 * The lightness window each scheme's slots must stay inside — the `dataviz`
 * validator's band, widened by nothing.
 *
 * Used when a hue cannot hold the target chroma at its nominal lightness and
 * {@link chartSlot} has to walk: it may move within this window and no
 * further, because a slot outside the band fails the band check even if it
 * gains chroma.
 */
export declare const CHART_L_BAND: Readonly<Record<ChartScheme, readonly [number, number]>>;
/**
 * How many series a chart form where **any two marks can end up adjacent**
 * may carry.
 *
 * A bar chart, a line chart and a stack only ever place series next to their
 * neighbours in assignment order, so the adjacent CVD check is the honest
 * gate. A scatter, a bubble chart or a set of small multiples places *any*
 * two marks side by side, which is a strictly harder test — and the same
 * measurement that locked the palette showed the first three slots clearing
 * it (all-pairs normal-vision ΔE 18.3 light / 17.7 dark) while five do not.
 *
 * So a scatter with four series is not a palette problem to be solved with a
 * sixth colour; it is a chart that needs faceting or an "Other" fold. This
 * constant is that rule in one place rather than a paragraph each of five
 * components would paraphrase differently.
 */
export declare const CHART_SCATTER_SERIES_CAP = 3;
/** The two schemes a palette is derived for. */
export type ChartScheme = 'light' | 'dark';
/**
 * The largest chroma sRGB can actually hold at this lightness and hue, by
 * bisection.
 *
 * Needed because the gamut is not a cylinder: a teal at L 0.50 tops out near
 * C 0.09 — under the chroma floor, so it would render as a grey-green and stop
 * being an identity. Asking the question first is what lets {@link chartSlot}
 * move the lightness instead of shipping the grey.
 */
export declare function maxChroma(L: number, hueDeg: number): number;
/** OKLCH → `#rrggbb`, clamped into sRGB. */
export declare function oklchToHex(L: number, C: number, hueDeg: number): string;
/** sRGB hex → OKLCH hue in degrees. The only thing a slot needs from a brand. */
export declare function hueOf(hex: string): number;
/**
 * One slot: the nominal lightness is a preference, not a promise.
 *
 * If the hue cannot hold `targetC` there, walk the lightness — inside the
 * band, nearest first — until it can. A slot that quietly clipped to C 0.09
 * would pass every visual review and fail the chroma floor, which is the
 * check that says "this reads as grey".
 */
export declare function chartSlot(nominalL: number, hueDeg: number, targetC: number, scheme: ChartScheme): string;
/**
 * The five categorical slots for a brand colour and a scheme, in assignment
 * order.
 *
 * `brandHex` is the seed's own primary — pass `tokens.ramps.primary[500]`
 * rather than `colors.primary`, because the ramp keeps one orientation in both
 * schemes and so the hue does not shift when the reader flips the theme.
 *
 * Pure and cheap enough to call per render, but every call site memoises it on
 * `[brandHex, scheme]` anyway: it is five bisections, and a chart that
 * re-derives its palette on every pointer move is spending that on nothing.
 */
export declare function chartSeries(brandHex: string, scheme: ChartScheme): string[];
/**
 * A **sequential** ramp: one hue, monotone lightness, for magnitude —
 * a heatmap cell, a choropleth, an intensity grid.
 *
 * Never the categorical slots. Categorical encodes *which*; sequential encodes
 * *how much*, and painting magnitude with five hues is the rainbow mistake
 * every source reviewed warns about. One hue means the reader gets the
 * ordering from the colour without being taught it.
 *
 * The direction flips with the scheme, which is Carbon's rule and not a
 * detail: on a light page the darkest step is the largest value, on a dark
 * page the lightest step is. "More ink" and "more light" are the same signal
 * read against opposite grounds.
 *
 * `t` is the normalised value in `[0, 1]`. The light end stops well short of
 * the surface so the smallest non-zero cell is still visibly a cell — the
 * validator's ordinal check asks for ≥ 2:1 at the light end, and a ramp that
 * fades to the page loses its lowest bucket entirely.
 */
export declare function chartSequential(brandHex: string, t: number, scheme: ChartScheme): string;
/**
 * A **diverging** ramp: two hues meeting at a neutral midpoint, for polarity —
 * over vs under budget, gain vs loss, above vs below a baseline.
 *
 * `t` is in `[-1, 1]`. The midpoint is deliberately near-neutral rather than a
 * third hue: a diverging scale with a colour at zero tells the reader that
 * zero is a category, which is the one thing it is not.
 *
 * The two arms are slot 1's hue and the hue 180° from it, so a diverging chart
 * still reads as the same product as the categorical ones — and, like every
 * other ramp here, it follows the seed rather than a fixed red/blue that would
 * fight a red brand.
 */
export declare function chartDiverging(brandHex: string, t: number, scheme: ChartScheme): string;
/**
 * Mark geometry, shared by both twins.
 *
 * Every number here is geometric — a stroke width, a corner, a gap — which is
 * the one category of bare number `ONBOARDING-DESIGN-SPEC.md` §10 rule 1
 * allows. They are constants rather than literals at 40 call sites because a
 * kit where one bar chart rounds its bars at 4 and the next at 2 has no line
 * at all.
 */
export declare const CHART_MARK: {
    /** Line and axis stroke. Thin marks; the data is the ink, not the chrome. */
    readonly stroke: 2;
    /** The rounded end of a bar, at the *data* end only — never the baseline. */
    readonly endRadius: 4;
    /** Smallest painted scatter/line dot. Below this a point stops being one. */
    readonly dotSize: 8;
    /**
     * Surface showing between two fills — adjacent bars, and the segments of a
     * stack.
     *
     * This is the secondary encoding the 6–8 CVD band obliges: two segments a
     * dichromat cannot tell apart are still visibly two segments when a hairline
     * of page runs between them.
     */
    readonly gap: 2;
    /**
     * A ring of surface around an overlapping mark — a scatter point on top of
     * another, a dot on a line crossing its own area fill.
     */
    readonly ring: 2;
};
/**
 * How much `onSurface` the chart chrome carries.
 *
 * Grid lines and axes are *reference*, not data. They take the same derived
 * neutral the V4 tables use, mixed from the two scheme-resolved slots so they
 * follow the theme with no dark rule of their own — never `neutral[200]`,
 * which is light-oriented in both schemes and paints a near-white grid across
 * a dark chart. Fluent's guidance says the same thing in words: axis labels
 * stay subordinate to the data ink.
 */
export declare const CHART_GRID_MIX = 0.1;
/** The axis line itself — one step more present than the grid behind it. */
export declare const CHART_AXIS_MIX = 0.18;
/**
 * The largest number of series that may be direct-labelled rather than sent to
 * the legend.
 *
 * Above four the labels collide and the chart is worse for having them; at or
 * below four, direct labels are the strongest secondary encoding available and
 * the legend stays as well.
 */
export declare const CHART_DIRECT_LABEL_MAX = 4;
/**
 * A series that genuinely **means** good or bad — an error rate, a pass/fail
 * split, budget overspend.
 *
 * Deliberately the three status slots and not the ten colour slots: a series
 * tinted `onPrimary` is a mistake, not an option. And deliberately separate
 * from the categorical slots — a series that is merely fourth wears slot 4,
 * and a chart uses one vocabulary or the other, never both, because a chart
 * where slot 4 is red and "failures" is also red cannot say which red it
 * means.
 */
export type ChartToneV4 = 'success' | 'warn' | 'danger';
/**
 * Series **configuration**, kept separate from series **data** — shadcn/ui's
 * `ChartConfig` split, which the review found to be the closest prior art the
 * six systems offered.
 *
 * There is no `color` field, on purpose. The slot index comes from array
 * position and nothing else, so a filter that removes a series cannot repaint
 * the survivors — the reader's memory of "green was Europe" is the only
 * continuity a dashboard has.
 */
export interface ChartSeriesV4 {
    /** Stable identity. The React key, and the tooltip's row key. */
    key: string;
    /** Human name — the legend row, the direct label, the tooltip row. */
    label: string;
    /**
     * Paint this series with a status hue instead of its slot. Ships with its
     * label, never colour alone.
     */
    tone?: ChartToneV4;
}
/** How a tooltip marks the series it is describing. shadcn's vocabulary. */
export type ChartIndicatorV4 = 'dot' | 'line' | 'dashed';
/**
 * How many buckets a sequential or diverging ramp is quantised into.
 *
 * Shared rather than per-twin because the twins **must** bucket identically:
 * if the web emits nine steps and native interpolates continuously, the same
 * data reads as nine bands in the browser and a smooth wash on the phone, and
 * nobody discovers it until a screenshot lands beside a device.
 *
 * Nine, and not a gradient, because Carbon ships ten discrete steps for the
 * same reason: nobody reads the difference between the 41st and 42nd
 * percentile off a fill.
 */
export declare const CHART_RAMP_STEPS = 9;
/**
 * How much alpha an **area** fill carries under its own line.
 *
 * The fill is context; the line is the data. At full strength the fill wins
 * the reader's attention from the edge that actually carries the values, and
 * two overlapping areas become mud.
 *
 * 0.18 is the web base's number. Native's base had drifted to 0.2 and the
 * radar's to 0.15 — three numbers for one idea, which is the same defect the
 * motion scale had before `v4-motion.ts` (seven durations for four ideas).
 */
export declare const CHART_AREA_FILL_ALPHA = 0.18;
/** What the folded tail of a categorical series list is called. */
export declare const CHART_OVERFLOW_LABEL = "Other";
/**
 * The result of folding a series list down to the palette.
 *
 * @see foldChartSeries
 */
export interface ChartFold<T> {
    /** The items that keep a slot of their own, in their original order. */
    kept: T[];
    /** The items folded into the last slot. Empty when nothing was folded. */
    folded: T[];
    /** Whether a fold happened — i.e. whether the last slot is "Other". */
    didFold: boolean;
}
/**
 * Fold a series list onto the palette: keep the first `CHART_SERIES_COUNT - 1`
 * and put everything else in the last slot.
 *
 * **This is what a component does instead of letting `chartVar` throw.** The
 * throw is right where it is — asking the palette for slot 6 is a programming
 * error and it should be loud — but a `StackedBar` handed six segments from a
 * live API would take the whole page down with it, and a `RangeError` in
 * production is not a design decision. So the rule splits cleanly:
 *
 * - **The primitive throws.** `chartVar(5)` is a mistake in the caller's code.
 * - **The component folds.** A component whose series count comes from data
 *   folds the tail and says so in the legend, because it cannot know at build
 *   time how many series will arrive.
 *
 * Sorting is the caller's job and is deliberately not done here: re-ordering
 * the data moves a series between slots exactly as re-ordering the palette
 * would, and a form that sorts (a pie, where the tail is genuinely "the small
 * ones") does it before calling this.
 */
export declare function foldChartSeries<T>(items: readonly T[], limit?: number): ChartFold<T>;
//# sourceMappingURL=v4-chart.d.ts.map