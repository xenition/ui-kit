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
exports.EventBlock = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const format_1 = require("./format");
/**
 * A single event chip/block — the shared visual atom for `WeekView`,
 * `TimeGrid`, `DayAgenda` and `AllDayRow`. A left accent bar keeps the tone
 * legible even in `soft`/`outline` variants (never color-alone), and selection
 * is exposed through `aria-pressed` + a tone ring (not color-alone). Tone
 * resolves to `--xen-*` token classes via `toneClasses`; every color traces to
 * a token. Renders a real `<button>` for native keyboard/focus behavior.
 */
exports.EventBlock = React.forwardRef(function EventBlock({ event, variant = 'soft', size = 'md', selected = false, onPress, height, className }, ref) {
    const tone = (0, format_1.toneClasses)(event.tone);
    const solid = variant === 'solid';
    const outline = variant === 'outline';
    const surfaceClass = solid
        ? (0, cn_1.cn)(tone.solidBg, tone.solidText)
        : outline
            ? 'bg-surface text-on-surface'
            : 'bg-neutral-100 text-on-surface';
    const metaClass = solid ? (0, cn_1.cn)(tone.solidText, 'opacity-80') : 'text-muted';
    const timeText = event.allDay ? 'All day' : (0, format_1.timeRangeLabel)(event.start, event.end);
    const label = `${event.title}, ${timeText}${event.location ? `, ${event.location}` : ''}`;
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "aria-label": label, "aria-pressed": selected || undefined, disabled: onPress == null, onClick: () => onPress?.(event), style: height != null ? { minHeight: height } : undefined, className: (0, cn_1.cn)('flex w-full overflow-hidden text-left transition-opacity', 'rounded-[var(--xen-radius-sm)]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-primary-300', 'disabled:cursor-default enabled:hover:opacity-90', surfaceClass, outline ? 'border border-border' : '', selected ? (0, cn_1.cn)('border', tone.accentBorder) : '', className), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('w-1 shrink-0 self-stretch', tone.accentBg) }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('flex-1 min-w-0', size === 'sm' ? 'p-1' : 'p-2'), children: [(0, jsx_runtime_1.jsx)("span", { className: "block truncate text-sm font-bold", children: event.title }), size === 'md' ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('block truncate text-xs', metaClass), children: [timeText, event.location ? ` · ${event.location}` : ''] })) : null] })] }));
});
//# sourceMappingURL=EventBlock.js.map