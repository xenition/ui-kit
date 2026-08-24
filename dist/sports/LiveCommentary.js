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
exports.LiveCommentary = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const KIND_META = {
    goal: { glyph: '⚽', label: 'Goal', border: 'border-success' },
    card: { glyph: '🟨', label: 'Card', border: 'border-warn' },
    sub: { glyph: '🔁', label: 'Substitution', border: 'border-primary' },
    chance: { glyph: '🎯', label: 'Chance', border: 'border-border' },
    var: { glyph: '📺', label: 'VAR', border: 'border-primary' },
    whistle: { glyph: '📣', label: 'Whistle', border: 'border-border' },
    info: { glyph: '•', label: 'Update', border: 'border-border' },
};
/**
 * A live text commentary feed — a vertical list of timestamped entries, each
 * with a kind glyph and an accessible kind prefix so meaning survives without
 * color. Handles a `live` header marker, a loading skeleton, and an empty
 * state. Presentational: pass shaped `entries`; nothing polls. Token-only
 * colors.
 */
exports.LiveCommentary = React.forwardRef(function LiveCommentary({ entries, title = 'Live commentary', live = false, loadingRows, emptyLabel = 'No commentary yet', className, ...rest }, ref) {
    const shell = (0, cn_1.cn)('flex flex-col gap-2 rounded-lg border border-border bg-surface p-4 text-on-surface', className);
    const header = ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [live ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "h-2 w-2 rounded-full bg-danger" })) : null, (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-base font-bold text-on-surface", children: title }), live ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-danger", children: "LIVE" }) : null] }));
    if (loadingRows && loadingRows > 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-busy": "true", "aria-label": "Loading commentary", className: shell, ...rest, children: [header, Array.from({ length: loadingRows }).map((_, i) => ((0, jsx_runtime_1.jsx)("div", { className: "h-6 rounded-sm bg-neutral-100" }, i)))] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "list", className: shell, ...rest, children: [header, entries.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-1 py-6 text-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: emptyLabel }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Updates will stream in once the match kicks off." })] })) : (entries.map((e) => {
                const meta = KIND_META[e.kind ?? 'info'] ?? KIND_META.info;
                return ((0, jsx_runtime_1.jsxs)("div", { role: "listitem", "aria-label": `${e.minute ? e.minute + ', ' : ''}${meta.label}: ${e.text}`, className: (0, cn_1.cn)('flex gap-2 py-1', e.important
                        ? (0, cn_1.cn)('rounded-sm border-l-[3px] bg-neutral-50 pl-2', meta.border)
                        : ''), children: [e.minute ? ((0, jsx_runtime_1.jsx)("span", { className: "min-w-[40px] text-xs font-bold text-muted", children: e.minute })) : null, (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm leading-none", children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex-1 text-sm text-on-surface', e.important ? 'font-semibold' : 'font-normal'), children: e.text })] }, e.id));
            }))] }));
});
//# sourceMappingURL=LiveCommentary.js.map