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
exports.LessonRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const STATUS_META = {
    locked: { glyph: '🔒', text: 'text-muted', well: 'bg-neutral-100', a11y: 'locked' },
    available: { glyph: '▷', text: 'text-primary', well: 'bg-primary/10', a11y: 'available' },
    'in-progress': { glyph: '◑', text: 'text-accent', well: 'bg-accent/10', a11y: 'in progress' },
    completed: { glyph: '✓', text: 'text-success', well: 'bg-success/10', a11y: 'completed' },
};
/**
 * LessonRow — **V4** "campus" design (web parity of the native V4). An elevated
 * rounded row with a soft shadow, a status glyph tucked in a tone-tinted well
 * (glyph + tone, never color alone), an optional index, the title, a content-kind
 * · duration meta line, and a chevron affordance. `locked` rows are
 * non-interactive and announced as such; interactive rows are a keyboard-operable
 * `role="button"`. Honors the V4 `variant` — `full` (default) and `compact` (a
 * denser single line that hides the meta). All colors from `--xen-*` token
 * classes (no literals).
 */
exports.LessonRowV4 = React.forwardRef(function LessonRowV4({ title, index, durationLabel, status = 'available', kind, variant = 'full', onSelect, className, ...rest }, ref) {
    const meta = STATUS_META[status];
    const locked = status === 'locked';
    const interactive = !!onSelect && !locked;
    const compact = variant === 'compact';
    const a11yLabel = `${title}, ${meta.a11y}${durationLabel ? `, ${durationLabel}` : ''}`;
    const handleKeyDown = (e) => {
        if (!interactive)
            return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-lesson-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11yLabel, onClick: interactive ? onSelect : undefined, onKeyDown: handleKeyDown, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm px-[var(--xen-space-md)]', compact ? 'min-h-[44px] py-[var(--xen-space-sm)]' : 'min-h-[56px] py-[var(--xen-space-sm)]', locked && 'opacity-60', interactive && 'cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base', meta.well, meta.text), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("span", { className: "truncate text-base font-semibold text-on-surface", children: [index != null ? `${index}. ` : '', title] }), !compact && (kind || durationLabel) ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: [kind, durationLabel].filter(Boolean).join(' · ') })) : null] }), interactive ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base text-muted", children: "\u203A" }) : null] }));
});
//# sourceMappingURL=LessonRowV4.js.map