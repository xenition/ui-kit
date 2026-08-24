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
exports.FieldCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const STATUS_DOT = { planted: 'bg-success', fallow: 'bg-neutral-400', harvested: 'bg-primary', preparing: 'bg-warn' };
const STATUS_LABEL = { planted: 'Planted', fallow: 'Fallow', harvested: 'Harvested', preparing: 'Preparing' };
/**
 * FieldCard, redesigned (v3): a **dense parcel line**. The glyph leads, the name
 * (+ area) over a status·crop·soil·location subtitle with a status dot — hairline-
 * bordered for a fields list. The opposite of v2's card. Status is dot + word,
 * never color alone. Same props, token-only.
 */
exports.FieldCardV3 = React.forwardRef(function FieldCardV3({ name, area, areaUnit = 'ha', crop, soilType, location, status = 'planted', icon = '🌾', variant, onClick, className, ...rest }, ref) {
    void variant;
    const interactive = typeof onClick === 'function';
    const sub = [STATUS_LABEL[status], crop, soilType, location].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-field-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": name, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        } } : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-block h-2.5 w-2.5 shrink-0 rounded-full', STATUS_DOT[status]), "aria-hidden": true }), (0, jsx_runtime_1.jsx)("span", { className: "text-lg", "aria-hidden": true, children: icon }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("p", { className: "truncate text-sm font-semibold text-on-surface", children: [name, area != null ? (0, jsx_runtime_1.jsxs)("span", { className: "ml-1.5 text-xs font-normal text-muted", children: [area, " ", areaUnit] }) : null] }), sub ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: sub }) : null] })] }));
});
//# sourceMappingURL=FieldCardV3.js.map