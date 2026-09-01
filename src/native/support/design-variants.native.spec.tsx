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
import {
  TicketRowV4,
  AgentStatusV4,
  ConversationPanelV4,
  SatisfactionRatingV4,
  TicketPriorityV4,
  SLABadgeV4,
  ResolutionTimerV4,
  CannedResponseV4,
  MacroListV4,
  KBArticleRowV4,
  EscalationBannerV4,
  QueueStatV4,
  TicketDetailHeader,
  AgentPerformanceCard,
  CSATResultCard,
  QueueOverview,
  MessageBubble,
  ReplyBox,
} from './index';
import { type Macro } from './MacroList';
import { type CannedResponseData } from './CannedResponse';
import { type KBArticle } from './KBArticleRow';

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

// ── V4 "console" line smoke coverage (native) ───────────────────────────────
const macros: Macro[] = [
  { id: 'mac-close', name: 'Close + notify', description: 'Solve and email the requester', actionCount: 2, glyph: '✅' },
  { id: 'mac-refund', name: 'Issue refund', description: 'Refund + reply', actionCount: 3, glyph: '💸' },
];
const canned: CannedResponseData = {
  id: 'cr-reset',
  title: 'Password reset',
  body: 'Follow this link to reset your password, then try again.',
  shortcut: '/reset',
  category: 'Account',
};
const kbArticle: KBArticle = {
  id: 'kb-42',
  title: 'Resetting your password',
  category: 'Account',
  views: 1280,
  helpful: 312,
  status: 'published',
  updatedLabel: 'Updated 3d ago',
};

describe('support V4 "console" line (native)', () => {
  it('renders every V4 variant token-pure across both seeds', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root, getAllByText } = renderThemed(
        <>
          <TicketRowV4 ticket={ticket} onPress={() => {}} />
          <TicketRowV4 ticket={{ ...ticket, status: 'solved', priority: 'low', unread: 0 }} />
          <AgentStatusV4 presence="online" name="Sam Rivera" detail="3 chats" onPress={() => {}} />
          <AgentStatusV4 presence="offline" name="Lee" />
          <ConversationPanelV4 messages={messages} onReply={() => {}} />
          <ConversationPanelV4 messages={[]} loading />
          <SatisfactionRatingV4 variant="faces" onRate={() => {}} label="How did we do?" />
          <SatisfactionRatingV4 value={4} variant="stars" readOnly />
          <TicketPriorityV4 level="urgent" />
          <TicketPriorityV4 level="normal" variant="bars" size="sm" />
          <SLABadgeV4 state="at-risk" hint="12m left" />
          <ResolutionTimerV4 remainingSeconds={600} />
          <CannedResponseV4 response={canned} onInsert={() => {}} />
          <MacroListV4 macros={macros} onApply={() => {}} />
          <KBArticleRowV4 article={kbArticle} onPress={() => {}} />
          <EscalationBannerV4 level="critical" title="SLA breach imminent" message="Respond within 15m." onEscalate={() => {}} />
          <QueueStatV4 label="Open tickets" value={42} delta={3} tone="primary" glyph="📥" />
        </>,
        seed
      );
      expect(getAllByText('Payment failed on checkout').length).toBeGreaterThanOrEqual(2);
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });

  it('TicketRowV4 fires onPress with the ticket id', () => {
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <TicketRowV4 ticket={ticket} onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText(/Payment failed on checkout/));
    expect(onPress).toHaveBeenCalledWith('t-9');
  });
});

describe('support V4 new blocks (native)', () => {
  it('renders all 6 new components token-pure across both seeds (gradient heroes traced)', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root, getByText } = renderThemed(
        <>
          {/* Gradient heroes — must trace their brand-ramp stops to compiled tokens. */}
          <TicketDetailHeader
            subject="Payment failed on checkout"
            ticketId="#4821"
            status="open"
            priority="high"
            requester="Grace Hopper"
            assignee="Sam Rivera"
            slaLabel="Due in 2h 05m"
            tags={['billing', 'vip']}
            onSolve={() => {}}
            onAssign={() => {}}
          />
          <AgentPerformanceCard
            agentName="Sam Rivera"
            stats={[
              { label: 'Solved', value: '128' },
              { label: 'CSAT', value: '96%' },
              { label: 'Avg reply', value: '4m' },
            ]}
            period="This week"
          />
          <CSATResultCard score={92} responses={148} positive={130} neutral={12} negative={6} />
          <QueueOverview
            title="Today"
            stats={[
              { label: 'Open', value: 42, tone: 'primary', delta: 3 },
              { label: 'Breached SLA', value: 5, tone: 'danger', delta: -2 },
            ]}
          />
          <MessageBubble author="Grace" body="Still cannot pay." side="customer" time="2:14 PM" />
          <MessageBubble author="Sam" body="Checking the gateway now." side="agent" time="2:15 PM" status="sent" />
          <ReplyBox
            value="Thanks"
            onChangeText={() => {}}
            onSend={() => {}}
            cannedReplies={[{ id: 'greet', label: 'Greeting', body: 'Hi there!' }]}
          />
        </>,
        seed
      );
      expect(getByText('Payment failed on checkout')).toBeTruthy();
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });

  it('ReplyBox fires onSend', () => {
    const onSend = jest.fn();
    const { getByLabelText } = renderThemed(
      <ReplyBox value="Refund issued." onChangeText={() => {}} onSend={onSend} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Send'));
    expect(onSend).toHaveBeenCalledTimes(1);
  });

  it('TicketDetailHeader fires onSolve', () => {
    const onSolve = jest.fn();
    const { getByLabelText } = renderThemed(
      <TicketDetailHeader subject="Payment failed on checkout" ticketId="#4821" status="open" onSolve={onSolve} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Solve'));
    expect(onSolve).toHaveBeenCalledTimes(1);
  });
});
