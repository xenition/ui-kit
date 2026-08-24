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
exports.Countdown = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const DEFAULT_LABELS = { days: 'Days', hours: 'Hours', minutes: 'Mins', seconds: 'Secs' };
/** Remaining time between now and `target`, clamped at zero. */
function computeParts(target) {
    const diff = Math.max(0, target - Date.now());
    const totalSeconds = Math.floor(diff / 1000);
    return {
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
        done: diff === 0,
    };
}
const pad = (n) => String(n).padStart(2, '0');
/** Counts down to a target date/time in days/hours/mins/secs boxes; cleans up its interval on unmount. */
exports.Countdown = React.forwardRef(function Countdown({ to, onComplete, labels = DEFAULT_LABELS, className, ...rest }, ref) {
    const target = React.useMemo(() => new Date(to).getTime(), [to]);
    const [parts, setParts] = React.useState(() => computeParts(target));
    const firedRef = React.useRef(false);
    React.useEffect(() => {
        firedRef.current = false;
        setParts(computeParts(target));
        const id = setInterval(() => {
            const next = computeParts(target);
            setParts(next);
            if (next.done && !firedRef.current) {
                firedRef.current = true;
                onComplete?.();
                clearInterval(id);
            }
        }, 1000);
        return () => clearInterval(id);
    }, [target, onComplete]);
    const boxes = [
        { value: parts.days, label: labels.days },
        { value: parts.hours, label: labels.hours },
        { value: parts.minutes, label: labels.minutes },
        { value: parts.seconds, label: labels.seconds },
    ];
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-countdown": "", role: "timer", "aria-live": "polite", className: (0, cn_1.cn)('flex items-stretch gap-[var(--xen-space-sm)]', className), ...rest, children: boxes.map((box) => ((0, jsx_runtime_1.jsxs)("div", { "data-xen-countdown-box": "", className: "flex min-w-[3.5rem] flex-col items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-sm)] py-[var(--xen-space-md)] text-on-surface", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-heading text-2xl font-bold tabular-nums", children: pad(box.value) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs uppercase tracking-wide text-muted", children: box.label })] }, box.label))) }));
});
//# sourceMappingURL=Countdown.js.map