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
exports.SceneCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Badge_1 = require("../primitives/Badge");
/**
 * A clickable scene / preset card — glyph, name, description and a device count.
 * When `active`, the card elevates, tints the glyph with `primary`, and shows an
 * "Active" {@link Badge} so the running state is labeled, not color-only. The
 * card is a `role="button"` surface firing `onActivate` on click / Enter / Space.
 * `deviceCount` is rendered defensively (only when a positive number).
 * Token-bound throughout — no literal colors.
 */
exports.SceneCard = React.forwardRef(function SceneCard({ name, icon = '✨', description, deviceCount, active = false, onActivate, className, style }, ref) {
    const count = typeof deviceCount === 'number' && deviceCount > 0 ? deviceCount : 0;
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, style: style, role: "button", tabIndex: 0, "aria-pressed": active, "aria-label": `${name} scene${active ? ', active' : ''}`, onClick: onActivate, onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onActivate?.();
            }
        }, className: (0, cn_1.cn)('cursor-pointer transition-shadow hover:shadow-md', active ? 'border-primary shadow-md' : 'shadow-sm', className), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-10 w-10 items-center justify-center rounded-[var(--xen-radius-md)] border bg-surface', active ? 'border-primary' : 'border-border'), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: icon, color: active ? 'primary' : 'onSurface', size: "xl" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 shrink truncate text-base font-semibold text-on-surface", children: name }), active ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: "Active" }) : null] }), description != null ? (0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 line-clamp-2 text-xs text-muted", children: description }) : null, count > 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 text-xs text-muted", children: `${count} ${count === 1 ? 'device' : 'devices'}` })) : null] })] }) }));
});
//# sourceMappingURL=SceneCard.js.map