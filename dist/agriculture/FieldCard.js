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
exports.FieldCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const STATUS_META = {
    planted: { label: 'Planted', tone: 'success' },
    fallow: { label: 'Fallow', tone: 'neutral' },
    harvested: { label: 'Harvested', tone: 'primary' },
    preparing: { label: 'Preparing', tone: 'warn' },
};
function Meta({ glyph, text, className, }) {
    return (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', className), children: `${glyph} ${text}` });
}
/**
 * A field / parcel summary card — glyph, name, an area figure, and a cultivation
 * {@link Badge} whose text label (not color alone) carries the status. The
 * `detailed` variant adds crop / soil / location meta rows; `compact` keeps just
 * the header. When `onClick` is set the card is an accessible `role="button"`
 * with keyboard activation. Token-bound throughout — no literal colors.
 */
exports.FieldCard = React.forwardRef(function FieldCard({ name, area, areaUnit = 'ha', crop, soilType, location, status = 'planted', icon = '🌾', variant = 'detailed', onClick, className, ...rest }, ref) {
    const meta = STATUS_META[status];
    const detailed = variant === 'detailed';
    const interactive = typeof onClick === 'function';
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, "data-xen-field-card": "", className: (0, cn_1.cn)(interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `${name}, ${meta.label}` : undefined, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, size: "xl", color: "primary" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate font-heading text-base font-bold text-on-surface", children: name }), area != null ? ((0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-muted", children: [String(area), " ", areaUnit] })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, children: meta.label })] }), detailed ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-3 flex flex-wrap gap-3", children: [crop != null ? (0, jsx_runtime_1.jsx)(Meta, { glyph: "\uD83C\uDF31", text: crop, className: "text-on-surface" }) : null, soilType != null ? (0, jsx_runtime_1.jsx)(Meta, { glyph: "\uD83E\uDEA8", text: soilType, className: "text-muted" }) : null, location != null ? (0, jsx_runtime_1.jsx)(Meta, { glyph: "\uD83D\uDCCD", text: location, className: "text-muted" }) : null] })) : null] }));
});
//# sourceMappingURL=FieldCard.js.map