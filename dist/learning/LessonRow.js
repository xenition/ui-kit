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
exports.LessonRow = void 0;
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
 * A single lesson row for a course/module list: a status indicator (glyph +
 * semantic tone, never color alone), an optional index, title, content-kind and
 * duration meta, and a chevron affordance. `locked` rows are non-interactive and
 * announced as such. Interactive rows are a `role="button"` element with
 * Enter/Space keyboard activation. Token-only colors (`--xen-*`).
 */
exports.LessonRow = React.forwardRef(function LessonRow({ title, index, durationLabel, status = 'available', kind, onSelect, className, ...rest }, ref) {
    const meta = STATUS_META[status];
    const locked = status === 'locked';
    const interactive = !!onSelect && !locked;
    const a11yLabel = `${title}, ${meta.a11y}${durationLabel ? `, ${durationLabel}` : ''}`;
    const handleKeyDown = (e) => {
        if (!interactive)
            return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11yLabel, onClick: interactive ? onSelect : undefined, onKeyDown: handleKeyDown, className: (0, cn_1.cn)('flex items-center gap-3 rounded-[var(--xen-radius-md)] bg-surface px-3 py-3', locked && 'opacity-60', interactive && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-base', meta.colorClass), children: meta.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("span", { className: "truncate text-base font-semibold text-on-surface", children: [index != null ? `${index}. ` : '', title] }), kind || durationLabel ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: [kind, durationLabel].filter(Boolean).join(' · ') })) : null] }), interactive ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base text-muted", children: "\u203A" })) : null] }));
});
//# sourceMappingURL=LessonRow.js.map