/** @jest-environment jsdom */
/**
 * Web email module: render smoke for the composed blocks, token-purity (class
 * strings bind to `--xen-*` tokens — no hex literals in inline styles), and the
 * behavioral contracts (open a message, star from a row, star inside a thread,
 * compose send blocking + assembly, folder selection, the empty inbox state).
 */
import { fireEvent, render } from '@testing-library/react';
import {
  MessageListRow,
  EmailThread,
  ComposeBar,
  FolderRow,
  MailLabelChip,
  AttachmentChip,
  StarButton,
  InboxHeader,
  MailSwipeActions,
  ReadUnreadToggle,
  SnoozeRow,
  SignatureBlock,
  type ThreadMessage,
} from './index';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

describe('MessageListRow (web)', () => {
  it('opens the message, announces the unread state, and stays token-pure', () => {
    const onClick = jest.fn();
    const { getByLabelText, container } = render(
      <MessageListRow
        sender="Ada Lovelace"
        subject="Analytical Engine notes"
        preview="Attached the latest diagrams"
        timestamp="09:41"
        unread
        hasAttachments
        labels={[{ id: 'w', label: 'Work', tone: 'primary' }]}
        onClick={onClick}
      />
    );
    const row = getByLabelText(/Unread, from Ada Lovelace/);
    expect(row.getAttribute('role')).toBe('button');
    expect(row.className).toContain('bg-surface');
    fireEvent.click(row);
    expect(onClick).toHaveBeenCalledTimes(1);
    // Work label chip is a token-bound soft-primary pill.
    expect(container.querySelector('.bg-primary-50')).not.toBeNull();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('stars a message from the row without opening it', () => {
    const onClick = jest.fn();
    const onToggleStar = jest.fn();
    const { getByLabelText } = render(
      <MessageListRow
        sender="Alan"
        subject="Hi"
        starred={false}
        onClick={onClick}
        onToggleStar={onToggleStar}
      />
    );
    const star = getByLabelText('Not starred');
    expect(star.tagName).toBe('BUTTON');
    fireEvent.click(star);
    expect(onToggleStar).toHaveBeenCalledWith(true);
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('EmailThread (web)', () => {
  const MESSAGES: ThreadMessage[] = [
    { id: 'm1', sender: 'Ada', body: 'First message', timestamp: '09:00' },
    {
      id: 'm2',
      sender: 'Alan',
      body: 'Reply with the attachment',
      timestamp: '09:41',
      starred: false,
      attachments: [{ id: 'a1', name: 'notes.pdf', kind: 'pdf', size: '2 MB' }],
    },
  ];

  it('renders the empty inbox / thread state', () => {
    const { getByText, container } = render(<EmailThread subject="Empty thread" messages={[]} />);
    expect(getByText('No messages')).toBeTruthy();
    expect(container.querySelector('[data-xen-empty-state]')).not.toBeNull();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('shows a loading spinner', () => {
    const { getByLabelText } = render(<EmailThread subject="Loading" loading />);
    expect(getByLabelText('Loading messages')).toBeTruthy();
  });

  it('expands a collapsed message and stars an expanded one', () => {
    const onToggleMessage = jest.fn();
    const onToggleStar = jest.fn();
    const { getByLabelText, getAllByLabelText, getByText, container } = render(
      <EmailThread
        subject="Analytical Engine"
        messages={MESSAGES}
        labels={[{ id: 'w', label: 'Work', tone: 'primary' }]}
        expandedIds={['m2']}
        onToggleMessage={onToggleMessage}
        onToggleStar={onToggleStar}
      />
    );
    // m2 is expanded → its body + attachment show.
    expect(getByText('Reply with the attachment')).toBeTruthy();
    expect(getByText('notes.pdf')).toBeTruthy();
    fireEvent.click(getByLabelText('Expand message from Ada'));
    expect(onToggleMessage).toHaveBeenCalledWith('m1');
    // Each message row carries its own star; m2 is the second one.
    fireEvent.click(getAllByLabelText('Not starred')[1]!);
    expect(onToggleStar).toHaveBeenCalledWith('m2', true);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('ComposeBar (web)', () => {
  it('sends an assembled draft and blocks empty sends', () => {
    const onSend = jest.fn();
    const onChangeBody = jest.fn();
    const { getByLabelText, container } = render(
      <ComposeBar
        to="ada@x.dev"
        subject="Re: notes"
        body="Sounds good"
        onChangeBody={onChangeBody}
        onSend={onSend}
      />
    );
    fireEvent.change(getByLabelText('Message body'), { target: { value: 'Updated' } });
    expect(onChangeBody).toHaveBeenCalledWith('Updated');
    const send = getByLabelText('Send email') as HTMLButtonElement;
    expect(send.className).toContain('bg-primary');
    fireEvent.click(send);
    expect(onSend).toHaveBeenCalledWith({ to: 'ada@x.dev', subject: 'Re: notes', body: 'Sounds good' });
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });

  it('does not send when the body is empty and there are no attachments', () => {
    const onSend = jest.fn();
    const { getByLabelText } = render(<ComposeBar body="   " onSend={onSend} />);
    const send = getByLabelText('Send email') as HTMLButtonElement;
    expect(send.disabled).toBe(true);
    fireEvent.click(send);
    expect(onSend).not.toHaveBeenCalled();
  });
});

describe('FolderRow (web)', () => {
  it('reports selection, shows a count, and fires onClick', () => {
    const onClick = jest.fn();
    const { getByLabelText } = render(
      <FolderRow name="Inbox" glyph="📥" count={12} selected onClick={onClick} />
    );
    const btn = getByLabelText('Inbox, 12 unread');
    expect(btn.getAttribute('aria-current')).toBe('page');
    expect(btn.className).toContain('bg-primary-50');
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('StarButton + ReadUnreadToggle (web)', () => {
  it('toggles star and read state by action label', () => {
    const onToggleStar = jest.fn();
    const onToggleRead = jest.fn();
    const { getByLabelText } = render(
      <>
        <StarButton starred onToggle={onToggleStar} />
        <ReadUnreadToggle read={false} onToggle={onToggleRead} />
      </>
    );
    fireEvent.click(getByLabelText('Starred'));
    expect(onToggleStar).toHaveBeenCalledWith(false);
    fireEvent.click(getByLabelText('Mark as read'));
    expect(onToggleRead).toHaveBeenCalledWith(true);
  });
});

describe('email trimmings (web)', () => {
  it('renders header, chips, attachment, swipe actions, snooze, signature token-pure', () => {
    const onCompose = jest.fn();
    const onArchive = jest.fn();
    const onSnooze = jest.fn();
    const onRemoveAttachment = jest.fn();
    const { getByLabelText, getByText, container } = render(
      <>
        <InboxHeader
          title="Inbox"
          unreadCount={5}
          onBack={jest.fn()}
          actions={[{ id: 'compose', glyph: '✏️', label: 'Compose', onClick: onCompose }]}
        />
        <MailLabelChip label="Receipts" tone="success" onRemove={jest.fn()} />
        <AttachmentChip name="invoice.pdf" kind="pdf" size="1.2 MB" onRemove={onRemoveAttachment} />
        <MailSwipeActions
          actions={[{ id: 'archive', glyph: '🗄️', label: 'Archive', tone: 'primary', onClick: onArchive }]}
        />
        <SnoozeRow label="Tomorrow" when="8:00 AM" selected onClick={onSnooze} />
        <SignatureBlock
          name="Grace Hopper"
          title="Rear Admiral"
          company="USN"
          contacts={[{ id: 'e', glyph: '✉️', value: 'grace@navy.mil' }]}
        />
      </>
    );
    expect(getByText('Inbox')).toBeTruthy();
    expect(getByText('Receipts')).toBeTruthy();
    expect(getByText('grace@navy.mil')).toBeTruthy();
    fireEvent.click(getByLabelText('Compose'));
    fireEvent.click(getByLabelText('Archive'));
    fireEvent.click(getByLabelText('Remove invoice.pdf'));
    fireEvent.click(getByLabelText('Snooze Tomorrow, 8:00 AM'));
    expect(onCompose).toHaveBeenCalledTimes(1);
    expect(onArchive).toHaveBeenCalledTimes(1);
    expect(onRemoveAttachment).toHaveBeenCalledTimes(1);
    expect(onSnooze).toHaveBeenCalledTimes(1);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});
