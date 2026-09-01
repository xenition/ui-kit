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
exports.NetworkBadgeV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const tone_v4_1 = require("../primitives/internal/tone-v4");
/**
 * A tone's fill and its ink, as a pair.
 *
 * The five `on*` spellings resolve to the **fill they are paired with**, not to
 * themselves: `on-primary` is the ink the compiler guarantees *against*
 * `primary` and has no promise at all against the card this badge sits on, so
 * a dot painted `bg-on-primary` and a glyph inked `text-on-primary` were both
 * asking a slot to do the one job it was never measured for.
 */
const TONE_PAIR = {
    onSurface: { fill: 'bg-on-surface', ink: 'text-on-surface' },
    onPrimary: { fill: 'bg-primary', ink: 'text-primary-text' },
    primary: { fill: 'bg-primary', ink: 'text-primary-text' },
    muted: { fill: 'bg-muted', ink: 'text-muted-text' },
    success: { fill: 'bg-success', ink: 'text-success-text' },
    onSuccess: { fill: 'bg-success', ink: 'text-success-text' },
    warn: { fill: 'bg-warn', ink: 'text-warn-text' },
    onWarn: { fill: 'bg-warn', ink: 'text-warn-text' },
    danger: { fill: 'bg-danger', ink: 'text-danger-text' },
    onDanger: { fill: 'bg-danger', ink: 'text-danger-text' },
};
const STATUS_TONE = {
    connected: 'success',
    congested: 'warn',
    disconnected: 'danger',
};
const STATUS_LABEL = {
    connected: 'Connected',
    congested: 'Congested',
    disconnected: 'Offline',
};
/**
 * **V4 network badge** — the web twin of the native `NetworkBadgeV4`, same
 * props as {@link NetworkBadge} plus `statusLabels`, with `tone` narrowed to
 * the shared tone union.
 *
 * ## Four changes
 *
 * 1. **The status word carries its tone on both twins.** Native drew it
 *    `muted`, so the health signal — the entire reason `status` exists —
 *    lived in a 6px dot on the phone and in text only on the web.
 * 2. **The ink is ink.** `text-success` / `text-warn` / `text-danger` are fill
 *    slots; the word now takes the contrast-corrected `*Text` form, and the
 *    dots take the fills.
 * 3. **The pill is on the scale.** `px-2`, `py-0.5`, `gap-1`, `h-2 w-2` and
 *    `h-1.5 w-1.5` are five raw numbers, none of them a spacing token, so the
 *    badge did not resize with a denser or roomier seed.
 * 4. **The badge's own text is its name.** The base put `aria-label` on a
 *    plain `<span>` with no role, where support is inconsistent, and it
 *    duplicated the visible text word for word. Removing it lets the text
 *    speak and the decorative dots stay hidden.
 */
exports.NetworkBadgeV4 = React.forwardRef(function NetworkBadgeV4({ name, status, tone = 'primary', glyph, size = 'md', statusLabels, className, ...rest }, ref) {
    if (!name)
        return null;
    const small = size === 'sm';
    const textSize = small ? 'text-xs' : 'text-sm';
    const dot = small ? 'h-xs w-xs' : 'h-sm w-sm';
    const statusWord = status ? (statusLabels?.[status] ?? STATUS_LABEL[status]) : undefined;
    return ((0, jsx_runtime_1.jsxs)("span", { ref: ref, className: (0, cn_1.cn)('inline-flex items-center gap-xs self-start rounded-[var(--xen-radius-full)]', 'border border-border bg-card px-sm py-xs', className), ...rest, children: [glyph != null ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)(textSize, TONE_PAIR[tone].ink), children: glyph })) : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('inline-block rounded-[var(--xen-radius-full)]', dot, TONE_PAIR[tone].fill) })), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate font-semibold text-on-card', textSize), children: name }), status != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('inline-block rounded-[var(--xen-radius-full)]', dot, tone_v4_1.TONE_BG[STATUS_TONE[status]]) }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', tone_v4_1.TONE_INK[STATUS_TONE[status]]), children: statusWord })] })) : null] }));
});
//# sourceMappingURL=NetworkBadgeV4.js.map