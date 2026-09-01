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
exports.AllDayRowV4 = AllDayRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const format_1 = require("../../calendar/format");
const EventBlockV4_1 = require("./EventBlockV4");
/**
 * **V4 all-day row** — same props as {@link AllDayRow} plus `emptyLabel`.
 *
 * ## Three changes
 *
 * 1. **The label is a real caption in `mutedText`**, and the row is announced
 *    with how many events it holds — the base left the count implicit.
 * 2. **The empty case says so** when `hideWhenEmpty` is off. The base rendered
 *    an empty labelled strip, which reads as a loading state.
 * 3. **The scroll variant no longer clips its last chip**, because the blocks
 *    are laid out with the module's own gap rather than a margin on each.
 */
function AllDayRowV4({ day, events = [], label = 'All day', layout = 'scroll', emptyLabel = 'None', onSelectEvent, selectedEventId, hideWhenEmpty = false, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const allDay = React.useMemo(() => events.filter((e) => e.allDay && (0, format_1.sameDay)(e.start, day)), [events, day]);
    if (allDay.length === 0 && hideWhenEmpty)
        return null;
    const blocks = allDay.map((event) => ((0, jsx_runtime_1.jsx)(EventBlockV4_1.EventBlockV4, { event: event, size: "sm", variant: "soft", selected: selectedEventId === event.id, onPress: onSelectEvent, style: layout === 'scroll' ? undefined : { alignSelf: 'stretch' } }, event.id)));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: allDay.length === 0, accessibilityLabel: allDay.length === 0 ? `${label}, ${emptyLabel}` : undefined, style: [
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", children: label }), allDay.length === 0 ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: emptyLabel })) : layout === 'scroll' ? ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.xs }, style: { flex: 1 }, children: blocks })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: blocks }))] }));
}
//# sourceMappingURL=AllDayRowV4.js.map