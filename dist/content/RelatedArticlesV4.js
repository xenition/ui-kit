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
exports.RelatedArticlesV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const ArticleCardV4_1 = require("./ArticleCardV4");
/**
 * **V4 related articles** — the web twin of the native `RelatedArticlesV4`,
 * same props as {@link RelatedArticles} plus `emptyDescription` and
 * `loadingLabel`.
 *
 * ## Three changes
 *
 * 1. **Both twins compose the shared empty state.** Web composed `EmptyState`
 *    and native hand-rolled a bordered box, though `EmptyState` has existed in
 *    the native primitives all along — so the native empty rail could never
 *    carry an icon, a description or an action, and the two platforms drew the
 *    same prop two different ways.
 * 2. **The empty state gets a next step.** A title alone tells a reader that
 *    nothing is there and nothing about what to do; `emptyDescription` is the
 *    sentence under it.
 * 3. **Loading announces itself.** The base drew three silent grey cards. And
 *    the shim import is gone: this composes the primitives' `EmptyStateV4`, not
 *    the deprecated `../commerce/EmptyState` re-export the base reached for.
 */
exports.RelatedArticlesV4 = React.forwardRef(function RelatedArticlesV4({ articles, onArticleClick, title = 'Related', variant = 'list', loading = false, loadingCount = 3, emptyLabel = 'Nothing related yet', emptyDescription, loadingLabel = 'Loading related articles', className, ...rest }, ref) {
    const grid = variant === 'grid';
    const heading = title != null ? ((0, jsx_runtime_1.jsx)("h2", { className: "mb-sm text-lg font-bold text-on-surface", children: title })) : null;
    const layout = grid ? 'flex flex-wrap gap-md' : 'flex flex-col gap-md';
    if (loading) {
        const placeholders = Array.from({ length: Math.max(1, loadingCount) });
        return ((0, jsx_runtime_1.jsxs)("section", { ref: ref, className: className, ...rest, children: [heading, (0, jsx_runtime_1.jsx)("div", { role: "status", "aria-busy": "true", "aria-label": loadingLabel, className: layout, children: placeholders.map((_, index) => (
                    // The region is the one thing that announces; each card would
                    // otherwise report its own busy state and the reader would hear
                    // "loading article" three times over.
                    (0, jsx_runtime_1.jsx)("div", { "aria-hidden": true, className: grid ? 'grow basis-[47%]' : undefined, children: (0, jsx_runtime_1.jsx)(ArticleCardV4_1.ArticleCardV4, { loading: true, variant: grid ? 'standard' : 'compact', article: { id: `skeleton-${index}`, title: '' } }) }, index))) })] }));
    }
    if (articles.length === 0) {
        return ((0, jsx_runtime_1.jsxs)("section", { ref: ref, className: className, ...rest, children: [heading, (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyLabel, description: emptyDescription })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("section", { ref: ref, className: className, ...rest, children: [heading, (0, jsx_runtime_1.jsx)("div", { className: layout, children: articles.map((article) => ((0, jsx_runtime_1.jsx)("div", { className: grid ? 'grow basis-[47%]' : undefined, children: (0, jsx_runtime_1.jsx)(ArticleCardV4_1.ArticleCardV4, { article: article, onClick: onArticleClick, variant: grid ? 'standard' : 'compact' }) }, article.id))) })] }));
});
//# sourceMappingURL=RelatedArticlesV4.js.map