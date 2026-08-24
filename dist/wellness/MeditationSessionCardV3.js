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
exports.MeditationSessionCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
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
 * MeditationSessionCard, redesigned (v3): a **dense session line**. The category
 * glyph leads, the title over a category·duration·level line, a thin resume
 * underline, and a quiet Start/Resume (or lock) trails — hairline-bordered for a
 * library list. The opposite of v2's hero. Same props, token-only.
 */
exports.MeditationSessionCardV3 = React.forwardRef(function MeditationSessionCardV3({ title, category, durationMin, level, instructor, description, progress, locked = false, loading = false, startLabel, onStart, className }, ref) {
    void instructor;
    void description;
    const m = META[category] ?? META.calm;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-meditation-session-card": "", "aria-label": "Loading session", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), children: (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" }) });
    }
    const meta = [m.label, typeof durationMin === 'number' ? `${durationMin} min` : null, level].filter((s) => !!s).join(' · ');
    const resume = typeof progress === 'number' && progress > 0;
    const cta = startLabel ?? (resume ? 'Resume' : 'Start');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-meditation-session-card": "", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl", "aria-hidden": true, children: m.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: meta }), resume ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-1 h-0.5 w-full overflow-hidden rounded-full bg-neutral-100", children: (0, jsx_runtime_1.jsx)("div", { className: "h-full rounded-full bg-primary", style: { width: `${Math.round((progress ?? 0) * 100)}%` } }) })) : null] }), locked ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", "aria-label": "Locked", children: "\uD83D\uDD12" }) : onStart ? (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "ghost", onClick: onStart, children: cta }) : null] }));
});
//# sourceMappingURL=MeditationSessionCardV3.js.map