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
exports.LiveCommentaryV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const KIND_META = {
    goal: { glyph: '⚽', label: 'Goal', key: true, tint: 'bg-success/10', border: 'border-success' },
    card: { glyph: '🟨', label: 'Card', key: true, tint: 'bg-warn/10', border: 'border-warn' },
    sub: { glyph: '🔁', label: 'Substitution', key: false, tint: 'bg-primary/10', border: 'border-primary' },
    chance: { glyph: '🎯', label: 'Chance', key: false, tint: 'bg-primary/10', border: 'border-border' },
    var: { glyph: '📺', label: 'VAR', key: false, tint: 'bg-primary/10', border: 'border-primary' },
    whistle: { glyph: '📣', label: 'Whistle', key: false, tint: 'bg-primary/10', border: 'border-border' },
    info: { glyph: '•', label: 'Update', key: false, tint: 'bg-primary/10', border: 'border-border' },
};
/**
 * LiveCommentary — **V4** "broadcast" design (web parity of the native V4). A
 * live text feed on an elevated card: a `live` header carries a pulsing
 * `danger` dot + "LIVE" label (never color alone), and each entry pairs a
 * minute chip with a kind glyph + text. Key events (goal / card) and any
 * `important` entry get a soft-tint accent lane. One accent: `primary`. Same
 * props/behavior as {@link LiveCommentaryProps} (drop-in) — keeps the entry
 * list contract, kinds/minutes, loading and empty states. All colors from
 * `--xen-*` token classes (no literals).
 */
exports.LiveCommentaryV4 = React.forwardRef(function LiveCommentaryV4({ entries, title = 'Live commentary', live = false, loadingRows, emptyLabel = 'No commentary yet', className, ...rest }, ref) {
    const shell = (0, cn_1.cn)('flex flex-col gap-2 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-4 text-on-surface shadow-sm', className);
    const header = ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1.5", children: [live ? ((0, jsx_runtime_1.jsxs)("span", { "aria-hidden": "true", className: "inline-flex items-center gap-1 rounded-full bg-danger/10 px-2 py-0.5 text-xs font-extrabold text-danger", children: [(0, jsx_runtime_1.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-danger" }), "LIVE"] })) : null, (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-base font-extrabold text-on-surface", children: title })] }));
    if (loadingRows && loadingRows > 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-busy": "true", "aria-label": "Loading commentary", className: shell, ...rest, children: [header, Array.from({ length: loadingRows }).map((_, i) => ((0, jsx_runtime_1.jsx)("div", { className: "h-6 rounded-sm bg-on-surface/10" }, i)))] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "list", className: shell, ...rest, children: [header, entries.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-1 py-6 text-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: emptyLabel }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Updates will stream in once the match kicks off." })] })) : (entries.map((e) => {
                const meta = KIND_META[e.kind ?? 'info'] ?? KIND_META.info;
                const accent = meta.key || e.important;
                return ((0, jsx_runtime_1.jsxs)("div", { role: "listitem", "aria-label": `${e.minute ? e.minute + ', ' : ''}${meta.label}: ${e.text}`, className: (0, cn_1.cn)('flex items-start gap-2 py-1.5', accent
                        ? (0, cn_1.cn)('rounded-sm border-l-[3px] pl-2', meta.border, meta.tint)
                        : ''), children: [e.minute ? ((0, jsx_runtime_1.jsx)("span", { className: "min-w-[40px] rounded-full bg-on-surface/5 px-1.5 py-0.5 text-center text-xs font-extrabold text-muted", children: e.minute })) : null, (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base leading-none", children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex-1 text-sm text-on-surface', accent ? 'font-semibold' : 'font-normal'), children: e.text })] }, e.id));
            }))] }));
});
//# sourceMappingURL=LiveCommentaryV4.js.map