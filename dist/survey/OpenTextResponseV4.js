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
exports.OpenTextResponseV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * OpenTextResponse — **V4** "clean form / focus" design. A big, comfortable
 * multiline answer field on a calm `bg-surface`: a `border-border` hairline that
 * lifts to a soft **primary** ring/border on focus (the single signature accent),
 * an optional label, and a live character counter that turns **danger** once the
 * text meets or exceeds `maxLength`. Generous padding, rounded control, no
 * gradients. Fully controlled (`value`/`onChange`); preserves the `textbox`
 * a11y (`aria-label`, `aria-invalid`) and `maxLength` guard. Same props/behavior
 * as {@link OpenTextResponseProps}; all colors from `--xen-*` token classes (no
 * literal colors).
 */
exports.OpenTextResponseV4 = React.forwardRef(function OpenTextResponseV4({ value, onChange, placeholder, label, rows = 4, maxLength, error, disabled = false, className }, ref) {
    const atLimit = maxLength != null && value.length >= maxLength;
    const invalid = error != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-xs', className), children: [label ? (0, jsx_runtime_1.jsx)("label", { className: "text-sm font-semibold text-on-surface", children: label }) : null, (0, jsx_runtime_1.jsx)("textarea", { value: value, onChange: (e) => onChange(e.target.value), placeholder: placeholder, rows: rows, maxLength: maxLength, disabled: disabled, "aria-invalid": invalid || undefined, "aria-label": label ?? placeholder ?? 'Your answer', className: (0, cn_1.cn)('w-full resize-y rounded-[var(--xen-radius-lg)] border bg-surface px-md py-sm text-base text-on-surface', 'placeholder:text-muted transition-colors outline-none', 'focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary', 'disabled:pointer-events-none disabled:opacity-50', invalid ? 'border-danger focus-visible:ring-danger/40 focus-visible:border-danger' : 'border-border') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [error ? ((0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-sm font-semibold text-danger", children: error })) : ((0, jsx_runtime_1.jsx)("span", { className: "flex-1" })), maxLength != null ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-xs', atLimit ? 'font-bold text-danger' : 'font-normal text-muted'), children: [value.length, " / ", maxLength] })) : null] })] }));
});
//# sourceMappingURL=OpenTextResponseV4.js.map