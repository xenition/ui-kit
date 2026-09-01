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
exports.CountdownV4 = void 0;
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
/**
 * Countdown — **V4** "showcase" design (web parity of the native V4). Four big
 * extra-bold **tabular-nums** digit tiles (days/hrs/min/sec) seated in
 * **soft-primary wells** with muted uppercase labels — refined and high-impact
 * without a brand gradient. The 1s interval and `onComplete` fire-once behavior
 * are preserved exactly from the base; only the skin changes. Same
 * props/behavior as {@link CountdownProps}; every color is a `--xen-*` token
 * (`bg-primary-50`, `text-primary`, `text-muted`) — no literals.
 */
exports.CountdownV4 = React.forwardRef(function CountdownV4({ to, onComplete, labels = DEFAULT_LABELS, className, ...rest }, ref) {
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
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-countdown": "", role: "timer", "aria-live": "polite", className: (0, cn_1.cn)('flex items-stretch gap-[var(--xen-space-md)]', className), ...rest, children: boxes.map((box) => ((0, jsx_runtime_1.jsxs)("div", { "data-xen-countdown-box": "", className: (0, cn_1.cn)('flex min-w-[4rem] flex-col items-center gap-[var(--xen-space-xs)]', 'rounded-[var(--xen-radius-lg)] border border-border bg-primary-50 shadow-sm', 'px-[var(--xen-space-md)] py-[var(--xen-space-md)]'), children: [(0, jsx_runtime_1.jsx)("span", { className: "font-heading text-3xl font-extrabold tabular-nums leading-none text-primary", children: pad(box.value) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-medium uppercase tracking-wide text-muted", children: box.label })] }, box.label))) }));
});
//# sourceMappingURL=CountdownV4.js.map