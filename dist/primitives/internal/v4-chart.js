"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHART_OVERFLOW_LABEL = exports.CHART_AREA_FILL_ALPHA = exports.CHART_RAMP_STEPS = exports.CHART_DIRECT_LABEL_MAX = exports.CHART_AXIS_MIX = exports.CHART_GRID_MIX = exports.CHART_MARK = exports.CHART_SCATTER_SERIES_CAP = exports.CHART_L_BAND = exports.CHART_CHROMA = exports.CHART_LIGHTNESS = exports.CHART_HUE_OFFSETS = exports.CHART_SERIES_COUNT = void 0;
exports.maxChroma = maxChroma;
exports.oklchToHex = oklchToHex;
exports.hueOf = hueOf;
exports.chartSlot = chartSlot;
exports.chartSeries = chartSeries;
exports.chartSequential = chartSequential;
exports.chartDiverging = chartDiverging;
exports.foldChartSeries = foldChartSeries;
/** How many categorical slots the line has. */
exports.CHART_SERIES_COUNT = 5;
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
exports.CHART_HUE_OFFSETS = [0, 250, 90, 320, 200];
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
exports.CHART_LIGHTNESS = {
    light: [0.64, 0.52, 0.64, 0.48, 0.72],
    dark: [0.59, 0.5, 0.59, 0.5, 0.56],
};
/**
 * Target OKLCH chroma per scheme — the floor is 0.10, below which a hue reads
 * as grey and stops doing identity work at all.
 *
 * Dark runs slightly more saturated because a mark on a near-black ground
 * loses apparent colourfulness; this is the same reason the compiler gives a
 * dark-mode shadow *more* opacity rather than less.
 */
exports.CHART_CHROMA = {
    light: 0.13,
    dark: 0.15,
};
/**
 * The lightness window each scheme's slots must stay inside — the `dataviz`
 * validator's band, widened by nothing.
 *
 * Used when a hue cannot hold the target chroma at its nominal lightness and
 * {@link chartSlot} has to walk: it may move within this window and no
 * further, because a slot outside the band fails the band check even if it
 * gains chroma.
 */
exports.CHART_L_BAND = {
    light: [0.44, 0.76],
    dark: [0.49, 0.66],
};
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
exports.CHART_SCATTER_SERIES_CAP = 3;
/* ------------------------------------------------------------------------ *
 * OKLab / OKLCH
 *
 * `theme/color.ts` works in HSL, which is what the ramp compiler needs and is
 * wrong for this job: HSL lightness is not perceptual, so "L 62%" is a pale
 * yellow and a mid navy at the same number, and a palette built on it fails
 * the band check on half its slots. Björn Ottosson's OKLab is the space the
 * validator measures in, so it is the space the palette is derived in.
 *
 * Kept local rather than added to `theme/color.ts` on purpose: nothing else
 * in the kit needs a perceptual space, and a second colour module in the
 * compiler's path is a thing that drifts.
 * ------------------------------------------------------------------------ */
/** Linear-light channel → sRGB gamma-encoded channel. */
function gamma(x) {
    return x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
}
/** OKLab → linear sRGB. Coefficients are Ottosson's published matrices. */
function oklabToLinear(L, a, b) {
    const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
    const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
    const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
    return [
        4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
        -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
        -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ];
}
/** Is a linear-sRGB triple inside the gamut, allowing for float slop? */
function inGamut([r, g, b]) {
    return r >= -0.0005 && r <= 1.0005 && g >= -0.0005 && g <= 1.0005 && b >= -0.0005 && b <= 1.0005;
}
/**
 * The largest chroma sRGB can actually hold at this lightness and hue, by
 * bisection.
 *
 * Needed because the gamut is not a cylinder: a teal at L 0.50 tops out near
 * C 0.09 — under the chroma floor, so it would render as a grey-green and stop
 * being an identity. Asking the question first is what lets {@link chartSlot}
 * move the lightness instead of shipping the grey.
 */
function maxChroma(L, hueDeg) {
    const rad = (hueDeg * Math.PI) / 180;
    let lo = 0;
    let hi = 0.4;
    for (let i = 0; i < 24; i += 1) {
        const mid = (lo + hi) / 2;
        if (inGamut(oklabToLinear(L, mid * Math.cos(rad), mid * Math.sin(rad))))
            lo = mid;
        else
            hi = mid;
    }
    return lo;
}
/** OKLCH → `#rrggbb`, clamped into sRGB. */
function oklchToHex(L, C, hueDeg) {
    const rad = (hueDeg * Math.PI) / 180;
    const lin = oklabToLinear(L, C * Math.cos(rad), C * Math.sin(rad));
    const hex = lin
        .map((v) => Math.round(Math.min(1, Math.max(0, gamma(v))) * 255).toString(16).padStart(2, '0'))
        .join('');
    return `#${hex}`;
}
/** sRGB hex → OKLCH hue in degrees. The only thing a slot needs from a brand. */
function hueOf(hex) {
    const clean = hex.replace('#', '');
    const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
    const toLinear = (v) => {
        const s = v / 255;
        return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
    };
    const r = toLinear(parseInt(full.slice(0, 2), 16));
    const g = toLinear(parseInt(full.slice(2, 4), 16));
    const b = toLinear(parseInt(full.slice(4, 6), 16));
    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
    const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
    const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
    const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
    const deg = (Math.atan2(bb, a) * 180) / Math.PI;
    return (deg + 360) % 360;
}
/**
 * One slot: the nominal lightness is a preference, not a promise.
 *
 * If the hue cannot hold `targetC` there, walk the lightness — inside the
 * band, nearest first — until it can. A slot that quietly clipped to C 0.09
 * would pass every visual review and fail the chroma floor, which is the
 * check that says "this reads as grey".
 */
function chartSlot(nominalL, hueDeg, targetC, scheme) {
    const [lo, hi] = exports.CHART_L_BAND[scheme];
    if (maxChroma(nominalL, hueDeg) >= targetC)
        return oklchToHex(nominalL, targetC, hueDeg);
    let bestL = nominalL;
    let bestC = maxChroma(nominalL, hueDeg);
    for (let d = 0.02; d <= 0.3; d += 0.02) {
        for (const L of [nominalL + d, nominalL - d]) {
            if (L < lo || L > hi)
                continue;
            const c = maxChroma(L, hueDeg);
            if (c >= targetC)
                return oklchToHex(L, targetC, hueDeg);
            if (c > bestC) {
                bestC = c;
                bestL = L;
            }
        }
    }
    return oklchToHex(bestL, bestC, hueDeg);
}
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
function chartSeries(brandHex, scheme) {
    const base = hueOf(brandHex);
    const Ls = exports.CHART_LIGHTNESS[scheme];
    const c = exports.CHART_CHROMA[scheme];
    return exports.CHART_HUE_OFFSETS.map((off, i) => chartSlot(Ls[i], (base + off) % 360, c, scheme));
}
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
function chartSequential(brandHex, t, scheme) {
    const hue = hueOf(brandHex);
    const clamped = Number.isFinite(t) ? Math.min(Math.max(t, 0), 1) : 0;
    const [lo, hi] = scheme === 'dark' ? [0.34, 0.82] : [0.88, 0.42];
    const L = lo + (hi - lo) * clamped;
    const c = Math.min(exports.CHART_CHROMA[scheme], maxChroma(L, hue));
    return oklchToHex(L, c, hue);
}
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
function chartDiverging(brandHex, t, scheme) {
    const hue = hueOf(brandHex);
    const v = Number.isFinite(t) ? Math.min(Math.max(t, -1), 1) : 0;
    const arm = v >= 0 ? hue : (hue + 180) % 360;
    const mag = Math.abs(v);
    const [nearL, farL] = scheme === 'dark' ? [0.44, 0.72] : [0.9, 0.46];
    const L = nearL + (farL - nearL) * mag;
    const c = Math.min(exports.CHART_CHROMA[scheme] * mag, maxChroma(L, arm));
    return oklchToHex(L, c, arm);
}
/**
 * Mark geometry, shared by both twins.
 *
 * Every number here is geometric — a stroke width, a corner, a gap — which is
 * the one category of bare number `ONBOARDING-DESIGN-SPEC.md` §10 rule 1
 * allows. They are constants rather than literals at 40 call sites because a
 * kit where one bar chart rounds its bars at 4 and the next at 2 has no line
 * at all.
 */
exports.CHART_MARK = {
    /** Line and axis stroke. Thin marks; the data is the ink, not the chrome. */
    stroke: 2,
    /** The rounded end of a bar, at the *data* end only — never the baseline. */
    endRadius: 4,
    /** Smallest painted scatter/line dot. Below this a point stops being one. */
    dotSize: 8,
    /**
     * Surface showing between two fills — adjacent bars, and the segments of a
     * stack.
     *
     * This is the secondary encoding the 6–8 CVD band obliges: two segments a
     * dichromat cannot tell apart are still visibly two segments when a hairline
     * of page runs between them.
     */
    gap: 2,
    /**
     * A ring of surface around an overlapping mark — a scatter point on top of
     * another, a dot on a line crossing its own area fill.
     */
    ring: 2,
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
exports.CHART_GRID_MIX = 0.1;
/** The axis line itself — one step more present than the grid behind it. */
exports.CHART_AXIS_MIX = 0.18;
/**
 * The largest number of series that may be direct-labelled rather than sent to
 * the legend.
 *
 * Above four the labels collide and the chart is worse for having them; at or
 * below four, direct labels are the strongest secondary encoding available and
 * the legend stays as well.
 */
exports.CHART_DIRECT_LABEL_MAX = 4;
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
exports.CHART_RAMP_STEPS = 9;
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
exports.CHART_AREA_FILL_ALPHA = 0.18;
/** What the folded tail of a categorical series list is called. */
exports.CHART_OVERFLOW_LABEL = 'Other';
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
function foldChartSeries(items, limit = exports.CHART_SERIES_COUNT) {
    if (items.length <= limit)
        return { kept: [...items], folded: [], didFold: false };
    return {
        kept: items.slice(0, limit - 1),
        folded: items.slice(limit - 1),
        didFold: true,
    };
}
//# sourceMappingURL=v4-chart.js.map