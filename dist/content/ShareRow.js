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
exports.ShareRow = exports.DEFAULT_SHARE_TARGETS = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
/** A sensible default set of share destinations (glyphs, no icon font needed). */
exports.DEFAULT_SHARE_TARGETS = [
    { id: 'twitter', label: 'Share on X', glyph: '𝕏' },
    { id: 'facebook', label: 'Share on Facebook', glyph: 'f' },
    { id: 'link', label: 'Copy link', glyph: '🔗' },
    { id: 'mail', label: 'Share by email', glyph: '✉' },
];
/**
 * A row of share actions for an article — X, Facebook, copy-link, email, etc.
 * Web (React DOM) mirror of the native `ShareRow`. Data-driven via `targets`
 * (each supplies a glyph + accessible label) and a single `onShare(id)`
 * callback; the parent decides what each id does. Two variants: round `icons` or
 * `labeled` pills. Colors come only from `--xen-*` token classes.
 */
exports.ShareRow = React.forwardRef(function ShareRow({ onShare, targets = exports.DEFAULT_SHARE_TARGETS, variant = 'icons', heading = 'Share', className, ...rest }, ref) {
    const labeled = variant === 'labeled';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [heading != null ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs font-bold uppercase tracking-wide text-muted", children: heading })) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-sm)]", children: targets.map((t) => ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": t.label, onClick: () => onShare(t.id), className: (0, cn_1.cn)('inline-flex h-10 items-center justify-center gap-[var(--xen-space-xs)] border border-border bg-surface transition-opacity hover:opacity-80', labeled
                        ? 'rounded-[var(--xen-radius-md)] px-[var(--xen-space-md)]'
                        : 'w-10 rounded-full'), children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: t.glyph, size: "base", color: "onSurface" }), labeled ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: t.label }) : null] }, t.id))) })] }));
});
//# sourceMappingURL=ShareRow.js.map