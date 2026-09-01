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
exports.JournalPromptV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const Icon_1 = require("../primitives/Icon");
const JOURNAL_META = {
    reflection: { glyph: '🪞', label: 'Reflection' },
    gratitude: { glyph: '🙏', label: 'Gratitude' },
    intention: { glyph: '🎯', label: 'Intention' },
    growth: { glyph: '🌱', label: 'Growth' },
    emotion: { glyph: '💭', label: 'Emotion' },
};
/**
 * JournalPromptV4 — the calm redesign of {@link JournalPrompt}. Same props,
 * defaults, labels, answered affordance, and write/shuffle controls. Only the
 * visuals change: a clean surface card with a small gradient category badge as
 * the single calm accent; the prompt, response preview, and controls stay calm.
 */
exports.JournalPromptV4 = React.forwardRef(function JournalPromptV4({ prompt, category = 'reflection', response, answered = false, onWrite, onShuffle, writeLabel, className, ...rest }, ref) {
    const meta = JOURNAL_META[category] ?? JOURNAL_META.reflection;
    const cta = writeLabel ?? (answered ? 'Continue' : 'Write');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-journal-prompt": "", "aria-label": `${meta.label} prompt${answered ? ', answered' : ''}: ${prompt}`, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-sm p-5', 'flex flex-col gap-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, size: "base", color: "onPrimary" }) }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-xs font-bold uppercase tracking-wide text-primary", children: meta.label }), answered ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-success", children: "\u2713 Done" }) : null] }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg font-semibold text-on-surface", children: prompt }), response ? ((0, jsx_runtime_1.jsx)("div", { className: "border-l-[3px] border-l-primary pl-[var(--xen-space-sm)]", children: (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-3 text-sm italic text-muted", children: response }) })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-sm)]", children: [onWrite ? ((0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", className: "w-full", onClick: onWrite, children: cta }) })) : null, onShuffle ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", onClick: onShuffle, "aria-label": "Shuffle prompt", children: "\uD83D\uDD00" })) : null] })] }));
});
//# sourceMappingURL=JournalPromptV4.js.map