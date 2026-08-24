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
exports.FeedList = FeedList;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Spinner_1 = require("../primitives/Spinner");
const EmptyState_1 = require("../commerce/EmptyState");
const PostCard_1 = require("./PostCard");
/**
 * The scrolling feed container: a vertical list with gap separators, an
 * optional refresh control, end-reached paging (via a scroll listener), a
 * header slot (StoryBar/composer), a `loading` skeleton state, and a built-in
 * {@link EmptyState} when there's nothing to show. Generic over the row type.
 * Web parity of the native `FeedList` (`FlatList`); token-only, `role="feed"`.
 */
function FeedList({ data, renderItem, keyExtractor, loading = false, loadingCount = 3, refreshing = false, onRefresh, onEndReached, ListHeaderComponent, ListFooterComponent, emptyTitle = 'Nothing here yet', emptyDescription = 'Posts will show up here as people you follow share them.', emptyAction, emptyIcon, scrollEnabled = true, className, contentClassName, ...rest }) {
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
    const innerClass = (0, cn_1.cn)('flex flex-col gap-md p-md', contentClassName);
    if (loading) {
        const skeletons = Array.from({ length: Math.max(1, loadingCount) });
        return ((0, jsx_runtime_1.jsx)("div", { "aria-busy": "true", "aria-label": "Loading feed", className: outerClass, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: innerClass, children: [ListHeaderComponent, skeletons.map((_, i) => ((0, jsx_runtime_1.jsx)(PostCard_1.PostCard, { variant: "text", author: { name: '' }, loading: true }, `skeleton-${i}`)))] }) }));
    }
    const isEmpty = data.length === 0;
    return ((0, jsx_runtime_1.jsx)("div", { role: "feed", className: outerClass, onScroll: onEndReached ? handleScroll : undefined, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: innerClass, children: [ListHeaderComponent, onRefresh ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": "Refresh", "aria-busy": refreshing || undefined, disabled: refreshing, onClick: onRefresh, className: "mx-auto inline-flex items-center gap-xs text-sm font-medium text-muted transition-opacity hover:opacity-70 disabled:pointer-events-none", children: [refreshing ? (0, jsx_runtime_1.jsx)(Spinner_1.Spinner, { size: "sm", "aria-label": "Refreshing" }) : '↻', (0, jsx_runtime_1.jsx)("span", { children: "Refresh" })] })) : null, isEmpty ? ((0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { icon: emptyIcon, title: emptyTitle, description: emptyDescription, action: emptyAction })) : (data.map((item, index) => ((0, jsx_runtime_1.jsx)(React.Fragment, { children: renderItem(item, index) }, keyExtractor ? keyExtractor(item, index) : String(index))))), ListFooterComponent] }) }));
}
//# sourceMappingURL=FeedList.js.map