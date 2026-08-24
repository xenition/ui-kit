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
exports.OpenTextResponse = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * A free-text answer field — wraps the token `Textarea` primitive and adds a
 * survey-friendly live character counter (when `maxLength` is set) that turns to
 * the danger tone as the limit is reached, plus an optional error line. Fully
 * controlled (`value`/`onChange`). No literal colors.
 */
exports.OpenTextResponse = React.forwardRef(function OpenTextResponse({ value, onChange, placeholder, label, rows = 4, maxLength, error, disabled = false, className }, ref) {
    const atLimit = maxLength != null && value.length >= maxLength;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-xs', className), children: [label ? (0, jsx_runtime_1.jsx)("label", { className: "text-sm font-semibold text-on-surface", children: label }) : null, (0, jsx_runtime_1.jsx)(primitives_1.Textarea, { value: value, onChange: (e) => onChange(e.target.value), placeholder: placeholder, rows: rows, maxLength: maxLength, disabled: disabled, invalid: error != null, "aria-label": label ?? placeholder ?? 'Your answer' }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [error ? ((0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-sm font-semibold text-danger", children: error })) : ((0, jsx_runtime_1.jsx)("span", { className: "flex-1" })), maxLength != null ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-xs', atLimit ? 'font-bold text-danger' : 'font-normal text-muted'), children: [value.length, " / ", maxLength] })) : null] })] }));
});
//# sourceMappingURL=OpenTextResponse.js.map