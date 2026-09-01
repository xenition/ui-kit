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
exports.LobbyRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const IconV4_1 = require("../primitives/IconV4");
const ProgressV4_1 = require("../primitives/ProgressV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const arcade_v4_1 = require("./internal/arcade-v4");
/**
 * **V4 lobby row** — same props as {@link LobbyRow} plus `joinLabel`,
 * `fullLabel`, `inProgressLabel` and `formatSlots`.
 *
 * ## Four changes
 *
 * 1. **A room with no capacity stops claiming to be full.** The base computed
 *    `clamp(players, 0, cap || players)` and printed `` `${filled}/${cap || players}` ``,
 *    so a lobby with `capacity: 0` rendered **5/5** and a red "full" badge —
 *    while `isFull` required `cap > 0`, so `joinable` stayed true and the
 *    button beside the badge still said **Join**. The badge and the button
 *    were reading the same zero and disagreeing about it. `slotParts()` reads
 *    it once, for both twins, and answers what it actually means: no capacity
 *    is an *unknown* room, not a full one.
 * 2. **The slot meter is a meter.** It was a strip of `aria-hidden`-by-omission
 *    pips inside a role-less `<div>` that carried an `aria-label` — which ARIA
 *    forbids on a generic element, so the browser discarded it and the
 *    occupancy was drawn for sighted users and for nobody else. It is a real
 *    `progressbar` with a value now, and its caption is `formatSlots`.
 * 3. **A full room is not an error.** The badge was `danger`. Capacity is a
 *    fact about a room, not a fault in it, and painting it red leaves the
 *    status colours meaning nothing when a queue genuinely fails. It is a
 *    neutral chip, and the reason a room cannot be joined is a **word** on the
 *    button — `fullLabel` or `inProgressLabel` — not a colour.
 * 4. **The row has one name**, built with `spokenLine()`, on a `group` rather
 *    than scattered across four unlabelled stops; and it borrows the shared
 *    row family's text and trailing columns so a lobby list lines up with
 *    every other list in the kit.
 */
exports.LobbyRowV4 = React.forwardRef(function LobbyRowV4({ lobby, variant = 'default', joining = false, onJoin, joinLabel = 'Join', fullLabel = 'Full', inProgressLabel = 'In progress', formatSlots, className, }, ref) {
    if (!lobby?.name)
        return null;
    const compact = variant === 'compact';
    const slots = (0, arcade_v4_1.slotParts)(lobby.players, lobby.capacity);
    const known = slots.capacity > 0;
    const joinable = slots.joinable && !lobby.inProgress;
    const actionWord = lobby.inProgress ? inProgressLabel : slots.full ? fullLabel : joinLabel;
    const slotText = known
        ? (formatSlots ?? ((filled, capacity) => `${filled} / ${capacity} players`))(slots.filled, slots.capacity)
        : undefined;
    const countText = known ? `${slots.filled}/${slots.capacity}` : String(slots.filled);
    const subline = (0, tone_v4_1.metaLine)([
        lobby.host ? `Host ${lobby.host}` : undefined,
        compact ? undefined : lobby.mode,
    ]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": (0, arcade_v4_1.spokenLine)([
            lobby.name,
            lobby.locked ? 'Locked' : undefined,
            lobby.host ? `Host ${lobby.host}` : undefined,
            lobby.mode,
            slotText,
            lobby.inProgress ? inProgressLabel : slots.full ? fullLabel : undefined,
        ]), className: (0, cn_1.cn)('flex flex-col rounded-[var(--xen-radius-lg)] border border-border', 'bg-card p-lg text-on-card', compact ? 'gap-xs' : 'gap-sm', className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [lobby.locked ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83D\uDD12", size: "sm", color: "muted", "aria-hidden": "true" }) : null, (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 truncate text-base font-bold text-on-card", children: lobby.name })] }), subline ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: subline }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: row_v4_1.ROW_V4_TRAILING_CLASS, children: [(0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...arcade_v4_1.BADGE_V4, tone: arcade_v4_1.IDENTITY_TONE, className: arcade_v4_1.TABULAR_CLASS, children: countText }), onJoin ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: joinable ? 'primary' : 'secondary', size: "sm", disabled: !joinable || joining, "aria-busy": joining || undefined, onClick: () => onJoin(lobby), "aria-label": `${actionWord} ${lobby.name}`, children: actionWord })) : null] })] }), !compact && known && slotText ? ((0, jsx_runtime_1.jsx)(ProgressV4_1.ProgressV4, { value: slots.filled, max: slots.capacity, tone: "primary", size: "sm", "aria-label": slotText })) : null] }));
});
//# sourceMappingURL=LobbyRowV4.js.map