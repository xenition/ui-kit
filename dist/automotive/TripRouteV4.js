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
exports.TripRouteV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const fleet_v4_1 = require("./internal/fleet-v4");
const clamp01 = (n) => Math.max(0, Math.min(1, Number.isFinite(n) ? n : 0));
/**
 * **V4 trip route** — the web twin of the native `TripRouteV4`, same props as
 * {@link TripRoute} plus `originGlyph`, `destinationGlyph` and
 * `formatRouteLabel`.
 *
 * ## Three changes
 *
 * 1. **The markers use their *paired* ink** (`TONE_ON`). This is the defect
 *    that put the table in `tone-v4`: the base painted each marker `bg-[tone]`
 *    and its glyph `text-on-primary` regardless, so a `success` origin marker
 *    was a green disc wearing the brand's ink and whether it was readable
 *    depended on the seed.
 * 2. **The map has one accessible name** naming both endpoints, rather than
 *    being a decorative box with two unlabelled discs in it.
 * 3. **The ground is a mixed tint**, so it reads as a surface behind the route
 *    in both schemes instead of a flat neutral.
 */
exports.TripRouteV4 = React.forwardRef(function TripRouteV4({ origin, destination, waypoints = [], distance, duration, height = 180, originGlyph = 'A', destinationGlyph = 'B', formatRouteLabel, onClick, className, style, ...rest }, ref) {
    const oAt = origin.at ?? { x: 0.2, y: 0.75 };
    const dAt = destination.at ?? { x: 0.8, y: 0.25 };
    const ox = clamp01(oAt.x);
    const oy = clamp01(oAt.y);
    const dx = clamp01(dAt.x);
    const dy = clamp01(dAt.y);
    const dots = Array.from({ length: fleet_v4_1.ROUTE_DOTS }, (_, i) => {
        const t = (i + 1) / (fleet_v4_1.ROUTE_DOTS + 1);
        return { x: ox + (dx - ox) * t, y: oy + (dy - oy) * t };
    });
    const pin = (x, y, glyph, tone, testId) => ((0, jsx_runtime_1.jsx)("span", { "data-testid": testId, "aria-hidden": true, className: (0, cn_1.cn)('absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center', 'rounded-full border-2 border-card text-xs font-bold', fleet_v4_1.TONE_BG[tone], 
        // `TONE_ON`, not `text-on-primary`. See the note on this component.
        fleet_v4_1.TONE_ON[tone]), style: { left: `${x * 100}%`, top: `${y * 100}%` }, children: glyph }, testId));
    const label = (formatRouteLabel ?? ((a, b) => `Route from ${a} to ${b}`))(origin.label, destination.label);
    const caption = (0, fleet_v4_1.metaLine)([distance, duration]);
    const map = ((0, jsx_runtime_1.jsxs)("div", { "data-testid": "xen-trip-route", className: "relative overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-[color-mix(in_srgb,var(--xen-primary)_6%,var(--xen-card))]", style: { height }, children: [dots.map((d, i) => ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary", style: { left: `${d.x * 100}%`, top: `${d.y * 100}%` } }, `dot-${i}`))), waypoints.map((w, i) => w.at
                ? pin(clamp01(w.at.x), clamp01(w.at.y), String(i + 1), 'accent', `xen-route-waypoint-${i}`)
                : null), pin(ox, oy, originGlyph, 'success', 'xen-route-origin'), pin(dx, dy, destinationGlyph, 'primary', 'xen-route-destination')] }));
    const body = ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm", children: [map, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: origin.label }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: destination.label }), caption ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text [font-variant-numeric:tabular-nums]", children: caption })) : null] })] }));
    if (!onClick) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": (0, fleet_v4_1.metaLine)([label, caption]), className: className, style: style, ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, style: style, ...rest, children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, "aria-label": (0, fleet_v4_1.metaLine)([label, caption]), "data-xen-v4-chrome": "on-surface", className: "w-full rounded-[var(--xen-radius-lg)] text-left", children: body }) }));
});
//# sourceMappingURL=TripRouteV4.js.map