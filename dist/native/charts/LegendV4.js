"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegendV4 = LegendV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const nav_v4_1 = require("../primitives/internal/nav-v4");
const v4_chart_1 = require("../../primitives/internal/v4-chart");
const internal_v4_1 = require("./internal-v4");
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
function LegendV4({ items, vertical = false, indicator = 'dot', interactive = false, hidden, defaultHidden, onToggle, emptyLabel = 'No series', accessibilityLabel, testID = 'legend', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const palette = (0, internal_v4_1.useChartPaletteV4)();
    const [internal, setInternal] = React.useState(defaultHidden ?? []);
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
        return ((0, jsx_runtime_1.jsx)(internal_v4_1.ChartEmptyV4, { label: emptyLabel, style: [{ alignItems: 'stretch' }, style] }));
    }
    const label = accessibilityLabel ?? `Legend: ${items.map((item) => item.label).join(', ')}.`;
    const toggle = (index) => {
        const next = !active.includes(index);
        if (hidden === undefined) {
            setInternal(next ? [...active, index] : active.filter((i) => i !== index));
        }
        onToggle?.(index, next);
    };
    const row = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.sm,
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, accessibilityRole: interactive ? undefined : 'image', accessibilityLabel: interactive ? undefined : label, style: [
            {
                flexDirection: vertical ? 'column' : 'row',
                flexWrap: vertical ? 'nowrap' : 'wrap',
                gap: tokens.spacing.md,
            },
            style,
        ], children: items.map((item, i) => {
            const off = active.includes(i);
            // Resolved before the hidden check on purpose: a sixth untoned series
            // must throw whether or not it happens to be toggled off right now.
            const ink = off
                ? palette.grid
                : item.tone !== undefined
                    ? colors[item.tone]
                    : (0, internal_v4_1.chartSlotColor)(palette, item.slot ?? i);
            const swatch = ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "legend-swatch", style: indicator === 'dot'
                    ? {
                        width: v4_chart_1.CHART_MARK.dotSize,
                        height: v4_chart_1.CHART_MARK.dotSize,
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
                        width: v4_chart_1.CHART_MARK.dotSize,
                        height: v4_chart_1.CHART_MARK.stroke,
                        flexDirection: 'row',
                        gap: v4_chart_1.CHART_MARK.gap,
                        backgroundColor: indicator === 'dashed' ? undefined : ink,
                    }, children: indicator === 'dashed'
                    ? [0, 1].map((d) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: (v4_chart_1.CHART_MARK.dotSize - v4_chart_1.CHART_MARK.gap) / 2,
                            height: v4_chart_1.CHART_MARK.stroke,
                            backgroundColor: ink,
                        } }, d)))
                    : null }));
            const text = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: off ? 'mutedText' : 'onSurface', children: item.label }), item.value !== undefined ? (
                    // The module's direct-value marker, the same one a bar's or a
                    // range's own label carries: a legend readout IS a direct label
                    // for a form whose marks are too small to carry one.
                    (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { testID: "xen-v4-chart-value", size: "xs", tone: "mutedText", numeric: "tabular", children: item.value })) : null] }));
            if (!interactive) {
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "legend-item", style: row, children: [swatch, text] }, item.key ?? i));
            }
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { testID: "legend-item", accessibilityRole: "button", accessibilityState: { selected: !off }, accessibilityLabel: item.label, onPress: () => toggle(i), style: [
                    row,
                    {
                        // Rule 10's 44, composed once in the nav line and imported here.
                        minHeight: (0, nav_v4_1.minTap)(tokens.spacing),
                        paddingHorizontal: tokens.spacing.sm,
                        borderRadius: tokens.radius.md,
                    },
                ], children: [swatch, text] }, item.key ?? i));
        }) }));
}
//# sourceMappingURL=LegendV4.js.map