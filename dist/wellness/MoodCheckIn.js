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
exports.MoodCheckIn = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
const MOOD_META = {
    awful: { glyph: '😣', label: 'Awful', color: 'danger' },
    bad: { glyph: '🙁', label: 'Bad', color: 'warn' },
    okay: { glyph: '😐', label: 'Okay', color: 'muted' },
    good: { glyph: '🙂', label: 'Good', color: 'primary' },
    great: { glyph: '😄', label: 'Great', color: 'success' },
};
const MOOD_ORDER = ['awful', 'bad', 'okay', 'good', 'great'];
/**
 * A daily mood check-in (web parity of the native block): a prompt, a
 * `radiogroup` of emoji faces from awful to great, an optional note field, and a
 * submit action. The selected face keeps a tinted ring in its mood tone and is
 * announced with `aria-checked` (state, not color alone); submit is disabled
 * until a mood is chosen. `onSubmit` returns the mood plus the note. Token-only
 * colors.
 */
exports.MoodCheckIn = React.forwardRef(function MoodCheckIn({ prompt = 'How are you feeling?', value, options, showNote = false, note = '', notePlaceholder = 'Add a note (optional)', onChange, onNoteChange, onSubmit, submitLabel = 'Save check-in', className, }, ref) {
    const moods = options && options.length > 0 ? options : MOOD_ORDER;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-mood-check-in": "", className: (0, cn_1.cn)(_tokens_1.CARD_SHELL, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className), children: [(0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-on-surface", children: prompt }), (0, jsx_runtime_1.jsx)("div", { role: "radiogroup", "aria-label": prompt, className: "flex justify-between gap-[var(--xen-space-xs)]", children: moods.map((mood) => {
                    const meta = MOOD_META[mood] ?? MOOD_META.okay;
                    const selected = value === mood;
                    const dimmed = !selected && value != null;
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": meta.label, onClick: () => onChange?.(mood), className: (0, cn_1.cn)('flex flex-1 flex-col items-center gap-[var(--xen-space-xs)]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 rounded-[var(--xen-radius-md)]'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-12 w-12 items-center justify-center rounded-full border-2 text-xl transition-opacity', selected
                                    ? (0, cn_1.cn)(_tokens_1.SLOT_BORDER[meta.color], _tokens_1.SLOT_TINT[meta.color])
                                    : 'border-border bg-surface', dimmed && 'opacity-50'), children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', selected ? (0, cn_1.cn)('font-bold', _tokens_1.SLOT_TEXT[meta.color]) : 'text-muted'), children: meta.label })] }, mood));
                }) }), showNote ? ((0, jsx_runtime_1.jsx)(primitives_1.Textarea, { rows: 3, value: note, onChange: (e) => onNoteChange?.(e.target.value), placeholder: notePlaceholder, "aria-label": "Mood note" })) : null, onSubmit ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", disabled: value == null, onClick: () => {
                    if (value != null)
                        onSubmit({ mood: value, note: showNote ? note : undefined });
                }, children: submitLabel })) : null] }));
});
//# sourceMappingURL=MoodCheckIn.js.map