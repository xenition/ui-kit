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
exports.EquipmentStatus = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const STATE_META = {
    operational: { label: 'Operational', tone: 'success', icon: 'success' },
    idle: { label: 'Idle', tone: 'neutral', icon: 'muted' },
    maintenance: { label: 'Maintenance', tone: 'warn', icon: 'warn' },
    offline: { label: 'Offline', tone: 'danger', icon: 'danger' },
};
/**
 * An equipment status card — machine glyph, name + type, and an operational
 * {@link Badge} whose text label (not color alone) carries the state. An
 * optional fuel/battery {@link Progress} bar and usage-hours line sit below.
 * The level is clamped to [0,100]; a low reading is stated as "· Low" text, not
 * color alone. When `onClick` is set the card is an accessible `role="button"`
 * with keyboard activation. Token-bound throughout — no literal colors.
 */
exports.EquipmentStatus = React.forwardRef(function EquipmentStatus({ name, type, icon = '🚜', state = 'operational', fuelPct, fuelLabel = 'Fuel', hours, onClick, className, ...rest }, ref) {
    const meta = STATE_META[state];
    const pct = typeof fuelPct === 'number' ? Math.max(0, Math.min(100, fuelPct)) : undefined;
    const lowFuel = pct != null && pct < 20;
    const interactive = typeof onClick === 'function';
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, "data-xen-equipment-status": "", className: (0, cn_1.cn)(interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `${name}, ${meta.label}` : undefined, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, size: "xl", color: meta.icon }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate font-heading text-base font-bold text-on-surface", children: name }), type != null ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: type }) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, children: meta.label })] }), pct != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-1 flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: fuelLabel }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-xs font-semibold', lowFuel ? 'text-danger' : 'text-on-surface'), children: [pct, "%", lowFuel ? ' · Low' : ''] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: pct, tone: lowFuel ? 'danger' : 'primary' })] })) : null, hours != null ? (0, jsx_runtime_1.jsxs)("p", { className: "mt-2 text-xs text-muted", children: ["\u23F1\uFE0F ", hours] }) : null] }));
});
//# sourceMappingURL=EquipmentStatus.js.map