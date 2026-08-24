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
exports.StoryBarV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
function initials(name) {
    if (!name)
        return '?';
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map((w) => w[0]?.toUpperCase() ?? '').join('') || '?';
}
/**
 * StoryBar, design V3 — **compact rounded-square tiles**. Each story is a small
 * cover tile (image or tinted initials) with a scrim-backed name at the bottom;
 * ring state maps to the tile border (`unseen` primary, `seen` hairline, `live`
 * a badge, `add` a dashed `+`). Minimal/structural. Same props as
 * {@link StoryBar}, token-only.
 */
exports.StoryBarV3 = React.forwardRef(function StoryBarV3({ stories, onPressStory, showAdd = true, onPressAdd, addLabel = 'Your story', className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "list", className: (0, cn_1.cn)('flex gap-sm overflow-x-auto px-sm py-xs', className), ...rest, children: [showAdd ? ((0, jsx_runtime_1.jsx)("div", { role: "listitem", children: (0, jsx_runtime_1.jsx)(Tile, { state: "add", name: addLabel, onClick: onPressAdd }) })) : null, stories.map((s) => ((0, jsx_runtime_1.jsx)("div", { role: "listitem", children: (0, jsx_runtime_1.jsx)(Tile, { src: s.src, name: s.name, state: s.state ?? 'unseen', onClick: onPressStory ? () => onPressStory(s.id) : undefined }) }, s.id)))] }));
});
function Tile({ src, name, state, onClick, }) {
    const borderClass = state === 'add'
        ? 'border-2 border-dashed border-border'
        : state === 'seen'
            ? 'border border-border'
            : state === 'live'
                ? 'border-2 border-danger'
                : 'border-2 border-primary';
    const tile = ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative flex h-[92px] w-[68px] items-center justify-center overflow-hidden rounded-lg bg-primary/10', borderClass), children: [state === 'add' ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xl font-bold text-muted", "aria-hidden": "true", children: "+" })) : src ? ((0, jsx_runtime_1.jsx)("img", { src: src, alt: name ?? 'Story', loading: "lazy", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-primary", children: initials(name) })), state === 'live' ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute top-xs rounded-full bg-danger px-xs py-px text-xs font-bold text-on-danger", children: "LIVE" })) : null, name ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute inset-x-0 bottom-0 truncate bg-on-surface/60 px-xs py-px text-center text-xs font-semibold text-surface", children: name })) : null] }));
    if (!onClick)
        return tile;
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": state === 'add' ? 'Add to your story' : `${name ?? 'Story'}${state === 'live' ? ', live' : ''}`, onClick: onClick, className: "transition-transform hover:scale-[1.03] active:scale-[.98] motion-reduce:transition-none motion-reduce:hover:transform-none", children: tile }));
}
//# sourceMappingURL=StoryBarV3.js.map