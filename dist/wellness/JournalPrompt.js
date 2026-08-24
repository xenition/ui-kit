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
exports.JournalPrompt = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
const JOURNAL_META = {
    reflection: { glyph: '🪞', label: 'Reflection', color: 'primary' },
    gratitude: { glyph: '🙏', label: 'Gratitude', color: 'success' },
    intention: { glyph: '🎯', label: 'Intention', color: 'accent' },
    growth: { glyph: '🌱', label: 'Growth', color: 'success' },
    emotion: { glyph: '💭', label: 'Emotion', color: 'primary' },
};
/**
 * A journaling prompt card (web parity of the native block): a category-tinted
 * header, the prompt itself, an optional saved-response preview, and a write /
 * continue action with an optional shuffle control for a fresh prompt.
 * `answered` adds a "✓ Done" marker and flips the CTA to continue (state via
 * marker + label, not color alone). Token-only colors.
 */
exports.JournalPrompt = React.forwardRef(function JournalPrompt({ prompt, category = 'reflection', response, answered = false, onWrite, onShuffle, writeLabel, className }, ref) {
    const meta = JOURNAL_META[category] ?? JOURNAL_META.reflection;
    const cta = writeLabel ?? (answered ? 'Continue' : 'Write');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-journal-prompt": "", "aria-label": `${meta.label} prompt${answered ? ', answered' : ''}: ${prompt}`, className: (0, cn_1.cn)(_tokens_1.CARD_SHELL, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-9 w-9 items-center justify-center rounded-full text-base', _tokens_1.SLOT_TINT[meta.color]), children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex-1 text-xs font-bold uppercase tracking-wide', _tokens_1.SLOT_TEXT[meta.color]), children: meta.label }), answered ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-success", children: "\u2713 Done" }) : null] }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg font-semibold text-on-surface", children: prompt }), response ? ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('border-l-[3px] pl-[var(--xen-space-sm)]', _tokens_1.SLOT_BORDER_L[meta.color]), children: (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-3 text-sm italic text-muted", children: response }) })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-sm)]", children: [onWrite ? ((0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", className: "w-full", onClick: onWrite, children: cta }) })) : null, onShuffle ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", onClick: onShuffle, "aria-label": "Shuffle prompt", children: "\uD83D\uDD00" })) : null] })] }));
});
//# sourceMappingURL=JournalPrompt.js.map