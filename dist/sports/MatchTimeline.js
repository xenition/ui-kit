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
exports.MatchTimeline = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const EVENT_META = {
    goal: { glyph: '⚽', label: 'Goal' },
    'own-goal': { glyph: '🥅', label: 'Own goal' },
    penalty: { glyph: '🅿', label: 'Penalty' },
    yellow: { glyph: '🟨', label: 'Yellow card' },
    red: { glyph: '🟥', label: 'Red card' },
    sub: { glyph: '🔁', label: 'Substitution' },
    var: { glyph: '📺', label: 'VAR' },
};
/**
 * A match event timeline — a vertical spine with a minute marker per event and
 * the event pushed to the home (left) or away (right) side. Each event carries
 * a glyph and an accessible kind prefix, so goals, cards, and subs are legible
 * without relying on color. Empty state built in. Presentational; pass shaped
 * `events`. Token-only colors; the marker is a plain `div`.
 */
exports.MatchTimeline = React.forwardRef(function MatchTimeline({ homeLabel = 'Home', awayLabel = 'Away', events, emptyLabel = 'No events yet', className, ...rest }, ref) {
    const shell = (0, cn_1.cn)('flex flex-col gap-2 rounded-lg border border-border bg-surface p-4 text-on-surface', className);
    const header = ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex-1 truncate text-sm font-bold text-primary", children: homeLabel }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 truncate text-right text-sm font-bold text-accent", children: awayLabel })] }));
    if (events.length === 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: shell, ...rest, children: [header, (0, jsx_runtime_1.jsx)("p", { className: "py-3 text-center text-sm text-muted", children: emptyLabel })] }));
    }
    const cell = (e, mine) => {
        const meta = EVENT_META[e.kind] ?? EVENT_META.goal;
        if (!mine)
            return (0, jsx_runtime_1.jsx)("div", { className: "flex-1" });
        const home = e.side === 'home';
        return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex flex-1', home ? 'justify-end' : 'justify-start'), children: (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex items-center gap-1', home ? 'flex-row' : 'flex-row-reverse'), children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex min-w-0 flex-col', home ? 'items-end' : 'items-start'), children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: e.label }), e.detail ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: e.detail })) : null] }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-base leading-none", children: meta.glyph })] }) }));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "list", className: shell, ...rest, children: [header, events.map((e) => {
                const meta = EVENT_META[e.kind] ?? EVENT_META.goal;
                return ((0, jsx_runtime_1.jsxs)("div", { role: "listitem", "aria-label": `${e.minute}, ${meta.label}, ${e.side === 'home' ? homeLabel : awayLabel}: ${e.label}${e.detail ? `, ${e.detail}` : ''}`, className: "flex items-center gap-2", children: [cell(e, e.side === 'home'), (0, jsx_runtime_1.jsx)("div", { className: "flex min-w-[44px] justify-center", children: (0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-neutral-100 px-1 py-px text-xs font-bold text-on-surface", children: e.minute }) }), cell(e, e.side === 'away')] }, e.id));
            })] }));
});
//# sourceMappingURL=MatchTimeline.js.map