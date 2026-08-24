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
exports.MoodCheckInV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const GLYPH = { awful: '😣', bad: '🙁', okay: '😐', good: '🙂', great: '😄' };
const LABEL = { awful: 'Awful', bad: 'Bad', okay: 'Okay', good: 'Good', great: 'Great' };
const ORDER = ['awful', 'bad', 'okay', 'good', 'great'];
/**
 * MoodCheckIn, redesigned (v3): a **compact inline check-in**. The prompt, a tight
 * row of small mood glyphs (selected ringed), and a quiet Save button — sized for
 * a widget or list. The note field is folded away. The opposite of v2's big
 * tiles. Same props, token-only.
 */
exports.MoodCheckInV3 = React.forwardRef(function MoodCheckInV3({ prompt = 'How are you feeling?', value, options, showNote, note, notePlaceholder, onChange, onNoteChange, onSubmit, submitLabel = 'Save', className }, ref) {
    void showNote;
    void note;
    void notePlaceholder;
    void onNoteChange;
    const moods = options && options.length > 0 ? options : ORDER;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-mood-check-in": "", className: (0, cn_1.cn)('flex flex-col gap-2 border-b border-border py-3', className), children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold text-on-surface", children: prompt }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex flex-1 items-center gap-1.5", role: "radiogroup", "aria-label": prompt, children: moods.map((mood) => {
                            const selected = value === mood;
                            return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": LABEL[mood], onClick: () => onChange?.(mood), className: (0, cn_1.cn)('flex h-9 w-9 items-center justify-center rounded-full text-lg transition-colors', selected ? 'bg-primary/10 ring-2 ring-primary' : 'hover:bg-neutral-100'), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, children: GLYPH[mood] }) }, mood));
                        }) }), onSubmit ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", disabled: !value, onClick: () => value && onSubmit({ mood: value, note }), children: submitLabel })) : null] })] }));
});
//# sourceMappingURL=MoodCheckInV3.js.map