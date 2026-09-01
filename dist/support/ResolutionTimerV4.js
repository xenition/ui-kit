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
exports.ResolutionTimerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const SLABadgeV4_1 = require("./SLABadgeV4");
const internal_1 = require("./internal");
function toMs(value, fallback) {
    if (value === undefined)
        return fallback;
    if (typeof value === 'number')
        return value;
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? fallback : parsed;
}
/**
 * ResolutionTimer — **V4** "calm console" design (drop-in for
 * {@link ResolutionTimerProps}). A calm timer card: a big monospaced-feel
 * numeral (via `formatDuration`, `tabular-nums`) showing time left / overdue, a
 * soft-tint state pill (the V4 {@link SLABadgeV4}), and — when a target is
 * derivable — a subtle token progress hint that fills toward the deadline. State
 * is derived exactly as the base — `breached` once time is up, `at-risk` under
 * the configurable threshold, else `on-track` — and surfaced by glyph + color
 * (never color-only). Same props/behavior as the base; colors only from `--xen-*`
 * token classes (no literal hex). Presentational (no internal ticking).
 */
exports.ResolutionTimerV4 = React.forwardRef(function ResolutionTimerV4({ remainingSeconds, dueAt, now, atRiskThresholdSeconds = 900, label = 'Time to resolution', state, className, ...rest }, ref) {
    const remaining = typeof remainingSeconds === 'number' && Number.isFinite(remainingSeconds)
        ? remainingSeconds
        : (toMs(dueAt, Date.now()) - toMs(now, Date.now())) / 1000;
    const threshold = Math.max(0, atRiskThresholdSeconds);
    const derived = state ?? (remaining <= 0 ? 'breached' : remaining <= threshold ? 'at-risk' : 'on-track');
    const overdue = remaining < 0;
    const timeText = (0, internal_1.formatDuration)(Math.abs(remaining));
    const prefix = overdue ? '-' : '';
    const hint = overdue ? 'over' : 'left';
    const timeCls = derived === 'breached' ? 'text-danger' : derived === 'at-risk' ? 'text-warn' : 'text-on-surface';
    const barCls = derived === 'breached' ? 'bg-danger' : derived === 'at-risk' ? 'bg-warn' : 'bg-primary';
    // Subtle progress hint toward the at-risk threshold window: empty when
    // comfortably on-track, filling as the deadline nears, full once breached.
    const progress = overdue
        ? 1
        : threshold > 0
            ? (0, internal_1.clamp)(1 - remaining / threshold, 0, 1)
            : 0;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "timer", "aria-label": `${label}: ${overdue ? 'overdue by ' : ''}${timeText}${overdue ? '' : ' remaining'}`, className: (0, cn_1.cn)('flex flex-col gap-2 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-4 shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: label }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-3xl font-bold leading-none tabular-nums', timeCls), children: [prefix, timeText] }), (0, jsx_runtime_1.jsx)(SLABadgeV4_1.SLABadgeV4, { state: derived, hint: hint, size: "sm" })] }), (0, jsx_runtime_1.jsx)("span", { className: "h-1.5 w-full overflow-hidden rounded-full bg-on-surface/10", "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block h-full rounded-full', barCls), style: { width: `${Math.round(progress * 100)}%` } }) })] }));
});
//# sourceMappingURL=ResolutionTimerV4.js.map