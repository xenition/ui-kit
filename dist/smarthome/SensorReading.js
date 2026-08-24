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
exports.SensorReading = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Badge_1 = require("../primitives/Badge");
const STATUS_META = {
    normal: { text: 'text-on-surface', label: 'Normal', tone: 'success' },
    warn: { text: 'text-warn', label: 'Elevated', tone: 'warn' },
    danger: { text: 'text-danger', label: 'Alert', tone: 'danger' },
    offline: { text: 'text-muted', label: 'Offline', tone: 'muted' },
};
/**
 * A single sensor reading — glyph, label, a large value+unit, and a status
 * {@link Badge}. `status` colors the value (`warn`→warn, `danger`→danger,
 * else onSurface/muted) but is always paired with a text chip so an at-risk
 * reading is legible without color. When `offline` the value renders as an em
 * dash. Optional `trend` line sits underneath. Token-bound throughout.
 */
exports.SensorReading = React.forwardRef(function SensorReading({ label, value, unit, icon = '📈', status = 'normal', trend, className, style }, ref) {
    const meta = STATUS_META[status];
    const shownValue = status === 'offline' || value == null ? '—' : String(value);
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, style: style, className: className, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: icon, color: "muted", size: "base" }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-xs text-muted", children: label }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: meta.tone, children: meta.label })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-sm)] flex items-baseline gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-heading text-2xl font-bold', meta.text), children: shownValue }), unit != null && shownValue !== '—' ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: unit }) : null] }), trend != null ? (0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 text-xs text-muted", children: trend }) : null] }));
});
//# sourceMappingURL=SensorReading.js.map