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
exports.FamilyMemberRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const tone_v4_1 = require("./internal/tone-v4");
/**
 * Default word and chip tone per role.
 *
 * Every tone here is identity — the two brand slots and neutral. `caregiver`
 * was `success` on both twins, which said a paid carer is *good news* in the
 * same vocabulary the kit uses to say a payment cleared. A family role is who
 * somebody is.
 *
 * `child` and `sibling` are `accent` on both twins now; the web file had them
 * flattened onto `primary` by a comment claiming the web `Badge` has no
 * `accent` tone, which stopped being true some time ago.
 */
const ROLE_META_V4 = {
    parent: { label: 'Parent', tone: 'primary' },
    guardian: { label: 'Guardian', tone: 'primary' },
    child: { label: 'Child', tone: 'accent' },
    sibling: { label: 'Sibling', tone: 'accent' },
    grandparent: { label: 'Grandparent', tone: 'neutral' },
    caregiver: { label: 'Caregiver', tone: 'neutral' },
    other: { label: 'Family', tone: 'neutral' },
};
/**
 * **V4 family member row** — same props as {@link FamilyMemberRow} plus
 * `roleLabels`, `onlineLabel` and `offlineLabel`.
 *
 * ## Six changes
 *
 * 1. **A family role is not a status.** `caregiver → success` spent the kit's
 *    "this went well" colour on who somebody is. Every role now takes an
 *    identity tone — the two brand slots or neutral — and carries its word.
 * 2. **`child` and `sibling` are `accent` again**, matching the native twin.
 *    A comment in this file said the web `Badge` had no `accent` tone; it has
 *    had one for a while, and the note had quietly flattened two roles onto
 *    `primary` on one platform only.
 * 3. **The row's accessible name reached nobody.** It was an `aria-label` on a
 *    plain `div` for every non-interactive row, which browsers ignore. The
 *    name now belongs to a real `<button>`, and a static row is read from its
 *    visible text.
 * 4. **`{...rest}` is spread first.** It was spread after `onClick`, so a
 *    caller passing any handler through silently replaced the row's own.
 * 5. **It joins the shared row family** — one height, one 44 leading slot, one
 *    state layer — so a family roster, a settings list and a conversation list
 *    are visibly one product. Press is that state layer, not
 *    `hover:bg-neutral-50`, which paints a near-white slab on a dark page.
 * 6. **Presence is the avatar's own dot plus a word.** It was a hand-drawn
 *    `bg-neutral-300` circle — a ramp step that inverts under
 *    `[data-theme="dark"]` — beside text the row's name already carried.
 */
exports.FamilyMemberRowV4 = React.forwardRef(function FamilyMemberRowV4({ name, role = 'other', photoUrl, relationLabel, online, roleLabels, onlineLabel = 'Online', offlineLabel = 'Offline', onClick, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
        (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    }, []);
    if (!name)
        return null;
    const meta = ROLE_META_V4[role];
    const roleWord = roleLabels?.[role] ?? meta.label;
    const presence = online === undefined ? undefined : online ? onlineLabel : offlineLabel;
    const caption = (0, tone_v4_1.captionLine)([relationLabel, presence]);
    const label = (0, tone_v4_1.spokenLine)([name, roleWord, relationLabel, presence]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_LEADING_CLASS, children: (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: "md", src: photoUrl, name: name, alt: "", status: online === undefined ? undefined : online ? 'online' : 'offline' }) }), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-card", children: name }), caption ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: caption }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: meta.tone, variant: "soft", size: "sm", children: roleWord }) })] }));
    const shell = (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(caption !== ''), (0, row_v4_1.rowGroundClass)(false), className);
    if (!onClick) {
        return ((0, jsx_runtime_1.jsx)("div", { ...rest, ref: ref, "data-xen-family-member-row": "", className: shell, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("button", { ...rest, ref: ref, type: "button", "data-xen-family-member-row": "", "aria-label": label, onClick: () => onClick(), "data-xen-v4-row": "", "data-interactive": "true", "data-xen-v4-state": "", style: (0, row_v4_1.rowStateVars)(), className: (0, cn_1.cn)(shell, tone_v4_1.FOCUS_RING_CLASS), children: body }));
});
//# sourceMappingURL=FamilyMemberRowV4.js.map