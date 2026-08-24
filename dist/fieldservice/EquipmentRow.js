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
exports.EquipmentRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const EQUIPMENT_STATUS = {
    operational: { label: 'Operational', glyph: '✓', tone: 'success', slot: 'success' },
    maintenance: { label: 'Maintenance', glyph: '⚙', tone: 'warn', slot: 'warn' },
    down: { label: 'Down', glyph: '✕', tone: 'danger', slot: 'danger' },
    retired: { label: 'Retired', glyph: '⏻', tone: 'neutral', slot: 'muted' },
};
/**
 * One line in an equipment / asset register: a tinted status glyph disc, a
 * name/tag stack, meta (location, next service), and a status pill. The status
 * is conveyed redundantly (glyph + label + a color that traces to a semantic
 * token: operational → success, down → danger) so it is never color-alone.
 * Becomes a `role="button"` surface only when `onClick` is supplied. No literals.
 */
exports.EquipmentRow = React.forwardRef(function EquipmentRow({ name, assetTag, status, glyph = '🚜', nextService, location, onClick, className, style }, ref) {
    const sd = EQUIPMENT_STATUS[status] ?? EQUIPMENT_STATUS.operational;
    const meta = [location, nextService != null ? `Service ${nextService}` : null]
        .filter((v) => v != null)
        .join(' · ');
    const interactive = onClick != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: style, ...(interactive
            ? {
                role: 'button',
                tabIndex: 0,
                'aria-label': `${name}, ${assetTag}, ${sd.label}`,
                onClick,
                onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClick?.();
                    }
                },
            }
            : {}), className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]', interactive && 'cursor-pointer', className), children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-10 w-10 items-center justify-center rounded-[var(--xen-radius-md)]', format_1.DISC_TINT[sd.slot]), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, "aria-label": "Equipment" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-surface", children: name }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: assetTag }), meta !== '' ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\u00B7 ", meta] }) : null] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, children: `${sd.glyph} ${sd.label}` })] }));
});
//# sourceMappingURL=EquipmentRow.js.map