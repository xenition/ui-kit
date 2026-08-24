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
exports.PodcastCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * PodcastCard, redesigned (v2): a **featured show card**. Large square artwork
 * atop the title, publisher, episode count, a short description, and a prominent
 * Subscribe button — elevated, hover-lift. Distinct from v1's grid tile. Same
 * props, token-only.
 */
exports.PodcastCardV2 = React.forwardRef(function PodcastCardV2({ podcast, subscribed = false, variant, onClick, onSubscribeToggle, className, ...rest }, ref) {
    void variant;
    const interactive = typeof onClick === 'function';
    const meta = [podcast.publisher, typeof podcast.episodeCount === 'number' ? `${podcast.episodeCount} episodes` : null].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-podcast-card": "", className: (0, cn_1.cn)('flex flex-col overflow-hidden rounded-lg bg-surface shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0', className), ...rest, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": interactive ? `Open ${podcast.title}` : podcast.title, onClick: interactive ? () => onClick?.(podcast) : undefined, className: "block aspect-square w-full overflow-hidden bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary", disabled: !interactive, children: podcast.artworkUrl ? (0, jsx_runtime_1.jsx)("img", { src: podcast.artworkUrl, alt: "", className: "h-full w-full object-cover" }) : (0, jsx_runtime_1.jsx)("span", { className: "flex h-full w-full items-center justify-center text-4xl", children: "\uD83C\uDF99\uFE0F" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2 p-md", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: podcast.title }), meta ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: meta }) : null] }), podcast.description ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-sm text-muted", children: podcast.description }) : null, onSubscribeToggle ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: subscribed ? 'outline' : 'primary', className: "w-full", onClick: () => onSubscribeToggle(!subscribed), children: subscribed ? 'Subscribed' : 'Subscribe' })) : null] })] }));
});
//# sourceMappingURL=PodcastCardV2.js.map