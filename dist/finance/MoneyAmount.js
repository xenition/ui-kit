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
exports.MoneyAmount = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const money_1 = require("../commerce/money");
const SIZE_CLASS = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-3xl',
};
function toneClass(tone, cents) {
    switch (tone) {
        case 'income':
            return 'text-success';
        case 'expense':
            return 'text-danger';
        case 'neutral':
            return 'text-on-surface';
        case 'muted':
            return 'text-muted';
        case 'auto':
        default:
            if (cents > 0)
                return 'text-success';
            if (cents < 0)
                return 'text-danger';
            return 'text-on-surface';
    }
}
/**
 * The finance module's canonical money display: a single signed, token-toned
 * `<span>`. Amounts are integer cents so the printed value never drifts —
 * `formatMoney` renders exactly two decimals via `Intl.NumberFormat`, and the
 * magnitude is formatted from `Math.abs(cents)` with the sign applied
 * separately. Color traces to a `text-*` token class (income = `text-success`,
 * expense = `text-danger`) — never a literal. Every other finance component
 * funnels its amounts through here. Web parity of the native `MoneyAmount`.
 */
exports.MoneyAmount = React.forwardRef(function MoneyAmount({ cents, currency = 'USD', tone = 'auto', size = 'md', signDisplay = 'auto', formatMoney: format = money_1.formatMoney, className, 'aria-label': ariaLabel, ...rest }, ref) {
    const safeCents = Number.isFinite(cents) ? Math.trunc(cents) : 0;
    const magnitude = format(Math.abs(safeCents), currency);
    let sign = '';
    if (safeCents < 0)
        sign = signDisplay === 'never' ? '' : '−'; // minus sign
    else if (safeCents > 0 && signDisplay === 'always')
        sign = '+';
    const text = `${sign}${magnitude}`;
    return ((0, jsx_runtime_1.jsx)("span", { ref: ref, "aria-label": ariaLabel ??
            `${safeCents < 0 ? 'debit' : safeCents > 0 ? 'credit' : ''} ${magnitude}`.trim(), className: (0, cn_1.cn)('font-bold tabular-nums', toneClass(tone, safeCents), SIZE_CLASS[size], className), ...rest, children: text }));
});
//# sourceMappingURL=MoneyAmount.js.map