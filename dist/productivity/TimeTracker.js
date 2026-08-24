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
exports.TimeTracker = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/**
 * A start/stop time tracker: an elapsed readout, an optional context label, and
 * a toggle control that reads as **success** (running) or **primary** (stopped)
 * with a matching play/stop glyph. The control exposes a `button` role with a
 * stateful label. Web parity of the native `TimeTracker`. No literal colors.
 */
exports.TimeTracker = React.forwardRef(function TimeTracker({ elapsedLabel, running = false, onToggle, label, className }, ref) {
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-2 rounded-[var(--xen-radius-md)] border border-border bg-surface p-2', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg font-bold text-on-surface", children: elapsedLabel }), label ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: label }) : null] }), (0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": running, "aria-label": running ? 'Stop timer' : 'Start timer', onClick: () => onToggle?.(!running), className: (0, cn_1.cn)('inline-flex h-10 w-10 items-center justify-center rounded-full text-base font-bold transition-opacity hover:opacity-90', running ? 'bg-success text-on-success' : 'bg-primary text-on-primary'), children: running ? '■' : '▶' })] }));
});
//# sourceMappingURL=TimeTracker.js.map