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
exports.SchoolEventRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
// Native `accent` tone maps to `primary` on web (web Badge has no accent).
const TYPE_META = {
    holiday: { glyph: '🏖️', label: 'Holiday', tone: 'success' },
    exam: { glyph: '📝', label: 'Exam', tone: 'danger' },
    meeting: { glyph: '👥', label: 'Meeting', tone: 'primary' },
    trip: { glyph: '🚌', label: 'Trip', tone: 'primary' },
    activity: { glyph: '⚽', label: 'Activity', tone: 'primary' },
    deadline: { glyph: '⏳', label: 'Deadline', tone: 'warn' },
    other: { glyph: '🏫', label: 'Event', tone: 'neutral' },
};
/**
 * A row for a school-calendar item: a type icon, title, a date/time/location
 * line, and a type chip. When `onClick` is set the row is an accessible
 * `role="button"` with keyboard activation. Type is conveyed by glyph + label +
 * chip, not color alone. Token-bound throughout — no literal colors.
 */
exports.SchoolEventRow = React.forwardRef(function SchoolEventRow({ title, type = 'other', date, time, location, childName, onClick, className, ...rest }, ref) {
    const meta = TYPE_META[type] ?? TYPE_META.other;
    const metaParts = [date, time, location].filter((s) => !!s);
    const interactive = typeof onClick === 'function';
    const a11y = `${meta.label}: ${title}${date ? `, ${date}` : ''}`;
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-school-event-row": "", className: (0, cn_1.cn)('flex items-center gap-3 rounded-[var(--xen-radius-md)] border border-border bg-surface px-3 py-2', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11y, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, ...rest, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: meta.glyph, size: "xl" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-semibold text-on-surface", children: title }), metaParts.length > 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: metaParts.join(' · ') })) : null, childName ? (0, jsx_runtime_1.jsxs)("p", { className: "truncate text-xs text-muted", children: ["\uD83D\uDC76 ", childName] }) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, children: meta.label })] }));
});
//# sourceMappingURL=SchoolEventRow.js.map