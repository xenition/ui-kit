/** @jest-environment jsdom */
/**
 * The **V4 chat line** (web) — the twin of
 * `native/chat/v4-line.native.spec.tsx`.
 */
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
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
    const onRetry = jest.fn();
    const { getByLabelText } = render(<ReadReceiptV4 status="failed" onRetry={onRetry} />);
    fireEvent.click(getByLabelText(/Retry/));
    expect(onRetry).toHaveBeenCalled();
  });

  it('reports as a status, not an image', () => {
    const { getByRole } = render(<ReadReceiptV4 status="read" />);
    expect(getByRole('status').getAttribute('aria-label')).toBe('Read');
  });
});

describe('MessageComposerV4', () => {
  it('refuses to send an empty message', () => {
    const onSend = jest.fn();
    const { getByLabelText } = render(
      <MessageComposerV4 value="   " onSend={onSend} sendLabel="Send" />
    );
    const send = getByLabelText('Send') as HTMLButtonElement;
    expect(send.disabled).toBe(true);
    fireEvent.click(send);
    expect(onSend).not.toHaveBeenCalled();
  });

  it('sends on Enter and breaks the line on Shift+Enter', () => {
    const onSend = jest.fn();
    const { getByLabelText } = render(
      <MessageComposerV4 value="hello" onSend={onSend} placeholder="Message" />
    );
    const field = getByLabelText('Message');
    fireEvent.keyDown(field, { key: 'Enter', shiftKey: true });
    expect(onSend).not.toHaveBeenCalled();
    fireEvent.keyDown(field, { key: 'Enter' });
    expect(onSend).toHaveBeenCalledWith('hello');
  });
});

describe('VoiceNoteBubbleV4', () => {
  it('reports its position as a progressbar', () => {
    const { getByRole } = render(<VoiceNoteBubbleV4 durationSec={42} progress={0.5} />);
    const bar = getByRole('progressbar');
    expect(bar.getAttribute('aria-valuenow')).toBe('50');
    expect(bar.getAttribute('aria-label')).toContain('0:21 of 0:42');
  });
});

describe('PresenceDotV4 / TypingIndicatorV4 / UnreadDividerV4 / DateSeparatorV4', () => {
  it('always names the presence', () => {
    const { getByLabelText } = render(<PresenceDotV4 status="online" />);
    expect(getByLabelText('Online')).toBeTruthy();
  });

  it('says who is typing, once, politely', () => {
    const { getByRole } = render(<TypingIndicatorV4 name="Ada" />);
    const status = getByRole('status');
    expect(status.getAttribute('aria-label')).toBe('Ada is typing');
    expect(status.getAttribute('aria-live')).toBe('polite');
  });

  it('folds the unread count into one separator', () => {
    const { getByRole } = render(<UnreadDividerV4 count={3} />);
    expect(getByRole('separator').getAttribute('aria-label')).toBe('3 unread messages');
  });

  it('marks the date as a heading a reader can jump between', () => {
    const { getByRole } = render(<DateSeparatorV4 label="Today" />);
    expect(getByRole('heading', { name: 'Today' })).toBeTruthy();
  });

  it('renders nothing without a date', () => {
    const { container } = render(<DateSeparatorV4 label="" />);
    expect(container.firstChild).toBeNull();
  });
});

describe('MessageGroupV4 / AttachmentBarV4 / QuickRepliesV4', () => {
  it('renders nothing for an empty group', () => {
    const { container } = render(<MessageGroupV4 messages={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('carries the retry through to the receipt', () => {
    const onRetry = jest.fn();
    const { getByLabelText } = render(
      <MessageGroupV4
        side="me"
        receipt="failed"
        onRetry={onRetry}
        messages={[{ id: 'm1', text: 'hi' }]}
      />
    );
    fireEvent.click(getByLabelText(/Retry/));
    expect(onRetry).toHaveBeenCalled();
  });

  it('names what each remove drops', () => {
    const onRemove = jest.fn();
    const { getByLabelText } = render(
      <AttachmentBarV4
        attachments={[{ id: 'a1', name: 'photo.jpg', kind: 'image' }]}
        onRemove={onRemove}
      />
    );
    fireEvent.click(getByLabelText('Remove photo.jpg'));
    expect(onRemove).toHaveBeenCalledWith('a1');
  });

  it('wraps the chips rather than scrolling them off-screen', () => {
    const { getByLabelText } = render(
      <QuickRepliesV4 replies={[{ id: 'r1', label: 'Yes' }]} />
    );
    expect(getByLabelText('Quick replies').className).toContain('flex-wrap');
  });

  it('renders nothing for an empty reply set', () => {
    const { container } = render(<QuickRepliesV4 replies={[]} />);
    expect(container.firstChild).toBeNull();
  });
});

describe('ChatHeaderV4 / ConversationRowV4 / ConversationListV4', () => {
  it('renders the label an action has always carried', () => {
    const onClick = jest.fn();
    const { getByLabelText } = render(
      <ChatHeaderV4
        title="Ada"
        actions={[{ id: 'call', glyph: '📞', label: 'Start call', onClick }]}
      />
    );
    fireEvent.click(getByLabelText('Start call'));
    expect(onClick).toHaveBeenCalled();
  });

  it('replaces the subtitle while typing rather than stacking a row', () => {
    const { getByText, queryByText } = render(
      <ChatHeaderV4 title="Ada" subtitle="Last seen 09:00" typing typingLabel="Typing…" />
    );
    expect(getByText('Typing…')).toBeTruthy();
    expect(queryByText('Last seen 09:00')).toBeNull();
  });

  it('gives the whole row one name', () => {
    const { getByLabelText } = render(
      <ConversationRowV4 name="Ada" lastMessage="See you then" timestamp="09:12" unreadCount={3} />
    );
    expect(getByLabelText('Ada, See you then, 09:12, 3 unread')).toBeTruthy();
  });

  it('caps a runaway unread count', () => {
    const { getByText } = render(<ConversationRowV4 name="Ada" unreadCount={1204} />);
    expect(getByText('99+')).toBeTruthy();
  });

  it('draws the rows it is about to show while loading', () => {
    const { getByLabelText } = render(<ConversationListV4 loading />);
    expect(getByLabelText('Loading conversations')).toBeTruthy();
  });

  it('offers a next step on an empty inbox', () => {
    const { getByText } = render(
      <ConversationListV4
        items={[]}
        emptyLabel="No conversations"
        emptyDescription="Start one from a profile."
      />
    );
    expect(getByText('Start one from a profile.')).toBeTruthy();
  });
});
