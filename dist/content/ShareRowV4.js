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
exports.ShareRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const IconV4_1 = require("../primitives/IconV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const ShareRow_1 = require("./ShareRow");
const reading_v4_1 = require("./internal/reading-v4");
/**
 * **V4 share row** — the web twin of the native `ShareRowV4`, same props as
 * {@link ShareRow} plus `formatTargetLabel`.
 *
 * ## Three changes
 *
 * 1. **Every share control clears 44.** They were exactly 40 square on web,
 *    with no prop and no class that could raise them.
 * 2. **Press is the state layer.** Web dimmed to `0.8` and native to `0.6` —
 *    and `0.6` is *below* M3's 0.38-to-1 disabled boundary in perceived
 *    weight, so a pressed share button read as an unavailable one.
 * 3. **The destination copy is overridable** without restating the whole
 *    `targets` array, and the heading takes `mutedText` rather than the
 *    `muted` fill.
 */
exports.ShareRowV4 = React.forwardRef(function ShareRowV4({ onShare, targets = ShareRow_1.DEFAULT_SHARE_TARGETS, variant = 'icons', heading = 'Share', formatTargetLabel, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const labeled = variant === 'labeled';
    const label = (value) => formatTargetLabel?.(value) ?? value;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [heading != null ? ((0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-xs font-bold uppercase tracking-wide', reading_v4_1.TONE_INK.muted), children: heading })) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-sm", children: targets.map((target) => {
                    const text = label(target.label);
                    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": text, onClick: () => onShare(target.id), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)('inline-flex items-center justify-center gap-xs border border-border bg-surface', 
                        // The HIG floor, composed from the spacing scale — not a typed 44.
                        chrome_v4_1.MIN_TAP_CLASS, labeled
                            ? 'rounded-[var(--xen-radius-md)] px-md'
                            : 'w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] rounded-[var(--xen-radius-full)]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: target.glyph, size: "base", color: "onSurface" }), labeled ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: text })) : null] }, target.id));
                }) })] }));
});
//# sourceMappingURL=ShareRowV4.js.map