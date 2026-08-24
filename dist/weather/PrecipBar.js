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
exports.PrecipBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const commerce_1 = require("../commerce");
const weather_utils_1 = require("./weather-utils");
/**
 * Precipitation-probability bars (web parity of the native `PrecipBar`): one
 * token-filled column per period, its height proportional to the chance (0–100).
 * The fill uses a `primary` token plus a droplet glyph header, so the metric
 * reads without color alone. Values are guarded/clamped to 0–100. Renders an
 * `EmptyState` when `slots` is empty. All colors come from the `--xen-*` tokens
 * via Tailwind classes — no literal colors, no chart deps.
 */
exports.PrecipBar = React.forwardRef(function PrecipBar({ slots, height = 96, showValues = false, emptyLabel = 'No precipitation data', className, ...rest }, ref) {
    if (slots.length === 0) {
        return ((0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCA7", size: "2xl", "aria-hidden": true }), title: emptyLabel, className: className, ...rest }));
    }
    const track = (0, weather_utils_1.clamp)(height, 32, 320);
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center gap-1", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCA7", size: "sm", "aria-label": "Precipitation" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "Precipitation" })] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-2 flex flex-row items-end justify-between gap-1", children: slots.map((slot, index) => {
                    const pct = (0, weather_utils_1.clamp)(slot.chance, 0, 100);
                    return ((0, jsx_runtime_1.jsxs)("div", { role: "img", "aria-label": `${slot.label}, ${pct} percent chance${slot.amount ? `, ${slot.amount}` : ''}`, className: "flex flex-1 flex-col items-center gap-1", children: [showValues ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [pct, "%"] }) : null, (0, jsx_runtime_1.jsx)("div", { className: "flex w-[70%] flex-col justify-end overflow-hidden rounded-[var(--xen-radius-sm)] bg-neutral-100", style: { height: track }, children: (0, jsx_runtime_1.jsx)("div", { className: "rounded-[var(--xen-radius-sm)] bg-primary", style: { height: `${pct}%` } }) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: slot.label })] }, `${slot.label}-${index}`));
                }) })] }));
});
//# sourceMappingURL=PrecipBar.js.map