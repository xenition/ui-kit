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
exports.Eyebrow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("./cn");
const TONE_CLASS = {
    primary: 'text-primary',
    accent: 'text-accent',
    muted: 'text-muted',
};
/**
 * Tracked small-caps kicker label — the tiny loud line above headings that
 * every template hand-rolled. Uses the semantic `primary`/`accent`/`muted`
 * slots (auto-contrast-checked by the theme compiler), never raw ramp steps,
 * so it stays readable in both modes. The optional flanking rules use
 * `currentColor` — no extra color rule needed.
 */
exports.Eyebrow = React.forwardRef(function Eyebrow({ tone = 'accent', rule = false, align = 'start', className, children, ...rest }, ref) {
    return ((0, jsx_runtime_1.jsxs)("p", { ref: ref, "data-xen-eyebrow": tone, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-xs)] font-heading text-xs font-bold uppercase tracking-[0.22em]', align === 'center' && 'justify-center', TONE_CLASS[tone], className), ...rest, children: [rule ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "inline-block h-px w-6 bg-current" }) : null, children, rule ? (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "inline-block h-px w-6 bg-current" }) : null] }));
});
//# sourceMappingURL=Eyebrow.js.map