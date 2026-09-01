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
exports.TechnicianCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const job_v4_1 = require("./internal/job-v4");
/**
 * Availability → word, glyph, tone and the **`Avatar` presence value**.
 *
 * `presence` is an {@link AvatarStatus} and is handed to `AvatarV4` rather than
 * being painted from a second table. The base kept its own map, in which
 * `busy` was `bg-primary` — blue — while `Avatar`'s own `busy` is red, so the
 * same technician had two different dots depending on which component drew
 * them.
 */
const TECH_STATUS_V4 = {
    available: { label: 'Available', glyph: '✓', tone: 'success', presence: 'online' },
    'on-job': { label: 'On job', glyph: '⟳', tone: 'primary', presence: 'busy' },
    'en-route': { label: 'En route', glyph: '→', tone: 'primary', presence: 'away' },
    offline: { label: 'Offline', glyph: '○', tone: 'neutral', presence: 'offline' },
};
/**
 * **V4 technician card** — the web twin of the native `TechnicianCardV4`, same
 * props as {@link TechnicianCard} plus `callLabel`, `assignLabel` and
 * `formatPhone`.
 *
 * ## Five changes
 *
 * 1. **The `phone` it accepts is the phone it shows.** The number was used
 *    only as a boolean gate: it was never rendered, and a dispatcher who wired
 *    `onCall` without one silently got no Call button at all. It is now a meta
 *    line through `formatPhone`, and Call is gated on `onCall` alone.
 * 2. **One presence palette.** See {@link TECH_STATUS_V4} — the dot is
 *    `Avatar`'s `status`, which is also the only way it stays in step when the
 *    avatar's own dot moves.
 * 3. **The dot is not a second reader stop.** It carried `role="img"` and the
 *    status label, so the availability was announced from the dot and then
 *    again from the pill beside the name.
 * 4. **Skills are a neutral chip.** They were `text-primary` — a *fill* token
 *    used as ink, with no contrast promise — on a brand wash, which also spent
 *    the brand colour on a list of certifications.
 * 5. **Both actions clear 44** and take their labels from props.
 */
exports.TechnicianCardV4 = React.forwardRef(function TechnicianCardV4({ name, role, status, avatarUrl, skills, jobsToday, phone, onCall, onAssign, callLabel = 'Call', assignLabel = 'Assign', formatPhone = (value) => value, className, style, }, ref) {
    const sd = TECH_STATUS_V4[status] ?? TECH_STATUS_V4.offline;
    const skillList = Array.isArray(skills) ? skills : [];
    const showActions = onCall != null || onAssign != null;
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, className: className, style: style, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUrl, name: name, size: "lg", status: sd.presence }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate font-heading text-lg font-bold text-on-card", children: name }), role != null ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted-text", children: role })) : null, phone != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "truncate text-xs text-muted-text", children: ["\uD83D\uDCDE ", formatPhone(phone)] })) : null, jobsToday != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted-text", children: ["\uD83D\uDDD2 ", Math.max(0, Math.trunc(jobsToday)), " jobs today"] })) : null] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: sd.tone, ...job_v4_1.BADGE_V4, children: `${sd.glyph} ${sd.label}` })] }), skillList.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-md flex flex-wrap gap-xs", children: skillList.map((skill, i) => ((0, jsx_runtime_1.jsx)("span", { className: "rounded-[var(--xen-radius-full)] px-sm py-xs text-xs font-medium text-on-card", style: { background: (0, job_v4_1.discGround)('neutral') }, children: skill }, `${skill}-${i}`))) })) : null, showActions ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-md flex gap-sm", children: [onCall != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "outline", size: "md", onClick: onCall, className: "flex-1", children: callLabel })) : null, onAssign != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "md", onClick: onAssign, className: "flex-1", children: assignLabel })) : null] })) : null] }));
});
//# sourceMappingURL=TechnicianCardV4.js.map