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
exports.QuestionCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * QuestionCard, redesigned (v3): a **minimal question block**. An inline `n.`
 * prefix runs into the prompt (danger asterisk when required), quiet help text,
 * the input children, and any error — borderless, no card chrome, for a dense
 * single-page form. The opposite of v2's panel. Same props, token-only.
 */
exports.QuestionCardV3 = React.forwardRef(function QuestionCardV3({ title, helpText, number, total, required = false, error, variant, children, className }, ref) {
    void variant;
    void total;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-question-card": "", className: (0, cn_1.cn)('flex flex-col gap-2 border-l-2 border-border pl-3', className), children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("h3", { className: "text-sm font-semibold text-on-surface", children: [typeof number === 'number' ? (0, jsx_runtime_1.jsxs)("span", { className: "text-muted", children: [number, ". "] }) : null, title, required ? (0, jsx_runtime_1.jsx)("span", { className: "text-danger", "aria-hidden": true, children: " *" }) : null, required ? (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: " (required)" }) : null] }), helpText ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: helpText }) : null] }), children, error ? (0, jsx_runtime_1.jsx)("p", { role: "alert", className: "text-xs font-medium text-danger", children: error }) : null] }));
});
//# sourceMappingURL=QuestionCardV3.js.map