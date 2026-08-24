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
exports.QuizQuestionV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const MARKERS = ['A', 'B', 'C', 'D', 'E', 'F'];
/**
 * QuizQuestion, redesigned (v2): an **elevated quiz card with lettered tiles**. A
 * progress bar tops the card (Question X of Y), the prompt is large, and choices
 * render as big lettered tiles in a two-column grid — selected tiles fill
 * primary, review tiles glyph-mark correct/incorrect (never color alone). Same
 * props as {@link QuizQuestion}, token-only.
 */
exports.QuizQuestionV2 = React.forwardRef(function QuizQuestionV2({ prompt, choices, questionNumber, totalQuestions, selectedId, review = false, onSelect, hint, className, ...rest }, ref) {
    const numbered = questionNumber != null && totalQuestions != null;
    const pct = numbered ? Math.round((questionNumber / totalQuestions) * 100) : null;
    const tileClass = (choice) => {
        const isSelected = choice.id === selectedId;
        if (review) {
            if (choice.correct)
                return 'border-success bg-success/10 text-on-surface';
            if (isSelected)
                return 'border-danger bg-danger/10 text-on-surface';
            return 'border-border bg-surface text-on-surface';
        }
        return isSelected ? 'border-primary bg-primary/10 text-on-surface' : 'border-border bg-surface text-on-surface hover:bg-neutral-50';
    };
    const mark = (choice) => {
        if (!review)
            return null;
        if (choice.correct)
            return '✓';
        if (choice.id === selectedId)
            return '✗';
        return null;
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": numbered ? `Question ${questionNumber} of ${totalQuestions}: ${prompt}` : prompt, className: (0, cn_1.cn)('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-md', className), ...rest, children: [pct !== null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-bold uppercase tracking-wide text-primary", children: ["Question ", questionNumber, " of ", totalQuestions] }), (0, jsx_runtime_1.jsx)("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-neutral-100", children: (0, jsx_runtime_1.jsx)("div", { className: "h-full rounded-full bg-primary", style: { width: `${pct}%` } }) })] })) : null, (0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-bold text-on-surface", children: prompt }), choices.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: "No choices available" })) : ((0, jsx_runtime_1.jsx)("div", { role: "radiogroup", className: "grid grid-cols-1 gap-2 sm:grid-cols-2", children: choices.map((choice, i) => {
                    const isSelected = choice.id === selectedId;
                    const m = mark(choice);
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": isSelected, disabled: review, onClick: review ? undefined : () => onSelect?.(choice.id), className: (0, cn_1.cn)('flex items-center gap-3 rounded-md border-2 p-3 text-left transition-colors motion-reduce:transition-none', tileClass(choice)), children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-sm font-bold text-on-surface", children: MARKERS[i] ?? String(i + 1) }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 text-sm font-medium", children: choice.label }), m ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-base", children: m }) : null] }, choice.id));
                }) })), hint ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: hint }) : null] }));
});
//# sourceMappingURL=QuizQuestionV2.js.map