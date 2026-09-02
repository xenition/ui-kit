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
exports.ChoreListV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const ChoreCardV4_1 = require("./ChoreCardV4");
const tone_v4_1 = require("./internal/tone-v4");
/** How many placeholder cards a loading list draws. */
const SKELETON_CARDS = 3;
/**
 * **V4 chore list** — new in V4; there is no base component.
 *
 * ## Three changes
 *
 * 1. **A chore screen with no chores renders something.** There was no list
 *    container at all, so an app looping over an empty array drew a blank
 *    region and nothing told the parent whether the week was clear or the
 *    request had failed. The list owns a real empty state with a headline and a
 *    next-step sentence.
 * 2. **Loading is the list's job, not the card's.** Every card carried its own
 *    `loading` prop and its own skeleton, so a loading screen meant the caller
 *    inventing how many placeholder cards to render and passing `loading` down
 *    to each — and the empty and loading states were duplicated inside all
 *    twelve components. The list draws the shape it is about to be.
 * 3. **The list is a list.** A stack of `div`s is not one: a screen reader gets
 *    no count and no "item 3 of 7" while moving through it. This is a `<ul>`
 *    with a count in its name.
 */
exports.ChoreListV4 = React.forwardRef(function ChoreListV4({ items, loading = false, skeletonCount = SKELETON_CARDS, loadingLabel = 'Loading chores', emptyLabel = 'No chores yet', emptyDescription, formatCount, onSelectItem, onCompleteItem, children, className, ...rest }, ref) {
    const list = Array.isArray(items) ? items : [];
    const count = formatCount ?? ((n) => `${n} ${n === 1 ? 'chore' : 'chores'}`);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ...rest, ref: ref, "data-xen-chore-list": "", role: "status", "aria-live": "polite", "aria-label": loadingLabel, className: (0, cn_1.cn)('flex flex-col gap-md', className), children: Array.from({ length: Math.max(1, Math.floor(skeletonCount)) }).map((_, index) => ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex flex-col gap-sm', tone_v4_1.KIDS_CARD_CLASS, tone_v4_1.KIDS_CARD_GROUND_CLASS), children: [(0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { className: "h-4 w-3/5" }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { className: "h-3 w-2/5" })] }, index))) }));
    }
    if (list.length === 0 && children == null) {
        return ((0, jsx_runtime_1.jsx)("div", { ...rest, ref: ref, "data-xen-chore-list": "", className: className, children: (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83E\uDDF9" }), title: emptyLabel, description: emptyDescription }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ...rest, ref: ref, "data-xen-chore-list": "", className: className, children: [(0, jsx_runtime_1.jsx)("ul", { "aria-label": count(list.length), className: "flex flex-col gap-md", children: list.map((item, index) => {
                    const { id, ...card } = item;
                    const key = id ?? index;
                    return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(ChoreCardV4_1.ChoreCardV4, { ...card, onClick: onSelectItem ? () => onSelectItem(key, index) : undefined, onComplete: onCompleteItem ? () => onCompleteItem(key, index) : undefined }) }, key));
                }) }), children] }));
});
//# sourceMappingURL=ChoreListV4.js.map