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
exports.QuestionCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * QuestionCard — **V4** "focus" design (web parity of the native V4). The calm,
 * legible take on a survey question: an elevated rounded surface with generous
 * air, a soft-primary number pill (`N / total`), a big prompt, and a slim
 * primary focus bar down the left edge — the single signature accent that
 * anchors the eye. Required shows a spoken danger asterisk; `error` flips the
 * focus bar and message to danger. Same props/behavior as
 * {@link QuestionCardProps}; all colors from `--xen-*` token classes (no literal
 * colors). `variant="compact"` tightens the padding.
 */
exports.QuestionCardV4 = React.forwardRef(function QuestionCardV4({ title, helpText, number, total, required = false, error, variant = 'default', children, className }, ref) {
    const compact = variant === 'compact';
    const showBadge = number != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-question-card": "", className: (0, cn_1.cn)('flex overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface shadow-sm', className), children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('w-1 shrink-0', error ? 'bg-danger' : 'bg-primary'), "aria-hidden": "true" }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-1 flex-col', compact ? 'gap-xs p-[var(--xen-space-md)]' : 'gap-sm p-[var(--xen-space-lg)]'), children: [showBadge ? ((0, jsx_runtime_1.jsx)("span", { className: "self-start rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-xs font-extrabold tracking-wide text-primary", children: total != null ? `${number} / ${total}` : `Q${number}` })) : null, (0, jsx_runtime_1.jsxs)("h3", { "aria-label": required ? `${title}, required` : undefined, className: (0, cn_1.cn)('font-extrabold leading-snug text-on-surface', compact ? 'text-lg' : 'text-xl'), children: [title, required ? (0, jsx_runtime_1.jsx)("span", { className: "text-danger", children: " *" }) : null] }), helpText ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: helpText }) : null, children ? (0, jsx_runtime_1.jsx)("div", { className: "mt-xs", children: children }) : null, error ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-bold text-danger", children: error }) : null] })] }));
});
//# sourceMappingURL=QuestionCardV4.js.map