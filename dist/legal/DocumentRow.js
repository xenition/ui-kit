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
exports.DocumentRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * One document in a matter's file: kind glyph, title, and a status pill (glyph +
 * word so state never rests on color alone), plus optional version / size /
 * modified metadata. `compact` collapses the metadata line. An optional
 * `onDownload` renders a trailing real `<button>`. When `onClick` is set the row
 * is an accessible `role="button"`. All colors are `--xen-*` token classes.
 */
exports.DocumentRow = React.forwardRef(function DocumentRow({ title, kind = 'other', status, modified, version, size, author, variant = 'default', onClick, onDownload, testID, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const kindMeta = internal_1.DOCUMENT_KIND_META[kind];
    const interactive = Boolean(onClick);
    const meta = [version, size, modified ? `Modified ${modified}` : undefined, author]
        .filter((s) => Boolean(s))
        .join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Document ${title}` : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive ? (0, internal_1.activateOnKey)(onClick) : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]', interactive && 'cursor-pointer hover:bg-neutral-100', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-lg leading-none", children: kindMeta.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: title }), !compact && meta ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: meta }) : null] }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.DOCUMENT_STATUS_META[status], variant: "inline", size: "sm" }) : null, onDownload ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Download ${title}`, onClick: (e) => {
                    e.stopPropagation();
                    onDownload();
                }, className: "rounded-[var(--xen-radius-sm)] px-[var(--xen-space-xs)] text-base text-primary hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: "\u2913" })) : null] }));
});
//# sourceMappingURL=DocumentRow.js.map