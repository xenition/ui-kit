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
exports.DayAgendaV4 = DayAgendaV4;
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
 * **V4 day agenda** — same props as {@link DayAgenda} plus `locale` and
 * `nowLabel`.
 *
 * ## Four changes
 *
 * 1. **The list is ordered by the shared layout pass**, so an agenda and a
 *    time grid showing the same day agree on the order — the base sorted here
 *    and there independently.
 * 2. **"Now" is a labelled divider**, not an unnamed rule. A screen-reader
 *    user could not tell which events had already happened.
 * 3. **The skeleton is opaque**, not a translucent wash of `muted`.
 * 4. **The empty state is copy in `mutedText`**, and the whole list announces
 *    itself as a list.
 */
function DayAgendaV4({ day, events = [], now, locale, nowLabel = 'Now', onSelectEvent, selectedEventId, loading = false, emptyLabel = 'Nothing scheduled.', variant = 'soft', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [70, 55, 80].map((w) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: tokens.spacing.xl,
                    width: `${w}%`,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: (0, grid_v4_1.skeletonFill)(theme),
                } }, w))) }));
    }
    const today = React.useMemo(() => events.filter((e) => (0, format_1.sameDay)(e.start, day)), [events, day]);
    const ordered = React.useMemo(() => (0, layout_v4_1.layoutEvents)(today), [today]);
    const nowMinutes = now != null && (0, format_1.sameDay)(now, day) ? now.getHours() * 60 + now.getMinutes() : null;
    if (ordered.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [{ padding: tokens.spacing.md }, style], children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: emptyLabel }) }));
    }
    const timeFmt = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' });
    let nowDrawn = false;
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", style: [{ gap: tokens.spacing.sm }, style], children: ordered.map((p) => {
            // The divider lands before the first event that has not started yet.
            const showNow = nowMinutes != null && !nowDrawn && p.startMin >= nowMinutes;
            if (showNow)
                nowDrawn = true;
            return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [showNow ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: nowLabel, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", tone: "dangerText", children: nowLabel }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 1, backgroundColor: colors.danger } })] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", style: { width: tokens.spacing['2xl'], paddingTop: tokens.spacing.xs / 2 }, children: p.event.allDay ? '' : timeFmt.format(p.event.start) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(EventBlockV4_1.EventBlockV4, { event: p.event, variant: variant, selected: selectedEventId === p.event.id, onPress: onSelectEvent }) })] })] }, p.key));
        }) }));
}
//# sourceMappingURL=DayAgendaV4.js.map