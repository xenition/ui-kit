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
exports.StoryRingV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
/**
 * StoryRing — **V4** "feed" design (web parity of the native V4). The one place
 * in the feed line that carries a gradient: an unseen story wears an
 * accent→primary gradient ring (`bg-gradient-to-br from-accent-400
 * to-primary-600`), a seen one falls back to a muted ring, `live` keeps the
 * danger ring + LIVE tag, and `add` renders a dashed ring with a primary `⊕`.
 * Keeps `size`, `state`, `label` and the caption behavior. Same props/behavior
 * as {@link StoryRingProps}; all colors from `--xen-*` token classes /
 * gradient utilities (no literals).
 */
const AVATAR_BOX = {
    xs: 'h-8 w-8',
    sm: 'h-11 w-11',
    md: 'h-14 w-14',
    lg: 'h-[4.75rem] w-[4.75rem]',
    xl: 'h-24 w-24',
};
exports.StoryRingV4 = React.forwardRef(function StoryRingV4({ src, name, state = 'unseen', size = 'md', label, onClick, className }, ref) {
    const caption = label ?? (state === 'add' ? 'Your story' : name);
    // The gradient/tone ring is a padded backing; the avatar sits on a surface
    // gap so the ring reads as a stroke.
    const ringTone = state === 'unseen'
        ? 'bg-gradient-to-br from-accent-400 to-primary-600'
        : state === 'live'
            ? 'bg-danger'
            : state === 'add'
                ? 'border-2 border-dashed border-border bg-surface'
                : 'bg-border';
    const ring = ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('relative inline-flex items-center justify-center rounded-full p-[3px]', ringTone), children: [(0, jsx_runtime_1.jsx)("span", { className: "inline-flex items-center justify-center rounded-full bg-surface p-0.5", children: state === 'add' ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-flex items-center justify-center rounded-full text-2xl font-bold text-primary', AVATAR_BOX[size]), "aria-hidden": "true", children: "\u2295" })) : ((0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: src, name: name, size: size })) }), state === 'live' ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-danger px-xs py-px text-xs font-bold text-on-danger", children: "LIVE" })) : null] }));
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [ring, caption ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block max-w-[5rem] truncate text-center text-xs', state === 'seen' ? 'text-muted' : 'font-medium text-on-surface'), children: caption })) : null] }));
    if (onClick) {
        return ((0, jsx_runtime_1.jsx)("button", { ref: ref, type: "button", "aria-label": state === 'add' ? 'Add to your story' : `${name ?? 'Story'}${state === 'live' ? ', live' : ''}`, onClick: onClick, className: (0, cn_1.cn)('inline-flex flex-col items-center gap-xs transition-opacity hover:opacity-90', className), children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('inline-flex flex-col items-center gap-xs', className), children: body }));
});
//# sourceMappingURL=StoryRingV4.js.map