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
exports.ProductMockV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const StatusDot_1 = require("../primitives/StatusDot");
const VARIANT_DEFAULTS = {
    analytics: {
        title: 'analytics / production',
        kpis: [
            { label: 'Active now', value: '8,412' },
            { label: 'Events / min', value: '96,204' },
            { label: 'Conversion', value: '4.8%' },
        ],
        chart: 'bars',
        feed: [
            'signup.completed · eu-west',
            'checkout.paid · us-east',
            'funnel.converted · ap-south',
            'alert.anomaly · p99 spike',
        ],
    },
    chat: {
        title: 'inbox / live',
        kpis: [
            { label: 'Open', value: '24' },
            { label: 'Median reply', value: '48s' },
            { label: 'CSAT', value: '98%' },
        ],
        chart: 'scene',
        feed: ['agent.assigned · queue a', 'conversation.resolved · web', 'note.added · api'],
    },
    commerce: {
        title: 'storefront / today',
        kpis: [
            { label: 'Revenue', value: '$12,480' },
            { label: 'Orders', value: '312' },
            { label: 'AOV', value: '$40.00' },
        ],
        chart: 'sparkline',
        feed: ['order.paid · #4821', 'cart.recovered · email', 'refund.issued · #4790'],
    },
    calendar: {
        title: 'schedule / week',
        kpis: [
            { label: 'Booked', value: '38' },
            { label: 'Utilization', value: '86%' },
            { label: 'No-shows', value: '1' },
        ],
        chart: 'scene',
        feed: ['booking.confirmed · 09:30', 'booking.rescheduled · 13:00', 'reminder.sent · sms'],
    },
};
/** Deterministic pseudo-random equalizer heights (stable across renders/runtimes). */
const BARS = Array.from({ length: 28 }, (_, i) => {
    const wave = Math.sin(i / 3.1) * 0.28 + Math.cos(i / 1.7) * 0.14;
    return Math.min(1, Math.max(0.15, 0.38 + wave + ((i * 37) % 19) / 90));
});
const SPARK_PATH = 'M0 46 C14 42, 22 30, 36 32 S 58 44, 72 38 S 96 16, 112 20 S 134 34, 150 26 S 176 6, 196 12 S 224 30, 240 22';
/** Ring completion fractions, outer to inner. */
const RINGS = [0.78, 0.54, 0.32];
/** Chat scene: [width%, mine?] skeleton bubbles, deterministic. */
const BUBBLES = [
    [58, false],
    [42, true],
    [66, false],
    [30, true],
    [50, false],
];
/** Calendar scene: 5×7 month grid; which cells read "booked", deterministic. */
const MONTH_CELLS = Array.from({ length: 35 }, (_, i) => (i * 13 + 5) % 7 < 3);
function BarsChart() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-x-4 bottom-4 top-4 flex items-end gap-[5px]", children: BARS.map((height, i) => ((0, jsx_runtime_1.jsx)("span", { className: "w-full rounded-t-[2px] bg-primary", style: { height: `${(height * 100).toFixed(0)}%`, opacity: 0.85 } }, i))) }));
}
function SparklineChart() {
    return ((0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 240 56", preserveAspectRatio: "none", className: "absolute inset-x-4 bottom-4 top-4 h-auto w-[calc(100%-2rem)]", children: [(0, jsx_runtime_1.jsx)("path", { className: "fill-primary/[0.12]", stroke: "none", d: `${SPARK_PATH} L 240 56 L 0 56 Z` }), (0, jsx_runtime_1.jsx)("path", { className: "stroke-accent", d: SPARK_PATH, fill: "none", strokeWidth: "2", strokeLinecap: "round" })] }));
}
function RingsChart() {
    const ringClass = ['stroke-primary', 'stroke-accent', 'stroke-primary/60'];
    return ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-4 flex items-center justify-center gap-6", children: (0, jsx_runtime_1.jsx)("svg", { viewBox: "0 0 96 96", className: "h-full max-h-28 w-auto", children: RINGS.map((fraction, i) => {
                const radius = 42 - i * 13;
                return ((0, jsx_runtime_1.jsxs)("g", { children: [(0, jsx_runtime_1.jsx)("circle", { className: "stroke-border", cx: "48", cy: "48", r: radius, fill: "none", strokeWidth: "6" }), (0, jsx_runtime_1.jsx)("circle", { className: ringClass[i], cx: "48", cy: "48", r: radius, fill: "none", strokeWidth: "6", strokeLinecap: "round", pathLength: 1, strokeDasharray: `${fraction} ${1 - fraction}`, transform: "rotate(-90 48 48)" })] }, i));
            }) }) }));
}
function ChatScene() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-4 flex flex-col justify-end gap-2", children: BUBBLES.map(([width, mine], i) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-5 rounded-[var(--xen-radius-md)]', mine ? 'self-end bg-primary/50' : 'bg-on-surface/[0.08]'), style: { width: `${width}%` } }, i))) }));
}
function CalendarScene() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-4 grid grid-cols-7 gap-1.5", children: MONTH_CELLS.map((booked, i) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('rounded-[var(--xen-radius-sm)]', booked ? 'bg-primary/80' : 'bg-on-surface/[0.06]') }, i))) }));
}
const SCENES = {
    analytics: BarsChart,
    chat: ChatScene,
    commerce: SparklineChart,
    calendar: CalendarScene,
};
/**
 * ProductMock — **V4** "showcase" design (web parity of the native V4). A crisp,
 * refined device/browser frame on a clean surface (NO brand gradient, no glass
 * blur, no glow): an elevated `rounded-lg border border-border bg-surface
 * shadow-sm` frame with a soft browser chrome bar (three neutral dots + the
 * `title` and an optional `LIVE` badge). The KPIs render as bold **tabular-nums**
 * numerals in soft-primary wells, and the main pane draws the same
 * variant/`chart` visual token-driven (equalizer bars, sparkline, progress rings,
 * chat thread, month grid). The base's looping CSS animation and 3D `tilt`
 * entrance are dropped for a still, reduced-motion-safe showcase (the `tilt` prop
 * is still accepted). Honors every base prop
 * (`variant`/`title`/`kpis`/`chart`/`feed`/`live`/`footnote`); it is decorative
 * scenery (`aria-hidden`). Token-only colors, no literals.
 */
exports.ProductMockV4 = React.forwardRef(function ProductMockV4({ variant = 'analytics', title, kpis, chart, feed, live = 'LIVE', tilt: _tilt, footnote, className, ...rest }, ref) {
    const defaults = VARIANT_DEFAULTS[variant];
    const resolvedTitle = title ?? defaults.title;
    const resolvedKpis = kpis ?? defaults.kpis;
    const resolvedChart = chart ?? defaults.chart;
    const resolvedFeed = feed ?? defaults.feed;
    const Scene = SCENES[variant];
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-hidden": "true", "data-xen-product-mock": variant, className: (0, cn_1.cn)('mx-auto w-full max-w-4xl', className), ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface shadow-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between border-b border-border px-5 py-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex gap-1.5", children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-on-surface/20" }, i))) }), (0, jsx_runtime_1.jsx)("span", { className: "font-heading text-xs font-medium tracking-wide text-muted", children: resolvedTitle })] }), live !== false ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-2 rounded-[var(--xen-radius-full)] border border-accent/35 bg-accent/10 px-3 py-1 font-heading text-[10px] font-bold tracking-[0.18em] text-accent", children: [(0, jsx_runtime_1.jsx)(StatusDot_1.StatusDot, { tone: "accent" }), live] })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('grid', resolvedFeed.length > 0 && 'lg:grid-cols-[1fr_16rem]'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-5 p-5", children: [resolvedKpis.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "grid gap-3", style: { gridTemplateColumns: `repeat(${resolvedKpis.length}, minmax(0, 1fr))` }, children: resolvedKpis.map((kpi) => ((0, jsx_runtime_1.jsxs)("div", { className: "rounded-[var(--xen-radius-md)] bg-primary/[0.06] p-3.5", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-[10px] font-medium uppercase tracking-[0.14em] text-muted", children: kpi.label }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1 font-heading text-xl font-extrabold tabular-nums text-on-surface", children: kpi.value })] }, kpi.label))) })) : null, (0, jsx_runtime_1.jsx)("div", { className: "relative h-44 overflow-hidden rounded-[var(--xen-radius-md)] border border-border bg-primary/[0.04]", children: resolvedChart === 'bars' ? ((0, jsx_runtime_1.jsx)(BarsChart, {})) : resolvedChart === 'sparkline' ? ((0, jsx_runtime_1.jsx)(SparklineChart, {})) : resolvedChart === 'rings' ? ((0, jsx_runtime_1.jsx)(RingsChart, {})) : ((0, jsx_runtime_1.jsx)(Scene, {})) })] }), resolvedFeed.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "hidden flex-col gap-3 border-l border-border p-5 lg:flex", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-heading text-[11px] font-semibold tracking-[0.16em] text-muted", children: "EVENT STREAM" }), resolvedFeed.map((line, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 rounded-[var(--xen-radius-md)] bg-primary/[0.05] px-3 py-2.5", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-1.5 w-1.5 shrink-0 rounded-full', i % 2 === 0 ? 'bg-accent' : 'bg-primary') }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-[11px] font-medium text-muted", children: line })] }, i))), footnote !== undefined ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "mt-auto h-px bg-primary/40" }), (0, jsx_runtime_1.jsx)("p", { className: "text-[10px] leading-relaxed text-muted", children: footnote })] })) : null] })) : null] })] }) }));
});
//# sourceMappingURL=ProductMockV4.js.map