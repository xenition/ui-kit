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
exports.PhotoCarousel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const RATIO = {
    portrait: 'aspect-[4/5]',
    square: 'aspect-square',
    landscape: 'aspect-[3/2]',
};
/**
 * Photo pager for a profile — the web parity of the native photo carousel.
 * Clicking the left/right half of the frame steps between photos (real
 * `<button>` tap zones) with a segmented progress bar on top. Supports controlled
 * (`index`/`onIndexChange`) and uncontrolled use, plus explicit empty and loading
 * states. Token classes only — array access is guarded.
 */
exports.PhotoCarousel = React.forwardRef(function PhotoCarousel({ photos, index, onIndexChange, ratio = 'portrait', rounded = true, loading = false, emptyLabel = 'No photos yet', className, ...rest }, ref) {
    const list = photos ?? [];
    const controlled = index != null;
    const [internal, setInternal] = React.useState(0);
    const active = Math.max(0, Math.min(list.length - 1, controlled ? index : internal));
    const go = (next) => {
        const clamped = Math.max(0, Math.min(list.length - 1, next));
        if (!controlled)
            setInternal(clamped);
        if (clamped !== active)
            onIndexChange?.(clamped);
    };
    const frame = (0, cn_1.cn)('relative w-full overflow-hidden bg-neutral-200', RATIO[ratio], rounded && 'rounded-[var(--xen-radius-lg)]', className);
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": "Loading photos", className: frame, ...rest });
    }
    if (list.length === 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": emptyLabel, className: (0, cn_1.cn)(frame, 'flex flex-col items-center justify-center'), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-2xl", children: "\uD83D\uDCF7" }), (0, jsx_runtime_1.jsx)("span", { className: "mt-xs text-sm text-muted", children: emptyLabel })] }));
    }
    const current = list[active] ?? list[0];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: frame, ...rest, children: [(0, jsx_runtime_1.jsx)("img", { src: current.uri, alt: current.alt ?? `Photo ${active + 1} of ${list.length}`, className: "h-full w-full object-cover" }), (0, jsx_runtime_1.jsxs)("div", { className: "absolute inset-0 flex", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Previous photo", disabled: active === 0, onClick: () => go(active - 1), className: "flex-1 cursor-pointer disabled:cursor-default" }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Next photo", disabled: active >= list.length - 1, onClick: () => go(active + 1), className: "flex-1 cursor-pointer disabled:cursor-default" })] }), (0, jsx_runtime_1.jsx)("div", { "aria-label": `Photo ${active + 1} of ${list.length}${current.alt ? `: ${current.alt}` : ''}`, className: "absolute inset-x-sm top-sm flex gap-xs", children: list.map((p, i) => ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('h-[3px] flex-1 rounded-full', i <= active ? 'bg-surface' : 'bg-neutral-500') }, `${p.uri}-${i}`))) })] }));
});
//# sourceMappingURL=PhotoCarousel.js.map