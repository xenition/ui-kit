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
exports.ResolutionTimer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const SLABadge_1 = require("./SLABadge");
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
 * A resolution/SLA countdown. Given a signed `remainingSeconds` (or a `dueAt` +
 * `now` pair) it renders the formatted time left / overdue and derives the SLA
 * state — `breached` once time is up, `at-risk` under the configurable
 * threshold, else `on-track` — surfaced through the glyph+text `SLABadge` so the
 * state is never color-only. Pure/presentational (no internal ticking); the app
 * re-renders with a fresh value. The big time text uses `text-danger`/`text-warn`
 * token classes for breached/at-risk. Token colors only.
 */
exports.ResolutionTimer = React.forwardRef(function ResolutionTimer({ remainingSeconds, dueAt, now, atRiskThresholdSeconds = 900, label = 'Time to resolution', state, className, ...rest }, ref) {
    const remaining = typeof remainingSeconds === 'number' && Number.isFinite(remainingSeconds)
        ? remainingSeconds
        : (toMs(dueAt, Date.now()) - toMs(now, Date.now())) / 1000;
    const derived = state ??
        (remaining <= 0 ? 'breached' : remaining <= Math.max(0, atRiskThresholdSeconds) ? 'at-risk' : 'on-track');
    const overdue = remaining < 0;
    const timeText = (0, internal_1.formatDuration)(Math.abs(remaining));
    const prefix = overdue ? '-' : '';
    const hint = overdue ? 'over' : 'left';
    const timeCls = derived === 'breached' ? 'text-danger' : derived === 'at-risk' ? 'text-warn' : 'text-on-surface';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "timer", "aria-label": `${label}: ${overdue ? 'overdue by ' : ''}${timeText}${overdue ? '' : ' remaining'}`, className: (0, cn_1.cn)('flex flex-col gap-1', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: label }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-2xl font-bold leading-none tabular-nums', timeCls), children: [prefix, timeText] }), (0, jsx_runtime_1.jsx)(SLABadge_1.SLABadge, { state: derived, hint: hint, size: "sm" })] })] }));
});
//# sourceMappingURL=ResolutionTimer.js.map