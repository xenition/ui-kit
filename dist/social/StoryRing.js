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
exports.StoryRing = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const RING_TONE = {
    unseen: 'border-primary',
    seen: 'border-border',
    live: 'border-danger',
    add: 'border-border border-dashed',
};
/**
 * An avatar wrapped in a story ring. The ring color encodes state — unseen
 * (primary), seen (muted), live (danger with a LIVE badge) — and an `add`
 * variant renders a dashed ring with a `+` for the viewer's own tile. Web
 * parity of the native `StoryRing`; token-only.
 */
exports.StoryRing = React.forwardRef(function StoryRing({ src, name, state = 'unseen', size = 'md', label, onClick, className }, ref) {
    const caption = label ?? (state === 'add' ? 'Your story' : name);
    const ring = ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('relative inline-flex items-center justify-center rounded-full border-2 bg-surface p-0.5', RING_TONE[state]), children: [state === 'add' ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-flex items-center justify-center rounded-full text-xl font-bold text-muted', size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-14 w-14' : 'h-10 w-10'), "aria-hidden": "true", children: "+" })) : ((0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: src, name: name, size: size })), state === 'live' ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-danger px-xs py-px text-xs font-bold text-on-danger", children: "LIVE" })) : null] }));
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [ring, caption ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block max-w-[5rem] truncate text-center text-xs', state === 'seen' ? 'text-muted' : 'text-on-surface'), children: caption })) : null] }));
    if (onClick) {
        return ((0, jsx_runtime_1.jsx)("button", { ref: ref, type: "button", "aria-label": state === 'add' ? 'Add to your story' : `${name ?? 'Story'}${state === 'live' ? ', live' : ''}`, onClick: onClick, className: (0, cn_1.cn)('inline-flex flex-col items-center gap-xs transition-opacity hover:opacity-80', className), children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('inline-flex flex-col items-center gap-xs', className), children: body }));
});
//# sourceMappingURL=StoryRing.js.map