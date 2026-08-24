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
exports.RelatedArticles = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const EmptyState_1 = require("../commerce/EmptyState");
const ArticleCard_1 = require("./ArticleCard");
/**
 * A "Related / Read next" section that renders a set of {@link ArticleCard}s.
 * Web (React DOM) mirror of the native `RelatedArticles`. Handles the three
 * real-world states: `loading` (skeleton cards), empty (a token-styled
 * {@link EmptyState}), and populated. Two layouts — a vertical `list` of compact
 * rows or a two-column `grid`. Colors come from `--xen-*` tokens (via the
 * composed cards).
 */
exports.RelatedArticles = React.forwardRef(function RelatedArticles({ articles, onArticleClick, title = 'Related', variant = 'list', loading = false, loadingCount = 3, emptyLabel = 'Nothing related yet', className, ...rest }, ref) {
    const grid = variant === 'grid';
    const heading = title != null ? ((0, jsx_runtime_1.jsx)("h2", { className: "mb-[var(--xen-space-sm)] text-lg font-extrabold text-on-surface", children: title })) : null;
    const layout = grid ? 'flex flex-wrap gap-[var(--xen-space-md)]' : 'flex flex-col gap-[var(--xen-space-md)]';
    if (loading) {
        const placeholders = Array.from({ length: Math.max(1, loadingCount) });
        return ((0, jsx_runtime_1.jsxs)("section", { ref: ref, className: className, ...rest, children: [heading, (0, jsx_runtime_1.jsx)("div", { className: layout, children: placeholders.map((_, i) => ((0, jsx_runtime_1.jsx)("div", { className: grid ? 'grow basis-[47%]' : undefined, children: (0, jsx_runtime_1.jsx)(ArticleCard_1.ArticleCard, { loading: true, variant: grid ? 'standard' : 'compact', article: { id: `skeleton-${i}`, title: '' } }) }, i))) })] }));
    }
    if (articles.length === 0) {
        return ((0, jsx_runtime_1.jsxs)("section", { ref: ref, className: className, ...rest, children: [heading, (0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { title: emptyLabel })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("section", { ref: ref, className: className, ...rest, children: [heading, (0, jsx_runtime_1.jsx)("div", { className: layout, children: articles.map((article) => ((0, jsx_runtime_1.jsx)("div", { className: grid ? 'grow basis-[47%]' : undefined, children: (0, jsx_runtime_1.jsx)(ArticleCard_1.ArticleCard, { article: article, onClick: onArticleClick, variant: grid ? 'standard' : 'compact' }) }, article.id))) })] }));
});
//# sourceMappingURL=RelatedArticles.js.map