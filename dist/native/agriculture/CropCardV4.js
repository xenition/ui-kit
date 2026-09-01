"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CropCardV4 = CropCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const farm_v4_1 = require("./internal/farm-v4");
/** Stage → glyph, tone and default label. Domain knowledge, so it stays here. */
const STAGE_META = {
    seeding: { label: 'Seeding', glyph: '🌱', tone: 'neutral' },
    growing: { label: 'Growing', glyph: '🌿', tone: 'primary' },
    flowering: { label: 'Flowering', glyph: '🌸', tone: 'accent' },
    mature: { label: 'Mature', glyph: '🌾', tone: 'success' },
    harvested: { label: 'Harvested', glyph: '📦', tone: 'neutral' },
};
/**
 * Health → tone. Genuinely a status — healthy is good and critical is bad — so
 * this is one of the places §5 of the brief *keeps* the status colours.
 *
 * Typed as `ProgressTone` rather than `FarmTone` because the meter is the
 * narrower of the two consumers: `BadgeV4` takes `accent`, `ProgressV4` does
 * not, and a health value can never be `accent` anyway.
 */
const HEALTH_META = {
    healthy: { label: 'Healthy', tone: 'success' },
    stressed: { label: 'Stressed', tone: 'warn' },
    critical: { label: 'Critical', tone: 'danger' },
};
/**
 * **V4 crop card** — same props as {@link CropCard} plus `progressLabel`,
 * `stageLabels` and `healthLabels`.
 *
 * ## Five changes
 *
 * 1. **The skeleton stops being made of hairlines.** The base filled its
 *    loading bars with `colors.border` — a divider token asked to act as a
 *    block. See `internal/farm-v4`.
 * 2. **Press is a state layer over the card's own fill**, not `opacity: 0.85`
 *    on its content — which is the signal M3 spends 0.38 on to mean *disabled*,
 *    so a pressed card read as unavailable.
 * 3. **Type comes from `TextV4`.** The base hand-wrote `color`, `fontSize`,
 *    `fontWeight` and `fontFamily` on a raw `<Text>` six times in one file.
 * 4. **The location and harvest captions carry icons, not emoji glued into the
 *    string.** `'📍 ' + fieldLabel` cannot be tinted, cannot be replaced, and
 *    is read aloud by a screen reader as the emoji's name.
 * 5. **Nine English strings became props**, in a module whose whole contract is
 *    that copy is caller-supplied.
 *
 * `variant="compact"` still drops the meter and the captions, and `loading`
 * still renders the skeleton rather than a bordered blank.
 */
function CropCardV4({ name, variety, icon, stage = 'growing', health, progress, fieldLabel, harvestLabel, variant = 'detailed', loading = false, progressLabel = 'Maturity', stageLabels, healthLabels, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, farm_v4_1.skeletonBarStyle)(theme, { width: '60%', step: 'base' }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, farm_v4_1.skeletonBarStyle)(theme, { width: '40%', step: 'sm' }) })] }));
    }
    if (!name)
        return null;
    const stageMeta = STAGE_META[stage];
    const stageLabel = stageLabels?.[stage] ?? stageMeta.label;
    const glyph = icon ?? stageMeta.glyph;
    const healthMeta = health ? HEALTH_META[health] : null;
    const healthLabel = health ? (healthLabels?.[health] ?? healthMeta.label) : null;
    const detailed = variant === 'detailed';
    const pct = (0, farm_v4_1.clampPercent)(progress);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: glyph, size: detailed ? '2xl' : 'xl' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, children: name }), variety != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: variety })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: stageMeta.tone, variant: "soft", size: "sm", children: stageLabel }), healthMeta ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: healthMeta.tone, variant: "soft", size: "sm", children: healthLabel })) : null] })] }), detailed && pct != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.md, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: progressLabel }), (0, jsx_runtime_1.jsxs)(TextV4_1.TextV4, { size: "xs", weight: "semibold", numeric: "tabular", style: { color: healthMeta ? (0, farm_v4_1.toneInk)(theme, healthMeta.tone) : colors.onCard }, children: [pct, "%"] })] }), (0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: pct, tone: healthMeta ? healthMeta.tone : 'primary' })] })) : null, detailed && (fieldLabel != null || harvestLabel != null) ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: tokens.spacing.md,
                    marginTop: tokens.spacing.md,
                }, children: [fieldLabel != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "location", size: "xs", color: "mutedText" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: fieldLabel })] })) : null, harvestLabel != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "calendar", size: "xs", color: "mutedText" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: harvestLabel })] })) : null] })) : null] }));
    if (!onPress)
        return (0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: style, children: body });
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: [name, variety, stageLabel, healthLabel].filter(Boolean).join(', '), onPress: onPress, style: ({ pressed }) => ({
            borderRadius: tokens.radius.lg,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }), children: (0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: style, children: body }) }));
}
//# sourceMappingURL=CropCardV4.js.map