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
exports.DriverCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const RatingV4_1 = require("../primitives/RatingV4");
const fleet_v4_1 = require("./internal/fleet-v4");
/**
 * **V4 driver card** — the web twin of the native `DriverCardV4`, same props
 * as {@link DriverCard} plus four copy hooks.
 *
 * ## Five changes
 *
 * 1. **The rating carries its number** — `RatingV4 showValue`. Five glyphs at
 *    `sm` is not a number.
 * 2. **Presence is a dot *and* a word.** `online` was a green circle and
 *    nothing else: invisible to a colour-blind user and to a screen reader.
 * 3. **An interactive card is a real `<button>`**, not a div with
 *    `role="button"` and a hand-written key handler.
 * 4. **The skeleton is opaque**, not a translucent wash that borrows whatever
 *    is behind it.
 * 5. **The message and call actions are named** — they were glyph-only
 *    buttons with no accessible name at all.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
exports.DriverCardV4 = React.forwardRef(function DriverCardV4({ name, avatarUrl, rating, tripCount, vehicle, plate, etaLabel, online, variant = 'default', messageLabel = 'Message driver', callLabel = 'Call driver', onlineLabel = 'Online', offlineLabel = 'Offline', formatTripCount, onMessage, onCall, onClick, loading = false, className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { ref: ref, className: (0, cn_1.cn)('flex gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-12 w-12 rounded-full', fleet_v4_1.SKELETON_CLASS) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-4 w-1/2', fleet_v4_1.SKELETON_CLASS) }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-3 w-2/3', fleet_v4_1.SKELETON_CLASS) })] })] }));
    }
    if (!name)
        return null;
    const compact = variant === 'compact';
    const trips = typeof tripCount === 'number'
        ? (formatTripCount ?? ((n) => `${n.toLocaleString()} trips`))(tripCount)
        : null;
    const caption = (0, fleet_v4_1.metaLine)([vehicle, plate, trips]);
    const presence = online == null ? null : online ? onlineLabel : offlineLabel;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { src: avatarUrl, name: name, size: compact ? 'sm' : 'md' }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate font-heading text-base font-bold text-on-card", children: name }), presence ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex shrink-0 items-center gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('h-2 w-2 rounded-full', online ? 'bg-success' : 'bg-muted') }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', online ? 'text-success-text' : 'text-muted-text'), children: presence })] })) : null] }), typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: rating, size: "sm", showValue: true }) : null, caption ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: caption }) : null] }), etaLabel ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "primary", variant: "soft", size: "sm", children: etaLabel })) : null] }), !compact && (onMessage || onCall) ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-md flex gap-sm", children: [onMessage ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "secondary", size: "sm", onClick: onMessage, "aria-label": messageLabel, className: "flex-1", children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "mail", size: "sm" }) })) : null, onCall ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "sm", onClick: onCall, "aria-label": callLabel, className: "flex-1", children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "phone", size: "sm" }) })) : null] })) : null] }));
    if (!onClick) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, "data-xen-driver-card": "", className: className, ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, "data-xen-driver-card": "", className: (0, cn_1.cn)('p-0', className), ...rest, children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, "aria-label": (0, fleet_v4_1.metaLine)([name, presence, caption, etaLabel]), "data-xen-v4-chrome": "on-surface", className: "flex w-full flex-col rounded-[var(--xen-radius-lg)] p-lg text-left", children: body }) }));
});
//# sourceMappingURL=DriverCardV4.js.map