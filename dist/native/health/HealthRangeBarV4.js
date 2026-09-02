"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthRangeBarV4 = HealthRangeBarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const goal_v4_1 = require("../../health/goal-v4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * How much air the derived scale leaves outside the data, as a fraction of the
 * span it covers. A reading sitting hard against the end of its own axis reads
 * as clipped rather than as extreme.
 */
const SCALE_PAD = 0.25;
/** The marker's width relative to the track's height — a tick, not a dot. */
const MARKER_RATIO = 0.5;
/**
 * **V4 health range bar** — a reading plotted against its normal band. New in
 * V4; there is no base component.
 *
 * ## Why it exists
 *
 * Nothing in the `health` module could say *out of range*. `VitalStat` fixed
 * its tone by `variant`, so a fasting glucose of 260 mg/dL drew in exactly the
 * ink a fasting glucose of 95 drew in, and a heart rate of 190 bpm shared its
 * permanent red with a resting 58. `VitalStatV4` and `BodyMetricCardV4` can
 * now take a `range` and say the word — but a word is not a picture, and a
 * reading is far easier to judge against a band you can see than against one
 * you have to remember.
 *
 * So: the band is drawn as a lit segment of the track, the reading as a marker
 * on it, and the verdict as a word beneath. It reads `rangeVerdict` from the
 * shared `goal-v4`, which is the same function the two cards read, so the
 * picture and the words cannot disagree.
 *
 * ## Four things it does deliberately
 *
 * 1. **The whole bar is one `progressbar` with a value**, rather than a
 *    decorative drawing with a caption beside it — every meter in the base
 *    module was the latter.
 * 2. **The verdict is a word before it is a colour.** `low` and `high` share
 *    one tone, because a component knows only that a reading is outside the
 *    band it was handed, not whether that is a rounding error or an emergency.
 * 3. **The scale is derived from the data and the band together**, so a
 *    reading far outside its band is still visible on the axis instead of
 *    being pinned to the end of it.
 * 4. **No band is a state, not a blank.** With `range` omitted the reading
 *    still renders, under `emptyLabel` — the same distinction `goalParts`
 *    draws between "no goal" and "nought per cent", and for the same reason:
 *    a component that does not know the band must not draw one.
 *
 * **Renders nothing without a `label` or a finite `value`.**
 */
function HealthRangeBarV4({ label, value, range, unit, min, max, rangeLabels, formatValue, emptyLabel = 'No range set', appearance = 'classic', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!label || !Number.isFinite(value))
        return null;
    const format = formatValue ?? ((n, u) => `${n}${u ? ` ${u}` : ''}`);
    const verdict = (0, goal_v4_1.rangeVerdict)(value, range);
    const heading = (ink) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, style: { flex: 1 }, children: label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "bold", numeric: "tabular", style: { color: ink }, children: format(value, unit) })] }));
    if (verdict === undefined) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, tone_v4_1.spokenLine)([label, format(value, unit), emptyLabel]), style: [(0, tone_v4_1.cardStyle)(theme, appearance), style], children: [heading(theme.colors.onSurface), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: emptyLabel })] }));
    }
    const low = typeof range?.low === 'number' && Number.isFinite(range.low) ? range.low : undefined;
    const high = typeof range?.high === 'number' && Number.isFinite(range.high) ? range.high : undefined;
    const points = [value, low, high].filter((n) => n !== undefined);
    const dataMin = Math.min(...points);
    const dataMax = Math.max(...points);
    const span = dataMax - dataMin || Math.abs(dataMax) || 1;
    const floor = min ?? dataMin - span * SCALE_PAD;
    const ceiling = max ?? dataMax + span * SCALE_PAD;
    const width = ceiling - floor || 1;
    const at = (n) => Math.min(Math.max((n - floor) / width, 0), 1);
    const bandStart = at(low ?? floor);
    const bandEnd = at(high ?? ceiling);
    const tone = (0, tone_v4_1.verdictTone)(verdict);
    const word = rangeLabels?.[verdict] ?? tone_v4_1.RANGE_LABEL[verdict];
    const bandCaption = low !== undefined && high !== undefined
        ? `${format(low, unit)} – ${format(high, unit)}`
        : low !== undefined
            ? `≥ ${format(low, unit)}`
            : `≤ ${format(high ?? 0, unit)}`;
    const trackHeight = tokens.spacing.sm;
    const markerWidth = Math.max(2, Math.round(trackHeight * MARKER_RATIO));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityLabel: (0, tone_v4_1.spokenLine)([label, format(value, unit), word, `normal ${bandCaption}`]), accessibilityValue: { min: floor, max: ceiling, now: value }, style: [(0, tone_v4_1.cardStyle)(theme, appearance), style], children: [heading((0, tone_v4_1.toneInk)(theme, tone)), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    height: trackHeight,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, tone_v4_1.trackGround)(theme),
                    overflow: 'hidden',
                    justifyContent: 'center',
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            left: `${bandStart * 100}%`,
                            width: `${Math.max(bandEnd - bandStart, 0) * 100}%`,
                            height: '100%',
                            backgroundColor: (0, tone_v4_1.toneFill)(theme, 'success'),
                        } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            left: `${at(value) * 100}%`,
                            marginStart: -markerWidth / 2,
                            width: markerWidth,
                            height: '100%',
                            borderRadius: tokens.radius.full,
                            backgroundColor: theme.colors.onSurface,
                        } })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", style: { color: (0, tone_v4_1.toneInk)(theme, tone) }, children: word }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: bandCaption })] })] }));
}
//# sourceMappingURL=HealthRangeBarV4.js.map