"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterKeypadV3 = RegisterKeypadV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const DIGIT_ROWS = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
];
const KEY_LABEL = {
    decimal: 'Decimal point',
    doubleZero: 'Double zero',
    backspace: 'Backspace',
    clear: 'Clear entry',
};
/**
 * RegisterKeypad — design variant **V3**: a **compact, minimal grid**. Where V1
 * boxes every key in a bordered surface and V2 is a tall elevated pad, V3 strips
 * all chrome — no key borders, no fills, a hairline-underlined inline display —
 * for a dense number pad that tucks into a sidebar or a modal. Same props as
 * {@link RegisterKeypadProps}. Token-only; `pin` masks the display.
 */
function RegisterKeypadV3({ value = '', onChange, onKeyPress, variant = 'amount', showDisplay = true, displayPrefix, placeholder = '0', maxLength = 12, disabled = false, accessibilityLabel = 'Register keypad', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const applyKey = (key) => {
        switch (key) {
            case 'backspace':
                return value.slice(0, -1);
            case 'clear':
                return '';
            case 'decimal':
                return value.includes('.') || value.length >= maxLength ? value : `${value || '0'}.`;
            case 'doubleZero':
                return value.length + 2 > maxLength ? value : `${value}00`;
            default:
                return value.length >= maxLength ? value : `${value}${key}`;
        }
    };
    const press = (key) => {
        if (disabled)
            return;
        onKeyPress?.(key);
        const next = applyKey(key);
        if (next !== value)
            onChange?.(next);
    };
    const bottomLeft = variant === 'amount' ? 'decimal' : variant === 'number' ? 'doubleZero' : 'clear';
    const rows = [...DIGIT_ROWS, [bottomLeft, '0', 'backspace']];
    const displayText = variant === 'pin' ? '•'.repeat(value.length) : value;
    const keyLabel = (key) => KEY_LABEL[key] ?? key;
    const keyGlyph = (key) => {
        switch (key) {
            case 'decimal':
                return '.';
            case 'doubleZero':
                return '00';
            case 'backspace':
                return '⌫';
            case 'clear':
                return 'C';
            default:
                return key;
        }
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: accessibilityLabel, style: [{ gap: tokens.spacing.xs, opacity: disabled ? 0.5 : 1 }, style], children: [showDisplay ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Entry ${value || placeholder}`, style: {
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    justifyContent: 'flex-end',
                    gap: tokens.spacing.xs,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                    paddingBottom: tokens.spacing.xs,
                }, children: [displayPrefix ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: displayPrefix })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: value ? colors.onSurface : colors.muted,
                            fontSize: tokens.typography.scale.lg,
                            fontWeight: '600',
                        }, children: displayText || placeholder })] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: rows.map((row, r) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: row.map((key) => {
                        const isAction = key === 'backspace' || key === 'clear';
                        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: keyLabel(key), accessibilityState: { disabled }, disabled: disabled, onPress: () => press(key), style: ({ pressed }) => ({
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: 40,
                                borderRadius: tokens.radius.sm,
                                backgroundColor: pressed ? colors.border : 'transparent',
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: {
                                    color: isAction ? colors.muted : colors.onSurface,
                                    fontSize: tokens.typography.scale.base,
                                    fontWeight: '600',
                                }, children: keyGlyph(key) }) }, key));
                    }) }, r))) })] }));
}
//# sourceMappingURL=RegisterKeypadV3.js.map