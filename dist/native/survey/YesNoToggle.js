"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YesNoToggle = YesNoToggle;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * YesNoToggle — **V4** "clean form / focus" binary segmented control. Two big
 * side-by-side buttons on a calm neutral surface: the selected side fills with
 * the single signature accent — solid `primary` with `onPrimary` text — while
 * the other stays `surface` + `border`. No gradients. Exposed as a `radiogroup`
 * of two `radio`s so the choice is announced. Controlled via `value` +
 * `onChange`; token-only colors via `useXenitionTheme()`.
 */
function YesNoToggle({ value, onChange, yesLabel = 'Yes', noLabel = 'No', accessibilityLabel = 'Yes or no', disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const options = [
        { label: yesLabel, answer: true },
        { label: noLabel, answer: false },
    ];
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: accessibilityLabel, style: [{ flexDirection: 'row', gap: tokens.spacing.sm, opacity: disabled ? 0.5 : 1 }, style], children: options.map(({ label, answer }) => {
            const selected = value === answer;
            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected, disabled }, accessibilityLabel: label, disabled: disabled, onPress: () => onChange(answer), style: {
                    flex: 1,
                    height: 56,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.lg,
                    borderWidth: selected ? 2 : 1,
                    borderColor: selected ? colors.primary : colors.border,
                    backgroundColor: selected ? colors.primary : colors.surface,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: selected ? colors.onPrimary : colors.onSurface,
                        fontSize: tokens.typography.scale.lg,
                        fontWeight: '800',
                    }, children: label }) }, label));
        }) }));
}
//# sourceMappingURL=YesNoToggle.js.map