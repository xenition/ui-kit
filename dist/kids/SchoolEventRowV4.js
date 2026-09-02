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
exports.SchoolEventRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * Glyph, default word and chip tone per event type.
 *
 * The base spent three status colours on what an event *is*: `exam → danger`,
 * `holiday → success`, `deadline → warn`. A calendar item's type is identity —
 * it is the same category tomorrow as it is today — and an exam is not a system
 * failure. The mapping here keeps the two brand slots the base already used and
 * folds the three status tones onto them: `success → accent`, `danger →
 * primary`, `warn → neutral`. Every type still carries a glyph and a word, so
 * nothing about it was ever riding on colour anyway.
 */
const TYPE_META_V4 = {
    holiday: { glyph: '🏖️', label: 'Holiday', tone: 'accent' },
    exam: { glyph: '📝', label: 'Exam', tone: 'primary' },
    meeting: { glyph: '👥', label: 'Meeting', tone: 'primary' },
    trip: { glyph: '🚌', label: 'Trip', tone: 'accent' },
    activity: { glyph: '⚽', label: 'Activity', tone: 'primary' },
    deadline: { glyph: '⏳', label: 'Deadline', tone: 'neutral' },
    other: { glyph: '🏫', label: 'Event', tone: 'neutral' },
};
/**
 * **V4 school event row** — same props as {@link SchoolEventRow} plus
 * `typeLabels`.
 *
 * ## Six changes
 *
 * 1. **An exam is not an error and a holiday is not a success.** `exam →
 *    danger`, `holiday → success` and `deadline → warn` spent three status
 *    colours on an event's *type*, which is identity. See
 *    {@link TYPE_META_V4} for the mapping that replaced them.
 * 2. **`trip` is `accent` again**, matching the native twin. A comment in this
 *    file said the web `Badge` had no `accent` tone; it has had one for a
 *    while, and the note had flattened `trip` onto `primary` on web only.
 * 3. **The row's accessible name reached nobody.** It was an `aria-label` on a
 *    plain `div` for every non-interactive row, which browsers ignore — and it
 *    dropped the time, the location and the child's name, which is most of why
 *    the row exists. The full name now belongs to a real `<button>`.
 * 4. **`{...rest}` is spread first.** It was spread after `onClick`, so a
 *    caller passing any handler through silently replaced the row's own.
 * 5. **It joins the shared row family** — one height, one 44 leading slot, one
 *    state layer — so a school calendar and a conversation list are one
 *    product. Press is that state layer, not `hover:bg-neutral-50`, a
 *    light-scheme ramp step that paints a near-white slab on a dark page.
 * 6. **The type words are replaceable**, in a component that ships to every
 *    locale.
 */
exports.SchoolEventRowV4 = React.forwardRef(function SchoolEventRowV4({ title, type = 'other', date, time, location, childName, typeLabels, onClick, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
        (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    }, []);
    if (!title)
        return null;
    const meta = TYPE_META_V4[type];
    const typeWord = typeLabels?.[type] ?? meta.label;
    const caption = (0, tone_v4_1.captionLine)([date, time, location]);
    const label = (0, tone_v4_1.spokenLine)([typeWord, title, date, time, location, childName]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_LEADING_CLASS, 'text-xl leading-none'), "aria-hidden": "true", children: meta.glyph }), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-card", children: title }), caption ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: caption }) : null, childName ? ((0, jsx_runtime_1.jsxs)("span", { className: "truncate text-xs text-muted-text", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\uD83D\uDC76 " }), childName] })) : null] }), (0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: typeWord }) })] }));
    const shell = (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(caption !== '' || childName != null), (0, row_v4_1.rowGroundClass)(false), className);
    if (!onClick) {
        return ((0, jsx_runtime_1.jsx)("div", { ...rest, ref: ref, "data-xen-school-event-row": "", className: shell, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("button", { ...rest, ref: ref, type: "button", "data-xen-school-event-row": "", "aria-label": label, onClick: () => onClick(), "data-xen-v4-row": "", "data-interactive": "true", "data-xen-v4-state": "", style: (0, row_v4_1.rowStateVars)(), className: (0, cn_1.cn)(shell, tone_v4_1.FOCUS_RING_CLASS), children: body }));
});
//# sourceMappingURL=SchoolEventRowV4.js.map