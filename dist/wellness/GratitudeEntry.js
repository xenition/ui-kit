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
exports.GratitudeEntry = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
/**
 * A gratitude journal entry block (web parity of the native block): a prompt,
 * any existing entries as removable chips (or an empty note), a multi-line input
 * with an optional character counter, and a submit action disabled until the
 * draft is non-empty. `onSubmit` receives the trimmed text. Token-only colors.
 */
exports.GratitudeEntry = React.forwardRef(function GratitudeEntry({ prompt = 'What are you grateful for?', value = '', placeholder = 'I’m grateful for…', entries = [], maxLength, onChangeText, onSubmit, onRemove, submitLabel = 'Add', emptyLabel = 'No entries yet — add your first.', className, }, ref) {
    const trimmed = value.trim();
    const canSubmit = trimmed.length > 0;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-gratitude-entry": "", className: (0, cn_1.cn)(_tokens_1.CARD_SHELL, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-lg", children: "\uD83D\uDE4F" }), (0, jsx_runtime_1.jsx)("p", { className: "flex-1 text-lg font-bold text-on-surface", children: prompt })] }), entries.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: emptyLabel })) : ((0, jsx_runtime_1.jsx)("ul", { className: "flex list-none flex-col gap-[var(--xen-space-xs)]", children: entries.map((item) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] bg-primary/10 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm text-primary", children: "\u2726" }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-sm text-on-surface", children: item.text }), onRemove ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Remove: ${item.text}`, onClick: () => onRemove(item.id), className: "text-base text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: "\u2715" })) : null] }, item.id))) })), (0, jsx_runtime_1.jsx)(primitives_1.Textarea, { rows: 3, value: value, maxLength: maxLength, onChange: (e) => onChangeText?.(e.target.value), placeholder: placeholder, "aria-label": "Gratitude entry" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [maxLength != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [value.length, "/", maxLength] })) : ((0, jsx_runtime_1.jsx)("span", {})), onSubmit ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", disabled: !canSubmit, onClick: () => canSubmit && onSubmit(trimmed), children: submitLabel })) : null] })] }));
});
//# sourceMappingURL=GratitudeEntry.js.map