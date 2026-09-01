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
exports.ComplaintRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const civic_v4_1 = require("./internal/civic-v4");
/**
 * Status → word, glyph and tone.
 *
 * `open` and `assigned` are `neutral`, not `primary`: a request nobody has
 * looked at yet and one that has an owner are *stages*, and a brand-coloured
 * pill beside a green Resolved reads as a third verdict. The two states that
 * carry a real signal — in progress, resolved — keep theirs.
 */
const STATUS_V4 = {
    open: { label: 'Open', glyph: '🆕', tone: civic_v4_1.IDENTITY_TONE },
    assigned: { label: 'Assigned', glyph: '👤', tone: civic_v4_1.IDENTITY_TONE },
    'in-progress': { label: 'In progress', glyph: '🔧', tone: 'warn' },
    resolved: { label: 'Resolved', glyph: '✓', tone: 'success' },
    closed: { label: 'Closed', glyph: '✕', tone: 'neutral' },
};
const PRIORITY_V4 = {
    low: { label: 'Low', glyph: '↓', tone: 'neutral' },
    normal: { label: 'Normal', glyph: '•', tone: 'neutral' },
    high: { label: 'High', glyph: '↑', tone: 'warn' },
    urgent: { label: 'Urgent', glyph: '!', tone: 'danger' },
};
/**
 * **V4 complaint row** — the web twin of the native `ComplaintRowV4`, same
 * props as {@link ComplaintRow} plus `priorityLabels` and `statusLabels`.
 *
 * ## Five changes
 *
 * 1. **"Urgent" reaches a reader.** Priority is the module's only triage
 *    escalation, and the row's fixed
 *    `` `Request ${n}, ${title}, ${status}` `` name omitted it — so an urgent
 *    pothole and a routine one announced identically. Priority, category and
 *    the filing date all join the name.
 * 2. **An interactive row is a real `<button>`** rather than a `div` with
 *    `role="button"` and a hand-written Enter/Space handler — which also makes
 *    the two pills reachable, since `role="button"` renders its subtree
 *    presentational.
 * 3. **The ticket number is labelled.** A reader heard "311-88214" with no idea
 *    what it identified, and the category was glued on with a bare `·` span.
 * 4. **Open and Assigned stop wearing the brand colour.** They are stages, not
 *    outcomes; identity gets the neutral chip so `resolved` → success and
 *    `urgent` → danger stay the only coloured signals on the row.
 * 5. **It joins the shared row family** — one height, one 44 leading slot, one
 *    state layer. `hover:opacity-80` is M3's *disabled* band applied as press
 *    feedback, `ring-primary-300` is a ramp step that inverts in dark, and the
 *    leading disc drew its glyph in the `success` / `danger` **fill** on a tint
 *    of itself.
 */
exports.ComplaintRowV4 = React.forwardRef(function ComplaintRowV4({ ticketNumber, title, status, category, priority, date, onClick, priorityLabels, statusLabels, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    if (!title)
        return null;
    const sd = STATUS_V4[status] ?? STATUS_V4.open;
    const word = statusLabels?.[status] ?? sd.label;
    const pr = priority ? (PRIORITY_V4[priority] ?? PRIORITY_V4.normal) : undefined;
    const prWord = priority ? (priorityLabels?.[priority] ?? pr?.label) : undefined;
    // Low and Normal are the absence of an escalation; drawing them is noise.
    const showPriority = pr != null && (priority === 'high' || priority === 'urgent');
    const reference = (0, civic_v4_1.labelledId)('Request', ticketNumber);
    const caption = (0, tone_v4_1.metaLine)([reference, category]);
    const rowClass = (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(true));
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)(row_v4_1.ROW_V4_LEADING_CLASS, 'rounded-[var(--xen-radius-full)]'), style: { background: (0, civic_v4_1.tintGround)(sd.tone) }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: sd.glyph, className: (0, civic_v4_1.tintInkClass)(sd.tone) }) }), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-surface", children: title }), caption !== '' ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: caption }) : null, (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-wrap items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: sd.tone, ...civic_v4_1.BADGE_V4, children: `${sd.glyph} ${word}` }), showPriority && prWord != null ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: pr.tone, ...civic_v4_1.BADGE_V4, children: `${pr.glyph} ${prWord}` })) : null] })] }), date != null ? ((0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: date }) })) : null] }));
    if (onClick == null) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)(rowClass, className), ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('w-full', className), ...rest, children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, "aria-label": (0, civic_v4_1.spokenLine)([
                title,
                reference,
                category,
                word,
                showPriority ? prWord : undefined,
                date,
            ]), "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: (0, cn_1.cn)(rowClass, 'rounded-[var(--xen-radius-md)]', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'), children: body }) }));
});
//# sourceMappingURL=ComplaintRowV4.js.map