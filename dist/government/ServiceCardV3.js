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
exports.ServiceCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const GLYPH = { license: '🪪', permit: '📋', tax: '🧾', records: '🗂️', benefit: '🤝', health: '⚕️', utility: '💧', other: '🏛️' };
const CHANNEL_LABEL = { online: 'Online', 'in-person': 'In person', phone: 'Phone', unavailable: 'Unavailable' };
/**
 * ServiceCard, redesigned (v3): a **dense directory line**. A category glyph, the
 * title over a category·channel·time subtitle, and a compact Start — hairline-
 * bordered for a services list. The opposite of v2's card. Same props, token-only.
 */
exports.ServiceCardV3 = React.forwardRef(function ServiceCardV3({ category, title, description, channel, estimatedTime, actionLabel = 'Start', onStart, onClick, className, ...rest }, ref) {
    void description;
    const interactive = typeof onClick === 'function';
    const sub = [channel ? CHANNEL_LABEL[channel] : null, estimatedTime].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-service-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": title, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        } } : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-lg", "aria-hidden": true, children: GLYPH[category] ?? '🏛️' }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: title }), sub ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: sub }) : null] }), onStart ? (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "ghost", disabled: channel === 'unavailable', onClick: (e) => { e.stopPropagation(); onStart(); }, children: actionLabel }) : null] }));
});
//# sourceMappingURL=ServiceCardV3.js.map