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
exports.VoiceNoteBubbleV4 = exports.UnreadDividerV4 = exports.TypingIndicatorV4 = exports.ReadReceiptV4 = exports.QuickRepliesV4 = exports.PresenceDotV4 = exports.MessageGroupV4 = exports.MessageComposerV4 = exports.DateSeparatorV4 = exports.ConversationRowV4 = exports.ConversationListV4 = exports.ChatHeaderV4 = exports.AttachmentBarV4 = exports.PresenceDot = exports.UnreadDivider = exports.QuickReplies = exports.VoiceNoteBubble = exports.AttachmentBar = exports.ReadReceipt = exports.DateSeparator = exports.MessageGroupV3 = exports.MessageGroupV2 = exports.MessageGroup = exports.TypingIndicator = exports.MessageComposerV3 = exports.MessageComposerV2 = exports.MessageComposer = exports.ChatHeaderV3 = exports.ChatHeaderV2 = exports.ChatHeader = exports.ConversationRowV3 = exports.ConversationRowV2 = exports.ConversationRow = exports.ConversationList = void 0;
var ConversationList_1 = require("./ConversationList");
Object.defineProperty(exports, "ConversationList", { enumerable: true, get: function () { return ConversationList_1.ConversationList; } });
var ConversationRow_1 = require("./ConversationRow");
Object.defineProperty(exports, "ConversationRow", { enumerable: true, get: function () { return ConversationRow_1.ConversationRow; } });
var ConversationRowV2_1 = require("./ConversationRowV2");
Object.defineProperty(exports, "ConversationRowV2", { enumerable: true, get: function () { return ConversationRowV2_1.ConversationRowV2; } });
var ConversationRowV3_1 = require("./ConversationRowV3");
Object.defineProperty(exports, "ConversationRowV3", { enumerable: true, get: function () { return ConversationRowV3_1.ConversationRowV3; } });
var ChatHeader_1 = require("./ChatHeader");
Object.defineProperty(exports, "ChatHeader", { enumerable: true, get: function () { return ChatHeader_1.ChatHeader; } });
var ChatHeaderV2_1 = require("./ChatHeaderV2");
Object.defineProperty(exports, "ChatHeaderV2", { enumerable: true, get: function () { return ChatHeaderV2_1.ChatHeaderV2; } });
var ChatHeaderV3_1 = require("./ChatHeaderV3");
Object.defineProperty(exports, "ChatHeaderV3", { enumerable: true, get: function () { return ChatHeaderV3_1.ChatHeaderV3; } });
var MessageComposer_1 = require("./MessageComposer");
Object.defineProperty(exports, "MessageComposer", { enumerable: true, get: function () { return MessageComposer_1.MessageComposer; } });
var MessageComposerV2_1 = require("./MessageComposerV2");
Object.defineProperty(exports, "MessageComposerV2", { enumerable: true, get: function () { return MessageComposerV2_1.MessageComposerV2; } });
var MessageComposerV3_1 = require("./MessageComposerV3");
Object.defineProperty(exports, "MessageComposerV3", { enumerable: true, get: function () { return MessageComposerV3_1.MessageComposerV3; } });
var TypingIndicator_1 = require("./TypingIndicator");
Object.defineProperty(exports, "TypingIndicator", { enumerable: true, get: function () { return TypingIndicator_1.TypingIndicator; } });
var MessageGroup_1 = require("./MessageGroup");
Object.defineProperty(exports, "MessageGroup", { enumerable: true, get: function () { return MessageGroup_1.MessageGroup; } });
var MessageGroupV2_1 = require("./MessageGroupV2");
Object.defineProperty(exports, "MessageGroupV2", { enumerable: true, get: function () { return MessageGroupV2_1.MessageGroupV2; } });
var MessageGroupV3_1 = require("./MessageGroupV3");
Object.defineProperty(exports, "MessageGroupV3", { enumerable: true, get: function () { return MessageGroupV3_1.MessageGroupV3; } });
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
var AttachmentBarV4_1 = require("./AttachmentBarV4");
Object.defineProperty(exports, "AttachmentBarV4", { enumerable: true, get: function () { return AttachmentBarV4_1.AttachmentBarV4; } });
var ChatHeaderV4_1 = require("./ChatHeaderV4");
Object.defineProperty(exports, "ChatHeaderV4", { enumerable: true, get: function () { return ChatHeaderV4_1.ChatHeaderV4; } });
var ConversationListV4_1 = require("./ConversationListV4");
Object.defineProperty(exports, "ConversationListV4", { enumerable: true, get: function () { return ConversationListV4_1.ConversationListV4; } });
var ConversationRowV4_1 = require("./ConversationRowV4");
Object.defineProperty(exports, "ConversationRowV4", { enumerable: true, get: function () { return ConversationRowV4_1.ConversationRowV4; } });
var DateSeparatorV4_1 = require("./DateSeparatorV4");
Object.defineProperty(exports, "DateSeparatorV4", { enumerable: true, get: function () { return DateSeparatorV4_1.DateSeparatorV4; } });
var MessageComposerV4_1 = require("./MessageComposerV4");
Object.defineProperty(exports, "MessageComposerV4", { enumerable: true, get: function () { return MessageComposerV4_1.MessageComposerV4; } });
var MessageGroupV4_1 = require("./MessageGroupV4");
Object.defineProperty(exports, "MessageGroupV4", { enumerable: true, get: function () { return MessageGroupV4_1.MessageGroupV4; } });
var PresenceDotV4_1 = require("./PresenceDotV4");
Object.defineProperty(exports, "PresenceDotV4", { enumerable: true, get: function () { return PresenceDotV4_1.PresenceDotV4; } });
var QuickRepliesV4_1 = require("./QuickRepliesV4");
Object.defineProperty(exports, "QuickRepliesV4", { enumerable: true, get: function () { return QuickRepliesV4_1.QuickRepliesV4; } });
var ReadReceiptV4_1 = require("./ReadReceiptV4");
Object.defineProperty(exports, "ReadReceiptV4", { enumerable: true, get: function () { return ReadReceiptV4_1.ReadReceiptV4; } });
var TypingIndicatorV4_1 = require("./TypingIndicatorV4");
Object.defineProperty(exports, "TypingIndicatorV4", { enumerable: true, get: function () { return TypingIndicatorV4_1.TypingIndicatorV4; } });
var UnreadDividerV4_1 = require("./UnreadDividerV4");
Object.defineProperty(exports, "UnreadDividerV4", { enumerable: true, get: function () { return UnreadDividerV4_1.UnreadDividerV4; } });
var VoiceNoteBubbleV4_1 = require("./VoiceNoteBubbleV4");
Object.defineProperty(exports, "VoiceNoteBubbleV4", { enumerable: true, get: function () { return VoiceNoteBubbleV4_1.VoiceNoteBubbleV4; } });
//# sourceMappingURL=index.js.map