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
exports.SleepTimer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/** Default preset durations (minutes) offered by a {@link SleepTimer}. */
const DEFAULT_PRESETS = [5, 15, 30, 45, 60];
/**
 * SleepTimer — **V4** "spotlight" design (web parity of the native V4). A
 * sleep-timer control on a clean elevated surface: a row of quick-preset chips
 * plus an "Off" chip and an optional "End of episode" chip. The active choice is
 * the one accent — a solid **primary** fill with `onPrimary` ink; the rest are a
 * soft `primary/10` tint. Chips are ≥44px tap targets, grouped as a
 * `radiogroup`, and the active timer is announced. Presentational only; all
 * colors from `--xen-*` token classes (no literal hex). Dark-mode safe.
 */
exports.SleepTimer = React.forwardRef(function SleepTimer({ value, onChange, presets = DEFAULT_PRESETS, endOfEpisode, onEndOfEpisode, title = 'Sleep timer', className, ...rest }, ref) {
    const eoeSelected = !!endOfEpisode;
    const announce = eoeSelected
        ? 'Sleep timer: end of episode'
        : value == null
            ? 'Sleep timer off'
            : `Sleep timer: ${value} minutes`;
    const chipClass = (selected) => (0, cn_1.cn)('inline-flex min-h-[44px] items-center justify-center rounded-full px-[var(--xen-space-md)] text-sm font-semibold', 'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', selected ? 'bg-primary text-on-primary' : 'bg-primary/10 text-on-surface hover:bg-primary/20');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-sleep-timer": "", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] shadow-lg', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "px-[var(--xen-space-xs)] text-xs font-bold uppercase tracking-wide text-muted", children: title }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", role: "status", "aria-live": "polite", children: announce }), (0, jsx_runtime_1.jsxs)("div", { role: "radiogroup", "aria-label": title, className: "flex flex-wrap gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-checked": value == null && !eoeSelected, onClick: () => onChange(null), className: chipClass(value == null && !eoeSelected), children: "Off" }), presets.map((min) => {
                        const selected = !eoeSelected && value === min;
                        return ((0, jsx_runtime_1.jsxs)("button", { type: "button", role: "radio", "aria-checked": selected, "aria-label": `${min} minutes`, onClick: () => onChange(min), className: chipClass(selected), children: [min, "m"] }, min));
                    }), onEndOfEpisode ? ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-checked": eoeSelected, onClick: onEndOfEpisode, className: chipClass(eoeSelected), children: "End of episode" })) : null] })] }));
});
//# sourceMappingURL=SleepTimer.js.map