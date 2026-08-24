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
exports.ChoreCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const STATUS_LABEL = {
    todo: 'To do',
    'in-progress': 'In progress',
    done: 'Done',
    skipped: 'Skipped',
};
const STATUS_BOX = {
    todo: '⬜',
    'in-progress': '🔄',
    done: '✅',
    skipped: '⏭️',
};
/**
 * ChoreCard, redesigned (v3): a **dense checklist line**. A leading status box
 * glyph, the title inline with a middot-joined assignee·due·points subtitle, and
 * a quiet trailing "Done" text button. A hairline separates rows so many stack
 * as a tight to-do list — the opposite of v2's tall quest card. Same props,
 * token-only.
 */
exports.ChoreCardV3 = React.forwardRef(function ChoreCardV3({ title, assignee, points, due, icon, status = 'todo', loading = false, onComplete, onClick, className, ...rest }, ref) {
    void icon;
    const isDone = status === 'done';
    const interactive = typeof onClick === 'function';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-chore-card": "", "aria-label": "Loading chore", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-5 w-5 animate-pulse rounded-sm bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-sm bg-neutral-200" })] }));
    }
    const subParts = [assignee, due, typeof points === 'number' ? `⭐ ${points}` : null].filter((s) => !!s);
    const a11y = `${title}, ${STATUS_LABEL[status]}`;
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-chore-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11y, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-lg leading-none", children: STATUS_BOX[status] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('truncate text-sm font-semibold text-on-surface', isDone && 'text-muted line-through'), children: title }), subParts.length > 0 ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: subParts.join(' · ') }) : null] }), !isDone && onComplete ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "ghost", onClick: (e) => {
                    e.stopPropagation();
                    onComplete();
                }, children: "Done" })) : null] }));
});
//# sourceMappingURL=ChoreCardV3.js.map