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
exports.PinInput = PinInput;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * OTP / PIN entry — the native mirror of the web `PinInput`. One single-char
 * `TextInput` box per character with ref-driven focus advance and backspace
 * retreat. No literal colors.
 */
function PinInput({ length = 6, value, onChange, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const refs = React.useRef([]);
    const chars = Array.from({ length }, (_, i) => value[i] ?? '');
    const setChar = (i, c) => {
        const ch = c.slice(-1);
        const next = chars.slice();
        next[i] = ch;
        onChange?.(next.join(''));
        if (ch && i < length - 1)
            refs.current[i + 1]?.focus();
    };
    const onKeyPress = (i, e) => {
        if (e.nativeEvent.key === 'Backspace' && !chars[i] && i > 0) {
            refs.current[i - 1]?.focus();
        }
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ flexDirection: 'row', gap: tokens.spacing.sm }, style], children: chars.map((c, i) => ((0, jsx_runtime_1.jsx)(react_native_1.TextInput, { ref: (el) => {
                refs.current[i] = el;
            }, keyboardType: "numeric", maxLength: 1, value: c, onChangeText: (t) => setChar(i, t), onKeyPress: (e) => onKeyPress(i, e), style: {
                width: 44,
                height: 48,
                textAlign: 'center',
                fontSize: tokens.typography.scale.lg,
                color: colors.onSurface,
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.sm,
            } }, i))) }));
}
//# sourceMappingURL=PinInput.js.map