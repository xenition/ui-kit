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
export { MessageListRow } from './MessageListRow';
export type { MessageListRowProps, MailLabelRef } from './MessageListRow';
export { EmailThread } from './EmailThread';
export type { EmailThreadProps, ThreadMessage, ThreadAttachment, ThreadLabelRef, } from './EmailThread';
export { ComposeBar } from './ComposeBar';
export type { ComposeBarProps, ComposeStagedAttachment } from './ComposeBar';
export { FolderRow } from './FolderRow';
export type { FolderRowProps } from './FolderRow';
export { MailLabelChip } from './MailLabelChip';
export type { MailLabelChipProps, MailLabelTone, MailLabelVariant } from './MailLabelChip';
export { AttachmentChip } from './AttachmentChip';
export type { AttachmentChipProps, AttachmentKind } from './AttachmentChip';
export { StarButton } from './StarButton';
export type { StarButtonProps } from './StarButton';
export { InboxHeader } from './InboxHeader';
export type { InboxHeaderProps, InboxHeaderAction } from './InboxHeader';
export { MailSwipeActions } from './MailSwipeActions';
export type { MailSwipeActionsProps, SwipeAction, SwipeActionTone } from './MailSwipeActions';
export { ReadUnreadToggle } from './ReadUnreadToggle';
export type { ReadUnreadToggleProps } from './ReadUnreadToggle';
export { SnoozeRow } from './SnoozeRow';
export type { SnoozeRowProps } from './SnoozeRow';
export { SignatureBlock } from './SignatureBlock';
export type { SignatureBlockProps, SignatureContactLine } from './SignatureBlock';
//# sourceMappingURL=index.d.ts.map