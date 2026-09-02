"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SleepStagesV4 = SleepStagesV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const tone_v4_1 = require("./internal/tone-v4");
const STAGE_ORDER = ['deep', 'rem', 'light', 'awake'];
const STAGE_LABEL = {
    deep: 'Deep',
    rem: 'REM',
    light: 'Light',
    awake: 'Awake',
};
/**
 * How far `light` sits from `deep` toward the page.
 *
 * Light sleep is deep sleep's paler relative, not a fifth idea, so it is a mix
 * of the same slot rather than another token — which also keeps the four
 * stages readable as an ordered set. A named constant for the same reason
 * `BadgeV4`'s `SOFT_MIX` is one: a bare `0.5` in a style block is a number
 * nobody can argue with later.
 */
const LIGHT_MIX = 0.5;
/**
 * Stage → fill.
 *
 * **Identity fills only — no status colour anywhere in this component.** A
 * stage is which part of a night this was, and `success` / `warn` / `danger`
 * spent on identity is exactly the defect `WorkoutCard`'s discipline tinting
 * and `MealCard`'s amber "Carbs" dot are. `awake` takes `muted`, the neutral
 * fill, which reads as an absence — which is what being awake at 3am is.
 */
function stageFill(theme, stage) {
    const { colors } = theme;
    switch (stage) {
        case 'deep':
            return colors.primary;
        case 'rem':
            return colors.accent;
        case 'light':
            return (0, v4_depth_1.mixToken)(colors.primary, colors.surface, LIGHT_MIX);
        case 'awake':
        default:
            return colors.muted;
    }
}
/**
 * **V4 sleep stages** — deep, REM, light and awake across one night. New in
 * V4; there is no base component.
 *
 * ## Why it exists
 *
 * `SleepBar` collapses a whole night to one number and one quality word, which
 * is the part of sleep tracking a user already knows: they were in bed for
 * seven and a half hours. What they cannot know without a picture is the shape
 * of those hours — that the seven and a half contained forty minutes of deep
 * sleep and five wakings. Two nights of identical length are routinely not the
 * same night, and the base module had no way to say so.
 *
 * ## Four things it does deliberately
 *
 * 1. **The bar is one accessible sentence** — "Sleep stages, Deep 52m, REM 1h
 *    20m, Light 4h 10m, Awake 18m, 6h 40m total" — rather than a row of
 *    unlabelled rectangles. The legend beneath is **hidden from the reader**,
 *    because it repeats that sentence word for word, and hearing a night twice
 *    is worse than hearing it once.
 * 2. **A stage is an identity, so it takes no status colour**, and the visible
 *    legend carries the word beside each swatch — nothing about the chart is
 *    conveyed by hue alone.
 * 3. **Every stretch is drawn at its true share of the night**, laid out by
 *    `flex` rather than by percentage arithmetic, so the stretches cannot
 *    round themselves a pixel apart from the totals printed beneath them.
 * 4. **An empty night is a real empty state** with a title, an optional
 *    next-step sentence, and `style` and `appearance` applied — the two guard
 *    branches in this module's base returned a bare `<Text>` and dropped both.
 */
function SleepStagesV4({ stages, stageLabels, formatDuration, showLegend = true, emptyLabel = 'No sleep stages recorded', emptyDescription, label = 'Sleep stages', appearance = 'classic', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const runs = (stages ?? []).filter((segment) => Number.isFinite(segment.minutes) && segment.minutes > 0);
    const duration = formatDuration ??
        ((minutes) => {
            const whole = Math.round(minutes);
            const hours = Math.floor(whole / 60);
            const rest = whole % 60;
            return hours > 0 ? `${hours}h ${rest}m` : `${rest}m`;
        });
    const word = (stage) => stageLabels?.[stage] ?? STAGE_LABEL[stage];
    if (runs.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [(0, tone_v4_1.cardStyle)(theme, appearance), style], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, tone_v4_1.spokenLine)([emptyLabel, emptyDescription]), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", children: emptyLabel }), emptyDescription ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: emptyDescription })) : null] }) }));
    }
    const total = runs.reduce((sum, segment) => sum + segment.minutes, 0);
    const totals = STAGE_ORDER.map((stage) => ({
        stage,
        minutes: runs
            .filter((segment) => segment.stage === stage)
            .reduce((sum, segment) => sum + segment.minutes, 0),
    })).filter((entry) => entry.minutes > 0);
    const name = (0, tone_v4_1.spokenLine)([
        label,
        ...totals.map((entry) => `${word(entry.stage)} ${duration(entry.minutes)}`),
        `${duration(total)} total`,
    ]);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [(0, tone_v4_1.cardStyle)(theme, appearance), style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "image", accessibilityLabel: name, style: {
                    flexDirection: 'row',
                    height: tokens.spacing.lg,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: (0, tone_v4_1.trackGround)(theme),
                    overflow: 'hidden',
                }, children: runs.map((segment, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { 
                    // `flex`, not a percentage: the stretches then divide the track
                    // exactly and cannot round themselves a pixel apart from their own
                    // totals.
                    style: { flex: segment.minutes, backgroundColor: stageFill(theme, segment.stage) } }, i))) }), showLegend ? ((0, jsx_runtime_1.jsx)(react_native_1.View
            // Hidden from the reader on purpose: the bar above already says every
            // one of these numbers, in one sentence.
            , { 
                // Hidden from the reader on purpose: the bar above already says every
                // one of these numbers, in one sentence.
                accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md }, children: totals.map((entry) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: tokens.spacing.sm,
                                height: tokens.spacing.sm,
                                borderRadius: tokens.radius.sm,
                                backgroundColor: stageFill(theme, entry.stage),
                            } }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: (0, tone_v4_1.metaLine)([word(entry.stage), duration(entry.minutes)]) })] }, entry.stage))) })) : null] }));
}
//# sourceMappingURL=SleepStagesV4.js.map