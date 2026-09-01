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
exports.EventBlockV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const format_1 = require("./format");
const grid_v4_1 = require("./internal/grid-v4");
/**
 * **V4 event block** — the web twin of the native `EventBlockV4`, same props
 * as {@link EventBlock} plus `showTime` and `allDayLabel`.
 *
 * ## Four changes
 *
 * 1. **A solid block uses its tone's *paired* ink** (`TONE_ON`). The base
 *    inked every solid variant `text-on-primary` regardless of tone.
 * 2. **The soft variant gains a rail**, so an event's tone survives greyscale
 *    and CVD — a 16% tint alone does not.
 * 3. **A short block drops its time rather than clipping it.**
 * 4. **The block is one announced object**, not three loose text nodes.
 *
 * **Renders nothing without an event title** (§4.5).
 */
exports.EventBlockV4 = React.forwardRef(function EventBlockV4({ event, variant = 'soft', size = 'md', selected = false, showTime, allDayLabel = 'All day', onPress, height, className, }, ref) {
    if (!event?.title)
        return null;
    const tone = (0, grid_v4_1.eventTone)(event.tone);
    const solid = variant === 'solid';
    const time = event.allDay ? allDayLabel : (0, format_1.timeRangeLabel)(event.start, event.end);
    // A 15-minute block has room for one line; the accessible name keeps the
    // time either way.
    const room = height == null || height >= 48;
    const withTime = (showTime ?? true) && room;
    const name = (0, grid_v4_1.metaLine)([event.title, time, event.location, event.subtitle]);
    const body = ((0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate font-semibold', size === 'sm' ? 'text-xs' : 'text-sm', solid ? grid_v4_1.TONE_ON[tone] : 'text-on-card'), children: event.title }), withTime && time ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-xs [font-variant-numeric:tabular-nums]', solid ? grid_v4_1.TONE_ON[tone] : grid_v4_1.TONE_INK[tone]), children: time })) : null] }));
    const shell = (0, cn_1.cn)('flex gap-xs overflow-hidden rounded-[var(--xen-radius-sm)] px-xs', size === 'sm' ? 'py-0.5' : 'py-xs', variant === 'outline' && 'border', selected && 'ring-2 ring-[var(--xen-ring)]', solid && grid_v4_1.TONE_BG[tone]);
    const inlineStyle = {
        height,
        ...(solid ? null : { background: (0, grid_v4_1.blockGround)(tone) }),
        ...(variant === 'outline' ? { borderColor: grid_v4_1.TONE_VAR[tone] } : null),
    };
    const rail = !solid ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "w-[3px] shrink-0 self-stretch rounded-full", style: { background: grid_v4_1.TONE_VAR[tone] } })) : null;
    if (!onPress) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-event-block": tone, "aria-label": name, className: (0, cn_1.cn)(shell, className), style: inlineStyle, children: [rail, body] }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-event-block": tone, className: className, children: (0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": name, "aria-pressed": selected, onClick: () => onPress(event), "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)(shell, 'w-full text-left'), style: inlineStyle, children: [rail, body] }) }));
});
//# sourceMappingURL=EventBlockV4.js.map