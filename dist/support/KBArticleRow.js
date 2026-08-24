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
exports.KBArticleRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Badge_1 = require("../primitives/Badge");
const internal_1 = require("./internal");
const STATUS_LABEL = {
    published: 'Published',
    draft: 'Draft',
    archived: 'Archived',
};
/**
 * A knowledge-base article row for search results / suggested-answers panels —
 * a leading doc glyph, title, category + status, and view/helpful counts.
 * Activating fires `onClick(id)` (click + keyboard); an optional `onInsertLink`
 * lets an agent drop the article link into a reply (its own button, click does
 * not bubble to the row). Non-published articles carry a text status badge (never
 * color-only). Handles a `loading` placeholder. Token colors only.
 */
exports.KBArticleRow = React.forwardRef(function KBArticleRow({ article, onClick, onInsertLink, loading = false, className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": "Loading article", "aria-busy": "true", className: (0, cn_1.cn)('flex animate-pulse items-center gap-3 border-b border-border p-3', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "h-6 w-6 rounded-md bg-neutral-100" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-1 flex-col gap-1.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "h-3 w-[65%] rounded bg-neutral-100" }), (0, jsx_runtime_1.jsx)("span", { className: "h-2.5 w-[35%] rounded bg-neutral-100" })] })] }));
    }
    const status = article.status ?? 'published';
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
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `Article: ${article.title}${status !== 'published' ? `, ${STATUS_LABEL[status]}` : ''}` : undefined, onClick: activate, onKeyDown: activate ? (0, internal_1.activateOnKey)(activate) : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border p-3', interactive && 'cursor-pointer hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCC4", size: "lg" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 shrink truncate text-base font-semibold text-on-surface", children: article.title }), status !== 'published' ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "muted", children: STATUS_LABEL[status] })) : null] }), metaParts.length > 0 ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: metaParts.join(' · ') })) : null] }), onInsertLink ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Insert link to ${article.title}`, onClick: (e) => {
                    e.stopPropagation();
                    onInsertLink(article);
                }, className: "shrink-0 rounded p-1 hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDD17", size: "sm", color: "primary", "aria-label": "Insert link" }) })) : null] }));
});
//# sourceMappingURL=KBArticleRow.js.map