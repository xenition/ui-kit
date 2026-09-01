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
exports.MoodCheckInV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const Icon_1 = require("../primitives/Icon");
const MOOD_META = {
    awful: { glyph: '😣', label: 'Awful' },
    bad: { glyph: '🙁', label: 'Bad' },
    okay: { glyph: '😐', label: 'Okay' },
    good: { glyph: '🙂', label: 'Good' },
    great: { glyph: '😄', label: 'Great' },
};
const MOOD_ORDER = ['awful', 'bad', 'okay', 'good', 'great'];
/**
 * MoodCheckInV4 — the calm redesign of {@link MoodCheckIn}. Same props, defaults,
 * labels, radiogroup a11y, note field, and disabled-until-selected submit. Only
 * the visuals change: a clean surface card where the *selected* face sits on a
 * small gradient circle (the one calm accent), the others staying soft neutral.
 */
exports.MoodCheckInV4 = React.forwardRef(function MoodCheckInV4({ prompt = 'How are you feeling?', value, options, showNote = false, note = '', notePlaceholder = 'Add a note (optional)', onChange, onNoteChange, onSubmit, submitLabel = 'Save check-in', className, ...rest }, ref) {
    const moods = options && options.length > 0 ? options : MOOD_ORDER;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-mood-check-in": "", className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-sm p-5', 'flex flex-col gap-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-on-surface", children: prompt }), (0, jsx_runtime_1.jsx)("div", { role: "radiogroup", "aria-label": prompt, className: "flex justify-between gap-[var(--xen-space-xs)]", children: moods.map((mood) => {
                    const meta = MOOD_META[mood] ?? MOOD_META.okay;
                    const selected = value === mood;
                    const dimmed = !selected && value != null;
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": meta.label, onClick: () => onChange?.(mood), className: (0, cn_1.cn)('flex flex-1 flex-col items-center gap-[var(--xen-space-xs)]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 rounded-[var(--xen-radius-md)]'), children: [selected ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700 text-xl", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, size: "xl", color: "onPrimary" }) })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-xl', dimmed && 'opacity-50'), children: meta.glyph })), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', selected ? 'font-bold text-primary' : 'text-muted'), children: meta.label })] }, mood));
                }) }), showNote ? ((0, jsx_runtime_1.jsx)(primitives_1.Textarea, { rows: 3, value: note, onChange: (e) => onNoteChange?.(e.target.value), placeholder: notePlaceholder, "aria-label": "Mood note" })) : null, onSubmit ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", disabled: value == null, onClick: () => {
                    if (value != null)
                        onSubmit({ mood: value, note: showNote ? note : undefined });
                }, children: submitLabel })) : null] }));
});
//# sourceMappingURL=MoodCheckInV4.js.map