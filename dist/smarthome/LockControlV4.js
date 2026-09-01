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
exports.LockControlV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Button_1 = require("../primitives/Button");
const Badge_1 = require("../primitives/Badge");
const STATE_META = {
    locked: { glyph: '🔒', label: 'Locked', accent: 'primary', tone: 'primary', glow: false },
    unlocked: { glyph: '🔓', label: 'Unlocked', accent: 'warn', tone: 'warn', glow: true },
    jammed: { glyph: '⚠️', label: 'Jammed', accent: 'danger', tone: 'danger', glow: false },
    offline: { glyph: '🚫', label: 'Offline', accent: 'muted', tone: 'muted', glow: false },
};
/** Map each state's accent slot to the soft-tint/border/glow token classes. */
const ACCENT_CLASS = {
    locked: { disc: 'border-primary/40 bg-primary/10', glow: '' },
    unlocked: { disc: 'border-warn/50 bg-warn/15', glow: 'shadow-md' },
    jammed: { disc: 'border-danger/40 bg-danger/10', glow: '' },
    offline: { disc: 'border-border bg-on-surface/5', glow: '' },
};
/**
 * LockControl — **V4** "ambient" design (web parity of the native V4). A calm
 * control-panel lock: a **big state glyph sits in a state-tinted disc** — `locked`
 * takes the primary slot, `unlocked` glows softly (warn wash + shadow) so an open
 * lock reads at a glance, `jammed`→danger, `offline`→muted. A status {@link Badge}
 * + optional low-battery hint keep the meaning textual (never color alone), over a
 * single big lock/unlock {@link Button} (≥44px, full width). The action flips
 * between "Lock"/"Unlock", uses the `danger` variant when unlocking, and is
 * disabled when `offline`/`jammed` or `busy` (the web {@link Button} has no
 * `loading`, so busy maps to disabled + a "Working…" label). Same props/behavior
 * as {@link LockControlProps}; all colors from `--xen-*` token classes (no
 * literals).
 */
exports.LockControlV4 = React.forwardRef(function LockControlV4({ name, state = 'locked', batteryPct, onToggle, busy = false, className, style, ...rest }, ref) {
    const meta = STATE_META[state];
    const accentClass = ACCENT_CLASS[state];
    const isLocked = state === 'locked';
    const actionable = state === 'locked' || state === 'unlocked';
    const lowBattery = typeof batteryPct === 'number' && batteryPct <= 20;
    const variant = isLocked ? 'primary' : 'danger';
    const label = busy
        ? 'Working…'
        : state === 'offline'
            ? 'Unavailable'
            : state === 'jammed'
                ? 'Jammed'
                : isLocked
                    ? 'Unlock'
                    : 'Lock';
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, style: style, className: (0, cn_1.cn)(state === 'offline' && 'opacity-70', accentClass.glow, className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-12 w-12 items-center justify-center rounded-full border', accentClass.disc), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, color: meta.accent, size: "xl" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-semibold text-on-surface", children: name }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-0.5 flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: meta.tone, variant: "soft", children: meta.label }), typeof batteryPct === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', lowBattery ? 'text-danger' : 'text-muted'), children: `🔋 ${Math.round(Math.min(Math.max(batteryPct, 0), 100))}%` })) : null] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-[var(--xen-space-md)]", children: (0, jsx_runtime_1.jsx)(Button_1.Button, { variant: variant, className: "min-h-11 w-full", disabled: !actionable || busy, "aria-busy": busy || undefined, onClick: () => onToggle?.(!isLocked), children: label }) })] }));
});
//# sourceMappingURL=LockControlV4.js.map