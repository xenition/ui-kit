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
exports.CountdownBadge = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const format_1 = require("./format");
/** Token background + foreground classes per tone. */
const TONE_BG = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    neutral: 'bg-border',
};
const TONE_FG = {
    primary: 'text-on-primary',
    accent: 'text-on-accent',
    neutral: 'text-on-surface',
};
const pad = (n) => String(n).padStart(2, '0');
/**
 * Countdown to an event. Accepts an absolute `target` (measured against `now`)
 * or explicit `remainingMs`. `inline` renders a single chip (`3d 04h 12m`);
 * `blocks` renders separate dd / hh / mm tiles. Once elapsed it shows
 * `elapsedLabel`. This is a pure display component — it does not tick on its own
 * and reads no clock at import; the host re-renders with a fresh `now` /
 * `remainingMs`. Colors come from the `--xen-*` tokens; no literal colors.
 */
exports.CountdownBadge = React.forwardRef(function CountdownBadge({ target, remainingMs, now, label, elapsedLabel = 'Started', variant = 'inline', tone = 'primary', className, ...rest }, ref) {
    const ms = typeof remainingMs === 'number'
        ? remainingMs
        : target
            ? target.getTime() - (now ?? new Date()).getTime()
            : 0;
    const parts = (0, format_1.countdownParts)(ms);
    const bg = TONE_BG[tone];
    const fg = TONE_FG[tone];
    const a11y = parts.elapsed
        ? elapsedLabel
        : `${label ? `${label} ` : ''}${parts.days} days ${parts.hours} hours ${parts.minutes} minutes`;
    if (parts.elapsed) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": a11y, className: (0, cn_1.cn)('inline-flex self-start rounded-full bg-border px-md py-xs', className), ...rest, children: (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: elapsedLabel }) }));
    }
    if (variant === 'blocks') {
        const blocks = [
            { value: pad(parts.days), unit: 'DAY' },
            { value: pad(parts.hours), unit: 'HR' },
            { value: pad(parts.minutes), unit: 'MIN' },
        ];
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": a11y, className: (0, cn_1.cn)('flex flex-col gap-xs', className), ...rest, children: [label ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: label }) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex flex-row gap-xs", children: blocks.map((b) => ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex min-w-[3rem] flex-col items-center rounded-md px-sm py-sm', bg), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-lg font-extrabold', fg), children: b.value }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs tracking-wide', fg), children: b.unit })] }, b.unit))) })] }));
    }
    const compact = `${parts.days > 0 ? `${parts.days}d ` : ''}${pad(parts.hours)}h ${pad(parts.minutes)}m`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": a11y, className: (0, cn_1.cn)('inline-flex flex-row items-center gap-xs self-start rounded-full px-md py-xs', bg, className), ...rest, children: [label ? (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', fg), children: label }) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-extrabold', fg), children: compact })] }));
});
//# sourceMappingURL=CountdownBadge.js.map