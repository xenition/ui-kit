/**
 * `@xenition/ui/native/chat` — composed messaging-app blocks for React Native.
 *
 * Mobile-first chrome for any chat / DM / support experience, built on the
 * primitive chat parts (`ChatBubble`, `MessageList`) plus `Avatar`/`Badge`/
 * `Icon`/`Spinner`/`StatusDot`. Nothing fetches — apps pass shaped data and
 * callbacks (`onPress`/`onSend`/`onChangeText`/…) — and everything is styled
 * from compiled theme tokens via `useXenitionTheme()`, so a seed change (dark
 * mode included) restyles the whole surface. No literal colors.
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
export { ChatHeader } from './ChatHeader';
export type { ChatHeaderProps, ChatHeaderAction } from './ChatHeader';
export { MessageComposer } from './MessageComposer';
export type { MessageComposerProps } from './MessageComposer';
export { ConversationRowV2 } from './ConversationRowV2';
export type { ConversationRowV2Props } from './ConversationRowV2';
export { ConversationRowV3 } from './ConversationRowV3';
export type { ConversationRowV3Props } from './ConversationRowV3';
export { ChatHeaderV2 } from './ChatHeaderV2';
export type { ChatHeaderV2Props } from './ChatHeaderV2';
export { ChatHeaderV3 } from './ChatHeaderV3';
export type { ChatHeaderV3Props } from './ChatHeaderV3';
export { MessageComposerV2 } from './MessageComposerV2';
export type { MessageComposerV2Props } from './MessageComposerV2';
export { MessageComposerV3 } from './MessageComposerV3';
export type { MessageComposerV3Props } from './MessageComposerV3';
export { MessageGroupV2 } from './MessageGroupV2';
export type { MessageGroupV2Props } from './MessageGroupV2';
export { MessageGroupV3 } from './MessageGroupV3';
export type { MessageGroupV3Props } from './MessageGroupV3';
export { TypingIndicator } from './TypingIndicator';
export type { TypingIndicatorProps } from './TypingIndicator';
export { MessageGroup } from './MessageGroup';
export type { MessageGroupProps, GroupMessage } from './MessageGroup';
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
export { AttachmentBarV4 } from './AttachmentBarV4';
export type { AttachmentBarV4Props } from './AttachmentBarV4';
export { ChatHeaderV4 } from './ChatHeaderV4';
export type { ChatHeaderV4Props } from './ChatHeaderV4';
export { ConversationListV4 } from './ConversationListV4';
export type { ConversationListV4Props } from './ConversationListV4';
export { ConversationRowV4 } from './ConversationRowV4';
export type { ConversationRowV4Props } from './ConversationRowV4';
export { DateSeparatorV4 } from './DateSeparatorV4';
export type { DateSeparatorV4Props } from './DateSeparatorV4';
export { MessageComposerV4 } from './MessageComposerV4';
export type { MessageComposerV4Props } from './MessageComposerV4';
export { MessageGroupV4 } from './MessageGroupV4';
export type { MessageGroupV4Props } from './MessageGroupV4';
export { PresenceDotV4 } from './PresenceDotV4';
export type { PresenceDotV4Props } from './PresenceDotV4';
export { QuickRepliesV4 } from './QuickRepliesV4';
export type { QuickRepliesV4Props } from './QuickRepliesV4';
export { ReadReceiptV4 } from './ReadReceiptV4';
export type { ReadReceiptV4Props } from './ReadReceiptV4';
export { TypingIndicatorV4 } from './TypingIndicatorV4';
export type { TypingIndicatorV4Props } from './TypingIndicatorV4';
export { UnreadDividerV4 } from './UnreadDividerV4';
export type { UnreadDividerV4Props } from './UnreadDividerV4';
export { VoiceNoteBubbleV4 } from './VoiceNoteBubbleV4';
export type { VoiceNoteBubbleV4Props } from './VoiceNoteBubbleV4';
//# sourceMappingURL=index.d.ts.map