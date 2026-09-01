"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SleepTimer = SleepTimer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/** Default preset durations (minutes) offered by a {@link SleepTimer}. */
const DEFAULT_PRESETS = [5, 15, 30, 45, 60];
/**
 * SleepTimer — **V4** "spotlight" design. A sleep-timer control on a clean
 * elevated surface: a row of quick-preset chips plus an "Off" chip and an
 * optional "End of episode" chip. The active choice is the one accent — a solid
 * **primary** fill with `onPrimary` ink; the rest are a soft primary tint. Chips
 * are ≥44px tap targets, grouped as a `radiogroup`, and the active timer is
 * announced. Presentational only; token-only colors via `useXenitionTheme()`
 * and `withAlpha` (no literal hex). Dark-mode safe.
 */
function SleepTimer({ value, onChange, presets = DEFAULT_PRESETS, endOfEpisode, onEndOfEpisode, title = 'Sleep timer', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const eoeSelected = !!endOfEpisode;
    const announce = eoeSelected
        ? 'Sleep timer: end of episode'
        : value == null
            ? 'Sleep timer off'
            : `Sleep timer: ${value} minutes`;
    const chip = (key, label, selected, onPress, a11yLabel) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityLabel: a11yLabel ?? label, accessibilityState: { selected }, onPress: onPress, style: ({ pressed }) => ({
            minHeight: 44,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: tokens.radius.full,
            paddingHorizontal: tokens.spacing.md,
            backgroundColor: selected ? colors.primary : (0, color_1.withAlpha)(colors.primary, 0.12),
            opacity: pressed ? 0.85 : 1,
        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                color: selected ? colors.onPrimary : colors.onSurface,
                fontSize: tokens.typography.scale.sm,
                fontWeight: '600',
            }, children: label }) }, key));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.card,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                padding: tokens.spacing.md,
                gap: tokens.spacing.sm,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '700',
                    letterSpacing: 0.5,
                    textTransform: 'uppercase',
                    paddingHorizontal: tokens.spacing.xs,
                }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLiveRegion: "polite", accessibilityLabel: announce, style: { position: 'absolute', width: 1, height: 1, overflow: 'hidden', opacity: 0 } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: title, style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: [chip('off', 'Off', value == null && !eoeSelected, () => onChange(null)), presets.map((min) => chip(String(min), `${min}m`, !eoeSelected && value === min, () => onChange(min), `${min} minutes`)), onEndOfEpisode ? chip('eoe', 'End of episode', eoeSelected, onEndOfEpisode) : null] })] }));
}
//# sourceMappingURL=SleepTimer.js.map