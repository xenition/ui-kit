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
exports.MatchScoreV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const interactive_1 = require("./interactive");
const STATUS = {
    live: { label: 'LIVE', cls: 'bg-danger text-on-danger' },
    final: { label: 'FT', cls: 'bg-neutral-200 text-on-surface' },
    upcoming: { label: 'Upcoming', cls: 'bg-primary/10 text-primary' },
    halftime: { label: 'HT', cls: 'bg-warn/20 text-warn' },
    postponed: { label: 'Postponed', cls: 'bg-neutral-200 text-muted' },
};
/**
 * MatchScore, redesigned (v2): a **feature scoreboard**. The competition caption
 * tops a big centered board — home crest/name, an oversized score with the away
 * side mirrored, and a status/minute pill beneath (LIVE fills danger). Bolder
 * than v1's row. Same props, token-only.
 */
exports.MatchScoreV2 = React.forwardRef(function MatchScoreV2({ home, away, status, minute, kickoffLabel, competition, variant, loading = false, onClick, className, ...rest }, ref) {
    void variant;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-match-score": "", "aria-label": "Loading match", className: (0, cn_1.cn)('h-28 animate-pulse rounded-lg bg-neutral-100', className), ...rest });
    }
    const st = STATUS[status];
    const tap = (0, interactive_1.tappableProps)(onClick, `${home.name} versus ${away.name}`);
    const Side = ({ team, align }) => ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex min-w-0 flex-1 flex-col items-center gap-1', align === 'left' ? 'items-start' : 'items-end'), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-2xl", "aria-hidden": true, children: team.crest ?? '⚽' }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: team.name })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-match-score": "", className: (0, cn_1.cn)('flex flex-col items-center gap-2 rounded-lg bg-surface p-md shadow-sm', onClick && 'cursor-pointer transition-opacity hover:opacity-90', className), ...tap, ...rest, children: [competition ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs uppercase tracking-wide text-muted", children: competition }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "flex w-full items-center gap-3", children: [(0, jsx_runtime_1.jsx)(Side, { team: home, align: "left" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col items-center", children: status === 'upcoming' ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-muted", children: kickoffLabel ?? 'vs' })) : ((0, jsx_runtime_1.jsxs)("span", { className: "text-3xl font-bold tabular-nums text-on-surface", children: [home.score ?? 0, (0, jsx_runtime_1.jsx)("span", { className: "mx-1 text-muted", children: "-" }), away.score ?? 0] })) }), (0, jsx_runtime_1.jsx)(Side, { team: away, align: "right" })] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('rounded-full px-2.5 py-0.5 text-xs font-bold', st.cls), children: status === 'live' && minute ? `${st.label} ${minute}` : st.label })] }));
});
//# sourceMappingURL=MatchScoreV2.js.map