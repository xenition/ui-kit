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
exports.StoryBarV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
/**
 * StoryBar, design V2 — **large gradient-ring circles**. Each tile is an
 * oversized avatar inside a token-ramp gradient ring (`unseen` primary→accent
 * sweep, `live` a danger ring with a LIVE badge, `seen` a muted ring, `add` a
 * dashed ring with a `+`). Bold, media-forward. Same props as {@link StoryBar},
 * token-only; scrolls without a visible scrollbar.
 */
exports.StoryBarV2 = React.forwardRef(function StoryBarV2({ stories, onPressStory, showAdd = true, onPressAdd, addLabel = 'Your story', className, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "list", className: (0, cn_1.cn)('flex gap-md overflow-x-auto px-sm py-xs', className), ...rest, children: [showAdd ? ((0, jsx_runtime_1.jsx)("div", { role: "listitem", children: (0, jsx_runtime_1.jsx)(Ring, { state: "add", label: addLabel, onClick: onPressAdd }) })) : null, stories.map((s) => ((0, jsx_runtime_1.jsx)("div", { role: "listitem", children: (0, jsx_runtime_1.jsx)(Ring, { src: s.src, name: s.name, state: s.state ?? 'unseen', onClick: onPressStory ? () => onPressStory(s.id) : undefined }) }, s.id)))] }));
});
function Ring({ src, name, state, label, onClick, }) {
    const caption = label ?? (state === 'add' ? 'Your story' : name);
    const ringClass = (0, cn_1.cn)('flex h-[84px] w-[84px] items-center justify-center rounded-full p-0.5', state === 'unseen' && 'bg-gradient-to-tr from-primary via-accent to-primary-300', state === 'live' && 'bg-danger', state === 'seen' && 'bg-border', state === 'add' && 'border-2 border-dashed border-border');
    const ring = ((0, jsx_runtime_1.jsxs)("div", { className: "relative flex flex-col items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: ringClass, children: (0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center rounded-full bg-surface", children: state === 'add' ? ((0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-bold text-muted", "aria-hidden": "true", children: "+" })) : ((0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: src, name: name, size: "lg" })) }) }), state === 'live' ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute -bottom-1 rounded-full bg-danger px-sm py-px text-xs font-bold text-on-danger", children: "LIVE" })) : null, caption ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('max-w-[96px] truncate text-center text-xs', state === 'seen' ? 'text-muted' : 'text-on-surface'), children: caption })) : null] }));
    if (!onClick)
        return ring;
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": state === 'add' ? 'Add to your story' : `${name ?? 'Story'}${state === 'live' ? ', live' : ''}`, onClick: onClick, className: "transition-transform hover:scale-[1.03] active:scale-[.98] motion-reduce:transition-none motion-reduce:hover:transform-none", children: ring }));
}
//# sourceMappingURL=StoryBarV2.js.map