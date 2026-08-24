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
exports.QuestionCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * QuestionCard, redesigned (v2): a **bold question panel**. A primary number
 * badge (`n / total`) tops the card, the prompt is large with a danger asterisk
 * when required, help text follows, then the input children and any error — an
 * elevated, prominent survey step. Same props, token-only.
 */
exports.QuestionCardV2 = React.forwardRef(function QuestionCardV2({ title, helpText, number, total, required = false, error, variant, children, className }, ref) {
    const compact = variant === 'compact';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-question-card": "", className: (0, cn_1.cn)('flex flex-col gap-3 rounded-lg bg-surface shadow-md', compact ? 'p-3' : 'p-md', className), children: [typeof number === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex w-fit items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary", children: typeof total === 'number' ? `${number} / ${total}` : `Q${number}` })) : null, (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("h3", { className: "text-lg font-bold text-on-surface", children: [title, required ? (0, jsx_runtime_1.jsx)("span", { className: "text-danger", "aria-hidden": true, children: " *" }) : null, required ? (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: " (required)" }) : null] }), helpText ? (0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 text-sm text-muted", children: helpText }) : null] }), children, error ? (0, jsx_runtime_1.jsx)("p", { role: "alert", className: "text-sm font-medium text-danger", children: error }) : null] }));
});
//# sourceMappingURL=QuestionCardV2.js.map