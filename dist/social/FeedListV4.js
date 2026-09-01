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
exports.FeedListV4 = FeedListV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Spinner_1 = require("../primitives/Spinner");
const EmptyState_1 = require("../commerce/EmptyState");
const PostCardV4_1 = require("./PostCardV4");
/**
 * FeedList — **V4** "feed" design (web parity of the native V4). The clean,
 * airy feed container: a vertical list with generous 8-pt gap separators, an
 * optional refresh control, end-reached paging (via a scroll listener), a
 * header slot (StoryBar/composer), a `loading` skeleton state built from
 * {@link PostCardV4}, and a built-in {@link EmptyState}. Generic over the row
 * type. Same props/behavior as {@link FeedListProps}; all colors from `--xen-*`
 * token classes (no literals). `role="feed"`.
 */
function FeedListV4({ data, renderItem, keyExtractor, loading = false, loadingCount = 3, refreshing = false, onRefresh, onEndReached, ListHeaderComponent, ListFooterComponent, emptyTitle = 'Nothing here yet', emptyDescription = 'Posts will show up here as people you follow share them.', emptyAction, emptyIcon, scrollEnabled = true, className, contentClassName, ...rest }) {
    const handleScroll = React.useCallback((e) => {
        if (!onEndReached)
            return;
        const el = e.currentTarget;
        // Fire when within 40% of a viewport from the bottom (mirrors RN's 0.4).
        if (el.scrollHeight - el.scrollTop - el.clientHeight <= el.clientHeight * 0.4) {
            onEndReached();
        }
    }, [onEndReached]);
    const outerClass = (0, cn_1.cn)(scrollEnabled ? 'overflow-y-auto' : 'overflow-visible', className);
    const innerClass = (0, cn_1.cn)('flex flex-col gap-lg p-md', contentClassName);
    if (loading) {
        const skeletons = Array.from({ length: Math.max(1, loadingCount) });
        return ((0, jsx_runtime_1.jsx)("div", { "aria-busy": "true", "aria-label": "Loading feed", className: outerClass, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: innerClass, children: [ListHeaderComponent, skeletons.map((_, i) => ((0, jsx_runtime_1.jsx)(PostCardV4_1.PostCardV4, { variant: "text", author: { name: '' }, loading: true }, `skeleton-${i}`)))] }) }));
    }
    const isEmpty = data.length === 0;
    return ((0, jsx_runtime_1.jsx)("div", { role: "feed", className: outerClass, onScroll: onEndReached ? handleScroll : undefined, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: innerClass, children: [ListHeaderComponent, onRefresh ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": "Refresh", "aria-busy": refreshing || undefined, disabled: refreshing, onClick: onRefresh, className: "mx-auto inline-flex min-h-[44px] items-center gap-xs rounded-full px-md text-sm font-medium text-primary transition-colors hover:bg-primary/10 active:bg-primary/10 disabled:pointer-events-none", children: [refreshing ? (0, jsx_runtime_1.jsx)(Spinner_1.Spinner, { size: "sm", "aria-label": "Refreshing" }) : '↻', (0, jsx_runtime_1.jsx)("span", { children: "Refresh" })] })) : null, isEmpty ? ((0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { icon: emptyIcon, title: emptyTitle, description: emptyDescription, action: emptyAction })) : (data.map((item, index) => ((0, jsx_runtime_1.jsx)(React.Fragment, { children: renderItem(item, index) }, keyExtractor ? keyExtractor(item, index) : String(index))))), ListFooterComponent] }) }));
}
//# sourceMappingURL=FeedListV4.js.map