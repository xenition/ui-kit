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
exports.ConversationRowV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const AvatarV4_1 = require("../primitives/AvatarV4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const PresenceDotV4_1 = require("./PresenceDotV4");
const thread_v4_1 = require("./internal/thread-v4");
/** Above this the badge reads `99+` — a four-digit count breaks the row. */
const UNREAD_CAP = 99;
/**
 * **V4 conversation row** — the web twin of the native `ConversationRowV4`,
 * same props as {@link ConversationRow} plus `typingLabel`, `mutedLabel`,
 * `formatUnread` and `last`.
 *
 * ## Five changes
 *
 * 1. **The whole row is one accessible name.** The base left name, preview,
 *    time, presence and unread count as five separate stops, so reaching a
 *    conversation meant five swipes and reassembling it by hand.
 * 2. **Muted is a glyph *and* a word.** It was a lowered opacity — which is
 *    also how the row would look disabled.
 * 3. **The unread count caps at 99+.** Four digits pushed the timestamp out.
 * 4. **It joins the shared row family** — one height, one 44 leading slot,
 *    one state layer, one separator, with `ListRow` and `NotificationItem`.
 * 5. **Presence carries its word into the row's name**, rather than being a
 *    coloured dot in the corner.
 */
exports.ConversationRowV4 = React.forwardRef(function ConversationRowV4({ name, lastMessage, timestamp, avatarUri, presence, unreadCount = 0, muted = false, typing = false, selected = false, onClick, typingLabel = 'Typing…', mutedLabel = 'Muted', formatUnread, last = false, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(row_v4_1.V4_STATE_STYLE_ID, row_v4_1.V4_STATE_CSS);
        (0, inject_1.injectStyleOnce)(row_v4_1.ROW_V4_STYLE_ID, row_v4_1.ROW_V4_CSS);
    }, []);
    if (!name)
        return null;
    const unread = Math.max(0, Math.floor(unreadCount));
    const unreadText = unread > UNREAD_CAP ? `${UNREAD_CAP}+` : String(unread);
    const preview = typing ? typingLabel : lastMessage;
    // One name, not five stops.
    const label = [
        name,
        presence ? thread_v4_1.PRESENCE_META[presence].label : undefined,
        preview,
        timestamp,
        unread > 0 ? (formatUnread ?? ((n) => `${n} unread`))(unread) : undefined,
        muted ? mutedLabel : undefined,
    ]
        .filter(Boolean)
        .join(', ');
    return ((0, jsx_runtime_1.jsxs)("button", { ref: ref, type: "button", "aria-label": label, "aria-current": selected ? 'true' : undefined, onClick: onClick, "data-xen-v4-row": "", "data-interactive": "true", "data-xen-v4-state": "", style: (0, row_v4_1.rowStateVars)(), className: (0, cn_1.cn)(row_v4_1.ROW_V4_BASE_CLASS, (0, row_v4_1.rowHeightClass)(true), (0, row_v4_1.rowGroundClass)(selected), !last && (0, row_v4_1.rowEdgeClass)(), className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: row_v4_1.ROW_V4_LEADING_CLASS, children: (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: "md", src: avatarUri, name: name, alt: "" }) }), (0, jsx_runtime_1.jsxs)("span", { className: row_v4_1.ROW_V4_TEXT_CLASS, children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-xs", children: [presence && (0, jsx_runtime_1.jsx)(PresenceDotV4_1.PresenceDotV4, { status: presence, scale: "sm" }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-card", children: name }), muted && (
                            // A glyph and a word: lowered opacity is also how a row looks
                            // disabled.
                            (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "text-xs text-muted-text", children: "\uD83D\uDD15" }))] }), preview != null && ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('truncate text-xs', unread > 0 ? 'font-semibold text-on-card' : 'text-muted-text'), children: preview }))] }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)(row_v4_1.ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs'), children: [timestamp != null && (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: timestamp }), unread > 0 && ((0, jsx_runtime_1.jsx)("span", { className: "inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-primary px-xs text-[10px] font-bold text-on-primary", children: unreadText }))] })] }));
});
//# sourceMappingURL=ConversationRowV4.js.map