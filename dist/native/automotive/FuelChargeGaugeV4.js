"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuelChargeGaugeV4 = FuelChargeGaugeV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const fleet_v4_1 = require("./internal/fleet-v4");
const BAND_META = {
    low: { label: 'Low', tone: 'danger' },
    fair: { label: 'Fair', tone: 'warn' },
    good: { label: 'Good', tone: 'success' },
};
/** Where the bands sit, relative to the caller's low threshold. */
function bandFor(pct, low) {
    if (pct <= low)
        return 'low';
    if (pct <= low * 2.5)
        return 'fair';
    return 'good';
}
/** The meter's thickness per variant, off the spacing scale rather than 8/12. */
function trackHeight(xs, compact) {
    return compact ? xs * 1.5 : xs * 2;
}
/**
 * **V4 fuel / charge gauge** — same props as {@link FuelChargeGauge} plus
 * `bandLabels` and `chargingLabel`.
 *
 * ## Four changes
 *
 * 1. **The percentage takes contrast-corrected ink.** The base painted the
 *    figure `colors[band.tone]` — a **fill** slot, on the largest number in
 *    the component. `warnText` is that colour pulled until it clears AA.
 * 2. **The glyph is an element, not part of the string.** `'⛽ Fuel'` cannot
 *    be tinted, cannot be replaced, and is read aloud as the emoji's name.
 * 3. **`fontWeight: '800'` is off the scale.** The kit stops at `bold`; the
 *    base asked for a weight the type system does not have, which resolves
 *    differently on every platform.
 * 4. **The track's thickness comes off the spacing scale**, and the meter
 *    reports itself as a `progressbar` with its real value.
 */
function FuelChargeGaugeV4({ percent, kind = 'fuel', label, rangeLabel, lowThreshold = 15, charging = false, variant = 'bar', bandLabels, chargingLabel = 'Charging', loading = false, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const compact = variant === 'compact';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        height: tokens.typography.scale.xs,
                        width: '40%',
                        borderRadius: tokens.radius.sm,
                        backgroundColor: (0, fleet_v4_1.skeletonFill)(theme),
                    } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        height: trackHeight(tokens.spacing.xs, compact),
                        borderRadius: tokens.radius.full,
                        backgroundColor: (0, fleet_v4_1.skeletonFill)(theme),
                    } })] }));
    }
    const pct = (0, fleet_v4_1.clampPercent)(percent) ?? 0;
    const low = Number.isFinite(lowThreshold) ? lowThreshold : 15;
    const band = bandFor(pct, low);
    const meta = BAND_META[band];
    const word = bandLabels?.[band] ?? meta.label;
    const heading = label ?? (kind === 'ev' ? 'Battery' : 'Fuel');
    const glyph = kind === 'ev' ? (charging ? '⚡' : '🔋') : '⛽';
    const spoken = [
        heading,
        charging ? chargingLabel : null,
        `${pct} percent`,
        word,
        rangeLabel,
    ]
        .filter(Boolean)
        .join(', ');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, size: "sm" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", children: heading }), charging ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "primaryText", children: chargingLabel })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(TextV4_1.TextV4, { size: "base", weight: "bold", numeric: "tabular", style: { color: (0, fleet_v4_1.toneInk)(theme, meta.tone) }, children: [pct, "%"] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: word })] })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: 100, now: pct }, style: {
                    height: trackHeight(tokens.spacing.xs, compact),
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.muted,
                    overflow: 'hidden',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: `${pct}%`,
                        height: '100%',
                        borderRadius: tokens.radius.full,
                        backgroundColor: (0, fleet_v4_1.toneFill)(theme, meta.tone),
                    } }) }), rangeLabel && !compact ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: rangeLabel })) : null] }));
}
//# sourceMappingURL=FuelChargeGaugeV4.js.map