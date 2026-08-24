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
exports.SleepStoryCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const _tokens_1 = require("./_tokens");
const META = {
    nature: { glyph: '🌲', label: 'Nature', color: 'success' },
    fiction: { glyph: '📖', label: 'Fiction', color: 'primary' },
    asmr: { glyph: '🎧', label: 'ASMR', color: 'accent' },
    music: { glyph: '🎵', label: 'Music', color: 'accent' },
    travel: { glyph: '✈️', label: 'Travel', color: 'primary' },
    meditation: { glyph: '🌙', label: 'Meditation', color: 'primary' },
};
/**
 * SleepStoryCard, redesigned (v2): a **media-hero story card**. A tall slot-tinted
 * panel with the big category glyph and a floating play/pause control tops the
 * title, category·narrator·duration, and teaser. Elevated. Distinct from v1. Same
 * props, token-only.
 */
exports.SleepStoryCardV2 = React.forwardRef(function SleepStoryCardV2({ title, category, narrator, durationMin, description, playing = false, locked = false, loading = false, onPlay, className }, ref) {
    const m = META[category] ?? META.meditation;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-sleep-story-card": "", "aria-label": "Loading story", className: (0, cn_1.cn)('h-44 animate-pulse rounded-lg bg-neutral-100', className) });
    }
    const meta = [m.label, narrator, typeof durationMin === 'number' ? `${durationMin} min` : null].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-sleep-story-card": "", className: (0, cn_1.cn)('flex flex-col overflow-hidden rounded-lg bg-surface shadow-md', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative flex h-28 items-center justify-center text-5xl', _tokens_1.SLOT_TINT[m.color]), "aria-hidden": true, children: [m.glyph, locked ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute inset-0 flex items-center justify-center bg-neutral-900/30 text-lg text-neutral-50", children: "\uD83D\uDD12" })) : onPlay ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": playing ? 'Pause' : 'Play', onClick: onPlay, className: "absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-surface/90 text-sm text-on-surface", children: playing ? '❚❚' : '▶' })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1 p-md", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-xs font-semibold', _tokens_1.SLOT_TEXT[m.color]), children: meta }), description ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: description }) : null] })] }));
});
//# sourceMappingURL=SleepStoryCardV2.js.map