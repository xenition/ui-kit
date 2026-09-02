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
exports.StatusPillV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/** Soft treatment — a tone-tinted well with a hairline ring (every value a token class). */
const SOFT = {
    neutral: 'bg-neutral-100 text-on-surface ring-1 ring-border',
    primary: 'bg-primary/10 text-primary ring-1 ring-primary/20',
    accent: 'bg-accent/10 text-accent ring-1 ring-accent/20',
    success: 'bg-success/10 text-success ring-1 ring-success/20',
    warn: 'bg-warn/10 text-warn ring-1 ring-warn/20',
    danger: 'bg-danger/10 text-danger ring-1 ring-danger/20',
};
/** Solid (filled) treatment per tone. */
const SOLID = {
    neutral: 'bg-neutral-200 text-on-surface',
    primary: 'bg-primary text-on-primary',
    accent: 'bg-accent text-on-accent',
    success: 'bg-success text-on-success',
    warn: 'bg-warn text-on-warn',
    danger: 'bg-danger text-on-danger',
};
/** Inline (chrome-less) treatment — tone text color only. */
const INLINE = {
    neutral: 'text-muted',
    primary: 'text-primary',
    accent: 'text-accent',
    success: 'text-success',
    warn: 'text-warn',
    danger: 'text-danger',
};
/**
 * StatusPill — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on the shared status indicator: a rounded
 * **glyph + word** pill so state is never carried by color alone. The `soft`
 * variant reads as a tone-tinted well with a hairline ring; `solid` fills;
 * `inline` drops the chrome for dense rows. Keeps the base `variant`
 * (`soft` / `inline` / `solid`) and `size` (`sm` / `md`). Color always resolves
 * from a `--xen-*` token class, never a literal. Identical props/behavior to
 * {@link StatusPillProps}.
 */
exports.StatusPillV4 = React.forwardRef(function StatusPillV4({ meta, variant = 'soft', size = 'md', className, ...rest }, ref) {
    const inline = variant === 'inline';
    const tone = variant === 'solid' ? SOLID[meta.tone] : inline ? INLINE[meta.tone] : SOFT[meta.tone];
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, "aria-label": meta.label, "data-xen-status-pill": meta.tone, className: (0, cn_1.cn)('inline-flex items-center gap-1 font-bold leading-none', size === 'sm' ? 'text-xs' : 'text-sm', inline ? '' : 'rounded-full px-2.5 py-1', tone, className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { children: meta.label })] }));
});
//# sourceMappingURL=StatusPillV4.js.map