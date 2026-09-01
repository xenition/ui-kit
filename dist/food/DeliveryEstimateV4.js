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
exports.DeliveryEstimateV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const menu_v4_1 = require("./internal/menu-v4");
const MODE_GLYPH = { delivery: '🛵', pickup: '🛍️' };
const MODE_CAPTION = {
    delivery: 'Estimated delivery',
    pickup: 'Ready for pickup',
};
/**
 * **V4 delivery estimate** — the web twin of the native `DeliveryEstimateV4`,
 * same props as {@link DeliveryEstimate} plus `estimatingLabel` and `unit`.
 *
 * ## Four changes
 *
 * 1. **A transposed window is still a window.** The base tested
 *    `maxMinutes > minMinutes` and silently dropped the max otherwise, so
 *    `min={35} max={20}` rendered a confident "35 min" and the other end of
 *    the estimate vanished. `deliveryWindow()` reads the pair the way round a
 *    human would.
 * 2. **The name it computes is no longer thrown away.** `aria-label` sat on a
 *    role-less `div`, where a name is simply ignored — so the caption, the
 *    only thing saying whether this is delivery or pickup, never reached the
 *    reader in the `badge` variant that does not draw it.
 * 3. **Loading says a word instead of an em-dash.** "—" is not readable copy,
 *    and it announced as nothing at all; `estimatingLabel` is the word, and
 *    the readout is polite-live so the real figure is announced when it lands.
 * 4. **`unit` is a prop, and the pill is a token.** "min" was compiled in
 *    English into the component, and the badge painted `bg-neutral-100` — a
 *    light-oriented ramp step that inverts under `[data-theme="dark"]`. It now
 *    takes the module's one badge shape.
 */
exports.DeliveryEstimateV4 = React.forwardRef(function DeliveryEstimateV4({ minMinutes, maxMinutes, mode = 'delivery', variant = 'inline', caption, loading = false, estimatingLabel = 'Estimating', unit = 'min', className, ...rest }, ref) {
    const windowText = (0, menu_v4_1.deliveryWindow)(minMinutes, maxMinutes, unit);
    const timeText = loading ? estimatingLabel : windowText;
    const captionText = caption ?? MODE_CAPTION[mode];
    const label = (0, menu_v4_1.spokenLine)([captionText, timeText]);
    /*
      `role="group"` rather than nothing: a name on a role-less element is
      dropped, which is the defect. The visible text stays readable inside it —
      a group is not children-presentational, which is exactly why it is the
      right role here and `img` is not.
    */
    const shell = {
        role: 'group',
        'aria-label': label,
        'aria-busy': loading || undefined,
        'aria-live': loading ? 'polite' : undefined,
    };
    if (variant === 'badge') {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, ...shell, className: (0, cn_1.cn)('inline-flex self-start', className), ...rest, children: (0, jsx_runtime_1.jsxs)(BadgeV4_1.BadgeV4, { ...menu_v4_1.BADGE_V4, tone: "neutral", className: menu_v4_1.TABULAR_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: MODE_GLYPH[mode] }), timeText] }) }));
    }
    if (variant === 'card') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, ...shell, className: (0, cn_1.cn)('flex items-center gap-md rounded-[var(--xen-radius-lg)] border border-border bg-card p-md text-on-card', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-2xl leading-none", children: MODE_GLYPH[mode] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-heading text-lg font-bold text-on-card', menu_v4_1.TABULAR_CLASS), children: timeText }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: captionText })] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, ...shell, className: (0, cn_1.cn)('flex items-center gap-xs', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: MODE_GLYPH[mode] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-semibold text-on-card', menu_v4_1.TABULAR_CLASS), children: timeText }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm text-muted-text", children: "\u00B7" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: captionText })] }));
});
//# sourceMappingURL=DeliveryEstimateV4.js.map