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
exports.NoteCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * NoteCard — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a sticky note: a clean, softly-elevated
 * {@link Card} with a legible title and a clamped body preview. When
 * `pinned`, a soft **primary** wash + a left accent edge lift the note and a
 * pin marker appears. One primary accent, generous whitespace. Same
 * props/behavior as {@link NoteCardProps}; all colors from `--xen-*` token
 * classes (no literals).
 */
exports.NoteCardV4 = React.forwardRef(function NoteCardV4({ title, body, timestamp, pinned = false, labels, onClick, className }, ref) {
    const inner = ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { className: (0, cn_1.cn)('flex flex-col gap-2 rounded-[var(--xen-radius-lg)] border-l shadow-sm transition-colors', pinned ? 'border-l-[3px] border-l-primary bg-primary/[0.06]' : 'border-l-border bg-surface'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [pinned ? ((0, jsx_runtime_1.jsx)("span", { "aria-label": "Pinned", className: "text-sm text-primary", children: "\uD83D\uDCCC" })) : null, (0, jsx_runtime_1.jsx)("span", { className: "line-clamp-1 flex-1 text-base font-bold text-on-surface", children: title })] }), body ? (0, jsx_runtime_1.jsx)("span", { className: "line-clamp-3 text-sm leading-relaxed text-muted", children: body }) : null, labels ? (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1", children: labels }) : null, timestamp ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: timestamp }) : null] }));
    if (onClick) {
        return ((0, jsx_runtime_1.jsx)("button", { ref: ref, type: "button", "aria-label": title, onClick: onClick, className: (0, cn_1.cn)('block w-full text-left transition-opacity hover:opacity-90', className), children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, children: inner }));
});
//# sourceMappingURL=NoteCardV4.js.map