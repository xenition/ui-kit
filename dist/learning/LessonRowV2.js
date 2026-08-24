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
exports.LessonRowV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const STATUS_META = {
    locked: { glyph: '🔒', colorClass: 'text-muted', a11y: 'locked' },
    available: { glyph: '▷', colorClass: 'text-primary', a11y: 'available' },
    'in-progress': { glyph: '◑', colorClass: 'text-accent', a11y: 'in progress' },
    completed: { glyph: '✓', colorClass: 'text-success', a11y: 'completed' },
};
/**
 * LessonRow, redesigned (v2): an **elevated lesson card**. A numbered disc leads,
 * a tinted status glyph tile marks state, the title sits over a kind·duration
 * meta line, and a chevron hints navigation. Completed rows tint their disc
 * success. Distinct from v1's flat row. Same props, token-only.
 */
exports.LessonRowV2 = React.forwardRef(function LessonRowV2({ title, index, durationLabel, status = 'available', kind, onSelect, className, ...rest }, ref) {
    const meta = STATUS_META[status];
    const locked = status === 'locked';
    const done = status === 'completed';
    const interactive = typeof onSelect === 'function' && !locked;
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onSelect?.();
        }
    };
    const sub = [kind, durationLabel].filter((s) => !!s);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-lesson-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${typeof index === 'number' ? `Lesson ${index}, ` : ''}${title}, ${meta.a11y}`, "aria-disabled": locked || undefined, onClick: interactive ? () => onSelect?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, className: (0, cn_1.cn)('flex items-center gap-3 rounded-lg bg-surface p-3 shadow-sm transition-transform', interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0', locked && 'opacity-60', className), ...rest, children: [typeof index === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold', done ? 'bg-success/10 text-success' : 'bg-neutral-100 text-on-surface'), children: index })) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-lg', meta.colorClass), "aria-hidden": true, children: meta.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('truncate text-sm font-semibold text-on-surface', done && 'text-muted'), children: title }), sub.length > 0 ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: sub.join(' · ') }) : null] }), interactive ? (0, jsx_runtime_1.jsx)("span", { className: "text-muted", "aria-hidden": true, children: "\u203A" }) : null] }));
});
//# sourceMappingURL=LessonRowV2.js.map