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
exports.SleepStoryCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
const STORY_META = {
    nature: { glyph: '🌲', label: 'Nature', color: 'success' },
    fiction: { glyph: '📖', label: 'Fiction', color: 'primary' },
    asmr: { glyph: '🎧', label: 'ASMR', color: 'accent' },
    music: { glyph: '🎵', label: 'Music', color: 'accent' },
    travel: { glyph: '✈️', label: 'Travel', color: 'primary' },
    meditation: { glyph: '🌙', label: 'Meditation', color: 'primary' },
};
/**
 * A sleep-story tile (web parity of the native block): a soft category-tinted
 * cover, title + narrator + length, and a round play / pause control rendered as
 * a real `<button>`. `playing` flips the control glyph and its a11y label
 * (`aria-pressed`, state not color alone); `locked` disables it with a lock;
 * `loading` renders a skeleton. Token-only colors.
 */
exports.SleepStoryCard = React.forwardRef(function SleepStoryCard({ title, category, narrator, durationMin, description, playing = false, locked = false, loading = false, onPlay, className }, ref) {
    const meta = STORY_META[category] ?? STORY_META.nature;
    const shell = (0, cn_1.cn)(_tokens_1.CARD_SHELL, 'flex items-center gap-[var(--xen-space-md)] p-[var(--xen-space-md)]', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-sleep-story-card": "", "aria-busy": "true", "aria-label": "Loading story", className: shell, children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: 56, height: 56 }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "70%", height: 16 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "45%", height: 14 })] })] }));
    }
    const control = locked ? '🔒' : playing ? '⏸' : '▶';
    const controlLabel = locked ? 'Locked' : playing ? 'Pause' : 'Play';
    const subLine = [narrator, durationMin != null ? `${durationMin} min` : null].filter(Boolean).join(' · ') ||
        description ||
        '';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-sleep-story-card": "", "aria-label": `${meta.label} sleep story: ${title}`, className: shell, children: [(0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-14 w-14 items-center justify-center rounded-[var(--xen-radius-md)] text-xl', _tokens_1.SLOT_TINT[meta.color]), children: meta.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold uppercase tracking-wide', _tokens_1.SLOT_TEXT[meta.color]), children: meta.label }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: subLine })] }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": playing, "aria-label": controlLabel, disabled: locked || !onPlay, onClick: locked ? undefined : onPlay, className: (0, cn_1.cn)('flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base transition-opacity', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', 'disabled:opacity-50 disabled:pointer-events-none', playing ? (0, cn_1.cn)(_tokens_1.SLOT_BG[meta.color], _tokens_1.SLOT_ON[meta.color]) : (0, cn_1.cn)(_tokens_1.SLOT_TINT[meta.color], _tokens_1.SLOT_TEXT[meta.color])), children: control })] }));
});
//# sourceMappingURL=SleepStoryCard.js.map