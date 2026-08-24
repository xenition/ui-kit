"use strict";
/**
 * `@xenition/ui/chat` — composed messaging-app blocks for the web (React DOM).
 *
 * Web parity of `@xenition/ui/native/chat`: chrome for any chat / DM / support
 * experience, built on the primitive chat parts (`ChatBubble`, `MessageList`)
 * plus `Avatar`/`Badge`/`Icon`/`Spinner`/`StatusDot`. Nothing fetches — apps
 * pass shaped data and callbacks (`onClick`/`onSend`/`onChangeText`/…) — and
 * everything is styled from the `--xen-*` theme tokens via Tailwind token
 * classes, so a seed change (dark mode included) restyles the whole surface.
 * No literal colors.
 *
 * Compose an inbox from `ConversationList` + `ConversationRow`, a thread from
 * `ChatHeader` + `MessageList`/`MessageGroup` + `MessageComposer`, and dress it
 * with `TypingIndicator`, `DateSeparator`, `UnreadDivider`, `ReadReceipt`,
 * `QuickReplies`, `AttachmentBar`, `VoiceNoteBubble`, and `PresenceDot`.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresenceDot = exports.UnreadDivider = exports.QuickReplies = exports.VoiceNoteBubble = exports.AttachmentBar = exports.ReadReceipt = exports.DateSeparator = exports.MessageGroup = exports.TypingIndicator = exports.MessageComposer = exports.ChatHeader = exports.ConversationRow = exports.ConversationList = void 0;
var ConversationList_1 = require("./ConversationList");
Object.defineProperty(exports, "ConversationList", { enumerable: true, get: function () { return ConversationList_1.ConversationList; } });
var ConversationRow_1 = require("./ConversationRow");
Object.defineProperty(exports, "ConversationRow", { enumerable: true, get: function () { return ConversationRow_1.ConversationRow; } });
var ChatHeader_1 = require("./ChatHeader");
Object.defineProperty(exports, "ChatHeader", { enumerable: true, get: function () { return ChatHeader_1.ChatHeader; } });
var MessageComposer_1 = require("./MessageComposer");
Object.defineProperty(exports, "MessageComposer", { enumerable: true, get: function () { return MessageComposer_1.MessageComposer; } });
var TypingIndicator_1 = require("./TypingIndicator");
Object.defineProperty(exports, "TypingIndicator", { enumerable: true, get: function () { return TypingIndicator_1.TypingIndicator; } });
var MessageGroup_1 = require("./MessageGroup");
Object.defineProperty(exports, "MessageGroup", { enumerable: true, get: function () { return MessageGroup_1.MessageGroup; } });
var DateSeparator_1 = require("./DateSeparator");
Object.defineProperty(exports, "DateSeparator", { enumerable: true, get: function () { return DateSeparator_1.DateSeparator; } });
var ReadReceipt_1 = require("./ReadReceipt");
Object.defineProperty(exports, "ReadReceipt", { enumerable: true, get: function () { return ReadReceipt_1.ReadReceipt; } });
var AttachmentBar_1 = require("./AttachmentBar");
Object.defineProperty(exports, "AttachmentBar", { enumerable: true, get: function () { return AttachmentBar_1.AttachmentBar; } });
var VoiceNoteBubble_1 = require("./VoiceNoteBubble");
Object.defineProperty(exports, "VoiceNoteBubble", { enumerable: true, get: function () { return VoiceNoteBubble_1.VoiceNoteBubble; } });
var QuickReplies_1 = require("./QuickReplies");
Object.defineProperty(exports, "QuickReplies", { enumerable: true, get: function () { return QuickReplies_1.QuickReplies; } });
var UnreadDivider_1 = require("./UnreadDivider");
Object.defineProperty(exports, "UnreadDivider", { enumerable: true, get: function () { return UnreadDivider_1.UnreadDivider; } });
var PresenceDot_1 = require("./PresenceDot");
Object.defineProperty(exports, "PresenceDot", { enumerable: true, get: function () { return PresenceDot_1.PresenceDot; } });
//# sourceMappingURL=index.js.map