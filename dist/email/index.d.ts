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
export { MessageListRow } from './MessageListRow';
export type { MessageListRowProps, MailLabelRef } from './MessageListRow';
export { MessageListRowV2 } from './MessageListRowV2';
export type { MessageListRowV2Props } from './MessageListRowV2';
export { MessageListRowV3 } from './MessageListRowV3';
export type { MessageListRowV3Props } from './MessageListRowV3';
export { EmailThread } from './EmailThread';
export type { EmailThreadProps, ThreadMessage, ThreadAttachment, ThreadLabelRef, } from './EmailThread';
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
export { AttachmentChipV4, type AttachmentChipV4Props } from './AttachmentChipV4';
export { ComposeBarV4, type ComposeBarV4Props } from './ComposeBarV4';
export { EmailThreadV4, type EmailThreadV4Props } from './EmailThreadV4';
export { FolderRowV4, type FolderRowV4Props } from './FolderRowV4';
export { InboxHeaderV4, type InboxHeaderV4Props } from './InboxHeaderV4';
export { MailLabelChipV4, type MailLabelChipV4Props } from './MailLabelChipV4';
export { MailSwipeActionsV4, type MailSwipeActionsV4Props } from './MailSwipeActionsV4';
export { MessageListRowV4, type MessageListRowV4Props } from './MessageListRowV4';
export { ReadUnreadToggleV4, type ReadUnreadToggleV4Props } from './ReadUnreadToggleV4';
export { SignatureBlockV4, type SignatureBlockV4Props } from './SignatureBlockV4';
export { SnoozeRowV4, type SnoozeRowV4Props } from './SnoozeRowV4';
export { StarButtonV4, type StarButtonV4Props } from './StarButtonV4';
//# sourceMappingURL=index.d.ts.map