"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterKeypad = RegisterKeypad;
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
 * A numeric entry grid for a register — tenders, quantities, and PINs. Keys are
 * emitted through `onKeyPress`, and value-mutating keys additionally fold into a
 * controlled `value` via `onChange` (append digit, single decimal, `00`,
 * backspace, clear). `pin` masks the display. Token-only: every surface, border,
 * and glyph color traces to a compiled theme token, and each key is a labelled
 * `button` for screen readers. No dependencies.
 */
function RegisterKeypad({ value = '', onChange, onKeyPress, variant = 'amount', showDisplay = true, displayPrefix, placeholder = '0', maxLength = 12, disabled = false, accessibilityLabel = 'Register keypad', style, }) {
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
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: accessibilityLabel, style: [{ gap: tokens.spacing.sm, opacity: disabled ? 0.5 : 1 }, style], children: [showDisplay ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Entry ${value || placeholder}`, style: {
                    flexDirection: 'row',
                    alignItems: 'baseline',
                    justifyContent: 'flex-end',
                    gap: tokens.spacing.xs,
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                }, children: [displayPrefix ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.lg }, children: displayPrefix })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: value ? colors.onSurface : colors.muted,
                            fontSize: tokens.typography.scale['2xl'],
                            fontWeight: '700',
                        }, children: displayText || placeholder })] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: rows.map((row, r) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: row.map((key) => {
                        const isAction = key === 'backspace' || key === 'clear';
                        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: keyLabel(key), accessibilityState: { disabled }, disabled: disabled, onPress: () => press(key), style: ({ pressed }) => ({
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: 52,
                                borderRadius: tokens.radius.md,
                                borderWidth: 1,
                                borderColor: colors.border,
                                backgroundColor: pressed ? colors.border : colors.surface,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: {
                                    color: isAction ? colors.muted : colors.onSurface,
                                    fontSize: tokens.typography.scale.xl,
                                    fontWeight: '600',
                                }, children: keyGlyph(key) }) }, key));
                    }) }, r))) })] }));
}
//# sourceMappingURL=RegisterKeypad.js.map