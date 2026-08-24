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
exports.AttachmentChip = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const KIND_GLYPH = {
    image: '🖼️',
    pdf: '📕',
    doc: '📄',
    sheet: '📊',
    audio: '🎵',
    video: '🎬',
    zip: '🗜️',
    file: '📎',
};
/**
 * A single mail attachment as a compact chip — kind glyph, file name, optional
 * size, and optional download / remove affordances (each a real `<button>`).
 * While `uploadProgress` is between 0 and 1 it reads as loading (`aria-busy`)
 * and suppresses the trailing actions. Surface, border, and the soft icon well
 * all resolve from token classes. No literal colors.
 */
exports.AttachmentChip = React.forwardRef(function AttachmentChip({ name, kind = 'file', size, uploadProgress, onClick, onDownload, onRemove, className }, ref) {
    const glyph = KIND_GLYPH[kind] ?? KIND_GLYPH.file;
    const uploading = uploadProgress != null && uploadProgress >= 0 && uploadProgress < 1;
    const pct = uploading ? Math.round((uploadProgress ?? 0) * 100) : null;
    const well = ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] bg-primary-50", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "base", color: "primary" }) }));
    const meta = ((0, jsx_runtime_1.jsxs)("span", { className: "min-w-0 flex-1 text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: "block truncate text-sm font-semibold text-on-surface", children: name }), uploading ? ((0, jsx_runtime_1.jsx)("span", { className: "block truncate text-xs text-muted", children: `Uploading… ${pct}%` })) : size ? ((0, jsx_runtime_1.jsx)("span", { className: "block truncate text-xs text-muted", children: size })) : null] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-busy": uploading || undefined, className: (0, cn_1.cn)('inline-flex max-w-[260px] items-center gap-[var(--xen-space-sm)] self-start rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]', className), children: [onClick ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `Attachment ${name}${size ? `, ${size}` : ''}${uploading ? ', uploading' : ''}`, onClick: onClick, className: "inline-flex min-w-0 flex-1 items-center gap-[var(--xen-space-sm)] transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: [well, meta] })) : ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex min-w-0 flex-1 items-center gap-[var(--xen-space-sm)]", children: [well, meta] })), !uploading && onDownload ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Download ${name}`, onClick: onDownload, className: "inline-flex shrink-0 items-center transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2913", size: "base", color: "muted" }) })) : null, !uploading && onRemove ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Remove ${name}`, onClick: onRemove, className: "inline-flex shrink-0 items-center transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u00D7", size: "base", color: "muted" }) })) : null] }));
});
//# sourceMappingURL=AttachmentChip.js.map