"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VitalStatV4 = VitalStatV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const goal_v4_1 = require("../../health/goal-v4");
const appearance_1 = require("../primitives/internal/appearance");
const tone_v4_1 = require("./internal/tone-v4");
/** Icon per variant. Identity, and nothing but identity. */
const VARIANT_GLYPH = {
    'heart-rate': '❤️',
    steps: '👟',
    calories: '🔥',
    distance: '📍',
    oxygen: '🫁',
    'blood-pressure': '🩺',
    temperature: '🌡️',
    respiration: '💨',
};
const VARIANT_LABEL = {
    'heart-rate': 'Heart rate',
    steps: 'Steps',
    calories: 'Calories',
    distance: 'Distance',
    oxygen: 'Blood oxygen',
    'blood-pressure': 'Blood pressure',
    temperature: 'Temperature',
    respiration: 'Respiration',
};
const VARIANT_UNIT = {
    'heart-rate': 'bpm',
    steps: '',
    calories: 'kcal',
    distance: 'km',
    oxygen: '%',
    'blood-pressure': 'mmHg',
    temperature: '°C',
    respiration: 'br/min',
};
/**
 * **V4 vital tile** — same props as {@link VitalStat} plus `range` and
 * `rangeLabels`. (`label` and `unit` are the base's own and keep their
 * meaning.)
 *
 * ## Five changes
 *
 * 1. **A heart rate is no longer permanently red.** `heart-rate` and
 *    `blood-pressure` were tinted `danger` and `calories` `warn` by *variant*,
 *    so a resting 58 bpm and a dangerous 190 bpm rendered identically — and in
 *    the same alarm colour, which teaches a user to ignore it. Discipline is
 *    identity and now gets the glyph; the value is ordinary ink.
 * 2. **Out of range is expressible.** Pass a `range` and the tile reads the
 *    verdict from the shared `rangeVerdict`, tones the value accordingly and
 *    prints the verdict as a **word**. With no `range` it behaves exactly as
 *    today, because a component that does not know the band must not guess.
 * 3. **The delta reaches the accessible name.** The base computed it,
 *    coloured it and drew it — and then set `accessibilityLabel` to the label
 *    and value only. Once the tile is a button that name *replaces* its
 *    contents, so the change the tile exists to show was sighted-only.
 * 4. **The non-pressable branch is `accessible`.** It set a label on a plain
 *    `Animated.View`, which is never an accessibility element on iOS, so the
 *    whole computed name was dead.
 * 5. **Press is a state layer**, not `opacity: pressed ? 0.8 : 1`.
 *
 * **Renders nothing without a `value`.**
 */
function VitalStatV4({ variant, value, unit, label, delta, range, rangeLabels, onPress, appearance = 'classic', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (value == null || value === '')
        return null;
    const resolvedUnit = unit ?? VARIANT_UNIT[variant];
    const resolvedLabel = label ?? VARIANT_LABEL[variant];
    const numeric = typeof value === 'number' ? value : Number(value);
    const verdict = Number.isFinite(numeric) ? (0, goal_v4_1.rangeVerdict)(numeric, range) : undefined;
    const verdictWord = verdict ? (rangeLabels?.[verdict] ?? tone_v4_1.RANGE_LABEL[verdict]) : null;
    const valueInk = verdict ? (0, tone_v4_1.toneInk)(theme, (0, tone_v4_1.verdictTone)(verdict)) : colors.onSurface;
    const sign = delta == null || delta === 0 ? '' : delta > 0 ? '+' : '−';
    const arrow = delta == null || delta === 0 ? '' : delta > 0 ? '▲ ' : '▼ ';
    const deltaAmount = delta != null && Number.isFinite(delta) ? String(Math.abs(delta)) : null;
    const deltaText = deltaAmount === null ? null : `${sign}${deltaAmount}`;
    const deltaInk = delta == null || delta === 0
        ? colors.mutedText
        : (0, tone_v4_1.toneInk)(theme, delta > 0 ? 'success' : 'danger');
    const name = (0, tone_v4_1.spokenLine)([
        resolvedLabel,
        `${String(value)}${resolvedUnit ? ` ${resolvedUnit}` : ''}`,
        verdictWord,
        deltaText,
    ]);
    const inner = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                ...(0, appearance_1.appearanceStyle)(appearance, colors, tokens),
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.md,
                gap: tokens.spacing.xs,
            },
            pressed ? { backgroundColor: (0, state_v4_1.pressFill)(theme) } : null,
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", allowFontScaling: false, accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: VARIANT_GLYPH[variant] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, style: { flex: 1 }, children: resolvedLabel })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", numeric: "tabular", style: { color: valueInk }, children: value }), resolvedUnit ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", style: { marginBottom: tokens.spacing.xs }, children: resolvedUnit })) : null] }), verdictWord ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", style: { color: (0, tone_v4_1.toneInk)(theme, (0, tone_v4_1.verdictTone)(verdict)) }, children: verdictWord })) : null, deltaAmount ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", numeric: "tabular", style: { color: deltaInk }, children: `${arrow}${deltaAmount}` })) : null] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, children: inner(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, children: ({ pressed }) => inner(pressed) }));
}
//# sourceMappingURL=VitalStatV4.js.map