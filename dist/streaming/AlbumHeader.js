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
exports.AlbumHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const media_1 = require("../media");
/**
 * AlbumHeader — the **V4 "spotlight"** gradient hero for an album / playlist
 * (web). The cover sits on a two-hue brand glow (`from-accent-400 to-primary-600`)
 * beside a big near-white title, an optional subtitle, `meta` facts as frosted
 * chips, and Play (a near-white pill) + Shuffle (a ghost button) CTAs. All colors
 * derive from the brand ramp via `--xen-*` classes + gradient utilities — no
 * literal hex; dark-mode safe.
 */
exports.AlbumHeader = React.forwardRef(function AlbumHeader({ title, subtitle, artworkUrl, meta, onPlay, onShuffle, className, ...rest }, ref) {
    const artItem = {
        url: artworkUrl ?? '',
        alt: subtitle ? `${title} — ${subtitle}` : title,
        width: 1,
        height: 1,
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-accent-400 to-primary-600 p-[var(--xen-space-xl)] gap-[var(--xen-space-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "mx-auto w-[52%] overflow-hidden rounded-[var(--xen-radius-lg)] bg-primary-50/15 border border-primary-50/30 p-[var(--xen-space-xs)] shadow-lg", children: artworkUrl ? ((0, jsx_runtime_1.jsx)("div", { className: "overflow-hidden rounded-[var(--xen-radius-md)]", children: (0, jsx_runtime_1.jsx)(media_1.MediaFigure, { item: artItem, reserveAspect: true }) })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex aspect-square items-center justify-center", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: "3xl", color: "onPrimary" }) })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)] text-center", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-extrabold tracking-tight text-primary-50", children: title }), subtitle ? (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-primary-100", children: subtitle }) : null] }), meta && meta.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap items-center justify-center gap-[var(--xen-space-sm)]", children: meta.map((fact, i) => ((0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-semibold text-primary-100", children: fact }, i))) })) : null, onPlay || onShuffle ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-center gap-[var(--xen-space-sm)]", children: [onPlay ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": "Play", onClick: onPlay, className: "flex min-h-11 items-center gap-[var(--xen-space-xs)] rounded-full bg-on-primary px-[var(--xen-space-xl)] py-[var(--xen-space-sm)] text-base font-extrabold text-primary transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u25B6", size: "base", color: "primary" }), "Play"] })) : null, onShuffle ? ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": "Shuffle", onClick: onShuffle, className: "flex min-h-11 items-center gap-[var(--xen-space-xs)] rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-lg)] py-[var(--xen-space-sm)] text-base font-bold text-primary-50 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83D\uDD00", size: "base", color: "onPrimary" }), "Shuffle"] })) : null] })) : null] }));
});
//# sourceMappingURL=AlbumHeader.js.map