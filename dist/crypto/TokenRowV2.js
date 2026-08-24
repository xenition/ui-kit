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
exports.TokenRowV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const Sparkline_1 = require("../charts/Sparkline");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const format_1 = require("./internal/format");
const pressable_1 = require("./internal/pressable");
/** Static `text-*` token class per icon color slot (literal classes for JIT). */
const ICON_TEXT = {
    onSurface: 'text-on-surface',
    onPrimary: 'text-on-primary',
    primary: 'text-primary',
    muted: 'text-muted',
    success: 'text-success',
    onSuccess: 'text-on-success',
    warn: 'text-warn',
    onWarn: 'text-on-warn',
    danger: 'text-danger',
    onDanger: 'text-on-danger',
};
/** Tinted disc fill per icon color slot (the web equal of native `withAlpha`). */
const ICON_TINT = {
    onSurface: 'bg-neutral-100',
    onPrimary: 'bg-primary/10',
    primary: 'bg-primary/10',
    muted: 'bg-neutral-100',
    success: 'bg-success/10',
    onSuccess: 'bg-success/10',
    warn: 'bg-warn/10',
    onWarn: 'bg-warn/10',
    danger: 'bg-danger/10',
    onDanger: 'bg-danger/10',
};
/** Change-tone → soft pill fill (token tint, never a literal color). */
const PILL_BG = {
    success: 'bg-success/10',
    danger: 'bg-danger/10',
    muted: 'bg-neutral-100',
};
/**
 * TokenRow, redesigned (v2): an **elevated card** with a tinted token disc, a
 * derived {@link Sparkline}, and a toned change pill. The sparkline shape is
 * synthesized from `changePct` (it slopes up for gains, down for losses — no new
 * data needed), colored with the semantic tone slot; the 24h change reads in the
 * `text-success`/`text-danger` slots with a ▲/▼ glyph so it is never color-only.
 * Fiat runs through {@link MoneyAmount} (integer cents — no drift). Distinct at a
 * glance from the base's flat list line. Same props.
 */
exports.TokenRowV2 = React.forwardRef(function TokenRowV2({ symbol, name, amount, decimals = 4, valueCents, currency = 'USD', changePct, icon, iconColor = 'primary', onClick, className, ...rest }, ref) {
    const hasChange = changePct != null;
    const toneKey = (0, format_1.changeToneKey)(changePct ?? 0);
    const interactive = (0, pressable_1.pressableProps)(onClick);
    // Synthesize a small trend shape from the 24h change — a presentational cue
    // derived from the only signal we have, so no extra prop is introduced.
    const spark = React.useMemo(() => {
        const c = Number.isFinite(changePct ?? 0) ? changePct ?? 0 : 0;
        const slope = Math.max(-1, Math.min(1, c / 12));
        return Array.from({ length: 14 }, (_, i) => {
            const t = i / 13 - 0.5;
            const base = 0.55 + slope * t;
            const wobble = Math.sin(i * 1.35) * 0.055;
            return Math.max(0.06, base + wobble);
        });
    }, [changePct]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? `${symbol} holding` : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-md)] shadow-md', interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border', ICON_TINT[iconColor]), children: icon != null ? ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: icon, color: iconColor, size: "lg" })) : ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-bold', ICON_TEXT[iconColor]), children: symbol.slice(0, 3).toUpperCase() })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: symbol }), name != null ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: name }) : null] }), (0, jsx_runtime_1.jsx)(Sparkline_1.Sparkline, { data: spark, color: toneKey, height: 28, width: 56, className: "shrink-0", "aria-label": `${symbol} trend` }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-[76px] flex-col items-end gap-1", children: [valueCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: valueCents, currency: currency, tone: "neutral", size: "sm" })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold tabular-nums text-on-surface", children: (0, format_1.formatToken)(amount, { decimals, symbol }) })), hasChange ? ((0, jsx_runtime_1.jsxs)("span", { "aria-label": `${(changePct ?? 0) >= 0 ? 'up' : 'down'} ${(0, format_1.formatPct)(Math.abs(changePct ?? 0))}`, className: (0, cn_1.cn)('rounded-[var(--xen-radius-full)] px-[var(--xen-space-xs)] py-0.5 text-xs font-bold tabular-nums', PILL_BG[toneKey], (0, format_1.changeToneClass)(toneKey)), children: [(0, format_1.changeGlyph)(changePct ?? 0), " ", (0, format_1.formatPct)(changePct ?? 0)] })) : null] })] }));
});
//# sourceMappingURL=TokenRowV2.js.map