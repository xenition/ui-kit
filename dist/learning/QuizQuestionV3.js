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
exports.QuizQuestionV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const MARKERS = ['A', 'B', 'C', 'D', 'E', 'F'];
/**
 * QuizQuestion, redesigned (v3): a **minimal borderless quiz**. No card — a small
 * counter, the prompt, and choices as compact full-width rows with a leading
 * marker ring that fills when chosen; review marks correct/incorrect with a
 * trailing glyph (never color alone). The opposite of v2's elevated grid. Same
 * props, token-only.
 */
exports.QuizQuestionV3 = React.forwardRef(function QuizQuestionV3({ prompt, choices, questionNumber, totalQuestions, selectedId, review = false, onSelect, hint, className, ...rest }, ref) {
    const numbered = questionNumber != null && totalQuestions != null;
    const rowClass = (choice) => {
        const isSelected = choice.id === selectedId;
        if (review) {
            if (choice.correct)
                return 'text-success';
            if (isSelected)
                return 'text-danger';
            return 'text-on-surface';
        }
        return isSelected ? 'text-primary' : 'text-on-surface hover:bg-neutral-50';
    };
    const markerClass = (choice) => {
        const isSelected = choice.id === selectedId;
        if (review) {
            if (choice.correct)
                return 'border-success text-success';
            if (isSelected)
                return 'border-danger text-danger';
            return 'border-border text-muted';
        }
        return isSelected ? 'border-primary bg-primary text-on-primary' : 'border-border text-muted';
    };
    const trailing = (choice) => {
        if (!review)
            return null;
        if (choice.correct)
            return '✓';
        if (choice.id === selectedId)
            return '✗';
        return null;
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": numbered ? `Question ${questionNumber} of ${totalQuestions}: ${prompt}` : prompt, className: (0, cn_1.cn)('flex flex-col gap-2', className), ...rest, children: [numbered ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-semibold text-muted", children: [questionNumber, " / ", totalQuestions] })) : null, (0, jsx_runtime_1.jsx)("h3", { className: "text-base font-bold text-on-surface", children: prompt }), choices.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: "No choices available" })) : ((0, jsx_runtime_1.jsx)("div", { role: "radiogroup", className: "flex flex-col", children: choices.map((choice, i) => {
                    const isSelected = choice.id === selectedId;
                    const t = trailing(choice);
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": isSelected, disabled: review, onClick: review ? undefined : () => onSelect?.(choice.id), className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5 text-left transition-colors motion-reduce:transition-none', rowClass(choice)), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold', markerClass(choice)), children: MARKERS[i] ?? String(i + 1) }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 text-sm", children: choice.label }), t ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-sm", children: t }) : null] }, choice.id));
                }) })), hint ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: hint }) : null] }));
});
//# sourceMappingURL=QuizQuestionV3.js.map