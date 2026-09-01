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
exports.PestAlertV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const IconV4_1 = require("../primitives/IconV4");
const farm_v4_1 = require("./internal/farm-v4");
/**
 * Severity → tone and default label.
 *
 * `critical` and `high` share `danger` deliberately: the tone scale has three
 * steps and the severity scale has four, and collapsing them at the top is
 * right — a colour that means "worse than the worst" does not exist, and the
 * **word** is what separates them.
 */
const SEVERITY_META = {
    low: { label: 'Low', tone: 'success' },
    moderate: { label: 'Moderate', tone: 'warn' },
    high: { label: 'High', tone: 'danger' },
    critical: { label: 'Critical', tone: 'danger' },
};
/**
 * **V4 pest alert** — the web twin of the native `PestAlertV4`, same props as
 * {@link PestAlert} plus `severityLabels`, `recommendationLabel` and
 * `affectedLabel`.
 *
 * ## Four changes
 *
 * 1. **Severity reads without colour.** A tinted ground and a coloured glyph
 *    are both colour-only signals; V4 keeps them and adds the badge word and a
 *    leading rail, so severity survives greyscale and CVD.
 * 2. **The tint is a `color-mix()` over the semantic variables**, so it lands
 *    on the correct side of the page in dark mode instead of being a pale wash.
 * 3. **The glyph and headings take the contrast-corrected ink** (`*-text`)
 *    rather than the fill slots the base put on text.
 * 4. **The recommendation is labelled.** The base rendered it as a bare
 *    paragraph under the pest name, so the most actionable line on the card
 *    read as more description.
 *
 * **Renders nothing without a `pest`** (§4.5).
 */
exports.PestAlertV4 = React.forwardRef(function PestAlertV4({ pest, severity = 'moderate', affected, recommendation, detectedAt, icon = '🐛', actionLabel, onAction, severityLabels, recommendationLabel = 'Recommended action', affectedLabel = 'Affected', className, style, ...rest }, ref) {
    if (!pest)
        return null;
    const meta = SEVERITY_META[severity];
    const label = severityLabels?.[severity] ?? meta.label;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "alert", "data-xen-pest-alert": severity, className: (0, cn_1.cn)('flex gap-md overflow-hidden rounded-[var(--xen-radius-lg)] border border-border p-md', className), style: { background: (0, farm_v4_1.toneGround)(meta.tone), ...style }, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "w-[3px] shrink-0 self-stretch rounded-full", style: { background: farm_v4_1.TONE_FILL[meta.tone] } }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: icon, size: "lg", className: farm_v4_1.TONE_INK[meta.tone] }), (0, jsx_runtime_1.jsx)("p", { className: "min-w-0 flex-1 font-heading text-base font-bold text-on-card", children: pest }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: label })] }), affected ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted-text", children: affectedLabel }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-card", children: affected })] })) : null, recommendation ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted-text", children: recommendationLabel }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-card", children: recommendation })] })) : null, detectedAt ? ((0, jsx_runtime_1.jsxs)("p", { className: "flex items-center gap-xs text-xs text-muted-text", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "clock", size: "xs" }), detectedAt] })) : null, actionLabel && onAction ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "secondary", size: "sm", onClick: onAction, "aria-label": actionLabel, className: "self-start", children: actionLabel })) : null] })] }));
});
//# sourceMappingURL=PestAlertV4.js.map