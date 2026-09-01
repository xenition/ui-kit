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
exports.SceneCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Badge_1 = require("../primitives/Badge");
/**
 * SceneCard — **V4** "ambient" design (web parity of the native V4). A calm scene
 * tile: a glyph sits in a tinted disc, with the scene name, an optional
 * description, and a device count. When `active`, the whole card glows — a soft
 * primary-tinted wash (`bg-primary/[0.08]`), a primary border, and a glowing glyph
 * disc (`bg-primary/15 border-primary/40`) — plus an "Active" {@link Badge} so the
 * running state is labeled, not color-only. The card is a `role="button"` surface
 * firing `onActivate` on click / Enter / Space. `deviceCount` renders defensively
 * (only when a positive number). Same props/behavior as {@link SceneCardProps};
 * all colors from `--xen-*` token classes (no literals).
 */
exports.SceneCardV4 = React.forwardRef(function SceneCardV4({ name, icon = '✨', description, deviceCount, active = false, onActivate, className, style }, ref) {
    const count = typeof deviceCount === 'number' && deviceCount > 0 ? deviceCount : 0;
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, style: style, variant: "flat", role: "button", tabIndex: 0, "aria-pressed": active, "aria-label": `${name} scene${active ? ', active' : ''}`, onClick: onActivate, onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onActivate?.();
            }
        }, className: (0, cn_1.cn)('cursor-pointer border transition-shadow', active
            ? 'border-primary/50 bg-primary/[0.08] shadow-md'
            : 'border-border bg-surface shadow-sm hover:shadow-md', className), children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-md)] border', active ? 'border-primary/40 bg-primary/15' : 'border-border bg-on-surface/5'), children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: icon, color: active ? 'primary' : 'onSurface', size: "xl" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 shrink truncate text-base font-bold text-on-surface", children: name }), active ? (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: "Active" }) : null] }), description != null ? (0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 line-clamp-2 text-xs text-muted", children: description }) : null, count > 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 text-xs text-muted", children: `${count} ${count === 1 ? 'device' : 'devices'}` })) : null] })] }) }));
});
//# sourceMappingURL=SceneCardV4.js.map