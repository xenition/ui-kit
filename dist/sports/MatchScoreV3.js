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
exports.MatchScoreV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const interactive_1 = require("./interactive");
const STATUS_LABEL = {
    live: 'LIVE', final: 'FT', upcoming: '', halftime: 'HT', postponed: 'PP',
};
const STATUS_TEXT = {
    live: 'text-danger', final: 'text-muted', upcoming: 'text-muted', halftime: 'text-warn', postponed: 'text-muted',
};
/**
 * MatchScore, redesigned (v3): a **dense fixture line**. Home code · score ·
 * away code on one row with the status/minute pinned right (LIVE in danger) —
 * hairline-bordered for a results ticker. The opposite of v2's board. Same props,
 * token-only.
 */
exports.MatchScoreV3 = React.forwardRef(function MatchScoreV3({ home, away, status, minute, kickoffLabel, competition, variant, loading = false, onClick, className, ...rest }, ref) {
    void variant;
    void competition;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-match-score": "", "aria-label": "Loading match", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2', className), ...rest, children: (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" }) });
    }
    const tap = (0, interactive_1.tappableProps)(onClick, `${home.name} versus ${away.name}`);
    const right = status === 'upcoming' ? (kickoffLabel ?? '') : status === 'live' && minute ? `${STATUS_LABEL[status]} ${minute}` : STATUS_LABEL[status];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-match-score": "", className: (0, cn_1.cn)('flex items-center gap-2 border-b border-border py-2', onClick && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...tap, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-on-surface", children: home.short ?? home.name }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold tabular-nums text-on-surface", children: status === 'upcoming' ? 'v' : `${home.score ?? 0}-${away.score ?? 0}` }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm text-on-surface", children: away.short ?? away.name }), right ? (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('shrink-0 text-xs font-semibold', STATUS_TEXT[status]), children: right }) : null] }));
});
//# sourceMappingURL=MatchScoreV3.js.map