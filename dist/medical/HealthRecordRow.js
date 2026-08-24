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
exports.HealthRecordRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const internal_1 = require("./internal");
const TYPE_META = {
    lab: { glyph: '🧪', label: 'Lab', tone: 'primary' },
    imaging: { glyph: '🩻', label: 'Imaging', tone: 'accent' },
    note: { glyph: '📝', label: 'Note', tone: 'muted' },
    immunization: { glyph: '💉', label: 'Immunization', tone: 'success' },
    prescription: { glyph: '💊', label: 'Prescription', tone: 'warn' },
    document: { glyph: '📄', label: 'Document', tone: 'muted' },
};
/**
 * A health-record list row for a patient timeline / documents screen — the web
 * mirror of the native `HealthRecordRow`. Shows a type-coded icon, the record
 * title, a provider · date meta line, a type tag, and an optional unread dot.
 * The type is labelled in text as well as token color-coded. When `onClick` is
 * set the row is a keyboard-activatable `role="button"`. Token-only colors.
 * Informational UI only — not a medical device.
 */
exports.HealthRecordRow = React.forwardRef(function HealthRecordRow({ type, title, date, provider, unread = false, onClick, className, ...rest }, ref) {
    const meta = TYPE_META[type] ?? TYPE_META.document;
    const toneClass = internal_1.TEXT_TONE[meta.tone];
    const interactive = !!onClick;
    const metaLine = [provider, date].filter(Boolean);
    const a11y = `${meta.label}: ${title}${metaLine.length ? `, ${metaLine.join(', ')}` : ''}${unread ? ', unread' : ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-health-record-row": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": a11y, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick?.();
                }
            }
            : undefined, className: (0, cn_1.cn)('flex min-h-[56px] items-center gap-[var(--xen-space-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive && 'cursor-pointer rounded-[var(--xen-radius-md)] transition-opacity hover:opacity-80', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, size: "lg" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-base text-on-surface', unread ? 'font-bold' : 'font-semibold'), children: title }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold', toneClass), children: meta.label }), metaLine.length ? ((0, jsx_runtime_1.jsxs)("span", { className: "truncate text-xs text-muted", children: ["\u00B7 ", metaLine.join('  ·  ')] })) : null] })] }), unread ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "h-2 w-2 rounded-full bg-primary" })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base text-muted", children: "\u203A" }))] }));
});
//# sourceMappingURL=HealthRecordRow.js.map