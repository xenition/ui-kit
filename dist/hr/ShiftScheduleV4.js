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
exports.ShiftScheduleV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const StatusPillV4_1 = require("./StatusPillV4");
const tone_v4_1 = require("./internal/tone-v4");
const internal_1 = require("./internal");
/** The sentence under the empty title — the base's, kept as the default. */
const EMPTY_DESCRIPTION = 'Shifts you add will appear here.';
/**
 * Resolve a shift's status from **one** source.
 *
 * The base asked two questions and believed both answers: `SHIFT_STATUS_META[
 * shift.status ?? …]` for the pill and `!shift.assignee` for the tint and the
 * body text. So `{ status: 'confirmed', assignee: undefined }` — an ordinary
 * shape for a roster where the assignment failed — drew a row tinted as open,
 * the words "Unassigned", and a "✓ Confirmed" pill, all at once. A shift with
 * nobody on it **is** open, whatever the caller passed.
 */
function shiftStatus(shift) {
    const open = shift.assignee == null || shift.assignee === '';
    return { status: open ? 'open' : (shift.status ?? 'scheduled'), open };
}
/**
 * **V4 shift schedule** — the web twin of the native `ShiftScheduleV4`, same
 * props as {@link ShiftSchedule} plus `unassignedLabel`, `emptyDescription`
 * and `testID`.
 *
 * ## Five changes
 *
 * 1. **A row cannot be open and confirmed at once.** See {@link shiftStatus} —
 *    the tint, the body text and the pill now come from one derivation instead
 *    of two that disagreed.
 * 2. **A row's name carries who is on it and what state it is in.** `Shift
 *    09:00 to 17:00, Open` dropped the role, the location and the assignee, so
 *    a manager scanning a roster by ear could not tell two shifts apart.
 * 3. **The open-shift tint is the shared status ground.** Web used
 *    `bg-neutral-100` — a ramp step, which mirrors under `[data-theme="dark"]`
 *    and paints a near-white slab on a dark page — and native mixed its own
 *    tint, so an open shift was two different colours. Both are now the
 *    status's own tone at 10% over the card.
 * 4. **Press is a state layer**, not `hover:brightness-95`, which dims the
 *    row's own content the way M3 signals **disabled**.
 * 5. **The rows clear 44 and the empty state is the V4 one** — the base's
 *    `py-1.5` row was 30 tall on a roster whose rows are the only way to pick
 *    up a shift.
 */
exports.ShiftScheduleV4 = React.forwardRef(function ShiftScheduleV4({ shifts, dateLabel, variant = 'default', onSelectShift, emptyLabel = 'No shifts scheduled', unassignedLabel = 'Unassigned', emptyDescription = EMPTY_DESCRIPTION, testID, className, }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    }, []);
    const compact = variant === 'compact';
    const list = shifts?.filter((shift) => shift?.id != null) ?? [];
    if (list.length === 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-testid": testID, className: className, children: [dateLabel ? ((0, jsx_runtime_1.jsx)("p", { className: "mb-sm text-sm font-bold text-on-surface", children: dateLabel })) : null, (0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { title: emptyLabel, description: emptyDescription })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, "data-testid": testID, className: (0, cn_1.cn)('flex flex-col gap-sm', className), children: [dateLabel ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm font-bold text-on-card", children: dateLabel }) : null, (0, jsx_runtime_1.jsx)("ul", { "aria-label": dateLabel, className: "flex flex-col gap-xs", children: list.map((shift) => {
                    const { status, open } = shiftStatus(shift);
                    const meta = internal_1.SHIFT_STATUS_META[status];
                    const assignee = open ? unassignedLabel : shift.assignee;
                    const rowClass = (0, cn_1.cn)('flex w-full items-center gap-sm rounded-[var(--xen-radius-md)] px-sm text-left', tone_v4_1.MIN_TAP_CLASS);
                    // The status's own tone at 10% over the card — the same mix the
                    // native twin makes, so an open shift is one colour on two
                    // platforms. The state layer is mixed against that same ground, so
                    // a hovered open shift does not tint as though it were on the card.
                    const ground = open ? (0, tone_v4_1.toneGround)(meta.tone) : undefined;
                    const rowStyle = ground ? { background: ground } : undefined;
                    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "w-[calc(var(--xen-space-2xl)*2)] shrink-0", children: [(0, jsx_runtime_1.jsxs)("span", { className: "block text-sm font-semibold text-on-card", children: [shift.start, "\u2013", shift.end] }), shift.role ? ((0, jsx_runtime_1.jsx)("span", { className: "block truncate text-xs text-muted-text", children: shift.role })) : null] }), (0, jsx_runtime_1.jsxs)("span", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block truncate text-sm', open ? 'text-muted-text' : 'text-on-card'), children: assignee }), !compact && shift.location ? ((0, jsx_runtime_1.jsx)("span", { className: "block truncate text-xs text-muted-text", children: shift.location })) : null] })] }));
                    const spoken = (0, tone_v4_1.spokenLine)([
                        'Shift',
                        `${shift.start} to ${shift.end}`,
                        shift.role,
                        assignee,
                        shift.location,
                        meta.label,
                    ]);
                    return ((0, jsx_runtime_1.jsxs)("li", { className: "flex items-center gap-sm", style: rowStyle, children: [onSelectShift ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": spoken, onClick: () => onSelectShift(shift), "data-xen-v4-state": "", style: (0, tone_v4_1.cardStateVars)(ground), className: (0, cn_1.cn)(rowClass, tone_v4_1.FOCUS_RING_CLASS), children: inner })) : ((0, jsx_runtime_1.jsx)("div", { className: rowClass, children: inner })), (0, jsx_runtime_1.jsx)(StatusPillV4_1.StatusPillV4, { meta: meta, size: "sm", className: "mr-sm", "aria-hidden": onSelectShift ? true : undefined })] }, shift.id));
                }) })] }));
});
//# sourceMappingURL=ShiftScheduleV4.js.map