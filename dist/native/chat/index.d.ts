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
//# sourceMappingURL=index.d.ts.map