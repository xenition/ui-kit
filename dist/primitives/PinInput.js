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
const cn_1 = require("./cn");
/** OTP / PIN entry — one box per character, with focus advance. Bound to the theme tokens. */
function PinInput({ length = 6, value, onChange, className }) {
    const refs = React.useRef([]);
    const chars = Array.from({ length }, (_, i) => value[i] ?? '');
    const setChar = (i, c) => {
        const next = chars.slice();
        next[i] = c.slice(-1);
        onChange(next.join(''));
        if (c && i < length - 1)
            refs.current[i + 1]?.focus();
    };
    const onKeyDown = (i, e) => {
        if (e.key === 'Backspace' && !chars[i] && i > 0)
            refs.current[i - 1]?.focus();
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex gap-2', className), children: chars.map((c, i) => ((0, jsx_runtime_1.jsx)("input", { ref: (el) => {
                refs.current[i] = el;
            }, inputMode: "numeric", maxLength: 1, value: c, onChange: (e) => setChar(i, e.target.value), onKeyDown: (e) => onKeyDown(i, e), className: "h-11 w-10 rounded-[var(--xen-radius-sm)] border border-border bg-surface text-center text-lg text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary" }, i))) }));
}
//# sourceMappingURL=PinInput.js.map