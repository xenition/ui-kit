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
exports.NoteCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * NoteCard, redesigned (v3): a **dense note line**. A pin dot (when pinned), the
 * title over a body-preview·timestamp subtitle, and labels folded in — a hairline
 * row for a notes list. The opposite of v2's sticky note. Same props, token-only.
 */
exports.NoteCardV3 = React.forwardRef(function NoteCardV3({ title, body, timestamp, pinned = false, labels, onClick, className }, ref) {
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-note-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": title, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        } } : undefined, className: (0, cn_1.cn)('flex items-start gap-2.5 border-b border-border py-2.5', pinned && 'border-l-2 border-l-primary pl-2', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), children: [pinned ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs", "aria-label": "Pinned", children: "\uD83D\uDCCC" }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: title }), body ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: body }) : null, labels ? (0, jsx_runtime_1.jsx)("div", { className: "mt-1 flex flex-wrap gap-1", children: labels }) : null] }), timestamp ? (0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-xs text-muted", children: timestamp }) : null] }));
});
//# sourceMappingURL=NoteCardV3.js.map