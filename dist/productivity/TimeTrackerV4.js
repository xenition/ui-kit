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
exports.TimeTrackerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * TimeTracker — **V4** "flow" design (web parity of the native V4). The
 * focused-workspace take on a stopwatch: a **big, monospaced-feel elapsed
 * numeral** with the context label beneath, and a large (≥44px) round start/stop
 * control that reads **primary** when idle and flips to **danger "stop"** while
 * running. A live session lifts the whole card into a soft-primary running glow
 * so the timer reads as alive without shouting. Keeps the running/elapsed
 * contract of {@link TimeTrackerProps}; all colors from `--xen-*` token classes
 * (no literals).
 */
exports.TimeTrackerV4 = React.forwardRef(function TimeTrackerV4({ elapsedLabel, running = false, onToggle, label, className }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-3 rounded-[var(--xen-radius-md)] border p-3 transition-colors', running ? 'border-primary/50 bg-primary/[0.08] shadow-md' : 'border-border bg-surface shadow-sm', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-mono text-3xl font-bold tabular-nums leading-none tracking-tight', running ? 'text-primary-text' : 'text-on-surface'), children: elapsedLabel }), label ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: label }) : null] }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": running, "aria-label": running ? 'Stop timer' : 'Start timer', onClick: () => onToggle?.(!running), className: (0, cn_1.cn)('inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-bold transition-opacity hover:opacity-90', running ? 'bg-danger text-on-danger' : 'bg-primary text-on-primary'), children: running ? '■' : '▶' })] }));
});
//# sourceMappingURL=TimeTrackerV4.js.map