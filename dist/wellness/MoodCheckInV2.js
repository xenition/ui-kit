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
exports.MoodCheckInV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
const META = {
    awful: { glyph: '😣', label: 'Awful', color: 'danger' },
    bad: { glyph: '🙁', label: 'Bad', color: 'warn' },
    okay: { glyph: '😐', label: 'Okay', color: 'muted' },
    good: { glyph: '🙂', label: 'Good', color: 'primary' },
    great: { glyph: '😄', label: 'Great', color: 'success' },
};
const ORDER = ['awful', 'bad', 'okay', 'good', 'great'];
/**
 * MoodCheckIn, redesigned (v2): a **big face picker**. The prompt tops a row of
 * large mood tiles (selected fills its slot tint + ring with the label), an
 * optional note field, and a Save button. Bolder than v1. Same props, token-only.
 */
exports.MoodCheckInV2 = React.forwardRef(function MoodCheckInV2({ prompt = 'How are you feeling?', value, options, showNote = false, note, notePlaceholder = 'Add a note…', onChange, onNoteChange, onSubmit, submitLabel = 'Save check-in', className }, ref) {
    const moods = options && options.length > 0 ? options : ORDER;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-mood-check-in": "", className: (0, cn_1.cn)('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-md', className), children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: prompt }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-between gap-1.5", role: "radiogroup", "aria-label": prompt, children: moods.map((mood) => {
                    const m = META[mood] ?? META.okay;
                    const selected = value === mood;
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": m.label, onClick: () => onChange?.(mood), className: (0, cn_1.cn)('flex flex-1 flex-col items-center gap-1 rounded-lg py-2 transition-colors', selected ? (0, cn_1.cn)(_tokens_1.SLOT_TINT[m.color], 'ring-2 ring-primary') : 'hover:bg-neutral-50'), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl", "aria-hidden": true, children: m.glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-[10px]', selected ? _tokens_1.SLOT_TEXT[m.color] : 'text-muted'), children: m.label })] }, mood));
                }) }), showNote ? ((0, jsx_runtime_1.jsx)(primitives_1.Textarea, { value: note, placeholder: notePlaceholder, "aria-label": "Note", onChange: (e) => onNoteChange?.(e.target.value) })) : null, onSubmit ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "primary", className: "w-full", disabled: !value, onClick: () => value && onSubmit({ mood: value, note }), children: submitLabel })) : null] }));
});
//# sourceMappingURL=MoodCheckInV2.js.map