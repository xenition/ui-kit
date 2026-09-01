"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterKeypadV4 = RegisterKeypadV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
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
 * RegisterKeypad — **V4** "register" design. The tactile checkout take on a
 * numeric pad: **big ≥44px keys** with a soft-primary press, a **bold
 * `tabular-nums` amount display**, and distinct clear / backspace action keys
 * (the primary/danger accents a busy counter reaches for). Keys are emitted
 * through `onKeyPress`, and value-mutating keys fold into a controlled `value`
 * via `onChange` (append digit, single decimal, `00`, backspace, clear); `pin`
 * masks the display. Same props/behavior as {@link RegisterKeypadProps}; each key
 * is a labelled `button` for screen readers, token-only via `useXenitionTheme()`.
 */
function RegisterKeypadV4({ value = '', onChange, onKeyPress, variant = 'amount', showDisplay = true, displayPrefix, placeholder = '0', maxLength = 12, disabled = false, accessibilityLabel = 'Register keypad', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const accent = (0, internal_1.toneColor)(colors, 'primary');
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
                    borderRadius: tokens.radius.lg,
                    borderWidth: 2,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                    paddingVertical: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.lg,
                }, children: [displayPrefix ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: displayPrefix })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, allowFontScaling: false, style: {
                            color: value ? colors.onSurface : colors.muted,
                            fontSize: tokens.typography.scale['3xl'],
                            fontWeight: '800',
                        }, children: displayText || placeholder })] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: rows.map((row, r) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: row.map((key) => {
                        const isClear = key === 'clear';
                        const isBackspace = key === 'backspace';
                        const glyphColor = isClear ? colors.danger : isBackspace ? colors.muted : colors.onSurface;
                        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: keyLabel(key), accessibilityState: { disabled }, disabled: disabled, onPress: () => press(key), style: ({ pressed }) => ({
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: 56,
                                borderRadius: tokens.radius.lg,
                                borderWidth: isClear ? 2 : 1,
                                borderColor: isClear ? colors.danger : colors.border,
                                backgroundColor: pressed
                                    ? isClear
                                        ? (0, internal_1.withAlpha)(colors.danger, 0.14)
                                        : isBackspace
                                            ? colors.border
                                            : (0, internal_1.withAlpha)(accent, 0.14)
                                    : isBackspace
                                        ? (0, internal_1.withAlpha)(colors.muted, 0.08)
                                        : colors.surface,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: {
                                    color: glyphColor,
                                    fontSize: tokens.typography.scale['2xl'],
                                    fontWeight: '800',
                                }, children: keyGlyph(key) }) }, key));
                    }) }, r))) })] }));
}
//# sourceMappingURL=RegisterKeypadV4.js.map