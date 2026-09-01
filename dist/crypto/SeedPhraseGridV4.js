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
exports.SeedPhraseGridV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const market_v4_1 = require("./internal/market-v4");
/** The mask a hidden tile wears. */
const MASK = '••••••';
/**
 * **V4 seed-phrase grid** — the web twin of the native `SeedPhraseGridV4`, same
 * props as {@link SeedPhraseGrid} plus `wordLabel` and `revealWarning`.
 *
 * ## Four changes
 *
 * 1. **Revealing no longer makes a reader recite the recovery phrase.** Each
 *    tile was its own accessibility element with its own
 *    `aria-label="Word 3, harvest"`, so revealing turned twelve words into
 *    twelve stops read aloud in order — observed, not theorised, and the worst
 *    possible failure mode for this particular component. The tiles are
 *    decorative now and the grid is one group carrying one name, so nothing is
 *    spoken until the holder deliberately navigates into it.
 * 2. **A second warning while the words are visible.** See `revealWarning`.
 * 3. **The reveal control clears 44 and drops `aria-expanded`**, which pointed
 *    at nothing — the grid is always in the DOM, so the attribute described a
 *    disclosure that does not exist. The button's own label already flips
 *    between Reveal and Hide.
 * 4. **A press is a state layer, and the tile ground is a token.** The tiles
 *    were `bg-neutral-100` — a light-oriented ramp step, so a pale grid on a
 *    dark page — and the warning was inked with the `warn` fill.
 */
exports.SeedPhraseGridV4 = React.forwardRef(function SeedPhraseGridV4({ words, columns = 3, revealed, onToggleReveal, revealLabel = 'Reveal', hideLabel = 'Hide', warning = 'Never share your recovery phrase.', wordLabel, revealWarning = 'Make sure nobody can see your screen.', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const isControlled = revealed !== undefined;
    const [internal, setInternal] = React.useState(false);
    const isRevealed = isControlled ? Boolean(revealed) : internal;
    const cols = Math.max(1, Math.trunc(columns));
    const safeWords = Array.isArray(words) ? words : [];
    const speak = wordLabel ?? ((index, word) => `Word ${index + 1}, ${word}`);
    const toggle = () => {
        const next = !isRevealed;
        if (!isControlled)
            setInternal(next);
        onToggleReveal?.(next);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [warning != null ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs font-semibold text-warn-text", children: warning })) : null, isRevealed && revealWarning ? ((0, jsx_runtime_1.jsx)("p", { role: "status", "aria-live": "polite", className: "text-xs font-semibold text-warn-text", children: revealWarning })) : null, (0, jsx_runtime_1.jsx)("div", { role: "group", "aria-label": isRevealed ? (0, market_v4_1.spokenLine)(safeWords.map((word, i) => speak(i, word ?? ''))) : undefined, "aria-hidden": isRevealed ? undefined : true, className: "grid gap-xs", style: { gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }, children: safeWords.map((word, index) => ((0, jsx_runtime_1.jsxs)("div", { "aria-hidden": "true", className: (0, cn_1.cn)('flex items-center gap-xs rounded-[var(--xen-radius-sm)]', 'border border-border bg-card px-sm py-xs'), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs text-muted-text', market_v4_1.TABULAR_CLASS), children: index + 1 }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-card", children: isRevealed ? (word ?? '') : MASK })] }, index))) }), (0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: toggle, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)('inline-flex items-center gap-xs self-start rounded-[var(--xen-radius-md)]', 'border border-border px-md text-sm font-semibold text-on-surface', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', chrome_v4_1.MIN_TAP_CLASS), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: isRevealed ? '🙈' : '👁' }), isRevealed ? hideLabel : revealLabel] })] }));
});
//# sourceMappingURL=SeedPhraseGridV4.js.map