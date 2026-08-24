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
exports.NewsTicker = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
/** A single clickable headline (or plain text when no handler). */
function Headline({ item, onItemClick, clamp, }) {
    const text = (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold text-on-surface', clamp), children: item.text });
    if (!onItemClick)
        return text;
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": item.text, onClick: () => onItemClick(item.id), className: "min-w-0 shrink cursor-pointer text-left transition-opacity hover:opacity-70", children: text }));
}
/**
 * A breaking-news ticker — the accent "LIVE / BREAKING" strip of latest
 * headlines. Web (React DOM) mirror of the native `NewsTicker`. `scroll` lays
 * the headlines out in a single horizontally scrollable strip (separated by
 * middots); `stacked` renders them as vertical rows. Clicking a headline fires
 * `onItemClick(id)`. Handles `loading` and empty states. The label chip reuses
 * the `Badge` primitive; all colors from `--xen-*` token classes.
 */
exports.NewsTicker = React.forwardRef(function NewsTicker({ items, label = 'LIVE', onItemClick, variant = 'scroll', loading = false, emptyLabel = 'No headlines', className, ...rest }, ref) {
    const scroll = variant === 'scroll';
    const shell = (children) => ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "region", "aria-label": "Latest headlines", className: (0, cn_1.cn)('gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', scroll ? 'flex items-center' : 'flex flex-col items-stretch', className), ...rest, children: [label != null ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "danger", className: "shrink-0 self-center font-extrabold tracking-wide", children: label })) : null, children] }));
    if (loading) {
        return shell((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "Loading headlines\u2026" }));
    }
    if (items.length === 0) {
        return shell((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: emptyLabel }));
    }
    if (variant === 'stacked') {
        return shell((0, jsx_runtime_1.jsx)("div", { className: "flex flex-1 flex-col gap-[var(--xen-space-xs)]", children: items.map((item) => ((0, jsx_runtime_1.jsx)(Headline, { item: item, onItemClick: onItemClick, clamp: "line-clamp-2" }, item.id))) }));
    }
    return shell((0, jsx_runtime_1.jsx)("div", { className: "flex flex-1 items-center gap-[var(--xen-space-sm)] overflow-x-auto", children: items.map((item, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [i > 0 ? (0, jsx_runtime_1.jsx)("span", { className: "text-muted", children: "\u00B7" }) : null, (0, jsx_runtime_1.jsx)(Headline, { item: item, onItemClick: onItemClick, clamp: "whitespace-nowrap" })] }, item.id))) }));
});
//# sourceMappingURL=NewsTicker.js.map