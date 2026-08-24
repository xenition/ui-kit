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
exports.PlayerStatCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const interactive_1 = require("./interactive");
const STATUS_META = {
    available: { label: 'Available', glyph: '✓', tone: 'success' },
    injured: { label: 'Injured', glyph: '＋', tone: 'danger' },
    suspended: { label: 'Suspended', glyph: '⛔', tone: 'warn' },
};
/**
 * A player profile + stat grid — avatar (initials fallback via the shared
 * `Avatar`), name/position/number, and a grid of labelled stat cells.
 * Availability is a `Badge` carrying both a glyph and text so it never reads by
 * color alone. Presentational; shaped props plus optional `onClick`. Empty
 * stats and a loading skeleton are handled. Token-only colors.
 */
exports.PlayerStatCard = React.forwardRef(function PlayerStatCard({ name, position, number, photo, team, stats = [], variant = 'full', status, loading = false, onClick, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const shell = (0, cn_1.cn)('flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 text-on-surface', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-busy": "true", "aria-label": "Loading player", className: shell, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-10 w-10 rounded-full bg-neutral-200" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 space-y-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 rounded-sm bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-1/2 rounded-sm bg-neutral-100" })] })] }) }));
    }
    const meta = status ? STATUS_META[status] : undefined;
    const a11y = `${name}${position ? `, ${position}` : ''}${meta ? `, ${meta.label}` : ''}`;
    const interactive = (0, interactive_1.tappableProps)(onClick, a11y);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: onClick ? (0, cn_1.cn)(shell, interactive_1.FOCUS_RING) : shell, ...(onClick ? {} : { 'aria-label': a11y }), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: photo, name: name, size: compact ? 'sm' : 'lg' }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [number !== undefined ? ((0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-primary", children: number })) : null, (0, jsx_runtime_1.jsx)("span", { className: "flex-1 truncate text-base font-bold text-on-surface", children: name })] }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: [position, team].filter(Boolean).join(' · ') || 'Player' })] }), meta ? ((0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: meta.tone, "aria-label": meta.label, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, size: "xs", "aria-label": meta.label }), meta.label] })) : null] }), !compact && stats.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-2", children: stats.map((s, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "min-w-[72px] flex-1 basis-[28%] rounded-md bg-neutral-50 p-2", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('text-lg font-bold', s.highlight ? 'text-primary' : 'text-on-surface'), children: s.value }), (0, jsx_runtime_1.jsx)("div", { className: "truncate text-xs text-muted", children: s.label })] }, `${s.label}-${i}`))) })) : !compact ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: "No stats recorded" })) : null] }));
});
//# sourceMappingURL=PlayerStatCard.js.map