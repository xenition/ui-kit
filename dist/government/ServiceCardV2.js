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
exports.ServiceCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Button_1 = require("../primitives/Button");
const CATEGORY = {
    license: { glyph: '🪪', label: 'Licensing' }, permit: { glyph: '📋', label: 'Permits' }, tax: { glyph: '🧾', label: 'Tax' }, records: { glyph: '🗂️', label: 'Records' }, benefit: { glyph: '🤝', label: 'Benefits' }, health: { glyph: '⚕️', label: 'Public health' }, utility: { glyph: '💧', label: 'Utilities' }, other: { glyph: '🏛️', label: 'Service' },
};
const CHANNEL = {
    online: { label: '🌐 Online', tone: 'success' }, 'in-person': { label: '🏢 In person', tone: 'primary' }, phone: { label: '📞 Phone', tone: 'accent' }, unavailable: { label: 'Unavailable', tone: 'neutral' },
};
/**
 * ServiceCard, redesigned (v2): an **elevated service card**. A tinted category
 * glyph tile leads the title and description; a channel badge and estimated time
 * follow, with a full-width Start CTA. Distinct from v1. Same props, token-only.
 */
exports.ServiceCardV2 = React.forwardRef(function ServiceCardV2({ category, title, description, channel, estimatedTime, actionLabel = 'Start', onStart, onClick, className, ...rest }, ref) {
    const c = CATEGORY[category] ?? CATEGORY.other;
    const ch = channel ? CHANNEL[channel] : undefined;
    const interactive = typeof onClick === 'function';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-service-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": title, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        } } : undefined, className: (0, cn_1.cn)('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start gap-3", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10 text-2xl", "aria-hidden": true, children: c.glyph }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: [c.label, estimatedTime ? ` · ${estimatedTime}` : ''] }), description ? (0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 text-sm text-muted", children: description }) : null] }), ch ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: ch.tone, children: ch.label }) : null] }), onStart ? (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "md", variant: "primary", className: "w-full", disabled: channel === 'unavailable', onClick: (e) => { e.stopPropagation(); onStart(); }, children: actionLabel }) : null] }));
});
//# sourceMappingURL=ServiceCardV2.js.map