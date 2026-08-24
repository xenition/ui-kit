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
exports.TransactionRowV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Icon_1 = require("../primitives/Icon");
const MoneyAmount_1 = require("./MoneyAmount");
const pressable_1 = require("./internal/pressable");
/** Token-bound fill for the leading status dot, per semantic slot. */
const DOT_BG = {
    onSurface: 'bg-on-surface',
    onPrimary: 'bg-primary',
    primary: 'bg-primary',
    muted: 'bg-muted',
    success: 'bg-success',
    onSuccess: 'bg-success',
    warn: 'bg-warn',
    onWarn: 'bg-warn',
    danger: 'bg-danger',
    onDanger: 'bg-danger',
};
/**
 * TransactionRow, redesigned (v3): a **minimal dense line**. A tiny colored
 * status dot (or the bare glyph) leads, the title and a middot-joined subtitle /
 * date share one flexible line, and the signed amount hugs the right edge. No
 * avatar disc, no card — tuned for long, scannable feeds. Distinct at a glance
 * from the base/v2. Same props, integer-cents money, token-pure.
 */
exports.TransactionRowV3 = React.forwardRef(function TransactionRowV3({ title, subtitle, amountCents, currency = 'USD', direction, date, icon, iconColor = 'primary', onClick, className, ...rest }, ref) {
    const signedCents = direction
        ? direction === 'expense'
            ? -Math.abs(amountCents)
            : Math.abs(amountCents)
        : amountCents;
    const meta = [subtitle, date].filter((s) => s != null).join(' · ');
    const interactive = (0, pressable_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": interactive ? title : undefined, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] py-[var(--xen-space-xs)]', interactive &&
            'cursor-pointer rounded-[var(--xen-radius-sm)] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none', className), ...interactive, ...rest, children: [icon != null ? ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: icon, color: iconColor, size: "sm" })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('h-1.5 w-1.5 shrink-0 rounded-[var(--xen-radius-full)]', DOT_BG[iconColor]) })), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: title }), meta !== '' ? (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-xs text-muted", children: meta }) : null] }), (0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: signedCents, currency: currency, tone: direction ?? 'auto', size: "sm", signDisplay: "always" })] }));
});
//# sourceMappingURL=TransactionRowV3.js.map