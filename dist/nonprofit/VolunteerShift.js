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
exports.VolunteerShift = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const Button_1 = require("../primitives/Button");
const internal_1 = require("./internal");
/**
 * Web parity of the native `VolunteerShift`: a volunteer-shift row — role,
 * date/time/location meta, a slots-filled meter, and a sign-up / cancel action.
 * Capacity fill is guarded against a zero capacity and clamped. Full shifts are
 * badged and the action is disabled; signed-up state is announced via
 * `aria-pressed` on the action button — not color alone. All colors come from
 * the `--xen-*` token classes — no literal colors.
 */
exports.VolunteerShift = React.forwardRef(function VolunteerShift({ role, date, time, location, filled = 0, capacity = 0, signedUp = false, onSignUp, onCancel, loading = false, className, ...rest }, ref) {
    const hasCapacity = capacity > 0;
    const isFull = hasCapacity && filled >= capacity && !signedUp;
    const pct = (0, internal_1.goalPct)(filled, capacity);
    const metaLine = [date, time].filter(Boolean).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm rounded-md border border-border bg-surface p-md', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: role }), signedUp ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "success", children: "Signed up" })) : isFull ? ((0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "danger", children: "Full" })) : null] }), metaLine ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDDD3\uFE0F", size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: metaLine })] })) : null, location ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCCD", size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: location })] })) : null, hasCapacity ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": capacity, "aria-valuenow": Math.min(filled, capacity), "aria-label": `${filled} of ${capacity} volunteers`, className: "h-1.5 w-full overflow-hidden rounded-full bg-border", children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', isFull ? 'bg-danger' : 'bg-primary'), style: { width: `${pct}%` } }) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `${filled} of ${capacity} spots filled` })] })) : null, signedUp ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "outline", "aria-pressed": true, disabled: loading, onClick: onCancel, children: "Cancel shift" })) : ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", "aria-pressed": false, disabled: isFull || loading, onClick: onSignUp, children: isFull ? 'Shift full' : 'Sign up' }))] }));
});
//# sourceMappingURL=VolunteerShift.js.map