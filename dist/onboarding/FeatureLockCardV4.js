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
exports.FeatureLockCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const flow_v4_1 = require("./internal/flow-v4");
/** At most this many benefit lines. A gate that lists six is a feature page. */
const MAX_BENEFITS = 3;
/**
 * **V4 locked-feature teaser** — the web twin of the native
 * `FeatureLockCardV4`, same props as {@link FeatureLockCard} plus `accent`,
 * `benefits`, `preview` and `priceHint`.
 *
 * Still drawn as a §8 feature row, so a teaser met mid-app reads as the same
 * object as the rows on the paywall it leads to.
 *
 * ## Four changes
 *
 * 1. **The badge tint is a `color-mix()`, not `bg-primary-50`.** The ramp step
 *    carries the light orientation, so on a dark page the base's badge was a
 *    near-white circle. A mix of `surface` and `primary` inverts with the
 *    scheme because both sides of it already have.
 * 2. **It sells** — `benefits` and `priceHint`.
 * 3. **The card is `CardV4`'s raised ground**, which is what makes a teaser
 *    inside a scrolling page read as an object rather than a region.
 * 4. **The glyph takes the contrast-corrected brand slot.**
 *
 * `inline` still collapses to a compact borderless row, and drops the preview
 * and the price hint with it. **Renders nothing without a `title`** (§4.5).
 */
exports.FeatureLockCardV4 = React.forwardRef(function FeatureLockCardV4({ title, description, icon = '🔒', planLabel = 'Pro', unlockLabel = 'Unlock', onUnlock, variant = 'card', accent = 'primary', benefits, preview, priceHint, className, style, ...rest }, ref) {
    if (!title)
        return null;
    const lines = benefits?.filter(Boolean).slice(0, MAX_BENEFITS) ?? [];
    const vars = { ...(0, flow_v4_1.flowGroundVars)('plain', accent), ...style };
    const row = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--flow-badge)] text-[var(--flow-ink)]", "aria-label": "Locked", children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: icon, size: "lg" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", children: title }), planLabel ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: accent === 'accent' ? 'accent' : 'primary', size: "sm", children: planLabel })) : null] }), description ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: description })) : null] })] }));
    if (variant === 'inline') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: vars, className: (0, cn_1.cn)('flex items-center gap-md', className), ...rest, children: [row, (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "secondary", size: "sm", onClick: onUnlock, "aria-label": unlockLabel, children: unlockLabel })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, style: vars, className: (0, cn_1.cn)('flex flex-col gap-md', className), ...rest, children: [preview ? ((0, jsx_runtime_1.jsx)("div", { "aria-hidden": true, className: "pointer-events-none overflow-hidden rounded-[var(--xen-radius-md)]", style: { opacity: v4_state_1.V4_STATE.disabledContent }, children: preview })) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-md", children: row }), lines.length > 0 ? ((0, jsx_runtime_1.jsx)("ul", { className: "flex flex-col gap-xs", children: lines.map((line) => ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-start gap-sm", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "check", size: "sm", className: "text-success-text" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onSurface", children: line })] }, line))) })) : null, (0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "md", onClick: onUnlock, "aria-label": unlockLabel, className: "w-full", children: unlockLabel }), priceHint ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", align: "center", children: priceHint })) : null] }));
});
//# sourceMappingURL=FeatureLockCardV4.js.map