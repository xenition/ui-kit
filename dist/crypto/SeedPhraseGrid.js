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
exports.SeedPhraseGrid = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * A recovery-phrase grid that is **hidden by default** — the words are masked
 * with dots and each tile is `aria-hidden` to screen readers until the holder
 * explicitly reveals them (uncontrolled: internal state starts hidden;
 * controlled: pass `revealed` + `onToggleReveal`). Each tile shows its 1-based
 * index. A `warning` line reinforces the sensitivity. Token-bound; no literal
 * colors. Indexing into `words` is guarded. Web parity of the native
 * `SeedPhraseGrid`.
 */
exports.SeedPhraseGrid = React.forwardRef(function SeedPhraseGrid({ words, columns = 3, revealed, onToggleReveal, revealLabel = 'Reveal', hideLabel = 'Hide', warning = 'Never share your recovery phrase.', className, ...rest }, ref) {
    const isControlled = revealed !== undefined;
    const [internal, setInternal] = React.useState(false);
    const isRevealed = isControlled ? Boolean(revealed) : internal;
    const cols = Math.max(1, Math.trunc(columns));
    const safeWords = Array.isArray(words) ? words : [];
    const toggle = () => {
        const next = !isRevealed;
        if (!isControlled)
            setInternal(next);
        onToggleReveal?.(next);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [warning != null ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs font-semibold text-warn", children: warning })) : null, (0, jsx_runtime_1.jsx)("div", { className: "grid gap-[var(--xen-space-xs)]", style: { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }, children: safeWords.map((word, index) => {
                    const shown = isRevealed ? word ?? '' : '••••••';
                    return ((0, jsx_runtime_1.jsxs)("div", { "aria-hidden": !isRevealed || undefined, "aria-label": isRevealed ? `Word ${index + 1}, ${word ?? ''}` : undefined, className: "flex items-center gap-1 rounded-[var(--xen-radius-sm)] border border-border bg-neutral-100 px-2 py-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs tabular-nums text-muted", children: index + 1 }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: shown })] }, index));
                }) }), (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-expanded": isRevealed, onClick: toggle, className: (0, cn_1.cn)('inline-flex items-center gap-1 self-start rounded-[var(--xen-radius-md)] border border-border px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-semibold text-on-surface', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: isRevealed ? '🙈' : '👁' }), isRevealed ? hideLabel : revealLabel] })] }));
});
//# sourceMappingURL=SeedPhraseGrid.js.map