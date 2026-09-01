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
exports.TeamFormGuide = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const interactive_1 = require("./interactive");
/** Glyph + accessible word + semantic tint per result (color reinforces the letter, never alone). */
const RESULT_META = {
    W: { word: 'Win', pill: 'bg-success/10 text-success' },
    D: { word: 'Draw', pill: 'bg-warn/10 text-warn' },
    L: { word: 'Loss', pill: 'bg-danger/10 text-danger' },
};
/**
 * TeamFormGuide — **V4** "broadcast" design. A compact form line: an optional
 * caption followed by a row of small circular soft-tint pills, one per recent
 * result, ordered most-recent-first. Each pill shows its letter (W / D / L) and
 * carries a semantic tint — win→success, draw→warn, loss→danger — so the result
 * reads from letter + color together, never color alone. When `onResultPress`
 * is given each pill is an accessible ≥44px button. All colors from `--xen-*`
 * token classes (no literals); dark-mode safe.
 */
exports.TeamFormGuide = React.forwardRef(function TeamFormGuide({ results, label, onResultPress, className, ...rest }, ref) {
    const shell = (0, cn_1.cn)('flex items-center gap-2 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-3 text-on-surface shadow-sm', className);
    const summary = results.map((r) => RESULT_META[r]?.word ?? r).join(', ');
    const a11yRow = label ? `${label}: ${summary}` : `Recent form: ${summary}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: shell, ...rest, children: [label ? ((0, jsx_runtime_1.jsx)("span", { className: "flex-none text-xs font-bold uppercase tracking-wide text-muted", children: label })) : null, (0, jsx_runtime_1.jsx)("div", { role: "list", "aria-label": a11yRow, className: "flex flex-1 flex-wrap items-center gap-1.5", children: results.map((r, i) => {
                    const meta = RESULT_META[r] ?? RESULT_META.D;
                    const pill = ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-extrabold', meta.pill), children: r }));
                    if (onResultPress) {
                        return ((0, jsx_runtime_1.jsx)("div", { role: "listitem", className: (0, cn_1.cn)('inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full', interactive_1.FOCUS_RING), ...(0, interactive_1.tappableProps)(() => onResultPress(i), `${meta.word}`), children: pill }, i));
                    }
                    return ((0, jsx_runtime_1.jsx)("div", { role: "listitem", "aria-label": meta.word, className: "inline-flex items-center justify-center", children: pill }, i));
                }) })] }));
});
//# sourceMappingURL=TeamFormGuide.js.map