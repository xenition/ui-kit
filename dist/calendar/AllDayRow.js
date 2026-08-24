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
exports.AllDayRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const EventBlock_1 = require("./EventBlock");
const format_1 = require("./format");
/**
 * The all-day band that sits above a day/week time grid — a labelled strip of
 * full-day event chips. Distinct from the timed `TimeGrid`: these events have no
 * clock position. Renders an empty hint unless `hideWhenEmpty`. Token colors
 * only.
 */
exports.AllDayRow = React.forwardRef(function AllDayRow({ day, events = [], label = 'All day', layout = 'scroll', onSelectEvent, selectedEventId, hideWhenEmpty = false, className, ...rest }, ref) {
    const allDay = events.filter((e) => e.allDay && (0, format_1.sameDay)(e.start, day));
    if (allDay.length === 0 && hideWhenEmpty)
        return null;
    const chips = allDay.map((event) => ((0, jsx_runtime_1.jsx)("div", { className: "min-w-[7rem] shrink-0", children: (0, jsx_runtime_1.jsx)(EventBlock_1.EventBlock, { event: event, variant: "solid", size: "sm", selected: event.id === selectedEventId, onPress: onSelectEvent }) }, event.id)));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center border-b border-border py-1', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "w-14 shrink-0", children: (0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: label }) }), (0, jsx_runtime_1.jsx)("div", { className: "min-w-0 flex-1", children: allDay.length === 0 ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "\u2014" })) : layout === 'stack' ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-1", children: chips })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex gap-1 overflow-x-auto", children: chips })) })] }));
});
//# sourceMappingURL=AllDayRow.js.map