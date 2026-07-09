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
exports.ProductMock = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
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
/**
 * Everything color-bearing lives here, token-only. Inline styles on elements
 * carry geometry and per-element timing exclusively.
 */
const PRODUCT_MOCK_CSS = `
@keyframes xen-pm-enter {
  from { opacity: 0; transform: perspective(1200px) translate3d(0, 48px, 0) rotateX(12deg) scale(0.97); }
  to { opacity: 1; transform: perspective(1200px) translate3d(0, 0, 0) rotateX(0deg) scale(1); }
}
@keyframes xen-pm-eq {
  0%, 100% { transform: scaleY(0.45); }
  50% { transform: scaleY(1); }
}
@keyframes xen-pm-draw {
  from { stroke-dashoffset: 1; }
  to { stroke-dashoffset: 0; }
}
@keyframes xen-pm-slide {
  from { opacity: 0; transform: translate3d(24px, 0, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
[data-xen-product-mock] { position: relative; }
[data-xen-product-mock][data-tilt="true"] {
  animation: xen-pm-enter 1.1s cubic-bezier(0.22, 1, 0.36, 1) both;
}
[data-xen-pm-glow] {
  position: absolute;
  inset: -1.5rem;
  border-radius: calc(var(--xen-radius-lg) * 2);
  background-image: linear-gradient(90deg, var(--xen-primary-600), var(--xen-accent-600));
  opacity: 0.2;
  filter: blur(48px);
  pointer-events: none;
}
[data-xen-pm-frame] {
  position: relative;
  overflow: hidden;
  border-radius: var(--xen-radius-lg);
  background-color: color-mix(in srgb, var(--xen-surface) 78%, transparent);
  border: 1px solid color-mix(in srgb, var(--xen-border) 70%, transparent);
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  box-shadow: 0 0 60px -12px color-mix(in srgb, var(--xen-primary-500) 40%, transparent);
}
[data-xen-pm-chrome] { border-bottom: 1px solid color-mix(in srgb, var(--xen-border) 70%, transparent); }
[data-xen-pm-chrome-dot] { background-color: color-mix(in srgb, var(--xen-on-surface) 20%, transparent); }
[data-xen-pm-badge] {
  border: 1px solid color-mix(in srgb, var(--xen-accent) 35%, transparent);
  background-color: color-mix(in srgb, var(--xen-accent) 10%, transparent);
  color: var(--xen-accent);
  border-radius: 9999px;
}
[data-xen-pm-tile], [data-xen-pm-feed-row] {
  border-radius: var(--xen-radius-md);
  background-color: color-mix(in srgb, var(--xen-surface) 60%, var(--xen-on-surface) 5%);
  border: 1px solid color-mix(in srgb, var(--xen-border) 55%, transparent);
}
[data-xen-pm-canvas] {
  border-radius: var(--xen-radius-md);
  border: 1px solid color-mix(in srgb, var(--xen-border) 55%, transparent);
}
[data-xen-pm-bar] {
  transform-origin: bottom;
  border-radius: 2px 2px 0 0;
  background-image: linear-gradient(to top, var(--xen-primary-700), var(--xen-primary-500), var(--xen-accent-400));
  animation-name: xen-pm-eq;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  will-change: transform;
}
[data-xen-pm-spark] {
  stroke: var(--xen-accent-400);
  stroke-dasharray: 1;
  animation: xen-pm-draw 2.2s ease 0.4s both;
}
[data-xen-pm-spark-fill] { fill: color-mix(in srgb, var(--xen-primary-500) 14%, transparent); }
[data-xen-pm-ring-track] { stroke: color-mix(in srgb, var(--xen-border) 70%, transparent); }
[data-xen-pm-ring][data-ring="0"] { stroke: var(--xen-primary-500); }
[data-xen-pm-ring][data-ring="1"] { stroke: var(--xen-accent-400); }
[data-xen-pm-ring][data-ring="2"] { stroke: var(--xen-primary-300); }
[data-xen-pm-ring] { animation: xen-pm-draw 1.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
[data-xen-pm-bubble] {
  border-radius: var(--xen-radius-md);
  background-color: color-mix(in srgb, var(--xen-on-surface) 8%, transparent);
  animation: xen-pm-slide 0.6s ease both;
}
[data-xen-pm-bubble][data-mine="true"] {
  background-image: linear-gradient(120deg, color-mix(in srgb, var(--xen-primary-500) 55%, transparent), color-mix(in srgb, var(--xen-accent-500) 45%, transparent));
}
[data-xen-pm-cell] {
  border-radius: var(--xen-radius-sm);
  background-color: color-mix(in srgb, var(--xen-on-surface) 6%, transparent);
}
[data-xen-pm-cell][data-booked="true"] {
  background-image: linear-gradient(135deg, var(--xen-primary-500), var(--xen-accent-500));
  opacity: 0.85;
}
[data-xen-pm-feed] { border-left: 1px solid color-mix(in srgb, var(--xen-border) 70%, transparent); }
[data-xen-pm-feed-row] { animation: xen-pm-slide 0.6s ease both; }
[data-xen-pm-feed-row] [data-xen-pm-feed-tick="accent"] { background-color: var(--xen-accent); }
[data-xen-pm-feed-row] [data-xen-pm-feed-tick="primary"] { background-color: var(--xen-primary); }
[data-xen-pm-hairline] {
  height: 1px;
  background-image: linear-gradient(90deg, transparent, color-mix(in srgb, var(--xen-primary-500) 55%, transparent), color-mix(in srgb, var(--xen-accent-400) 55%, transparent), transparent);
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-product-mock][data-tilt="true"],
  [data-xen-pm-bar],
  [data-xen-pm-spark],
  [data-xen-pm-ring],
  [data-xen-pm-bubble],
  [data-xen-pm-feed-row] { animation: none !important; }
  [data-xen-pm-spark], [data-xen-pm-ring] { stroke-dashoffset: 0; }
}
`;
function BarsChart() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-x-4 bottom-4 top-10 flex items-end gap-[5px]", children: BARS.map((height, i) => ((0, jsx_runtime_1.jsx)("span", { "data-xen-pm-bar": "", className: "w-full", style: {
                height: `${(height * 100).toFixed(0)}%`,
                opacity: 0.85,
                animationDuration: `${(2.6 + (i % 4) * 0.4).toFixed(1)}s`,
                animationDelay: `${(i * 0.045).toFixed(2)}s`,
            } }, i))) }));
}
function SparklineChart() {
    return ((0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 240 56", preserveAspectRatio: "none", className: "absolute inset-x-4 bottom-4 top-10 h-auto w-[calc(100%-2rem)]", children: [(0, jsx_runtime_1.jsx)("path", { "data-xen-pm-spark-fill": "", stroke: "none", d: `${SPARK_PATH} L 240 56 L 0 56 Z` }), (0, jsx_runtime_1.jsx)("path", { "data-xen-pm-spark": "", d: SPARK_PATH, pathLength: 1, fill: "none", strokeWidth: "2", strokeLinecap: "round" })] }));
}
function RingsChart() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-4 top-10 flex items-center justify-center gap-6", children: (0, jsx_runtime_1.jsx)("svg", { viewBox: "0 0 96 96", className: "h-full max-h-28 w-auto", children: RINGS.map((fraction, i) => {
                const radius = 42 - i * 13;
                return ((0, jsx_runtime_1.jsxs)("g", { children: [(0, jsx_runtime_1.jsx)("circle", { "data-xen-pm-ring-track": "", cx: "48", cy: "48", r: radius, fill: "none", strokeWidth: "6" }), (0, jsx_runtime_1.jsx)("circle", { "data-xen-pm-ring": "", "data-ring": i, cx: "48", cy: "48", r: radius, fill: "none", strokeWidth: "6", strokeLinecap: "round", pathLength: 1, strokeDasharray: `${fraction} ${1 - fraction}`, transform: "rotate(-90 48 48)", style: { animationDelay: `${0.3 + i * 0.2}s` } })] }, i));
            }) }) }));
}
function ChatScene() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-4 top-10 flex flex-col justify-end gap-2", children: BUBBLES.map(([width, mine], i) => ((0, jsx_runtime_1.jsx)("span", { "data-xen-pm-bubble": "", "data-mine": mine ? 'true' : 'false', className: (0, cn_1.cn)('h-5', mine && 'self-end'), style: { width: `${width}%`, animationDelay: `${0.5 + i * 0.16}s` } }, i))) }));
}
function CalendarScene() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-4 top-10 grid grid-cols-7 gap-1.5", children: MONTH_CELLS.map((booked, i) => ((0, jsx_runtime_1.jsx)("span", { "data-xen-pm-cell": "", "data-booked": booked ? 'true' : 'false' }, i))) }));
}
const SCENES = {
    analytics: BarsChart,
    chat: ChatScene,
    commerce: SparklineChart,
    calendar: CalendarScene,
};
/**
 * A configurable fake-product panel — the "product shot" of a landing hero,
 * generalized from the SaaS template's dashboard mock. Glass chrome bar with
 * a pulsing LIVE badge, KPI tiles, an animated main pane (equalizer bars,
 * self-drawing sparkline, progress rings, chat thread, or month grid), and a
 * sliding event feed. Entirely CSS-animated (no library), token-only colors,
 * deterministic layout, and `aria-hidden` throughout: it is scenery — real
 * copy belongs outside it.
 *
 * ```tsx
 * <ProductMock variant="commerce" kpis={[{ label: 'Revenue', value: '$9,120' }]} />
 * ```
 */
exports.ProductMock = React.forwardRef(function ProductMock({ variant = 'analytics', title, kpis, chart, feed, live = 'LIVE', tilt = true, footnote, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-product-mock-styles', PRODUCT_MOCK_CSS);
    const defaults = VARIANT_DEFAULTS[variant];
    const resolvedTitle = title ?? defaults.title;
    const resolvedKpis = kpis ?? defaults.kpis;
    const resolvedChart = chart ?? defaults.chart;
    const resolvedFeed = feed ?? defaults.feed;
    const Scene = SCENES[variant];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-hidden": "true", "data-xen-product-mock": variant, "data-tilt": tilt ? 'true' : 'false', className: (0, cn_1.cn)('mx-auto w-full max-w-4xl', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { "data-xen-pm-glow": "" }), (0, jsx_runtime_1.jsxs)("div", { "data-xen-pm-frame": "", children: [(0, jsx_runtime_1.jsxs)("div", { "data-xen-pm-chrome": "", className: "flex items-center justify-between px-5 py-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex gap-1.5", children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)("span", { "data-xen-pm-chrome-dot": "", className: "h-2.5 w-2.5 rounded-full" }, i))) }), (0, jsx_runtime_1.jsx)("span", { className: "font-heading text-xs font-medium tracking-wide text-muted", children: resolvedTitle })] }), live !== false ? ((0, jsx_runtime_1.jsxs)("span", { "data-xen-pm-badge": "", className: "flex items-center gap-2 px-3 py-1 font-heading text-[10px] font-bold tracking-[0.18em]", children: [(0, jsx_runtime_1.jsx)(StatusDot_1.StatusDot, { tone: "accent" }), live] })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('grid', resolvedFeed.length > 0 && 'lg:grid-cols-[1fr_16rem]'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-5 p-5", children: [resolvedKpis.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "grid gap-3", style: {
                                            gridTemplateColumns: `repeat(${resolvedKpis.length}, minmax(0, 1fr))`,
                                        }, children: resolvedKpis.map((kpi) => ((0, jsx_runtime_1.jsxs)("div", { "data-xen-pm-tile": "", className: "p-3.5", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-[10px] font-medium uppercase tracking-[0.14em] text-muted", children: kpi.label }), (0, jsx_runtime_1.jsx)("p", { className: "mt-1 font-heading text-xl font-bold text-on-surface", children: kpi.value })] }, kpi.label))) })) : null, (0, jsx_runtime_1.jsxs)("div", { "data-xen-pm-canvas": "", className: "relative h-44 overflow-hidden p-4", children: [resolvedChart === 'bars' ? ((0, jsx_runtime_1.jsx)(BarsChart, {})) : resolvedChart === 'sparkline' ? ((0, jsx_runtime_1.jsx)(SparklineChart, {})) : resolvedChart === 'rings' ? ((0, jsx_runtime_1.jsx)(RingsChart, {})) : ((0, jsx_runtime_1.jsx)(Scene, {})), (0, jsx_runtime_1.jsx)("span", { className: "relative font-heading text-[11px] font-semibold tracking-wide text-muted", children: resolvedTitle.toUpperCase() })] })] }), resolvedFeed.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { "data-xen-pm-feed": "", className: "hidden flex-col gap-3 p-5 lg:flex", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-heading text-[11px] font-semibold tracking-[0.16em] text-muted", children: "EVENT STREAM" }), resolvedFeed.map((line, i) => ((0, jsx_runtime_1.jsxs)("div", { "data-xen-pm-feed-row": "", className: "flex items-center gap-2 px-3 py-2.5", style: { animationDelay: `${0.9 + i * 0.18}s` }, children: [(0, jsx_runtime_1.jsx)("span", { "data-xen-pm-feed-tick": i % 2 === 0 ? 'accent' : 'primary', className: "h-1.5 w-1.5 shrink-0 rounded-full" }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-[11px] font-medium text-muted", children: line })] }, i))), footnote !== undefined ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { "data-xen-pm-hairline": "", className: "mt-auto" }), (0, jsx_runtime_1.jsx)("p", { className: "text-[10px] leading-relaxed text-muted", children: footnote })] })) : null] })) : null] })] })] }));
});
//# sourceMappingURL=ProductMock.js.map