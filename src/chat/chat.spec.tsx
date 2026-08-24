/** @jest-environment jsdom */
import { render, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import {
  ConversationList,
  ConversationRow,
  ChatHeader,
  MessageComposer,
  MessageGroup,
  VoiceNoteBubble,
  QuickReplies,
  ReadReceipt,
  DateSeparator,
  UnreadDivider,
  TypingIndicator,
  PresenceDot,
  AttachmentBar,
  type ConversationListItem,
} from './index';

const ITEMS: ConversationListItem[] = [
  { id: 'a', name: 'Ada Lovelace', lastMessage: 'See you at 9', timestamp: '09:41', presence: 'online' },
  { id: 'b', name: 'Alan Turing', lastMessage: 'Decoded it', timestamp: 'Tue', unreadCount: 3 },
  { id: 'c', name: 'Grace Hopper', typing: true, muted: true, timestamp: 'Mon' },
];

describe('ConversationList', () => {
  it('renders the empty state when there are no conversations', () => {
    const { getByText, getByRole } = render(<ConversationList items={[]} />);
    expect(getByText('No conversations yet')).toBeTruthy();
    expect(getByRole('status')).toBeTruthy();
  });

  it('renders a loading spinner', () => {
    const { getByLabelText } = render(<ConversationList loading />);
    expect(getByLabelText('Loading conversations')).toBeTruthy();
  });

  it('renders rows from items and reports the clicked id', () => {
    const onPressItem = jest.fn();
    const { getByLabelText, getByRole } = render(
      <ConversationList items={ITEMS} onPressItem={onPressItem} />
    );
    fireEvent.click(getByLabelText(/Ada Lovelace/));
    expect(onPressItem).toHaveBeenCalledWith('a');
    // Rows are exposed under the list role and bound to the surface token.
    const list = getByRole('list');
    expect(list.className).toContain('bg-surface');
  });
});

describe('ConversationRow', () => {
  it('shows an unread badge, bolds the name, and forwards its ref', () => {
    const ref = createRef<HTMLButtonElement>();
    const onClick = jest.fn();
    const { getByText, getByLabelText } = render(
      <ConversationRow
        ref={ref}
        name="Alan Turing"
        lastMessage="Decoded it"
        unreadCount={3}
        onClick={onClick}
      />
    );
    expect(ref.current?.tagName).toBe('BUTTON');
    expect(getByText('3')).toBeTruthy();
    fireEvent.click(getByLabelText(/Alan Turing/));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders a typing state instead of the preview', () => {
    const { getByLabelText } = render(<ConversationRow name="Grace Hopper" typing muted />);
    expect(getByLabelText(/Grace Hopper, typing/)).toBeTruthy();
  });
});

describe('ChatHeader', () => {
  it('fires back and action callbacks and shows a typing caption', () => {
    const onBack = jest.fn();
    const onCall = jest.fn();
    const { getByLabelText, getByText } = render(
      <ChatHeader
        title="Ada Lovelace"
        presence="online"
        typing
        onBack={onBack}
        actions={[{ id: 'call', glyph: '📞', label: 'Call', onClick: onCall }]}
      />
    );
    expect(getByText('typing…')).toBeTruthy();
    fireEvent.click(getByLabelText('Back'));
    fireEvent.click(getByLabelText('Call'));
    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onCall).toHaveBeenCalledTimes(1);
  });
});

describe('MessageComposer', () => {
  it('sends the current draft and edits via onChangeText', () => {
    const onSend = jest.fn();
    const onChangeText = jest.fn();
    const { getByLabelText } = render(
      <MessageComposer value="Hello there" onChangeText={onChangeText} onSend={onSend} />
    );
    const input = getByLabelText('Message input');
    fireEvent.change(input, { target: { value: 'Hello!' } });
    expect(onChangeText).toHaveBeenCalledWith('Hello!');
    // Interaction: send message via the send button.
    fireEvent.click(getByLabelText('Send message'));
    expect(onSend).toHaveBeenCalledWith('Hello there');
  });

  it('sends on Enter (but not Shift+Enter)', () => {
    const onSend = jest.fn();
    const { getByLabelText } = render(<MessageComposer value="Hi" onSend={onSend} />);
    const input = getByLabelText('Message input');
    fireEvent.keyDown(input, { key: 'Enter', shiftKey: true });
    expect(onSend).not.toHaveBeenCalled();
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSend).toHaveBeenCalledWith('Hi');
  });

  it('disables send when the draft is empty with no attachments', () => {
    const onSend = jest.fn();
    const { getByLabelText } = render(<MessageComposer value="   " onSend={onSend} />);
    const send = getByLabelText('Send message') as HTMLButtonElement;
    expect(send.disabled).toBe(true);
    fireEvent.click(send);
    expect(onSend).not.toHaveBeenCalled();
  });
});

describe('MessageGroup', () => {
  it('renders stacked bubbles with an outgoing read receipt', () => {
    const { getByText, getByLabelText } = render(
      <MessageGroup
        side="me"
        receipt="read"
        messages={[
          { id: 'm1', text: 'On my way' },
          { id: 'm2', text: 'Two minutes', time: '09:41' },
        ]}
      />
    );
    expect(getByText('On my way')).toBeTruthy();
    expect(getByText('Two minutes')).toBeTruthy();
    expect(getByLabelText('Read')).toBeTruthy();
  });
});

describe('VoiceNoteBubble', () => {
  it('toggles playback', () => {
    const onPlayToggle = jest.fn();
    const { getByLabelText } = render(
      <VoiceNoteBubble side="them" durationSec={12} progress={0.5} onPlayToggle={onPlayToggle} />
    );
    fireEvent.click(getByLabelText('Play voice message'));
    expect(onPlayToggle).toHaveBeenCalledTimes(1);
  });
});

describe('QuickReplies', () => {
  it('reports the selected reply id', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <QuickReplies
        replies={[
          { id: 'r1', label: 'On my way' },
          { id: 'r2', label: 'Running late' },
        ]}
        onSelect={onSelect}
      />
    );
    fireEvent.click(getByText('Running late'));
    expect(onSelect).toHaveBeenCalledWith('r2');
  });

  it('renders nothing when there are no replies', () => {
    const { container } = render(<QuickReplies replies={[]} />);
    expect(container.firstChild).toBeNull();
  });
});

describe('chat trimmings', () => {
  it('renders receipts, separators, dividers, typing, presence, attachments with tokens', () => {
    const onRemove = jest.fn();
    const { getByText, getByLabelText } = render(
      <div>
        <ReadReceipt status="delivered" />
        <DateSeparator label="Today" />
        <UnreadDivider count={4} />
        <TypingIndicator name="Ada" />
        <PresenceDot status="busy" />
        <AttachmentBar
          attachments={[{ id: 'f1', name: 'report.pdf', kind: 'file' }]}
          onRemove={onRemove}
        />
      </div>
    );
    expect(getByText('Today')).toBeTruthy();
    expect(getByText('4 Unread messages')).toBeTruthy();
    expect(getByLabelText('Delivered')).toBeTruthy();
    // State is not color-alone — presence is exposed via an accessible label too.
    expect(getByLabelText('Busy')).toBeTruthy();
    // Token class assertion.
    expect(getByLabelText('Busy').querySelector('span')?.className).toContain('bg-danger');
    fireEvent.click(getByLabelText('Remove report.pdf'));
    expect(onRemove).toHaveBeenCalledWith('f1');
  });
});
