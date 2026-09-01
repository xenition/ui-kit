"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherAdvisoryV4 = WeatherAdvisoryV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const farm_v4_1 = require("./internal/farm-v4");
/** Kind → glyph. Domain knowledge, so it stays here. */
const KIND_GLYPH = {
    frost: '❄️',
    heat: '🔥',
    rain: '🌧️',
    wind: '💨',
    drought: '🏜️',
    storm: '⛈️',
    general: '🌤️',
};
/**
 * Severity → tone and default label.
 *
 * `watch` and `warning` share `warn`: the tone scale has three steps and the
 * severity scale has four, and the **word** is what separates a watch from a
 * warning — which is exactly how a meteorological service separates them too.
 */
const SEVERITY_META = {
    info: { label: 'Info', tone: 'primary' },
    watch: { label: 'Watch', tone: 'warn' },
    warning: { label: 'Warning', tone: 'warn' },
    severe: { label: 'Severe', tone: 'danger' },
};
/** How far the advisory's ground travels from the card toward its tone. */
const GROUND_TINT = 0.1;
/**
 * **V4 weather advisory** — same props as {@link WeatherAdvisory} plus
 * `severityLabels`.
 *
 * ## Four changes
 *
 * 1. **Severity reads without colour**, via the badge word beside the tint.
 * 2. **The tint is mixed from resolved semantic colours** rather than left to
 *    a raw fill, so it lands correctly in dark mode.
 * 3. **The glyph takes the contrast-corrected ink**, not the fill slot.
 * 4. **`role="alert"` is on the severe end only.** The base announced every
 *    advisory as an alert including `info`, which trains a screen-reader user
 *    to ignore the ones that matter — an `info` advisory is a status, a
 *    `severe` one interrupts.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
function WeatherAdvisoryV4({ title, message, kind = 'general', severity = 'info', timeframe, icon, severityLabels, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!title)
        return null;
    const meta = SEVERITY_META[severity];
    const label = severityLabels?.[severity] ?? meta.label;
    const glyph = icon ?? KIND_GLYPH[kind];
    const ink = (0, farm_v4_1.toneInk)(theme, meta.tone);
    const fill = meta.tone === 'primary' ? colors.primary : meta.tone === 'warn' ? colors.warn : colors.danger;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View
    // Only the severe end interrupts. An `info` advisory that announces
    // itself as an alert is how a user learns to ignore all of them.
    , { 
        // Only the severe end interrupts. An `info` advisory that announces
        // itself as an alert is how a user learns to ignore all of them.
        accessibilityRole: severity === 'severe' ? 'alert' : 'summary', accessibilityLabel: [label, title, timeframe].filter(Boolean).join(', '), style: [
            {
                flexDirection: 'row',
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: (0, v4_depth_1.mixToken)(colors.card, fill, GROUND_TINT),
                padding: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, size: "2xl", style: { color: ink } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "base", weight: "bold", tone: "onCard", style: { flex: 1 }, children: title }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: label })] }), message ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onCard", children: message })) : null, timeframe ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "clock", size: "xs", color: "mutedText" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: timeframe })] })) : null] })] }));
}
//# sourceMappingURL=WeatherAdvisoryV4.js.map