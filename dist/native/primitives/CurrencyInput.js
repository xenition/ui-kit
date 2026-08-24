"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyInput = CurrencyInput;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Currency field — a token-bound `TextInput` with a leading currency badge that
 * accepts digits and a single decimal point (capped to `precision`) and reports
 * the parsed `number` (or `null`) via `onChange`. Border flips to `danger` when
 * `invalid`; uses the `decimal-pad` keyboard. No literal colors.
 */
function CurrencyInput({ value, onChange, symbol = '$', precision = 2, placeholder = '0.00', invalid = false, disabled = false, accessibilityLabel = 'Amount', containerStyle, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // Local text buffer so a trailing "." or "0" survives while typing; it stays
    // in sync when the controlled value changes from outside.
    const [text, setText] = React.useState(value == null ? '' : String(value));
    React.useEffect(() => {
        const asNum = text === '' ? null : Number(text);
        if (value !== asNum && !(Number.isNaN(asNum ?? NaN) && value == null)) {
            setText(value == null ? '' : String(value));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    const sanitize = (raw) => {
        let cleaned = raw.replace(/[^0-9.]/g, '');
        const firstDot = cleaned.indexOf('.');
        if (firstDot !== -1) {
            const head = cleaned.slice(0, firstDot + 1);
            const tail = cleaned.slice(firstDot + 1).replace(/\./g, '');
            cleaned = head + tail.slice(0, Math.max(0, precision));
        }
        return cleaned;
    };
    const handle = (raw) => {
        const next = sanitize(raw);
        setText(next);
        if (next === '' || next === '.') {
            onChange?.(null);
            return;
        }
        const n = Number(next);
        onChange?.(Number.isNaN(n) ? null : n);
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: invalid ? colors.danger : colors.border,
                borderRadius: tokens.radius.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                opacity: disabled ? 0.5 : 1,
            },
            containerStyle,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: '600',
                }, children: symbol }), (0, jsx_runtime_1.jsx)(react_native_1.TextInput, { editable: !disabled, accessibilityLabel: accessibilityLabel, accessibilityState: { disabled }, value: text, onChangeText: handle, placeholder: placeholder, placeholderTextColor: colors.muted, keyboardType: "decimal-pad", style: {
                    flex: 1,
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    padding: 0,
                    textAlign: 'right',
                } })] }));
}
//# sourceMappingURL=CurrencyInput.js.map