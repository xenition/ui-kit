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
exports.StoryViewer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
/**
 * StoryViewer — the immersive, full-screen story view for the social V4 "feed"
 * line. A full-bleed frame (the `imageUrl` under a brand-gradient scrim, or the
 * gradient itself) carries a top row of segment progress bars — played/active in
 * near-white, upcoming in a frosted track — an author header + close control in
 * near-white ink, invisible left/right tap-zones for rewind/advance, an optional
 * caption, and a frosted reply affordance. Token-only colors via `--xen-*`
 * classes + gradient utilities; dark-mode safe.
 */
exports.StoryViewer = React.forwardRef(function StoryViewer({ segments, activeIndex, author, timeLabel, imageUrl, caption, replyPlaceholder = 'Send message', onNext, onPrev, onClose, onReply, className, ...rest }, ref) {
    const count = Math.max(0, Math.trunc(segments));
    const bars = Array.from({ length: count }, (_, i) => i);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "dialog", "aria-modal": "true", "aria-label": `Story by ${author.name}`, className: (0, cn_1.cn)('relative flex aspect-[9/16] w-full flex-col overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700', className), ...rest, children: [imageUrl ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: "", "aria-hidden": "true", className: "absolute inset-0 h-full w-full object-cover" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-primary-700/60 via-transparent to-primary-700/70", "aria-hidden": "true" })] })) : null, (0, jsx_runtime_1.jsx)("div", { className: "relative z-10 flex gap-[var(--xen-space-xs)] p-[var(--xen-space-md)]", role: "progressbar", "aria-valuemin": 0, "aria-valuemax": count, "aria-valuenow": activeIndex + 1, children: bars.map((i) => ((0, jsx_runtime_1.jsx)("span", { className: "h-1 flex-1 overflow-hidden rounded-full bg-primary-50/30", children: (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block h-full rounded-full bg-primary-50', i <= activeIndex ? 'w-full' : 'w-0') }) }, i))) }), (0, jsx_runtime_1.jsxs)("div", { className: "relative z-10 flex items-center gap-[var(--xen-space-sm)] px-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: author.avatarUrl, name: author.name, size: "sm" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-bold text-primary-50", children: author.name }), timeLabel ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-primary-100", children: timeLabel }) : null] }), onClose ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Close story", onClick: onClose, className: "flex h-11 w-11 items-center justify-center text-xl font-bold text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: "\u2715" })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative z-0 flex flex-1", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Previous", onClick: onPrev, className: "h-full flex-1 focus:outline-none", tabIndex: -1 }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Next", onClick: onNext, className: "h-full flex-[2] focus:outline-none", tabIndex: -1 })] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative z-10 flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]", children: [caption ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm leading-relaxed text-primary-50", children: caption }) : null, onReply ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": replyPlaceholder, onClick: onReply, className: "flex min-h-[44px] items-center rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-lg)] text-sm font-semibold text-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: replyPlaceholder })) : null] })] }));
});
//# sourceMappingURL=StoryViewer.js.map