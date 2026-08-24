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
exports.NoteCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * NoteCard, redesigned (v2): a **sticky-note card**. A warm-tinted note surface with
 * a folded corner; pinned notes gain a 📌 and a primary top edge. Title, body
 * preview, labels and a timestamp stack inside. Distinct from v1. Same props,
 * token-only.
 */
exports.NoteCardV2 = React.forwardRef(function NoteCardV2({ title, body, timestamp, pinned = false, labels, onClick, className }, ref) {
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-note-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": title, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        } } : undefined, className: (0, cn_1.cn)('flex flex-col gap-2 rounded-lg bg-warn/5 p-3 shadow-sm', pinned && 'border-t-2 border-primary', interactive && 'cursor-pointer transition-transform hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-bold text-on-surface", children: title }), pinned ? (0, jsx_runtime_1.jsx)("span", { "aria-label": "Pinned", children: "\uD83D\uDCCC" }) : null] }), body ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-3 text-sm text-muted", children: body }) : null, labels ? (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1", children: labels }) : null, timestamp ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: timestamp }) : null] }));
});
//# sourceMappingURL=NoteCardV2.js.map