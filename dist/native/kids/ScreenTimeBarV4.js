"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenTimeBarV4 = ScreenTimeBarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const family_v4_1 = require("../../kids/family-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** Above this fraction of the limit the readout warns. 0.8 — the base's own threshold. */
const NEAR = 0.8;
/**
 * **V4 screen-time bar** — same props as {@link ScreenTimeBar} plus
 * `noLimitLabel`, `overLabel`, `remainingLabel` and `formatDuration`.
 *
 * ## Five changes
 *
 * 1. **`limit={0}` no longer throws the reading away.** The base returned early
 *    on any non-positive limit and told the parent "No screen-time limit set" —
 *    never that the child had been on the device for four hours. That is the
 *    one screen where the number matters most. "No limit set" is now a *note*
 *    beside the reading, not a replacement for it.
 * 2. **A broken reading is reported as broken.** `used={-30}` rendered
 *    "0 min / 2h — 2h left" as though a negative number out of a failed sync
 *    were sound data, and `used={NaN}` reached the screen as "NaNh NaNm" with a
 *    bar of width `"NaN%"`. `meterParts` never touches the measurement: it
 *    hands back the value as given, a `ratio` clamped **for drawing only**, and
 *    a `valid` flag. An unusable reading renders nothing rather than a
 *    confident nought.
 * 3. **The meter announces a range it is actually in.** `used={180}` against a
 *    120 limit announced `valuenow=180` against `valuemax=120` — "180 of 120".
 *    The bar is now a percentage of the limit, 0–100, and the overage is its
 *    own sentence.
 * 4. **A translated unit keeps its formatting.** The h/m split tested
 *    `unit !== 'min'` against the literal string, so a caller who passed a
 *    localised unit fell straight through to `${mins} ${unit}` and lost the
 *    split entirely. `formatDuration` is the hook that was missing.
 * 5. **Over the limit is `warn`, never `danger`.** This module draws children,
 *    and `danger` means the *system* has failed. A child who has had more
 *    screen time than a parent planned has not broken anything; the state is
 *    carried by a glyph, a word and the overage, so it survives greyscale too.
 *
 * **Renders nothing when the reading itself is unusable** — see change 2.
 */
function ScreenTimeBarV4({ used, limit, unit = 'min', label = 'Screen time', loading = false, emptyLabel = 'No screen-time limit set', noLimitLabel, overLabel = 'over by', remainingLabel = 'left', formatDuration, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const container = [(0, tone_v4_1.cardStyle)(theme), { gap: tokens.spacing.sm }, style];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: "Loading screen time", style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBlockStyle)(theme, { height: tokens.typography.scale.base, width: '40%' }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, tone_v4_1.skeletonBlockStyle)(theme, { height: tokens.spacing.sm }) })] }));
    }
    const parts = (0, family_v4_1.meterParts)(used, limit);
    // `valid: false` is "the caller handed us NaN". A frame around a number we do
    // not have is worse than no frame at all (§4.5).
    if (!parts.valid)
        return null;
    // The default only knows minutes, so it only claims minutes. Any other unit
    // falls through to the value and the caller's word — and `formatDuration` is
    // there for a locale that splits hours and minutes differently.
    const format = formatDuration ??
        ((minutes) => {
            if (unit !== 'min')
                return `${minutes} ${unit}`;
            if (minutes < 60)
                return `${minutes} ${unit}`;
            const h = Math.floor(minutes / 60);
            const m = minutes % 60;
            return m === 0 ? `${h}h` : `${h}h ${m}m`;
        });
    const reading = format(parts.value);
    const over = parts.over > 0;
    const near = !over && parts.hasLimit && (parts.ratio ?? 0) >= NEAR;
    const tone = over || near ? 'warn' : 'neutral';
    const note = !parts.hasLimit
        ? (noLimitLabel ?? emptyLabel)
        : over
            ? `${overLabel} ${format(parts.over)}`
            : `${format(parts.remaining)} ${remainingLabel}`;
    const name = (0, tone_v4_1.spokenLine)([
        label,
        parts.hasLimit ? `${reading} / ${format(parts.limit ?? 0)}` : reading,
        parts.hasLimit ? `${parts.percent}%` : null,
        note,
    ]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: container, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: name, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                            gap: tokens.spacing.sm,
                        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, style: { flexShrink: 1 }, children: label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "bold", numeric: "tabular", numberOfLines: 1, style: { color: over || near ? (0, tone_v4_1.toneInk)(theme, 'warn') : colors.onCard }, children: parts.hasLimit ? `${reading} / ${format(parts.limit ?? 0)}` : reading })] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: over ? 'bold' : 'regular', tone: over ? 'warnText' : 'mutedText', children: over ? `⚠ ${note}` : note })] }), parts.hasLimit ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityLabel: (0, tone_v4_1.spokenLine)([label, `${parts.percent}%`, note]), accessibilityValue: (0, tone_v4_1.percentValue)(parts.percent), children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: parts.percent ?? 0, max: 100, tone: tone === 'warn' ? 'warn' : 'primary' }) }) })) : null] }));
}
//# sourceMappingURL=ScreenTimeBarV4.js.map