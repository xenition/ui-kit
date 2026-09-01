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
exports.ResponseSummaryV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * ResponseSummary — **V4** "focus" design. The calm, legible read-back of the
 * respondent's answers before submit: a titled list of airy rows where the
 * question sits small and muted above its bold on-surface answer. Skipped
 * answers render muted and italic with a spoken, explicit "Skipped" marker (not
 * color-only), and each row can expose a primary `Edit` affordance when `onEdit`
 * is supplied. An empty `answers` array renders a muted {@link EmptyState}. One
 * accent (primary), no gradients. Same props/behavior as
 * {@link ResponseSummaryProps}; all colors from `--xen-*` token classes (no
 * literal colors).
 */
exports.ResponseSummaryV4 = React.forwardRef(function ResponseSummaryV4({ answers, title = 'Review your answers', onEdit, editLabel = 'Edit', emptyText = 'No answers to review yet.', className }, ref) {
    if (answers.length === 0) {
        return (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, title: emptyText, className: className });
    }
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { ref: ref, className: className, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-md", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-extrabold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-sm", children: answers.map((a, i) => ((0, jsx_runtime_1.jsxs)("div", { "aria-label": a.skipped ? `${a.question}: skipped` : `${a.question}: ${a.answer}`, className: (0, cn_1.cn)('flex min-h-[44px] items-start gap-sm py-xs', i === 0 ? '' : 'border-t border-border pt-sm'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: a.question }), a.skipped ? ((0, jsx_runtime_1.jsx)("span", { className: "flex items-center gap-xs text-base font-medium italic text-muted", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "rounded-full bg-primary/10 px-xs text-xs font-bold not-italic text-muted", children: "Skipped" }) })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: a.answer }))] }), onEdit ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `${editLabel} ${a.question}`, onClick: () => onEdit(a.id), className: "flex min-h-[44px] items-center px-xs text-sm font-extrabold text-primary hover:opacity-90", children: editLabel })) : null] }, a.id))) })] }) }));
});
//# sourceMappingURL=ResponseSummaryV4.js.map