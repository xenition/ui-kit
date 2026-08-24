import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
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

const allowed = tokenHexSet(SEED_LIGHT);
const assertTokenPure = (root: Parameters<typeof renderedStyleHexes>[0]): void =>
  renderedStyleHexes(root).forEach((hex) => expect(allowed.has(hex)).toBe(true));

const ITEMS: ConversationListItem[] = [
  { id: 'a', name: 'Ada Lovelace', lastMessage: 'See you at 9', timestamp: '09:41', presence: 'online' },
  { id: 'b', name: 'Alan Turing', lastMessage: 'Decoded it', timestamp: 'Tue', unreadCount: 3 },
  { id: 'c', name: 'Grace Hopper', typing: true, muted: true, timestamp: 'Mon' },
];

describe('ConversationList (native)', () => {
  it('renders the empty state when there are no conversations', () => {
    const { getByText, root } = renderThemed(<ConversationList items={[]} />, SEED_LIGHT);
    expect(getByText('No conversations yet')).toBeTruthy();
    assertTokenPure(root);
  });

  it('renders a loading spinner', () => {
    const { getByLabelText } = renderThemed(<ConversationList loading />, SEED_LIGHT);
    expect(getByLabelText('Loading conversations')).toBeTruthy();
  });

  it('renders rows from items and reports the tapped id', () => {
    const onPressItem = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <ConversationList items={ITEMS} onPressItem={onPressItem} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Ada Lovelace/));
    expect(onPressItem).toHaveBeenCalledWith('a');
    // Rows are exposed under the list role.
    expect(root.findAll((n) => n.props?.accessibilityRole === 'list').length).toBeGreaterThan(0);
    assertTokenPure(root);
  });
});

describe('ConversationRow (native)', () => {
  it('shows an unread badge and bolds the name', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <ConversationRow name="Alan Turing" lastMessage="Decoded it" unreadCount={3} onPress={onPress} />,
      SEED_LIGHT
    );
    expect(getByText('3')).toBeTruthy();
    fireEvent.press(getByLabelText(/Alan Turing/));
    expect(onPress).toHaveBeenCalledTimes(1);
    assertTokenPure(root);
  });

  it('renders a typing state instead of the preview', () => {
    const { getByLabelText } = renderThemed(
      <ConversationRow name="Grace Hopper" typing muted />,
      SEED_LIGHT
    );
    // Row label folds in the typing/muted state.
    expect(getByLabelText(/Grace Hopper, typing/)).toBeTruthy();
  });
});

describe('ChatHeader (native)', () => {
  it('fires back and action callbacks and shows a typing caption', () => {
    const onBack = jest.fn();
    const onCall = jest.fn();
    const { getByLabelText, getByText, root } = renderThemed(
      <ChatHeader
        title="Ada Lovelace"
        presence="online"
        typing
        onBack={onBack}
        actions={[{ id: 'call', glyph: '📞', label: 'Call', onPress: onCall }]}
      />,
      SEED_LIGHT
    );
    expect(getByText('typing…')).toBeTruthy();
    fireEvent.press(getByLabelText('Back'));
    fireEvent.press(getByLabelText('Call'));
    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onCall).toHaveBeenCalledTimes(1);
    assertTokenPure(root);
  });
});

describe('MessageComposer (native)', () => {
  it('sends the current draft and edits via onChangeText', () => {
    const onSend = jest.fn();
    const onChangeText = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <MessageComposer value="Hello there" onChangeText={onChangeText} onSend={onSend} />,
      SEED_LIGHT
    );
    fireEvent.changeText(getByLabelText('Message input'), 'Hello!');
    expect(onChangeText).toHaveBeenCalledWith('Hello!');
    fireEvent.press(getByLabelText('Send message'));
    expect(onSend).toHaveBeenCalledWith('Hello there');
    assertTokenPure(root);
  });

  it('disables send when the draft is empty with no attachments', () => {
    const onSend = jest.fn();
    const { getByLabelText } = renderThemed(
      <MessageComposer value="   " onSend={onSend} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Send message'));
    expect(onSend).not.toHaveBeenCalled();
  });

  it('previews staged attachments and removes them', () => {
    const onRemove = jest.fn();
    const { getByLabelText } = renderThemed(
      <MessageComposer
        value=""
        attachments={[{ id: 'x1', name: 'photo.jpg', kind: 'image' }]}
        onRemoveAttachment={onRemove}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Remove photo.jpg'));
    expect(onRemove).toHaveBeenCalledWith('x1');
  });
});

describe('MessageGroup (native)', () => {
  it('renders stacked bubbles with an outgoing read receipt', () => {
    const { getByText, getByLabelText, root } = renderThemed(
      <MessageGroup
        side="me"
        receipt="read"
        messages={[
          { id: 'm1', text: 'On my way' },
          { id: 'm2', text: 'Two minutes', time: '09:41' },
        ]}
      />,
      SEED_LIGHT
    );
    expect(getByText('On my way')).toBeTruthy();
    expect(getByText('Two minutes')).toBeTruthy();
    expect(getByLabelText('Read')).toBeTruthy();
    assertTokenPure(root);
  });
});

describe('VoiceNoteBubble (native)', () => {
  it('toggles playback', () => {
    const onPlayToggle = jest.fn();
    const { getByLabelText, root } = renderThemed(
      <VoiceNoteBubble side="them" durationSec={12} progress={0.5} onPlayToggle={onPlayToggle} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Play voice message'));
    expect(onPlayToggle).toHaveBeenCalledTimes(1);
    assertTokenPure(root);
  });
});

describe('QuickReplies (native)', () => {
  it('reports the selected reply id', () => {
    const onSelect = jest.fn();
    const { getByText, root } = renderThemed(
      <QuickReplies
        replies={[
          { id: 'r1', label: 'On my way' },
          { id: 'r2', label: 'Running late' },
        ]}
        onSelect={onSelect}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByText('Running late'));
    expect(onSelect).toHaveBeenCalledWith('r2');
    assertTokenPure(root);
  });

  it('renders nothing when there are no replies', () => {
    const { toJSON } = renderThemed(<QuickReplies replies={[]} />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });
});

describe('appearance diversity + motion (native)', () => {
  // Non-classic appearances must stay token-pure under every seed: every rendered
  // hex still has to trace to a compiled-theme token, exactly like classic.
  it.each([SEED_LIGHT, SEED_DARK])('renders non-classic appearances token-pure (%#)', (seed) => {
    const allowedForSeed = tokenHexSet(seed);
    const { root } = renderThemed(
      <>
        <ChatHeader title="Ada Lovelace" appearance="elevated" />
        <ConversationRow name="Alan Turing" lastMessage="Decoded it" unreadCount={2} appearance="filled" />
        <ConversationRow name="Grace Hopper" lastMessage="Compiled" appearance="soft" />
        <DateSeparator label="Today" appearance="outline" />
        <TypingIndicator name="Ada" appearance="elevated" />
        <AttachmentBar attachments={[{ id: 'f1', name: 'a.pdf', kind: 'file' }]} appearance="filled" />
      </>,
      seed
    );
    renderedStyleHexes(root).forEach((hex) => expect(allowedForSeed.has(hex)).toBe(true));
  });

  it('mounts motion components (enter transition) without error', () => {
    const { getByText } = renderThemed(
      <MessageGroup
        side="them"
        authorName="Ada"
        messages={[{ id: 'm1', text: 'Incoming with a rise-in' }]}
      />,
      SEED_LIGHT
    );
    expect(getByText('Incoming with a rise-in')).toBeTruthy();
  });
});

describe('chat trimmings (native)', () => {
  it('renders receipts, separators, dividers, typing, presence, attachments token-pure', () => {
    const attachmentRemove = jest.fn();
    const { getByText, getByLabelText, root } = renderThemed(
      <>
        <ReadReceipt status="delivered" />
        <DateSeparator label="Today" />
        <UnreadDivider count={4} />
        <TypingIndicator name="Ada" />
        <PresenceDot status="busy" />
        <AttachmentBar
          attachments={[{ id: 'f1', name: 'report.pdf', kind: 'file' }]}
          onRemove={attachmentRemove}
        />
      </>,
      SEED_LIGHT
    );
    expect(getByText('Today')).toBeTruthy();
    expect(getByText('4 Unread messages')).toBeTruthy();
    expect(getByLabelText('Delivered')).toBeTruthy();
    expect(getByLabelText('Busy')).toBeTruthy();
    fireEvent.press(getByLabelText('Remove report.pdf'));
    expect(attachmentRemove).toHaveBeenCalledWith('f1');
    assertTokenPure(root);
  });
});
