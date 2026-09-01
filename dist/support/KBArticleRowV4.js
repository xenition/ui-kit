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
exports.KBArticleRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
// published → success, draft → warn, archived → muted. Each has a distinct glyph
// so status is never color-only.
const STATUS = {
    published: { glyph: '✓', label: 'Published', pill: 'bg-success/10 text-success' },
    draft: { glyph: '✎', label: 'Draft', pill: 'bg-warn/10 text-warn' },
    archived: { glyph: '⌷', label: 'Archived', pill: 'bg-muted/10 text-muted' },
};
/**
 * KBArticleRow — **V4** "calm console" design (web parity of the native V4). A
 * knowledge-base article row as an elevated rounded card: a leading doc glyph,
 * title, a soft-tint status pill carrying glyph + label (published→success,
 * draft→warn, archived→muted — never color alone), and a category · views ·
 * helpful meta hint. Activating fires `onClick(id)` (click + keyboard); an
 * optional `onInsertLink` gets its own ≥44px button that does not bubble to the
 * row. Hover/focus paints a soft-primary tint. Same props/behavior as
 * {@link KBArticleRowProps}; all colors from `--xen-*` token classes (no literal
 * hex). Dark-mode safe.
 */
exports.KBArticleRowV4 = React.forwardRef(function KBArticleRowV4({ article, onClick, onInsertLink, loading = false, className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": "Loading article", "aria-busy": "true", className: (0, cn_1.cn)('flex animate-pulse items-center gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-3 shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "h-9 w-9 shrink-0 rounded-full bg-on-surface/10" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-1 flex-col gap-1.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "h-3 w-[65%] rounded bg-on-surface/10" }), (0, jsx_runtime_1.jsx)("span", { className: "h-2.5 w-[35%] rounded bg-on-surface/10" })] })] }));
    }
    const status = article.status ?? 'published';
    const spec = STATUS[status] ?? STATUS.published;
    const views = typeof article.views === 'number' && article.views >= 0 ? article.views : undefined;
    const helpful = typeof article.helpful === 'number' && article.helpful >= 0 ? article.helpful : undefined;
    const metaParts = [];
    if (article.category)
        metaParts.push(article.category);
    if (views !== undefined)
        metaParts.push(`${views} views`);
    if (helpful !== undefined)
        metaParts.push(`${helpful} helpful`);
    if (article.updatedLabel)
        metaParts.push(article.updatedLabel);
    const interactive = typeof onClick === 'function';
    const activate = interactive ? () => onClick(article.id) : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Article: ${article.title}, ${spec.label}` : undefined, onClick: activate, onKeyDown: activate ? (0, internal_1.activateOnKey)(activate) : undefined, className: (0, cn_1.cn)('flex min-h-[44px] items-center gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-3 shadow-sm', interactive && 'cursor-pointer hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base text-primary", children: "\uD83D\uDCC4" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-1", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex flex-wrap items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 shrink truncate text-base font-semibold text-on-surface", children: article.title }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold', spec.pill), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: spec.glyph }), spec.label] })] }), metaParts.length > 0 ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: metaParts.join(' · ') })) : null] }), onInsertLink ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Insert link to ${article.title}`, onClick: (e) => {
                    e.stopPropagation();
                    onInsertLink(article);
                }, className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDD17" }) })) : null] }));
});
//# sourceMappingURL=KBArticleRowV4.js.map