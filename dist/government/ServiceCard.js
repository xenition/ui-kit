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
exports.ServiceCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Badge_1 = require("../primitives/Badge");
const Button_1 = require("../primitives/Button");
const pressable_1 = require("./internal/pressable");
const CATEGORY = {
    license: { label: 'Licensing', glyph: '🪪' },
    permit: { label: 'Permits', glyph: '📋' },
    tax: { label: 'Tax', glyph: '🧾' },
    records: { label: 'Records', glyph: '🗂️' },
    benefit: { label: 'Benefits', glyph: '🤝' },
    health: { label: 'Public health', glyph: '⚕️' },
    utility: { label: 'Utilities', glyph: '💧' },
    other: { label: 'Service', glyph: '🏛️' },
};
const CHANNEL = {
    online: { label: 'Online', glyph: '🌐', tone: 'success' },
    'in-person': { label: 'In person', glyph: '🏢', tone: 'warn' },
    phone: { label: 'By phone', glyph: '☎️', tone: 'neutral' },
    unavailable: { label: 'Unavailable', glyph: '⛔', tone: 'danger' },
};
/**
 * A single public-service tile for a civic app home / directory. The `category`
 * selects a tinted leading glyph disc; a `channel` badge conveys availability by
 * **text + glyph + color** (never color alone). An optional primary `Button`
 * fires `onStart` (a real `<button>` that stops propagation so it never triggers
 * the card), and the whole card becomes a keyboard-operable button only when
 * `onClick` is supplied. Token-bound throughout — no literal colors. Web parity
 * of the native `ServiceCard`.
 */
exports.ServiceCard = React.forwardRef(function ServiceCard({ category, title, description, channel, estimatedTime, actionLabel = 'Start', onStart, onClick, className, ...rest }, ref) {
    const cat = CATEGORY[category] ?? CATEGORY.other;
    const ch = channel ? CHANNEL[channel] : undefined;
    const interactive = (0, pressable_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, "aria-label": interactive ? `${title}, ${cat.label}` : undefined, className: (0, cn_1.cn)(interactive &&
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary-50", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: cat.glyph, size: "xl", color: "primary", "aria-label": cat.label }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: cat.label })] }), ch != null ? ((0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: ch.tone, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: ch.glyph }), " ", ch.label] })) : null] }), description != null ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-[var(--xen-space-sm)] text-sm text-on-surface", children: description })) : null, estimatedTime != null || onStart != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex items-center justify-between gap-[var(--xen-space-sm)]", children: [estimatedTime != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u23F1" }), " ", estimatedTime] })) : ((0, jsx_runtime_1.jsx)("span", {})), onStart != null ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", onClick: (e) => {
                            e.stopPropagation();
                            onStart();
                        }, children: actionLabel })) : null] })) : null] }));
});
//# sourceMappingURL=ServiceCard.js.map