"use strict";
/**
 * `@xenition/ui/native/email` — composed email / inbox blocks for React Native.
 *
 * Mobile-first chrome for any mail client, triage, or inbox experience, built
 * on the primitives (`Avatar`, `Icon`, `Spinner`, `EmptyState`) plus a few
 * module-local parts. Nothing fetches — apps pass shaped data and callbacks
 * (`onPress`/`onSend`/`onToggle`/…) — and everything is styled from compiled
 * theme tokens via `useXenitionTheme()`, so a seed change (dark mode included)
 * restyles the whole surface. No literal colors.
 *
 * Build an inbox from `InboxHeader` + `MessageListRow` (with `MailSwipeActions`
 * behind each row and `FolderRow` in the drawer), open a conversation with
 * `EmailThread`, reply via `ComposeBar`, and dress items with `StarButton`,
 * `MailLabelChip`, `AttachmentChip`, `ReadUnreadToggle`, `SnoozeRow`, and
 * `SignatureBlock`.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureBlock = exports.SnoozeRow = exports.ReadUnreadToggle = exports.MailSwipeActions = exports.InboxHeader = exports.StarButton = exports.AttachmentChip = exports.MailLabelChip = exports.FolderRow = exports.ComposeBar = exports.EmailThread = exports.MessageListRow = void 0;
var MessageListRow_1 = require("./MessageListRow");
Object.defineProperty(exports, "MessageListRow", { enumerable: true, get: function () { return MessageListRow_1.MessageListRow; } });
var EmailThread_1 = require("./EmailThread");
Object.defineProperty(exports, "EmailThread", { enumerable: true, get: function () { return EmailThread_1.EmailThread; } });
var ComposeBar_1 = require("./ComposeBar");
Object.defineProperty(exports, "ComposeBar", { enumerable: true, get: function () { return ComposeBar_1.ComposeBar; } });
var FolderRow_1 = require("./FolderRow");
Object.defineProperty(exports, "FolderRow", { enumerable: true, get: function () { return FolderRow_1.FolderRow; } });
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
//# sourceMappingURL=index.js.map