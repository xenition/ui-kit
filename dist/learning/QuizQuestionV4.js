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
exports.QuizQuestionV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const QuizOptionV4_1 = require("./QuizOptionV4");
const MARKERS = 'ABCDEFGH';
/**
 * QuizQuestion — **V4** "campus" design (web parity of the native V4). An
 * elevated rounded card with a soft shadow holding a "Question X of Y" pill, the
 * prompt, and a `radiogroup` of {@link QuizOptionV4}s. In `review` mode each
 * option resolves to a correct / incorrect / selected state (glyph + ring, never
 * color alone). Renders an empty-state note when there are no choices. Identical
 * props/behavior to {@link QuizQuestionProps}. All colors from `--xen-*` token
 * classes (no literals).
 */
exports.QuizQuestionV4 = React.forwardRef(function QuizQuestionV4({ prompt, choices, questionNumber, totalQuestions, selectedId, review = false, onSelect, hint, className, ...rest }, ref) {
    const resolveState = (choice) => {
        const isSelected = choice.id === selectedId;
        if (review) {
            if (choice.correct)
                return 'correct';
            if (isSelected)
                return 'incorrect';
            return 'default';
        }
        return isSelected ? 'selected' : 'default';
    };
    const numbered = questionNumber != null && totalQuestions != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-quiz-question": "", "aria-label": numbered ? `Question ${questionNumber} of ${totalQuestions}: ${prompt}` : prompt, className: (0, cn_1.cn)('flex flex-col gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm p-[var(--xen-space-lg)]', className), ...rest, children: [numbered ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex w-fit items-center rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold uppercase tabular-nums text-primary", children: ["Question ", questionNumber, " of ", totalQuestions] })) : null, (0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-bold text-on-surface", children: prompt }), choices.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: "No choices available" })) : ((0, jsx_runtime_1.jsx)("div", { role: "radiogroup", className: "flex flex-col gap-2", children: choices.map((choice, i) => ((0, jsx_runtime_1.jsx)(QuizOptionV4_1.QuizOptionV4, { label: choice.label, marker: MARKERS[i] ?? String(i + 1), state: resolveState(choice), selected: choice.id === selectedId, disabled: review, onSelect: review ? undefined : () => onSelect?.(choice.id) }, choice.id))) })), hint ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: hint }) : null] }));
});
//# sourceMappingURL=QuizQuestionV4.js.map