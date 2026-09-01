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
exports.PlayerStatCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Icon_1 = require("../primitives/Icon");
const interactive_1 = require("./interactive");
const STATUS_META = {
    available: { label: 'Available', glyph: '✓', pill: 'bg-success/10 text-success' },
    injured: { label: 'Injured', glyph: '＋', pill: 'bg-danger/10 text-danger' },
    suspended: { label: 'Suspended', glyph: '⛔', pill: 'bg-warn/10 text-warn' },
};
/**
 * PlayerStatCard — **V4** "broadcast" design (web parity of the native V4). The
 * matchday take on a player profile: an elevated card with a shirt-number chip in
 * a soft-primary tint, name/position/team, an availability pill that reads by
 * glyph + text (never color alone), and the key stats as big bold numerals over
 * muted labels — the leading `highlight` stat sits on a soft-primary tile. Same
 * props/behavior as {@link PlayerStatCardProps}; all colors from `--xen-*` token
 * classes (no literals). `loading` swaps in a token skeleton.
 */
exports.PlayerStatCardV4 = React.forwardRef(function PlayerStatCardV4({ name, position, number, photo, team, stats = [], variant = 'full', status, loading = false, onClick, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const shell = (0, cn_1.cn)('flex flex-col gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-4 text-on-surface shadow-sm', className);
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-busy": "true", "aria-label": "Loading player", className: shell, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-10 w-10 rounded-full bg-on-surface/10" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 space-y-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 rounded-sm bg-on-surface/10" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-1/2 rounded-sm bg-on-surface/10" })] })] }) }));
    }
    const meta = status ? STATUS_META[status] : undefined;
    const a11y = `${name}${position ? `, ${position}` : ''}${meta ? `, ${meta.label}` : ''}`;
    const interactive = (0, interactive_1.tappableProps)(onClick, a11y);
    const renderStat = (s, i) => ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('min-w-[72px] flex-1 basis-[28%] rounded-md p-2', s.highlight ? 'bg-primary/10' : 'bg-on-surface/5'), children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('text-2xl font-extrabold tabular-nums', s.highlight ? 'text-primary' : 'text-on-surface'), children: s.value }), (0, jsx_runtime_1.jsx)("div", { className: "truncate text-xs text-muted", children: s.label })] }, `${s.label}-${i}`));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: onClick ? (0, cn_1.cn)(shell, interactive_1.FOCUS_RING) : shell, ...(onClick ? {} : { 'aria-label': a11y }), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: photo, name: name, size: compact ? 'sm' : 'lg' }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1", children: [number !== undefined ? ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex h-6 min-w-[24px] items-center justify-center rounded-md bg-primary/10 px-1 text-sm font-extrabold text-primary tabular-nums", children: number })) : null, (0, jsx_runtime_1.jsx)("span", { className: "flex-1 truncate text-base font-extrabold text-on-surface", children: name })] }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: [position, team].filter(Boolean).join(' · ') || 'Player' })] }), meta ? ((0, jsx_runtime_1.jsxs)("span", { "aria-label": meta.label, className: (0, cn_1.cn)('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-extrabold', meta.pill), children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: meta.glyph, size: "xs", "aria-label": meta.label }), meta.label] })) : null] }), !compact && stats.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-2", children: stats.map(renderStat) })) : !compact ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted", children: "No stats recorded" })) : null] }));
});
//# sourceMappingURL=PlayerStatCardV4.js.map