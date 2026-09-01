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
exports.TimeGridV4 = TimeGridV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const format_1 = require("../../calendar/format");
const layout_v4_1 = require("../../calendar/layout-v4");
const EventBlockV4_1 = require("./EventBlockV4");
const grid_v4_1 = require("./internal/grid-v4");
/**
 * **V4 time grid** — same props as {@link TimeGrid} plus `locale`, `nowLabel`
 * and `emptyLabel`.
 *
 * ## The change this component exists for
 *
 * **The overlap layout was inconsistent.** The base computed, per event, the
 * set of events overlapping *that* event and used its size as the column
 * count — so A 9:00–10:00, B 9:30–10:30 and C 10:00–11:00 were laid out on
 * three different column grids in one day, colliding and leaving gaps at the
 * same time. `layoutEvents()` in `calendar/layout-v4.ts` replaces it with the
 * standard two-pass algorithm: cluster the connected overlaps, then pack each
 * cluster into columns every one of its members shares. The reasoning, and the
 * worked example, are in that file.
 *
 * ## Three more
 *
 * 1. **The hour gutter is localized.** It was built from a frozen English
 *    `hourLabel`; `Intl` already knows every locale's clock.
 * 2. **"Now" is announced.** The base drew a rule and gave it no name, so a
 *    screen-reader user got no current time at all.
 * 3. **The metrics come off the spacing scale**, so the hour rules and the
 *    blocks agree on a seed that scales its spacing — they drifted apart with
 *    `hourHeight = 56` and a `GUTTER` of 48.
 */
function TimeGridV4({ day, events = [], startHour = 6, endHour = 22, hourHeight, now, locale, nowLabel = 'Current time', emptyLabel = 'Nothing scheduled.', onSelectEvent, selectedEventId, scroll = true, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const metrics = (0, grid_v4_1.gridMetrics)(theme);
    const hourPx = hourHeight ?? metrics.hour;
    const from = Math.max(0, Math.min(23, startHour));
    const to = Math.max(from + 1, Math.min(24, endHour));
    const hours = Array.from({ length: to - from }, (_, i) => from + i);
    const gridTop = from * 60;
    const totalHeight = (to - from) * hourPx;
    const yFor = (minutes) => ((minutes - gridTop) / 60) * hourPx;
    const timed = React.useMemo(() => events.filter((e) => !e.allDay && (0, format_1.sameDay)(e.start, day)), [events, day]);
    const positioned = React.useMemo(() => (0, layout_v4_1.layoutEvents)(timed), [timed]);
    const nowMinutes = now != null && (0, format_1.sameDay)(now, day) ? (0, layout_v4_1.minutesOf)(now) : null;
    const showNow = nowMinutes != null && nowMinutes >= gridTop && nowMinutes <= to * 60;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { height: totalHeight, flexDirection: 'row' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: metrics.gutter }, children: hours.map((h, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        position: 'absolute',
                        top: i * hourPx - tokens.typography.scale.xs / 2,
                        right: tokens.spacing.xs,
                    }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: (0, layout_v4_1.hourTitle)(h, locale) }) }, h))) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [hours.map((h, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                            position: 'absolute',
                            top: i * hourPx,
                            left: 0,
                            right: 0,
                            height: 1,
                            backgroundColor: colors.border,
                        } }, h))), positioned.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: emptyLabel }) })) : null, positioned.map((p) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            top: Math.max(0, yFor(p.startMin)),
                            height: Math.max(metrics.minBlock, yFor(p.endMin) - yFor(p.startMin)),
                            // Every member of a cluster shares its column count, so the
                            // blocks in one overlap group finally line up.
                            left: `${(100 / p.columns) * p.column}%`,
                            width: `${100 / p.columns}%`,
                            paddingRight: tokens.spacing.xs / 2,
                        }, children: (0, jsx_runtime_1.jsx)(EventBlockV4_1.EventBlockV4, { event: p.event, size: "sm", selected: selectedEventId === p.event.id, onPress: onSelectEvent, height: Math.max(metrics.minBlock, yFor(p.endMin) - yFor(p.startMin)) }) }, p.key))), showNow ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: nowLabel, pointerEvents: "none", style: {
                            position: 'absolute',
                            top: yFor(nowMinutes),
                            left: 0,
                            right: 0,
                            height: 2,
                            backgroundColor: colors.danger,
                        } })) : null] })] }));
    if (!scroll)
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: body });
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { style: style, contentContainerStyle: { paddingBottom: tokens.spacing.lg }, children: body }));
}
//# sourceMappingURL=TimeGridV4.js.map