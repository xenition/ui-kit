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
exports.GlassPanel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("./cn");
/**
 * The glass recipe is `color-mix` over the semantic `surface`/`border` slots
 * — not a fixed neutral step — so the same panel is frosted-white in light
 * mode and smoked-charcoal in dark mode with zero configuration.
 */
const GLASS_CSS = `
[data-xen-glass] {
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}
[data-xen-glass="soft"] { background-color: color-mix(in srgb, var(--xen-surface) 45%, transparent); }
[data-xen-glass="regular"] { background-color: color-mix(in srgb, var(--xen-surface) 65%, transparent); }
[data-xen-glass="strong"] { background-color: color-mix(in srgb, var(--xen-surface) 82%, transparent); }
[data-xen-glass][data-bordered="true"] { border: 1px solid color-mix(in srgb, var(--xen-border) 60%, transparent); }
`;
/**
 * Translucent blurred surface — the "glass card/panel" treatment the SaaS
 * template hand-rolled. Token-pure (`color-mix` over `surface` + `border`),
 * theme-agnostic, and static (no motion to reduce). Compose it under
 * `ProductMock`, over `AuroraBackground`, or as a floating chrome bar.
 */
exports.GlassPanel = React.forwardRef(function GlassPanel({ intensity = 'regular', bordered = true, className, children, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-glass-styles', GLASS_CSS);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-glass": intensity, "data-bordered": bordered ? 'true' : 'false', className: (0, cn_1.cn)('rounded-lg', className), ...rest, children: children }));
});
//# sourceMappingURL=GlassPanel.js.map