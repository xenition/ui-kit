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
exports.SessionTimer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const _tokens_1 = require("./_tokens");
const TONE_KEY = {
    primary: 'primary',
    accent: 'accent',
    success: 'success',
};
/** Progress bar has no `accent` tone — fold it into `primary`. */
const PROGRESS_TONE = {
    primary: 'primary',
    accent: 'primary',
    success: 'success',
};
function fmt(totalSeconds) {
    const s = Math.max(0, Math.floor(totalSeconds));
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem < 10 ? '0' : ''}${rem}`;
}
/**
 * A meditation session countdown (web parity of the native block): a large mm:ss
 * readout, an elapsed progress bar, a play / pause toggle as a real `<button>`,
 * and an optional reset. When `remainingSec` hits 0 it shows a "✓ Complete"
 * state instead of the toggle. Play state drives the toggle glyph and its a11y
 * label (state, not color alone). Guards a non-positive `totalSec`. Token-only
 * colors.
 */
exports.SessionTimer = React.forwardRef(function SessionTimer({ totalSec, remainingSec, running = false, phaseLabel, tone = 'primary', onToggle, onReset, className }, ref) {
    const slot = TONE_KEY[tone] ?? 'primary';
    const total = Math.max(0, totalSec);
    const remaining = Math.min(Math.max(remainingSec, 0), total || remainingSec);
    const elapsed = Math.max(0, total - remaining);
    const complete = total > 0 && remaining <= 0;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-session-timer": "", "aria-label": `Session timer, ${fmt(remaining)} remaining${phaseLabel ? `, ${phaseLabel}` : ''}${complete ? ', complete' : running ? ', running' : ', paused'}`, className: (0, cn_1.cn)(_tokens_1.CARD_SHELL, 'flex flex-col items-center gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className), children: [phaseLabel ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold uppercase tracking-wide', _tokens_1.SLOT_TEXT[slot]), children: phaseLabel })) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-heading text-3xl font-extrabold', complete ? 'text-success' : 'text-on-surface'), children: fmt(remaining) }), total > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "w-full", children: (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: elapsed, max: total, tone: PROGRESS_TONE[tone], size: "sm" }) })) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [complete ? ((0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-success", children: "\u2713 Complete" })) : ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": running, "aria-label": running ? 'Pause' : 'Play', onClick: () => onToggle?.(!running), className: (0, cn_1.cn)('flex h-14 w-14 items-center justify-center rounded-full text-lg transition-opacity', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', _tokens_1.SLOT_BG[slot], _tokens_1.SLOT_ON[slot]), children: running ? '⏸' : '▶' })), onReset ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": "Reset", onClick: onReset, className: (0, cn_1.cn)('flex h-11 w-11 items-center justify-center rounded-full bg-muted/10 text-base text-on-surface transition-opacity', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'), children: "\u21BA" })) : null] })] }));
});
//# sourceMappingURL=SessionTimer.js.map