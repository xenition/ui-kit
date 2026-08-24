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
exports.SleepStoryCardV3 = void 0;
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
 * SleepStoryCard, redesigned (v3): a **dense story row**. A slot-tinted glyph tile,
 * the title over a category·narrator·duration line, and a compact play/pause (or
 * lock) on the right — hairline-bordered for a playlist. The opposite of v2's
 * media hero. Same props, token-only.
 */
exports.SleepStoryCardV3 = React.forwardRef(function SleepStoryCardV3({ title, category, narrator, durationMin, description, playing = false, locked = false, loading = false, onPlay, className }, ref) {
    void description;
    const m = META[category] ?? META.meditation;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-sleep-story-card": "", "aria-label": "Loading story", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), children: (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" }) });
    }
    const meta = [m.label, narrator, typeof durationMin === 'number' ? `${durationMin} min` : null].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-sleep-story-card": "", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-xl', _tokens_1.SLOT_TINT[m.color]), "aria-hidden": true, children: m.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: meta })] }), locked ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", "aria-label": "Locked", children: "\uD83D\uDD12" }) : onPlay ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": playing ? 'Pause' : 'Play', onClick: onPlay, className: "flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm text-primary", children: playing ? '❚❚' : '▶' })) : null] }));
});
//# sourceMappingURL=SleepStoryCardV3.js.map