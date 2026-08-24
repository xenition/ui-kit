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
exports.MeditationSessionCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
const META = {
    breathing: { glyph: '🌬️', label: 'Breathing', color: 'primary' },
    focus: { glyph: '🎯', label: 'Focus', color: 'accent' },
    sleep: { glyph: '🌙', label: 'Sleep', color: 'primary' },
    calm: { glyph: '🍃', label: 'Calm', color: 'success' },
    movement: { glyph: '🧘', label: 'Movement', color: 'warn' },
    'body-scan': { glyph: '🌀', label: 'Body scan', color: 'accent' },
    'loving-kindness': { glyph: '💗', label: 'Loving kindness', color: 'danger' },
};
/**
 * MeditationSessionCard, redesigned (v2): a **hero session card**. A big category
 * glyph sits in a slot-tinted disc; the title, a category·level·duration·teacher
 * line, and description follow, with a resume bar and a full-width Start CTA (or a
 * locked note). Elevated. Distinct from v1. Same props, token-only.
 */
exports.MeditationSessionCardV2 = React.forwardRef(function MeditationSessionCardV2({ title, category, durationMin, level, instructor, description, progress, locked = false, loading = false, startLabel, onStart, className }, ref) {
    const m = META[category] ?? META.calm;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-meditation-session-card": "", "aria-label": "Loading session", className: (0, cn_1.cn)('h-40 animate-pulse rounded-lg bg-neutral-100', className) });
    }
    const meta = [m.label, level, typeof durationMin === 'number' ? `${durationMin} min` : null, instructor].filter((s) => !!s).join(' · ');
    const resume = typeof progress === 'number' && progress > 0;
    const cta = startLabel ?? (resume ? 'Resume' : 'Start');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-meditation-session-card": "", className: (0, cn_1.cn)('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-md', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-14 w-14 items-center justify-center rounded-full text-2xl', _tokens_1.SLOT_TINT[m.color]), "aria-hidden": true, children: m.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-xs font-semibold', _tokens_1.SLOT_TEXT[m.color]), children: meta })] })] }), description ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: description }) : null, resume ? (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: Math.round((progress ?? 0) * 100), tone: "primary", size: "sm" }) : null, locked ? ((0, jsx_runtime_1.jsx)("p", { className: "rounded-md bg-neutral-100 px-3 py-2 text-center text-sm text-muted", children: "\uD83D\uDD12 Unlock with Premium" })) : onStart ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "primary", className: "w-full", onClick: onStart, children: cta })) : null] }));
});
//# sourceMappingURL=MeditationSessionCardV2.js.map