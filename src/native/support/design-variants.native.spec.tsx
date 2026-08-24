import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';

import { TicketRowV2 } from './TicketRowV2';
import { TicketRowV3 } from './TicketRowV3';
import { ConversationPanelV2 } from './ConversationPanelV2';
import { ConversationPanelV3 } from './ConversationPanelV3';
import { AgentStatusV2 } from './AgentStatusV2';
import { AgentStatusV3 } from './AgentStatusV3';
import { SatisfactionRatingV2 } from './SatisfactionRatingV2';
import { SatisfactionRatingV3 } from './SatisfactionRatingV3';
import { type Ticket } from './TicketRow';
import { type ConversationMessage } from './ConversationPanel';

const ticket: Ticket = {
  id: 't-9',
  subject: 'Payment failed on checkout',
  status: 'open',
  priority: 'urgent',
  requester: 'Grace Hopper',
  updatedLabel: '5m ago',
  unread: 2,
};

const messages: ConversationMessage[] = [
  { id: 'm1', author: 'customer', body: 'The card keeps getting declined.', authorName: 'Grace', timeLabel: '09:40' },
  { id: 'm2', author: 'agent', body: 'Thanks, let me check the gateway logs.', authorName: 'Sam', timeLabel: '09:41' },
  { id: 'm3', author: 'system', body: 'Ticket assigned to Sam.', internal: false },
  { id: 'm4', author: 'agent', body: 'Escalating to billing.', authorName: 'Sam', internal: true },
];

describe('support/design-variants — mount (both seeds)', () => {
  it('renders every V2 + V3 variant, including an empty conversation', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { getByLabelText, getAllByText } = renderThemed(
        <>
          <TicketRowV2 ticket={ticket} />
          <TicketRowV3 ticket={ticket} />
          <ConversationPanelV2 messages={messages} />
          <ConversationPanelV3 messages={messages} />
          <ConversationPanelV2 messages={[]} emptyText="No messages yet." />
          <ConversationPanelV3 messages={[]} emptyText="Nothing here yet." />
          <AgentStatusV2 presence="online" name="Sam Rivera" detail="3 chats" />
          <AgentStatusV3 presence="away" name="Kai Chen" detail="idle" />
          <SatisfactionRatingV2 value={4} label="Rate this" onRate={() => {}} />
          <SatisfactionRatingV3 value={3} readOnly />
        </>,
        seed
      );
      // TicketRow variants both announce the subject.
      expect(getAllByText('Payment failed on checkout').length).toBeGreaterThanOrEqual(2);
      // Empty conversation empty-texts both render.
      expect(getByLabelText('No messages yet.')).toBeTruthy();
      expect(getByLabelText('Nothing here yet.')).toBeTruthy();
      // Agent presence surfaced as text (not color alone).
      expect(getByLabelText(/Sam Rivera, Online/)).toBeTruthy();
      expect(getByLabelText(/Kai Chen, Away/)).toBeTruthy();
    });
  });
});

describe('support/design-variants — token purity (both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <TicketRowV2 ticket={ticket} selected onPress={() => {}} />
          <TicketRowV2 ticket={{ ...ticket, status: 'solved', priority: 'low', unread: 0 }} />
          <TicketRowV3 ticket={ticket} onPress={() => {}} />
          <TicketRowV3 ticket={{ ...ticket, status: 'pending', priority: 'high' }} loading />
          <ConversationPanelV2 messages={messages} onReply={() => {}} />
          <ConversationPanelV2 messages={[]} loading />
          <ConversationPanelV3 messages={messages} onReply={() => {}} />
          <ConversationPanelV3 messages={[]} />
          <AgentStatusV2 presence="online" name="Sam" detail="busy" onPress={() => {}} />
          <AgentStatusV2 presence="offline" name="Lee" />
          <AgentStatusV3 presence="online" name="Ada" detail="2 chats" onPress={() => {}} />
          <AgentStatusV3 presence="offline" />
          <SatisfactionRatingV2 value={5} variant="faces" label="How did we do?" onRate={() => {}} />
          <SatisfactionRatingV2 value={4} variant="stars" readOnly />
          <SatisfactionRatingV2 value={2} variant="thumbs" onRate={() => {}} />
          <SatisfactionRatingV3 value={3} onRate={() => {}} />
          <SatisfactionRatingV3 value={4} readOnly label="CSAT" />
        </>,
        seed
      );
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});

describe('support/design-variants — interaction', () => {
  it('TicketRowV2 / V3 fire onPress with the ticket id', () => {
    const onPressV2 = jest.fn();
    const v2 = renderThemed(<TicketRowV2 ticket={ticket} onPress={onPressV2} />, SEED_LIGHT);
    fireEvent.press(v2.getByLabelText(/Payment failed on checkout/));
    expect(onPressV2).toHaveBeenCalledWith('t-9');

    const onPressV3 = jest.fn();
    const v3 = renderThemed(<TicketRowV3 ticket={ticket} onPress={onPressV3} />, SEED_LIGHT);
    fireEvent.press(v3.getByLabelText(/Payment failed on checkout/));
    expect(onPressV3).toHaveBeenCalledWith('t-9');
  });

  it('ConversationPanelV2 replies with the trimmed draft', () => {
    const onReply = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <ConversationPanelV2 messages={messages} onReply={onReply} sendLabel="Send" />,
      SEED_LIGHT
    );
    fireEvent.changeText(getByLabelText('Reply message'), '  Refund issued.  ');
    fireEvent.press(getByText('Send'));
    expect(onReply).toHaveBeenCalledWith('Refund issued.');
  });

  it('ConversationPanelV3 replies with the trimmed draft', () => {
    const onReply = jest.fn();
    const { getByLabelText, getByText } = renderThemed(
      <ConversationPanelV3 messages={messages} onReply={onReply} sendLabel="Send" />,
      SEED_DARK
    );
    fireEvent.changeText(getByLabelText('Reply message'), '  Looking into it.  ');
    fireEvent.press(getByText('Send'));
    expect(onReply).toHaveBeenCalledWith('Looking into it.');
  });

  it('SatisfactionRatingV2 / V3 report the 1-based score', () => {
    const rateV2 = jest.fn();
    const v2 = renderThemed(<SatisfactionRatingV2 variant="faces" onRate={rateV2} />, SEED_LIGHT);
    fireEvent.press(v2.getByLabelText('Rate 4 of 5'));
    expect(rateV2).toHaveBeenCalledWith(4);

    const rateV3 = jest.fn();
    const v3 = renderThemed(<SatisfactionRatingV3 variant="stars" onRate={rateV3} />, SEED_LIGHT);
    fireEvent.press(v3.getByLabelText('Rate 3 of 5'));
    expect(rateV3).toHaveBeenCalledWith(3);
  });

  it('AgentStatusV2 tile fires onPress', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <AgentStatusV2 presence="online" name="Sam" onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Sam, Online/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
