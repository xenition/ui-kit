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
exports.RecordButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const types_1 = require("./types");
const DIAM = { sm: 40, md: 56, lg: 72 };
/**
 * A record toggle button — a UI shell only, it captures nothing, and the DOM
 * parity of `native/music`'s `RecordButton`. Shows a record affordance that
 * **morphs from a dot (idle) to a rounded square (recording)** — the state is
 * surfaced in the a11y label + `aria-pressed` and the shape change, never color
 * alone. Pressing fires `onToggle(next)`. The `labeled` variant adds a
 * "Rec"/"Stop" label and an elapsed timer. Uses the `danger` token for the
 * record accent; no literal colors.
 */
exports.RecordButton = React.forwardRef(function RecordButton({ recording, variant = 'ring', size = 'md', elapsedSeconds, disabled = false, onToggle, className, ...rest }, ref) {
    const diam = DIAM[size];
    const solid = variant === 'solid';
    const button = ((0, jsx_runtime_1.jsx)("button", { type: "button", disabled: disabled, "aria-pressed": recording, "aria-label": recording ? 'Stop recording' : 'Start recording', onClick: () => onToggle?.(!recording), style: { width: diam, height: diam }, className: (0, cn_1.cn)('flex items-center justify-center rounded-full border-danger transition-all', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-1', disabled ? 'opacity-50' : 'hover:opacity-85', solid ? 'border-0 bg-danger' : (0, cn_1.cn)('border-[3px]', recording ? 'bg-danger/20' : 'bg-transparent')), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('transition-all', 
            // Dot when idle, rounded square when recording (shape = state).
            recording ? 'rounded-[var(--xen-radius-sm)]' : 'rounded-full', solid ? 'bg-on-danger' : 'bg-danger'), style: {
                width: recording ? diam * 0.36 : diam * 0.5,
                height: recording ? diam * 0.36 : diam * 0.5,
            } }) }));
    if (variant !== 'labeled') {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: button }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)]', className), ...rest, children: [button, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-bold', recording ? 'text-danger' : 'text-on-surface'), children: recording ? 'Stop' : 'Rec' }), recording ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: (0, types_1.formatDuration)(elapsedSeconds ?? 0) })) : null] })] }));
});
//# sourceMappingURL=RecordButton.js.map