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
exports.ChildSwitcherV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const tone_v4_1 = require("./internal/tone-v4");
/** The glyph each mood carries. The word lives on `ChildProfileCardV4`. */
const MOOD_GLYPH = {
    happy: '😊',
    excited: '🤩',
    calm: '😌',
    sad: '😢',
    tired: '😴',
    sick: '🤒',
};
/** How many placeholder tiles a loading strip draws. */
const SKELETON_TILES = 3;
/**
 * **V4 child switcher** — new in V4; there is no base component.
 *
 * ## Three changes
 *
 * 1. **A family app can say which child it is talking about.** Every component
 *    in this module takes exactly one child, and nothing in it picks that
 *    child — so the first control on every screen in a family app was one the
 *    kit did not ship, and each app drew its own.
 * 2. **The selection is `aria-current`, not a colour.** A tint on the chosen
 *    tile is invisible to a screen reader and to a colour-blind parent; the
 *    selected tile carries the state in its name as well, through
 *    `selectedLabel`.
 * 3. **Each tile is a real, 44-clearing `<button>`** with the child's name,
 *    and press is the M3 state layer rather than an opacity — 0.38 is the band
 *    M3 spends on *disabled*, so a pressed tile would read as one that cannot
 *    be chosen.
 */
exports.ChildSwitcherV4 = React.forwardRef(function ChildSwitcherV4({ items, selectedId, onSelect, label = 'Children', loading = false, skeletonCount = SKELETON_TILES, loadingLabel = 'Loading children', emptyLabel = 'No children yet', emptyDescription, addLabel, onAdd, selectedLabel = 'selected', children, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const list = Array.isArray(items) ? items : [];
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ...rest, ref: ref, "data-xen-child-switcher": "", role: "status", "aria-live": "polite", "aria-label": loadingLabel, className: (0, cn_1.cn)('flex gap-md overflow-x-auto', className), children: Array.from({ length: Math.max(1, Math.floor(skeletonCount)) }).map((_, index) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { className: (0, cn_1.cn)(tone_v4_1.GLYPH_SLOT_CLASS, 'rounded-full') }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { className: "h-3 w-12" })] }, index))) }));
    }
    if (list.length === 0 && children == null) {
        return ((0, jsx_runtime_1.jsx)("div", { ...rest, ref: ref, "data-xen-child-switcher": "", className: className, children: (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67" }), title: emptyLabel, description: emptyDescription }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ...rest, ref: ref, "data-xen-child-switcher": "", className: className, children: [(0, jsx_runtime_1.jsxs)("ul", { "aria-label": label, className: "flex gap-md overflow-x-auto", children: [list.map((item) => {
                        const selected = selectedId !== undefined && item.id === selectedId;
                        const name = (0, tone_v4_1.spokenLine)([item.name, selected ? selectedLabel : undefined]);
                        const glyph = item.mood ? MOOD_GLYPH[item.mood] : undefined;
                        return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": name, "aria-current": selected ? 'true' : undefined, onClick: () => onSelect?.(item.id), "data-xen-v4-state": "", style: (0, tone_v4_1.surfaceStateVars)(), className: (0, cn_1.cn)('flex flex-col items-center gap-xs rounded-[var(--xen-radius-md)]', 'bg-transparent px-sm py-xs', chrome_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: "lg", src: item.photoUrl, name: item.name, alt: "", ring: selected }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [glyph ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm leading-none", children: glyph })) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('max-w-[calc(var(--xen-space-2xl)*2)] truncate text-xs', selected ? 'font-semibold text-on-surface' : 'text-muted-text'), children: item.name })] })] }) }, item.id));
                    }), onAdd ? ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": addLabel ?? 'Add a child', onClick: () => onAdd(), "data-xen-v4-state": "", style: (0, tone_v4_1.surfaceStateVars)(), className: (0, cn_1.cn)('flex flex-col items-center gap-xs rounded-[var(--xen-radius-md)]', 'bg-transparent px-sm py-xs', chrome_v4_1.MIN_TAP_CLASS, tone_v4_1.FOCUS_RING_CLASS), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)(tone_v4_1.GLYPH_SLOT_CLASS, 'rounded-full border border-border text-xl'), children: "+" }), addLabel ? ((0, jsx_runtime_1.jsx)("span", { className: "max-w-[calc(var(--xen-space-2xl)*2)] truncate text-xs text-muted-text", children: addLabel })) : null] }) })) : null] }), children] }));
});
//# sourceMappingURL=ChildSwitcherV4.js.map