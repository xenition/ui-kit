"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductMock = ProductMock;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
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
const BARS = Array.from({ length: 20 }, (_, i) => {
    const wave = Math.sin(i / 3.1) * 0.28 + Math.cos(i / 1.7) * 0.14;
    return Math.min(1, Math.max(0.15, 0.38 + wave + ((i * 37) % 19) / 90));
});
/** Deterministic sparkline sample heights (0..1), rendered as a stepped area. */
const SPARK = Array.from({ length: 16 }, (_, i) => {
    const wave = Math.sin(i / 2.2) * 0.3 + Math.cos(i / 3.7) * 0.18;
    return Math.min(1, Math.max(0.12, 0.5 + wave));
});
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
const CANVAS_HEIGHT = 160;
/**
 * A configurable fake-product panel — the native mirror of the web
 * `ProductMock`, the "product shot" of a landing hero.
 *
 * The web version is entirely CSS-animated (3D tilt entrance, looping
 * equalizer bars, self-drawing sparkline/rings, sliding feed rows) over glass
 * chrome with `backdrop-filter`. React Native has no keyframe engine,
 * `filter: blur()`, or SVG stroke-dash animation, so native renders a
 * **static, deterministic token visual** — no animation loop, reduced-motion
 * safe. The `variant`/`chart`/`kpis`/`feed` prop contract is preserved for
 * parity: bars/sparkline become stacked Views, rings become concentric
 * bordered circles, chat/calendar scenes become static bubble/grid layouts.
 * Token-only colors throughout; it is decorative scenery (`aria-hidden`).
 */
function ProductMock({ variant = 'analytics', title, kpis, chart, feed, live = 'LIVE', footnote, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const defaults = VARIANT_DEFAULTS[variant];
    const resolvedTitle = title ?? defaults.title;
    const resolvedKpis = kpis ?? defaults.kpis;
    const resolvedChart = chart ?? defaults.chart;
    const resolvedFeed = feed ?? defaults.feed;
    const canvasBg = (0, color_1.withAlpha)(colors.surface, 0.6);
    const tileBg = (0, color_1.withAlpha)(colors.surface, 0.6);
    const tileBorder = (0, color_1.withAlpha)(colors.border, 0.55);
    function renderVisual() {
        if (resolvedChart === 'bars') {
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'flex-end', gap: 3 }, children: BARS.map((h, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        flex: 1,
                        height: `${(h * 100).toFixed(0)}%`,
                        borderTopLeftRadius: 2,
                        borderTopRightRadius: 2,
                        backgroundColor: tokens.ramps.primary[500],
                        opacity: 0.85,
                    } }, i))) }));
        }
        if (resolvedChart === 'sparkline') {
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'flex-end', gap: 2 }, children: SPARK.map((h, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        flex: 1,
                        height: `${(h * 100).toFixed(0)}%`,
                        borderTopLeftRadius: 2,
                        borderTopRightRadius: 2,
                        backgroundColor: (0, color_1.withAlpha)(tokens.ramps.accent[400], 0.7),
                    } }, i))) }));
        }
        if (resolvedChart === 'rings') {
            const ringColors = [
                tokens.ramps.primary[500],
                tokens.ramps.accent[400],
                tokens.ramps.primary[300],
            ];
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 112, height: 112, alignItems: 'center', justifyContent: 'center' }, children: RINGS.map((fraction, i) => {
                        const size = 112 - i * 34;
                        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                position: 'absolute',
                                width: size,
                                height: size,
                                borderRadius: size / 2,
                                borderWidth: 6,
                                // static "progress" hint: full track tinted, thicker top edge tone
                                borderColor: (0, color_1.withAlpha)(colors.border, 0.7),
                                borderTopColor: ringColors[i],
                                borderRightColor: fraction > 0.5 ? ringColors[i] : (0, color_1.withAlpha)(colors.border, 0.7),
                            } }, i));
                    }) }) }));
        }
        // scene: chat thread or month grid
        if (variant === 'chat') {
            return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, justifyContent: 'flex-end', gap: tokens.spacing.xs }, children: BUBBLES.map(([width, mine], i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        height: 18,
                        width: `${width}%`,
                        borderRadius: tokens.radius.md,
                        alignSelf: mine ? 'flex-end' : 'flex-start',
                        backgroundColor: mine
                            ? (0, color_1.withAlpha)(tokens.ramps.primary[500], 0.5)
                            : (0, color_1.withAlpha)(colors.onSurface, 0.08),
                    } }, i))) }));
        }
        // calendar month grid
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 6 }, children: MONTH_CELLS.map((booked, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: `${100 / 7}%`,
                    aspectRatio: 1,
                    maxWidth: 20,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: booked
                        ? (0, color_1.withAlpha)(tokens.ramps.primary[500], 0.85)
                        : (0, color_1.withAlpha)(colors.onSurface, 0.06),
                } }, i))) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-product-mock", accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: [{ width: '100%' }, style], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                overflow: 'hidden',
                borderRadius: tokens.radius.lg,
                backgroundColor: (0, color_1.withAlpha)(colors.surface, 0.78),
                borderWidth: 1,
                borderColor: (0, color_1.withAlpha)(colors.border, 0.7),
            }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: tokens.spacing.lg,
                        paddingVertical: tokens.spacing.sm,
                        borderBottomWidth: 1,
                        borderBottomColor: (0, color_1.withAlpha)(colors.border, 0.7),
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: 6 }, children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            width: 10,
                                            height: 10,
                                            borderRadius: 5,
                                            backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.2),
                                        } }, i))) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: colors.muted,
                                        fontSize: tokens.typography.scale.xs,
                                        fontWeight: '500',
                                    }, children: resolvedTitle })] }), live !== false ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: tokens.spacing.xs,
                                paddingHorizontal: tokens.spacing.sm,
                                paddingVertical: tokens.spacing.xs,
                                borderRadius: 9999,
                                borderWidth: 1,
                                borderColor: (0, color_1.withAlpha)(colors.accent, 0.35),
                                backgroundColor: (0, color_1.withAlpha)(colors.accent, 0.1),
                            }, children: [(0, jsx_runtime_1.jsx)(StatusDot_1.StatusDot, { tone: "accent", pulse: false, size: 6 }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: colors.accent,
                                        fontSize: tokens.typography.scale.xs,
                                        fontWeight: '700',
                                    }, children: live })] })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                flexGrow: 1,
                                flexBasis: 260,
                                gap: tokens.spacing.lg,
                                padding: tokens.spacing.lg,
                            }, children: [resolvedKpis.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: resolvedKpis.map((kpi) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                            flex: 1,
                                            padding: tokens.spacing.sm,
                                            borderRadius: tokens.radius.md,
                                            backgroundColor: tileBg,
                                            borderWidth: 1,
                                            borderColor: tileBorder,
                                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                    color: colors.muted,
                                                    fontSize: tokens.typography.scale.xs,
                                                    fontWeight: '500',
                                                }, children: kpi.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                    marginTop: tokens.spacing.xs,
                                                    color: colors.onSurface,
                                                    fontSize: tokens.typography.scale.lg,
                                                    fontWeight: '700',
                                                }, children: kpi.value })] }, kpi.label))) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        height: CANVAS_HEIGHT,
                                        overflow: 'hidden',
                                        padding: tokens.spacing.md,
                                        borderRadius: tokens.radius.md,
                                        borderWidth: 1,
                                        borderColor: tileBorder,
                                        backgroundColor: canvasBg,
                                    }, children: renderVisual() })] }), resolvedFeed.length > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                flexGrow: 1,
                                flexBasis: 200,
                                gap: tokens.spacing.md,
                                padding: tokens.spacing.lg,
                                borderLeftWidth: 1,
                                borderLeftColor: (0, color_1.withAlpha)(colors.border, 0.7),
                            }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: colors.muted,
                                        fontSize: tokens.typography.scale.xs,
                                        fontWeight: '600',
                                    }, children: "EVENT STREAM" }), resolvedFeed.map((line, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: tokens.spacing.xs,
                                        paddingHorizontal: tokens.spacing.sm,
                                        paddingVertical: tokens.spacing.xs,
                                        borderRadius: tokens.radius.md,
                                        backgroundColor: tileBg,
                                        borderWidth: 1,
                                        borderColor: tileBorder,
                                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                                width: 6,
                                                height: 6,
                                                borderRadius: 3,
                                                backgroundColor: i % 2 === 0 ? colors.accent : colors.primary,
                                            } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                                flex: 1,
                                                color: colors.muted,
                                                fontSize: tokens.typography.scale.xs,
                                                fontWeight: '500',
                                            }, children: line })] }, i))), footnote !== undefined ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                                marginTop: 'auto',
                                                height: 1,
                                                backgroundColor: (0, color_1.withAlpha)(tokens.ramps.primary[500], 0.55),
                                            } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: footnote })] })) : null] })) : null] })] }) }));
}
//# sourceMappingURL=ProductMock.js.map