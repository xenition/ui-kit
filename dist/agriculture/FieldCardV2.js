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
exports.FieldCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const STATUS = {
    planted: { label: 'Planted', tone: 'success' }, fallow: { label: 'Fallow', tone: 'neutral' }, harvested: { label: 'Harvested', tone: 'primary' }, preparing: { label: 'Preparing', tone: 'warn' },
};
/**
 * FieldCard, redesigned (v2): an **elevated parcel card**. A big field glyph tile
 * leads the name and area; crop·soil·location render as tinted stat chips with a
 * status badge on the header. Distinct from v1. Same props, token-only.
 */
exports.FieldCardV2 = React.forwardRef(function FieldCardV2({ name, area, areaUnit = 'ha', crop, soilType, location, status = 'planted', icon = '🌾', variant, onClick, className, ...rest }, ref) {
    void variant;
    const st = STATUS[status];
    const interactive = typeof onClick === 'function';
    const chips = [crop, soilType, location].filter((s) => !!s);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-field-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": name, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        } } : undefined, className: (0, cn_1.cn)('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-12 w-12 items-center justify-center rounded-md bg-success/10 text-2xl", "aria-hidden": true, children: icon }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: name }), area != null ? (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: [area, " ", areaUnit] }) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: st.tone, children: st.label })] }), chips.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1.5", children: chips.map((c, i) => (0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface", children: c }, i)) })) : null] }));
});
//# sourceMappingURL=FieldCardV2.js.map