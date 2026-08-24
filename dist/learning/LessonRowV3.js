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
exports.LessonRowV3 = void 0;
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
 * LessonRow, redesigned (v3): a **syllabus line**. The 1-based index leads as a
 * monospace-tabular number, the status glyph and title share one line, and the
 * duration/kind hug the right — hairline-separated for a tight table of contents.
 * The opposite of v2's elevated card. Same props, token-only.
 */
exports.LessonRowV3 = React.forwardRef(function LessonRowV3({ title, index, durationLabel, status = 'available', kind, onSelect, className, ...rest }, ref) {
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
    const right = [kind, durationLabel].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-lesson-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": `${typeof index === 'number' ? `Lesson ${index}, ` : ''}${title}, ${meta.a11y}`, "aria-disabled": locked || undefined, onClick: interactive ? () => onSelect?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, className: (0, cn_1.cn)('flex items-center gap-2.5 border-b border-border py-2', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', locked && 'opacity-60', className), ...rest, children: [typeof index === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: "w-6 shrink-0 text-right text-xs tabular-nums text-muted", children: index })) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm', meta.colorClass), "aria-hidden": true, children: meta.glyph }), (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('min-w-0 flex-1 truncate text-sm text-on-surface', done && 'text-muted'), children: title }), right ? (0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-xs text-muted", children: right }) : null] }));
});
//# sourceMappingURL=LessonRowV3.js.map