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
exports.AgendaListV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const event_v4_1 = require("./internal/event-v4");
/** Every status says what it is, because the dot alone never did. */
const DEFAULT_STATUS_LABELS = {
    upcoming: 'Upcoming',
    live: 'Live now',
    done: 'Done',
};
/** How many placeholder rows a loading agenda draws. */
const SKELETON_ROWS = 3;
const ROW_STATE = (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)');
/**
 * **V4 agenda list** — the web twin of the native `AgendaListV4`, same props as
 * {@link AgendaList} plus `statusLabels`.
 *
 * ## Five changes
 *
 * 1. **A finished session no longer looks like a future one.** `upcoming` and
 *    `done` differed by an 8px dot's hue and nothing else, and `done` was
 *    painted `bg-border` — a hairline token with no promise of being visible as
 *    a solid dot at all. Every state now carries a **word** as well as a mark,
 *    and the marks come from `AGENDA_TONE`, where only `live` is a status
 *    colour because only `live` is a status.
 * 2. **The row announces the whole entry.** `09:00 Big Talk` was the accessible
 *    name of a row that also drew a subtitle and a state, and a name replaces
 *    the subtree — so the room and the state were unreachable.
 * 3. **Empty is the shared `EmptyStateV4`**, the same component the native twin
 *    composes, rather than two hand-rolled empties that drifted apart.
 * 4. **Loading announces, and draws the shape it is about to be** — the base
 *    put `aria-label` on a role-less `div`, where it is ignored, over two
 *    `bg-neutral-*` bars that invert to near-white plates on a dark page.
 * 5. **A press is a state layer and the row clears 44.** `hover:opacity-80`
 *    dims the row's own content, which is the signal M3 spends on *disabled*.
 */
exports.AgendaListV4 = React.forwardRef(function AgendaListV4({ items, onSelectItem, emptyLabel = 'No sessions scheduled yet', loading = false, statusLabels, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    const labelFor = (status) => statusLabels?.[status] ?? DEFAULT_STATUS_LABELS[status];
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "status", "aria-live": "polite", "aria-label": "Loading agenda", className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: Array.from({ length: SKELETON_ROWS }, (_, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-row items-center gap-md py-sm", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-md w-2xl shrink-0', event_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-md flex-1', event_v4_1.PLACEHOLDER_CLASS) })] }, i))) }));
    }
    const list = items ?? [];
    if (list.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyLabel }) }));
    }
    const clickable = typeof onSelectItem === 'function';
    const rowBody = (item, status) => ((0, jsx_runtime_1.jsxs)("span", { className: "flex w-full flex-row items-start gap-md text-left", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('w-2xl shrink-0 text-sm font-semibold text-muted-text', event_v4_1.TABULAR_CLASS), children: item.time }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('mt-xs h-sm w-sm shrink-0 rounded-full', tone_v4_1.TONE_BG[event_v4_1.AGENDA_TONE[status] ?? 'neutral']) }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-base font-semibold text-on-surface", children: item.title }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold', event_v4_1.TONE_INK[event_v4_1.AGENDA_TONE[status] ?? 'neutral']), children: labelFor(status) })] }), item.subtitle ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: item.subtitle })) : null] })] }));
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)("ul", { role: "list", className: "flex list-none flex-col gap-xs p-0", children: list.map((item) => {
                const status = item.status ?? 'upcoming';
                return ((0, jsx_runtime_1.jsx)("li", { role: "listitem", children: clickable ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => onSelectItem?.(item), "aria-label": (0, event_v4_1.spokenLine)([item.time, item.title, item.subtitle, labelFor(status)]), "data-xen-v4-state": "", style: ROW_STATE, className: (0, cn_1.cn)('flex w-full items-center rounded-[var(--xen-radius-md)] px-xs py-sm text-left', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', chrome_v4_1.MIN_TAP_CLASS), children: rowBody(item, status) })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center px-xs py-sm", children: rowBody(item, status) })) }, item.id));
            }) }) }));
});
//# sourceMappingURL=AgendaListV4.js.map