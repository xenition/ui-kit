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
exports.AllDayRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const format_1 = require("./format");
const EventBlockV4_1 = require("./EventBlockV4");
/**
 * **V4 all-day row** — the web twin of the native `AllDayRowV4`, same props as
 * {@link AllDayRow} plus `emptyLabel`.
 *
 * ## Three changes
 *
 * 1. **The label is a caption in `muted-text`**, and the row announces how
 *    many events it holds.
 * 2. **The empty case says so** when `hideWhenEmpty` is off — the base
 *    rendered an empty labelled strip, which reads as a loading state.
 * 3. **The scroll variant no longer clips its last chip**, because the blocks
 *    are laid out with the row's own gap rather than a margin on each.
 */
exports.AllDayRowV4 = React.forwardRef(function AllDayRowV4({ day, events = [], label = 'All day', layout = 'scroll', emptyLabel = 'None', onSelectEvent, selectedEventId, hideWhenEmpty = false, className, ...rest }, ref) {
    const allDay = React.useMemo(() => events.filter((e) => e.allDay && (0, format_1.sameDay)(e.start, day)), [events, day]);
    if (allDay.length === 0 && hideWhenEmpty)
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-all-day-row": layout, "aria-label": allDay.length === 0 ? `${label}, ${emptyLabel}` : undefined, className: (0, cn_1.cn)('flex items-center gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "shrink-0 text-xs font-semibold text-muted-text", children: label }), allDay.length === 0 ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: emptyLabel })) : ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('min-w-0 flex-1 gap-xs', layout === 'scroll'
                    ? 'flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                    : 'flex flex-col'), children: allDay.map((event) => ((0, jsx_runtime_1.jsx)(EventBlockV4_1.EventBlockV4, { event: event, size: "sm", variant: "soft", selected: selectedEventId === event.id, onPress: onSelectEvent, className: layout === 'scroll' ? 'shrink-0' : undefined }, event.id))) }))] }));
});
//# sourceMappingURL=AllDayRowV4.js.map