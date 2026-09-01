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
exports.SensorReadingV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Badge_1 = require("../primitives/Badge");
const STATUS_META = {
    normal: { accent: 'primary', text: 'text-on-surface', label: 'Normal', tone: 'success' },
    warn: { accent: 'warn', text: 'text-warn', label: 'High', tone: 'warn' },
    danger: { accent: 'danger', text: 'text-danger', label: 'Alert', tone: 'danger' },
    offline: { accent: 'muted', text: 'text-muted', label: 'Offline', tone: 'muted' },
};
/** Icon-disc tint per accent — soft wash + ring, all from `--xen-*` token classes. */
const DISC = {
    primary: 'border-primary/40 bg-primary/[0.12]',
    warn: 'border-warn/40 bg-warn/[0.12]',
    danger: 'border-danger/40 bg-danger/[0.12]',
    muted: 'border-border bg-on-surface/5',
};
/**
 * SensorReading — **V4** "ambient" design (web parity of the native V4). The
 * calm take on a sensor card: a glyph sits in a **status-tinted glowing disc**,
 * the reading is a **big legible numeral** (`text-3xl`, weight 800) beside its
 * unit, with the sensor `label` and a soft-tint status pill
 * (Normal / High / Alert / Offline) below. `status` also colors the numeral —
 * but the pill's icon+label always carries the meaning, so an at-risk reading
 * is never conveyed by color alone. When `offline` the value renders as an em
 * dash; optional `trend` sits underneath. Same props/behavior as
 * {@link SensorReadingProps}; all colors from `--xen-*` token classes (no
 * literals).
 */
exports.SensorReadingV4 = React.forwardRef(function SensorReadingV4({ label, value, unit, icon = '📈', status = 'normal', trend, className, style, ...rest }, ref) {
    const meta = STATUS_META[status];
    const shownValue = status === 'offline' || value == null ? '—' : String(value);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: style, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] shadow-sm', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] border', DISC[meta.accent]), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: icon, color: meta.accent, size: "lg" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-heading text-3xl font-extrabold leading-none', meta.text), children: shownValue }), unit != null && shownValue !== '—' ? (0, jsx_runtime_1.jsx)("span", { className: "text-base text-muted", children: unit }) : null] }), (0, jsx_runtime_1.jsx)("p", { className: "mt-[var(--xen-space-xs)] truncate text-xs text-muted", children: label })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex items-center justify-between gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: meta.tone, variant: "soft", children: meta.label }), trend != null ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: trend }) : null] })] }));
});
//# sourceMappingURL=SensorReadingV4.js.map