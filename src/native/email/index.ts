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
export { MessageListRowV2 } from './MessageListRowV2';
export type { MessageListRowV2Props } from './MessageListRowV2';
export { MessageListRowV3 } from './MessageListRowV3';
export type { MessageListRowV3Props } from './MessageListRowV3';

export { EmailThread } from './EmailThread';
export type {
  EmailThreadProps,
  ThreadMessage,
  ThreadAttachment,
  ThreadLabelRef,
} from './EmailThread';
export { EmailThreadV2 } from './EmailThreadV2';
export type { EmailThreadV2Props } from './EmailThreadV2';
export { EmailThreadV3 } from './EmailThreadV3';
export type { EmailThreadV3Props } from './EmailThreadV3';

export { ComposeBar } from './ComposeBar';
export type { ComposeBarProps, ComposeStagedAttachment } from './ComposeBar';
export { ComposeBarV2 } from './ComposeBarV2';
export type { ComposeBarV2Props } from './ComposeBarV2';
export { ComposeBarV3 } from './ComposeBarV3';
export type { ComposeBarV3Props } from './ComposeBarV3';

export { FolderRow } from './FolderRow';
export type { FolderRowProps } from './FolderRow';
export { FolderRowV2 } from './FolderRowV2';
export type { FolderRowV2Props } from './FolderRowV2';
export { FolderRowV3 } from './FolderRowV3';
export type { FolderRowV3Props } from './FolderRowV3';

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

// ── The V4 line ────────────────────────────────────────────────────────
// The current design pattern, built against `CRYPTO-DATING-EMAIL-V4-BRIEF.md`.
// Each is a drop-in for its base — same props plus optional additions.
export { AttachmentChipV4 } from './AttachmentChipV4';
export type { AttachmentChipV4Props } from './AttachmentChipV4';
export { ComposeBarV4 } from './ComposeBarV4';
export type { ComposeBarV4Props } from './ComposeBarV4';
export { EmailThreadV4 } from './EmailThreadV4';
export type { EmailThreadV4Props } from './EmailThreadV4';
export { FolderRowV4 } from './FolderRowV4';
export type { FolderRowV4Props } from './FolderRowV4';
export { InboxHeaderV4 } from './InboxHeaderV4';
export type { InboxHeaderV4Props } from './InboxHeaderV4';
export { MailLabelChipV4 } from './MailLabelChipV4';
export type { MailLabelChipV4Props } from './MailLabelChipV4';
export { MailSwipeActionsV4 } from './MailSwipeActionsV4';
export type { MailSwipeActionsV4Props } from './MailSwipeActionsV4';
export { MessageListRowV4 } from './MessageListRowV4';
export type { MessageListRowV4Props } from './MessageListRowV4';
export { ReadUnreadToggleV4 } from './ReadUnreadToggleV4';
export type { ReadUnreadToggleV4Props } from './ReadUnreadToggleV4';
export { SignatureBlockV4 } from './SignatureBlockV4';
export type { SignatureBlockV4Props } from './SignatureBlockV4';
export { SnoozeRowV4 } from './SnoozeRowV4';
export type { SnoozeRowV4Props } from './SnoozeRowV4';
export { StarButtonV4 } from './StarButtonV4';
export type { StarButtonV4Props } from './StarButtonV4';
