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
exports.QuestionCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * Framed container for one survey question — a token-bound {@link Card} with a
 * prompt, optional help line, an optional position badge (`numbered`), a
 * required marker, and a slot for the answer control. `compact` tightens the
 * padding for dense forms. The prompt is a `heading`; the required state is
 * spoken via `aria-label` (asterisk color is never the sole signal). No literal
 * colors — every value traces to a `--xen-*` token class.
 */
exports.QuestionCard = React.forwardRef(function QuestionCard({ title, helpText, number, total, required = false, error, variant = 'default', children, className }, ref) {
    const compact = variant === 'compact';
    const showBadge = variant === 'numbered' && number != null;
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, className: (0, cn_1.cn)(compact && '!p-[var(--xen-space-sm)]', className), children: (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col', compact ? 'gap-xs' : 'gap-sm'), children: [showBadge ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold tracking-widest text-primary", children: total != null ? `${number} / ${total}` : `Q${number}` })) : null, (0, jsx_runtime_1.jsxs)("h3", { "aria-label": required ? `${title}, required` : undefined, className: (0, cn_1.cn)('font-bold text-on-surface', compact ? 'text-base' : 'text-lg'), children: [title, required ? (0, jsx_runtime_1.jsx)("span", { className: "text-danger", children: " *" }) : null] }), helpText ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: helpText }) : null, children ? (0, jsx_runtime_1.jsx)("div", { className: "mt-xs", children: children }) : null, error ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold text-danger", children: error })) : null] }) }));
});
//# sourceMappingURL=QuestionCard.js.map