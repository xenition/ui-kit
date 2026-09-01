/**
 * The **V4 chat line** (native) — the thread vocabulary, and the finding this
 * module exists for: a failed send was a red glyph and nothing else.
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { AttachmentBarV4 } from './AttachmentBarV4';
import { ChatHeaderV4 } from './ChatHeaderV4';
import { ConversationListV4 } from './ConversationListV4';
import { ConversationRowV4 } from './ConversationRowV4';
import { DateSeparatorV4 } from './DateSeparatorV4';
import { MessageComposerV4 } from './MessageComposerV4';
import { MessageGroupV4 } from './MessageGroupV4';
import { PresenceDotV4 } from './PresenceDotV4';
import { QuickRepliesV4 } from './QuickRepliesV4';
import { ReadReceiptV4 } from './ReadReceiptV4';
import { TypingIndicatorV4 } from './TypingIndicatorV4';
import { UnreadDividerV4 } from './UnreadDividerV4';
import { VoiceNoteBubbleV4 } from './VoiceNoteBubbleV4';
import { PRESENCE_META, RECEIPT_META, clock } from './internal/thread-v4';

describe('clock / PRESENCE_META / RECEIPT_META', () => {
  it('formats seconds as m:ss', () => {
    expect(clock(0)).toBe('0:00');
    expect(clock(42)).toBe('0:42');
    expect(clock(605)).toBe('10:05');
    // Never a negative or NaN duration on screen.
    expect(clock(-5)).toBe('0:00');
    expect(clock(Number.NaN)).toBe('0:00');
  });

  it('stops away borrowing the caution tone', () => {
    // Stepping away from a desk is not a warning.
    expect(PRESENCE_META.away.tone).toBe('neutral');
    expect(PRESENCE_META.online.tone).toBe('success');
    expect(PRESENCE_META.busy.tone).toBe('danger');
  });

  it('gives every presence and receipt state a word', () => {
    for (const meta of Object.values(PRESENCE_META)) expect(meta.label).toBeTruthy();
    for (const meta of Object.values(RECEIPT_META)) expect(meta.label).toBeTruthy();
    expect(RECEIPT_META.failed.tone).toBe('danger');
  });
});

describe('ReadReceiptV4', () => {
  it('turns a failed send into something the user can act on', () => {
    // §3.1. The base drew five states identically — one glyph, one colour —
    // so the one state a user must *act* on was as passive as `sent`.
    const onRetry = jest.fn();
    const { getByLabelText } = renderThemed(
      <ReadReceiptV4 status="failed" onRetry={onRetry} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Retry/));
    expect(onRetry).toHaveBeenCalled();
  });

  it('leaves the other four states as passive status', () => {
    const { getByLabelText } = renderThemed(
      <ReadReceiptV4 status="read" onRetry={jest.fn()} />,
      SEED_LIGHT
    );
    // Named, but not a button: there is nothing to do about a read message.
    expect(getByLabelText('Read')).toBeTruthy();
  });
});

describe('MessageComposerV4', () => {
  it('refuses to send an empty message', () => {
    // §3.4. The base fired `onSend('')` on a blank field and on whitespace.
    const onSend = jest.fn();
    const { getByLabelText } = renderThemed(
      <MessageComposerV4 value="   " onSend={onSend} sendLabel="Send" />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Send'));
    expect(onSend).not.toHaveBeenCalled();
  });

  it('sends a real one', () => {
    const onSend = jest.fn();
    const { getByLabelText } = renderThemed(
      <MessageComposerV4 value="hello" onSend={onSend} sendLabel="Send" />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Send'));
    expect(onSend).toHaveBeenCalledWith('hello');
  });
});

describe('VoiceNoteBubbleV4', () => {
  it('reports its position, not only its duration', () => {
    // §3.2. The base announced "Voice message, 0:42" at every position.
    const { getByLabelText } = renderThemed(
      <VoiceNoteBubbleV4 durationSec={42} progress={0.5} />,
      SEED_LIGHT
    );
    expect(getByLabelText(/0:21 of 0:42/)).toBeTruthy();
  });

  it('toggles playback from a named control', () => {
    const onPlayToggle = jest.fn();
    const { getByLabelText } = renderThemed(
      <VoiceNoteBubbleV4 durationSec={42} onPlayToggle={onPlayToggle} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Play'));
    expect(onPlayToggle).toHaveBeenCalled();
  });
});

describe('PresenceDotV4 / TypingIndicatorV4 / UnreadDividerV4 / DateSeparatorV4', () => {
  it('always names the presence, with or without its word', () => {
    // §3.3. A coloured dot is not a status to a screen reader.
    const { getByLabelText } = renderThemed(<PresenceDotV4 status="online" />, SEED_LIGHT);
    expect(getByLabelText('Online')).toBeTruthy();
  });

  it('says who is typing', () => {
    const { getByLabelText } = renderThemed(<TypingIndicatorV4 name="Ada" />, SEED_LIGHT);
    expect(getByLabelText('Ada is typing')).toBeTruthy();
  });

  it('folds the unread count into one sentence', () => {
    const { getByLabelText } = renderThemed(<UnreadDividerV4 count={3} />, SEED_LIGHT);
    expect(getByLabelText('3 unread messages')).toBeTruthy();
  });

  it('renders nothing without a date', () => {
    const { toJSON } = renderThemed(<DateSeparatorV4 label="" />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });
});

describe('MessageGroupV4 / AttachmentBarV4 / QuickRepliesV4', () => {
  it('renders nothing for an empty group', () => {
    const { toJSON } = renderThemed(<MessageGroupV4 messages={[]} />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });

  it('carries the retry through to the receipt', () => {
    const onRetry = jest.fn();
    const { getByLabelText } = renderThemed(
      <MessageGroupV4
        side="me"
        receipt="failed"
        onRetry={onRetry}
        messages={[{ id: 'm1', text: 'hi' }]}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Retry/));
    expect(onRetry).toHaveBeenCalled();
  });

  it('names what each remove drops', () => {
    const onRemove = jest.fn();
    const { getByLabelText } = renderThemed(
      <AttachmentBarV4
        attachments={[{ id: 'a1', name: 'photo.jpg', kind: 'image' }]}
        onRemove={onRemove}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Remove photo.jpg'));
    expect(onRemove).toHaveBeenCalledWith('a1');
  });

  it('renders nothing for an empty reply set', () => {
    const { toJSON } = renderThemed(<QuickRepliesV4 replies={[]} />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });
});

describe('ChatHeaderV4 / ConversationRowV4 / ConversationListV4', () => {
  it('renders the label an action has always carried', () => {
    const onClick = jest.fn();
    const { getByLabelText } = renderThemed(
      <ChatHeaderV4
        title="Ada"
        actions={[{ id: 'call', glyph: '📞', label: 'Start call', onPress: onClick }]}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Start call'));
    expect(onClick).toHaveBeenCalled();
  });

  it('gives the whole row one name', () => {
    const { getByLabelText } = renderThemed(
      <ConversationRowV4 name="Ada" lastMessage="See you then" timestamp="09:12" unreadCount={3} />,
      SEED_LIGHT
    );
    expect(getByLabelText('Ada, See you then, 09:12, 3 unread')).toBeTruthy();
  });

  it('caps a runaway unread count', () => {
    const { getByText } = renderThemed(
      <ConversationRowV4 name="Ada" unreadCount={1204} />,
      SEED_LIGHT
    );
    expect(getByText('99+')).toBeTruthy();
  });

  it('offers a next step on an empty inbox', () => {
    const { getByText } = renderThemed(
      <ConversationListV4
        items={[]}
        emptyLabel="No conversations"
        emptyDescription="Start one from a profile."
      />,
      SEED_LIGHT
    );
    expect(getByText('Start one from a profile.')).toBeTruthy();
  });
});
