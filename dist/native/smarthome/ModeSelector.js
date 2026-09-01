"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_MODES = void 0;
exports.ModeSelector = ModeSelector;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/** The default Home / Away / Night / Vacation mode set. */
exports.DEFAULT_MODES = [
    { id: 'home', label: 'Home', glyph: '🏠' },
    { id: 'away', label: 'Away', glyph: '🚶' },
    { id: 'night', label: 'Night', glyph: '🌙' },
    { id: 'vacation', label: 'Vacation', glyph: '✈️' },
];
/**
 * ModeSelector — **V4** "ambient" home-mode switch. A calm control-panel
 * `radiogroup` of big (≥44px) mode tiles: the **selected** mode is a solid
 * `primary` fill with `on-primary` glyph + label, while the rest stay on a calm
 * surface with a soft tint — one accent, nothing shouting. Each tile is a
 * `radio` with its selected state announced, and the meaning is carried by glyph
 * + label (never color alone). Presentational only: `value` in, `onChange` out.
 * Token-only colors via `useXenitionTheme()`; dark-mode safe.
 */
function ModeSelector({ value, onChange, modes = exports.DEFAULT_MODES, label = 'Home mode', disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const list = Array.isArray(modes) && modes.length > 0 ? modes : exports.DEFAULT_MODES;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: label, accessibilityState: { disabled }, style: [{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, style], children: list.map((mode) => {
            const selected = mode.id === value;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityLabel: mode.label, accessibilityState: { selected, disabled }, disabled: disabled, onPress: () => onChange?.(mode.id), style: ({ pressed }) => ({
                    flexGrow: 1,
                    flexBasis: '46%',
                    minHeight: 64,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.md,
                    borderRadius: tokens.radius.lg,
                    borderWidth: 1,
                    borderColor: selected ? colors.primary : colors.border,
                    backgroundColor: selected
                        ? colors.primary
                        : pressed
                            ? (0, color_1.withAlpha)(colors.primary, 0.06)
                            : colors.surface,
                    opacity: disabled ? 0.6 : 1,
                    ...(selected
                        ? { shadowColor: colors.primary, shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 }
                        : {}),
                }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale['2xl'] }, children: mode.glyph ?? '•' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '600',
                            color: selected ? colors.onPrimary : colors.onSurface,
                        }, children: mode.label })] }, mode.id));
        }) }));
}
//# sourceMappingURL=ModeSelector.js.map