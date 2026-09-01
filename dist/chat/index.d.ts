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
export { ConversationList } from './ConversationList';
export type { ConversationListProps, ConversationListItem } from './ConversationList';
export { ConversationRow } from './ConversationRow';
export type { ConversationRowProps } from './ConversationRow';
export { ConversationRowV2 } from './ConversationRowV2';
export type { ConversationRowV2Props } from './ConversationRowV2';
export { ConversationRowV3 } from './ConversationRowV3';
export type { ConversationRowV3Props } from './ConversationRowV3';
export { ChatHeader } from './ChatHeader';
export type { ChatHeaderProps, ChatHeaderAction } from './ChatHeader';
export { ChatHeaderV2 } from './ChatHeaderV2';
export type { ChatHeaderV2Props } from './ChatHeaderV2';
export { ChatHeaderV3 } from './ChatHeaderV3';
export type { ChatHeaderV3Props } from './ChatHeaderV3';
export { MessageComposer } from './MessageComposer';
export type { MessageComposerProps } from './MessageComposer';
export { MessageComposerV2 } from './MessageComposerV2';
export type { MessageComposerV2Props } from './MessageComposerV2';
export { MessageComposerV3 } from './MessageComposerV3';
export type { MessageComposerV3Props } from './MessageComposerV3';
export { TypingIndicator } from './TypingIndicator';
export type { TypingIndicatorProps } from './TypingIndicator';
export { MessageGroup } from './MessageGroup';
export type { MessageGroupProps, GroupMessage } from './MessageGroup';
export { MessageGroupV2 } from './MessageGroupV2';
export type { MessageGroupV2Props } from './MessageGroupV2';
export { MessageGroupV3 } from './MessageGroupV3';
export type { MessageGroupV3Props } from './MessageGroupV3';
export { DateSeparator } from './DateSeparator';
export type { DateSeparatorProps } from './DateSeparator';
export { ReadReceipt } from './ReadReceipt';
export type { ReadReceiptProps, ReceiptStatus } from './ReadReceipt';
export { AttachmentBar } from './AttachmentBar';
export type { AttachmentBarProps, StagedAttachment, AttachmentKind } from './AttachmentBar';
export { VoiceNoteBubble } from './VoiceNoteBubble';
export type { VoiceNoteBubbleProps } from './VoiceNoteBubble';
export { QuickReplies } from './QuickReplies';
export type { QuickRepliesProps, QuickReply } from './QuickReplies';
export { UnreadDivider } from './UnreadDivider';
export type { UnreadDividerProps } from './UnreadDivider';
export { PresenceDot } from './PresenceDot';
export type { PresenceDotProps, Presence } from './PresenceDot';
export { AttachmentBarV4, type AttachmentBarV4Props } from './AttachmentBarV4';
export { ChatHeaderV4, type ChatHeaderV4Props } from './ChatHeaderV4';
export { ConversationListV4, type ConversationListV4Props } from './ConversationListV4';
export { ConversationRowV4, type ConversationRowV4Props } from './ConversationRowV4';
export { DateSeparatorV4, type DateSeparatorV4Props } from './DateSeparatorV4';
export { MessageComposerV4, type MessageComposerV4Props } from './MessageComposerV4';
export { MessageGroupV4, type MessageGroupV4Props } from './MessageGroupV4';
export { PresenceDotV4, type PresenceDotV4Props } from './PresenceDotV4';
export { QuickRepliesV4, type QuickRepliesV4Props } from './QuickRepliesV4';
export { ReadReceiptV4, type ReadReceiptV4Props } from './ReadReceiptV4';
export { TypingIndicatorV4, type TypingIndicatorV4Props } from './TypingIndicatorV4';
export { UnreadDividerV4, type UnreadDividerV4Props } from './UnreadDividerV4';
export { VoiceNoteBubbleV4, type VoiceNoteBubbleV4Props } from './VoiceNoteBubbleV4';
//# sourceMappingURL=index.d.ts.map