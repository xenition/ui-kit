"use strict";
/**
 * `@xenition/ui/email` — composed email / inbox blocks for the web (React DOM).
 *
 * Web parity of `@xenition/ui/native/email`: the same component names and prop
 * contracts, mapped to the DOM (`onPress` → `onClick`, `Pressable` → real
 * `<button>` / keyboard-operable `role="button"`, RN styles → `--xen-*` token
 * classes). Built on the web primitives (`Avatar`, `Icon`, `Spinner`,
 * `Textarea`) plus `EmptyState` from `../commerce`, and a few module-local
 * parts. Nothing fetches — apps pass shaped data and callbacks
 * (`onClick`/`onSend`/`onToggle`/…). No literal colors.
 *
 * Build an inbox from `InboxHeader` + `MessageListRow` (with `MailSwipeActions`
 * behind each row and `FolderRow` in the drawer), open a conversation with
 * `EmailThread`, reply via `ComposeBar`, and dress items with `StarButton`,
 * `MailLabelChip`, `AttachmentChip`, `ReadUnreadToggle`, `SnoozeRow`, and
 * `SignatureBlock`.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarButtonV4 = exports.SnoozeRowV4 = exports.SignatureBlockV4 = exports.ReadUnreadToggleV4 = exports.MessageListRowV4 = exports.MailSwipeActionsV4 = exports.MailLabelChipV4 = exports.InboxHeaderV4 = exports.FolderRowV4 = exports.EmailThreadV4 = exports.ComposeBarV4 = exports.AttachmentChipV4 = exports.SignatureBlock = exports.SnoozeRow = exports.ReadUnreadToggle = exports.MailSwipeActions = exports.InboxHeader = exports.StarButton = exports.AttachmentChip = exports.MailLabelChip = exports.FolderRowV3 = exports.FolderRowV2 = exports.FolderRow = exports.ComposeBarV3 = exports.ComposeBarV2 = exports.ComposeBar = exports.EmailThreadV3 = exports.EmailThreadV2 = exports.EmailThread = exports.MessageListRowV3 = exports.MessageListRowV2 = exports.MessageListRow = void 0;
var MessageListRow_1 = require("./MessageListRow");
Object.defineProperty(exports, "MessageListRow", { enumerable: true, get: function () { return MessageListRow_1.MessageListRow; } });
var MessageListRowV2_1 = require("./MessageListRowV2");
Object.defineProperty(exports, "MessageListRowV2", { enumerable: true, get: function () { return MessageListRowV2_1.MessageListRowV2; } });
var MessageListRowV3_1 = require("./MessageListRowV3");
Object.defineProperty(exports, "MessageListRowV3", { enumerable: true, get: function () { return MessageListRowV3_1.MessageListRowV3; } });
var EmailThread_1 = require("./EmailThread");
Object.defineProperty(exports, "EmailThread", { enumerable: true, get: function () { return EmailThread_1.EmailThread; } });
var EmailThreadV2_1 = require("./EmailThreadV2");
Object.defineProperty(exports, "EmailThreadV2", { enumerable: true, get: function () { return EmailThreadV2_1.EmailThreadV2; } });
var EmailThreadV3_1 = require("./EmailThreadV3");
Object.defineProperty(exports, "EmailThreadV3", { enumerable: true, get: function () { return EmailThreadV3_1.EmailThreadV3; } });
var ComposeBar_1 = require("./ComposeBar");
Object.defineProperty(exports, "ComposeBar", { enumerable: true, get: function () { return ComposeBar_1.ComposeBar; } });
var ComposeBarV2_1 = require("./ComposeBarV2");
Object.defineProperty(exports, "ComposeBarV2", { enumerable: true, get: function () { return ComposeBarV2_1.ComposeBarV2; } });
var ComposeBarV3_1 = require("./ComposeBarV3");
Object.defineProperty(exports, "ComposeBarV3", { enumerable: true, get: function () { return ComposeBarV3_1.ComposeBarV3; } });
var FolderRow_1 = require("./FolderRow");
Object.defineProperty(exports, "FolderRow", { enumerable: true, get: function () { return FolderRow_1.FolderRow; } });
var FolderRowV2_1 = require("./FolderRowV2");
Object.defineProperty(exports, "FolderRowV2", { enumerable: true, get: function () { return FolderRowV2_1.FolderRowV2; } });
var FolderRowV3_1 = require("./FolderRowV3");
Object.defineProperty(exports, "FolderRowV3", { enumerable: true, get: function () { return FolderRowV3_1.FolderRowV3; } });
var MailLabelChip_1 = require("./MailLabelChip");
Object.defineProperty(exports, "MailLabelChip", { enumerable: true, get: function () { return MailLabelChip_1.MailLabelChip; } });
var AttachmentChip_1 = require("./AttachmentChip");
Object.defineProperty(exports, "AttachmentChip", { enumerable: true, get: function () { return AttachmentChip_1.AttachmentChip; } });
var StarButton_1 = require("./StarButton");
Object.defineProperty(exports, "StarButton", { enumerable: true, get: function () { return StarButton_1.StarButton; } });
var InboxHeader_1 = require("./InboxHeader");
Object.defineProperty(exports, "InboxHeader", { enumerable: true, get: function () { return InboxHeader_1.InboxHeader; } });
var MailSwipeActions_1 = require("./MailSwipeActions");
Object.defineProperty(exports, "MailSwipeActions", { enumerable: true, get: function () { return MailSwipeActions_1.MailSwipeActions; } });
var ReadUnreadToggle_1 = require("./ReadUnreadToggle");
Object.defineProperty(exports, "ReadUnreadToggle", { enumerable: true, get: function () { return ReadUnreadToggle_1.ReadUnreadToggle; } });
var SnoozeRow_1 = require("./SnoozeRow");
Object.defineProperty(exports, "SnoozeRow", { enumerable: true, get: function () { return SnoozeRow_1.SnoozeRow; } });
var SignatureBlock_1 = require("./SignatureBlock");
Object.defineProperty(exports, "SignatureBlock", { enumerable: true, get: function () { return SignatureBlock_1.SignatureBlock; } });
var AttachmentChipV4_1 = require("./AttachmentChipV4");
Object.defineProperty(exports, "AttachmentChipV4", { enumerable: true, get: function () { return AttachmentChipV4_1.AttachmentChipV4; } });
var ComposeBarV4_1 = require("./ComposeBarV4");
Object.defineProperty(exports, "ComposeBarV4", { enumerable: true, get: function () { return ComposeBarV4_1.ComposeBarV4; } });
var EmailThreadV4_1 = require("./EmailThreadV4");
Object.defineProperty(exports, "EmailThreadV4", { enumerable: true, get: function () { return EmailThreadV4_1.EmailThreadV4; } });
var FolderRowV4_1 = require("./FolderRowV4");
Object.defineProperty(exports, "FolderRowV4", { enumerable: true, get: function () { return FolderRowV4_1.FolderRowV4; } });
var InboxHeaderV4_1 = require("./InboxHeaderV4");
Object.defineProperty(exports, "InboxHeaderV4", { enumerable: true, get: function () { return InboxHeaderV4_1.InboxHeaderV4; } });
var MailLabelChipV4_1 = require("./MailLabelChipV4");
Object.defineProperty(exports, "MailLabelChipV4", { enumerable: true, get: function () { return MailLabelChipV4_1.MailLabelChipV4; } });
var MailSwipeActionsV4_1 = require("./MailSwipeActionsV4");
Object.defineProperty(exports, "MailSwipeActionsV4", { enumerable: true, get: function () { return MailSwipeActionsV4_1.MailSwipeActionsV4; } });
var MessageListRowV4_1 = require("./MessageListRowV4");
Object.defineProperty(exports, "MessageListRowV4", { enumerable: true, get: function () { return MessageListRowV4_1.MessageListRowV4; } });
var ReadUnreadToggleV4_1 = require("./ReadUnreadToggleV4");
Object.defineProperty(exports, "ReadUnreadToggleV4", { enumerable: true, get: function () { return ReadUnreadToggleV4_1.ReadUnreadToggleV4; } });
var SignatureBlockV4_1 = require("./SignatureBlockV4");
Object.defineProperty(exports, "SignatureBlockV4", { enumerable: true, get: function () { return SignatureBlockV4_1.SignatureBlockV4; } });
var SnoozeRowV4_1 = require("./SnoozeRowV4");
Object.defineProperty(exports, "SnoozeRowV4", { enumerable: true, get: function () { return SnoozeRowV4_1.SnoozeRowV4; } });
var StarButtonV4_1 = require("./StarButtonV4");
Object.defineProperty(exports, "StarButtonV4", { enumerable: true, get: function () { return StarButtonV4_1.StarButtonV4; } });
//# sourceMappingURL=index.js.map