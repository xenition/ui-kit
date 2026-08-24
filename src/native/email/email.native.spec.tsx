import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
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

const allowed = tokenHexSet(SEED_LIGHT);
const assertTokenPure = (root: Parameters<typeof renderedStyleHexes>[0]): void =>
  renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));

describe('MessageListRow (native)', () => {
  it('opens the message and announces the unread state (not color alone)', () => {
    const onPress = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <MessageListRow
        sender="Ada Lovelace"
        subject="Analytical Engine notes"
        preview="Attached the latest diagrams"
        timestamp="09:41"
        unread
        hasAttachments
        labels={[{ id: 'w', label: 'Work', tone: 'primary' }]}
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    const row = getByLabelText(/Unread, from Ada Lovelace/);
    expect(row).toBeTruthy();
    fireEvent.press(row);
    expect(onPress).toHaveBeenCalledTimes(1);
    assertTokenPure(root);
  });

  it('stars a message from the row', () => {
    const onToggleStar = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <MessageListRow sender="Alan" subject="Hi" starred={false} onToggleStar={onToggleStar} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Not starred'));
    expect(onToggleStar).toHaveBeenCalledWith(true);
    assertTokenPure(root);
  });
});

describe('EmailThread (native)', () => {
  const MESSAGES: ThreadMessage[] = [
    { id: 'm1', sender: 'Ada', body: 'First message', timestamp: '09:00' },
    {
      id: 'm2',
      sender: 'Alan',
      body: 'Reply with the attachment',
      timestamp: '09:41',
      attachments: [{ id: 'a1', name: 'notes.pdf', kind: 'pdf', size: '2 MB' }],
    },
  ];

  it('renders the empty inbox/thread state', () => {
    const { getByText, root } = renderThemed(
      <EmailThread subject="Empty thread" messages={[]} />,
      SEED_LIGHT
    );
    expect(getByText('No messages')).toBeTruthy();
    assertTokenPure(root);
  });

  it('shows a loading spinner', () => {
    const { getByLabelText } = renderThemed(
      <EmailThread subject="Loading" loading />,
      SEED_LIGHT
    );
    expect(getByLabelText('Loading messages')).toBeTruthy();
  });

  it('expands a collapsed message and stars it', () => {
    const onToggleMessage = jest.fn();
    const onToggleStar = jest.fn();
    const { getByLabelText, getByText, root } = renderThemed(
      <EmailThread
        subject="Analytical Engine"
        messages={MESSAGES}
        labels={[{ id: 'w', label: 'Work', tone: 'primary' }]}
        expandedIds={['m2']}
        onToggleMessage={onToggleMessage}
        onToggleStar={onToggleStar}
      />,
      SEED_LIGHT
    );
    // m2 is expanded → its body + attachment show.
    expect(getByText('Reply with the attachment')).toBeTruthy();
    expect(getByText('notes.pdf')).toBeTruthy();
    fireEvent.press(getByLabelText('Expand message from Ada'));
    expect(onToggleMessage).toHaveBeenCalledWith('m1');
    assertTokenPure(root);
  });
});

describe('ComposeBar (native)', () => {
  it('sends an assembled draft and blocks empty sends', () => {
    const onSend = jest.fn();
    const onChangeBody = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <ComposeBar to="ada@x.dev" subject="Re: notes" body="Sounds good" onChangeBody={onChangeBody} onSend={onSend} />,
      SEED_LIGHT
    );
    fireEvent.changeText(getByLabelText('Message body'), 'Updated');
    expect(onChangeBody).toHaveBeenCalledWith('Updated');
    fireEvent.press(getByLabelText('Send email'));
    expect(onSend).toHaveBeenCalledWith({ to: 'ada@x.dev', subject: 'Re: notes', body: 'Sounds good' });
    assertTokenPure(root);
  });

  it('does not send when the body is empty and there are no attachments', () => {
    const onSend = jest.fn();
    const { getByLabelText } = renderThemed(
      <ComposeBar body="   " onSend={onSend} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Send email'));
    expect(onSend).not.toHaveBeenCalled();
  });
});

describe('FolderRow (native)', () => {
  it('reports selection and shows a count', () => {
    const onPress = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <FolderRow name="Inbox" glyph="📥" count={12} selected onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Inbox, 12 unread'));
    expect(onPress).toHaveBeenCalledTimes(1);
    assertTokenPure(root);
  });
});

describe('StarButton + ReadUnreadToggle (native)', () => {
  it('toggles star and read state by action label', () => {
    const onToggleStar = jest.fn();
    const onToggleRead = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <>
        <StarButton starred onToggle={onToggleStar} />
        <ReadUnreadToggle read={false} onToggle={onToggleRead} />
      </>,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Starred'));
    expect(onToggleStar).toHaveBeenCalledWith(false);
    fireEvent.press(getByLabelText('Mark as read'));
    expect(onToggleRead).toHaveBeenCalledWith(true);
    assertTokenPure(root);
  });
});

describe('email trimmings (native)', () => {
  it('renders header, chips, attachment, swipe actions, snooze, signature token-pure', () => {
    const onCompose = jest.fn();
    const onArchive = jest.fn();
    const onSnooze = jest.fn();
    const onRemoveAttachment = jest.fn();
    const { getByLabelText, getByText, root } = renderThemed(
      <>
        <InboxHeader
          title="Inbox"
          unreadCount={5}
          onBack={jest.fn()}
          actions={[{ id: 'compose', glyph: '✏️', label: 'Compose', onPress: onCompose }]}
        />
        <MailLabelChip label="Receipts" tone="success" onRemove={jest.fn()} />
        <AttachmentChip name="invoice.pdf" kind="pdf" size="1.2 MB" onRemove={onRemoveAttachment} />
        <MailSwipeActions
          actions={[{ id: 'archive', glyph: '🗄️', label: 'Archive', tone: 'primary', onPress: onArchive }]}
        />
        <SnoozeRow label="Tomorrow" when="8:00 AM" selected onPress={onSnooze} />
        <SignatureBlock
          name="Grace Hopper"
          title="Rear Admiral"
          company="USN"
          contacts={[{ id: 'e', glyph: '✉️', value: 'grace@navy.mil' }]}
        />
      </>,
      SEED_LIGHT
    );
    expect(getByText('Inbox')).toBeTruthy();
    expect(getByText('Receipts')).toBeTruthy();
    fireEvent.press(getByLabelText('Compose'));
    fireEvent.press(getByLabelText('Archive'));
    fireEvent.press(getByLabelText('Remove invoice.pdf'));
    fireEvent.press(getByLabelText('Snooze Tomorrow, 8:00 AM'));
    expect(onCompose).toHaveBeenCalledTimes(1);
    expect(onArchive).toHaveBeenCalledTimes(1);
    expect(onRemoveAttachment).toHaveBeenCalledTimes(1);
    expect(onSnooze).toHaveBeenCalledTimes(1);
    assertTokenPure(root);
  });
});
