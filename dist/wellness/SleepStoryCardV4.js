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
exports.SleepStoryCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const Icon_1 = require("../primitives/Icon");
const STORY_META = {
    nature: { glyph: '🌲', label: 'Nature' },
    fiction: { glyph: '📖', label: 'Fiction' },
    asmr: { glyph: '🎧', label: 'ASMR' },
    music: { glyph: '🎵', label: 'Music' },
    travel: { glyph: '✈️', label: 'Travel' },
    meditation: { glyph: '🌙', label: 'Meditation' },
};
/**
 * SleepStoryCardV4 — the "calm" restyle of {@link SleepStoryCard}. Same props,
 * defaults, labels, a11y and behavior; only the surface changes: a clean neutral
 * row card with a gradient cover tile (category glyph in near-white ink) and a
 * round gradient play/pause button. `playing` swaps the glyph and its a11y label
 * (`aria-pressed`, state not color alone); `locked` and `loading` are preserved.
 * Token-only colors.
 */
exports.SleepStoryCardV4 = React.forwardRef(function SleepStoryCardV4({ title, category, narrator, durationMin, description, playing = false, locked = false, loading = false, onPlay, className, ...rest }, ref) {
    const meta = STORY_META[category] ?? STORY_META.nature;
    const shell = (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-sm p-[var(--xen-space-md)] text-on-surface', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-sleep-story-card": "", "aria-busy": "true", "aria-label": "Loading story", className: shell, ...rest, children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: 56, height: 56 }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "70%", height: 16 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "45%", height: 14 })] })] }));
    }
    const control = locked ? '🔒' : playing ? '⏸' : '▶';
    const controlLabel = locked ? 'Locked' : playing ? 'Pause' : 'Play';
    const subLine = [narrator, durationMin != null ? `${durationMin} min` : null].filter(Boolean).join(' · ') ||
        description ||
        '';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-sleep-story-card": "", "aria-label": `${meta.label} sleep story: ${title}`, className: shell, ...rest, children: [(0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: "flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, size: "2xl", color: "onPrimary" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold uppercase tracking-wide text-muted", children: meta.label }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: subLine })] }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": playing, "aria-label": controlLabel, disabled: locked || !onPlay, onClick: locked ? undefined : onPlay, className: (0, cn_1.cn)('flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700 transition-opacity', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', 'disabled:opacity-50 disabled:pointer-events-none'), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: control, size: "base", color: "onPrimary" }) })] }));
});
//# sourceMappingURL=SleepStoryCardV4.js.map